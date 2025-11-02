import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerOptions {
  trigger: RefObject<HTMLElement>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  animation?: gsap.core.Timeline | (() => gsap.core.Timeline);
}

export const useScrollTrigger = (options: ScrollTriggerOptions) => {
  useEffect(() => {
    if (!options.trigger.current) return;

    const ctx = gsap.context(() => {
      if (options.animation) {
        const anim = typeof options.animation === 'function' 
          ? options.animation() 
          : options.animation;

        ScrollTrigger.create({
          trigger: options.trigger.current,
          start: options.start || 'top 80%',
          end: options.end || 'bottom 20%',
          scrub: options.scrub || false,
          markers: options.markers || false,
          animation: anim,
        });
      } else {
        ScrollTrigger.create({
          trigger: options.trigger.current,
          start: options.start || 'top 80%',
          end: options.end || 'bottom 20%',
          scrub: options.scrub || false,
          markers: options.markers || false,
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [options]);
};

export const useGSAPAnimation = (
  ref: RefObject<HTMLElement>,
  animationFn: (element: HTMLElement) => void,
  dependencies: unknown[] = []
) => {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      animationFn(ref.current!);
    });

    return () => ctx.revert();
  }, [ref, ...dependencies]);
};
