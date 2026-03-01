"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Home, User, Briefcase, BookOpen, Mail, Wrench,
  NotebookPen, Copy, Check, Calendar, Github,
  Linkedin, Twitter, ArrowRight, Search, Hash
} from "lucide-react";
import { useContactStore } from "@/lib/store";
import { PERSON, SOCIALS } from "@/lib/constans";


type Item = {
  id: string;
  label: string;
  subtitle?: string;
  icon: React.ReactNode;
  category: string;
  action: () => void;
  keywords?: string[];
};

export function CmdK() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { openContact } = useContactStore();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const items: Item[] = [
    // Navigation
    { id: "home", label: "Home", subtitle: "Back to start", icon: <Home size={15} />, category: "Navigate", action: () => { router.push("/"); close(); }, keywords: ["home", "start"] },
    { id: "about", label: "About", subtitle: `Who is ${PERSON.firstName}?`, icon: <User size={15} />, category: "Navigate", action: () => { router.push("/about"); close(); }, keywords: ["about", "bio", "me"] },
    { id: "work", label: "Work / Projects", subtitle: "Things I've built", icon: <Briefcase size={15} />, category: "Navigate", action: () => { router.push("/projects"); close(); }, keywords: ["work", "projects", "portfolio"] },
    { id: "blog", label: "Blog", subtitle: "Thoughts & writing", icon: <BookOpen size={15} />, category: "Navigate", action: () => { router.push("/blog"); close(); }, keywords: ["blog", "articles", "posts"] },
    { id: "uses", label: "Uses", subtitle: "My tools & setup", icon: <Wrench size={15} />, category: "Navigate", action: () => { router.push("/uses"); close(); }, keywords: ["uses", "tools", "setup", "gear"] },
    { id: "guestbook", label: "Guestbook", subtitle: "Leave a message", icon: <NotebookPen size={15} />, category: "Navigate", action: () => { router.push("/guestbook"); close(); }, keywords: ["guestbook", "message", "sign"] },
    // Actions
    { id: "contact", label: "Book a Call", subtitle: "Schedule 30 mins", icon: <Calendar size={15} />, category: "Actions", action: () => { openContact(); close(); }, keywords: ["book", "call", "schedule", "hire", "contact"] },
    { id: "email", label: "Copy Email", subtitle: PERSON.email, icon: copied ? <Check size={15} /> : <Copy size={15} />, category: "Actions", action: () => { navigator.clipboard.writeText(PERSON.email); setCopied(true); setTimeout(() => setCopied(false), 2000); }, keywords: ["email", "copy", "mail"] },
    { id: "contact-page", label: "Contact Page", subtitle: "Send a message", icon: <Mail size={15} />, category: "Actions", action: () => { router.push("/contact"); close(); }, keywords: ["contact", "message", "email"] },
    // Social
    { id: "github", label: "GitHub", subtitle: SOCIALS.github.replace("https://", ""), icon: <Github size={15} />, category: "Social", action: () => { window.open(SOCIALS.github, "_blank"); close(); }, keywords: ["github", "code", "repos"] },
    { id: "linkedin", label: "LinkedIn", subtitle: "Connect professionally", icon: <Linkedin size={15} />, category: "Social", action: () => { window.open(SOCIALS.linkedin, "_blank"); close(); }, keywords: ["linkedin", "connect"] },
    { id: "twitter", label: "Twitter / X", subtitle: SOCIALS.twitter.replace("https://x.com/", "@"), icon: <Twitter size={15} />, category: "Social", action: () => { window.open(SOCIALS.twitter, "_blank"); close(); }, keywords: ["twitter", "x", "tweet"] },

    
  ];

  const filtered = query.trim() === ""
    ? items
    : items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords?.some(k => k.includes(query.toLowerCase()))
      );

  // Group by category
  const grouped = filtered.reduce<Record<string, Item[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Flatten for keyboard nav
  const flat = Object.values(grouped).flat();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(v => !v);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    // Also listen for custom event from navbar button
    const customHandler = () => setOpen(true);
    window.addEventListener("open-cmdk", customHandler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("open-cmdk", customHandler);
    };
  }, [close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelected(0);
    }
  }, [open]);

  useEffect(() => { setSelected(0); }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, flat.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && flat[selected]) { flat[selected].action(); }
  };

  // Scroll selected into view
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    itemRefs.current[selected]?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-60 bg-background/60 backdrop-blur-sm"
            onClick={close}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed top-[18%] left-1/2 -translate-x-1/2 z-61 w-full max-w-lg"
          >
            <div
              className="rounded-2xl border overflow-hidden shadow-2xl"
              style={{ background: "rgba(12,12,18,0.98)", borderColor: "rgba(255,255,255,0.08)" }}
              onKeyDown={handleKeyDown}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <Search size={15} className="shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Type to search or navigate..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/25"
                  style={{ color: "rgba(255,255,255,0.85)", fontFamily: "inherit" }}
                />
                <kbd className="text-xs px-1.5 py-0.5 rounded border font-mono"
                  style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.03)" }}>
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="overflow-y-auto max-h-80 py-2">
                {flat.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
                    No results for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, categoryItems]) => {
                    return (
                      <div key={category}>
                        <div className="px-4 py-1.5">
                          <span className="text-xs font-semibold uppercase tracking-widest"
                            style={{ color: "rgba(255,255,255,0.2)" }}>
                            {category}
                          </span>
                        </div>
                        {categoryItems.map((item) => {
                          const flatIdx = flat.indexOf(item);
                          const isSelected = flatIdx === selected;
                          return (
                            <button
                              key={item.id}
                              ref={el => { itemRefs.current[flatIdx] = el; }}
                              onClick={item.action}
                              onMouseEnter={() => setSelected(flatIdx)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer"
                              style={{
                                background: isSelected ? "rgba(255,255,255,0.06)" : "transparent",
                              }}
                            >
                              <span className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                                style={{
                                  background: isSelected ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                                  color: isSelected ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)",
                                }}>
                                {item.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium"
                                  style={{ color: isSelected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)" }}>
                                  {item.label}
                                </p>
                                {item.subtitle && (
                                  <p className="text-xs truncate"
                                    style={{ color: "rgba(255,255,255,0.25)" }}>
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                              {isSelected && (
                                <ArrowRight size={13} style={{ color: "rgba(255,255,255,0.3)" }} className="shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer hints */}
              <div className="px-4 py-2.5 border-t flex items-center justify-between"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
                  {flat.length} results
                </span>
                <div className="flex items-center gap-3 text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border text-[10px] font-mono"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}>↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border text-[10px] font-mono"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}>↵</kbd>
                    open
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}