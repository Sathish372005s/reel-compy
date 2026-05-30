"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import PhoneMockup from "./Phonehero";

interface HeroSectionProps {
  screen: "home" | "splash" | "instagram";
  setScreen: (screen: "home" | "splash" | "instagram") => void;
}

export default function HeroSection({ screen, setScreen }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [phoneStartY, setPhoneStartY] = useState("72vh");
  
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
  const phoneY = useTransform(smoothProgress, [0, 0.75], [phoneStartY, "0vh"]);
  const phoneScale = useTransform(smoothProgress, [0, 0.75], [0.85, 1.05]);
  const phoneRotateX = useTransform(smoothProgress, [0, 0.75], [20, 0]);

  const syncNavbarVisibility = () => {
    const phoneBounds = phoneRef.current?.getBoundingClientRect();
    const navbar = document.querySelector<HTMLElement>("[data-site-navbar]");

    if (phoneBounds && navbar) {
      const navBounds = navbar.getBoundingClientRect();
      const phoneTouchesNavbar =
        phoneBounds.left < navBounds.right &&
        phoneBounds.right > navBounds.left &&
        phoneBounds.top < navBounds.bottom &&
        phoneBounds.bottom > navBounds.top;

      window.dispatchEvent(
        new CustomEvent("hero-phone-over-header", {
          detail: { overHeader: phoneTouchesNavbar },
        })
      );
    }
  };

  // Listen for scroll changes to open Instagram when fully centered
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.75) {
      if (screen === "home") {
        setScreen("splash");
      }
    } else if (latest < 0.65) {
      if (screen !== "home") {
        setScreen("home");
      }
    }

    syncNavbarVisibility();
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const syncPhoneStart = () => {
      setPhoneStartY(mediaQuery.matches ? "54vh" : "72vh");
    };

    syncPhoneStart();
    mediaQuery.addEventListener("change", syncPhoneStart);
    window.addEventListener("resize", syncNavbarVisibility);
    window.addEventListener("scroll", syncNavbarVisibility, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", syncPhoneStart);
      window.removeEventListener("resize", syncNavbarVisibility);
      window.removeEventListener("scroll", syncNavbarVisibility);
    };
  }, []);

  useEffect(() => {
    return () => {
      window.dispatchEvent(
        new CustomEvent("hero-phone-over-header", {
          detail: { overHeader: false },
        })
      );
    };
  }, []);

  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => {
        setScreen("instagram");
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [screen, setScreen]);

  return (
    <div ref={containerRef} className="relative h-[122vh] w-full selection:bg-amber-400/30 sm:h-[155vh] lg:h-[170vh]">
      
      {/* Sticky Inner Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between perspective-[1200px]">
        {/* Dynamic Foreground Content */}
        <div className="relative  z-10 flex flex-col h-full w-full justify-between pb-0">

          {/* Hero Main Content */}
          <div className="w-full mb-3 flex-grow flex flex-col items-center justify-start pt-24 sm:pt-32 lg:pt-36 px-4 sm:px-6 text-center z-10 select-none">
            
            <motion.span
              style={{ opacity: textOpacity }}
              className="
                mb-3
                border
                border-amber-300/25
                bg-amber-300/10
                px-5
                py-1.5
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[2px]
                sm:tracking-[5px]
                text-amber-200
                rounded-full
                font-semibold
              "
            >
              INDIA&apos;S FIRST QUICK CONTENT SERVICE VIA DSLR
            </motion.span>
            {/* CTA BUTTONS: Book Now & Our Services */}
           

            <motion.h1
              style={{ opacity: textOpacity, scale: textScale, y: textY }}
              className="
                max-w-4xl
                text-[2rem]
                sm:text-4xl
                md:text-5xl
                lg:text-6.7xl
                font-black
                uppercase
                leading-[1.1]
                tracking-tight
                text-white
              "
            >
              Shoot On Dslr • Edit On Mac • Deliver Reels in <br />
              <span
                className="
                  text-[3rem]
                  sm:text-3xl
                  md:text-8xl
                  lg:text-9xl
                  font-black
                  bg-gradient-to-r
                  from-[#8a5a08]
                  via-[#f6c65b]
                  to-[#fff1b8]
                  bg-clip-text
                  text-transparent
                  tracking-tighter
                "
              >
                <div className="lg:h-[30px] w-auto"></div>
                10 Minutes*
              </span>
            </motion.h1>


            
          </div>

        </div>

        {/* Interactive Phone Mockup Container (z-50 guarantees it overlays the navbar header z-40) */}
        <div className="absolute inset-x-0 flex justify-center z-50 pointer-events-none select-none">
          <PhoneMockup
            ref={phoneRef}
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
