"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  planType?: "starter" | "pro" | "enterprise" | undefined;
}

export default function ContactFormModal({
  isOpen,
  onClose,
  planType,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    plan: planType || "not-specified",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Synchronous ref to prevent double-click / rapid enter-key submissions
  const isSubmittingRef = useRef(false);
  // Ref for timer cleanup on unmount
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize planType when prop changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        plan: planType || "not-specified",
      }));
      setErrorMessage(null);
    }
  }, [isOpen, planType]);

  // Lock root documentElement and body scrolling with layout shift compensation
  useBodyScrollLock(isOpen);

  // Handle Escape key dismissal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard against multi-submit race condition
    if (isSubmittingRef.current || loading) return;
    isSubmittingRef.current = true;
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          plan: planType || "not-specified",
          message: "",
        });

        // Close modal after 2.2 seconds cleanly
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          onClose();
          setSubmitted(false);
        }, 2200);
      } else {
        setErrorMessage(
          data.error || "Failed to submit inquiry. Please check your details and try again."
        );
      }
    } catch (error) {
      console.error("Inquiry submission error:", error);
      setErrorMessage("Network error occurred. Please check your connection and try again.");
    } finally {
      isSubmittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with click-to-dismiss and wheel/touch isolation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            onWheel={(e) => e.stopPropagation()}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer overscroll-contain touch-none"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none overscroll-contain">
            <motion.div
              data-testid="contact-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-surface-card rounded-2xl relative max-h-[min(90dvh,640px)] flex flex-col shadow-2xl border border-border-subtle overflow-hidden pointer-events-auto overscroll-contain"
            >
              {/* 1. FIXED HEADER */}
              <div className="px-6 py-5 border-b border-border-subtle/80 flex items-start justify-between shrink-0 bg-surface-card z-10">
                <div className="pr-4">
                  <h2
                    id="contact-modal-title"
                    className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight"
                  >
                    Get in Touch
                  </h2>
                  <p className="text-text-secondary text-xs sm:text-sm mt-1">
                    Tell us about your needs, and our team will help you find the perfect solution.
                  </p>
                </div>
                <button
                  data-testid="modal-close-button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary bg-surface-primary hover:bg-border-subtle transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 2. SCROLLABLE BODY */}
              <div className="overflow-y-auto flex-1 px-6 py-5 overscroll-contain [scrollbar-width:thin] [scrollbar-color:var(--color-border-subtle)_transparent]">
                {submitted ? (
                  // Success State
                  <div className="text-center py-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    >
                      <CheckCircle className="w-16 h-16 text-accent-green mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      Thank You!
                    </h3>
                    <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
                      We&apos;ve received your inquiry. A PingOS messaging specialist will be in
                      touch within 24 hours.
                    </p>
                  </div>
                ) : (
                  // Form Content
                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                    {/* Inline Error Callout */}
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                        <span className="flex-1">{errorMessage}</span>
                        <button
                          type="button"
                          onClick={() => setErrorMessage(null)}
                          className="text-red-500 hover:text-red-700 dark:hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Responsive 2-Column Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Name */}
                      <div className="sm:col-span-1">
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-primary border border-border-subtle text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div className="sm:col-span-1">
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@company.com"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-primary border border-border-subtle text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>

                      {/* Company */}
                      <div className="sm:col-span-1">
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Inc."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-primary border border-border-subtle text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>

                      {/* Phone */}
                      <div className="sm:col-span-1">
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-primary border border-border-subtle text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>

                      {/* Plan Selection */}
                      <div className="col-span-full">
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                          Interested Plan
                        </label>
                        <select
                          name="plan"
                          value={formData.plan}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-primary border border-border-subtle text-text-primary text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                        >
                          <option value="not-specified">Not specified</option>
                          <option value="starter">Base (Free / Starter)</option>
                          <option value="pro">Pro ($49/mo, yearly available)</option>
                          <option value="enterprise">
                            Enterprise (Custom, yearly only)
                          </option>
                        </select>
                      </div>

                      {/* Message */}
                      <div className="col-span-full">
                        <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell us more about your needs..."
                          rows={3}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-primary border border-border-subtle text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* 3. FIXED FOOTER */}
              {!submitted && (
                <div className="px-6 py-4 border-t border-border-subtle/80 bg-surface-primary/40 shrink-0 flex items-center justify-between gap-4">
                  <span className="text-[11px] text-text-muted hidden sm:inline">
                    🔒 100% confidential. No spam, ever.
                  </span>
                  <button
                    type="submit"
                    form="contact-form"
                    disabled={loading}
                    className="w-full sm:w-auto sm:ml-auto py-2.5 px-6 rounded-xl btn-primary text-white text-sm font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {loading ? "Sending..." : "Send Inquiry"}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
