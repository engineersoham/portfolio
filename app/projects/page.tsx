import type { Metadata } from "next";
import { PageTransition } from "@/components/common/PageTransition";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects built by Soham Chatterjee.",
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
          <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
            All Projects
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Things I&apos;ve Built
          </h1>
          <p className="text-foreground/50 max-w-lg">
            A collection of projects ranging from full-stack web apps to open source tools.
            Each one taught me something new.
          </p>
        </div>
        <Projects />
      </div>
    </PageTransition>
  );
}