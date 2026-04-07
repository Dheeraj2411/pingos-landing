import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import HowItWorks from "@/components/HowItWorks";
import ProductPreview from "@/components/ProductPreview";
import PricingSection from "@/components/PricingSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
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

        <PricingSection />

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
