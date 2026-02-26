import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { GlobeSection } from "@/components/sections/GlobeSection";
import { MySite } from "@/components/sections/MySite";

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <About />
      <GlobeSection />
      <MySite />
    </main>
  );
}