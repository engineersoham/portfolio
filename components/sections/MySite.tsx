"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Wrench, NotebookPen } from "lucide-react";

const cards = [
  {
    icon: NotebookPen,
    title: "Guestbook",
    description: "Let me know you were here. Leave a message!",
    href: "/guestbook",
    emoji: "✍️",
  },
  {
    icon: Wrench,
    title: "Uses",
    description: "The tools, apps, and gear I use every day.",
    href: "/uses",
    emoji: "🛠️",
  },
  {
    icon: BookOpen,
    title: "Blog",
    description: "Thoughts on code, design, and building products.",
    href: "/blog",
    emoji: "📝",
  },
];

export function MySite() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-3">
          My Site
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Explore, experiment{" "}
          <span className="text-foreground/30">&amp;&amp; say hello</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
          >
            <Link
              href={card.href}
              className="flex flex-col gap-4 p-6 rounded-3xl border border-border bg-card/30 hover:border-foreground/20 hover:bg-card/60 transition-all duration-300 h-full group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-2xl">
                  {card.emoji}
                </div>
                <ArrowRight
                  size={18}
                  className="text-foreground/20 group-hover:text-foreground/60 group-hover:translate-x-1 transition-all duration-200"
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                <p className="text-sm text-foreground/50">{card.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </section>
  );
}