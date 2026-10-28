'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { scrollToHash } from '../lib/smooth';
import { silicon } from '../lib/silicon';
import SiliconCanvas from './SiliconCanvas';

const chapters = [
  ['01', 'Interface', 'React, Next.js and Angular: fast, responsive screens.'],
  ['02', 'Engine', 'NestJS and REST APIs, carrying every request.'],
  ['03', 'Data', 'SQL and MongoDB, modelled to fit the problem.'],
  ['04', 'Foundations', 'C++ and algorithms, the core it all started from.'],
];

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
};

const jump = href => e => {
  e.preventDefault();
  scrollToHash(href);
};

const Hero = () => {
  const root = useRef(null);
  const [webgl, setWebgl] = useState(false);
  const [active, setActive] = useState(true);
  const [still, setStill] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [ready, setReady] = useState(false);

  // Mount the canvas after hydration so the hero text paints first.
  useEffect(() => {
    const t = setTimeout(() => {
      setStill(matchMedia('(prefers-reduced-motion: reduce)').matches);
      setNarrow(matchMedia('(max-width: 700px)').matches);
      setWebgl(hasWebGL());
    }, 0);
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
    io.observe(root.current);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);

  // Pointer tilts the board and lights nearby traces. Touch has no hover, so
  // the scene wanders on its own after a few idle seconds.
  useEffect(() => {
    const move = e => {
      silicon.px = (e.clientX / window.innerWidth) * 2 - 1;
      silicon.py = 1 - (e.clientY / window.innerHeight) * 2;
      silicon.moved = performance.now() / 1000;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        silicon.progress = 0.12;
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        silicon.progress = 0;
        // Intro: the name rises through masks, the rest follows.
        const split = SplitText.create('.hero-giant', {
          type: 'chars',
          mask: 'chars',
          autoSplit: true,
          onSplit: self => {
            gsap.set('.hero-intro', { visibility: 'visible' });
            return gsap
              .timeline()
              .from(self.chars, {
                yPercent: 115,
                duration: 1.1,
                ease: 'expo.out',
                stagger: 0.045,
              })
              .from(
                '.hero-fade',
                {
                  autoAlpha: 0,
                  y: 24,
                  duration: 0.9,
                  ease: 'expo.out',
                  stagger: 0.08,
                },
                0.35
              );
          },
        });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () =>
              `+=${window.innerHeight * (window.innerWidth < 700 ? 2.2 : 3)}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(silicon, { progress: 1, duration: 1 }, 0)
          .to(
            '.hero-giant-wrap',
            { yPercent: 55, autoAlpha: 0, duration: 0.12 },
            0
          )
          .fromTo(
            '.hero-top',
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.08, immediateRender: false },
            0
          );

        gsap.utils.toArray('.cap').forEach((el, i) => {
          const at = 0.13 + i * 0.185;
          tl.fromTo(
            el,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.05 },
            at
          ).to(el, { autoAlpha: 0, y: -40, duration: 0.05 }, at + 0.13);
        });

        // The lime sun grows to fill the screen and becomes the next section.
        tl.fromTo(
          '.hero-sun',
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(150% at 50% 50%)', duration: 0.1 },
          0.9
        );

        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      onPointerDown={e => {
        if (e.target.closest('a, button')) return;
        silicon.clickX = (e.clientX / window.innerWidth) * 2 - 1;
        silicon.clickY = 1 - (e.clientY / window.innerHeight) * 2;
        silicon.clickT = performance.now();
      }}
      className="relative h-svh overflow-hidden bg-night text-paper [container-type:inline-size]"
    >
      <div aria-hidden="true" className="hero-poster absolute inset-0" />
      {webgl && (
        <div className="scene-wrap absolute inset-0" data-ready={ready}>
          <SiliconCanvas
            active={active}
            still={still}
            narrow={narrow}
            onReady={() => setReady(true)}
          />
        </div>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/90 to-transparent"
      />
      {/* Keeps the chapter captions legible over the glyph field. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-night/80 to-transparent sm:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 inset-y-0 z-10 sm:inset-x-8"
      >
        {chapters.map(([n, title, body]) => (
          <div
            key={n}
            className="cap invisible absolute bottom-8 left-0 max-w-xs sm:top-[24%] sm:bottom-auto sm:max-w-md"
          >
            <p className="label text-lime">{n}</p>
            <p className="display mt-3 text-[clamp(2.4rem,7vw,5.5rem)]">
              {title}
            </p>
            <p className="mt-4 text-base text-paper/85 sm:text-lg">{body}</p>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-4 pt-24 pb-6 sm:px-8 sm:pb-8">
        <div className="hero-top hero-intro flex items-start justify-between gap-4">
          <p className="hero-fade label max-w-[14ch] pt-3 sm:max-w-none">
            Full Stack Developer
          </p>
          <a
            href="#work"
            onClick={jump('#work')}
            className="hero-fade flex items-center gap-3 rounded-full bg-paper/10 py-1.5 pr-1.5 pl-1.5 text-sm sm:pl-4 ring-1 ring-paper/20 backdrop-blur-md md:hidden"
          >
            <span className="label hidden text-paper/75 sm:inline">
              Latest build
            </span>
            <span className="rounded-full bg-lime px-3 py-1.5 font-semibold text-night">
              AirBeam
            </span>
          </a>
        </div>

        <div className="min-h-0 flex-1" />

        <div className="hero-giant-wrap">
          <div className="hero-top hero-intro hero-fade mb-4 flex items-center gap-3 motion-reduce:hidden [@media(max-height:700px)]:hidden">
            <span
              aria-hidden="true"
              className="scroll-cue grid size-9 place-items-center rounded-full bg-lime text-night"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </span>
            <span className="label">Scroll to dive</span>
          </div>
          <h1 className="hero-intro">
            <span className="label block">Muhammad</span>
            <span className="display hero-giant block text-[calc((100cqw-2rem)/6.05)] sm:text-[calc((100cqw-4rem)/6.05)] leading-[0.82] whitespace-nowrap">
              Muzammil
            </span>
            <span className="sr-only"> — Full Stack Developer</span>
          </h1>
          <div className="hero-intro mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="hero-fade max-w-md text-base [@media(max-height:700px)]:hidden text-paper/85 sm:text-lg">
              Full stack developer in the making: C++, JavaScript, React,
              Next.js, SQL and MongoDB.
            </p>
            <div className="hero-fade flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={jump('#contact')}
                data-magnetic
                className="btn bg-lime text-night"
              >
                Contact me
              </a>
              <a href="/MuzammilCV.pdf" download data-magnetic className="btn">
                My resume
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hero-sun pointer-events-none absolute inset-0 z-20 bg-lime"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      />
    </section>
  );
};

export default Hero;
