import LegalLayout from "@/components/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | PingOS",
  description:
    "Read PingOS Cookie Policy. Learn how we use cookies to improve your experience on our business messaging platform.",
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "Cookie Policy | PingOS",
    description: "Understand how we use cookies at PingOS.",
    type: "website",
    locale: "en_US",
    url: "/cookies",
  },
};

export default function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="April 8, 2026">
      <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies?</h2>
      <p className="mb-6">
        Cookies are small text files stored on your device that help our website function properly and provide us with insights into how you interact with PingOS.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">2. Types of Cookies We Use</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong className="text-text-primary">Strictly Necessary Cookies:</strong> Essential for you to browse the website and use its features, such as accessing secure areas of the platform.</li>
        <li><strong className="text-text-primary">Performance Cookies:</strong> Collect information about how you use our website, like which pages you visited and which links you clicked on. None of this information can be used to identify you.</li>
        <li><strong className="text-text-primary">Functional Cookies:</strong> Allow our website to remember choices you make (such as your user name or language) and provide enhanced, more personalized features.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4">3. Your Choices</h2>
      <p className="mb-6">
        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
      </p>
    </LegalLayout>
  );
}
