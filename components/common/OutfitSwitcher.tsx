"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Outfit } from "@/data/avatar";

interface OutfitSwitcherProps {
  outfits: Outfit[];
  selected: Outfit;
  onSelect: (outfit: Outfit) => void;
}

export function OutfitSwitcher({ outfits, selected, onSelect }: OutfitSwitcherProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {outfits.map((outfit) => (
        <motion.button
          key={outfit.id}
          onClick={() => onSelect(outfit)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative w-10 h-10 rounded-full border-2 flex items-center justify-center text-base transition-all duration-200 cursor-pointer",
            selected.id === outfit.id
              ? "border-foreground bg-muted shadow-lg"
              : "border-border hover:border-foreground/40 bg-card"
          )}
          title={outfit.label}
        >
          {outfit.emoji}
          {selected.id === outfit.id && (
            <motion.span
              layoutId="outfit-indicator"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}