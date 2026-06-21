"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { Globe } from "lucide-react";

export const LanguageToggle = () => {
  const { locale, toggleLocale } = useI18n();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 3.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={toggleLocale}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-full px-3 py-2.5 cursor-pointer transition-all duration-300"
      style={{
        background: "rgba(2, 8, 23, 0.75)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid rgba(76, 141, 255, 0.15)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
      aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
    >
      <Globe size={16} className="text-glow-blue shrink-0" />
      <AnimatePresence mode="wait">
        <motion.span
          key={locale}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-medium text-white tracking-wide"
        >
          {locale === "en" ? "ES" : "EN"}
        </motion.span>
      </AnimatePresence>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-full mr-3 whitespace-nowrap text-xs text-secondary-text bg-background/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5"
          >
            {locale === "en" ? "Cambiar a Español" : "Switch to English"}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
