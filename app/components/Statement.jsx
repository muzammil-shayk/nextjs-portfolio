'use client';
import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { motionOk } from '../lib/reveal';

// The sun from the hero grows into this lime ground. Words light up as you
// scroll through the pinned sentence.
const Statement = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionOk, () => {
        SplitText.create('.statement-text', {
          type: 'words',
          autoSplit: true,
          onSplit: self =>
            gsap.fromTo(
              self.words,
              { opacity: 0.18 },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.1,
                scrollTrigger: {
                  trigger: root.current,
                  start: 'top 15%',
                  end: 'bottom bottom',
                  scrub: true,
                },
              }
            ),
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative h-[190svh] bg-lime text-night">
      <div className="sticky top-0 flex h-svh flex-col justify-center px-4 sm:px-8">
        <p className="label mb-8">Intro</p>
        <p className="statement-text max-w-[20ch] text-[clamp(2.3rem,7.2vw,7rem)] leading-[1] font-bold tracking-[-0.035em] sm:max-w-[22ch]">
          Started with C++. Now building the whole stack, from the interface
          people touch to the database behind it.
        </p>
      </div>
    </section>
  );
};

export default Statement;
