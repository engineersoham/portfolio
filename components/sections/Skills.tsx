"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const techStack = [
  { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "JavaScript",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Node.js",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "MongoDB",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Redis",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "Prisma",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" },
  { name: "Tailwind",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Figma",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "AWS",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Docker",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Git",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "Linux",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "Python",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Nginx",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
  { name: "VS Code",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
];

function Orb({ rotation }: { rotation: number }) {
  return (
    <div className="relative w-52 h-52 mx-auto">
      <div className="absolute inset-0 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, transparent 70%)" }} />
      {[0, 45, 90, 135].map((offset, i) => (
        <div key={i} className="absolute inset-0" style={{ transform: `rotate(${rotation + offset}deg)` }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-24 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(100,80,160,0.45) 0%, rgba(50,40,100,0.15) 60%, transparent 100%)", transformOrigin: "50% 100%" }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-24 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(100,80,160,0.45) 0%, rgba(50,40,100,0.15) 60%, transparent 100%)", transformOrigin: "50% 0%" }} />
        </div>
      ))}
      <div className="absolute inset-10 rounded-full"
        style={{
          background: "radial-gradient(circle at 38% 32%, rgba(80,60,140,0.9) 0%, rgba(20,15,35,0.95) 70%)",
          boxShadow: "0 0 30px rgba(100,60,200,0.2), inset 0 1px 0 rgba(255,255,255,0.07)",
        }} />
      <div className="absolute inset-14 rounded-full"
        style={{ background: "radial-gradient(circle at 35% 30%, rgba(180,150,255,0.1) 0%, transparent 60%)" }} />
    </div>
  );
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const orbRotation = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const smoothRot = useSpring(orbRotation, { stiffness: 25, damping: 18 });
  const gridScale = useTransform(scrollYProgress, [0.15, 0.7], [0.65, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.45], [30, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  return (
    <section ref={ref} className="py-28 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <motion.div style={{ rotate: smoothRot }}>
            <Orb rotation={0} />
          </motion.div>
        </div>

        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-foreground/25 mb-3">MY SKILLS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            The Secret{" "}
            <em className="font-light italic text-foreground/35">Sauce</em>
          </h2>
        </motion.div>

        <motion.div style={{ scale: gridScale, opacity: gridOpacity }} className="origin-center">
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.4, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.035, type: "spring", bounce: 0.45, duration: 0.6 }}
                whileHover={{ scale: 1.18, y: -5 }}
                className="group relative"
              >
                <div
                  className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center border transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(255,255,255,0.08)"; el.style.borderColor = "rgba(255,255,255,0.15)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(255,255,255,0.04)"; el.style.borderColor = "rgba(255,255,255,0.07)"; }}
                >
                  <img src={tech.icon} alt={tech.name} width={32} height={32} className="w-8 h-8 object-contain" loading="lazy" />
                </div>
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap">
                  <span className="text-[11px] font-mono text-foreground/40">{tech.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}