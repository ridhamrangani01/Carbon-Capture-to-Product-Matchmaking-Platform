export const motionConfig = {
  reveal: {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1] as const,
  },
  slowReveal: {
    duration: 1.4,
    ease: [0.16, 1, 0.3, 1] as const,
  },
  micro: {
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1] as const,
  },
  cinematic: {
    duration: 1.8,
    ease: [0.16, 1, 0.3, 1] as const,
  },
  stagger: {
    fast: 0.06,
    medium: 0.1,
    slow: 0.15,
  },
};

export const heroEntranceVariants = {
  hidden: { opacity: 0, y: 35, filter: "blur(6px)" },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      delay: custom * 0.18,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const sectionRevealVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const cardStaggerVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};
