// Holds the Lenis instance so anchors and overlays can drive/stop the one
// scroll authority. Null when smooth scroll is off (reduced motion, SSR).
export const smooth = { lenis: null };

export function scrollToHash(href) {
  const el = href === '#top' ? 0 : document.querySelector(href);
  if (el === null) return;
  if (smooth.lenis) smooth.lenis.scrollTo(el, { duration: 1.4 });
  else if (el === 0) window.scrollTo({ top: 0 });
  else el.scrollIntoView();
}
