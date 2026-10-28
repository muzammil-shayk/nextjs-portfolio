'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, reducedMotionQuery } from '../lib/gsap';
import { smooth } from '../lib/smooth';

// Lenis is the single scroll authority; GSAP's ticker is the single clock.
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia(reducedMotionQuery).matches) return;
    const lenis = new Lenis({ lerp: 0.1 });
    smooth.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = t => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      smooth.lenis = null;
    };
  }, []);
  return null;
}
