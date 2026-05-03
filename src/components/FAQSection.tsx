"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ContactFormModal from "./ContactFormModal";

const faqs = [
  {
    question: "What exactly are Meta API fees, and how do they affect my bill?",
    answer:
      "Meta API fees are separate charges from PingOS based on your message volume and channels used. Meta charges per incoming message, outgoing message, and other features like rich media. Your PingOS subscription covers our platform features. Meta fees are transparent and billed directly by Meta based on your actual usage. We don't markup Meta costs.",
  },
  {
    question: "Can I port my existing WhatsApp Business number?",
    answer:
      "Yes! PingOS supports WhatsApp Business number portability. You can migrate your existing number to our platform without losing your business history or contacts. We provide step-by-step guidance during the onboarding process to ensure a smooth transition.",
  },
  {
    question: "How long does onboarding typically take?",
    answer:
      "Our onboarding process usually takes 15-30 minutes for the Starter plan. For Pro and Enterprise plans, we provide dedicated onboarding support. Most users are sending their first automated messages within 2-3 hours of signing up, thanks to our intuitive visual bot builder.",
  },
  {
    question: "Is there a free trial for the Pro plan?",
    answer:
      "Absolutely! We offer a 14-day free trial for the Pro plan (no credit card required). You'll get full access to all Pro features, including the visual bot builder, drip campaigns, and Click-to-WhatsApp ads integration. After the trial, you can choose to upgrade or stick with the free Starter plan.",
  },
  {
    question: "Can I change plans anytime?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll handle any proration automatically. If you downgrade, you won't lose your data—it's all safe. We just disable features that aren't available on your new plan.",
  },
  {
    question: "What makes PingOS different from other WhatsApp CRM platforms?",
    answer:
      "PingOS combines a powerful visual bot builder, seamless team collaboration, and deep CRM capabilities—all in one platform. Unlike competitors, we focus on ease-of-use without sacrificing power. Our ReactFlow bot builder requires no coding, our shared inbox keeps teams in sync, and our integration with Click-to-WhatsApp ads drives direct revenue.",
  },
  {
    question: "Do you offer API access for custom integrations?",
    answer:
      "API access is available on our Enterprise plan. We support integrations with Salesforce, Shopify, Zapier, and custom webhooks. For Pro plan users, we offer limited webhook capabilities for basic automations. Contact our sales team to discuss your specific integration needs.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Starter plan users get access to our community forum and comprehensive documentation. Pro plan users enjoy priority email support with a 24-hour SLA. Enterprise customers get 24/7 phone support and a dedicated account manager. All plans include access to our knowledge base and video tutorials.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 rounded-xl glass-card hover:bg-surface-card/60 hover:border-primary/20 transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
            {question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 text-text-secondary leading-relaxed border-t border-border-subtle">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [contactFormOpen, setContactFormOpen] = useState(false);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-radial-glow opacity-20" />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-surface-glass border border-border-subtle text-xs font-semibold text-accent-green mb-4">
            Questions & Answers
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="gradient-text-hero">Frequently Asked Questions</span>
          </h2>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl mx-auto">
            Everything you need to know about PingOS, from pricing to features to support. Can't find an answer? <a href="#" className="text-accent hover:text-accent/80 transition-colors">Contact our team</a>.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 p-8 rounded-2xl glass-card text-center border border-primary/20"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Still have questions?
          </h3>
          <p className="text-text-secondary mb-6">
            Our support team is here to help. Reach out anytime—we typically respond within 2 hours.
          </p>
          <button
            onClick={() => setContactFormOpen(true)}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary via-primary to-accent text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={contactFormOpen}
        onClose={() => setContactFormOpen(false)}
      />
    </section>
  );
}
