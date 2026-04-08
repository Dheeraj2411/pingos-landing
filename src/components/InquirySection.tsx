"use client";

import { motion } from "framer-motion";
import { Send, User, Mail, Building2, Phone, MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import { useState, FormEvent } from "react";

const planOptions = [
  { value: "", label: "Select a plan you're interested in" },
  { value: "starter", label: "Starter — Free" },
  { value: "professional", label: "Professional — $79/mo" },
  { value: "enterprise", label: "Enterprise — $299/mo" },
  { value: "custom", label: "Custom / Not sure yet" },
];

export default function InquirySection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    plan: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({ name: "", email: "", company: "", phone: "", plan: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    }
  };

  return (
    <section id="inquiry" className="relative py-16 sm:py-20">
      <div className="absolute inset-0 bg-radial-glow opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary-light uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text leading-tight">
            Let&apos;s Build Together
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-text-secondary text-lg">
            Have questions or ready to get started? Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent">
            <div className="rounded-2xl bg-surface-card border border-primary/10 p-8 sm:p-10 md:p-12">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-accent-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">
                    Inquiry Sent!
                  </h3>
                  <p className="text-text-secondary max-w-sm">
                    Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 btn-secondary"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="inquiry-name" className="text-sm font-medium text-text-secondary flex items-center gap-2">
                        <User className="w-4 h-4 text-primary-light" />
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="inquiry-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="inquiry-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="inquiry-email" className="text-sm font-medium text-text-secondary flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary-light" />
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="inquiry-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="inquiry-input"
                      />
                    </div>
                  </div>

                  {/* Company & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="inquiry-company" className="text-sm font-medium text-text-secondary flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary-light" />
                        Company Name
                      </label>
                      <input
                        id="inquiry-company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        className="inquiry-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="inquiry-phone" className="text-sm font-medium text-text-secondary flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary-light" />
                        Phone Number
                      </label>
                      <input
                        id="inquiry-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="inquiry-input"
                      />
                    </div>
                  </div>

                  {/* Plan Selection */}
                  <div className="space-y-2">
                    <label htmlFor="inquiry-plan" className="text-sm font-medium text-text-secondary flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary-light" />
                      Interested Plan
                    </label>
                    <select
                      id="inquiry-plan"
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className="inquiry-input inquiry-select"
                    >
                      {planOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="inquiry-message" className="text-sm font-medium text-text-secondary flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary-light" />
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your messaging needs, team size, or any questions you have..."
                      className="inquiry-input resize-none"
                    />
                  </div>

                  {/* Error Message */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                    >
                      {errorMessage}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full btn-primary justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-text-muted">
                    By submitting, you agree to our privacy policy. We&apos;ll never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
