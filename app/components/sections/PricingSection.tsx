"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, Check, PhoneCall, Calendar } from "lucide-react";

const reelPlans = [
  {
    name: "Creator Launch",
    subtitle: "Hourly Plan",
    price: "₹4,999",
    period: "shoot",
    description: "2-hour professional DSLR creator package to launch your social feed.",
    features: [
      "2 hour professional DSLR shoot",
      "1 Cinematic Edited Reel",
      "Professional Color Grading",
      "Fast Delivery within 10 mins",
      "Best Reel Creators",
      "Flareels Branding Included",
    ],
    badge: "Hourly Plan",
    isPopular: false,
  },
  {
    name: "Creator Pro",
    subtitle: "Half-Day Plan",
    price: "₹7,999",
    period: "shoot",
    description: "4-hour professional DSLR shoot, content planning, and rapid editing.",
    features: [
      "4 hours professional DSLR shoot",
      "2 Cinematic Edited Reels",
      "Professional Color Grading",
      "Fast Delivery within 10 mins",
      "Content Planning Assistance",
      "Best Reel Creators",
      "Flareels Branding Included",
    ],
    badge: "Creator Pro",
    isPopular: true,
  },
];

const weddingPlans = [
  {
    name: "Basic",
    subtitle: "Single Event",
    price: "₹14,999",
    period: "event",
    description: "Clean DSLR memories crafted beautifully within your budget.",
    features: [
      "Covers one event",
      "3 Edited Reels",
      "Shot on DSLR (Sony)",
      "Instant Reel Delivery",
      " please provide on all the pricing list before sd card",
      "Flareels logo Mandatory",
    ],
    badge: "Single Event",
    isPopular: false,
  },
  {
    name: "Pro",
    subtitle: "Three Events",
    price: "₹44,999",
    period: "pkg",
    description: "Enhanced Cinematic storytelling with added creative elegance.",
    features: [
      "Covers 3 Events",
      "10 Edited Reels",
      "Shot on DSLR (Sony)",
      "Instant Reel Delivery",
      "SD Card/Pendrive raw content delivery",
      "Flareels logo Mandatory",
    ],
    badge: "Three Events",
    isPopular: false,
  },
  {
    name: "Premium",
    subtitle: "Four Events",
    price: "₹59,999",
    period: "pkg",
    description: "Enhanced Cinematic storytelling with added creative elegance.",
    features: [
      "Covers 4 Events",
      "15 Edited Reels",
      "Shot on DSLR (Sony)",
      "Instant Reel Delivery",
      "SD Card/Pendrive raw content delivery",
      "Flareels logo Mandatory",
    ],
    badge: "Four Events",
    isPopular: true,
  },
  {
    name: "Premium Pro",
    subtitle: "Complete Wedding",
    price: "₹99,999",
    period: "full wedding",
    description: "The complete wedding experience with exclusive Cinematic addons & Signature Elegance.",
    features: [
      "Covers complete wedding events",
      "25 Edited Reels",
      "Instant Reel Delivery",
      "Shot on DSLR (Sony)",
      "SD Card raw content delivery",
      "No Watermark / Non-Mandatory",
    ],
    badge: "Complete Wedding",
    isPopular: false,
  },
];

const businessPlans = [
  {
    name: "Business & Brands",
    subtitle: "Customized Package",
    price: "Custom Pricing",
    period: "package",
    description:
      "Built for businesses looking to showcase products, services, and brand identity with cinematic DSLR visuals and high-impact content.",
    features: [
      "Professional DSLR Coverage",
      "Brand Storytelling Reels",
      "Product & Service Showcase",
      "Cinematic Color Grading",
      "Business Interview Clips",
      "Professional Editing on Mac",
      "Team & Workplace Highlights",
      "Social Media Ready Reels",
      "Fast Delivery",
      "Raw Footage Available on Request",
    ],
    badge: "Customized Pricing",
    isPopular: false,
  },
];

const getWhatsAppText = (plan: typeof reelPlans[number]) => {
  const templates = [
    `Hi Flareels, I’m interested in the ${plan.name} (${plan.subtitle}) plan. Please share the full details.`,
    `Hello! I’d like to know more about the ${plan.name} (${plan.subtitle}) package. ${plan.description}`,
    `Hi team, I’m looking at the ${plan.name} (${plan.subtitle}) plan. Could you send me the exact pricing and features?`,
  ];

  const hash = Array.from(plan.name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const templateIndex = hash % templates.length;
  const intro = templates[templateIndex];
  return encodeURIComponent(`${intro} Features: ${plan.features.join(", ")}`);
};

export default function PricingSection() {
  const [activeCategory, setActiveCategory] = useState<"reel" | "wedding">("reel");

  const renderCard = (plan: typeof reelPlans[number], idx: number) => {
    return (
      <motion.div
        key={plan.name}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.1, type: "spring", stiffness: 70 }}
        whileHover={{ y: -8 }}
        className={`group relative flex flex-col justify-between border rounded-[28px] p-6 sm:p-8 transition-all duration-300 shadow-2xl ${
          plan.isPopular
            ? "border-amber-300/80 bg-gradient-to-b from-[#171105]/80 to-zinc-950/95 ring-1 ring-amber-300/35 z-20"
            : "border-white/5 bg-zinc-950/30 backdrop-blur-xl z-10"
        }`}
      >
        <div className="z-40">
          <img
            src="logo.png"
            alt="logo"
            width={120}
            height={120}
            className="rounded-2xl"
          />
        </div>
        {plan.isPopular && (
          <div className="absolute inset-0 bg-amber-400/8 blur-xl -z-10 rounded-[28px] pointer-events-none" />
        )}

        <div>
          {/* Header */}
          <div className="flex justify-between items-start gap-2 mb-6">
            <div>
              <span className="text-[9px] bg-white/5 border border-white/10 text-zinc-300 font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {plan.badge}
              </span>
              <h3 className="text-lg sm:text-xl font-black uppercase text-white mt-3 tracking-wide">
                {plan.name}
              </h3>
              <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest mt-1">
                {plan.subtitle}
              </p>
            </div>
            {plan.isPopular && (
              <span className="shrink-0 text-[8px] sm:text-[9px] bg-amber-300 border border-amber-200 text-black font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse">
                🔥 POPULAR
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 mb-5">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">{plan.price}</span>
            <span className="text-zinc-500 text-xs sm:text-sm">/ {plan.period}</span>
          </div>

          <p className="text-zinc-400 text-xs leading-relaxed mb-6 border-b border-white/5 pb-5">
            {plan.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, fIdx) => (
              <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                <Check className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <Link href={`/contact?package=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`} className="block w-full">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md transition-all duration-300 cursor-pointer ${
                plan.isPopular
                  ? "bg-gradient-to-r from-[#8a5a08] via-[#f6c65b] to-[#fff1b8] text-black shadow-amber-500/20 hover:from-[#b77912] hover:via-[#ffd36e] hover:to-[#fff6cf]"
                  : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
              }`}
            >
              Book Now
            </motion.button>
          </Link>
          <a
            href={`https://wa.me/919866695553?text=${getWhatsAppText(plan)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
          >
            <PhoneCall className="h-3 w-3" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-14 pb-20 sm:px-6 z-10 selection:bg-amber-400/30">
      
      {/* Background Glow */}
      <div className="absolute bottom-12 right-1/4 hidden h-[250px] w-[500px] rounded-full bg-amber-400/5 blur-[100px] pointer-events-none sm:block" />

      {/* Main Headers */}
      <div className="text-center mb-10 sm:mb-16">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black uppercase text-white mt-5 sm:mt-6 tracking-tight"
        >
          CHOOSE YOUR <span className="bg-gradient-to-r from-[#8a5a08] via-[#f6c65b] to-[#fff1b8] bg-clip-text text-transparent">VIRAL GEAR</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mt-4"
        >
          Transparent pricing for creators and events. Lock in professional production services delivered within minutes.
        </motion.p>

        {/* Mobile Toggle Switcher Button (hidden on large displays) */}
        <div className="mt-8 flex justify-center md:hidden">
          <div className="relative flex p-1 rounded-full border border-amber-300/10 bg-black/60 backdrop-blur-md max-w-xs w-full">
            {/* Slider back */}
            <div
              className="absolute inset-y-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-300 ease-out"
              style={{
                width: "calc(50% - 6px)",
                left: activeCategory === "reel" ? "6px" : "calc(50% - 0px)",
                top: "6px",
                bottom: "6px",
              }}
            />
            <button
              onClick={() => setActiveCategory("reel")}
              className={`relative z-10 w-1/2 py-2 text-[10px] font-black uppercase tracking-wider rounded-full transition-colors duration-300 select-none cursor-pointer ${
                activeCategory === "reel" ? "text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              Reel Plans
            </button>
            <button
              onClick={() => setActiveCategory("wedding")}
              className={`relative z-10 w-1/2 py-2 text-[10px] font-black uppercase tracking-wider rounded-full transition-colors duration-300 select-none cursor-pointer ${
                activeCategory === "wedding" ? "text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              Wedding Plans
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE CONTENT RENDER (either Reel or Wedding depending on toggle state) */}
      <div className="block md:hidden">
        <AnimatePresence mode="wait">
          {activeCategory === "reel" ? (
            <motion.div
              key="mobile-reel"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-6"
            >
              {reelPlans.map((plan, idx) => renderCard(plan, idx))}
            </motion.div>
          ) : (
            <motion.div
              key="mobile-wedding"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-6"
            >
              {weddingPlans.map((plan, idx) => renderCard(plan, idx))}
              {businessPlans.map((plan, idx) => renderCard(plan, weddingPlans.length + idx))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DESKTOP CONTENT RENDER (stacked vertically: Reel packages at the top, Wedding packages below) */}
      <div className="hidden md:flex flex-col gap-16">
        
        {/* Section 1: Professional Reel Packages */}
        <div>
          <div className="border-b border-amber-300/10 pb-4 mb-8">
            <h3 className="text-xl font-extrabold uppercase text-amber-200 flex items-center gap-2 tracking-widest">
              <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
              Professional Reel Packages
            </h3>
            <p className="text-xs text-zinc-500 font-mono mt-1">HOURLY & HALF-DAY CREATOR OPTIONS</p>
          </div>
          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
            {reelPlans.map((plan, idx) => renderCard(plan, idx))}
          </div>
        </div>

        {/* Section 2: Brand Elite Packages for Weddings */}
        <div>
          <div className="border-b border-amber-300/10 pb-4 mb-8">
            <h3 className="text-xl font-extrabold uppercase text-amber-200 flex items-center gap-2 tracking-widest">
              <Calendar className="h-4 w-4 text-amber-300 animate-pulse" />
              Brand Elite Packages for Weddings
            </h3>
            <p className="text-xs text-zinc-500 font-mono mt-1">SINGLE & MULTI-EVENT CUSTOM COVERAGES</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {weddingPlans.map((plan, idx) => renderCard(plan, idx))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-md">
              {businessPlans.map((plan, idx) => renderCard(plan, weddingPlans.length + idx))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
