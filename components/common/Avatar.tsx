"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Outfit } from "@/data/avatar";

interface AvatarProps {
  outfit: Outfit;
  pose?: "standing" | "sitting";
  showLaptop?: boolean;
  stage?: boolean;
  floating?: boolean;
}

export function Avatar({ outfit }: AvatarProps) {
  const { colors } = outfit;

  return (
    <motion.div
      key={outfit.id}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-48 h-64 mx-auto"
    >
      <svg
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        {/* Shadow */}
        <ellipse cx="100" cy="268" rx="45" ry="8" fill="black" opacity="0.15" />

        {/* Shoes */}
        <motion.g
          animate={{ fill: colors.shoes }}
          transition={{ duration: 0.4 }}
        >
          <rect x="62" y="232" width="30" height="14" rx="7" fill={colors.shoes} />
          <rect x="108" y="232" width="30" height="14" rx="7" fill={colors.shoes} />
        </motion.g>

        {/* Pants */}
        <motion.g animate={{ fill: colors.pants }} transition={{ duration: 0.4 }}>
          <rect x="65" y="175" width="30" height="62" rx="6" fill={colors.pants} />
          <rect x="105" y="175" width="30" height="62" rx="6" fill={colors.pants} />
        </motion.g>

        {/* Shirt / Top */}
        <motion.g animate={{ fill: colors.shirt }} transition={{ duration: 0.4 }}>
          <rect x="58" y="110" width="84" height="72" rx="10" fill={colors.shirt} />
          {/* Sleeves */}
          <rect x="36" y="112" width="28" height="40" rx="8" fill={colors.shirt} />
          <rect x="136" y="112" width="28" height="40" rx="8" fill={colors.shirt} />
        </motion.g>

        {/* Neck */}
        <rect x="88" y="100" width="24" height="18" rx="4" fill={colors.skin} />

        {/* Head */}
        <motion.ellipse
          cx="100"
          cy="78"
          rx="36"
          ry="40"
          fill={colors.skin}
          animate={{ fill: colors.skin }}
          transition={{ duration: 0.4 }}
        />

        {/* Hair */}
        <motion.g animate={{ fill: colors.hair }} transition={{ duration: 0.4 }}>
          <ellipse cx="100" cy="45" rx="36" ry="18" fill={colors.hair} />
          <rect x="64" y="45" width="12" height="20" rx="6" fill={colors.hair} />
          <rect x="124" y="45" width="12" height="20" rx="6" fill={colors.hair} />
        </motion.g>

        {/* Eyes */}
        <circle cx="87" cy="78" r="5" fill="#1a1a1a" />
        <circle cx="113" cy="78" r="5" fill="#1a1a1a" />
        {/* Eye shine */}
        <circle cx="89" cy="76" r="1.5" fill="white" />
        <circle cx="115" cy="76" r="1.5" fill="white" />

        {/* Smile */}
        <path
          d="M88 90 Q100 100 112 90"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Hands */}
        <circle cx="36" cy="155" r="10" fill={colors.skin} />
        <circle cx="164" cy="155" r="10" fill={colors.skin} />

        {/* Laptop (only for developer outfit) */}
        {outfit.id === "developer" && (
          <g>
            <rect x="22" y="158" width="28" height="20" rx="3" fill="#2d2d2d" />
            <rect x="24" y="160" width="24" height="15" rx="2" fill="#3b82f6" opacity="0.8" />
            <rect x="18" y="178" width="36" height="3" rx="1.5" fill="#1a1a1a" />
          </g>
        )}
      </svg>

      {/* Floating emoji badge */}
      <motion.div
        key={outfit.id + "-badge"}
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
        className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-lg shadow-lg"
      >
        {outfit.emoji}
      </motion.div>
    </motion.div>
  );
}