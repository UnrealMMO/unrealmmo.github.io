# Sentinel integration and consent

Implemented 1 November 2026 for unrealmmo.com. The banner contains one sentence, a privacy link and two equally prominent buttons: **Accept necessary** and **Accept all**. No heading, extra explanation, preference summary or additional button. The footer permanently exposes Cookie settings. The site remains usable without choosing.

## Plan and integration decisions

1. Keep optional analytics off until explicit acceptance. Use the same default everywhere, with no collection or backlog of pre-consent activity.
2. Save the necessary preference in the first-party `unrealmmo_consent` cookie for 180 days (versioned, Secure on HTTPS, SameSite=Lax). Expired/invalid/unknown versions require a fresh choice. If saving fails, stop tracking in that tab.
3. Use Sentinel's documented Track API with the user-supplied **public ingestion product key**. No management credential is included. The authenticated official [API reference](https://sentinel.smartify.ai/docs/api) describes pageview/custom events and notes that its general-purpose script also automatically starts session replay and email form identification. This integration uses controlled events instead of that script.
4. Track public pageviews across Next.js navigation and three curated actions: server-address copy clicks, Season Pass openings and opening its reward road. Include random visit IDs, event time and a broad mobile/desktop classification. Strip query strings/fragments; retain only the referrer's origin. Never send form/search contents, emails, Minecraft identities or payment details. No replay, heatmaps, advertising tags or automatic identification.
5. Use tab-scoped `unrealmmo_analytics_session` session storage after acceptance only; expire its random visit identifiers after 30 minutes of inactivity. No persistent returning-visitor identifier. Local previews do not transmit to Sentinel.
6. Recheck the saved choice before every event. Withdrawal clears optional IDs, aborts pending requests, and synchronizes through BroadcastChannel; focus/visibility checks provide a fallback. Already delivered events cannot be undone. No retries or unload beacons; requests are bounded to four and curated actions to one per second.
7. Name the provider and document the collected fields, storage duration and withdrawal in the existing privacy policy. Make both choices equally easy, keyboard accessible and readable on mobile. This follows the [ICO's guidance on consent in practice](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-we-manage-consent-in-practice/).

## Verification

`npm run verify` passed: 33 tests, a production build, and static checks across 81 HTML exports, 3,517 local references, 411 image alternatives, 72 unlock rows, 50 Wiki destinations and 43 reward destinations. Seven consent/analytics tests cover default refusal, malformed/expired/versioned decisions, opt-in, route deduplication, URL minimization, withdrawal/aborting pending requests, cross-tab consent rechecks, curated actions and bounded requests.

Browser checks on the actual static export: initial consent banner; necessary-only persists after reload; accepting all and navigating to the Wiki; settings reopening with focus moved to the banner; switching back to necessary; two-tab acceptance and withdrawal synchronization. Final concise layouts inspected at desktop and 390 × 844 mobile sizes. Screenshots are retained here. Local analytics transport is intentionally disabled; the browser UI check does not constitute a network capture of production analytics.

A separate local diagnostic page sent one explicitly labelled `integration_check` event to the supplied product through the real browser: **HTTP 200, `{"ok":true}`**, retained in `connection-check.png`. Direct CLI calls received Vercel 429 security challenges; no security protections were changed or bypassed. The actual browser request succeeded. Sentinel dashboard counts, server-side retention settings and deletion workflows were not changed or independently audited. The first-party integration sends no cross-site credentials. This does not certify legal compliance for every jurisdiction.

`verification.json` retains hashes for the final source and screenshots. Publish through the existing verified-main GitHub Pages workflow; no Minecraft server restart is involved.
