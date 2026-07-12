import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const SocialProof = dynamic(() => import("@/components/SocialProof"));
const FeatureGrid = dynamic(() => import("@/components/FeatureGrid"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const ProductPreview = dynamic(() => import("../components/ProductPreview"));
const TestimonialsSection = dynamic(
  () => import("../components/TestimonialsSection"),
);
const PricingSection = dynamic(() => import("../components/PricingSection"));
const FAQSection = dynamic(() => import("../components/FAQSection"));

const CTABanner = dynamic(() => import("../components/CTABanner"));

export const metadata: Metadata = {
  title: "PingOS App | #1 WhatsApp CRM & Business Messaging OS",
  description:
    "The PingOS App is a specialized WhatsApp Business OS. Manage leads, automate follow-ups, and run high-volume campaigns. Get started with our free trial today!",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PingOS App | WhatsApp CRM, Business Messaging & WABA Automation",
    description:
      "Manage customer conversations, automate follow-ups, and capture more leads exclusively through the Official WhatsApp Business API. Try the PingOS App today.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "PingOS App | WhatsApp CRM, Business Messaging & WABA Automation",
    description:
      "Manage customer conversations, automate follow-ups, and capture more leads exclusively through the Official WhatsApp Business API. Try the PingOS App today.",
  },
};

export default function Home() {
  // Comprehensive JSON-LD structured data for better SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PingOS",
    url: "https://pingos.me",
    logo: "https://pingos.me/logo.png",
    description:
      "PingOS is the specialized WhatsApp Business operating system. Automate conversations, manage leads, and run high-volume campaigns via the Official WABA API.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@pingos.me",
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
    url: "https://pingos.me",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Base (Free / Starter)",
        price: "0",
        priceCurrency: "USD",
        description:
          "Default plan for new workspaces with core limits and no premium features.",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "49",
        priceCurrency: "USD",
        description:
          "Growth plan for teams with expanded limits and all premium features.",
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        price: "Custom",
        priceCurrency: "USD",
        description: "Unlimited enterprise usage with annual contracts.",
      },
    ],
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
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

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
