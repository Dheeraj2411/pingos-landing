"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-surface-primary selection:bg-primary-light/30 selection:text-white">
      <Navbar />

      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {title}
            </h1>
            <p className="text-text-muted">Last Updated: {lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 text-text-secondary leading-relaxed bg-surface-secondary/40 backdrop-blur-sm border border-border-subtle p-8 md:p-12 rounded-3xl"
          >
            {children}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
