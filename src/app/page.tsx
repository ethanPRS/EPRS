import { IntroAnimation } from "@/components/IntroAnimation";
import { Navbar } from "@/components/Navbar";
import { ScrollLinePath } from "@/components/ScrollLinePath";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      {/* Brand intro — plays on every page load, z-[200] */}
      <IntroAnimation />

      {/* Liquid glass navbar — z-[100], slides in after intro */}
      <Navbar />

      {/*
        overflow-x-clip instead of overflow-x-hidden:
        both clip horizontal overflow visually, but overflow-x-clip does NOT
        create a scroll container — so position:sticky inside child sections works.
        overflow-x-hidden creates an implicit scroll context that breaks sticky.
      */}
      <main className="relative bg-background text-text selection:bg-cta-blue/30 overflow-x-clip">
        {/* Global Animated Line */}
        <ScrollLinePath />

        {/* Sections — IDs live inside each component */}
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
