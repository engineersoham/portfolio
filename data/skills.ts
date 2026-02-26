export interface Skill {
    name: string;
    icon: string;
  }
  
  export const skillRows: Skill[][] = [
    [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "TS" },
      { name: "JavaScript", icon: "JS" },
      { name: "Tailwind CSS", icon: "🌊" },
      { name: "Framer Motion", icon: "🎭" },
      { name: "HTML5", icon: "🌐" },
      { name: "CSS3", icon: "🎨" },
    ],
    [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "⚡" },
      { name: "MongoDB", icon: "🍃" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Redis", icon: "🔴" },
      { name: "Mongoose", icon: "🗄️" },
      { name: "REST API", icon: "🔌" },
      { name: "GraphQL", icon: "◈" },
    ],
    [
      { name: "AWS", icon: "☁️" },
      { name: "Docker", icon: "🐳" },
      { name: "Git", icon: "🌿" },
      { name: "GitHub", icon: "🐙" },
      { name: "Linux", icon: "🐧" },
      { name: "Nginx", icon: "🔧" },
      { name: "PM2", icon: "⚙️" },
      { name: "CI/CD", icon: "🔄" },
    ],
    [
      { name: "Figma", icon: "🎯" },
      { name: "Cloudinary", icon: "🌤️" },
      { name: "JWT", icon: "🔐" },
      { name: "Prisma", icon: "💎" },
      { name: "Zustand", icon: "🐻" },
      { name: "Socket.io", icon: "🔁" },
      { name: "Nodemailer", icon: "📧" },
      { name: "Zod", icon: "✅" },
    ],
  ];