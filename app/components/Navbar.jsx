'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { scrollToHash, smooth } from '../lib/smooth';
import { hireHref, site } from '@/assets/assets';

const links = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const bar = useRef(null);
  const hidden = useRef(false);

  const setHidden = (value, duration = 0.5) => {
    if (hidden.current === value) return;
    hidden.current = value;
    gsap.to(bar.current, {
      yPercent: value ? -140 : 0,
      duration,
      ease: 'expo.out',
      overwrite: 'auto',
    });
  };

  // The bar steps aside while scrolling down and returns on any upward scroll.
  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self =>
        setHidden(self.direction === 1 && self.scroll() > 160 && !menuOpen),
    });
  });

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = e => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    smooth.lenis?.stop();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      smooth.lenis?.start();
    };
  }, [menuOpen]);

  const go = href => e => {
    e.preventDefault();
    setMenuOpen(false);
    // Wait for the scroll lock from the open menu is released first.
    setTimeout(() => scrollToHash(href), 80);
  };

  return (
    <>
      <header
        ref={bar}
        onFocus={() => setHidden(false, 0.3)}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pt-4 sm:px-8"
      >
        <a
          href="#top"
          onClick={go('#top')}
          data-magnetic
          aria-label="Muhammad Muzammil, back to top"
          className="flex h-12 items-center gap-2 rounded-full bg-night px-5 text-paper ring-1 ring-paper/15 focus-visible:outline-offset-[-5px]"
        >
          <span aria-hidden="true" className="size-2.5 rounded-full bg-lime" />
          <span className="display text-base tracking-tight">Muzammil</span>
        </a>

        <nav
          aria-label="Main"
          className="absolute top-4 left-1/2 hidden h-12 -translate-x-1/2 items-center rounded-full bg-night px-3 text-paper ring-1 ring-paper/15 lg:flex"
        >
          <ul className="flex items-center">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={go(href)}
                  data-magnetic
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors duration-300 hover:bg-lime hover:text-night focus-visible:bg-lime focus-visible:text-night"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={hireHref}
          data-magnetic
          className="hidden h-12 items-center gap-3 rounded-full bg-night pr-1.5 pl-4 text-sm text-paper ring-1 ring-paper/15 focus-visible:outline-offset-[-5px] lg:flex"
        >
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-lime" />
            <span className="label text-paper/75">
              Available<span className="hidden xl:inline"> for work</span>
            </span>
          </span>
          <span className="rounded-full bg-lime px-3 py-1.5 font-semibold text-night">
            Hire me
          </span>
        </a>

        <button
          type="button"
          className="grid size-12 place-items-center rounded-full bg-lime text-night focus-visible:outline-offset-[-5px] lg:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </header>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className="fixed inset-0 z-[60] flex flex-col bg-night px-6 pt-4 pb-10 text-paper transition-[clip-path] duration-700 [clip-path:inset(0_0_100%_0)] data-[open=true]:[clip-path:inset(0)] lg:hidden"
        data-open={menuOpen}
        style={{ transitionTimingFunction: 'var(--ease)' }}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="grid size-12 place-items-center self-end rounded-full bg-lime text-night"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
        <nav aria-label="Mobile" className="mt-auto">
          <ul className="flex flex-col gap-2">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={go(href)}
                  className="display block py-1 text-5xl hover:text-lime focus-visible:text-lime"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <p className="label mt-10 flex items-center gap-2 text-paper/75">
            <span aria-hidden="true" className="size-2 rounded-full bg-lime" />
            Available for work · Remote or on-site in Lahore
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={hireHref} className="btn bg-lime text-night">
              Hire me
            </a>
            <a href={site.cv} download className="btn">
              Download CV
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
