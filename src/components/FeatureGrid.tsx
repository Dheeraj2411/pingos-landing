"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Users,
  Megaphone,
  Inbox,
  BarChart3,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Visual Automations",
    description:
      "Build powerful workflows with a drag-and-drop builder. Trigger responses based on keywords, events, or schedules — no code needed.",
    gradient: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
    borderColor: "hover:border-yellow-500/30",
  },
  {
    icon: Users,
    title: "Lead Management",
    description:
      "Capture, score, and nurture leads automatically. Tag contacts, track lifecycle stage, and never let a hot lead slip away.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/30",
  },
  {
    icon: Megaphone,
    title: "Smart Campaigns",
    description:
      "Broadcast targeted messages across WhatsApp, SMS, and email. Schedule, A/B test, and track performance in real time.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    borderColor: "hover:border-blue-500/30",
  },
  {
    icon: Inbox,
    title: "Unified Inbox",
    description:
      "One inbox for every channel. Assign conversations, collaborate with your team, and respond faster than ever before.",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    borderColor: "hover:border-purple-500/30",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track message delivery, open rates, response times, and team performance with beautiful, actionable dashboards.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    borderColor: "hover:border-cyan-500/30",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant, end-to-end encryption, role-based access, and audit logs. Your data is safe with PingOS.",
    gradient: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-400",
    borderColor: "hover:border-rose-500/30",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary-light uppercase tracking-widest">
            Features
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text leading-tight">
            Engineered for High-Volume
            <br />
            Engagement
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-text-secondary text-lg">
            Everything you need to automate, personalize, and scale your
            customer conversations — unified in one powerful platform.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`glass-card glass-card-hover p-6 group cursor-default ${feature.borderColor}`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
