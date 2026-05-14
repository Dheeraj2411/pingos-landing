"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import { getProductUrl } from "@/lib/product";

const dynamicWords = [
  { text: "WhatsApp CRM", color: "from-emerald-300 via-teal-300 to-cyan-400" },
  { text: "WABA Automation", color: "from-rose-300 via-pink-300 to-orange-400" },
  { text: "Lead Generation", color: "from-blue-300 via-indigo-400 to-purple-400" },
  { text: "Sales Automation", color: "from-[#ffffff] via-[#c7d2fe] to-[#22d3ee]" },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const loginUrl = getProductUrl("/login");
  const signupUrl = getProductUrl("/signup");

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const currentWord = dynamicWords[index];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden overflow-x-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Floating Orbs - Reduced blur for mobile performance */}
      <div className="absolute top-20 left-[15%] w-64 h-64 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-[80px] sm:blur-[120px] animate-float" />
      <div
        className="absolute bottom-20 right-[10%] w-80 h-80 sm:w-96 sm:h-96 bg-accent/8 rounded-full blur-[100px] sm:blur-[150px]"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        {/* Badge - Instant reveal on mobile */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-subtle bg-surface-glass backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-sm text-text-secondary">
            Official WhatsApp Business API (WABA) Partner
          </span>
        </motion.div>

        {/* Heading - Removed delay and initial opacity for LCP speed */}
        <h1 className="text-[1.75rem] sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
          <span className="gradient-text-hero">The AI-Powered</span>
          <br />
          <span className="relative inline-flex flex-col items-center justify-center min-w-[280px] sm:min-w-[450px]" style={{ minHeight: "1.2em" }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`bg-linear-to-r ${currentWord.color} bg-clip-text text-transparent py-1`}
              >
                {currentWord.text}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />
          <span className="gradient-text-primary">for Modern Teams</span>
        </h1>

        {/* Subheading - Near instant */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-2xl mx-auto text-sm sm:text-xl text-text-secondary leading-relaxed mb-10 px-1 wrap-break-word"
        >
          PingOS is a specialized WhatsApp Business OS. Automate lead generation, scale sales with Official WABA API, and manage Click-to-WhatsApp ads with precision from one unified dashboard.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
        >
          <Link
            href={signupUrl}
            className="btn-primary text-base py-3.5! px-8! group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Sign Up
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform" />
          </Link>
          <Link
            href={loginUrl}
            className="btn-secondary text-base py-3.5! px-8!"
          >
            <Play className="w-4 h-4" />
            Login
          </Link>
          <WhatsAppButton />
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.25 
          }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-16"
        >
          {[
            { value: "10M+", label: "Messages sent" },
            { value: "500+", label: "Teams active" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "No code", label: "Bot builder" },
          ].map((stat) => (
            <div key={stat.label} className="text-center group cursor-default">
              <motion.div 
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-primary-light transition-colors"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-text-muted mt-1 group-hover:text-text-secondary transition-colors">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
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
                    <div className="w-7 h-7 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center text-[10px] font-black text-white shadow-sm shadow-primary/20">
                      P
                    </div>
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
                        WABA API
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
                        msg: "The automated response solved my issue immediately! Thanks.",
                        time: "15m ago",
                        unread: false,
                        channel: "WhatsApp",
                      },
                      {
                        name: "Café Bloom",
                        msg: "How do we upgrade our WABA API templates?",
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
