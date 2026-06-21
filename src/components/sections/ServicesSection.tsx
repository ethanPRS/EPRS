"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Zap, BrainCircuit, CalendarDays, Lightbulb, ArrowRight,
  FileText, RefreshCw, MailCheck, CheckCircle2,
  Users, Mic, Award,
  Monitor, Server, Database,
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

// ─────────────────────────────────────────────────────────────────────────────
// Bespoke visual panels
// ─────────────────────────────────────────────────────────────────────────────

/** 0 — Code editor mockup with syntax highlighting */
const SoftwareVisual = ({ ac }: { ac: string }) => (
  <div className="absolute inset-0 flex flex-col p-5 gap-3">
    {/* Editor window */}
    <div
      className="flex-1 rounded-xl border overflow-hidden flex flex-col"
      style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(2,8,23,0.72)" }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.03)" }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28C840" }} />
        <div className="ml-4 flex gap-1">
          <span className="text-[10px] px-2 py-0.5 rounded font-mono" style={{ color: ac, backgroundColor: `${ac}18`, border: `1px solid ${ac}28` }}>
            App.tsx
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono text-white/25">api.ts</span>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono text-white/20">globals.css</span>
        </div>
      </div>

      {/* Code */}
      <div className="p-4 font-mono text-[11px] leading-[1.75] flex-1 overflow-hidden select-none">
        <div>
          <span style={{ color: "#C792EA" }}>import</span>
          <span className="text-white/55">{" { "}</span>
          <span style={{ color: ac }}>useState</span>
          <span className="text-white/55">{", useEffect }"}</span>
          <span style={{ color: "#C792EA" }}>{" from "}</span>
          <span style={{ color: "#C3E88D" }}>&apos;react&apos;</span>
        </div>
        <div>
          <span style={{ color: "#C792EA" }}>import</span>
          <span className="text-white/55">{" { "}</span>
          <span style={{ color: ac }}>SplineScene</span>
          <span className="text-white/55">{" }"}</span>
          <span style={{ color: "#C792EA" }}>{" from "}</span>
          <span style={{ color: "#C3E88D" }}>&apos;@/components/ui&apos;</span>
        </div>
        <div className="mt-2 text-white/20 text-[9px]">── 12 lines ──</div>
        <div className="mt-2">
          <span style={{ color: "#82AAFF" }}>export const </span>
          <span style={{ color: ac }}>Dashboard</span>
          <span className="text-white/55">{" = () => {"}</span>
        </div>
        <div className="ml-4">
          <span style={{ color: "#82AAFF" }}>const </span>
          <span className="text-white/70">[data, setData] = </span>
          <span style={{ color: ac }}>useState</span>
          <span className="text-white/55">&lt;Metric[]&gt;([])</span>
        </div>
        <div className="ml-4 mt-1">
          <span style={{ color: "#C792EA" }}>return </span>
          <span className="text-white/55">(</span>
        </div>
        <div className="ml-8">
          <span style={{ color: ac }}>&lt;main</span>
          <span style={{ color: "#FFCB8B" }}>{" className"}</span>
          <span className="text-white/55">{"="}</span>
          <span style={{ color: "#C3E88D" }}>&quot;grid grid-cols-3 gap-6&quot;</span>
          <span style={{ color: ac }}>{" >"}</span>
        </div>
        <div className="ml-12 text-white/25 text-[9px]">{"{ /* metric cards */ }"}</div>
        <div className="ml-8">
          <span style={{ color: ac }}>&lt;/main&gt;</span>
        </div>
        <div className="ml-4 text-white/55">)</div>
        <div className="text-white/55">{"}"}</div>
        <motion.span
          className="inline-block w-[2px] h-[13px] ml-0.5 align-text-bottom rounded-sm"
          style={{ backgroundColor: ac }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1.0, repeat: Infinity, ease: "linear", times: [0, 0.45, 0.5, 1] }}
        />
      </div>
    </div>

    {/* Tech stack */}
    <div className="flex flex-wrap gap-1.5 shrink-0">
      {["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"].map((t) => (
        <span
          key={t}
          className="text-[10px] px-2.5 py-1 rounded-full font-mono font-medium"
          style={{ color: ac, backgroundColor: `${ac}12`, border: `1px solid ${ac}28` }}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

/** 1 — Automation pipeline with animated data flow */
const AutomationVisual = ({ ac }: { ac: string }) => {
  const steps = [
    { icon: FileText, label: "Form Submission", sub: "Data captured" },
    { icon: Zap,      label: "Trigger Fired",   sub: "Event dispatched" },
    { icon: RefreshCw, label: "API Processing",  sub: "Logic executes" },
    { icon: MailCheck, label: "Report Delivered", sub: "Auto-sent to inbox" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-7 py-6">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <div key={step.label}>
            {/* Step row */}
            <div className="flex items-center gap-3.5">
              {/* Icon circle */}
              <div
                className="relative flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${ac}14`, border: `1px solid ${ac}35` }}
              >
                <Icon size={18} style={{ color: ac }} />
                {/* Step badge */}
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold leading-none"
                  style={{ backgroundColor: ac, color: "#020817" }}
                >
                  {i + 1}
                </span>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">{step.label}</div>
                <div className="text-[11px] text-white/40 mt-0.5">{step.sub}</div>
              </div>

              {/* Done check */}
              <CheckCircle2 size={15} className="flex-shrink-0" style={{ color: `${ac}70` }} />
            </div>

            {/* Animated connector */}
            {i < steps.length - 1 && (
              <div className="relative ml-[21px] w-0.5 h-6 my-0.5" style={{ backgroundColor: `${ac}20` }}>
                <motion.div
                  className="absolute top-0 left-0 w-full rounded-full"
                  style={{ height: 7, backgroundColor: ac }}
                  animate={{ top: ["0%", "calc(100% - 7px)"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.4, times: [0, 0.15, 0.85, 1] }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/** 2 — AI chat interface with typing indicator */
const AIVisual = ({ ac }: { ac: string }) => {
  const messages = [
    { role: "user", text: "How can AI improve my business workflows?" },
    { role: "ai",   text: "I can automate repetitive tasks, analyze patterns in your data, and surface insights instantly." },
    { role: "user", text: "Can you integrate with our existing tools?" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col p-5 gap-3">
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border shrink-0"
        style={{ borderColor: `${ac}22`, backgroundColor: `${ac}0C` }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${ac}22`, border: `1px solid ${ac}40` }}
        >
          <BrainCircuit size={14} style={{ color: ac }} />
        </div>
        <span className="text-sm font-semibold text-white">AI Assistant</span>
        <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full ml-auto" style={{ color: ac, backgroundColor: `${ac}18`, border: `1px solid ${ac}30` }}>
          GPT-4o
        </span>
        <span className="flex items-center gap-1 text-[10px] text-green-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col gap-2.5 overflow-hidden">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25 }}
          >
            <div
              className="max-w-[88%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed"
              style={
                msg.role === "ai"
                  ? { backgroundColor: `${ac}16`, border: `1px solid ${ac}22`, color: "rgba(255,255,255,0.82)" }
                  : { backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.60)" }
              }
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* Typing dots */}
        <div className="flex justify-start">
          <div
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl"
            style={{ backgroundColor: `${ac}12`, border: `1px solid ${ac}20` }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: ac }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.22 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl border shrink-0"
        style={{ borderColor: `${ac}22`, backgroundColor: "rgba(0,0,0,0.35)" }}
      >
        <span className="text-[11px] text-white/22 flex-1">Ask anything...</span>
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: ac }}
        >
          <ArrowRight size={11} style={{ color: "#020817" }} />
        </div>
      </div>
    </div>
  );
};

/** 3 — Live event dashboard with real-time stats */
const EventVisual = ({ ac }: { ac: string }) => (
  <div className="absolute inset-0 flex flex-col p-5 gap-4">
    {/* Event header */}
    <div className="flex items-start justify-between shrink-0">
      <div>
        <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: ac }}>
          Encuentro Mundial 2025
        </div>
        <div className="text-white font-heading font-bold text-lg leading-tight mt-0.5">
          Technology Conference
        </div>
        <div className="text-[11px] text-white/40 mt-0.5">March 15–17 · Mexico City</div>
      </div>
      <span
        className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full shrink-0 mt-0.5"
        style={{ color: ac, backgroundColor: `${ac}18`, border: `1px solid ${ac}35` }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: ac }} />
        Live
      </span>
    </div>

    {/* Stats cards */}
    <div className="grid grid-cols-3 gap-2.5 shrink-0">
      {[
        { Icon: Users,  value: "1,247", label: "Registered" },
        { Icon: Mic,    value: "28",    label: "Speakers" },
        { Icon: Award,  value: "892",   label: "Certificates" },
      ].map(({ Icon, value, label }) => (
        <div
          key={label}
          className="rounded-xl p-3"
          style={{ backgroundColor: `${ac}0E`, border: `1px solid ${ac}22` }}
        >
          <Icon size={14} style={{ color: ac }} />
          <div className="text-white font-bold text-xl mt-1.5 font-heading">{value}</div>
          <div className="text-[10px] text-white/40 mt-0.5">{label}</div>
        </div>
      ))}
    </div>

    {/* Capacity bar */}
    <div className="shrink-0">
      <div className="flex justify-between items-center text-[10px] mb-1.5">
        <span className="text-white/45">Venue Capacity</span>
        <span className="font-semibold" style={{ color: ac }}>73% · 1,247 / 1,700</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: ac }}
          initial={{ width: "0%" }}
          animate={{ width: "73%" }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>

    {/* Feature tags */}
    <div className="flex flex-wrap gap-1.5 mt-auto">
      {["QR Check-in", "Digital Agenda", "Live Streaming", "Auto Certificates"].map((f) => (
        <span
          key={f}
          className="flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full"
          style={{ color: ac, backgroundColor: `${ac}10`, border: `1px solid ${ac}22` }}
        >
          <CheckCircle2 size={9} />
          {f}
        </span>
      ))}
    </div>
  </div>
);

/** 4 — Technology stack / architecture diagram */
const ConsultingVisual = ({ ac }: { ac: string }) => {
  const layers = [
    { icon: Monitor,  label: "Frontend",    tags: ["React", "Next.js", "TypeScript"] },
    { icon: Server,   label: "Backend API", tags: ["Node.js", "REST", "GraphQL"] },
    { icon: Database, label: "Data Layer",  tags: ["PostgreSQL", "Redis", "S3"] },
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-6 py-5 gap-0">
      {/* Title */}
      <div className="text-center mb-5 shrink-0">
        <span className="text-[9px] font-bold tracking-[0.28em] uppercase" style={{ color: `${ac}90` }}>
          System Architecture
        </span>
      </div>

      {layers.map((layer, i) => {
        const Icon = layer.icon;
        return (
          <div key={layer.label}>
            {/* Layer card */}
            <div
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl"
              style={{ backgroundColor: `${ac}0E`, border: `1px solid ${ac}28` }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${ac}1C`, border: `1px solid ${ac}35` }}
              >
                <Icon size={17} style={{ color: ac }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">{layer.label}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {layer.tags.map((t) => (
                    <span key={t} className="text-[9px] px-1.5 py-0.5 rounded text-white/38 bg-white/5 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* status dot */}
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: ac, boxShadow: `0 0 6px ${ac}` }} />
            </div>

            {/* Animated data flow connector */}
            {i < layers.length - 1 && (
              <div className="flex justify-center">
                <div className="relative w-0.5 h-7" style={{ backgroundColor: `${ac}22` }}>
                  <motion.div
                    className="absolute left-0 w-full rounded-full"
                    style={{ height: 8, backgroundColor: ac, boxShadow: `0 0 4px ${ac}` }}
                    animate={{ top: ["0%", "calc(100% - 8px)"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: i * 0.55, times: [0, 0.1, 0.9, 1] }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom tags */}
      <div className="flex flex-wrap gap-1.5 justify-center mt-5 shrink-0">
        {["Planning", "Architecture", "Code Review", "Optimization"].map((t) => (
          <span
            key={t}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{ color: `${ac}80`, border: `1px solid ${ac}22` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

/** Map: service index → bespoke visual component */
const VISUALS = [SoftwareVisual, AutomationVisual, AIVisual, EventVisual, ConsultingVisual];

// ── Right-side animated card ──────────────────────────────────────────────
const ServiceVisual = ({ service, index }: { service: Service; index: number }) => {
  const Visual = VISUALS[index] ?? VISUALS[0];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 18, scale: 0.982 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, scale: 0.982 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/8"
        style={{ background: service.visualBg, height: "clamp(400px, 55vh, 520px)" }}
      >
        {/* Orb 1 */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[90px] opacity-28 pointer-events-none"
          style={{ backgroundColor: service.orb1 }}
        />
        {/* Orb 2 */}
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-[70px] opacity-20 pointer-events-none"
          style={{ backgroundColor: service.orb2 }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.055] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Bespoke visual content */}
        <Visual ac={service.accentColor} />
      </motion.div>
    </AnimatePresence>
  );
};

// ── Left-side service item ────────────────────────────────────────────────
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
      <div
        className="lg:hidden mb-7 h-[200px] rounded-xl overflow-hidden relative border border-white/8"
        style={{ background: service.visualBg }}
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-[50px] opacity-35" style={{ backgroundColor: service.orb1 }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center" style={{ color: service.accentColor }}>
            <Icon size={28} />
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 px-6">
            {service.offerings.slice(0, 3).map((o) => (
              <span key={o} className="text-[10px] px-2 py-1 rounded-full text-white/60 bg-white/5" style={{ border: `1px solid ${service.accentColor}20` }}>
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${service.accentColor}18`, border: `1px solid ${service.accentColor}30`, color: service.accentColor }}
      >
        <Icon size={18} />
      </div>

      {/* Badge */}
      {service.badge && (
        <span
          className="mb-3 inline-block text-[9px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full border"
          style={{ color: service.accentColor, backgroundColor: `${service.accentColor}18`, borderColor: `${service.accentColor}40` }}
        >
          {service.badge}
        </span>
      )}

      <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-3">
        {service.title}
      </h3>
      <p className="text-secondary-text text-base leading-relaxed mb-6 max-w-md">
        {service.description}
      </p>
      <a
        href="#contact"
        className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 group/link"
        style={{ color: service.accentColor }}
      >
        Get started
        <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1" />
      </a>
    </div>
  );
};

// ── Main section ──────────────────────────────────────────────────────────
export const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onActive = useCallback((i: number) => setActiveIndex(i), []);

  return (
    <section id="services" className="relative py-32 bg-secondary-background/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 xl:px-20">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-glow-blue font-body font-medium">
            What I offer
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-4 leading-tight">
            Technology tailored
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-glow-blue to-white">
              to your goals
            </span>
          </h2>
          <p className="text-secondary-text text-base max-w-xs leading-relaxed">
            From software to intelligent systems — built to help you grow.
          </p>
        </motion.div>

        {/*
          Grid layout:
          - No items-start so right column stretches to left column height.
          - Left: lg:self-start → natural height drives grid row.
          - Right: default stretch → as tall as left, sticky inner panel works.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20">

          {/* LEFT — service items */}
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

          {/* RIGHT — sticky visual panel */}
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
