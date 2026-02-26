"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Mail, Send, Linkedin, Github, Twitter } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalView = "main" | "message";

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [view, setView] = useState<ModalView>("main");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Init Cal.com popup
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min-popup" });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  // Reset view when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setView("main");
        setStatus("idle");
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-lg"
          />

          {/* Bottom sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4"
          >
            <div className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">

              {/* Handle */}
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mt-3 mb-1" />

              <AnimatePresence mode="wait">

                {/* MAIN VIEW */}
                {view === "main" && (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="p-6"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-lg font-semibold text-foreground">
                        Get in touch
                      </h2>
                      <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
                      >
                        <X size={15} className="text-foreground/50" />
                      </button>
                    </div>

                    {/* Book a Call + Email Me cards */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Book a Call — uses Cal.com popup */}
                      <button
                        data-cal-namespace="30min-popup"
                        data-cal-link="sohamchatterjee/30min"
                        data-cal-config='{"layout":"month_view","theme":"dark"}'
                        className="flex flex-col gap-3 p-5 rounded-2xl border border-border bg-muted/20 hover:border-foreground/20 hover:bg-muted/40 transition-all text-left cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                          <Calendar size={18} className="text-foreground/60" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">Book a Call</p>
                          <p className="text-xs text-foreground/40 mt-0.5">Schedule a 30-min chat</p>
                        </div>
                      </button>

                      {/* Email Me */}
                      <a
                        href="mailto:hello@soham.codes"
                        className="flex flex-col gap-3 p-5 rounded-2xl border border-border bg-muted/20 hover:border-foreground/20 hover:bg-muted/40 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                          <Mail size={18} className="text-foreground/60" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">Email Me</p>
                          <p className="text-xs text-foreground/40 mt-0.5">hello@soham.codes</p>
                        </div>
                      </a>
                    </div>

                    {/* Write a message toggle */}
                    <button
                      onClick={() => setView("message")}
                      className="w-full flex items-center gap-3 p-4 rounded-2xl border border-dashed border-border hover:border-foreground/20 hover:bg-muted/20 transition-all cursor-pointer mb-5 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Send size={14} className="text-foreground/50" />
                      </div>
                      <span className="text-sm text-foreground/50 group-hover:text-foreground/70 transition-colors">
                        Or write me a message here
                      </span>
                      <span className="ml-auto text-xs text-foreground/30">
                        Tap to open
                      </span>
                    </button>

                    {/* Socials */}
                    <div className="flex flex-col items-center gap-3 pt-4 border-t border-border">
                      <p className="text-xs text-foreground/30 uppercase tracking-widest">
                        Connect on Socials
                      </p>
                      <div className="flex items-center gap-3">
                        {[
                          { icon: Linkedin, href: "https://linkedin.com/in/sohamchatterjee" },
                          { icon: Github, href: "https://github.com/sohamchatterjee" },
                          { icon: Twitter, href: "https://x.com/sohamchatterjee" },
                        ].map((s, i) => (
                          <a
                            key={i}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground/40 hover:text-foreground hover:border-foreground/30 transition-all"
                          >
                            <s.icon size={16} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* MESSAGE VIEW */}
                {view === "message" && (
                  <motion.div
                    key="message"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-6"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <button
                        onClick={() => setView("main")}
                        className="text-sm text-foreground/50 hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
                      >
                        <X size={15} className="text-foreground/50" />
                      </button>
                    </div>

                    {status === "success" ? (
                      <div className="text-center py-8">
                        <p className="text-4xl mb-3">🎉</p>
                        <p className="font-semibold text-foreground mb-1">Message sent!</p>
                        <p className="text-sm text-foreground/40">
                          I&apos;ll get back to you within 24 hours.
                        </p>
                        <button
                          onClick={() => { setStatus("idle"); setView("main"); }}
                          className="mt-4 text-sm text-foreground/50 underline underline-offset-4 cursor-pointer"
                        >
                          Back to options
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Name"
                            className="px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                          />
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Email"
                            className="px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <textarea
                            required
                            rows={4}
                            maxLength={1000}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="How can I help you?"
                            className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                          />
                          <span className="absolute bottom-2 right-3 text-xs text-foreground/20">
                            {form.message.length}/1000
                          </span>
                        </div>
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer"
                        >
                          <Send size={14} />
                          {status === "loading" ? "Sending..." : "Send Message"}
                        </button>
                        {status === "error" && (
                          <p className="text-xs text-red-400 text-center">
                            Failed to send. Try hello@soham.codes directly.
                          </p>
                        )}
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}