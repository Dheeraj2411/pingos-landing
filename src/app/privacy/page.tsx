import LegalLayout from "@/components/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PingOS",
  description:
    "Read PingOS Privacy Policy. Learn how we collect, use, and protect your personal data when using our business messaging platform.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | PingOS",
    description: "Learn how we protect your personal data at PingOS.",
    type: "website",
    locale: "en_US",
    url: "/privacy",
  },
};

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 8, 2026">
      <h2 className="text-2xl font-semibold text-white mb-4">
        1. Introduction
      </h2>
      <p className="mb-6">
        Welcome to PingOS. We value your privacy and are committed to protecting
        your personal data. This Privacy Policy explains how we collect, use,
        and share information about you when you use our services.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        2. Information We Collect
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          <strong className="text-text-primary">Account Information:</strong>{" "}
          Name, email, company name, and phone number.
        </li>
        <li>
          <strong className="text-text-primary">Usage Data:</strong> How you
          interact with our platform, IP addresses, and device information.
        </li>
        <li>
          <strong className="text-text-primary">Communication Data:</strong>{" "}
          Messages and interactions processed through PingOS across WhatsApp,
          SMS, and Email.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4">
        3. How We Use Your Information
      </h2>
      <p className="mb-6">
        We use your data to provide, maintain, and improve our services, process
        transactions, communicate with you, and personalize your experience. We
        do not sell your personal data to third parties.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">4. Security</h2>
      <p className="mb-6">
        We implement robust security measures to protect your data from
        unauthorized access, alteration, disclosure, or destruction. We use
        industry-standard encryption for data in transit and at rest.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        5. Data Retention
      </h2>
      <p className="mb-6">
        We retain personal data only for as long as is necessary to provide
        services, fulfill the purposes described in this policy, comply with
        legal obligations, resolve disputes, and enforce our agreements.
        Retention periods vary by data type and purpose; when retention is no
        longer required we will securely delete or anonymize the data.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        6. Legal Bases for Processing (GDPR)
      </h2>
      <p className="mb-6">
        Where required by applicable law, we rely on one or more lawful bases to
        process personal data, including: performance of a contract, legitimate
        interests (such as improving our services and fraud prevention), consent
        (for optional marketing communications), and compliance with legal
        obligations.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        7. Third-Party Processors
      </h2>
      <p className="mb-6">
        We may share personal data with third-party service providers that
        perform services on our behalf (such as email delivery, hosting,
        analytics, and payment processors). These processors only receive the
        information necessary to perform their services and are contractually
        required to protect personal data and process it only on our
        instructions.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        8. Cookies and Tracking Technologies
      </h2>
      <p className="mb-6">
        We and our third-party partners use cookies and similar technologies for
        functionality, analytics, and advertising. You can control cookie
        settings through your browser and opt out of certain tracking via
        industry opt-out mechanisms. For details on the cookies we use and how
        to manage them, see our Cookie Policy or contact us.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">9. Your Rights</h2>
      <p className="mb-6">
        Depending on your jurisdiction, you may have rights regarding your
        personal data, including the right to access, correct, update, delete,
        restrict or object to processing, and the right to portability. To
        exercise these rights, contact us at the address below. We may need to
        verify your identity before acting on requests.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        10. International Transfers
      </h2>
      <p className="mb-6">
        PingOS operates internationally and personal data may be transferred to,
        stored, and processed in countries other than your country of residence.
        When such transfers occur we put in place appropriate safeguards (e.g.,
        standard contractual clauses) to protect your information in accordance
        with applicable data protection laws.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        11. Children&apos;s Privacy
      </h2>
      <p className="mb-6">
        Our services are not directed to children under the age of 16. We do not
        knowingly collect personal data from children under this age. If you
        believe we have collected such information, please contact us and we
        will take steps to delete it.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">12. Security</h2>
      <p className="mb-6">
        We implement robust security measures to protect your data from
        unauthorized access, alteration, disclosure, or destruction. We use
        industry-standard encryption for data in transit and at rest, maintain
        access controls, and monitor our systems for potential vulnerabilities.
        However, no system is completely secure; if a breach occurs we will
        notify affected users and authorities as required by law.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Us</h2>
      <p className="mb-6">
        If you have any questions about this Privacy Policy or want to exercise
        your data rights, please contact our data protection team at{" "}
        <a
          href="mailto:privacy@pingos.app"
          className="text-primary-light hover:text-accent transition-colors"
        >
          privacy@pingos.app
        </a>{" "}
        or write to:
      </p>

      <address className="not-italic text-text-secondary mb-6">
        PingOS
        <br />
        1234 Example Ave
        <br />
        City, State, Country
        <br />
        Email:{" "}
        <a
          href="mailto:privacy@pingos.app"
          className="text-primary-light hover:text-accent transition-colors"
        >
          privacy@pingos.app
        </a>
      </address>

      <p className="text-text-secondary">Effective date: May 30, 2026</p>
    </LegalLayout>
  );
}
