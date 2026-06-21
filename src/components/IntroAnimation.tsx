"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

export const IntroAnimation = () => {
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "done">("in");
  // Null until mounted — avoids SSR/hydration mismatch on the SVG
  const [dims, setDims] = useState<{ W: number; VH: number } | null>(null);

  useEffect(() => {
    setDims({ W: window.innerWidth, VH: window.innerHeight });
    document.body.style.overflow = "hidden";

    // Sequence: letters land → hold → curtain slides → unmount
    const t1 = setTimeout(() => setPhase("hold"), 2100);
    const t2 = setTimeout(() => setPhase("out"),  2400);
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

  /*
    Why this math connects perfectly with the hero line
    ────────────────────────────────────────────────────
    The SVG is absolute top-0 left-0, height = 2 × VH.
    The path endpoint lives at (W*0.40, VH*1.5) in SVG/curtain space.

    When the curtain animates to y = -100% (slides up by exactly VH),
    every point inside moves up by VH in viewport coordinates:

        endpoint_viewport_y = VH*1.5 − VH = VH*0.5 = hero.mid  ✓
        endpoint_viewport_x = W*0.40                             ✓

    This matches ScrollLinePath's spine origin (cx = W*0.40, hero.mid)
    precisely on every screen size — no approximation.

    The outer motion.div has NO overflow-hidden so the SVG can extend
    below the viewport. Each letter wrapper keeps its own overflow-hidden
    to clip the slide-up animation within itself.
  */
  const svg = dims
    ? (() => {
        const { W, VH } = dims;

        // Path start — just below the visible content block
        // (letters + accent line + tagline ≈ 200 px below viewport centre)
        const sx = W * 0.50;
        const sy = VH * 0.50 + 200;

        // Path end — ScrollLinePath origin in curtain-local coordinates
        const ex = W * 0.40;
        const ey = VH * 1.50;

        // Smooth cubic curve: gentle left drift, no harsh bends
        const cp1x = (W * 0.484).toFixed(1);
        const cp1y = (VH * 0.85).toFixed(1);
        const cp2x = (W * 0.406).toFixed(1);
        const cp2y = (VH * 1.30).toFixed(1);

        const d = `M ${sx.toFixed(1)},${sy.toFixed(1)} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${ex.toFixed(1)},${ey.toFixed(1)}`;

        return { W, svgH: VH * 2, sx, sy, ex, ey, d };
      })()
    : null;

  return (
    <motion.div
      // No overflow-hidden — lets the SVG extend below the viewport
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background select-none"
      animate={phase === "out" ? { y: "-100%" } : { y: "0%" }}
      transition={
        phase === "out"
          ? { duration: 0.82, ease: CURTAIN_EASE }
          : { duration: 0 }
      }
    >
      {/* ── EPRS letters ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-end gap-0.5 md:gap-1">
        {"EPRS".split("").map((letter, i) => (
          // overflow-hidden on each wrapper clips the letter during its reveal
          <div key={letter + i} className="overflow-hidden pb-1">
            <motion.span
              className="block font-heading font-bold leading-none"
              style={{
                fontSize: "clamp(5rem, 17vw, 13rem)",
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
                delay: i * 0.08 + 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          </div>
        ))}
      </div>

      {/* ── Accent line ──────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 mt-5 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #4C8DFF 30%, #4C8DFF 70%, transparent)",
          boxShadow: "0 0 8px 1px rgba(76,141,255,0.5)",
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "clamp(14rem, 26vw, 36rem)", opacity: 0.9 }}
        transition={{ duration: 0.55, delay: 0.68, ease: "easeOut" }}
      />

      {/* ── Tagline ───────────────────────────────────────────────────── */}
      <motion.p
        className="relative z-10 mt-4 text-xs md:text-sm tracking-[0.38em] uppercase text-secondary-text/70 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.78, ease: "easeOut" }}
      >
        Grow to Help Others Grow
      </motion.p>

      {/* ── Connecting line SVG ───────────────────────────────────────── */}
      {/*
        Full-viewport-width, 2×VH tall. Absolute top-0 left-0 so SVG
        coordinates equal viewport coordinates for x and y.
        z-5 keeps it behind the text (z-10).
      */}
      {svg && (
        <svg
          className="absolute top-0 left-0 pointer-events-none"
          style={{ zIndex: 5 }}
          width={svg.W}
          height={svg.svgH}
          viewBox={`0 0 ${svg.W} ${svg.svgH}`}
          aria-hidden="true"
        >
          {/* Wide blurred glow layer */}
          <motion.path
            d={svg.d}
            fill="none"
            stroke="#4C8DFF"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.18 }}
            transition={{
              pathLength: { duration: 1.2, delay: 0.95, ease: "easeInOut" },
              opacity:    { duration: 0.25, delay: 0.95 },
            }}
            style={{ filter: "blur(8px)" }}
          />

          {/* Crisp spine */}
          <motion.path
            d={svg.d}
            fill="none"
            stroke="#4C8DFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{
              pathLength: { duration: 1.2, delay: 0.95, ease: "easeInOut" },
              opacity:    { duration: 0.2,  delay: 0.95 },
            }}
            style={{ filter: "drop-shadow(0 0 5px rgba(76,141,255,0.9))" }}
          />

          {/* Pulse dot — travels from under the letters to hero.mid.
              Finishes at t=2.3 s, just before the curtain slides at t=2.4 s. */}
          <motion.circle
            r="4"
            fill="white"
            initial={{ opacity: 0, cx: svg.sx, cy: svg.sy }}
            animate={{ opacity: [0, 1, 1, 0], cx: svg.ex, cy: svg.ey }}
            transition={{ duration: 0.9, delay: 1.4, ease: "easeInOut" }}
            style={{
              filter:
                "drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 12px rgba(76,141,255,0.8))",
            }}
          />
        </svg>
      )}
    </motion.div>
  );
};
