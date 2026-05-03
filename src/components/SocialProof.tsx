"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Zap } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "500+",
    label: "Forward-thinking teams",
    description: "Trust PingOS for their WhatsApp automation",
  },
  {
    icon: TrendingUp,
    number: "10M+",
    label: "Messages sent monthly",
    description: "Through the PingOS platform",
  },
  {
    icon: Zap,
    number: "15K+",
    label: "Contacts managed",
    description: "Average per workspace",
  },
];

export default function SocialProof() {
  return (
    <section className="relative py-16 sm:py-20 border-y border-border-subtle">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-text-secondary text-lg">
            Trusted by teams worldwide
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4 group hover:from-primary/30 hover:to-accent/30 transition-all">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-base font-semibold text-text-secondary mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-text-muted">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Company Logos / Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-16 border-t border-border-subtle text-center"
        >
          <p className="text-text-muted text-sm mb-6">
            Used by sales teams, marketing agencies, and enterprises worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="text-xs font-semibold text-text-secondary tracking-widest">
              TRUSTED BY LEADING BRANDS
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
