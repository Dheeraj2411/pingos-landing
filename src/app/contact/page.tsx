import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquirySection from "@/components/InquirySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | PingOS",
  description: "Contact PingOS — send an inquiry or request a demo.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-surface-primary selection:bg-primary-light/30 selection:text-white">
      <Navbar />

      <main className="pt-10 pb-20">
        <InquirySection />
      </main>

      <Footer />
    </div>
  );
}
