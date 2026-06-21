"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Image from "next/image";

const projects = [
  {
    tags: ["React", "Systems Simulation"],
    title: "Sisops Galaxy",
    tagline: "Process Scheduling Simulation Dashboard",
    description:
      "An interactive dashboard for simulating and visualizing process scheduling algorithms like FCFS, CPU Cores management, and memory allocation.",
    stack: "React · TypeScript · Dashboard UI",
    impact: "Educational systems operations tool",
    image: "/projects/sisops.png",
  },
  {
    tags: ["Web App", "Social Impact"],
    title: "Ezer Volunteer Platform",
    tagline: "Conectando empresas con causas",
    description:
      "Designed and developed a platform that helps volunteers discover opportunities and organizations manage community engagement more efficiently.",
    stack: "Next.js · Web Development · UX/UI",
    impact: "Community management simplified",
    image: "/projects/ezer.png",
  },
  {
    tags: ["Event Platform", "Real Project"],
    title: "Encuentro Mundial de Valores",
    tagline: "Humanismo y Valores en la era de la IA",
    description:
      "Created the digital platform for an international values-focused event, ensuring that technological advancement aligns with human values.",
    stack: "Web Development · Performance",
    impact: "Centralized event experience delivered",
    image: "/projects/emv.png",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32"
    >
      {/* Subtle radial glow in the background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(13,59,142,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 xl:px-20 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16 text-center lg:text-left"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold">
            Projects
          </h2>
          <p className="text-secondary-text mt-4 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
            Growth creates impact. Impact creates more growth.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl border border-white/8 bg-[#031332]/50 backdrop-blur-sm overflow-hidden flex flex-col cursor-pointer"
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
            >
              {/* ── Image header ─────────────────────────── */}
              <div className="relative h-44 sm:h-48 overflow-hidden shrink-0 bg-[#020817]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Noise texture overlay for premium feel */}
                <div
                  className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />

                {/* Bottom fade to card bg */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#031332]/95 to-transparent pointer-events-none" />

                {/* Arrow button */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={14} className="text-white" />
                </div>
              </div>

              {/* ── Card content ──────────────────────────────────── */}
              <div className="flex flex-col flex-1 p-5 sm:p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-white/8 border border-white/10 text-secondary-text"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-1 group-hover:text-glow-blue transition-colors duration-200">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-sm text-glow-blue/80 font-medium mb-3">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-secondary-text font-light text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Divider */}
                <div className="my-4 h-px bg-white/6" />

                {/* Footer row */}
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-secondary-text/70 font-mono truncate">
                    {project.stack}
                  </p>
                  <div
                    className="shrink-0 w-2 h-2 rounded-full bg-glow-blue"
                    style={{ boxShadow: "0 0 6px 2px rgba(76,141,255,0.6)" }}
                  />
                </div>

                {/* Impact line */}
                <p className="text-xs text-white/40 mt-2 italic">
                  {project.impact}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
