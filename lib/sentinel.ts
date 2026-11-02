// Public ingestion key supplied for this website. Never use a Sentinel management key here.
export const SENTINEL_ENDPOINT = "https://sentinel.smartify.ai/api/track";
export const SENTINEL_PRODUCT_KEY = "prod_zi305h868s0v182hx89wzpvparbzz24h";
export const ANALYTICS_SESSION_KEY = "unrealmmo_analytics_session";
const SESSION_MS = 30 * 60 * 1000;
export const siteActions = [
  "copy_server_address_clicked",
  "season_pass_opened",
  "reward_road_opened",
] as const;
type Session = { visitorId: string; sessionId: string; expiresAt: number };
type Options = {
  allowed: () => boolean;
  now: () => number;
  id: () => string;
  readSession: () => string | null;
  writeSession: (value: string) => void;
  clearSession: () => void;
  send: (body: string, signal: AbortSignal) => Promise<unknown>;
  origin: string;
  referrer: string;
  device: "mobile" | "desktop";
};

export function originOnly(value: string) {
  try {
    const u = new URL(value);
    return /^https?:$/.test(u.protocol) ? u.origin : "";
  } catch {
    return "";
  }
}

/** Curated analytics; the consent-owned recorder supplies the real Sentinel session ID. */
export function createAnalytics(options: Options) {
  let session: Session | null = null;
  let replaySessionId: string | null = null;
  let lastPath: string | null = null;
  let lastActionAt = -Infinity;
  const pending = new Set<AbortController>();
  function stop() {
    for (const request of pending) request.abort();
    pending.clear();
    session = null;
    replaySessionId = null;
    lastPath = null;
    try {
      options.clearSession();
    } catch {
      /* Storage can be unavailable. */
    }
  }
  function getSession() {
    if (!session) {
      try {
        const saved = JSON.parse(options.readSession() || "null");
        if (
          saved &&
          /^vis_[a-f0-9-]{36}$/.test(saved.visitorId) &&
          /^sess_[a-f0-9-]{36}$/.test(saved.sessionId) &&
          saved.expiresAt > options.now() &&
          saved.expiresAt <= options.now() + SESSION_MS
        )
          session = saved;
      } catch {
        /* Create an in-memory session if storage is blocked or malformed. */
      }
    }
    if (!session || (!replaySessionId && session.expiresAt <= options.now())) {
      session = {
        visitorId: `vis_${options.id()}`,
        sessionId: `sess_${options.id()}`,
        expiresAt: 0,
      };
    }
    session.expiresAt = options.now() + SESSION_MS;
    try {
      options.writeSession(JSON.stringify(session));
    } catch {
      /* In-memory fallback. */
    }
    return session;
  }
  function send(
    type: "pageview" | "custom",
    path: string,
    properties?: Record<string, string>,
  ) {
    if (!options.allowed()) {
      stop();
      return false;
    }
    if (pending.size >= 4) return false;
    const url = new URL(path, options.origin);
    if (url.origin !== options.origin) return false;
    const { visitorId, sessionId } = getSession();
    const request = new AbortController();
    pending.add(request);
    const body = JSON.stringify({
      apiKey: SENTINEL_PRODUCT_KEY,
      type,
      visitorId,
      sessionId: replaySessionId || sessionId,
      url: options.origin + url.pathname,
      referrer: originOnly(options.referrer),
      device: options.device,
      timestamp: options.now(),
      ...(properties ? { properties } : {}),
    });
    try {
      void options
        .send(body, request.signal)
        .catch(() => {})
        .finally(() => pending.delete(request));
    } catch {
      pending.delete(request);
    }
    return true;
  }
  return {
    stop,
    visitorId() {
      return options.allowed() ? getSession().visitorId : "";
    },
    attachReplay(id: string) {
      replaySessionId = id;
      lastPath = null;
    },
    pageview(path: string) {
      if (!options.allowed()) {
        stop();
        return;
      }
      if (path !== lastPath && send("pageview", path)) lastPath = path;
    },
    action(action: string, path: string) {
      if (!siteActions.includes(action as (typeof siteActions)[number])) return;
      if (options.now() - lastActionAt < 1000) return;
      if (send("custom", path, { event: action })) lastActionAt = options.now();
    },
  };
}
