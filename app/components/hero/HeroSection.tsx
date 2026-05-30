"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import PhoneMockup from "./Phonehero";

interface HeroSectionProps {
  screen: "home" | "splash" | "instagram";
  setScreen: (screen: "home" | "splash" | "instagram") => void;
}

export default function HeroSection({ screen, setScreen }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the parent container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply smooth spring physics to scroll values
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.5,
  });

  // Transform values linked to scroll progress:
  // Fades out and shifts the hero text upward
  const textOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.45], [1, 0.92]);
  const textY = useTransform(smoothProgress, [0, 0.45], [0, -60]);

  // Moves phone up from a peeking layout to fully centered/revealed, scaling it and removing 3D tilt
  const phoneY = useTransform(smoothProgress, [0, 0.85], ["72vh", "0vh"]);
  const phoneScale = useTransform(smoothProgress, [0, 0.85], [0.85, 1.05]);
  const phoneRotateX = useTransform(smoothProgress, [0, 0.85], [20, 0]);

  // Listen for scroll changes to open Instagram when fully centered
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.85) {
      if (screen === "home") {
        setScreen("splash");
      }
    } else if (latest < 0.75) {
      if (screen !== "home") {
        setScreen("home");
      }
    }
  });

  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => {
        setScreen("instagram");
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [screen, setScreen]);

  return (
    <div ref={containerRef} className="relative h-[180vh] w-full selection:bg-red-500/30">
      
      {/* Sticky Inner Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between perspective-[1200px]">
        {/* Dynamic Foreground Content */}
        <div className="relative  z-10 flex flex-col h-full w-full justify-between pb-0">

          {/* Hero Main Content */}
          <div className="w-full mb-5 flex-grow flex flex-col items-center justify-start pt-28 sm:pt-36 px-6 text-center z-10 select-none">
            
            <motion.span
              style={{ opacity: textOpacity }}
              className="
                mb-4
                border
                border-red-500/20
                bg-red-500/10
                px-5
                py-1.5
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[3px]
                sm:tracking-[5px]
                text-red-400
                rounded-full
                font-semibold
              "
            >
              WORLD&apos;S FIRST QUICK CONTENT SERVICE
            </motion.span>
            {/* CTA BUTTONS: Book Now & Our Services */}
           

            <motion.h1
              style={{ opacity: textOpacity, scale: textScale, y: textY }}
              className="
                max-w-4xl
                text-3xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                font-black
                uppercase
                leading-[1.1]
                tracking-tight
                text-white
              "
            >
              We Shoot • Edit • Deliver Reels in <br />
              <span
                className="
                  text-5xl
                  sm:text-7xl
                  md:text-8xl
                  lg:text-9xl
                  font-black
                  bg-gradient-to-r
                  from-red-500
                  via-red-600
                  to-orange-500
                  bg-clip-text
                  text-transparent
                  tracking-tighter
                "
              >
                10 Minutes*
              </span>
            </motion.h1>

            
          </div>

        </div>

        {/* Interactive Phone Mockup Container (z-50 guarantees it overlays the navbar header z-40) */}
        <div className="absolute  inset-x-0 flex justify-center z-50 pointer-events-none select-none">
          <PhoneMockup
            className="pointer-events-auto origin-top"
            style={{
              y: phoneY,
              scale: phoneScale,
              rotateX: phoneRotateX,
              transformPerspective: 1200,
            }}
            screen={screen}
            setScreen={setScreen}
          />
        </div>

      </div>
    </div>
  );
}
