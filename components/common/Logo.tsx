"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  animate?: boolean;
}

export function Logo({ size = 48, animate = false }: LogoProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut" as const },
    },
  };

  return (
    <motion.svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 130 60"
      fill="none"
      initial={animate ? "hidden" : false}
      animate={animate ? "visible" : false}
      className="shrink-0"
    >
      {/* Geometric S */}
      <motion.path
        d="
          M10 15 
          H40 
          C50 15 50 30 40 30 
          H20 
          C10 30 10 45 20 45 
          H50
        "
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        {...(animate && { variants: draw })}
      />

      {/* H */}
      <motion.path
        d="M60 15 V45 
           M80 15 V45 
           M60 30 H80"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        {...(animate && { variants: draw })}
      />

      {/* M */}
      <motion.path
        d="M95 45 V15 
           L110 35 
           L125 15 
           V45"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        {...(animate && { variants: draw })}
      />
    </motion.svg>
  );
}