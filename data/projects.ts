import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Project One",
    description: "Add your real project description here. What problem did it solve? What was your role?",
    type: "Web App",
    year: "2025",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "Framer Motion"],
    images: [],
    featured: true,
  },
  {
    id: 2,
    title: "Project Two",
    description: "Add your real project description here.",
    type: "Web App",
    year: "2025",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    images: [],
    featured: true,
  },
  {
    id: 3,
    title: "Project Three",
    description: "Add your real project description here.",
    type: "Web App",
    year: "2024",
    techStack: ["React", "Socket.io", "Node.js", "MongoDB"],
    images: [],
    featured: true,
  },
];