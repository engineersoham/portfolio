"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const footerLinks = [
  {
    heading: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Work", href: "/projects" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Guestbook", href: "/guestbook" },
      { label: "Uses", href: "/uses" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socials = [
  { icon: Github, href: "https://github.com/sohamchatterjee", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/sohamchatterjee", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/sohamchatterjee", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@soham.codes", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="32" height="20" viewBox="0 0 130 60" fill="none">
                <path d="M10 15 H40 C50 15 50 30 40 30 H20 C10 30 10 45 20 45 H50"
                  stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="text-foreground" />
                <path d="M60 15 V45 M80 15 V45 M60 30 H80"
                  stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" className="text-foreground" />
                <path d="M95 45 V15 L110 35 L125 15 V45"
                  stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="text-foreground" />
              </svg>
              <span className="font-semibold text-foreground">Soham Chatterjee</span>
            </div>
            <p className="text-sm text-foreground/45 max-w-xs leading-relaxed">
              Full Stack Developer from Kolkata, India. Building fast, scalable web products.
            </p>
            <div className="flex items-center gap-2 mt-4">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground/40 hover:text-foreground hover:border-foreground/30 transition-all">
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-mono uppercase tracking-widest text-foreground/30 mb-4">{col.heading}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — ThemeToggle here too */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <p className="text-xs text-foreground/30">
            © {new Date().getFullYear()} Soham Chatterjee · Built with Next.js · Deployed on AWS
          </p>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="text-xs text-foreground/20 font-mono">নমস্কার 🙏</span>
          </div>
        </div>

      </div>
    </footer>
  );
}