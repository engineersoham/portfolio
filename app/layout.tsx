import type { Metadata } from "next";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalModal } from "@/components/common/GlobalModal";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Soham Chatterjee — Full Stack Developer",
    template: "%s | Soham Chatterjee",
  },
  description: "Full Stack Developer specializing in MERN stack, Next.js and AWS.",
  keywords: ["Soham Chatterjee", "Full Stack Developer", "MERN Stack", "Next.js"],
  authors: [{ name: "Soham Chatterjee" }],
  creator: "Soham Chatterjee",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soham.codes",
    title: "Soham Chatterjee — Full Stack Developer",
    description: "Full Stack Developer specializing in MERN stack, Next.js and AWS.",
    siteName: "Soham Chatterjee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soham Chatterjee — Full Stack Developer",
    description: "Full Stack Developer specializing in MERN stack, Next.js and AWS.",
    creator: "@sohamchatterjee",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
        <ThemeProvider>
          {/*
            ── Full-site background stack (fixed, behind everything) ──
            Layer 1: Grid lines
            Layer 2: Radial vignette — grid fades toward edges
            Layer 3: Top-left & bottom-right corner glow
            Layer 4: Subtle dot at every grid intersection via radial-gradient
          */}

          {/* Layer 1 — Grid lines */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(var(--color-foreground) 1px, transparent 1px),
                linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)
              `,
              backgroundSize: "52px 52px",
              opacity: 0.055,
              zIndex: 0,
            }}
          />

          {/* Layer 2 — Radial vignette (grid visible in center, fades at edges) */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 70% 70% at 50% 30%, transparent 40%, var(--color-background) 100%)`,
              zIndex: 1,
            }}
          />

          {/* Layer 3 — Corner accent glows */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 2 }}
          >
            {/* Top-left indigo glow */}
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: 500, height: 500,
              background: "radial-gradient(circle at 0% 0%, rgba(99,102,241,0.06) 0%, transparent 65%)",
            }} />
            {/* Bottom-right violet glow */}
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: 500, height: 500,
              background: "radial-gradient(circle at 100% 100%, rgba(139,92,246,0.05) 0%, transparent 65%)",
            }} />
            {/* Center top warm glow */}
            <div style={{
              position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
              width: 600, height: 300,
              background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.04) 0%, transparent 70%)",
            }} />
          </div>

          {/* Layer 4 — Dot at every grid intersection */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)`,
              backgroundSize: "52px 52px",
              backgroundPosition: "-1px -1px",
              opacity: 0.04,
              zIndex: 3,
            }}
          />

          {/* All content above the background stack */}
          <div className="relative" style={{ zIndex: 10 }}>
            <SmoothScroll>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <GlobalModal />
            </SmoothScroll>
          </div>
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}