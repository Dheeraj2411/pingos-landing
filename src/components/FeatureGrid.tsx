"use client";

import { motion, Variants } from "framer-motion";
import { Zap, Users, Megaphone, Inbox, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "WhatsApp Automations",
    description:
      "Build workflows with a visual drag-and-drop builder.",
    gradient: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
    borderColor: "hover:border-primary/30",
  },
  {
    icon: Users,
    title: "Official WABA CRM",
    description:
      "Capture, score, and nurture leads from Click-to-WhatsApp ads automatically.",
    gradient: "from-primary-light/10 to-primary-light/5",
    iconColor: "text-primary-light",
    borderColor: "hover:border-primary-light/30",
  },
  {
    icon: Megaphone,
    title: "Bulk Broadcasts",
    description:
      "Send high-volume WhatsApp broadcasts using Official WABA templates.",
    gradient: "from-accent/10 to-accent/5",
    iconColor: "text-accent",
    borderColor: "hover:border-accent/30",
  },
  {
    icon: Inbox,
    title: "Multi-Agent Inbox",
    description:
      "One unified inbox to manage thousands of conversations with tags and assignments.",
    gradient: "from-primary-dark/10 to-primary-dark/5",
    iconColor: "text-primary-dark",
    borderColor: "hover:border-primary-dark/30",
  },
  {
    icon: BarChart3,
    title: "Messaging Analytics",
    description:
      "Deep insights into delivery rates and template performance.",
    gradient: "from-accent-green/10 to-accent-green/5",
    iconColor: "text-accent-green",
    borderColor: "hover:border-accent-green/30",
  },
  {
    icon: Shield,
    title: "Meta-Verified Security",
    description:
      "SOC 2 compliant and Meta-approved for enterprise-grade data security.",
    gradient: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
    borderColor: "hover:border-primary/30",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function FeatureGrid() {
  return (
    <section id="features" className="relative py-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary-light uppercase tracking-widest">
            Features
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className={`glass-card glass-card-hover p-6 group cursor-default ${feature.borderColor}`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:-translate-y-1 transition-transform duration-300 shadow-sm`}
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
        </motion.div>
      </div>
    </section>
  );
}
