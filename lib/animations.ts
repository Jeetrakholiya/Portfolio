/**
 * Animation Architecture & Motion Tokens
 * 
 * Reusable motion tokens, custom cubic-bezier curves, and transition configurations
 * prepared for future animation layers while respecting reduced motion preferences.
 */

export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.6,
  cinematic: 0.85,
  heroName: 0.95,
  reveal: 1.1,
};

export const easings = {
  cinematic: [0.16, 1, 0.3, 1] as const,
  editorial: [0.25, 1, 0.5, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
  power2Out: [0.22, 1, 0.36, 1] as const,
  power3Out: [0.215, 0.61, 0.355, 1] as const,
};

export const transitions = {
  fast: {
    duration: durations.fast,
    ease: easings.smooth,
  },
  normal: {
    duration: durations.normal,
    ease: easings.editorial,
  },
  cinematic: {
    duration: durations.cinematic,
    ease: easings.cinematic,
  },
  heroName: {
    duration: durations.heroName,
    ease: easings.cinematic,
  },
  stagger: {
    fast: 0.04,
    normal: 0.08,
    slow: 0.12,
  },
};

/**
 * Standard base animation variants placeholder for Framer Motion.
 */
export const baseFadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.cinematic,
  },
};

export const containerStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: transitions.stagger.normal,
      delayChildren: 0.1,
    },
  },
};

/**
 * Hero entrance animation variants
 */
export const heroMaskRevealVariants = {
  hidden: { y: '105%', opacity: 0.3 },
  visible: {
    y: 0,
    opacity: 1,
    transition: transitions.heroName,
  },
};

export const heroFadeVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.cinematic,
  },
};

/**
 * Helper to determine if user prefers reduced motion (client-side safe).
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
