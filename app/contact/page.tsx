"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Twitter, Mail, Calendar } from "lucide-react";
import { PageTransition } from "@/components/common/PageTransition";
import { PERSON, SOCIALS } from "@/lib/constans";
import { useContact } from "@/lib/queries/contact";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { mutate: sendContact, isPending, isSuccess, isError, reset } = useContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendContact(form, {
      onSuccess: () => {
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => reset(), 3000);
      },
    });
  };

  const contactLinks = [
    { icon: Mail, label: PERSON.email, href: `mailto:${PERSON.email}` },
    { icon: Github, label: "github.com/engineersoham", href: SOCIALS.github },
    { icon: Linkedin, label: "linkedin.com/in/soham-chatterjee-10", href: SOCIALS.linkedin },
    { icon: Twitter, label: "x.com/shm_chat", href: SOCIALS.twitter },
  ];

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
          Get In Touch
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Let&apos;s Work Together
        </h1>
        <p className="text-foreground/50 mb-12 max-w-lg">
          Have a project in mind? Want to collaborate? Or just want to say hi?
          My inbox is always open at{" "}
          <a href={`mailto:${PERSON.email}`} className="text-foreground underline underline-offset-4">
            {PERSON.email}
          </a>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-1.5 block">Name</label>
              <input type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-1.5 block">Email</label>
              <input type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-1.5 block">Message</label>
              <textarea required rows={5} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors resize-none" />
            </div>
            <motion.button type="submit" disabled={isPending || isSuccess}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer">
              {isPending ? "Sending..." : (<><Send size={15} /> Send Message</>)}
            </motion.button>
            {isSuccess && <p className="text-sm text-green-500 text-center">Message sent! I&apos;ll get back to you soon 🎉</p>}
            {isError && <p className="text-sm text-red-400 text-center">Something went wrong. Email me directly.</p>}
          </form>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
                Other Ways to Reach Me
              </p>
              <div className="flex flex-col gap-3">
                {contactLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-foreground/50 hover:text-foreground transition-colors group">
                    <s.icon size={16} className="shrink-0" />
                    <span className="group-hover:underline underline-offset-4">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-border bg-card/30">
              <p className="text-sm font-medium text-foreground mb-1">Prefer a call?</p>
              <p className="text-xs text-foreground/50 mb-3">
                Book a 30-min call to discuss your project. I&apos;m flexible with timezones ({PERSON.timezone}).
              </p>
              <a href={PERSON.calUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-80 transition-opacity w-fit">
                <Calendar size={13} />
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}