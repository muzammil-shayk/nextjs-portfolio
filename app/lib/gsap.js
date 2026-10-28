import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

// One place registers plugins so every component shares a single GSAP engine.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

// Reduced motion is checked once per use so a settings change applies on reload.
export const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
