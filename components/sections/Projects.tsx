"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const typeColors: Record<string, string> = {
  "Web App": "bg-foreground/10 text-foreground/60",
  "Mobile App": "bg-foreground/10 text-foreground/60",
  "API": "bg-foreground/10 text-foreground/60",
  "Open Source": "bg-foreground/10 text-foreground/60",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative border border-border rounded-3xl overflow-hidden bg-card/30 hover:border-foreground/20 transition-all duration-300"
    >
      {/* Project number */}
      <div className="absolute top-5 left-5 z-10 font-mono text-xs text-foreground/20">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Image area */}
      <div className="relative h-52 bg-muted/30 overflow-hidden">
        {project.images && project.images.length > 0 ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-bold text-foreground/5">
              {project.title[0]}
            </span>
          </div>
        )}

        {/* Overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-3"
            >
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-80 transition-opacity"
                >
                  <Github size={14} />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-foreground text-xs font-semibold hover:border-foreground/30 transition-all"
                >
                  <ExternalLink size={14} />
                  Live
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", typeColors[project.type])}>
            {project.type}
          </span>
          <span className="text-xs text-foreground/30 font-mono">{project.year}</span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-foreground transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-foreground/50 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-md bg-muted text-foreground/50"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-foreground/30">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-12"
      >
        <div>
          <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-3">
            Case Studies
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Curated Work
          </h2>
        </div>
        <Link
          href="/projects"
          className="hidden md:flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
        >
          See all projects
          <ArrowRight size={16} />
        </Link>
      </motion.div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Mobile see all */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-8 md:hidden"
      >
        <Link
          href="/projects"
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-all"
        >
          See all projects
          <ArrowRight size={16} />
        </Link>
      </motion.div>

    </section>
  );
}