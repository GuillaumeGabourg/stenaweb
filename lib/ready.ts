"use client";

/** The preloader signals when the first viewport may start its entrance. */
const EVENT = "stenaweb:ready";

export function markReady() {
  (window as unknown as { __stenaReady?: boolean }).__stenaReady = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onReady(cb: () => void) {
  if ((window as unknown as { __stenaReady?: boolean }).__stenaReady) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
}
