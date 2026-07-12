"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";

export default function WhatsAppQR() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!whatsappNumber) return null;
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in learning more about PingOS and how it can help my business.",
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 rounded-lg bg-linear-to-br from-green-50 to-emerald-50 border border-green-200">
      {/* QR Code Image */}
      <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-white border-2 border-green-500 shadow-lg">
        <Image
          src="/whatsapp-qr.png"
          alt="WhatsApp QR Code"
          fill
          sizes="160px"
          className="object-contain p-2"
        />
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700 mb-1">
          Scan to connect on WhatsApp
        </p>
        <p className="text-xs text-gray-600">Chat with us directly</p>
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-green-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:-translate-y-0.5 text-sm"
      >
        <MessageCircle className="w-4 h-4" />
        Chat on WhatsApp
      </a>
    </div>
  );
}
