"use client";

import { motion } from "framer-motion";
import { CTAPrimaryButton } from "@/components/ui/CTAPrimaryButton";
import { CTASecondaryButton } from "@/components/ui/CTASecondaryButton";
import { SparklesCore } from "@/components/ui/sparkles";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-x-hidden pt-24 pb-16 md:pt-20 md:pb-16"
    >
      {/* ── Spotlight sweep ──────────────────────────────────────── */}
      <Spotlight
        className="-top-40 left-0 md:left-72 md:-top-20"
        fill="rgba(76, 141, 255, 0.28)"
      />

      {/* ── Full-hero ambient sparkles (subtle, premium) ─────────── */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="hero-ambient"
          background="transparent"
          minSize={0.3}
          maxSize={0.9}
          particleDensity={55}
          className="w-full h-full"
          particleColor="#4C8DFF"
          speed={0.5}
        />
      </div>

      {/* ── Two-column layout ────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col xl:flex-row items-center px-6 sm:px-8 md:px-16 xl:px-20">

        {/* Left: text content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 xl:max-w-[52%] xl:pr-8 text-center xl:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight mb-2">
            Grow to Help <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-glow-blue to-white">
              Others Grow
            </span>
          </h1>

          {/* ── Sparkles strip with gradient lines */}
          <div className="relative h-20 sm:h-28 w-full max-w-xl mx-auto xl:mx-0 -mt-2 mb-4">
            {/* Blur gradient lines */}
            <div className="absolute inset-x-8 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#4C8DFF] to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-8 sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#4C8DFF] to-transparent h-px w-3/4" />
            <div className="absolute inset-x-20 sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#1C5FD4] to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-20 sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#1C5FD4] to-transparent h-px w-1/4" />

            {/* Dense sparkles burst */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
              speed={3}
            />

            {/* Radial mask — fades edges so sparkles focus at the top */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: "var(--color-background)",
                maskImage:
                  "radial-gradient(350px 200px at top, transparent 20%, white)",
                WebkitMaskImage:
                  "radial-gradient(350px 200px at top, transparent 20%, white)",
              }}
            />
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-secondary-text mb-10 max-w-2xl mx-auto xl:mx-0 font-light">
            Helping businesses and entrepreneurs scale through software,
            automation and technology.
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center xl:justify-start">
            <CTAPrimaryButton href="#projects">View Projects</CTAPrimaryButton>
            <CTASecondaryButton href="https://wa.me/528126217157?text=Hola%20Ethan%2C%20te%20contacto%20desde%20tu%20sitio%20web%20EPRS.%20Me%20gustar%C3%ADa%20hablar%20sobre%20un%20proyecto." target="_blank" rel="noopener noreferrer">Let&apos;s Talk</CTASecondaryButton>
          </div>
        </motion.div>

        {/* Right: 3D Spline scene — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden xl:flex xl:flex-1 items-center justify-center min-w-0 h-[680px]"
        >
          <div className="w-full h-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
