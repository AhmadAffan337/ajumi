// Professional animation constants and utilities
export const EASE = {
  premium: [0.22, 1, 0.36, 1] as [number, number, number, number],
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  swift: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  slower: 1.2,
} as const;

// Common animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(2px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const slideUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Professional stagger delays
export const getStaggerDelay = (index: number, baseDelay = 0.1) => index * baseDelay;