'use client';
import { useRef } from 'react';
import { toolsData } from '@/assets/assets';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { motionOk } from '../lib/reveal';

const Row = ({ outline }) => (
  <div className="marquee-row flex w-max">
    {[0, 1].map(copy => (
      <ul
        key={copy}
        aria-hidden={copy === 1 || undefined}
        className="flex shrink-0 items-center"
      >
        {toolsData.map(tool => (
          <li
            key={tool}
            className={`display flex items-center px-6 text-[clamp(3.5rem,11vw,9rem)] ${
              outline ? 'text-ink/20' : ''
            }`}
          >
            {tool}
            <span
              aria-hidden="true"
              className="ml-12 size-4 shrink-0 rounded-full bg-lime sm:size-6"
            />
          </li>
        ))}
      </ul>
    ))}
  </div>
);

// Two tool rows run in opposite directions and speed up with scroll velocity.
const Marquee = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionOk, () => {
        const rows = gsap.utils.toArray('.marquee-row');
        const loops = rows.map((row, i) =>
          gsap.fromTo(
            row,
            { xPercent: i ? -50 : 0 },
            { xPercent: i ? 0 : -50, duration: 38, ease: 'none', repeat: -1 }
          )
        );
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: self => loops.forEach(l => l.paused(!self.isActive)),
          onUpdate: self => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 8);
            loops.forEach(l => {
              l.timeScale(boost);
              gsap.to(l, { timeScale: 1, duration: 0.8, overwrite: true });
            });
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-label="Tools"
      className="overflow-hidden bg-ground py-16 text-ink"
    >
      <Row />
      <Row outline />
    </section>
  );
};

export default Marquee;
