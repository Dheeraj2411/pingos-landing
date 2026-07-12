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
      <h2 className="text-2xl font-semibold text-white mb-4">
        1. Acceptance of Terms
      </h2>
      <p className="mb-6">
        By accessing or using PingOS, you agree to be bound by these Terms of
        Service. If you do not agree, please do not use our services.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        2. Use of Service
      </h2>
      <p className="mb-6">
        You agree to use PingOS in compliance with all applicable local,
        national, and international laws, including data privacy and
        telecommunications regulations (such as WhatsApp Business policies,
        TCPA, and GDPR).
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        3. Account Responsibilities
      </h2>
      <p className="mb-6">
        You are responsible for safeguarding your password and any other
        credentials. You must notify us immediately of any unauthorized use of
        your account.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        4. Acceptable Use Policy
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          You may not use PingOS to send spam or unsolicited promotional
          material.
        </li>
        <li>
          You may not transmit any malicious code or interfere with our
          platform&apos;s security.
        </li>
        <li>
          Violation of our Acceptable Use Policy may result in immediate account
          termination.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4">
        5. Limitation of Liability
      </h2>
      <p className="mb-6">
        PingOS is provided &quot;as is&quot; without warranties of any kind. In
        no event shall PingOS or its team be liable for any damages arising out
        of your use of the platform.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        6. Billing and Payments
      </h2>
      <p className="mb-6">
        For paid plans, you agree to pay the fees described at the time of
        purchase. Billing cycles, pricing, and payment methods are set forth on
        the order page and may be updated from time to time. Refunds, if any,
        are granted at PingOS&apos;s sole discretion and are subject to our
        refund policy.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        7. Intellectual Property
      </h2>
      <p className="mb-6">
        All intellectual property rights in the Service, including software,
        designs, trademarks and content, are owned by PingOS or its licensors.
        You are granted a limited, revocable, non-exclusive license to use the
        Service as permitted under these Terms. You retain ownership of any data
        you upload or submit to the Service.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        8. Modifications to the Service
      </h2>
      <p className="mb-6">
        We may modify, update, or discontinue features of the Service at any
        time, with or without notice, provided that such changes do not
        materially reduce the overall functionality of the Service for paid
        customers without appropriate notice.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">9. Termination</h2>
      <p className="mb-6">
        We may suspend or terminate your access to the Service for breaches of
        these Terms or for any other reason with notice where required by law.
        Upon termination, any outstanding amounts owed to PingOS become
        immediately due and payable and we may delete or deprovision your
        account data in accordance with our data retention policies.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        10. Indemnification
      </h2>
      <p className="mb-6">
        You agree to indemnify, defend, and hold harmless PingOS and its
        affiliates from any claims, liabilities, damages, losses, or expenses
        arising from your use of the Service, violation of these Terms, or
        infringement of any rights of a third party.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        11. Governing Law and Dispute Resolution
      </h2>
      <p className="mb-6">
        These Terms are governed by the laws of the jurisdiction where PingOS is
        registered, without regard to conflict of law rules. Any dispute arising
        out of or related to these Terms will be subject to the exclusive
        jurisdiction of the courts located in that jurisdiction, unless
        otherwise agreed in writing.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        12. Data Processing and Privacy
      </h2>
      <p className="mb-6">
        Your use of the Service may involve processing personal data. Our
        Privacy Policy explains how we collect, use, and share personal
        information. By using the Service you agree to the terms of our Privacy
        Policy.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        13. Changes to These Terms
      </h2>
      <p className="mb-6">
        We may revise these Terms from time to time. If we make material
        changes, we will provide notice via the Service or other communication
        channels. Continued use of the Service after notice constitutes
        acceptance of the updated Terms.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">14. Contact</h2>
      <p className="mb-6">
        For questions about these Terms, please contact us at{" "}
        <a
          href="mailto:legal@pingos.app"
          className="text-primary-light hover:text-accent transition-colors"
        >
          legal@pingos.app
        </a>
        .
      </p>

      <p className="text-text-secondary">Effective date: May 30, 2026</p>
    </LegalLayout>
  );
}
