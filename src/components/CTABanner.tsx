"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import Link from "next/link";
import { getProductUrl } from "@/lib/product";

export default function CTABanner() {
  const loginUrl = getProductUrl("/login");
  const signupUrl = getProductUrl("/signup");

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-linear-to-br from-primary via-primary-dark to-[#3730a3]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />

          {/* Floating Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -right-32 w-80 h-80 bg-accent/20 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary-light/20 rounded-full blur-[100px]" 
          />

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            >
              Ready to scale your WhatsApp revenue?
              <br />
              <span className="text-accent">Start automating today</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-xl mx-auto text-indigo-200 text-lg mb-10"
            >
              Join 500+ forward-thinking teams already using PingOS to automate
              conversations, convert leads, and grow revenue — all on
              autopilot.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
            >
              <Link
                href={signupUrl}
                className="inline-flex items-center gap-2 bg-white text-primary-dark font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Sign Up
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform" />
              </Link>
              <Link
                href={loginUrl}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Login
              </Link>
              <WhatsAppButton />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


