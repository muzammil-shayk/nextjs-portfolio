'use client';
import { useRef } from 'react';
import { serviceData } from '@/assets/assets';
import { gsap, useGSAP } from '../lib/gsap';
import { motionOk, revealLines } from '../lib/reveal';

const Services = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionOk, () => revealLines('.services-title'));
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="services"
      className="bg-ground px-4 py-24 sm:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <p className="label text-muted">What I offer</p>
        <h2 className="services-title display mt-5 max-w-[12ch] text-[clamp(2.6rem,7vw,6.5rem)]">
          On the whole circuit
        </h2>
        <p className="mt-8 max-w-2xl text-lg text-muted">
          Clean, functional, responsive web applications: React.js and Next.js
          up front, SQL, MongoDB and NestJS behind, and a C++ habit of keeping
          things efficient.
        </p>

        <ul className="mt-16 border-t border-line">
          {serviceData.map(({ title, description }, i) => (
            <li
              key={title}
              className="sweep sweep-host grid gap-3 border-b border-line px-1 py-8 sm:grid-cols-[4rem_1fr_1fr_2.5rem] sm:items-center sm:gap-8 sm:px-6 sm:py-12"
            >
              <span className="label">0{i + 1}</span>
              <h3 className="row-title display text-[clamp(1.8rem,3.6vw,3.2rem)]">
                {title}
              </h3>
              <p className="max-w-md text-base opacity-80 sm:text-lg">
                {description}
              </p>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="row-arrow hidden size-8 sm:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
