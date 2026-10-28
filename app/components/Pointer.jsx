'use client';
import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

const DOT = 0.14; // resting size: a 13px dot (the bubble is 96px at scale 1)

// All pointer polish lives here, in one passive listener set:
//  - a lime dot that follows the pointer and swells into a labelled bubble over
//    [data-cursor] targets (smoothed with gsap.quickTo, transforms only),
//  - [data-magnetic] buttons and pills lean toward the pointer,
//  - [data-tilt] cards slide their [data-tilt-layer] against the pointer.
// It mounts only for fine pointers. Reduced motion keeps the labels and dot but
// drops the smoothing, the magnet and the tilt.
export default function Pointer() {
  const root = useRef(null);
  const bubble = useRef(null);
  const label = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        fine: '(hover: hover) and (pointer: fine)',
        calm: '(prefers-reduced-motion: reduce)',
      },
      ({ conditions }) => {
        if (!conditions.fine) return;
        const k = conditions.calm ? 0 : 1; // 0 = no easing at all
        const el = root.current;
        const qx = gsap.quickTo(el, 'x', { duration: 0.4 * k, ease: 'power3' });
        const qy = gsap.quickTo(el, 'y', { duration: 0.4 * k, ease: 'power3' });
        const pos = { x: 0, y: 0 };
        let shown = false;
        let scale = DOT;
        let magnet = null;
        let tilt = null;
        const quick = new WeakMap(); // element -> { x, y } quickTo setters

        const show = on => {
          if (shown === on) return;
          shown = on;
          gsap.to(el, {
            autoAlpha: on ? 1 : 0,
            duration: 0.3 * k,
            overwrite: 'auto',
          });
        };

        const setScale = (s, d = 0.6) => {
          scale = s;
          gsap.to(bubble.current, {
            scale: s,
            duration: d * k,
            ease: 'expo.out',
            overwrite: 'auto',
          });
        };

        // Decide what the bubble should be for whatever is under the pointer.
        const apply = node => {
          const t = node?.closest?.('[data-cursor]');
          const field = node?.closest?.('input, textarea');
          label.current.textContent = t ? t.dataset.cursor : '';
          gsap.to(label.current, {
            autoAlpha: t ? 1 : 0,
            duration: 0.25 * k,
            overwrite: 'auto',
          });
          setScale(field ? 0 : t ? 1 : DOT);
        };

        const setters = node => {
          let q = quick.get(node);
          if (!q) {
            q = {
              x: gsap.quickTo(node, 'x', { duration: 0.5, ease: 'power3' }),
              y: gsap.quickTo(node, 'y', { duration: 0.5, ease: 'power3' }),
            };
            quick.set(node, q);
          }
          return q;
        };
        const release = node =>
          gsap.to(node, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.45)',
            overwrite: 'auto',
          });

        const move = e => {
          pos.x = e.clientX;
          pos.y = e.clientY;
          qx(pos.x);
          qy(pos.y);
          show(true);
          if (conditions.calm) return;

          const m = e.target.closest?.('[data-magnetic]') ?? null;
          if (m !== magnet) {
            if (magnet) release(magnet);
            magnet = m;
          }
          if (magnet) {
            const r = magnet.getBoundingClientRect();
            const q = setters(magnet);
            q.x((e.clientX - (r.left + r.width / 2)) * 0.28);
            q.y((e.clientY - (r.top + r.height / 2)) * 0.28);
          }

          const t = e.target.closest?.('[data-tilt]') ?? null;
          if (t !== tilt) {
            tilt?.querySelectorAll('[data-tilt-layer]').forEach(release);
            tilt = t;
          }
          if (tilt) {
            const r = tilt.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            tilt.querySelectorAll('[data-tilt-layer]').forEach(layer => {
              const q = setters(layer);
              q.x(-nx * 28);
              q.y(-ny * 28);
            });
          }
        };

        const over = e => apply(e.target);
        const down = () => setScale(scale * 0.8, 0.25);
        const up = () => apply(document.elementFromPoint(pos.x, pos.y));
        const leave = () => show(false);

        // While the page scrolls under a still pointer the browser may not
        // report the new element, so settle the bubble when scrolling stops.
        const onScrollStart = () => setScale(DOT, 0.3);
        const onScrollEnd = () => {
          if (shown) apply(document.elementFromPoint(pos.x, pos.y));
        };

        window.addEventListener('pointermove', move, { passive: true });
        document.addEventListener('pointerover', over);
        document.addEventListener('pointerdown', down);
        document.addEventListener('pointerup', up);
        document.documentElement.addEventListener('pointerleave', leave);
        ScrollTrigger.addEventListener('scrollStart', onScrollStart);
        ScrollTrigger.addEventListener('scrollEnd', onScrollEnd);
        return () => {
          window.removeEventListener('pointermove', move);
          document.removeEventListener('pointerover', over);
          document.removeEventListener('pointerdown', down);
          document.removeEventListener('pointerup', up);
          document.documentElement.removeEventListener('pointerleave', leave);
          ScrollTrigger.removeEventListener('scrollStart', onScrollStart);
          ScrollTrigger.removeEventListener('scrollEnd', onScrollEnd);
        };
      }
    );
  });

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none invisible fixed top-0 left-0 z-[70] hidden opacity-0 [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      <div
        ref={bubble}
        className="absolute -top-12 -left-12 size-24 rounded-full bg-lime shadow-[0_0_0_1.5px_rgb(16_20_0/0.55)] [transform:scale(0.14)]"
      />
      <span
        ref={label}
        className="absolute -top-3 -left-12 w-24 text-center text-sm font-semibold text-night opacity-0"
      />
    </div>
  );
}
