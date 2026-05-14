"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { getProductUrl } from "@/lib/product";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Product", href: "/#product" },
  { label: "Inquiry", href: "/#inquiry" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const loginUrl = getProductUrl("/login");
  const signupUrl = getProductUrl("/signup");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-primary/80 backdrop-blur-xl border-b border-border-subtle shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="PingOS Logo"
            width={40}
            height={40}
            sizes="40px"
            quality={60}
            priority
            className="w-10 h-10 group-hover:drop-shadow-lg transition-all"
          />
          <span className="text-3xl font-bold text-text-primary tracking-tight">
            Ping<span className="text-primary-light">OS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={loginUrl}
            className="ml-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
          >
            Login
          </Link>
          <Link
            href={signupUrl}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-linear-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Sign Up
          </Link>
        </div>
        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-b border-border-subtle bg-surface-primary/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={loginUrl}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                href={signupUrl}
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-linear-to-r from-primary to-accent px-4 py-3 font-semibold text-white"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
