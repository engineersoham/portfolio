import type { Metadata } from "next";
import { PageTransition } from "@/components/common/PageTransition";
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Soham Chatterjee — Full Stack Developer, builder, and problem solver.",
};

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2023 — Present",
    description:
      "Building full-stack web applications for startups and founders. Specializing in MERN stack, Next.js, and AWS deployments. Delivered 10+ production apps.",
    techs: ["Next.js", "React", "Node.js", "MongoDB", "AWS"],
  },
  {
    role: "Frontend Developer Intern",
    company: "TechStartup Pvt Ltd",
    period: "2022 — 2023",
    description:
      "Built responsive UI components, improved Core Web Vitals by 40%, and worked closely with designers to implement pixel-perfect interfaces.",
    techs: ["React", "TypeScript", "Tailwind CSS"],
  },
];

const education = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Your University Name",
    period: "2020 — 2024",
    description: "Focused on algorithms, data structures, web development, and distributed systems.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
            About Me
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Hey, I&apos;m Soham 👋
          </h1>
          <div className="space-y-4 text-foreground/60 leading-relaxed">
            <p>
              I&apos;m a full-stack developer based in India, passionate about building
              products that make people&apos;s lives easier. I specialize in the MERN
              stack and love working with modern tools like Next.js, TypeScript, and AWS.
            </p>
            <p>
              I started coding at 16 and haven&apos;t stopped since. What started as
              curiosity turned into a career — and more importantly, a craft I genuinely
              love. I care deeply about performance, clean code, and great user experiences.
            </p>
            <p>
              Outside of work, I explore new frameworks, contribute to open source, write
              about what I learn, and occasionally touch grass. I believe great software
              is built by people who care — and I care a lot.
            </p>
          </div>

          {/* Socials */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { icon: Github, label: "GitHub", href: "https://github.com/sohamchatterjee" },
              { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/sohamchatterjee" },
              { icon: Twitter, label: "Twitter", href: "https://x.com/sohamchatterjee" },
              { icon: Mail, label: "Email", href: "mailto:hello@soham.codes" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-all"
              >
                <s.icon size={15} />
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-16" id="experience">
          <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-8">
            Work Experience
          </p>
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l border-border">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background" />
                <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-sm text-foreground/50">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-foreground/30 bg-muted px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-foreground/50 leading-relaxed mb-3">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.techs.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded-md bg-muted text-foreground/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-8">
            Education
          </p>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <div key={i} className="relative pl-6 border-l border-border">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-border bg-background" />
                <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-foreground/50">{edu.institution}</p>
                  </div>
                  <span className="text-xs font-mono text-foreground/30 bg-muted px-3 py-1 rounded-full">
                    {edu.period}
                  </span>
                </div>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PageTransition>
  );
}