'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { workData } from '@/assets/assets';
import { gsap, useGSAP } from '../lib/gsap';
import { smooth } from '../lib/smooth';
import { motionOk, revealLines } from '../lib/reveal';

const arrow = (
  <svg
    viewBox="0 0 24 24"
    className="size-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

// Wide screens pin the section and slide the rail sideways with scroll.
// Phones and reduced motion keep a native, swipeable, snapping rail.
const Work = () => {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionOk, () => revealLines('.work-title'));

      mm.add(`${motionOk} and (min-width: 1024px)`, () => {
        const el = root.current;
        const rail = track.current;
        const dist = () => Math.max(rail.scrollWidth - window.innerWidth, 0);
        const tween = gsap.to(rail, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        // Tabbing to an off-screen card scrolls the page to bring it in.
        const onFocus = e => {
          const card = e.target.closest('[data-card]');
          if (!card) return;
          const st = tween.scrollTrigger;
          const p = Math.min(Math.max((card.offsetLeft - 32) / dist(), 0), 1);
          const y = st.start + p * (st.end - st.start);
          if (smooth.lenis) smooth.lenis.scrollTo(y, { immediate: true });
          else window.scrollTo(0, y);
        };
        rail.addEventListener('focusin', onFocus);
        return () => {
          rail.removeEventListener('focusin', onFocus);
        };
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="work"
      className="relative bg-ground py-20 lg:flex lg:h-svh lg:items-center lg:overflow-x-clip lg:py-0"
    >
      <div className="w-full scroll-pl-4 overflow-x-auto sm:scroll-pl-8 [scrollbar-width:none] snap-x snap-mandatory lg:overflow-visible">
        <div
          ref={track}
          className="flex w-max gap-4 px-4 sm:gap-6 sm:px-8 lg:h-[72svh] lg:items-stretch"
        >
          <div className="flex w-[82vw] shrink-0 snap-start flex-col justify-between sm:w-[60vw] lg:w-[30vw]">
            <p className="label text-muted">Selected work</p>
            <h2 className="work-title display my-10 text-[clamp(2.6rem,7vw,6rem)] lg:my-0">
              Latest builds
            </h2>
            <p className="max-w-sm text-lg">
              Four projects from the stack: file sharing, food reviews, QR codes
              and this portfolio.
              <span className="mt-4 block text-muted lg:hidden">
                Swipe to browse.
              </span>
            </p>
          </div>

          {workData.map((project, i) => (
            <a
              key={project.title}
              data-card
              data-tilt
              data-cursor="Visit"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="sweep-host group relative flex aspect-[4/5] w-[78vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl bg-panel sm:w-[52vw] lg:aspect-auto lg:w-[34vw]"
            >
              <span
                data-tilt-layer
                aria-hidden="true"
                className="absolute -inset-4"
              >
                <Image
                  src={project.bgImage}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 52vw, 34vw"
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease)] group-hover:scale-105 group-focus-visible:scale-105"
                />
              </span>
              <span className="label relative m-5 w-fit rounded-full bg-night/80 px-3 py-1.5 text-paper backdrop-blur">
                0{i + 1}
              </span>
              <span className="sweep relative m-3 flex items-end justify-between gap-4 rounded-2xl bg-ground/95 p-5 text-ink backdrop-blur">
                <span className="min-w-0">
                  <span className="display block text-2xl lg:text-[1.7rem]">
                    {project.title}
                  </span>
                  <span className="mt-2 block text-sm opacity-75">
                    {project.description}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-night text-lime"
                >
                  {arrow}
                </span>
              </span>
            </a>
          ))}

          <a
            href="https://github.com/muzammil-shayk"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GitHub"
            className="sweep sweep-host flex w-[70vw] shrink-0 snap-start flex-col justify-between rounded-3xl border border-line p-6 sm:w-[40vw] lg:w-[26vw]"
          >
            <span className="label text-muted">More</span>
            <span className="display text-[clamp(2.2rem,4vw,3.6rem)]">
              Everything on GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
            <span
              aria-hidden="true"
              className="grid size-12 place-items-center self-end rounded-full bg-night text-lime"
            >
              {arrow}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;
