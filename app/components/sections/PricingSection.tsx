"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter Creator",
    price: "₹14,999",
    period: "month",
    description: "Perfect for personal brands & individual creators looking to dominate reels.",
    features: [
      "5 custom-edited Reels per month",
      "1 On-location shoot (up to 2 hours)",
      "Standard 10-Minute Delivery pipeline",
      "Dynamic captions & trendy soundtracks",
      "1 Revision per video",
    ],
    badge: "Solo",
    isPopular: false,
  },
  {
    name: "Growth Brand",
    price: "₹39,999",
    period: "month",
    description: "Specially designed for growing startups, agencies, and e-commerce brands.",
    features: [
      "15 custom-edited Reels per month",
      "2 On-location shoots (up to 4 hours total)",
      "Priority 10-Minute Delivery pipeline",
      "A/B Hook testing & advanced editing",
      "Unlimited revisions",
      "Native scripting & hooks strategy",
    ],
    badge: "Best Value",
    isPopular: true,
  },
  {
    name: "Bespoke Scale",
    price: "Custom",
    period: "tailored",
    description: "For corporate brands and enterprise media teams seeking complete production dominance.",
    features: [
      "Unlimited Reels & long-form cuts",
      "Dedicated creative director & producer",
      "Multiple weekly shoots on-demand",
      "Hyper-priority SLA delivery",
      "Custom brand style kits",
      "Full digital rights & source file access",
    ],
    badge: "Elite",
    isPopular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-24 pb-36 z-10 selection:bg-red-500/30">
      
      {/* Glow Effect */}
      <div className="absolute bottom-12 right-1/4 w-[500px] h-[250px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-[10px] sm:text-xs uppercase tracking-[4px] text-red-400 rounded-full font-semibold"
        >
          INVESTMENT & TIER PLANS
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black uppercase text-white mt-6 tracking-tight"
        >
          CHOOSE YOUR <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">VIRAL GEAR</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mt-4"
        >
          Premium video content crafted, shot, and delivered in minutes. Transparent pricing for creators and brands.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative items-stretch">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, type: "spring", stiffness: 70 }}
            whileHover={{ y: -10 }}
            className={`group relative flex flex-col justify-between border rounded-[32px] p-8 md:p-10 transition-all duration-300 shadow-2xl ${
              plan.isPopular
                ? "border-red-500 bg-gradient-to-b from-zinc-900/60 to-zinc-950/90 ring-1 ring-red-500/30 scale-[1.03] lg:scale-[1.04] z-20"
                : "border-white/5 bg-zinc-950/30 backdrop-blur-xl z-10"
            }`}
          >
            {/* Glowing red backlighting for popular plans */}
            {plan.isPopular && (
              <div className="absolute inset-0 bg-red-600/5 blur-xl -z-10 rounded-[32px] pointer-events-none" />
            )}

            <div>
              {/* Header section */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] bg-white/5 border border-white/10 text-zinc-300 font-bold px-2.5 py-0.8 rounded-full uppercase tracking-wider">
                    {plan.badge}
                  </span>
                  <h3 className="text-xl font-extrabold uppercase text-white mt-3 tracking-wide">
                    {plan.name}
                  </h3>
                </div>
                {plan.isPopular && (
                  <span className="text-[9px] bg-red-600 border border-red-500 text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                    🔥 POPULAR
                  </span>
                )}
              </div>

              {/* Price section */}
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tight">{plan.price}</span>
                <span className="text-zinc-500 text-xs sm:text-sm font-semibold">/ {plan.period}</span>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed mb-8 border-b border-white/5 pb-6">
                {plan.description}
              </p>

              {/* Features list */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-xs md:text-sm text-zinc-300">
                    <span className="text-red-500 font-extrabold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg transition-all duration-300 cursor-pointer ${
                plan.isPopular
                  ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-red-500/20 hover:from-red-500 hover:to-red-400"
                  : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
              }`}
            >
              Get Started Now
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
