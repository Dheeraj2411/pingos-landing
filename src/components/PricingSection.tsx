"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for small teams getting started with messaging.",
    features: [
      "Up to 1,000 messages/month",
      "2 team members",
      "WhatsApp integration",
      "Basic automations",
      "Email support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Professional",
    price: "$79",
    period: "/mo",
    description: "For growing businesses that need power and flexibility.",
    features: [
      "Up to 25,000 messages/month",
      "10 team members",
      "All channel integrations",
      "Advanced automations & AI",
      "Campaign manager",
      "Analytics dashboard",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/mo",
    description: "For large teams requiring custom solutions and SLAs.",
    features: [
      "Unlimited messages",
      "Unlimited team members",
      "Custom integrations & API",
      "Dedicated account manager",
      "SSO & advanced security",
      "Custom branding",
      "99.99% uptime SLA",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-16 sm:py-20">
      <div className="absolute inset-0 bg-radial-glow opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary-light uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text leading-tight">
            Transparent Pricing
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-text-secondary text-lg">
            No hidden fees. Start free, upgrade when you&apos;re ready.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative rounded-2xl p-px ${
                plan.highlight
                  ? "bg-linear-to-b from-primary/50 via-primary/20 to-transparent"
                  : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold shadow-lg shadow-primary/30">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`rounded-2xl p-6 sm:p-8 h-full flex flex-col ${
                  plan.highlight
                    ? "bg-surface-card border border-primary/20"
                    : "glass-card"
                }`}
              >
                {/* Plan Name */}
                <h3 className="text-lg font-semibold text-text-primary">
                  {plan.name}
                </h3>
                <p className="text-sm text-text-muted mt-1 mb-5">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-text-primary">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-text-muted text-sm">
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <button
                  className={`w-full mb-6 flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Features */}
                <div className="space-y-3 grow">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2.5"
                    >
                      <Check className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
