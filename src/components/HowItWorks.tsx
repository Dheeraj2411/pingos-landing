"use client";

import { motion } from "framer-motion";
import { Plug, Workflow, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Plug,
    title: "Connect Your Channels",
    description:
      "Link your WhatsApp Business API, email provider, and SMS gateway in under 5 minutes. No engineering team required.",
    detail: "WhatsApp • Email • SMS • Instagram",
  },
  {
    number: "02",
    icon: Workflow,
    title: "Build Automations",
    description:
      "Design visual workflows with our drag-and-drop builder. Set triggers, conditions, and actions to automate every conversation.",
    detail: "Visual Builder • If/Else Logic • Templates",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch & Scale",
    description:
      "Go live in minutes. Monitor performance analytics, optimize campaigns, and scale your messaging as your business grows.",
    detail: "Real-time Analytics • A/B Testing • Auto-Scale",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-20">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-radial-glow-bottom opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-primary-light uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text leading-tight">
            Up and Running in Minutes
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-text-secondary text-lg">
            Three simple steps to transform your customer communication.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-border-subtle to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <div className="glass-card glass-card-hover p-8 text-center h-full flex flex-col items-center">
                  {/* Step Number */}
                  <div className="text-5xl font-black text-primary/10 mb-4 font-mono">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/15 to-accent/15 flex items-center justify-center mb-5 border border-primary/10">
                    <step.icon className="w-6 h-6 text-primary-light" />
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 grow">
                    {step.description}
                  </p>

                  {/* Tags */}
                  <div className="text-xs text-text-muted font-mono tracking-wide">
                    {step.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
