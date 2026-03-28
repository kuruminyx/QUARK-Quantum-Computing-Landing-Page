import ParticleCanvas from "@/components/ParticleCanvas";
import HeroSection from "@/components/HeroSection";
import WhatWeBuiltSection from "@/components/WhatWeBuiltSection";
import UseCasesSection from "@/components/UseCasesSection";
import QubitVisualizer from "@/components/QubitVisualizer";
import PerformanceBenchmark from "@/components/PerformanceBenchmark";
import InvestorsSection from "@/components/InvestorsSection";
import EarlyAccessSection from "@/components/EarlyAccessSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ scrollBehavior: "smooth" }}>
      <ParticleCanvas />
      <div className="relative" style={{ zIndex: 1 }}>
        <HeroSection />
        <WhatWeBuiltSection />
        <UseCasesSection />
        <QubitVisualizer />
        <PerformanceBenchmark />
        <InvestorsSection />
        <EarlyAccessSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
