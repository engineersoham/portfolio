"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import Link from "next/link";
import { GlobeCard } from "@/components/common/GlobeCard";

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "15+", label: "Projects Shipped" },
  { value: "10+", label: "Happy Clients" },
  { value: "∞", label: "Cups of Chai ☕" },
];

export function About() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/25 mb-3">About me</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">The person behind the code</h2>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — bio + stats (2 cols) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Bio card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border p-8"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <p className="text-foreground/70 text-base leading-relaxed mb-4">
                Hey! I&apos;m Soham, a Full Stack Developer from Kolkata, India. I specialize in
                building fast, scalable web applications using the MERN stack and Next.js.
              </p>
              <p className="text-foreground/50 text-sm leading-relaxed mb-6">
                I love turning complex problems into clean, simple solutions. Whether it&apos;s
                architecting a backend API or crafting pixel-perfect UIs, I care deeply about
                the details. When I&apos;m not coding, you&apos;ll find me exploring Kolkata&apos;s
                street food scene or reading about system design.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: "https://github.com/sohamchatterjee", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/sohamchatterjee", label: "LinkedIn" },
                  { icon: Twitter, href: "https://x.com/sohamchatterjee", label: "Twitter" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all"
                    style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(255,255,255,0.2)"; el.style.color = "rgba(255,255,255,0.8)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.color = "rgba(255,255,255,0.4)"; }}>
                    <s.icon size={15} />
                  </a>
                ))}
                <Link href="/about"
                  className="flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground transition-colors ml-2 group">
                  Full story
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="rounded-2xl border p-5 text-center"
                  style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <p className="text-3xl font-bold text-foreground mb-1">{s.value}</p>
                  <p className="text-xs text-foreground/35 font-mono">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Globe card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <GlobeCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}