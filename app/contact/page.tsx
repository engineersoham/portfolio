"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Github, Linkedin, Twitter, Calendar } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

type Tab = "book" | "message";

export default function ContactPage() {
  const [tab, setTab] = useState<Tab>("book");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

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
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">

      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
          Contact
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          Let&apos;s Get In Touch
        </h1>
        <p className="text-foreground/40 text-sm mb-6">
          hello@soham.codes
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
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

        {/* Tab switcher */}
        <div className="inline-flex items-center gap-1 p-1 rounded-full border border-border bg-card/50 mx-auto">
          <button
            onClick={() => setTab("book")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              tab === "book"
                ? "bg-foreground text-background"
                : "text-foreground/50 hover:text-foreground"
            }`}
          >
            <Calendar size={14} />
            Book a Call
          </button>
          <button
            onClick={() => setTab("message")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              tab === "message"
                ? "bg-foreground text-background"
                : "text-foreground/50 hover:text-foreground"
            }`}
          >
            <Send size={14} />
            Send Message
          </button>
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">

        {/* Book a Call — Cal.com embed */}
        {tab === "book" && (
          <motion.div
            key="book"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-border overflow-hidden bg-card/30"
          >
            <Cal
              namespace="30min"
              calLink="sohamchatterjee/30min"
              style={{ width: "100%", height: "600px", overflow: "scroll" }}
              config={{ layout: "month_view", theme: "dark" }}
            />
          </motion.div>
        )}

        {/* Send Message form */}
        {tab === "message" && (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-lg mx-auto"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 p-8 rounded-3xl border border-border bg-card/30"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-1.5 block">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono text-foreground/40 uppercase tracking-wider">
                    Message
                  </label>
                  <span className="text-xs text-foreground/30">
                    {form.message.length}/1000
                  </span>
                </div>
                <textarea
                  required
                  rows={5}
                  maxLength={1000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can I help you?"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-60 cursor-pointer"
              >
                <Send size={15} />
                {status === "loading"
                  ? "Sending..."
                  : status === "success"
                  ? "Message Sent! 🎉"
                  : "Send Message"}
              </motion.button>

              {status === "error" && (
                <p className="text-xs text-red-400 text-center">
                  Something went wrong. Try emailing directly at hello@soham.codes
                </p>
              )}
            </form>

            {/* Also book a call option */}
            <div className="text-center mt-6">
              <p className="text-sm text-foreground/40">
                Prefer a call instead?{" "}
                <button
                  onClick={() => setTab("book")}
                  className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Book a 30-min slot
                </button>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}