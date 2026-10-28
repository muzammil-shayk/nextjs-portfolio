import { gsap, SplitText } from './gsap';

// Scrubbed line reveal: each line rises out of a mask as its heading crosses
// the viewport, and sinks back when scrolled up. Call inside a matchMedia
// no-preference context so cleanup and reduced motion are handled for you.
export function revealLines(targets) {
  gsap.utils.toArray(targets).forEach(el => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: self =>
        gsap.from(self.lines, {
          yPercent: 110,
          ease: 'none',
          stagger: 0.2,
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 58%',
            scrub: true,
          },
        }),
    });
  });
}

export const motionOk = '(prefers-reduced-motion: no-preference)';
