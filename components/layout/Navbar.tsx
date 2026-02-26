"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FolderOpen, NotebookPen, Wrench, Mail, X, Menu } from "lucide-react";
import { useContactStore } from "@/lib/store";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Blog" },
];

const moreLinks = [
  { href: "/projects", label: "Projects", icon: FolderOpen, desc: "Things I've built" },
  { href: "/guestbook", label: "Guestbook", icon: NotebookPen, desc: "Leave a message" },
  { href: "/uses", label: "Uses", icon: Wrench, desc: "My tools & gear" },
  { href: "/contact", label: "Contact", icon: Mail, desc: "Get in touch" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openContact } = useContactStore();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 100);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Logo — fixed top left */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="fixed top-4 left-6 z-40"
      >
        <Link href="/" className="block text-foreground hover:opacity-70 transition-opacity">
          <svg width="44" height="26" viewBox="0 0 130 60" fill="none">
            <path d="M10 15 H40 C50 15 50 30 40 30 H20 C10 30 10 45 20 45 H50"
              stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M60 15 V45 M80 15 V45 M60 30 H80"
              stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M95 45 V15 L110 35 L125 15 V45"
              stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </Link>
      </motion.div>

      {/* Floating Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40"
      >
        <nav className={`flex items-center gap-1 px-2 py-1.5 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-2xl border-border shadow-lg shadow-black/10"
            : "bg-background/40 backdrop-blur-xl border-border/60"
        }`}>
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="relative px-4 py-1.5 rounded-full text-sm">
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-foreground/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className={`relative z-10 transition-colors ${
                  isActive(link.href) ? "text-foreground font-medium" : "text-foreground/50 hover:text-foreground"
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
              >
                More
                <motion.span animate={{ rotate: moreOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={13} />
                </motion.span>
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-2xl border border-border bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-20"
                    >
                      {moreLinks.map((item) => (
                        <Link key={item.label} href={item.href} onClick={() => setMoreOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors group">
                          <item.icon size={14} className="text-foreground/35 group-hover:text-foreground/60 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.label}</p>
                            <p className="text-xs text-foreground/40">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:block w-px h-4 bg-foreground/10 mx-1" />

          {/* ThemeToggle inside navbar */}
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          <div className="hidden md:block w-px h-4 bg-foreground/10 mx-1" />

          <button
            onClick={openContact}
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-background" />
            </span>
            Book a Call
          </button>

          <button
            className="md:hidden p-2 rounded-full hover:bg-foreground/10 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </nav>
      </motion.header>

      {/* ⌘K button — top right */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        onClick={() => window.dispatchEvent(new CustomEvent("open-cmdk"))}
        className="fixed top-4 right-6 z-40 flex items-center gap-1 px-3 py-2 rounded-full border border-foreground/10 bg-background/40 backdrop-blur-xl text-foreground/35 hover:text-foreground hover:border-foreground/20 transition-all cursor-pointer"
      >
        <span className="text-xs font-mono">⌘K</span>
      </motion.button>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border rounded-t-3xl p-6"
            >
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-6" />
              <div className="flex flex-col gap-1">
                {[...navLinks, ...moreLinks].map((link) => (
                  <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl hover:bg-muted/50 text-sm font-medium text-foreground transition-colors">
                    {link.label}
                  </Link>
                ))}
                <div className="px-4 py-3">
                  <ThemeToggle />
                </div>
                <button onClick={() => { setMobileOpen(false); openContact(); }}
                  className="mt-2 w-full py-3 rounded-xl bg-foreground text-background text-sm font-semibold cursor-pointer">
                  Book a Call
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}