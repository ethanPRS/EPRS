"use client";

import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { CTAPrimaryButton } from "@/components/ui/CTAPrimaryButton";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 md:py-32 flex items-center overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full blur-[140px] opacity-[0.10]"
          style={{ backgroundColor: "#1C5FD4" }}
        />
        <div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.07]"
          style={{ backgroundColor: "#4C8DFF" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 xl:px-20 relative z-10 w-full">

        {/* Two-column: form (left) + robot (right) — both start at the same top */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — header + form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section header lives here so it top-aligns with the robot */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mt-3 mb-4 leading-tight">
              Let&apos;s Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-glow-blue to-white">
                Meaningful
              </span>
            </h2>
            <p className="text-lg text-secondary-text font-light max-w-md mb-10">
              Ready to scale your business through technology? Let&apos;s
              connect and discuss your next big project.
            </p>

            <form className="space-y-5 max-w-md">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-secondary-text mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  className="w-full bg-secondary-background/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-cta-blue transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-secondary-text mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  className="w-full bg-secondary-background/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-cta-blue transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-secondary-text mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  className="w-full bg-secondary-background/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-cta-blue transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <CTAPrimaryButton className="w-full">Send Message</CTAPrimaryButton>
            </form>
          </motion.div>

          {/* RIGHT — Spline robot panel, same top alignment */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="hidden lg:flex lg:items-stretch"
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-white/10 w-full"
              style={{
                minHeight: "580px",
                background:
                  "linear-gradient(145deg, #020817 0%, #041C44 55%, #0D3B8E 100%)",
                boxShadow:
                  "0 0 80px rgba(76,141,255,0.08), inset 0 0 50px rgba(76,141,255,0.04)",
              }}
            >
              {/* Corner glow orbs */}
              <div
                className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[90px] opacity-25 pointer-events-none"
                style={{ backgroundColor: "#4C8DFF" }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full blur-[80px] opacity-15 pointer-events-none"
                style={{ backgroundColor: "#1C5FD4" }}
              />

              {/* Dot grid */}
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              <SplineScene
                scene="https://prod.spline.design/ApXbR4VkEwrFozw3/scene.splinecode"
                className="w-full h-full absolute inset-0"
              />
            </div>
          </motion.div>
        </div>

        {/* Footer tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-24 md:mt-32 text-center"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-white/80 tracking-wide">
            Grow to{" "}
            <span className="text-glow-blue font-medium">Help Others</span>{" "}
            Grow.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
