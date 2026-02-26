"use client";

import { motion } from "framer-motion";
// import { PERSON } from "@/lib/constants";
import { PERSON } from "@/lib/constans";

const timezones = [
  { city: "San Francisco", timezone: "America/Los_Angeles", abbr: "PST" },
  { city: "New York", timezone: "America/New_York", abbr: "EST" },
  { city: "London", timezone: "Europe/London", abbr: "GMT" },
  { city: "Kolkata", timezone: "Asia/Kolkata", abbr: "IST", isMe: true },
  { city: "Singapore", timezone: "Asia/Singapore", abbr: "SGT" },
  { city: "Tokyo", timezone: "Asia/Tokyo", abbr: "JST" },
];

function Clock({ timezone }: { timezone: string }) {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(now);
  return <span>{time}</span>;
}

export default function AvailabilitySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">
              Available to collaborate
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work with me,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              anywhere
            </span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-xl mx-auto">
            Based in Kolkata, India — but I collaborate across time zones with
            teams around the world.
          </p>
        </motion.div>

        {/* Timezone Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {timezones.map((tz, i) => (
            <motion.div
              key={tz.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-5 border transition-all duration-300 ${
                tz.isMe
                  ? "border-indigo-500/50 bg-indigo-500/10"
                  : "border-border/50 bg-card/30 hover:border-border hover:bg-card/50"
              }`}
            >
              {tz.isMe && (
                <span className="absolute top-3 right-3 text-xs text-indigo-400 font-medium bg-indigo-500/20 px-2 py-0.5 rounded-full">
                  me
                </span>
              )}
              <p className="text-xs text-foreground/40 font-medium uppercase tracking-widest mb-1">
                {tz.abbr}
              </p>
              <p className="text-2xl font-bold font-mono tabular-nums">
                <Clock timezone={tz.timezone} />
              </p>
              <p className="text-sm text-foreground/60 mt-1">{tz.city}</p>
            </motion.div>
          ))}
        </div>

        {/* Availability bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/50 bg-card/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-semibold text-lg mb-1">
              Ready for async or live collaboration
            </p>
            <p className="text-foreground/50 text-sm">
              I respond within a few hours regardless of your timezone.
            </p>
          </div>
          <a
            href={PERSON.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm transition-colors duration-200"
          >
            Book a call
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}