"use client";

import { useState } from "react";
import HeroSection from "./components/hero/HeroSection";
import WorkFlowSection from "./components/sections/WorkFlowSection";
import PricingSection from "./components/sections/PricingSection";
import Footer from "./components/Footer";

export default function HomePage() {
  const [screen, setScreen] = useState<"home" | "splash" | "instagram">("home");

  return (
    <main className="min-h-screen text-white relative">

      {/* 
        Hero Section containing the scrollable phone mockup.
        Updates screen state to trigger unlocking elements below.
      */}
      <div className="relative z-10 mt-5 w-full">
        <HeroSection screen={screen} setScreen={setScreen} />
      </div>

      {/* 
        Scroll-Locked Wrapper container:
        Expands dynamically to reveal the rest of the website only when 
        the phone mockup has opened Instagram in the header.
      */}
      <div
        className={`relative z-10 transition-all duration-1000 ease-in-out origin-top ${screen === "instagram"
            ? "opacity-100 max-h-[5000px] pointer-events-auto filter blur-none -mt-20 sm:mt-0"
            : "opacity-0 max-h-0 overflow-hidden pointer-events-none filter blur-md"
          }`}
      >
        <div className="w-full">
          <WorkFlowSection />
        </div>

        <div className="w-full">
          <PricingSection />
        </div>

        <Footer />
      </div>
    </main>
  );
}
