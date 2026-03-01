"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Mail, Send, Linkedin, Github, Twitter } from "lucide-react";
import { PERSON, SOCIALS } from "@/lib/constans";
import { useContact } from "@/lib/queries/contact";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "idle" | "cal" | "message";

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [tab, setTab] = useState<Tab>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { mutate: sendContact, isPending, isSuccess, isError, reset } = useContact();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendContact(form, {
      onSuccess: () => {
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => reset(), 3000);
      },
    });
  };

  const socials = [
    { icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
    { icon: Github, href: SOCIALS.github, label: "GitHub" },
    { icon: Twitter, href: SOCIALS.twitter, label: "Twitter" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg md:bottom-auto md:top-1/2 md:-translate-y-1/2"
          >
            <div className="bg-card border border-border rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden">
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mt-3 md:hidden" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <h2 className="text-lg font-semibold text-foreground">Get in touch</h2>
                <button onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors cursor-pointer">
                  <X size={16} className="text-foreground/60" />
                </button>
              </div>

              <div className="px-6 pb-6">
                {/* Two option cards */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => setTab(tab === "cal" ? "idle" : "cal")}
                    className={`flex flex-col gap-3 p-4 rounded-2xl border text-left transition-all ${
                      tab === "cal" ? "border-foreground/30 bg-muted/60" : "border-border bg-muted/30 hover:border-foreground/20 hover:bg-muted/60"
                    }`}>
                    <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                      <Calendar size={17} className="text-foreground/60" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">Book a Call</p>
                      <p className="text-xs text-foreground/40 mt-0.5">Schedule a 30-min chat</p>
                    </div>
                  </button>

                  <a href={`mailto:${PERSON.email}`}
                    className="flex flex-col gap-3 p-4 rounded-2xl border border-border bg-muted/30 hover:border-foreground/20 hover:bg-muted/60 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                      <Mail size={17} className="text-foreground/60" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">Email Me</p>
                      <p className="text-xs text-foreground/40 mt-0.5">{PERSON.email}</p>
                    </div>
                  </a>
                </div>

                {/* Cal embed */}
                <AnimatePresence>
                  {tab === "cal" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mb-4"
                    >
                      <Cal
                        namespace="30min"
                        calLink="sohamchatterjee/30min"
                        style={{ width: "100%", height: "400px", overflow: "scroll" }}
                        config={{ layout: "month_view" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message form toggle */}
                <button onClick={() => setTab(tab === "message" ? "idle" : "message")}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border border-dashed border-border hover:border-foreground/20 transition-all cursor-pointer mb-4">
                  <Send size={15} className="text-foreground/40" />
                  <span className="text-sm text-foreground/50">
                    {tab === "message" ? "Hide message form" : "Or write me a message here"}
                  </span>
                  <span className="ml-auto text-xs text-foreground/30">
                    {tab === "message" ? "Close" : "Tap to open"}
                  </span>
                </button>

                {/* Message form */}
                <AnimatePresence>
                  {tab === "message" && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-3 overflow-hidden mb-4"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" required value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Name"
                          className="px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors" />
                        <input type="email" required value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="Email"
                          className="px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors" />
                      </div>
                      <textarea required rows={3} value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="How can I help you?"
                        className="px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors resize-none" />

                      {isError && (
                        <p className="text-xs text-red-500 text-center">
                          Something went wrong. Please try again.
                        </p>
                      )}

                      <button type="submit" disabled={isPending || isSuccess}
                        className="w-full py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer">
                        {isPending ? "Sending..." : isSuccess ? "Sent! 🎉" : "Send Message"}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Socials */}
                <div className="flex flex-col items-center gap-3 pt-2 border-t border-border">
                  <p className="text-xs text-foreground/30 uppercase tracking-widest mt-2">Connect on Socials</p>
                  <div className="flex items-center gap-4">
                    {socials.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground/40 hover:text-foreground hover:border-foreground/30 transition-all">
                        <s.icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}