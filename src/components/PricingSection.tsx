"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Zap, Crown } from "lucide-react";
import ContactFormModal from "./ContactFormModal";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for solopreneurs and small teams testing the platform.",
    icon: Zap,
    tier: "free",
    features: [
      {
        text: "Single Account Access",
        included: true,
      },
      {
        text: "500 Contacts",
        included: true,
      },
      {
        text: "~1,000 Messages/month",
        included: true,
      },
      {
        text: "Basic Shared Inbox",
        included: true,
      },
      {
        text: "Basic Keyword Auto-replies",
        included: true,
      },
      {
        text: "Standard Contact Management",
        included: true,
      },
      {
        text: "Single Broadcast Messages",
        included: true,
      },
      {
        text: "'Powered by PingOS' Watermark",
        included: true,
      },
      {
        text: "Community & Documentation",
        included: true,
      },
      {
        text: "Visual Bot Builder",
        included: false,
      },
      {
        text: "Drip Campaigns & CTWA Ads",
        included: false,
      },
      {
        text: "Custom Fields & Segmentation",
        included: false,
      },
      {
        text: "Priority Support",
        included: false,
      },
    ],
    cta: "Start Free",
    ctaUrl: "#",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "The revenue driver for growing sales teams and agencies.",
    icon: Sparkles,
    tier: "pro",
    features: [
      {
        text: "Single Account Access",
        included: true,
      },
      {
        text: "10,000 Contacts",
        included: true,
      },
      {
        text: "~50,000 Messages/month",
        included: true,
      },
      {
        text: "Advanced Shared Inbox",
        included: true,
      },
      {
        text: "Team Notes & Tagging",
        included: true,
      },
      {
        text: "Visual ReactFlow Bot Builder",
        included: true,
      },
      {
        text: "Custom Contact Attributes",
        included: true,
      },
      {
        text: "Multi-step Drip Campaigns",
        included: true,
      },
      {
        text: "Click-to-WhatsApp (CTWA) Ads",
        included: true,
      },
      {
        text: "Remove PingOS Branding",
        included: true,
      },
      {
        text: "Priority Email Support (24h SLA)",
        included: true,
      },
      {
        text: "Custom Webhooks",
        included: true,
      },
      {
        text: "API Access",
        included: false,
      },
    ],
    cta: "Start Free Trial",
    ctaUrl: "#",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/mo",
    description: "Unlimited scale with dedicated support for large enterprises.",
    icon: Crown,
    tier: "enterprise",
    features: [
      {
        text: "Single Account Access",
        included: true,
      },
      {
        text: "Unlimited Contacts",
        included: true,
      },
      {
        text: "Custom Message Volume",
        included: true,
      },
      {
        text: "Advanced Inbox Management",
        included: true,
      },
      {
        text: "Visual ReactFlow Bot Builder",
        included: true,
      },
      {
        text: "All Pro Features Included",
        included: true,
      },
      {
        text: "Custom Webhooks & API Access",
        included: true,
      },
      {
        text: "Salesforce Integration",
        included: true,
      },
      {
        text: "Custom SLA & 24/7 Support",
        included: true,
      },
      {
        text: "Dedicated Account Manager",
        included: true,
      },
      {
        text: "Priority Implementation",
        included: true,
      },
      {
        text: "Custom Branding",
        included: true,
      },
      {
        text: "Dedicated IP (Optional)",
        included: true,
      },
    ],
    cta: "Contact Sales",
    ctaUrl: "#",
    highlight: false,
  },
];

export default function PricingSection() {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<
    "starter" | "pro" | "enterprise" | undefined
  >(undefined);

  const handleContactClick = (plan: "starter" | "pro" | "enterprise") => {
    setSelectedPlan(plan);
    setContactFormOpen(true);
  };

  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-radial-glow opacity-30" />
      <div className="absolute inset-0 bg-radial-glow-bottom opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-surface-glass border border-border-subtle text-xs font-semibold text-accent-green mb-4">
            Simple, Transparent Pricing
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="gradient-text-hero">Choose Your Plan</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-text-secondary text-lg leading-relaxed">
            Start free and scale as you grow. No hidden fees, no surprises. Upgrade, downgrade, or cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative h-full group ${
                  plan.highlight ? "lg:scale-105 lg:z-10" : ""
                }`}
              >
                {/* Glow Effect for Popular */}
                {plan.highlight && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/30 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                )}

                {/* Popular Badge */}
                {plan.highlight && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary via-primary/80 to-accent text-white text-xs font-bold shadow-xl shadow-primary/40">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </div>
                  </motion.div>
                )}

                <div
                  className={`relative h-full rounded-3xl backdrop-blur-xl transition-all duration-500 overflow-hidden ${
                    plan.highlight
                      ? "bg-gradient-to-br from-surface-card/80 to-primary/5 border border-primary/40 shadow-2xl shadow-primary/20"
                      : "glass-card hover:bg-surface-card/60 hover:border-primary/20"
                  }`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 opacity-40 ${
                      plan.highlight
                        ? "bg-gradient-to-br from-primary/20 to-transparent"
                        : "bg-none"
                    }`}
                  />

                  <div className="relative p-8 sm:p-10 h-full flex flex-col">
                    {/* Icon & Title */}
                    <div className="mb-8">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                          plan.highlight
                            ? "bg-gradient-to-br from-primary to-accent text-white"
                            : "bg-surface-elevated text-primary"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-text-primary">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-text-muted mt-2">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-text-muted">
                            {plan.period}
                          </span>
                        )}
                      </div>
                      {plan.tier === "free" && (
                        <p className="text-xs text-accent-green mt-2">
                          Forever free, no credit card required
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleContactClick(plan.tier as "starter" | "pro" | "enterprise")}
                      className={`w-full mb-8 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                        plan.highlight
                          ? "bg-gradient-to-r from-primary via-primary to-accent text-white shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 hover:-translate-y-0.5"
                          : "bg-surface-elevated text-text-primary border border-border-subtle hover:border-primary/50 hover:bg-surface-card hover:-translate-y-0.5"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Features List */}
                    <div className="space-y-4 flex-1">
                      {plan.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          {feature.included ? (
                            <Check className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-5 h-5 rounded border border-border-subtle shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-sm ${
                              feature.included
                                ? "text-text-secondary"
                                : "text-text-muted line-through opacity-50"
                            }`}
                          >
                            {feature.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-text-muted text-sm">
            All plans include WhatsApp Business API integration.{" "}
            <a href="#" className="text-accent hover:text-accent/80 transition-colors">
              Meta API fees
            </a>{" "}
            are billed separately based on your usage.
          </p>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={contactFormOpen}
        onClose={() => setContactFormOpen(false)}
        planType={selectedPlan}
      />
    </section>
  );
}
