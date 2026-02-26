export interface Project {
    id: number;
    title: string;
    description: string;
    type: "Web App" | "Mobile App" | "API" | "Open Source";
    year: string;
    techStack: string[];
    images: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
  }
  
  export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar: string;
  }
  
  export interface Skill {
    name: string;
    icon: string;
  }
  
  export interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    readTime: number;
    createdAt: string;
  }
  
  export interface GuestbookEntry {
    _id: string;
    name: string;
    message: string;
    createdAt: string;
  }
  
  export interface UsesTool {
    category: string;
    items: {
      name: string;
      description: string;
      logo: string;
      url: string;
    }[];
  }