import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import HowItWorks from "@/components/HowItWorks";
import ProductPreview from "@/components/ProductPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import InquirySection from "@/components/InquirySection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PingOS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "PingOS is the all-in-one business messaging operating system. Automate conversations, manage leads, run campaigns, and unify your inbox across WhatsApp, SMS, and email.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <HeroSection />

        <div className="section-divider" />

        <FeatureGrid />

        <div className="section-divider" />

        <HowItWorks />

        <div className="section-divider" />

        <ProductPreview />

        <div className="section-divider" />

        <TestimonialsSection />

        <div className="section-divider" />

        <InquirySection />

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
