"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import ChatBubble from "./ChatBubble";
import { getProductUrl } from "@/lib/product";

const dynamicWords = [
  { text: "WhatsApp CRM", color: "from-primary to-primary-light" },
  { text: "WABA Automation", color: "from-primary-light to-accent" },
  { text: "Lead Generation", color: "from-accent to-primary" },
  { text: "Sales Automation", color: "from-primary-dark to-primary" },
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

      {/* Floating Orbs - Subtle for light mode */}
      <div className="absolute top-20 left-[15%] w-64 h-64 sm:w-72 sm:h-72 bg-primary/5 rounded-full blur-[80px] sm:blur-[120px] animate-float" />
      <div
        className="absolute bottom-20 right-[10%] w-80 h-80 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-[100px] sm:blur-[150px]"
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

        {/* Heading */}
        <h1 className="text-[1.75rem] sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
          <span className="text-text-primary">The AI-Powered</span>
          <br />
          <span
            className="relative inline-flex flex-col items-center justify-center min-w-[280px] sm:min-w-[450px]"
            style={{ minHeight: "1.2em" }}
          >
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
          className="max-w-2xl mx-auto text-sm sm:text-xl text-text-secondary leading-relaxed mb-10 px-1 break-words"
        >
          PingOS is a specialized WhatsApp Business OS. Automate lead
          generation, scale sales with Official WABA API, and manage
          Click-to-WhatsApp ads with precision from one unified dashboard.
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
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer transition-transform" />
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
            delay: 0.25,
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
              <div className="text-sm text-text-muted mt-1 group-hover:text-text-secondary transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Dashboard Preview - WhatsApp Web Style */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-20 relative mx-auto w-full max-w-5xl"
        >
          <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl" />
          <div className="relative glass-card rounded-2xl p-2 animate-pulse-glow bg-border-subtle">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm flex h-[500px]">
              {/* WhatsApp Web Sidebar */}
              <div className="hidden sm:flex w-[30%] min-w-[300px] border-r border-border-subtle flex-col bg-white">
                {/* Sidebar Header */}
                <div className="h-16 bg-surface-primary px-4 flex items-center justify-between border-b border-border-subtle">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div className="flex gap-4 text-text-secondary">
                    <div className="w-5 h-5 rounded-full border-2 border-current opacity-70" />
                    <div className="w-5 h-5 rounded-md border-2 border-current opacity-70" />
                    <div className="w-5 h-5 rounded-full border-2 border-current opacity-70" />
                  </div>
                </div>

                {/* Search */}
                <div className="p-2 border-b border-border-subtle">
                  <div className="bg-surface-primary rounded-lg px-4 py-1.5 text-sm text-text-muted">
                    Search or start new chat
                  </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                  {[
                    {
                      name: "Priya Sharma",
                      msg: "I'd like to know about...",
                      time: "10:42",
                      unread: 2,
                      active: true,
                    },
                    {
                      name: "Alex Johnson",
                      msg: "Thanks for the help!",
                      time: "Yesterday",
                      unread: 0,
                      active: false,
                    },
                    {
                      name: "Café Bloom",
                      msg: "Upgrade our WABA API",
                      time: "Tuesday",
                      unread: 1,
                      active: false,
                    },
                  ].map((chat, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-3 py-3 cursor-pointer ${chat.active ? "bg-surface-primary" : "hover:bg-[#F5F6F6]"}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                      <div className="flex-1 min-w-0 border-b border-border-subtle pb-3 -mb-3">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="text-[15px] text-text-primary truncate">
                            {chat.name}
                          </span>
                          <span
                            className={`text-[12px] ${chat.unread ? "text-[#25D366] font-medium" : "text-[#667781]"}`}
                          >
                            {chat.time}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-[#667781] truncate pr-2">
                            {chat.msg}
                          </span>
                          {chat.unread > 0 && (
                            <span className="bg-[#25D366] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Web Chat Area */}
              <div className="flex-1 flex flex-col bg-chat-bg relative">
                {/* Chat Header */}
                <div className="h-16 bg-surface-primary px-4 flex items-center justify-between border-b border-border-subtle z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div>
                      <div className="text-[15px] text-text-primary">
                        Priya Sharma
                      </div>
                      <div className="text-[13px] text-[#667781]">
                        click to here for contact info
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-text-secondary">
                    <div className="w-5 h-5 rounded-full border-2 border-current opacity-70" />
                    <div className="w-5 h-5 rounded-full border-2 border-current opacity-70" />
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-8 sm:p-12 overflow-y-auto flex flex-col gap-2">
                  <div className="text-center mb-4">
                    <span className="bg-white/80 px-3 py-1 rounded-lg text-xs text-text-secondary shadow-sm">
                      TODAY
                    </span>
                  </div>

                  <ChatBubble
                    message="Hi! I'm interested in the enterprise plan. Can you tell me about pricing?"
                    time="10:32 AM"
                    isOutbound={false}
                  />

                  <ChatBubble
                    message="Thanks for reaching out! 🙌 Our Enterprise plan starts at $299/mo and includes unlimited messaging."
                    time="10:32 AM"
                    isOutbound={true}
                    isAutoReply={true}
                    status="read"
                  />
                </div>

                {/* Chat Input */}
                <div className="h-[62px] bg-surface-primary px-4 flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-text-secondary opacity-70" />
                  <div className="w-6 h-6 rounded-md border-2 border-text-secondary opacity-70" />
                  <div className="flex-1 bg-white rounded-lg h-[42px] px-4 flex items-center text-text-muted text-sm shadow-sm">
                    Type a message
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-text-secondary opacity-70" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
