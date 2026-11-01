export const CONSENT_COOKIE = "unrealmmo_consent";
export const CONSENT_DAYS = 180;
export const CONSENT_MAX_AGE = CONSENT_DAYS * 24 * 60 * 60;
export type Consent = { version: 1; analytics: boolean; updatedAt: number };

export function readConsent(cookies: string, now = Date.now()): Consent | null {
  try {
    const value = cookies
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
    if (!value) return null;
    const record = JSON.parse(
      decodeURIComponent(value.slice(CONSENT_COOKIE.length + 1)),
    );
    if (
      record.version !== 1 ||
      typeof record.analytics !== "boolean" ||
      !Number.isFinite(record.updatedAt) ||
      record.updatedAt > now ||
      now - record.updatedAt >= CONSENT_MAX_AGE * 1000
    )
      return null;
    return record;
  } catch {
    return null;
  }
}

export function consentCookie(
  analytics: boolean,
  now = Date.now(),
  secure = true,
) {
  const record: Consent = { version: 1, analytics, updatedAt: now };
  return `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(record))}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure ? "; Secure" : ""}`;
}
