"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useMotionValue, AnimatePresence } from "framer-motion";
import CameraMockup from "./Phonehero";

interface HeroSectionProps {
  screen: "home" | "splash" | "instagram";
  setScreen: (screen: "home" | "splash" | "instagram") => void;
}

export default function HeroSection({ screen, setScreen }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const [cameraStartY, setCameraStartY] = useState("72vh");
  const [flashActive, setFlashActive] = useState(false);

  // Mouse tilt tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // High-fidelity spring response
  const springMouseX = useSpring(mouseX, { damping: 45, stiffness: 120 });
  const springMouseY = useSpring(mouseY, { damping: 45, stiffness: 120 });
  
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

  // Moves camera up from a peeking layout to fully centered/revealed, scaling it and removing 3D tilt
  const cameraY = useTransform(smoothProgress, [0, 0.75], [cameraStartY, "0vh"]);
  const cameraScale = useTransform(smoothProgress, [0, 0.75], [0.82, 1.02]);
  const cameraRotateX = useTransform(smoothProgress, [0, 0.75], [18, 0]);

  // Combine scroll pitch rotation with dynamic mouse vertical tilt
  const cameraRotateXCombined = useTransform(
    [cameraRotateX, springMouseY],
    ([scrollRotX, mouseRotY]) => Number(scrollRotX) + Number(mouseRotY)
  );

  // Use horizontal mouse tilt for yaw rotation
  const cameraRotateYCombined = springMouseX;

  // Cinematic Flanking scrolling texts (slide in between 45% and 70% scroll progress)
  const leftX = useTransform(smoothProgress, [0.45, 0.70], [-100, 0]);
  const leftOpacity = useTransform(smoothProgress, [0.48, 0.70], [0, 1]);

  const rightX = useTransform(smoothProgress, [0.45, 0.70], [100, 0]);
  const rightOpacity = useTransform(smoothProgress, [0.48, 0.70], [0, 1]);



  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Relative coordinates (-0.5 to 0.5) from center
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Scale to premium 3D camera angles
    mouseX.set(relX * 24);
    mouseY.set(relY * -16);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const syncNavbarVisibility = () => {
    const cameraBounds = cameraRef.current?.getBoundingClientRect();
    const navbar = document.querySelector<HTMLElement>("[data-site-navbar]");

    if (cameraBounds && navbar) {
      const navBounds = navbar.getBoundingClientRect();
      const cameraTouchesNavbar =
        cameraBounds.left < navBounds.right &&
        cameraBounds.right > navBounds.left &&
        cameraBounds.top < navBounds.bottom &&
        cameraBounds.bottom > navBounds.top;

      window.dispatchEvent(
        new CustomEvent("hero-phone-over-header", {
          detail: { overHeader: cameraTouchesNavbar },
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
    const syncCameraStart = () => {
      setCameraStartY(mediaQuery.matches ? "35vh" : "72vh");
    };

    syncCameraStart();
    mediaQuery.addEventListener("change", syncCameraStart);
    window.addEventListener("resize", syncNavbarVisibility);
    window.addEventListener("scroll", syncNavbarVisibility, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", syncCameraStart);
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
      setFlashActive(true);
      const flashTimer = setTimeout(() => {
        setFlashActive(false);
      }, 700);

      const timer = setTimeout(() => {
        setScreen("instagram");
      }, 900);
      return () => {
        clearTimeout(flashTimer);
        clearTimeout(timer);
      };
    }
  }, [screen, setScreen]);

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[102vh] w-full selection:bg-amber-400/30 sm:h-[155vh] lg:h-[170vh]"
    >
      
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

        {/* Cinematic Flanking Scrolling Texts (slide in between 45% and 70% scroll progress) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-12 md:px-20 lg:px-32 pointer-events-none select-none z-30 hidden sm:flex">
          
          {/* Left Text: SHOOT ON DSLR */}
          <motion.div
            style={{ x: leftX, opacity: leftOpacity }}
            className="flex flex-col items-start text-left max-w-[150px] sm:max-w-[240px] md:max-w-[280px]"
          >
            <span className="text-[7px] sm:text-[9px] md:text-[10px] tracking-[4px] sm:tracking-[6px] text-amber-500 font-extrabold uppercase mb-1 sm:mb-2">
              ELITE PRODUCTION
            </span>
            <h2 className="text-sm sm:text-3xl md:text-5xl font-black uppercase text-white leading-[1.05] tracking-tight">
              SHOOT ON <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-250 to-yellow-500 bg-clip-text text-transparent">
                DSLR
              </span>
            </h2>
            <div className="h-0.5 w-8 sm:w-12 bg-amber-500/50 mt-1.5 sm:mt-3" />
          </motion.div>

          {/* Right Text: READY AT 10MIN */}
          <motion.div
            style={{ x: rightX, opacity: rightOpacity }}
            className="flex flex-col items-end text-right max-w-[150px] sm:max-w-[240px] md:max-w-[280px]"
          >
            <span className="text-[7px] sm:text-[9px] md:text-[10px] tracking-[4px] sm:tracking-[6px] text-amber-500 font-extrabold uppercase mb-1 sm:mb-2">
              TURBO DELIVERIES
            </span>
            <h2 className="text-sm sm:text-3xl md:text-5xl font-black uppercase text-white leading-[1.05] tracking-tight">
              READY AT <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-250 to-yellow-500 bg-clip-text text-transparent">
                10MIN*
              </span>
            </h2>
            <div className="h-0.5 w-8 sm:w-12 bg-amber-500/50 mt-1.5 sm:mt-3" />
          </motion.div>

        </div>

        {/* Interactive Camera Mockup Container (z-50 guarantees it overlays the navbar header z-40) */}
        <div className="absolute inset-x-0 top-[18vh] sm:top-0 flex justify-center z-50 pointer-events-none select-none">
          <CameraMockup
            ref={cameraRef}
            className="pointer-events-auto origin-top"
            style={{
              y: cameraY,
              scale: cameraScale,
              rotateX: cameraRotateXCombined,
              rotateY: cameraRotateYCombined,
              transformPerspective: 1200,
            }}
            screen={screen}
            setScreen={setScreen}
            flashActive={flashActive}
          />
        </div>

      </div>

      {/* Screen-Wide DSLR Studio Flash Overlay */}
      <AnimatePresence>
        {flashActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, times: [0, 0.1, 0.35, 1], ease: "easeOut" }}
            className="fixed inset-0 z-[9999] pointer-events-none bg-white flex items-center justify-center"
          >
            {/* Soft high-fidelity lens flare glow */}
            <div className="absolute w-[80vw] h-[80vw] bg-amber-100 rounded-full filter blur-[150px] opacity-45 mix-blend-screen" />
            
            {/* Shutter Blade Graphic Effect */}
            <motion.div 
              initial={{ scale: 2 }}
              animate={{ scale: [2, 0.8, 2] }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-48 h-48 border-[12px] border-zinc-800/40 rounded-full flex items-center justify-center opacity-10"
            >
              <div className="w-36 h-36 border-[6px] border-zinc-700/30 rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
