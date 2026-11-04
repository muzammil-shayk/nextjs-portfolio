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
const pad = n => String(n).padStart(2, '0');
const total = workData.length;
// Lenis eases out, never past the target: no overshoot.
const easeOut = t => 1 - Math.pow(1 - t, 3);

const Work = () => {
  const root = useRef(null);
  const track = useRef(null);
  const scroller = useRef(null);
  const counter = useRef(null);
  const bar = useRef(null);
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);
  // Set while the desktop pin is live; otherwise the rail scrolls natively.
  const pin = useRef(null);

  const cards = () => [...track.current.querySelectorAll('[data-card]')];

  // Counter, bar and button states follow the rail's progress (0..1).
  const paint = progress => {
    if (!counter.current || !track.current) return; // unmounted
    const list = cards();
    let i = 0;
    list.forEach((card, k) => {
      if (Math.abs(at(card) - progress) < Math.abs(at(list[i]) - progress))
        i = k;
    });
    if (progress > 0.995) i = list.length - 1;
    counter.current.textContent = `${pad(i + 1)} / ${pad(total)}`;
    bar.current.style.transform = `scaleX(${Math.max(progress, 0.02)})`;
    // aria-disabled, not disabled: a focused button keeps focus at the edge.
    prevBtn.current.setAttribute('aria-disabled', progress < 0.005);
    nextBtn.current.setAttribute('aria-disabled', progress > 0.995);
  };

  // Native rail: the scrollLeft where snap-center settles this card.
  const snapLeft = card => {
    const el = scroller.current;
    const max = el.scrollWidth - el.clientWidth;
    const left = card.offsetLeft + card.offsetWidth / 2 - el.clientWidth / 2;
    return Math.min(Math.max(left, 0), max);
  };

  // Rail position (0..1) at which a card is in place.
  const at = card => {
    const el = scroller.current;
    return pin.current
      ? Math.min(Math.max((card.offsetLeft - 32) / pin.current.dist(), 0), 1)
      : snapLeft(card) / Math.max(el.scrollWidth - el.clientWidth, 1);
  };

  // Next/previous = the nearest card that actually moves the rail; past the
  // last one, go to the rail's end (or start).
  const go = dir => {
    const el = scroller.current;
    const max = Math.max(el.scrollWidth - el.clientWidth, 1);
    const now = pin.current ? pin.current.st.progress : el.scrollLeft / max;
    if (dir > 0 ? now > 0.995 : now < 0.005) return;
    const list = cards();
    const card =
      dir > 0
        ? list.find(c => at(c) > now + 0.01)
        : list.findLast(c => at(c) < now - 0.01);
    const target = card ? at(card) : dir > 0 ? 1 : 0;
    if (pin.current) {
      const { st } = pin.current;
      const y = st.start + target * (st.end - st.start);
      if (smooth.lenis)
        smooth.lenis.scrollTo(y, { duration: 1.1, easing: easeOut });
      else window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollTo({ left: target * max, behavior: still ? 'auto' : 'smooth' });
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionOk, () => revealLines('.work-title'));

      // Native rail (phones, reduced motion): one rAF per scroll frame.
      const el = scroller.current;
      let raf = 0;
      const paintNative = () => {
        const max = el.scrollWidth - el.clientWidth;
        paint(max > 0 ? el.scrollLeft / max : 0);
      };
      const onScroll = () => {
        if (pin.current || raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          paintNative();
        });
      };
      el.addEventListener('scroll', onScroll, { passive: true });
      paint(0);

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
            onUpdate: self => paint(self.progress),
          },
        });
        pin.current = { st: tween.scrollTrigger, dist };
        paint(tween.scrollTrigger.progress);
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
          pin.current = null;
          // Leaving the pin (resize below 1024 px, reduced motion on): repaint
          // from the native rail once the layout has settled.
          raf = requestAnimationFrame(() => {
            raf = 0;
            paintNative();
          });
        };
      });

      return () => {
        el.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(raf);
      };
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="work"
      className="relative bg-ground py-20 lg:flex lg:h-svh lg:items-center lg:overflow-x-clip lg:py-0"
    >
      <div
        ref={scroller}
        id="work-rail"
        className="w-full scroll-pl-4 overflow-x-auto sm:scroll-pl-8 [scrollbar-width:none] snap-x snap-mandatory lg:motion-safe:overflow-visible"
      >
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
              Eight builds across web, mobile, desktop and games, from file
              sharing to a handwriting renderer.
              <span className="mt-4 block text-muted lg:hidden">
                Swipe to browse, or use the arrows below.
              </span>
            </p>
          </div>

          {workData.map((project, i) => (
            <article
              key={project.title}
              data-card
              data-tilt
              data-cursor={project.link ? 'Visit' : undefined}
              className={`${project.link ? 'sweep-host ' : ''}group relative flex min-h-[24rem] w-[78vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl bg-panel sm:w-[52vw] lg:aspect-auto lg:w-[34vw]`}
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
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease)] group-hover:scale-105 group-has-[:focus-visible]:scale-105"
                />
              </span>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title}: ${project.linkLabel ?? 'visit'} (opens in a new tab)`}
                  className="absolute inset-0 rounded-3xl focus-visible:outline-offset-[-4px]"
                />
              )}
              <span className="pointer-events-none relative m-5 flex shrink-0 flex-wrap items-center gap-2">
                <span className="label rounded-full bg-night/80 px-3 py-1.5 text-paper backdrop-blur">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="label rounded-full bg-lime px-3 py-1.5 text-night">
                  {project.platform}
                </span>
              </span>
              <div className="sweep pointer-events-none relative m-3 flex shrink-0 flex-col gap-4 rounded-2xl bg-ground/95 p-5 text-ink backdrop-blur">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="display block text-2xl lg:text-[1.7rem]">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm">
                      <span className="label mr-2">Problem</span>
                      {project.problem}
                    </p>
                    <p className="mt-2 text-sm opacity-80">{project.summary}</p>
                  </div>
                  {project.link && (
                    <span
                      aria-hidden="true"
                      className="grid size-11 shrink-0 place-items-center rounded-full bg-night text-lime"
                    >
                      {arrow}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="sr-only">Built with: </span>
                  <span className="flex min-w-0 flex-wrap gap-x-3 gap-y-1 text-xs font-semibold opacity-70">
                    {project.stack.map(t => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Code"
                      className="label pointer-events-auto relative -my-2 inline-flex min-h-11 items-center rounded-full px-1 underline underline-offset-4"
                    >
                      Source
                      <span className="sr-only">
                        {' '}
                        code for {project.title} (opens in a new tab)
                      </span>
                    </a>
                  ) : (
                    !project.link && (
                      <span className="label opacity-70">
                        {project.note ?? 'Private build'}
                      </span>
                    )
                  )}
                </div>
              </div>
            </article>
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

      <div className="mt-8 flex items-center gap-4 px-4 sm:px-8 lg:absolute lg:inset-x-0 lg:bottom-[5svh] lg:mt-0">
        <div className="flex gap-2">
          <button
            ref={prevBtn}
            type="button"
            aria-label="Previous project"
            aria-controls="work-rail"
            onClick={() => go(-1)}
            className="grid size-11 place-items-center rounded-full bg-night text-lime transition-opacity duration-300 aria-disabled:opacity-35"
          >
            <span aria-hidden="true" className="rotate-[-135deg]">
              {arrow}
            </span>
          </button>
          <button
            ref={nextBtn}
            type="button"
            aria-label="Next project"
            aria-controls="work-rail"
            onClick={() => go(1)}
            className="grid size-11 place-items-center rounded-full bg-night text-lime transition-opacity duration-300 aria-disabled:opacity-35"
          >
            <span aria-hidden="true" className="rotate-45">
              {arrow}
            </span>
          </button>
        </div>
        <p className="label tabular-nums" aria-hidden="true">
          <span ref={counter}>01 / {pad(total)}</span>
        </p>
        {/* Short progress meter, not a line across the page. */}
        <span
          aria-hidden="true"
          className="h-1 w-24 overflow-hidden rounded-full bg-line sm:w-40"
        >
          <span
            ref={bar}
            className="block h-full origin-left rounded-full bg-ink"
            style={{ transform: 'scaleX(0.02)' }}
          />
        </span>
      </div>
    </section>
  );
};

export default Work;
