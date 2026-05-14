"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in learning more about PingOS and how it can help my business."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-linear-to-r from-green-500 via-green-500 to-emerald-500 text-white font-semibold hover:shadow-xl hover:shadow-green-500/40 transition-all group"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageCircle className="w-5 h-5 fill-current" />
      </motion.div>
      Chat on WhatsApp
    </motion.a>
  );
}

