import { SENTINEL_ENDPOINT, SENTINEL_PRODUCT_KEY } from "./sentinel";

type ReplayEvent = { type: number; data: unknown; timestamp: number };
type Recorder = (options: {
  emit: (event: ReplayEvent) => void;
  maskAllInputs: boolean;
  blockSelector: string;
  maskTextSelector: string;
  recordCanvas: boolean;
  collectFonts: boolean;
  checkoutEveryNms: number;
}) => (() => void) | undefined;
type Options = {
  allowed: () => boolean;
  visitorId: () => string;
  device: string;
  userAgent: string;
  loadRecorder: () => Promise<Recorder>;
  request: (
    url: string,
    body: string,
    signal: AbortSignal,
  ) => Promise<{ ok: boolean; json: () => Promise<unknown> }>;
  onSession: (id: string) => void;
};

const UPLOAD_ENDPOINT =
  "https://api.backend.sentinel.smartify.ai/upload-replay";
const MAX_BYTES = 4 * 1024 * 1024;
const MAX_EVENTS = 2000;

/** Consent owns the whole lifecycle, including delayed imports and requests. */
export function createSessionReplay(options: Options) {
  let generation = 0;
  let starting: Promise<boolean> | null = null;
  let sessionId: string | null = null;
  let stopRecording: (() => void) | undefined;
  let timer: ReturnType<typeof setInterval> | undefined;
  let events: ReplayEvent[] = [];
  let bytes = 0;
  let uploading = false;
  let failed = false;
  const pending = new Set<AbortController>();

  function stop() {
    generation++;
    failed = false;
    stopRecording?.();
    stopRecording = undefined;
    if (timer) clearInterval(timer);
    timer = undefined;
    for (const request of pending) request.abort();
    pending.clear();
    events = [];
    bytes = 0;
    sessionId = null;
    starting = null;
    uploading = false;
  }
  function permitted(token: number) {
    return token === generation && options.allowed();
  }
  async function post(url: string, payload: object, token: number) {
    if (!permitted(token)) throw new Error("Replay consent withdrawn");
    const controller = new AbortController();
    pending.add(controller);
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await options.request(
        url,
        JSON.stringify({ apiKey: SENTINEL_PRODUCT_KEY, ...payload }),
        controller.signal,
      );
      if (!response.ok) throw new Error("Replay request failed");
      const result = await response.json();
      if (!permitted(token)) throw new Error("Replay consent withdrawn");
      return result;
    } finally {
      clearTimeout(timeout);
      pending.delete(controller);
    }
  }
  async function flush() {
    if (!options.allowed()) {
      stop();
      return;
    }
    if (!sessionId || uploading || events.length === 0) return;
    const token = generation;
    const batch = events;
    events = [];
    bytes = 0;
    uploading = true;
    try {
      await post(UPLOAD_ENDPOINT, { sessionId, events: batch }, token);
    } catch {
      // Missing DOM mutations make later chunks unreliable. Stop, without retries.
      if (token === generation) {
        stop();
        failed = true;
      }
    } finally {
      if (token === generation) uploading = false;
    }
  }
  function ensure(): Promise<boolean> {
    if (!options.allowed()) {
      stop();
      failed = false;
      return Promise.resolve(false);
    }
    if (sessionId) return Promise.resolve(true);
    if (starting) return starting;
    if (failed) return Promise.resolve(false);
    const token = generation;
    starting = (async () => {
      try {
        const record = await options.loadRecorder();
        if (!permitted(token)) return false;
        const result = (await post(
          SENTINEL_ENDPOINT,
          {
            sessionReplay: true,
            visitorId: options.visitorId(),
            device: options.device,
            userAgent: options.userAgent,
          },
          token,
        )) as { sessionId?: unknown };
        if (typeof result.sessionId !== "string" || !result.sessionId)
          throw new Error("Missing replay session");
        sessionId = result.sessionId;
        options.onSession(sessionId);
        stopRecording = record({
          emit(event) {
            if (!permitted(token)) {
              if (token === generation) stop();
              return;
            }
            // rrweb metadata otherwise includes the full current query string.
            if (event.type === 4) {
              const data = event.data as { href?: string };
              if (data.href) {
                const url = new URL(data.href);
                event = {
                  ...event,
                  data: { ...data, href: url.origin + url.pathname },
                };
              }
            }
            const size = JSON.stringify(event).length * 2;
            if (bytes + size > MAX_BYTES || events.length >= MAX_EVENTS) {
              // Defer cleanup until record() has returned its stop callback.
              queueMicrotask(() => {
                if (token === generation) {
                  stop();
                  failed = true;
                }
              });
              return;
            }
            events.push(event);
            bytes += size;
          },
          maskAllInputs: true,
          blockSelector:
            "[data-sentinel-block], input, textarea, select, [contenteditable], iframe",
          maskTextSelector: "[data-sentinel-mask]",
          recordCanvas: false,
          collectFonts: false,
          checkoutEveryNms: 60000,
        });
        if (!stopRecording) throw new Error("Recorder did not start");
        timer = setInterval(() => {
          void flush();
        }, 5000);
        return true;
      } catch {
        if (token === generation) {
          stop();
          failed = true;
        }
        return false;
      }
    })();
    return starting;
  }
  return { ensure, stop, flush };
}
