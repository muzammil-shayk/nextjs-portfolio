'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { assets, infoList } from '@/assets/assets';
import { gsap, useGSAP } from '../lib/gsap';
import { motionOk, revealLines } from '../lib/reveal';

const About = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionOk, () => {
        revealLines('.about-title');
        gsap.fromTo(
          '.about-frame',
          { clipPath: 'inset(100% 0% 0% 0% round 1.5rem)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
            ease: 'none',
            scrollTrigger: {
              trigger: '.about-frame',
              start: 'top 92%',
              end: 'top 40%',
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          '.about-img',
          { yPercent: -8, scale: 1.18 },
          {
            yPercent: 8,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: '.about-frame',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="about"
      className="relative z-10 -mt-10 scroll-mt-0 rounded-t-[2.5rem] bg-ground px-4 pt-20 pb-24 sm:px-8 sm:pt-28 lg:pb-36"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="about-frame relative aspect-[4/5] overflow-hidden rounded-3xl bg-panel lg:sticky lg:top-24">
            <Image
              src={assets.user_image}
              alt="Muhammad Muzammil"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="about-img object-cover object-[50%_30%]"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="label text-muted">About me</p>
          <h2 className="about-title display mt-5 text-[clamp(2.4rem,6vw,5.5rem)]">
            From C++ to every screen
          </h2>
          <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed sm:text-xl">
            <p>
              I&apos;m Muzammil, a full-stack engineer in Lahore. I study
              Computer Science at UMT Lahore (BS, 2023 to now, CGPA 3.50) and
              interned as a software engineer at Greyloops (on-site, Johar Town,
              Lahore) in 2025, on MERN and Next.js apps.
            </p>
            <p>
              I like products that get all the way out the door. A review
              platform with a site and a phone app on one API, built with
              friends. A desktop reader with its own release pipeline,
              co-developed. A file-sharing site that deletes everything after
              five minutes. I work on the backend, the screens and the build
              that ships them.
            </p>
            <p>
              I use AI coding tools every day, and I read and test what they
              write. They make me faster; they do not replace checking.
            </p>
            <p>
              Outside code: I have built and repaired more than a dozen PCs for
              friends and local clients, and I like indie games and good cafes
              in Lahore.
            </p>
          </div>

          <h3 className="label mt-14 text-muted">Skills</h3>
          <dl className="mt-4 border-t border-line">
            {infoList.map(({ title, description }) => (
              <div
                key={title}
                className="grid gap-2 border-b border-line py-6 sm:grid-cols-[14rem_1fr] sm:gap-8"
              >
                <dt className="label pt-1 text-muted">{title}</dt>
                <dd className="text-lg">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
