import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { MySite } from "@/components/sections/MySite";
import { FooterCTA } from "@/components/common/FooterCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Testimonials />
      <MySite />
      <FooterCTA />
    </main>
  );
}