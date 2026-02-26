"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { PageTransition } from "@/components/common/PageTransition";
import type { GuestbookEntry } from "@/types";

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [form, setForm] = useState({ name: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const fetchEntries = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guestbook`);
      const data = await res.json();
      setEntries(data);
    } catch {
      console.error("Failed to fetch guestbook entries");
    }
  };

  // useEffect(() => {
  //   fetchEntries();
  // }, []);
  useEffect(() => {
    // Backend not connected yet — will be live after deployment
    setLoading(false);
  }, []);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setStatus("loading");
  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guestbook`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(form),
  //     });
  //     if (res.ok) {
  //       setStatus("success");
  //       setForm({ name: "", message: "" });
  //       fetchEntries();
  //       setTimeout(() => setStatus("idle"), 3000);
  //     } else {
  //       setStatus("error");
  //     }
  //   } catch {
  //     setStatus("error");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Will be connected to backend soon
    setStatus("success");
    setForm({ name: "", message: "" });
    setTimeout(() => setStatus("idle"), 3000);
  };
  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-20">
        <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
          Guestbook
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Say Hello 👋
        </h1>
        <p className="text-foreground/50 mb-12">
          Leave a message, a thought, or just let me know you were here!
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 rounded-3xl border border-border bg-card/30 mb-10"
        >
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
          />
          <textarea
            required
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Leave a message..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors resize-none"
          />
          <div className="flex items-center justify-between">
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              <Send size={14} />
              {status === "loading" ? "Posting..." : "Post Message"}
            </motion.button>
            {status === "success" && (
              <p className="text-sm text-green-500">Posted! 🎉</p>
            )}
          </div>
        </form>

        {/* Entries */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-2">
            {entries.length} Messages
          </p>
          <AnimatePresence>
            {entries.length === 0 ? (
              <p className="text-foreground/30 text-sm text-center py-12">
                No messages yet. Be the first! 🌟
              </p>
            ) : (
              entries.map((entry) => (
                <motion.div
                  key={entry._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 p-4 rounded-2xl border border-border bg-card/30"
                >
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-foreground/60 shrink-0">
                    {entry.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground">{entry.name}</p>
                      <p className="text-xs text-foreground/30">
                        {new Date(entry.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="text-sm text-foreground/60">{entry.message}</p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
