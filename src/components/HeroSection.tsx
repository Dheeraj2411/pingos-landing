"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

const dynamicWords = [
  { text: "WhatsApp CRM", color: "from-emerald-300 via-teal-300 to-cyan-400" },
  { text: "Lead Generation", color: "from-rose-300 via-pink-300 to-orange-400" },
  { text: "Sales Automation", color: "from-blue-300 via-indigo-400 to-purple-400" },
  { text: "Team Collaboration", color: "from-[#ffffff] via-[#c7d2fe] to-[#22d3ee]" },
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden overflow-x-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-[15%] w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-float" />
      <div
        className="absolute bottom-20 right-[10%] w-96 h-96 bg-accent/8 rounded-full blur-[150px]"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-subtle bg-surface-glass backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-sm text-text-secondary">
            Now with WhatsApp Business API
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-[1.75rem] sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
        >
          <span className="gradient-text-hero">The AI-Powered</span>
          <br />
          <span className="relative inline-grid" style={{ gridTemplateColumns: "1fr", perspective: "1000px" }}>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={wordIndex}
                initial={{ y: 40, opacity: 0, rotateX: -90, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
                exit={{ y: -40, opacity: 0, rotateX: 90, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`bg-linear-to-r ${dynamicWords[wordIndex].color} bg-clip-text text-transparent pb-2 origin-center`}
                style={{ gridColumn: 1, gridRow: 1, transformStyle: "preserve-3d" }}
              >
                {dynamicWords[wordIndex].text}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />
          <span className="gradient-text-primary">for Modern Teams</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-sm sm:text-xl text-text-secondary leading-relaxed mb-10 px-1 wrap-break-word"
        >
          Automate conversations, run high-converting drip campaigns, and manage all your Click-to-WhatsApp ads from one unified platform. Built for teams that move fast.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#pricing" className="btn-primary text-base py-3.5! px-8!">
            Start for Free
            <ArrowRight className="w-4 h-4" />
          </a>
          <button className="btn-secondary text-base py-3.5! px-8!">
            <Play className="w-4 h-4" />
            Book a Demo
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-16"
        >
          {[
            { value: "10M+", label: "Messages sent" },
            { value: "500+", label: "Teams active" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "No code", label: "Bot builder" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 relative mx-auto w-full max-w-5xl"
        >
          <div className="absolute -inset-4 bg-linear-to-b from-primary/20 via-accent/10 to-transparent rounded-2xl blur-2xl" />
          <div className="relative glass-card rounded-2xl p-1.5 animate-pulse-glow">
            <div className="bg-surface-card rounded-xl overflow-hidden border border-border-subtle">
              {/* Mock Dashboard */}
              <div className="flex">
                {/* Sidebar */}
                <div className="hidden sm:flex w-56 border-r border-border-subtle flex-col p-4 gap-3 bg-surface-primary/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Image src="/logo.png" alt="PingOS" width={28} height={28} />
                    <span className="text-sm font-semibold">PingOS</span>
                  </div>
                  {["Inbox", "Contacts", "Campaigns", "Automations", "Analytics"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          i === 0
                            ? "bg-primary/10 text-primary-light font-medium border border-primary/20"
                            : "text-text-muted hover:text-text-secondary"
                        }`}
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>

                {/* Main Panel */}
                <div className="flex-1 p-4 sm:p-6 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">
                        Unified Inbox
                      </h3>
                      <p className="text-xs text-text-muted mt-0.5">
                        12 unread conversations
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="px-3 py-1 rounded-full bg-accent-green/10 text-accent-green text-xs font-medium border border-accent-green/20">
                        WhatsApp
                      </div>
                      <div className="px-3 py-1 rounded-full bg-primary/10 text-primary-light text-xs font-medium border border-primary/20">
                        Email
                      </div>
                    </div>
                  </div>

                  {/* Conversation List */}
                  <div className="space-y-3">
                    {[
                      {
                        name: "Priya Sharma",
                        msg: "Hi! I'd like to know about your enterprise plan...",
                        time: "2m ago",
                        unread: true,
                        channel: "WhatsApp",
                      },
                      {
                        name: "Alex Johnson",
                        msg: "Thanks for the quick response! The demo was great.",
                        time: "15m ago",
                        unread: false,
                        channel: "Email",
                      },
                      {
                        name: "Café Bloom",
                        msg: "Can we schedule the onboarding for next week?",
                        time: "1h ago",
                        unread: true,
                        channel: "WhatsApp",
                      },
                    ].map((conv) => (
                      <div
                        key={conv.name}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                          conv.unread
                            ? "bg-primary/5 border border-primary/10"
                            : "hover:bg-white/3"
                        }`}
                      >
                        <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary/30 to-accent/30 flex items-center justify-center text-sm font-semibold text-text-primary shrink-0">
                          {conv.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-text-primary">
                              {conv.name}
                            </span>
                            <span className="text-xs text-text-muted">
                              {conv.time}
                            </span>
                          </div>
                          <p className="text-xs text-text-muted truncate mt-0.5">
                            {conv.msg}
                          </p>
                        </div>
                        {conv.unread && (
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
