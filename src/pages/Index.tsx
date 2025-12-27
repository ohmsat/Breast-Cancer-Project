import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatisticsSection from "@/components/StatisticsSection";
import ServicesSection from "@/components/ServicesSection";
import RiskAssessmentSection from "@/components/RiskAssessmentSection";
import VideosSection from "@/components/VideosSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatisticsSection />
        <ServicesSection />
        <RiskAssessmentSection />
        <VideosSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
