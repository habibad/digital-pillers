import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import MetricsStrip from "@/components/home/MetricsStrip";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import OutcomesSection from "@/components/home/OutcomesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/home/Footer";
import FaqAssistant from "@/components/ui/FaqAssistant";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <MetricsStrip />
      <ServicesSection />
      <ProcessSection />
      <OutcomesSection />
      <TestimonialsSection />
      <PhilosophySection />
      <FinalCTA />
      <Footer />
      <FaqAssistant />
    </main>
  );
}
