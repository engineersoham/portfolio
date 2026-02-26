"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";;
import { PERSON, SOCIALS } from "@/lib/constans";

const socials = [
  { icon: Github, href: SOCIALS.github, label: "GitHub" },
  { icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: SOCIALS.twitter, label: "Twitter" },
];

export function About() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-12 text-center"
      >
        Know About Me
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Photo placeholder */}
          <div className="relative">
            <div className="w-64 h-72 rounded-3xl bg-muted border border-border overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-8xl">👨‍💻</span>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl bg-card border border-border shadow-lg"
            >
              <p className="text-xs font-mono text-foreground/50">Currently building</p>
              <p className="text-sm font-semibold text-foreground">SaaS App 🚀</p>
            </motion.div>
          </div>

          {/* Stats — from constants */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            {[
              { label: "Years Experience", value: PERSON.yearsExp },
              { label: "Projects Shipped", value: PERSON.projectsShipped },
              { label: "Happy Clients", value: "5+" },
              { label: "Cups of Chai", value: "∞" },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="p-4 rounded-2xl border border-border bg-card/50 text-center"
              >
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-foreground/40 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            Full-Stack Developer
            <br />
            <span className="text-foreground/40">and a little bit of everything</span>
          </h2>

          <p className="text-foreground/60 leading-relaxed mb-4">
            I&apos;m {PERSON.name}, a full-stack developer passionate about
            creating dynamic web experiences. From frontend to backend, I thrive on
            solving complex problems with clean, efficient code.
          </p>

          <p className="text-foreground/60 leading-relaxed mb-4">
            My expertise spans React, Next.js, and the entire MERN stack. I love
            working with founders and teams to turn rough ideas into polished,
            production-ready products that users love.
          </p>

          <p className="text-foreground/60 leading-relaxed mb-8">
            When I&apos;m not coding, I&apos;m exploring new technologies, contributing
            to open source, or writing about what I&apos;ve learned.
          </p>

          <div className="flex items-center gap-3 mb-8">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-all">
                <s.icon size={15} />
                {s.label}
              </a>
            ))}
          </div>

          <Link href="/about"
            className="flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors w-fit">
            Full story & experience
            <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}