import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { MySite } from "@/components/sections/MySite";
import GlobeSection from "@/components/sections/GlobeSection";
import { Testimonials } from "@/components/sections/Testimonials";


export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <About />
      <GlobeSection />
      <Testimonials />
      <MySite />
    </main>
  );
}