"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, Zap, Crown } from "lucide-react";
import ContactFormModal from "./ContactFormModal";

const plans = [
  {
    name: "Base",
    price: "$19/month",
    period: "",
    description: "Default plan for new workspaces with essential tools for getting started.",
    icon: Zap,
    tier: "starter",
    features: [
      { text: "Contacts: 1,000", included: true },
      { text: "Campaigns per month: 5", included: true },
      { text: "Bots: 3", included: true },
      { text: "Templates: 10", included: true },
      { text: "Auto-reply rules: 5", included: true },
      { text: "CRM Pipelines: 1", included: true },
      { text: "Lead Forms: 1", included: true },
      { text: "API Keys: 1", included: true },
      { text: "Webhooks: 2", included: true },
      { text: "Concurrent Sessions: 1", included: true },
      { text: "Premium Features: None", included: true },
      { text: "Billing Cycles: Monthly, Yearly", included: true },
    ],
    cta: "Start Free Trial",
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
      { text: "Contacts: 10,000", included: true },
      { text: "Campaigns per month: 50", included: true },
      { text: "Bots: 10", included: true },
      { text: "Templates: 100", included: true },
      { text: "Auto-reply rules: 50", included: true },
      { text: "CRM Pipelines: 5", included: true },
      { text: "Lead Forms: 5", included: true },
      { text: "API Keys: 3", included: true },
      { text: "Webhooks: 7", included: true },
      { text: "Concurrent Sessions: 2", included: true },
      { text: "Premium Features: All included", included: true },
      { text: "Billing Cycles: Monthly, Yearly", included: true },
    ],
    cta: "Request Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Unlimited usage for large-scale operations with annual enterprise terms.",
    icon: Crown,
    tier: "enterprise",
    features: [
      { text: "Contacts: Unlimited", included: true },
      { text: "Campaigns per month: Unlimited", included: true },
      { text: "Bots: Unlimited", included: true },
      { text: "Templates: Unlimited", included: true },
      { text: "Auto-reply rules: Unlimited", included: true },
      { text: "CRM Pipelines: Unlimited", included: true },
      { text: "Lead Forms: Unlimited", included: true },
      { text: "API Keys: Unlimited", included: true },
      { text: "Webhooks: Unlimited", included: true },
      { text: "Concurrent Sessions: 3", included: true },
      { text: "Premium Features: All included", included: true },
      { text: "Billing Cycles: Yearly only", included: true },
    ],
    cta: "Request Enterprise",
    highlight: false,
  },
];

export default function PricingSection() {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "pro" | "enterprise" | undefined>(undefined);

  const handleContactClick = (plan: "starter" | "pro" | "enterprise") => {
    setSelectedPlan(plan);
    setContactFormOpen(true);
  };

  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-radial-glow opacity-30" />
      <div className="absolute inset-0 bg-radial-glow-bottom opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="inline-block px-3 py-1 rounded-full bg-surface-glass border border-border-subtle text-xs font-semibold text-accent-green mb-4">
            Simple, Transparent Pricing
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="gradient-text-hero">Choose Your Plan</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-text-secondary text-lg leading-relaxed">
            Start free and scale as you grow. No hidden fees, no surprises. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`relative h-full group ${plan.highlight ? "lg:scale-105 lg:z-10" : ""}`}
              >
                {plan.highlight && (
                  <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                )}

                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary via-primary/80 to-accent text-white text-xs font-bold shadow-xl shadow-primary/40 whitespace-nowrap">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`relative h-full rounded-3xl backdrop-blur-xl transition-all duration-500 overflow-hidden ${
                    plan.highlight
                      ? "bg-linear-to-br from-surface-card/80 to-primary/5 border border-primary/40 shadow-2xl shadow-primary/20"
                      : "glass-card hover:bg-surface-card/60 hover:border-primary/20"
                  }`}
                >
                  <div
                    className={`absolute inset-0 opacity-40 ${plan.highlight ? "bg-linear-to-br from-primary/20 to-transparent" : "bg-none"}`}
                  />

                  <div className="relative p-8 sm:p-10 h-full flex flex-col">
                    <div className="mb-8">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                          plan.highlight ? "bg-linear-to-br from-primary to-accent text-white" : "bg-surface-elevated text-primary"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-text-primary">{plan.name}</h3>
                      <p className="text-sm text-text-muted mt-2">{plan.description}</p>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold bg-linear-to-r from-text-primary to-accent bg-clip-text text-transparent">
                          {plan.price}
                        </span>
                        {plan.period && <span className="text-text-muted">{plan.period}</span>}
                      </div>
                      {plan.tier === "starter" && (
                        <p className="text-xs text-accent-green mt-2">Forever free, no credit card required</p>
                      )}
                    </div>

                    <button
                      onClick={() => handleContactClick(plan.tier as "starter" | "pro" | "enterprise")}
                      className={`w-full mb-8 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                        plan.highlight
                          ? "bg-linear-to-r from-primary via-primary to-accent text-white shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 hover:-translate-y-0.5"
                          : "bg-surface-elevated text-text-primary border border-border-subtle hover:border-primary/50 hover:bg-surface-card hover:-translate-y-0.5"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="space-y-4 flex-1">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-5 h-5 rounded border border-border-subtle shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-sm ${
                              feature.included ? "text-text-secondary" : "text-text-muted line-through opacity-50"
                            }`}
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-text-muted text-sm">
            All plans include WhatsApp Business API integration. {" "}
            <Link href="/#inquiry" className="text-accent hover:text-accent/80 transition-colors">
              Meta API fees
            </Link>{" "}
            are billed separately based on your usage.
          </p>
        </div>
      </div>

      <ContactFormModal
        isOpen={contactFormOpen}
        onClose={() => setContactFormOpen(false)}
        planType={selectedPlan}
      />
    </section>
  );
}
