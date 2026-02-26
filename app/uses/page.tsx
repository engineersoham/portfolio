import type { Metadata } from "next";
import { PageTransition } from "@/components/common/PageTransition";

export const metadata: Metadata = {
  title: "Uses",
  description: "Tools, apps, and gear Soham Chatterjee uses every day.",
};

const uses = [
  {
    category: "Editor & Terminal",
    items: [
      { name: "VS Code", desc: "Primary editor. Extensions: Prettier, ESLint, GitLens, Tailwind CSS IntelliSense.", logo: "💻" },
      { name: "iTerm2 + Oh My Zsh", desc: "Terminal with custom theme, plugins for autosuggestions and syntax highlighting.", logo: "🖥️" },
      { name: "Ghostty", desc: "Fast GPU-accelerated terminal. Use it for quick tasks.", logo: "👻" },
    ],
  },
  {
    category: "Design & Productivity",
    items: [
      { name: "Figma", desc: "UI design, wireframing, and prototyping. Can't live without it.", logo: "🎯" },
      { name: "Notion", desc: "Notes, project management, docs, and everything else.", logo: "📓" },
      { name: "Arc Browser", desc: "My daily browser. Spaces and boosts make it perfect.", logo: "🌐" },
      { name: "Raycast", desc: "Replaced Spotlight. Launchers, snippets, clipboard history.", logo: "🚀" },
    ],
  },
  {
    category: "Dev Tools",
    items: [
      { name: "Postman", desc: "API testing and documentation.", logo: "📬" },
      { name: "TablePlus", desc: "Database GUI for MongoDB and PostgreSQL.", logo: "🗄️" },
      { name: "GitHub", desc: "Version control and open source contributions.", logo: "🐙" },
      { name: "Docker", desc: "Containerizing apps for consistent dev environments.", logo: "🐳" },
    ],
  },
  {
    category: "Hardware",
    items: [
      { name: "MacBook Pro M2", desc: "Primary machine. Fast, quiet, reliable.", logo: "💻" },
      { name: "LG 27\" 4K Monitor", desc: "Secondary display for more screen real estate.", logo: "🖥️" },
      { name: "Keychron K2", desc: "Mechanical keyboard with brown switches.", logo: "⌨️" },
    ],
  },
];

export default function UsesPage() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
          My Setup
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Uses
        </h1>
        <p className="text-foreground/50 mb-16 max-w-lg">
          The tools, apps, and gear I use on a daily basis to build, design, and ship products.
        </p>

        <div className="space-y-14">
          {uses.map((section) => (
            <div key={section.category}>
              <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-6">
                {section.category}
              </p>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card/30 hover:border-foreground/20 hover:bg-card/60 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl shrink-0">
                      {item.logo}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-foreground/50 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}