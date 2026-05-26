import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | PingOS",
  description: "About PingOS — mission, team, and what we build.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-surface-primary selection:bg-primary-light/30 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About PingOS</h1>
          <p className="text-text-secondary max-w-3xl mx-auto mb-8">
            PingOS is a focused WhatsApp Business operating system that helps teams automate customer conversations, manage leads, and run campaigns using the Official WABA API.
          </p>

          <section className="space-y-6 text-left text-text-secondary">
            <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
            <p>
              We build tools that make conversational commerce scalable and delightful for businesses and their customers.
            </p>

            <h2 className="text-2xl font-semibold text-white">What We Value</h2>
            <ul className="list-disc pl-6">
              <li>Privacy-first product design</li>
              <li>Reliable integrations with official APIs</li>
              <li>Clear, human-centered automation</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
