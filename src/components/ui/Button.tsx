"use client";

import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
          {
            "bg-cta-blue text-white hover:shadow-[0_0_20px_rgba(76,141,255,0.5)]":
              variant === "primary",
            "bg-secondary-background text-white hover:bg-secondary-background/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]":
              variant === "secondary",
            "border border-white/10 bg-transparent text-white hover:border-white/30 hover:bg-white/5":
              variant === "outline",
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
