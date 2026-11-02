import { test } from "node:test";
import assert from "node:assert/strict";
import { createSessionReplay } from "../lib/session-replay";

function harness() {
  let allowed = false,
    stopped = 0;
  let capture:
    | Parameters<
        Awaited<
          ReturnType<Parameters<typeof createSessionReplay>[0]["loadRecorder"]>
        >
      >[0]
    | undefined;
  const requests: { url: string; body: any; signal: AbortSignal }[] = [];
  let attached = "";
  const replay = createSessionReplay({
    allowed: () => allowed,
    visitorId: () => "test-visitor",
    device: "desktop",
    userAgent: "test",
    loadRecorder: async () => (options) => {
      capture = options;
      return () => {
        stopped++;
      };
    },
    request: async (url, body, signal) => {
      requests.push({ url, body: JSON.parse(body), signal });
      return {
        ok: true,
        json: async () => ({ ok: true, sessionId: "server-session" }),
      };
    },
    onSession: (id) => {
      attached = id;
    },
  });
  return {
    replay,
    requests,
    allow: (value: boolean) => {
      allowed = value;
    },
    capture: () => capture!,
    stopped: () => stopped,
    attached: () => attached,
  };
}

test("replay starts only after acceptance, masks inputs and links uploads to server session", async () => {
  const h = harness();
  assert.equal(await h.replay.ensure(), false);
  assert.equal(h.requests.length, 0);
  h.allow(true);
  try {
    assert.equal(await h.replay.ensure(), true);
    assert.equal(await h.replay.ensure(), true);
    assert.equal(h.requests.length, 1);
    assert.equal(h.attached(), "server-session");
    assert.equal(h.capture().maskAllInputs, true);
    assert.match(h.capture().blockSelector, /input, textarea, select/);
    h.capture().emit({
      type: 4,
      data: { href: "https://unrealmmo.com/wiki/?secret=x#private" },
      timestamp: 1,
    });
    await h.replay.flush();
    assert.equal(h.requests[1].body.sessionId, "server-session");
    assert.equal(
      h.requests[1].body.events[0].data.href,
      "https://unrealmmo.com/wiki/",
    );
    h.capture().emit({ type: 3, data: {}, timestamp: 2 });
    h.allow(false);
    h.replay.stop();
    await h.replay.flush();
    assert.equal(h.requests.length, 2);
    assert.equal(h.stopped(), 1);
  } finally {
    h.replay.stop();
  }
});

test("withdrawal during lazy loading cannot start a recorder or send requests", async () => {
  let allowed = true,
    calls = 0;
  let resolve!: (value: any) => void;
  const replay = createSessionReplay({
    allowed: () => allowed,
    visitorId: () => "test",
    device: "desktop",
    userAgent: "test",
    loadRecorder: () =>
      new Promise((r) => {
        resolve = r;
      }),
    request: async () => {
      calls++;
      throw new Error("unexpected request");
    },
    onSession: () => {
      calls++;
    },
  });
  const start = replay.ensure();
  allowed = false;
  replay.stop();
  resolve(() => {
    calls++;
    return () => {};
  });
  assert.equal(await start, false);
  assert.equal(calls, 0);
});

test("withdrawal during session creation aborts it and ignores a late response", async () => {
  let allowed = true,
    captured = 0;
  let resolve!: (value: any) => void;
  let signal!: AbortSignal;
  const replay = createSessionReplay({
    allowed: () => allowed,
    visitorId: () => "test",
    device: "desktop",
    userAgent: "test",
    loadRecorder: async () => () => {
      captured++;
      return () => {};
    },
    request: async (_url, _body, s) => {
      signal = s;
      return new Promise((r) => {
        resolve = r;
      });
    },
    onSession: () => {
      captured++;
    },
  });
  const start = replay.ensure();
  await Promise.resolve();
  allowed = false;
  replay.stop();
  assert.equal(signal.aborted, true);
  resolve({ ok: true, json: async () => ({ sessionId: "late" }) });
  assert.equal(await start, false);
  assert.equal(captured, 0);
});

test("events recorded during an upload survive for the next upload", async () => {
  let emit!: (event: {
    type: number;
    data: unknown;
    timestamp: number;
  }) => void;
  let finish!: (value: any) => void;
  const batches: any[] = [];
  const replay = createSessionReplay({
    allowed: () => true,
    visitorId: () => "test",
    device: "desktop",
    userAgent: "test",
    loadRecorder: async () => (options) => {
      emit = options.emit;
      return () => {};
    },
    request: async (_url, body) => {
      const value = JSON.parse(body);
      if (value.sessionReplay)
        return { ok: true, json: async () => ({ sessionId: "real" }) };
      batches.push(value.events);
      if (batches.length === 1)
        return new Promise((resolve) => {
          finish = resolve;
        });
      return { ok: true, json: async () => ({ ok: true }) };
    },
    onSession() {},
  });
  try {
    await replay.ensure();
    emit({ type: 3, data: { first: true }, timestamp: 1 });
    const upload = replay.flush();
    emit({ type: 3, data: { second: true }, timestamp: 2 });
    finish({ ok: true, json: async () => ({ ok: true }) });
    await upload;
    await replay.flush();
    assert.deepEqual(
      batches.map((b) => b.map((e: any) => e.timestamp)),
      [[1], [2]],
    );
  } finally {
    replay.stop();
  }
});
