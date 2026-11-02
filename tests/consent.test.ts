import { test } from "node:test";
import assert from "node:assert/strict";
import { CONSENT_MAX_AGE, consentCookie, readConsent } from "../lib/consent";
import { createAnalytics, originOnly } from "../lib/sentinel";

test("consent is explicit, versioned and expires for either choice", () => {
  const now = 1800000000000;
  assert.equal(readConsent("", now), null);
  assert.equal(readConsent("unrealmmo_consent=broken", now), null);
  for (const analytics of [false, true]) {
    const cookie = consentCookie(analytics, now);
    assert.equal(readConsent(cookie, now)?.analytics, analytics);
    assert.equal(readConsent(cookie, now + CONSENT_MAX_AGE * 1000), null);
    assert.equal(readConsent(cookie, now - 1), null);
    assert.match(cookie, /Secure/);
    assert.match(cookie, /SameSite=Lax/);
  }
  assert.equal(
    readConsent(
      `unrealmmo_consent=${encodeURIComponent(JSON.stringify({ version: 3, analytics: true, updatedAt: now }))}`,
      now,
    ),
    null,
  );
});

function harness() {
  let allowed = false,
    time = 1800000000000,
    storage: string | null = null,
    writes = 0;
  const requests: { body: Record<string, unknown>; signal: AbortSignal }[] = [];
  const tracker = createAnalytics({
    allowed: () => allowed,
    now: () => time,
    id: () => "01234567-89ab-4cde-8f01-23456789abcd",
    readSession: () => storage,
    writeSession: (v) => {
      storage = v;
      writes++;
    },
    clearSession: () => {
      storage = null;
    },
    send: (body, signal) => {
      requests.push({ body: JSON.parse(body), signal });
      return new Promise(() => {});
    },
    origin: "https://unrealmmo.com",
    referrer: "https://example.com/private?email=secret#account",
    device: "desktop",
  });
  return {
    tracker,
    requests,
    allow: (v: boolean) => {
      allowed = v;
    },
    advance: (n: number) => {
      time += n;
    },
    saved: () => storage,
    writes: () => writes,
  };
}

test("no optional storage or requests before consent or with necessary only", () => {
  const h = harness();
  h.tracker.pageview("/");
  h.tracker.action("copy_server_address_clicked", "/");
  assert.equal(h.requests.length, 0);
  assert.equal(h.writes(), 0);
  assert.equal(h.saved(), null);
});

test("acceptance tracks the current page once and navigation, without URL secrets", () => {
  const h = harness();
  h.allow(true);
  h.tracker.pageview("/wiki/?email=secret#private");
  h.tracker.pageview("/wiki/?email=secret#private");
  h.tracker.pageview("/season-pass/");
  assert.equal(h.requests.length, 2);
  assert.equal(h.requests[0].body.url, "https://unrealmmo.com/wiki/");
  assert.equal(h.requests[0].body.referrer, "https://example.com");
  assert.ok(!JSON.stringify(h.requests).includes("secret"));
  assert.equal(h.requests[0].body.sessionId, h.requests[1].body.sessionId);
});

test("withdrawal aborts pending requests, clears optional IDs, and stops later events", () => {
  const h = harness();
  h.allow(true);
  h.tracker.pageview("/");
  assert.ok(h.saved());
  h.allow(false);
  h.tracker.stop();
  assert.equal(h.requests[0].signal.aborted, true);
  assert.equal(h.saved(), null);
  h.tracker.pageview("/skills/");
  h.tracker.action("copy_server_address_clicked", "/");
  assert.equal(h.requests.length, 1);
});

test("every event rechecks consent even if a different tab revoked it", () => {
  const h = harness();
  h.allow(true);
  h.tracker.pageview("/");
  h.allow(false);
  h.tracker.pageview("/wiki/");
  assert.equal(h.requests.length, 1);
  assert.equal(h.requests[0].signal.aborted, true);
  assert.equal(h.saved(), null);
});

test("only curated actions are sent, with bounded requests and no form contents", () => {
  const h = harness();
  h.allow(true);
  h.tracker.action("email=secret", "/");
  assert.equal(h.requests.length, 0);
  for (let i = 0; i < 10; i++) {
    h.advance(1100);
    h.tracker.action("copy_server_address_clicked", "/");
  }
  assert.equal(h.requests.length, 4);
  assert.deepEqual(h.requests[0].body.properties, {
    event: "copy_server_address_clicked",
  });
});

test("only web origins are retained for referrers", () => {
  assert.equal(
    originOnly("https://example.com/a?x=private"),
    "https://example.com",
  );
  assert.equal(originOnly("javascript:alert(1)"), "");
  assert.equal(originOnly(""), "");
});

// Replay expands the optional collection; basic-analytics consent is not enough.
test("previous analytics-only consent requires a fresh choice for replay", () => {
  const now = 1800000000000;
  for (const analytics of [false, true]) {
    const previous = `unrealmmo_consent=${encodeURIComponent(JSON.stringify({ version: 1, analytics, updatedAt: now }))}`;
    assert.equal(readConsent(previous, now), null);
  }
});
