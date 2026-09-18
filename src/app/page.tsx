"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { GroundworkSection } from "@/components/sections/GroundworkSection";
import { PillarsTourSection } from "@/components/sections/PillarsTourSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { SignalSection } from "@/components/sections/SignalSection";
import { AssemblySection } from "@/components/sections/AssemblySection";
import { ServicesBentoSection } from "@/components/sections/ServicesBentoSection";
import { FoundationLayersSection } from "@/components/sections/FoundationLayersSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { InquiryTerminalSection } from "@/components/sections/InquiryTerminalSection";
import { Footer } from "@/components/navigation/Footer";
import { ServiceDetailModal } from "@/components/modals/ServiceDetailModal";
import { AiAssistantWidget } from "@/components/widgets/AiAssistantWidget";

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <main className="relative bg-[#030303] text-[#f4f4f6] min-h-screen overflow-hidden selection:bg-blue-600/30 selection:text-white">
      {/* Master Navigation */}
      <Navbar />

      {/* Hero Atmosphere & 3D Focal Video */}
      <HeroSection />

      {/* Chapter I — The Groundwork & 3D Interactive Card */}
      <GroundworkSection />

      {/* The Three Pillars Core Tour */}
      <PillarsTourSection />

      {/* The Construction Method */}
      <MethodSection />

      {/* Chapter II — The Signal Data HUD */}
      <SignalSection />

      {/* Chapter III — The Assembly Ecosystem */}
      <AssemblySection />

      {/* The 6-Service Master Bento Suite */}
      <ServicesBentoSection onSelectService={(key) => setSelectedService(key)} />

      {/* Foundation Architecture Layers */}
      <FoundationLayersSection />

      {/* Social Proof & Client Impact Ledger */}
      <SocialProofSection />

      {/* High-Conversion Inquiry Terminal & Brief Strength Meter */}
      <InquiryTerminalSection />

      {/* Minimalist Studio Footer */}
      <Footer />

      {/* Floating Interactive AI Assistant Widget */}
      <AiAssistantWidget />

      {/* Service Deep Dive Modal Overlay */}
      <ServiceDetailModal
        serviceKey={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectService={(key) => setSelectedService(key)}
      />
    </main>
  );
}
