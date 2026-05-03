"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle } from "lucide-react";

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          plan: planType || "not-specified",
          message: "",
        });

        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitted(false);
        }, 2000);
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md glass-card rounded-2xl p-8 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-surface-elevated rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>

              {submitted ? (
                // Success State
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                  >
                    <CheckCircle className="w-16 h-16 text-accent-green mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    Thank You!
                  </h3>
                  <p className="text-text-secondary">
                    We've received your inquiry. Our team will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                // Form State
                <>
                  <h2 className="text-2xl font-bold text-text-primary mb-2">
                    Get in Touch
                  </h2>
                  <p className="text-text-secondary text-sm mb-6">
                    Tell us about your needs, and our team will help you find the perfect solution.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        className="w-full px-4 py-2.5 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-2.5 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>

                    {/* Plan (if not pre-selected) */}
                    {!planType && (
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Interested Plan
                        </label>
                        <select
                          name="plan"
                          value={formData.plan}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-primary/50 transition-colors"
                        >
                          <option value="not-specified">Not specified</option>
                          <option value="starter">Starter (Free)</option>
                          <option value="pro">Pro ($49/mo)</option>
                          <option value="enterprise">Enterprise ($299+/mo)</option>
                        </select>
                      </div>
                    )}

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us more about your needs..."
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-lg bg-surface-elevated border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary via-primary to-accent text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {loading ? "Sending..." : "Send Inquiry"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
