"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

// Connecting line SVG path.
// The SVG is centered at 40vw (where the ScrollLinePath spine starts in the hero).
// The path starts at x=250 (right side of the 300px SVG ≈ 50vw, under the EPRS letters)
// and curves down to x=150 (center of SVG = 40vw), matching where the hero line begins.
const LINE_PATH =
  "M 250,0 C 238,100 165,210 150,360 C 143,450 148,530 150,600";

export const IntroAnimation = () => {
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "done">("in");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // All 4 letters fully up by ~0.90s → line draws → hold → exit
    const t1 = setTimeout(() => setPhase("hold"), 2100);
    const t2 = setTimeout(() => setPhase("out"), 2400);
    const t3 = setTimeout(() => setPhase("done"), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase === "done") document.body.style.overflow = "";
  }, [phase]);

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden flex flex-col items-center justify-center bg-background select-none"
      animate={phase === "out" ? { y: "-100%" } : { y: "0%" }}
      transition={
        phase === "out"
          ? { duration: 0.82, ease: CURTAIN_EASE }
          : { duration: 0 }
      }
    >
      {/* ── EPRS letters — clean white clip reveal, no heavy glow ──── */}
      <div className="flex items-end gap-0.5 md:gap-1">
        {"EPRS".split("").map((letter, i) => (
          <div key={letter + i} className="overflow-hidden pb-1">
            <motion.span
              className="block font-heading font-bold leading-none text-white"
              style={{
                fontSize: "clamp(5rem, 17vw, 13rem)",
                // Strong top-to-bottom gradient: white → light blue → brand blue → deep navy
                // Mirrors the "Board" image style — bright at top, dark at bottom
                background:
                  "linear-gradient(175deg, #FFFFFF 0%, #B8D4FF 28%, #4C8DFF 58%, #1C5FD4 78%, #0B2A6E 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
              initial={{ y: "102%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.62,
                // Tight consecutive stagger — feels like a single motion
                delay: i * 0.08 + 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          </div>
        ))}
      </div>

      {/* ── Accent line — fades in immediately after last letter ───── */}
      <motion.div
        className="mt-5 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #4C8DFF 30%, #4C8DFF 70%, transparent)",
          boxShadow: "0 0 8px 1px rgba(76,141,255,0.5)",
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "clamp(14rem, 26vw, 36rem)", opacity: 0.9 }}
        transition={{ duration: 0.55, delay: 0.68, ease: "easeOut" }}
      />

      {/* ── Tagline ───────────────────────────────────────────────── */}
      <motion.p
        className="mt-4 text-xs md:text-sm tracking-[0.38em] uppercase text-secondary-text/70 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.78, ease: "easeOut" }}
      >
        Grow to Help Others Grow
      </motion.p>

      {/* ── Connecting SVG line ───────────────────────────────────── */}
      {/* Positioned below the content block. Draws downward and exits
          the bottom of the overlay so it appears to "connect" into the
          hero headline as the curtain slides up. */}
      {/*
        SVG centered at 40% of the screen width — this aligns with where the
        ScrollLinePath spine starts in the hero (W * 0.40). The path curves
        from x=250 (upper-right, ≈50vw/under the EPRS letters) down to x=150
        (lower-center of the SVG, ≈40vw) so they visually connect on reveal.
      */}
      <svg
        className="absolute -translate-x-1/2 pointer-events-none"
        style={{ top: "calc(50% + 160px)", left: "40%" }}
        width="300"
        height="600"
        viewBox="0 0 300 600"
        overflow="visible"
        aria-hidden="true"
      >
        {/* Wide blurred glow */}
        <motion.path
          d={LINE_PATH}
          fill="none"
          stroke="#4C8DFF"
          strokeWidth="14"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.18 }}
          transition={{
            pathLength: { duration: 1.1, delay: 0.95, ease: "easeInOut" },
            opacity: { duration: 0.25, delay: 0.95 },
          }}
          style={{ filter: "blur(6px)" }}
        />

        {/* Crisp line */}
        <motion.path
          d={LINE_PATH}
          fill="none"
          stroke="#4C8DFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.88 }}
          transition={{
            pathLength: { duration: 1.1, delay: 0.95, ease: "easeInOut" },
            opacity: { duration: 0.2, delay: 0.95 },
          }}
          style={{ filter: "drop-shadow(0 0 5px rgba(76,141,255,0.9))" }}
        />

        {/* Pulse dot — starts at top of line (250,0), fades in/out */}
        <motion.circle
          r="4"
          fill="white"
          initial={{ opacity: 0, cx: 250, cy: 0 }}
          animate={{ opacity: [0, 1, 1, 0], cx: 150, cy: 600 }}
          transition={{ duration: 1.0, delay: 2.05, ease: "easeInOut" }}
          style={{
            filter:
              "drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 12px rgba(76,141,255,0.8))",
          }}
        />
      </svg>
    </motion.div>
  );
};
