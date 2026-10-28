'use client';
import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { motionOk } from '../lib/reveal';
import { scrollToHash } from '../lib/smooth';

const socials = [
  { label: 'GitHub', href: 'https://github.com/muzammil-shayk' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhammad-muzammil-8771a4309/',
  },
  { label: 'Resume', href: '/MuzammilCV.pdf' },
];

const Footer = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionOk, () => {
        gsap.fromTo(
          '.footer-word',
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top 85%',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <footer
      ref={root}
      className="relative z-20 -mt-10 rounded-t-[2.5rem] bg-night px-4 pt-20 text-paper [container-type:inline-size] sm:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {socials.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                {...(href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : { download: true })}
                className="label inline-block py-3 underline-offset-8 hover:text-lime hover:underline focus-visible:text-lime"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#top"
          onClick={e => {
            e.preventDefault();
            scrollToHash('#top');
          }}
          data-magnetic
          className="btn"
        >
          Back to top
        </a>
      </div>

      <div className="mt-16 overflow-hidden">
        <p
          aria-hidden="true"
          className="footer-word display pb-[0.04em] text-[calc(100cqw/6.05)] leading-[0.86] whitespace-nowrap"
        >
          Muzammil
        </p>
      </div>

      <div className="flex flex-col gap-2 border-t border-paper/20 py-6 text-sm text-paper/75 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} M. Muzammil. All rights reserved.</p>
        <p>Full Stack Developer</p>
      </div>
    </footer>
  );
};

export default Footer;
