import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProof from "@/components/SocialProof";
import FeatureGrid from "@/components/FeatureGrid";
import HowItWorks from "@/components/HowItWorks";
import ProductPreview from "@/components/ProductPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import InquirySection from "@/components/InquirySection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  // Comprehensive JSON-LD structured data for better SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PingOS",
    url: "https://pingos.ai",
    logo: "https://pingos.ai/logo.png",
    description:
      "PingOS is the all-in-one business messaging operating system. Automate conversations, manage leads, run campaigns, and unify your inbox across WhatsApp, SMS, and email.",
    sameAs: [
      "https://twitter.com/PingOS",
      "https://www.linkedin.com/company/pingos",
      "https://github.com/pingos",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@pingos.ai",
    },
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PingOS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Business messaging operating system for automation, CRM, and marketing.",
    url: "https://pingos.ai",
    offers: [
      {
        "@type": "Offer",
        name: "Starter (Free Trial)",
        price: "0",
        priceCurrency: "USD",
        description: "Perfect for solopreneurs and small teams testing the platform.",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "49",
        priceCurrency: "USD",
        description: "The revenue driver for growing sales teams and agencies.",
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        price: "299",
        priceCurrency: "USD",
        description: "For large-scale operations with dedicated support.",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I get started?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can start a free trial with our Starter plan. Just click the Get Started button to begin.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use PingOS with my existing CRM?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, PingOS integrates with popular CRM systems. Contact our team for integration support.",
        },
      },
      {
        "@type": "Question",
        name: "What payment methods do you accept?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept all major credit cards and can arrange custom payment terms for enterprise customers.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <HeroSection />

        <SocialProof />

        <div className="section-divider" />

        <FeatureGrid />

        <div className="section-divider" />

        <HowItWorks />

        <div className="section-divider" />

        <ProductPreview />

        <div className="section-divider" />

        <TestimonialsSection />

        <div className="section-divider" />

        <PricingSection />

        <div className="section-divider" />

        <FAQSection />

        <div className="section-divider" />

        <InquirySection />

        <div className="section-divider" />

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
