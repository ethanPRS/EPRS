"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";

export const AboutSection = () => {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion || !path1Ref.current || !path2Ref.current || !sectionRef.current) return;

    const path1 = path1Ref.current;
    const path2 = path2Ref.current;
    
    gsap.set([path1, path2], {
      strokeDasharray: (_i, target) => target.getTotalLength(),
      strokeDashoffset: (_i, target) => target.getTotalLength(),
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1,
      },
    });

    tl.to(path1, {
      strokeDashoffset: 0,
      ease: "power2.inOut",
    }, 0).to(path2, {
      strokeDashoffset: 0,
      ease: "power2.inOut",
    }, 0.2);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen flex items-center py-24 md:py-32">
      {/* Branching SVG from the main line */}
      <div className="absolute left-4 md:left-24 top-1/2 -translate-y-1/2 w-40 md:w-64 h-40 md:h-64 z-0 pointer-events-none opacity-40 md:opacity-60">
        <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
          <path
            ref={path1Ref}
            d="M 0 128 C 60 128, 60 60, 128 60 C 190 60, 190 128, 256 128"
            stroke="url(#glowGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_rgba(76,141,255,0.8)]"
          />
          <path
            ref={path2Ref}
            d="M 64 128 C 100 128, 100 190, 160 190 C 210 190, 210 128, 256 128"
            stroke="url(#glowGradient)"
            strokeWidth="1"
            strokeLinecap="round"
            className="drop-shadow-[0_0_5px_rgba(76,141,255,0.5)]"
          />
          <defs>
            <linearGradient id="glowGradient" x1="0" y1="0" x2="256" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4C8DFF" stopOpacity="0.2" />
              <stop offset="0.5" stopColor="#4C8DFF" />
              <stop offset="1" stopColor="#4C8DFF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 xl:px-20 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto lg:mx-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-8 text-center lg:text-left">
            {t("about.title.line1")} <br className="hidden md:block" />
            <span className="text-cta-blue">{t("about.title.line2")}</span>
          </h2>
          
          <div className="space-y-6 text-base md:text-lg text-secondary-text font-light leading-relaxed text-center lg:text-left">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

