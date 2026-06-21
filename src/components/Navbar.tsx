"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CTAPrimaryButton } from "@/components/ui/CTAPrimaryButton";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Intersection Observer to dynamically highlight active nav link
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const matchingLink = NAV_LINKS.find((link) => link.href === `#${id}`);
          if (matchingLink) {
            setActive(matchingLink.label);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_LINKS.forEach((link) => {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNav = (e: MouseEvent<HTMLElement>, href: string, label: string) => {
    e.preventDefault();
    setActive(label);
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[100]"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 3.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="mx-3 sm:mx-4 md:mx-8 mt-3 rounded-2xl px-4 sm:px-5 py-3 flex items-center gap-4 md:gap-6 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(2, 8, 23, 0.75)"
            : "rgba(2, 8, 23, 0.45)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: "1px solid rgba(76, 141, 255, 0.10)",
          boxShadow: scrolled
            ? "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "0 2px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero", "Home")}
          className="flex items-center gap-2 shrink-0 group"
        >
          {/* Glow dot icon */}
          <span
            className="w-2 h-2 rounded-full bg-glow-blue block transition-all duration-300 group-hover:scale-150"
            style={{ boxShadow: "0 0 8px 2px #4C8DFF" }}
          />
          <span className="text-xl sm:text-2xl font-heading font-bold text-white tracking-wide">
            EPRS
          </span>
        </a>

        {/* Nav links — centered with flex-1 (desktop only) */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href, link.label)}
              className="relative px-3 lg:px-4 py-1.5 text-sm font-body transition-colors duration-200 rounded-lg group"
              style={{
                color: active === link.label ? "#FFFFFF" : "#94A3B8",
              }}
            >
              {active === link.label && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "rgba(76, 141, 255, 0.12)",
                    border: "1px solid rgba(76, 141, 255, 0.20)",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 group-hover:text-white transition-colors duration-200">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        {/* CTA (desktop only) */}
        <CTAPrimaryButton
          href="#contact"
          onClick={(e) => handleNav(e, "#contact", "Contact")}
          className="shrink-0 hidden md:flex"
        >
          Let&apos;s Talk
        </CTAPrimaryButton>

        {/* Mobile menu — hamburger */}
        <button
          className="md:hidden ml-auto flex flex-col gap-1.5 p-2 relative z-[110]"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <motion.span
            className="block w-5 h-px bg-white origin-center"
            animate={mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block w-5 h-px bg-white"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-3 h-px bg-white origin-center"
            animate={mobileOpen ? { rotate: -45, y: -3.5, width: 20 } : { rotate: 0, y: 0, width: 12 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </div>

      {/* ── Mobile fullscreen menu ────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] md:hidden flex flex-col items-center justify-center gap-6"
            style={{
              background: "rgba(2, 8, 23, 0.96)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href, link.label)}
                className="text-2xl sm:text-3xl font-heading font-semibold transition-colors duration-200"
                style={{
                  color: active === link.label ? "#4C8DFF" : "#94A3B8",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="mt-4"
            >
              <CTAPrimaryButton
                href="#contact"
                onClick={(e) => handleNav(e, "#contact", "Contact")}
              >
                Let&apos;s Talk
              </CTAPrimaryButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
