import LegalLayout from "@/components/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | PingOS",
  description:
    "Read PingOS Terms of Service. Understand the terms and conditions for using our business messaging operating system.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | PingOS",
    description: "Review the terms and conditions for using PingOS.",
    type: "website",
    locale: "en_US",
    url: "/terms",
  },
};

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="April 8, 2026">
      <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
      <p className="mb-6">
        By accessing or using PingOS, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">2. Use of Service</h2>
      <p className="mb-6">
        You agree to use PingOS in compliance with all applicable local, national, and international laws, including data privacy and telecommunications regulations (such as WhatsApp Business policies, TCPA, and GDPR).
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">3. Account Responsibilities</h2>
      <p className="mb-6">
        You are responsible for safeguarding your password and any other credentials. You must notify us immediately of any unauthorized use of your account.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">4. Acceptable Use Policy</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>You may not use PingOS to send spam or unsolicited promotional material.</li>
        <li>You may not transmit any malicious code or interfere with our platform&apos;s security.</li>
        <li>Violation of our Acceptable Use Policy may result in immediate account termination.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
      <p className="mb-6">
        PingOS is provided &quot;as is&quot; without warranties of any kind. In no event shall PingOS or its team be liable for any damages arising out of your use of the platform.
      </p>
    </LegalLayout>
  );
}
