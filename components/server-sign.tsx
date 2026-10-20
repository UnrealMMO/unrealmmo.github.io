"use client";

import { useEffect, useRef, useState } from "react";

const address = "mc.unrealmmo.com";

export function ServerSign() {
  const [feedback, setFeedback] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copying = useRef(false);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copyAddress() {
    if (copying.current) return;
    copying.current = true;
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(address);
      setFeedback("Address copied");
    } catch {
      setFeedback("Copy unavailable — select the address to copy manually");
    } finally {
      copying.current = false;
      timer.current = setTimeout(() => setFeedback(""), 4000);
    }
  }

  return (
    <div className="server-sign">
      <button
        className="server-sign-button"
        type="button"
        onClick={copyAddress}
        aria-label={`Copy server address ${address}`}
        title="Copy server address"
        data-copied={feedback === "Address copied"}
        data-copy-failed={feedback.startsWith("Copy unavailable")}
      >
        <img
          src="/art/server-placard-v2.webp"
          alt=""
          width="1400"
          height="467"
          draggable="false"
        />
        <span>{address}</span>
      </button>
      <p className="server-version">Minecraft 26.2</p>
      <p
        className="server-copy-feedback"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {feedback}
      </p>
    </div>
  );
}
