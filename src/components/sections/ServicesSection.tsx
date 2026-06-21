"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Zap,
  BrainCircuit,
  CalendarDays,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  offerings: string[];
  accentColor: string;
  visualBg: string;
  orb1: string;
  orb2: string;
  badge?: string;
}

const services: Service[] = [
  {
    icon: Globe,
    title: "Software Development",
    description:
      "Building custom digital platforms — from landing pages to full web applications — crafted around your specific business goals.",
    offerings: ["Landing Pages", "Corporate Websites", "Institutional Portals", "Event Sites", "Custom Web Apps"],
    accentColor: "#4C8DFF",
    visualBg: "linear-gradient(145deg, #020817 0%, #071A40 55%, #0D3B8E 100%)",
    orb1: "#1C5FD4",
    orb2: "#4C8DFF",
  },
  {
    icon: Zap,
    title: "Process Automation",
    description:
      "Eliminating repetitive work through intelligent workflows, API integrations, and automated reporting pipelines.",
    offerings: ["Form Automation", "Email Workflows", "Platform Integrations", "Dashboards", "Automatic Reports"],
    accentColor: "#38BDF8",
    visualBg: "linear-gradient(145deg, #020817 0%, #0A2030 55%, #0369A1 100%)",
    orb1: "#0284C7",
    orb2: "#38BDF8",
  },
  {
    icon: BrainCircuit,
    title: "AI Solutions",
    description:
      "Leveraging artificial intelligence to improve efficiency, automate decisions, and unlock new capabilities for your business.",
    offerings: ["AI Chatbots", "Internal Assistants", "Intelligent Search", "AI-Powered Automation", "Content Generation"],
    accentColor: "#818CF8",
    visualBg: "linear-gradient(145deg, #020817 0%, #16124A 55%, #3730A3 100%)",
    orb1: "#4338CA",
    orb2: "#818CF8",
    badge: "Premium",
  },
  {
    icon: CalendarDays,
    title: "Event Technology",
    description:
      "Creating seamless digital experiences for conferences, communities, and large-scale events — from registration to auto-generated certificates.",
    offerings: ["Event Landing Pages", "Attendee Registration", "Speaker Management", "Digital Agenda", "Auto Certificates"],
    accentColor: "#34D399",
    visualBg: "linear-gradient(145deg, #020817 0%, #042A1A 55%, #065F46 100%)",
    orb1: "#059669",
    orb2: "#34D399",
    badge: "Premium",
  },
  {
    icon: Lightbulb,
    title: "Technology Consulting",
    description:
      "Helping organizations make confident, strategic technology decisions — from architecture planning to process optimization.",
    offerings: ["Software Architecture", "Technology Planning", "Process Optimization"],
    accentColor: "#FBBF24",
    visualBg: "linear-gradient(145deg, #020817 0%, #2A1000 55%, #78350F 100%)",
    orb1: "#92400E",
    orb2: "#FBBF24",
  },
];

// ── Right-side visual panel ───────────────────────────────────────────
const ServiceVisual = ({ service, index }: { service: Service; index: number }) => {
  const Icon = service.icon;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.985 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/8"
        style={{ background: service.visualBg, height: "clamp(400px, 55vh, 520px)" }}
      >
        {/* Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[90px] opacity-30 pointer-events-none"
          style={{ backgroundColor: service.orb1 }} />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-[70px] opacity-22 pointer-events-none"
          style={{ backgroundColor: service.orb2 }} />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 p-10">
          {/* Icon with glow */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl blur-2xl opacity-40" style={{ backgroundColor: service.accentColor }} />
            <div className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
              <Icon size={40} style={{ color: service.accentColor }} />
            </div>
          </div>

          {/* Name + badge */}
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold text-white">{service.title}</h3>
            {service.badge && (
              <span className="mt-2 inline-block text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                style={{ color: service.accentColor, backgroundColor: `${service.accentColor}18`, borderColor: `${service.accentColor}40` }}>
                {service.badge}
              </span>
            )}
          </div>

          {/* Offerings chips */}
          <div className="flex flex-wrap justify-center gap-2 max-w-[300px]">
            {service.offerings.map((o) => (
              <span key={o} className="text-xs font-medium px-3 py-1.5 rounded-full text-white/70 bg-white/5 backdrop-blur-sm"
                style={{ border: `1px solid ${service.accentColor}22` }}>
                {o}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
};

// ── Left-side service item ────────────────────────────────────────────
const ServiceItem = ({
  service,
  index,
  isActive,
  onActive,
}: {
  service: Service;
  index: number;
  isActive: boolean;
  onActive: (i: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  // Stable callback ref pattern avoids stale closures while keeping effect stable
  const onActiveRef = useRef(onActive);
  useEffect(() => { onActiveRef.current = onActive; });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onActiveRef.current(index); },
      { rootMargin: "-30% 0px -30% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // min-h-[55vh] per item gives the sticky panel ~2475px of travel through all services.
  return (
    <div
      ref={ref}
      className="pl-8 transition-[opacity,border-color] duration-500 flex flex-col justify-center"
      style={{
        minHeight: "55vh",
        paddingTop: "3rem",
        paddingBottom: "3rem",
        marginLeft: "-2px",
        borderLeft: `2px solid ${isActive ? service.accentColor : "rgba(255,255,255,0.07)"}`,
        opacity: isActive ? 1 : 0.28,
      }}
    >
      {/* Mobile visual */}
      <div className="lg:hidden mb-7 h-[200px] rounded-xl overflow-hidden relative border border-white/8"
        style={{ background: service.visualBg }}>
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-[50px] opacity-35"
          style={{ backgroundColor: service.orb1 }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
            style={{ color: service.accentColor }}>
            <Icon size={28} />
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 px-6">
            {service.offerings.slice(0, 3).map((o) => (
              <span key={o} className="text-[10px] px-2 py-1 rounded-full text-white/60 bg-white/5"
                style={{ border: `1px solid ${service.accentColor}20` }}>
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Icon */}
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${service.accentColor}18`, border: `1px solid ${service.accentColor}30`, color: service.accentColor }}>
        <Icon size={18} />
      </div>

      {/* Badge */}
      {service.badge && (
        <span className="mb-3 inline-block text-[9px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full border"
          style={{ color: service.accentColor, backgroundColor: `${service.accentColor}18`, borderColor: `${service.accentColor}40` }}>
          {service.badge}
        </span>
      )}

      <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-3">
        {service.title}
      </h3>
      <p className="text-secondary-text text-base leading-relaxed mb-6 max-w-md">
        {service.description}
      </p>
      <a href="#contact"
        className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 group/link"
        style={{ color: service.accentColor }}>
        Get started
        <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1" />
      </a>
    </div>
  );
};

// ── Main section ──────────────────────────────────────────────────────
export const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onActive = useCallback((i: number) => setActiveIndex(i), []);

  return (
    <section id="services" className="relative py-32 bg-secondary-background/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 xl:px-20">

        {/* Section header — above the grid, normal flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 mb-4 leading-tight">
            Technology tailored
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-glow-blue to-white">
              to your goals
            </span>
          </h2>
          <p className="text-secondary-text text-base max-w-md leading-relaxed">
            From software to intelligent systems — built to help you grow.
          </p>
        </motion.div>

        {/*
          Grid layout:
          - No `items-start` so the right column stretches to match the left column height.
          - Left column: `lg:self-start` keeps it at natural height (it drives the row height).
          - Right column: default `align-self: stretch` → as tall as left column.
          - Inner sticky div inside right column sticks within that full height.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20">

          {/* LEFT: service items — natural height, drives grid row height */}
          <div className="lg:self-start">
            <div className="border-l-2 border-white/6">
              {services.map((service, i) => (
                <ServiceItem
                  key={service.title}
                  service={service}
                  index={i}
                  isActive={activeIndex === i}
                  onActive={onActive}
                />
              ))}
            </div>
          </div>

          {/*
            RIGHT: wrapper stretches to full grid height (no sticky here).
            Inner div is sticky — has full left-column height as its containing block,
            so it stays pinned while the user scrolls through all service items.
          */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <ServiceVisual service={services[activeIndex]} index={activeIndex} />

              {/* Progress dots */}
              <div className="flex justify-center items-center gap-2 mt-5">
                {services.map((service, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: activeIndex === i ? "22px" : "6px",
                      height: "6px",
                      backgroundColor: activeIndex === i ? service.accentColor : "rgba(255,255,255,0.18)",
                    }}
                    aria-label={`View ${service.title}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
