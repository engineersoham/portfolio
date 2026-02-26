"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="relative flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-card cursor-pointer transition-colors hover:border-foreground/30"
      style={{ boxShadow: isDark ? "0 0 12px rgba(148,163,184,0.08)" : "0 0 12px rgba(251,191,36,0.1)" }}
    >
      {/* Track */}
      <div className="relative w-8 h-4 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="absolute inset-0.5 w-3 h-3 rounded-full"
          animate={{ x: isDark ? 16 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            background: isDark
              ? "linear-gradient(135deg, #c7d2fe, #818cf8)"
              : "linear-gradient(135deg, #fbbf24, #f59e0b)",
            boxShadow: isDark ? "0 0 6px #818cf8" : "0 0 6px #fbbf24",
          }}
        />
      </div>

      {/* Icon */}
      <div className="w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.svg
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="text-indigo-300"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="text-amber-400"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <span className="text-xs font-medium text-foreground/50 w-8 text-left">
        {isDark ? "Dark" : "Light"}
      </span>
    </motion.button>
  );
}