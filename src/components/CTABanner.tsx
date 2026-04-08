"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#3730a3]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />

          {/* Floating Orbs */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-accent/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary-light/20 rounded-full blur-[100px]" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Scale your business across
              <br />
              <span className="text-accent">WhatsApp Business</span>
            </h2>
            <p className="max-w-xl mx-auto text-indigo-200 text-lg mb-10">
              Join 150+ businesses already using PingOS to automate
              conversations, convert leads, and grow revenue — all on
              autopilot.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 bg-white text-primary-dark font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10"
              >
                Start Your Free Trial
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Talk to Sales
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
