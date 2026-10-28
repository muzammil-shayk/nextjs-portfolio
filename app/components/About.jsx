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
            From C++ to the full stack
          </h2>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed sm:text-xl">
            I am a beginner full stack developer passionate about building
            projects that connect frontend and backend. My journey began with
            C++ which strengthened my problem solving foundation, and I later
            expanded into JavaScript, React.js, and Next.js for modern web
            development. On the backend I work with NestJS and SQL, while also
            using MongoDB for database management. I am currently exploring
            Angular at an introductory level to broaden my understanding of
            frameworks. I focus on learning through projects, experimenting with
            new tools, and improving my coding practices to grow into a
            versatile developer.
          </p>

          <dl className="mt-14 border-t border-line">
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
