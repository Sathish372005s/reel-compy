/// <reference path="../../types/aos.d.ts" />
"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Sparkles, ArrowUpRight, Film, Camera, Heart, User, Briefcase, Star } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Pre-Wedding",
    description: "Beautiful cinematic love stories captured before your big day.",
    icon: Heart,
    badge: "Cinema"
  },
  {
    title: "Post Wedding",
    description: "Create timeless memories after the wedding celebrations.",
    icon: Sparkles,
    badge: "Memories"
  },
  {
    title: "Engagement",
    description: "Capture every smile and special moment of your engagement.",
    icon: Camera,
    badge: "Shoot"
  },
  {
    title: "Haldi",
    description: "Vibrant and joyful Haldi ceremony coverage with cinematic storytelling.",
    icon: Star,
    badge: "Vibrant"
  },
  {
    title: "Sangeet",
    description: "High-energy coverage of dance, music, and unforgettable moments.",
    icon: Film,
    badge: "Energy"
  },
  {
    title: "Wedding",
    description: "Complete wedding photography and videography with cinematic edits.",
    icon: Heart,
    badge: "Elite"
  },
  {
    title: "Reception",
    description: "Elegant reception coverage highlighting every memorable detail.",
    icon: Sparkles,
    badge: "Elegant"
  },
  {
    title: "Birthday",
    description: "Capture celebrations, laughter, and memories that last forever.",
    icon: User,
    badge: "Events"
  },
  {
    title: "Business",
    description: "Professional corporate photography and video production services.",
    icon: Briefcase,
    badge: "Corporate"
  },
  {
    title: "Brand Events",
    description: "Showcase your brand through premium event coverage and content.",
    icon: Briefcase,
    badge: "Marketing"
  },
  {
    title: "Content Creators",
    description: "High-quality reels, shorts, and creator-focused visual content.",
    icon: Film,
    badge: "Social"
  },
  {
    title: "Others",
    description: "Customized photography and videography solutions for any occasion.",
    icon: Star,
    badge: "Custom"
  },
];

export default function ServicesSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="relative pt-6 pb-24 px-5">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 px-6 py-2 text-xs uppercase tracking-[4px] text-yellow-400">
            <Sparkles className="h-3.5 w-3.5 text-yellow-400 animate-pulse" />
            Our Services
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-black text-white">
            What We
            <span className="text-yellow-400">
              {" "}
              Capture
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            From weddings to brand campaigns, we create
            premium visual stories that leave lasting impressions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link 
                href="/contact" 
                key={service.title}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="
                  group
                  relative
                  flex flex-col justify-between
                  overflow-hidden
                  rounded-3xl
                  border border-amber-300/10
                  bg-zinc-950/50
                  backdrop-blur-xl
                  p-6 sm:p-7
                  min-h-[220px]
                  cursor-pointer
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:border-amber-400/30
                  hover:shadow-[0_0_30px_rgba(245,158,11,0.06)]
                "
              >
                {/* Monogram / Icon Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl border border-amber-300/20 bg-amber-500/5 flex items-center justify-center text-amber-300 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-black">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                    {service.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-end mt-4">
                  <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-amber-200 transition-colors duration-300 tracking-wide">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Corner Arrow Indicator */}
                <div className="absolute bottom-5 right-5 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-amber-300 transition-colors duration-300" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
