"use client";

import { motion, Variants } from "framer-motion";
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
    title: "WhatsApp Automations",
    description:
      "Build powerful WhatsApp workflows with a drag-and-drop builder. Trigger responses based on WABA keywords, media, or schedules.",
    gradient: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
    borderColor: "hover:border-yellow-500/30",
  },
  {
    icon: Users,
    title: "Official WABA CRM",
    description:
      "Official Meta-verified CRM for WhatsApp. Capture, score, and nurture leads from Click-to-WhatsApp ads automatically.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/30",
  },
  {
    icon: Megaphone,
    title: "Bulk Broadcasts",
    description:
      "Send high-volume WhatsApp broadcasts using Official WABA templates. Schedule campaigns and track read rates in real-time.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    borderColor: "hover:border-blue-500/30",
  },
  {
    icon: Inbox,
    title: "Multi-Agent Inbox",
    description:
      "One unified inbox for your entire team. Manage thousands of WhatsApp conversations with speed, tags, and assignments.",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    borderColor: "hover:border-purple-500/30",
  },
  {
    icon: BarChart3,
    title: "Messaging Analytics",
    description:
      "Deep insights into delivery rates, template performance, and response times for every WhatsApp interaction.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    borderColor: "hover:border-cyan-500/30",
  },
  {
    icon: Shield,
    title: "Meta-Verified Security",
    description:
      "Built on the Official WhatsApp Business API. SOC 2 compliant and Meta-approved for enterprise-grade data security.",
    gradient: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-400",
    borderColor: "hover:border-rose-500/30",
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
    transition: { duration: 0.5, ease: "easeOut" }
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
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
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

