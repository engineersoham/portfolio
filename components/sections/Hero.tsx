"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, Check } from "lucide-react";
import { useContactStore } from "@/lib/store";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#f97316"];

function Confetti({ origin }: { origin: { x: number; y: number } }) {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    color: COLORS[i % COLORS.length],
    angle: (i / 18) * 360,
    distance: 60 + (i * 7) % 60,
    size: 4 + (i * 3) % 4,
    rotate: (i * 23) % 360,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;
        return (
          <motion.div
            key={p.id}
            initial={{ x: origin.x, y: origin.y, scale: 1, opacity: 1, rotate: 0 }}
            animate={{ x: origin.x + tx, y: origin.y + ty - 30, scale: 0, opacity: 0, rotate: p.rotate }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: p.id % 2 === 0 ? "50%" : "2px",
              background: p.color,
              boxShadow: `0 0 4px ${p.color}`,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Planet arc ───────────────────────────────────────────────────────────────
const cityLights = [
  {x:210,y:24,r:1.2},{x:255,y:19,r:0.9},{x:305,y:15,r:1.1},
  {x:360,y:11,r:1.5},{x:410,y:9,r:0.8},{x:480,y:9,r:1.0},
  {x:535,y:12,r:0.9},{x:585,y:16,r:1.3},{x:635,y:21,r:0.8},
  {x:680,y:27,r:1.1},
];

function Planet() {
  return (
    <div
      className="absolute bottom-0 left-1/2 pointer-events-none select-none"
      style={{ width: 900, transform: "translateX(-50%)" }}
    >
      <div style={{
        position: "absolute", bottom: 0, left: 0, width: 900, height: 900, borderRadius: "50%",
        background: "radial-gradient(ellipse at 50% 35%, rgba(80,100,200,0.05) 0%, transparent 65%)",
        transform: "translateY(72%)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 40, width: 820, height: 820, borderRadius: "50%",
        background: "radial-gradient(ellipse at 42% 28%, rgba(50,70,180,0.13) 0%, rgba(15,18,50,0.1) 55%, transparent 72%)",
        transform: "translateY(72%)",
      }} />
      <svg width="820" height="80" viewBox="0 0 820 80"
        style={{ position: "absolute", bottom: "1%", left: 40 }} overflow="visible">
        <defs>
          <radialGradient id="rim" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="rgba(210,220,255,0.65)" />
            <stop offset="40%" stopColor="rgba(140,160,255,0.22)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="rb"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>
        <ellipse cx="410" cy="12" rx="400" ry="32" fill="url(#rim)" filter="url(#rb)" opacity="0.6" />
        <ellipse cx="410" cy="10" rx="395" ry="11" fill="none" stroke="rgba(200,215,255,0.45)" strokeWidth="1.2" />
      </svg>
      {cityLights.map((d, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{
            left: d.x + 40, bottom: d.y, width: d.r * 2, height: d.r * 2,
            background: "rgba(255,240,180,0.8)",
            boxShadow: `0 0 ${d.r * 4}px rgba(255,240,180,0.6)`,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 2 + i * 0.25, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

// ─── Fade variants ────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const { openContact } = useContactStore();
  const [copied, setCopied] = useState(false);
  const [confettiOrigin, setConfettiOrigin] = useState<{ x: number; y: number } | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);
  const [ctaHovered, setCtaHovered] = useState(false);
  const copyBtnRef = useRef<HTMLButtonElement>(null);

  // ✅ Stars generated CLIENT-SIDE ONLY via useEffect
  // This fixes the hydration mismatch — Math.random() runs only in browser
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 75,
        size: Math.random() * 1.4 + 0.3,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@soham.codes");
    setCopied(true);
    if (copyBtnRef.current) {
      const rect = copyBtnRef.current.getBoundingClientRect();
      setConfettiOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      setConfettiKey((k) => k + 1);
    }
    setTimeout(() => setCopied(false), 2500);
    setTimeout(() => setConfettiOrigin(null), 900);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16">

      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", top: "15%", left: "8%", width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", top: "20%", right: "10%", width: 280, height: 280, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", bottom: "25%", left: "30%", width: 400, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(60px)",
        }} />
      </div>

      {/* Stars — only rendered after mount, no SSR */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.07, 0.45, 0.07] }}
            transition={{ duration: 3 + s.delay, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Planet */}
      <Planet />

      {/* Confetti */}
      <AnimatePresence>
        {confettiOrigin && <Confetti key={confettiKey} origin={confettiOrigin} />}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">

        {/* Availability pill */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-xs font-medium text-foreground/55">
            Available for freelance &amp; full-time roles
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-foreground/45 text-lg mb-3">
          নমস্কার 👋 I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1 custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-5xl md:text-7xl font-bold text-foreground leading-tight mb-4 tracking-tight">
          Soham Chatterjee
        </motion.h1>

        {/* Typing */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="text-xl md:text-2xl font-mono text-foreground/50 mb-6 h-8">
          <TypeAnimation
            sequence={["Full Stack Developer", 2000, "MERN Stack Engineer", 2000, "Next.js Specialist", 2000, "Problem Solver", 2000]}
            wrapper="span" speed={50} repeat={Infinity}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="text-foreground/45 text-base max-w-md leading-relaxed mb-10">
          I help founders ship faster — building products that are
          clean, scalable, and beautifully crafted. From Kolkata 🇮🇳
        </motion.p>

        {/* CTAs */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center gap-3">

          {/* Get in Touch */}
          <motion.button
            onClick={openContact}
            onHoverStart={() => setCtaHovered(true)}
            onHoverEnd={() => setCtaHovered(false)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group relative overflow-hidden flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer bg-foreground text-background"
          >
            <AnimatePresence>
              {ctaHovered && (
                <motion.span
                  key="ripple"
                  initial={{ scale: 0, opacity: 0.3 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-full bg-white/20"
                  style={{ originX: "50%", originY: "50%" }}
                />
              )}
            </AnimatePresence>
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={ctaHovered ? { backgroundPosition: ["200% 0", "-100% 0"] } : {}}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Get in Touch
              <motion.span
                animate={ctaHovered ? { x: 4 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <ArrowRight size={15} />
              </motion.span>
            </span>
          </motion.button>

          {/* Copy email */}
          <motion.button
            ref={copyBtnRef}
            onClick={copyEmail}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex items-center gap-2 px-5 py-3.5 rounded-full text-sm border transition-all duration-300 cursor-pointer border-border bg-card/50 backdrop-blur-sm text-foreground/50 hover:text-foreground hover:border-foreground/30 overflow-hidden"
          >
            <AnimatePresence>
              {copied && (
                <motion.span
                  key="flash"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-full bg-green-400/20"
                />
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span key="check"
                  initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center gap-2 text-green-500 font-medium relative z-10">
                  <Check size={14} />
                  Copied! 🎉
                </motion.span>
              ) : (
                <motion.span key="email"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 relative z-10">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  hello@soham.codes
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-border/60 flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-foreground/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}