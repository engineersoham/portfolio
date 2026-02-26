"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Copy, Check, Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";
import { useContactStore } from "@/lib/store";

// Rotating "OPEN TO WORK" circular badge
function OpenToWorkBadge() {
  const text = "OPEN TO WORK • OPEN TO WORK • ";
  const chars = text.split("");
  const radius = 38;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Rotating text ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 100 100" width="96" height="96">
          <defs>
            <path
              id="circle-path"
              d={`M 50,50 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            />
          </defs>
          <text fontSize="9.5" fill="white" letterSpacing="1.5">
            <textPath href="#circle-path">{text}</textPath>
          </text>
        </svg>
      </motion.div>

      {/* Blue border ring */}
      <div className="absolute inset-1 rounded-full border-2 border-blue-500" />

      {/* Center star */}
      <div className="relative z-10 w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M12 2L13.5 9.5L21 8L15.5 13.5L18 21L12 17L6 21L8.5 13.5L3 8L10.5 9.5L12 2Z" />
        </svg>
      </div>
    </div>
  );
}

// Wings SVG
function WingsLogo() {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* Left wing */}
      <svg width="80" height="40" viewBox="0 0 100 50" fill="none" className="opacity-60">
        <path d="M95 25 Q70 5 40 15 Q20 20 5 25 Q20 30 40 35 Q70 45 95 25Z"
          fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <path d="M90 25 Q65 8 38 17 Q18 22 5 25"
          fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M85 25 Q62 10 37 19 Q20 24 8 25"
          fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <path d="M78 25 Q58 13 36 20 Q22 25 10 25"
          fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* Feather tips */}
        {[0,1,2,3,4].map((i) => (
          <path key={i}
            d={`M ${95 - i * 14} 25 Q ${85 - i * 12} ${15 - i * 1} ${70 - i * 12} ${18 - i * 1}`}
            fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        ))}
      </svg>

      {/* Center logo circle */}
      <div className="relative z-10 w-14 h-14 rounded-full border border-blue-500/50 bg-blue-950/50 flex items-center justify-center shrink-0"
        style={{ boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}>
        <svg width="28" height="16" viewBox="0 0 130 60" fill="none">
          <path d="M10 15 H40 C50 15 50 30 40 30 H20 C10 30 10 45 20 45 H50"
            stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M60 15 V45 M80 15 V45 M60 30 H80"
            stroke="white" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M95 45 V15 L110 35 L125 15 V45"
            stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      {/* Right wing (mirrored) */}
      <svg width="80" height="40" viewBox="0 0 100 50" fill="none" className="opacity-60 scale-x-[-1]">
        <path d="M95 25 Q70 5 40 15 Q20 20 5 25 Q20 30 40 35 Q70 45 95 25Z"
          fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <path d="M90 25 Q65 8 38 17 Q18 22 5 25"
          fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M85 25 Q62 10 37 19 Q20 24 8 25"
          fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <path d="M78 25 Q58 13 36 20 Q22 25 10 25"
          fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {[0,1,2,3,4].map((i) => (
          <path key={i}
            d={`M ${95 - i * 14} 25 Q ${85 - i * 12} ${15 - i * 1} ${70 - i * 12} ${18 - i * 1}`}
            fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        ))}
      </svg>
    </div>
  );
}

export function FooterCTA() {
  const { openContact } = useContactStore();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@soham.codes");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="px-4 pb-4 pt-0">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a0a1a 0%, #0d1a2e 30%, #071a2e 60%, #0a0a1a 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Teal/blue glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/3 w-60 h-60 rounded-full blur-[100px] opacity-15"
          style={{ background: "radial-gradient(circle, #0284c7 0%, transparent 70%)" }} />
        <div className="absolute top-0 right-1/4 w-40 h-40 rounded-full blur-[80px] opacity-10"
          style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center py-16 px-8 text-center">

          {/* Wings + logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-10"
          >
            <WingsLogo />
          </motion.div>

          {/* Big text */}
          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-wide uppercase mb-2"
            >
              FROM CONCEPT TO{" "}
              <span className="font-black">CREATION</span>
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white tracking-wide uppercase"
            >
              LET&apos;S MAKE IT{" "}
              <span className="font-black inline-flex items-center gap-4">
                HAPPEN!
                {/* Open to work badge */}
                <span className="inline-flex">
                  <OpenToWorkBadge />
                </span>
              </span>
            </motion.h2>
          </div>

          {/* Get in touch button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={openContact}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 flex items-center gap-3 px-7 py-3.5 rounded-full bg-foreground/10 backdrop-blur-sm border border-white/10 text-white font-medium text-sm hover:bg-foreground/15 hover:border-white/20 transition-all cursor-pointer group"
          >
            Get In Touch
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 group-hover:translate-x-0.5 transition-all">
              <ArrowRight size={15} className="text-white" />
            </span>
          </motion.button>

          {/* Availability text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-white/70 font-medium text-sm">
              I&apos;m available for full-time roles &amp; freelance projects.
            </p>
            <p className="text-white/40 text-xs mt-1">
              I thrive on crafting dynamic web applications, and delivering seamless user experiences.
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 flex items-center justify-between px-8 py-5 border-t border-white/[0.06]">
          {/* Code tag decoration */}
          <span className="text-xs font-mono text-white/20">{"{/}"}</span>

          {/* Footer links */}
          <div className="flex items-center gap-6">
            {[
              { label: "General", links: [{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Blog", href: "/blog" }] },
              { label: "Specifics", links: [{ label: "Guest Book", href: "/guestbook" }, { label: "Projects", href: "/projects" }] },
              { label: "More", links: [{ label: "Book a call", href: "#", action: openContact }, { label: "Uses", href: "/uses" }] },
            ].map((col) => (
              <div key={col.label} className="hidden md:flex flex-col gap-1">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-1 font-mono">{col.label}</p>
                {col.links.map((link) => (
                  link.action ? (
                    <button key={link.label} onClick={link.action}
                      className="text-xs text-white/50 hover:text-white transition-colors text-left cursor-pointer">
                      {link.label}
                    </button>
                  ) : (
                    <Link key={link.label} href={link.href}
                      className="text-xs text-white/50 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            ))}
          </div>

          {/* Dash decoration */}
          <span className="text-xs font-mono text-white/20">— —</span>
        </div>
      </motion.div>

      {/* Footer below the card */}
      <div className="flex items-center justify-between px-4 py-4 mt-2">
        <div className="flex items-center gap-2">
          <svg width="24" height="14" viewBox="0 0 130 60" fill="none" className="text-foreground/30">
            <path d="M10 15 H40 C50 15 50 30 40 30 H20 C10 30 10 45 20 45 H50"
              stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M60 15 V45 M80 15 V45 M60 30 H80"
              stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M95 45 V15 L110 35 L125 15 V45"
              stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
          </svg>
          <span className="text-xs text-foreground/30">
            &copy; {new Date().getFullYear()} Soham Chatterjee
          </span>
        </div>
        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: "https://github.com/sohamchatterjee" },
            { icon: Linkedin, href: "https://linkedin.com/in/sohamchatterjee" },
            { icon: Twitter, href: "https://x.com/sohamchatterjee" },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-foreground/30 hover:text-foreground transition-colors">
              <s.icon size={15} />
            </a>
          ))}
          <button onClick={copyEmail}
            className="flex items-center gap-1.5 text-xs text-foreground/30 hover:text-foreground transition-colors cursor-pointer ml-2">
            {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
            hello@soham.codes
          </button>
        </div>
      </div>
    </section>
  );
}