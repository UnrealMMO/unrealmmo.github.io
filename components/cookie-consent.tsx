"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CONSENT_COOKIE,
  consentCookie,
  readConsent,
  type Consent,
} from "@/lib/consent";
import {
  ANALYTICS_SESSION_KEY,
  createAnalytics,
  SENTINEL_ENDPOINT,
} from "@/lib/sentinel";

const SETTINGS_EVENT = "unrealmmo:cookie-settings";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="cookie-settings-link"
      onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))}
    >
      Cookie settings
    </button>
  );
}

export function CookieConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const tracker = useRef<ReturnType<typeof createAnalytics> | null>(null);
  const channel = useRef<BroadcastChannel | null>(null);
  const description = useRef<HTMLParagraphElement>(null);
  const paused = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  const refresh = useCallback(() => {
    const saved = readConsent(document.cookie);
    setChoice(saved);
    if (!saved?.analytics) tracker.current?.stop();
    if (!saved) setOpen(true);
  }, []);

  useEffect(() => {
    tracker.current = createAnalytics({
      allowed: () =>
        !paused.current && readConsent(document.cookie)?.analytics === true,
      now: Date.now,
      id: () => crypto.randomUUID(),
      readSession: () => sessionStorage.getItem(ANALYTICS_SESSION_KEY),
      writeSession: (value) =>
        sessionStorage.setItem(ANALYTICS_SESSION_KEY, value),
      clearSession: () => sessionStorage.removeItem(ANALYTICS_SESSION_KEY),
      // Only the public production site sends events. Local previews never pollute Sentinel.
      send: (body, signal) =>
        ["unrealmmo.com", "www.unrealmmo.com"].includes(location.hostname)
          ? fetch(SENTINEL_ENDPOINT, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body,
              signal,
              credentials: "omit",
              referrerPolicy: "no-referrer",
            })
          : Promise.resolve(),
      origin: "https://unrealmmo.com",
      referrer: document.referrer,
      device: matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop",
    });
    refresh();
    const show = () => {
      returnFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      refresh();
      setOpen(true);
      requestAnimationFrame(() => description.current?.focus());
    };
    const click = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-analytics-event]")
          : null;
      if (target)
        tracker.current?.action(
          target.dataset.analyticsEvent || "",
          location.pathname,
        );
    };
    const visible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    try {
      channel.current = new BroadcastChannel(CONSENT_COOKIE);
      channel.current.onmessage = () => {
        refresh();
        if (readConsent(document.cookie)) setOpen(false);
      };
    } catch {
      /* Focus/request checks remain available. */
    }
    window.addEventListener(SETTINGS_EVENT, show);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", visible);
    document.addEventListener("click", click);
    return () => {
      // Abort outstanding requests and clear the optional session on teardown.
      tracker.current?.stop();
      tracker.current = null;
      channel.current?.close();
      channel.current = null;
      window.removeEventListener(SETTINGS_EVENT, show);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", visible);
      document.removeEventListener("click", click);
    };
  }, [refresh]);

  useEffect(() => {
    if (!readConsent(document.cookie)) {
      refresh();
      return;
    }
    if (choice?.analytics) tracker.current?.pageview(pathname);
  }, [choice, pathname, refresh]);

  function choose(analytics: boolean) {
    if (!analytics) paused.current = true;
    document.cookie = consentCookie(
      analytics,
      Date.now(),
      location.protocol === "https:",
    );
    const saved = readConsent(document.cookie);
    if (!saved || saved.analytics !== analytics) {
      paused.current = true;
      tracker.current?.stop();
      setSaveFailed(true);
      return;
    }
    paused.current = false;
    if (!analytics) tracker.current?.stop();
    setChoice(saved);
    setOpen(false);
    setSaveFailed(false);
    channel.current?.postMessage("changed");
    returnFocus.current?.focus();
    returnFocus.current = null;
  }

  if (!open) return null;
  return (
    <section
      className="cookie-banner"
      aria-label="Cookie consent"
      aria-describedby="cookie-description"
    >
      <div className="cookie-copy">
        <p id="cookie-description" ref={description} tabIndex={-1}>
          We use necessary cookies and optional analytics.{" "}
          <Link href="/privacy-policy/#website-analytics">Privacy policy</Link>
        </p>
        {saveFailed && (
          <p role="alert">
            Couldn’t save your choice. Optional tracking is off in this tab.
          </p>
        )}
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose(false)}>
          Accept necessary
        </button>
        <button type="button" onClick={() => choose(true)}>
          Accept all
        </button>
      </div>
    </section>
  );
}
