import LegalLayout from "@/components/LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 8, 2026">
      <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
      <p className="mb-6">
        Welcome to PingOS. We value your privacy and are committed to protecting your personal data.
        This Privacy Policy explains how we collect, use, and share information about you when you use our services.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong className="text-text-primary">Account Information:</strong> Name, email, company name, and phone number.</li>
        <li><strong className="text-text-primary">Usage Data:</strong> How you interact with our platform, IP addresses, and device information.</li>
        <li><strong className="text-text-primary">Communication Data:</strong> Messages and interactions processed through PingOS across WhatsApp, SMS, and Email.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
      <p className="mb-6">
        We use your data to provide, maintain, and improve our services, process transactions, communicate with you, and personalize your experience. We do not sell your personal data to third parties.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">4. Security</h2>
      <p className="mb-6">
        We implement robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption for data in transit and at rest.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
      <p className="mb-6">
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@pingos.app" className="text-primary-light hover:text-accent transition-colors">privacy@pingos.app</a>.
      </p>
    </LegalLayout>
  );
}
