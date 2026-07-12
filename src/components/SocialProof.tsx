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
    <section className="relative py-16 sm:py-20 border-y border-border-subtle overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-accent/5" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-7xl mx-auto px-6"
      >
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-text-secondary text-lg">
            Trusted by teams worldwide using PingOS for WhatsApp CRM and
            business messaging
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4 group hover:bg-primary/20 transition-all border border-primary/20">
                  <Icon className="w-7 h-7 text-primary-light" />
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-base font-semibold text-text-secondary mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-text-muted">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Company Logos / Testimonial */}
        <div className="mt-16 pt-16 border-t border-border-subtle text-center">
          <p className="text-text-muted text-sm mb-6">
            Used by sales teams, marketing agencies, and enterprises worldwide
            to manage PingOS conversations at scale
          </p>
          <div className="relative flex overflow-hidden w-full py-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-8 w-max animate-marquee items-center">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 items-center shrink-0">
                  {[
                    "Acme Corp",
                    "GlobalTech",
                    "Nexus Industries",
                    "Nova Dynamics",
                    "Quantum Solutions",
                    "Stellar Innovations",
                  ].map((brand) => (
                    <span
                      key={brand}
                      className="text-2xl font-bold text-text-muted/40 uppercase tracking-widest whitespace-nowrap"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
