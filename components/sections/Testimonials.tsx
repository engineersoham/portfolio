"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-3">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Word on the street
        </h2>
        <p className="text-foreground/40 text-sm max-w-sm mx-auto mb-12">
          Real testimonials from clients coming soon. I&apos;m currently collecting feedback from recent collaborations.
        </p>

        {/* Placeholder cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-3xl border border-dashed border-border bg-card/20 flex flex-col gap-4 items-center justify-center min-h-40"
            >
              <div className="flex gap-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={14} className="text-foreground/10 fill-foreground/10" />
                ))}
              </div>
              <div className="space-y-2 w-full">
                <div className="h-2 bg-muted rounded-full w-full" />
                <div className="h-2 bg-muted rounded-full w-4/5 mx-auto" />
                <div className="h-2 bg-muted rounded-full w-3/5 mx-auto" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-8 rounded-full bg-muted" />
                <div className="space-y-1">
                  <div className="h-2 bg-muted rounded-full w-20" />
                  <div className="h-1.5 bg-muted/50 rounded-full w-14" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}