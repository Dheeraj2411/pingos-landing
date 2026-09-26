"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import {
  Send,
  User,
  Mail,
  Building2,
  Phone,
  MessageSquare,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import WhatsAppQR from "./WhatsAppQR";

const planOptions = [
  { value: "", label: "Select a plan you're interested in" },
  { value: "starter", label: "Base (Free / Starter)" },
  { value: "pro", label: "Pro — $49/mo (monthly or yearly)" },
  { value: "enterprise", label: "Enterprise — Custom (yearly only)" },
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
    website: "", // Invisible honeypot field
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Race condition & rapid double-submission guards
  const isSubmittingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const formLoadedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    formLoadedAtRef.current = Date.now();
    return () => {
      // Abort any in-flight request if unmounting
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Guard 1: Synchronous lock to eliminate double-click / rapid enter-key race conditions
    if (isSubmittingRef.current || status === "submitting") return;
    isSubmittingRef.current = true;
    setStatus("submitting");
    setErrorMessage("");

    // Guard 2: Client-side validation checks
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (trimmedName.length < 2) {
      setErrorMessage("Please enter a valid name (at least 2 characters).");
      setStatus("error");
      isSubmittingRef.current = false;
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      isSubmittingRef.current = false;
      return;
    }

    if (trimmedMessage.length < 10) {
      setErrorMessage("Please provide a message with at least 10 characters.");
      setStatus("error");
      isSubmittingRef.current = false;
      return;
    }

    try {
      abortControllerRef.current = new AbortController();

      const payload = {
        name: trimmedName,
        email: trimmedEmail,
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        plan: formData.plan || "not-specified",
        message: trimmedMessage,
        website: formData.website, // Honeypot
        formLoadedAt: formLoadedAtRef.current, // Speed trap token
      };

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: abortControllerRef.current.signal,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please check your details and try again.");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        plan: "",
        message: "",
        website: "",
      });
      // Refresh time token for subsequent submissions
      formLoadedAtRef.current = Date.now();
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        return; // Component unmounted, ignore
      }
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to submit. Please try again.",
      );
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return (
    <section id="inquiry" className="relative py-16 sm:py-20">
      <div className="absolute inset-0 bg-radial-glow opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary-light uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
            Let&apos;s Build Together
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-text-secondary text-lg">
            Have questions or ready to get started? Fill out the form below and
            our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl p-px bg-primary/20">
                <div className="rounded-2xl bg-white border border-primary/10 p-8 sm:p-10 md:p-12 shadow-sm">
                  {status === "success" ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-20 h-20 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-accent-green" />
                      </div>
                      <h3 className="text-2xl font-bold text-text-primary mb-3">
                        Inquiry Sent!
                      </h3>
                      <p className="text-text-secondary max-w-sm">
                        Thank you for reaching out. Our team will review your
                        inquiry and get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setStatus("idle");
                          formLoadedAtRef.current = Date.now();
                        }}
                        className="mt-8 btn-secondary"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Invisible Anti-Bot Honeypot Field */}
                      <div
                        aria-hidden="true"
                        className="hidden"
                        style={{ display: "none" }}
                      >
                        <label htmlFor="inquiry-website">Website</label>
                        <input
                          id="inquiry-website"
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          className="hidden"
                          style={{ display: "none" }}
                          value={formData.website}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label
                            htmlFor="inquiry-name"
                            className="text-sm font-medium text-text-secondary flex items-center gap-2"
                          >
                            <User className="w-4 h-4 text-primary-light" />
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="inquiry-name"
                            name="name"
                            type="text"
                            required
                            maxLength={100}
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="inquiry-input"
                            autoComplete="name"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="inquiry-email"
                            className="text-sm font-medium text-text-secondary flex items-center gap-2"
                          >
                            <Mail className="w-4 h-4 text-primary-light" />
                            Email Address{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="inquiry-email"
                            name="email"
                            type="email"
                            required
                            maxLength={254}
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className="inquiry-input"
                            autoComplete="email"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label
                            htmlFor="inquiry-company"
                            className="text-sm font-medium text-text-secondary flex items-center gap-2"
                          >
                            <Building2 className="w-4 h-4 text-primary-light" />
                            Company Name
                          </label>
                          <input
                            id="inquiry-company"
                            name="company"
                            type="text"
                            maxLength={150}
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Acme Inc."
                            className="inquiry-input"
                            autoComplete="organization"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="inquiry-phone"
                            className="text-sm font-medium text-text-secondary flex items-center gap-2"
                          >
                            <Phone className="w-4 h-4 text-primary-light" />
                            Phone Number
                          </label>
                          <input
                            id="inquiry-phone"
                            name="phone"
                            type="tel"
                            maxLength={30}
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                            className="inquiry-input"
                            autoComplete="tel"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="inquiry-plan"
                          className="text-sm font-medium text-text-secondary flex items-center gap-2"
                        >
                          <Building2 className="w-4 h-4 text-primary-light" />
                          Interested Plan
                        </label>
                        <select
                          id="inquiry-plan"
                          name="plan"
                          value={formData.plan}
                          onChange={handleChange}
                          className="inquiry-input inquiry-select cursor-pointer"
                        >
                          {planOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="inquiry-message"
                            className="text-sm font-medium text-text-secondary flex items-center gap-2"
                          >
                            <MessageSquare className="w-4 h-4 text-primary-light" />
                            Message <span className="text-red-400">*</span>
                          </label>
                          <span className="text-xs text-text-muted">
                            {formData.message.length}/3000
                          </span>
                        </div>
                        <textarea
                          id="inquiry-message"
                          name="message"
                          required
                          rows={5}
                          minLength={10}
                          maxLength={3000}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your WhatsApp automation needs, team size, or WABA onboarding questions..."
                          className="inquiry-input resize-none"
                        />
                      </div>

                      {status === "error" && errorMessage && (
                        <div className="text-sm text-red-600 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full btn-primary justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
                        🔒 100% confidential. No spam, ever.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 flex items-center justify-center">
              <WhatsAppQR />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
