"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Number of branch paths: 2 about + 5 services + 4 projects
const BRANCH_COUNT = 11;

// Rounds to 1 decimal for clean SVG output
function f(n: number): string {
  return (Math.round(n * 10) / 10).toString();
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Smooth cubic bezier path through a series of [x, y] waypoints.
// Each segment uses a vertical-tangent control point for organic flow.
function buildSpine(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const dy = y1 - y0;
    // Tangent control points: leave and arrive vertically for natural flow
    d += ` C ${f(x0)},${f(y0 + dy * 0.48)} ${f(x1)},${f(y1 - dy * 0.48)} ${f(x1)},${f(y1)}`;
  }
  return d;
}

// Organic branch: departs from `from`, arcs out to `leaf`, then returns to `end`.
// Looks like a root or neural offshoot.
function buildBranch(
  from: [number, number],
  leaf: [number, number],
  end: [number, number]
): string {
  const c1y = lerp(from[1], leaf[1], 0.55);
  const c2y = lerp(leaf[1], end[1], 0.45);
  return (
    `M ${f(from[0])},${f(from[1])} ` +
    `C ${f(from[0])},${f(c1y)} ${f(leaf[0])},${f(c1y)} ${f(leaf[0])},${f(leaf[1])} ` +
    `C ${f(leaf[0])},${f(c2y)} ${f(end[0])},${f(c2y)} ${f(end[0])},${f(end[1])}`
  );
}

// Walks up the offset parent chain for an absolute-page-position value.
// Robust across any DOM nesting (header, wrapper divs, etc.)
function absoluteTop(el: HTMLElement): number {
  let top = 0;
  let cur: HTMLElement | null = el;
  while (cur) {
    top += cur.offsetTop;
    cur = cur.offsetParent as HTMLElement | null;
  }
  return top;
}

export const ScrollLinePath = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const mainRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const branchRefs = useRef<(SVGPathElement | null)[]>([]);
  const gsapCtxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const init = () => {
      const svg = svgRef.current;
      const mainPath = mainRef.current;
      const glowPath = glowRef.current;
      const dot = dotRef.current;
      if (!svg || !mainPath || !glowPath || !dot) return;

      // Tear down previous animations before rebuilding
      gsapCtxRef.current?.revert();
      gsapCtxRef.current = null;

      const W = window.innerWidth;
      const H = document.body.scrollHeight;

      // Size the SVG to cover the entire document
      svg.style.width = `${W}px`;
      svg.style.height = `${H}px`;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

      // Collect section elements (direct children of <main> that are <section>)
      const sectionEls = Array.from(
        document.querySelectorAll<HTMLElement>("main > section")
      );
      if (sectionEls.length < 5) return;

      const [heroEl, aboutEl, servicesEl, projectsEl, contactEl] = sectionEls;

      const sec = (el: HTMLElement) => {
        const top = absoluteTop(el);
        const h = el.offsetHeight;
        return { el, top, height: h, bot: top + h, mid: top + h / 2 };
      };

      const hero = sec(heroEl);
      const about = sec(aboutEl);
      const services = sec(servicesEl);
      const projects = sec(projectsEl);
      const contact = sec(contactEl);

      // ── Main spine ──────────────────────────────────────────────────────
      // Starts at the horizontal and vertical center of the hero section.
      // Winds through the page with organic S-curves.

      const cx = W * 0.40;           // Starting x — center-left of hero
      const sw = Math.min(W * 0.10, 120); // Lateral swing amplitude

      const spine: [number, number][] = [
        // Hero: dot rests here on load
        [cx, hero.mid],

        // Drift right as we leave the hero
        [cx + sw * 0.7, hero.bot - hero.height * 0.08],

        // About: enter left, arc through the section
        [cx - sw * 0.9, about.top + about.height * 0.28],
        [cx + sw * 0.65, about.mid + 40],
        [cx - sw * 0.25, about.bot - 90],

        // Services: center entry, wander left
        [cx + sw * 0.1, services.top + 85],
        [cx - sw * 1.05, services.top + services.height * 0.38],
        [cx + sw * 0.55, services.mid + 30],
        [cx - sw * 0.15, services.bot - 85],

        // Projects: enter with slight rightward lean, arc
        [cx + sw * 0.35, projects.top + 85],
        [cx + sw * 1.0, projects.top + projects.height * 0.32],
        [cx - sw * 0.75, projects.mid + 20],
        [cx + sw * 0.2, projects.bot - 85],

        // Contact: all paths converge to page center
        [W * 0.50, contact.top + 110],
        [W * 0.50, contact.mid],
        [W * 0.50, contact.bot - 90],
      ];

      const spineD = buildSpine(spine);
      mainPath.setAttribute("d", spineD);
      glowPath.setAttribute("d", spineD);

      // ── Branches ─────────────────────────────────────────────────────────
      // Two about branches, five service branches, four project branches.

      const branches: string[] = [
        // About — left offshoot
        buildBranch(
          [cx - sw * 0.4, about.top + about.height * 0.22],
          [W * 0.10, about.mid - 55],
          [cx - sw * 0.1, about.mid + 175]
        ),
        // About — right offshoot
        buildBranch(
          [cx + sw * 0.3, about.top + about.height * 0.18],
          [W * 0.68, about.mid + 35],
          [cx + sw * 0.5, about.mid + 195]
        ),

        // Services — five branches, one per service card
        ...[0.09, 0.27, 0.50, 0.73, 0.91].map((xPct) =>
          buildBranch(
            [cx - sw * 0.2, services.top + 68],
            [W * xPct, services.top + services.height * 0.46],
            [cx + sw * 0.15, services.bot - 190]
          )
        ),

        // Projects — four directional branches creating a network feel
        buildBranch(
          [cx + sw * 0.55, projects.top + 68],
          [W * 0.12, projects.top + projects.height * 0.36],
          [cx - sw * 0.3, projects.bot - 185]
        ),
        buildBranch(
          [cx + sw * 0.65, projects.top + 90],
          [W * 0.82, projects.top + projects.height * 0.28],
          [cx + sw * 0.15, projects.bot - 155]
        ),
        buildBranch(
          [cx + sw * 0.4, projects.mid - 65],
          [W * 0.18, projects.mid + 95],
          [cx - sw * 0.2, projects.bot - 125]
        ),
        buildBranch(
          [cx + sw * 0.3, projects.mid - 45],
          [W * 0.76, projects.mid + 115],
          [cx + sw * 0.25, projects.bot - 105]
        ),
      ];

      branches.forEach((d, i) => {
        branchRefs.current[i]?.setAttribute("d", d);
      });

      // ── GSAP Animations ─────────────────────────────────────────────────
      gsapCtxRef.current = gsap.context(() => {
        // Main spine draw — synced to full-page scroll
        const mainLen = mainPath.getTotalLength();
        gsap.set([mainPath, glowPath], {
          strokeDasharray: mainLen,
          strokeDashoffset: mainLen,
        });

        gsap.to([mainPath, glowPath], {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 1.5,
          },
        });

        // Dot follows the leading edge of the drawing line
        ScrollTrigger.create({
          start: 0,
          end: "max",
          scrub: 1.5,
          onUpdate: (self) => {
            const pt = mainPath.getPointAtLength(self.progress * mainLen);
            gsap.set(dot, { attr: { cx: pt.x, cy: pt.y } });
          },
        });

        // Gentle dot pulse (only animates r and opacity, independent of position)
        gsap.to(dot, {
          attr: { r: 7 },
          opacity: 0.65,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Branch animations: triggered as each section enters the viewport
        const branchGroups: {
          indices: number[];
          sec: ReturnType<typeof sec>;
        }[] = [
          { indices: [0, 1], sec: about },
          { indices: [2, 3, 4, 5, 6], sec: services },
          { indices: [7, 8, 9, 10], sec: projects },
        ];

        branchGroups.forEach(({ indices, sec: s }) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: s.el,
              start: "top 75%",
              end: "bottom 25%",
              scrub: 1.5,
            },
          });

          indices.forEach((idx, i) => {
            const bEl = branchRefs.current[idx];
            if (!bEl) return;
            const bLen = bEl.getTotalLength();
            gsap.set(bEl, {
              strokeDasharray: bLen,
              strokeDashoffset: bLen,
            });
            // Small stagger within the section's scroll range
            tl.to(bEl, { strokeDashoffset: 0, ease: "none" }, i * 0.12);
          });
        });
      });
    };

    // Delay init slightly to ensure all section heights are settled
    const timer = setTimeout(init, 200);
    window.addEventListener("resize", init);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", init);
      gsapCtxRef.current?.revert();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute top-0 left-0 pointer-events-none hidden md:block"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <defs>
        {/* Subtle glow filter for the line */}
        <filter id="eprs-line-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Stronger glow for the leading dot */}
        <filter id="eprs-dot-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Branch paths — drawn per-section via ScrollTrigger */}
      {Array.from({ length: BRANCH_COUNT }).map((_, i) => (
        <path
          key={`branch-${i}`}
          ref={(el) => {
            branchRefs.current[i] = el;
          }}
          fill="none"
          stroke="#4C8DFF"
          strokeWidth={i < 2 ? "2" : "1.5"}
          strokeLinecap="round"
          opacity="0.60"
          filter="url(#eprs-line-glow)"
        />
      ))}

      {/* Wide blurred glow behind the main spine */}
      <path
        ref={glowRef}
        fill="none"
        stroke="#4C8DFF"
        strokeWidth="20"
        strokeLinecap="round"
        opacity="0.28"
        filter="url(#eprs-line-glow)"
      />

      {/* Crisp main spine */}
      <path
        ref={mainRef}
        fill="none"
        stroke="#4C8DFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="1"
      />

      {/* Leading glowing dot — positioned off-screen initially */}
      <circle
        ref={dotRef}
        r="5"
        cx="-100"
        cy="-100"
        fill="white"
        opacity="0.92"
        filter="url(#eprs-dot-glow)"
      />
    </svg>
  );
};
