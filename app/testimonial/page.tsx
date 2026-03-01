"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function TestimonialForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "submitted">("loading");
  const [personName, setPersonName] = useState("");
  const [form, setForm] = useState({ role: "", company: "", message: "", avatar: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    fetch(`${API_URL}/api/testimonials/verify/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setPersonName(data.data.name);
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/testimonials/submit/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("submitted");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/40 text-sm">Verifying your link...</p>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <h1 className="text-xl font-bold text-foreground mb-2">Invalid or Expired Link</h1>
          <p className="text-foreground/40 text-sm">This link is either invalid or has already been used.</p>
        </div>
      </div>
    );
  }

  if (status === "submitted") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-4xl mb-4">🎉</p>
          <h1 className="text-xl font-bold text-foreground mb-2">Thank you, {personName}!</h1>
          <p className="text-foreground/40 text-sm">Your testimonial has been submitted and is pending review.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-4">
            <Star size={20} className="text-background" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Hey {personName}! 👋</h1>
          <p className="text-foreground/40 text-sm mt-2">
            I'd love to hear about your experience working with me.
            It only takes 2 minutes!
          </p>
        </div>

        <form onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-1.5 block">
                Your Role
              </label>
              <input
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. CTO"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-1.5 block">
                Company
              </label>
              <input
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Acme Inc."
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-1.5 block">
              Your Message
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Share your experience working with Soham..."
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-1.5 block">
              Your Photo URL <span className="normal-case text-foreground/20">(optional)</span>
            </label>
            <input
              value={form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer mt-2"
          >
            {submitting ? "Submitting..." : "Submit Testimonial"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function TestimonialPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/40 text-sm">Loading...</p>
      </div>
    }>
      <TestimonialForm />
    </Suspense>
  );
}