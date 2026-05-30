"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { MotionStyle } from "framer-motion";

interface CameraMockupProps {
  className?: string;
  style?: MotionStyle;
  screen: "home" | "splash" | "instagram";
  setScreen?: (screen: "home" | "splash" | "instagram") => void;
  flashActive?: boolean;
}

const CameraMockup = forwardRef<HTMLDivElement, CameraMockupProps>(function CameraMockup(
  { className, style, screen, setScreen, flashActive = false },
  ref
) {


  return (
    <motion.div
      ref={ref}
      style={{
        ...style,
        transformStyle: "preserve-3d",
      }}
      className={`relative flex h-[45vh] min-h-[320px] sm:h-[75vh] sm:min-h-[440px] w-screen items-center justify-center px-4 sm:px-8 lg:px-12 select-none pointer-events-none ${className || ""}`}
    >
      {/* Main 3D DSLR Camera Wrapper */}
      <motion.div
        onClick={() => screen === "home" && setScreen?.("splash")}
        className="group relative flex flex-col items-center justify-center pointer-events-auto cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
        }}
        // Click trigger for capture zoom flash response
        animate={flashActive ? { scale: [1, 0.96, 1.04, 1] } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Cinematic Rim Lighting & Volumetric Studio Glow behind the camera */}
        <motion.div
          className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full bg-amber-500/10 blur-[80px] z-0"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.6, 0.35]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] rounded-full bg-yellow-600/5 blur-[100px] z-0"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* CONTAINER FOR DYNAMIC FLOATING GIMBAL DSLR */}
        <motion.div 
          className="relative w-[280px] h-[295px] sm:w-[440px] sm:h-[528px] md:w-[500px] md:h-[600px] lg:w-[580px] lg:h-[696px] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
          // Slow Cinematic Floating Motion (Idle animation)
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Ultra-Realistic generated 3D Sony DSLR Camera on Gimbal */}
          <img
            src="/dslr-gimbal-hero.png"
            alt="Ultra-realistic 3D Sony DSLR Camera mounted on Ronin Gimbal Stabilizer"
            className="w-full h-full object-contain filter brightness-[1.03] drop-shadow-[0_35px_65px_rgba(0,0,0,0.9)]"
            style={{ 
              transform: "translateZ(12px)",
            }}
          />
        </motion.div>

        {/* Mobile-Only Responsive Flanking Texts (positioned directly below the camera on mobile) */}
        {/* Adjusted spacing (mt-[-95px]) to snugly group directly beneath Ronin handle */}
        <div 
          className={`mt-[-95px] sm:hidden flex items-center justify-center gap-6 px-4 pointer-events-none select-none z-30 transition-all duration-500 ${
            screen === "instagram" ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"
          }`}
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Left Text: SHOOT ON DSLR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px 0px -100px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col items-center text-center max-w-[140px]"
          >
            <span className="text-[10px] tracking-[2px] text-amber-500 font-extrabold uppercase mb-1">
              PRODUCTION
            </span>
            <h2 className="text-[18px] font-black uppercase text-white leading-tight tracking-tight">
              SHOOT ON <br />
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                DSLR
              </span>
            </h2>
          </motion.div>

          {/* Golden Vertical Divider */}
          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true, margin: "-120px 0px -100px 0px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
            className="h-10 w-px bg-amber-500/25 origin-center"
          />

          {/* Right Text: READY AT 10MIN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px 0px -100px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col items-center text-center max-w-[140px]"
          >
            <span className="text-[10px] tracking-[2px] text-amber-500 font-extrabold uppercase mb-1">
              TURBO EDITS
            </span>
            <h2 className="text-[18px] font-black uppercase text-white leading-tight tracking-tight">
              READY AT <br />
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                10MIN*
              </span>
            </h2>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle floor shadow peeking below the gimbal tripod legs */}
      <motion.div
        className="absolute inset-x-[25%] bottom-[12%] h-[6%] rounded-full bg-black/70 blur-2xl z-0"
        animate={{
          scale: [0.92, 1.05, 0.92],
          opacity: [0.55, 0.75, 0.55]
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
});

export default CameraMockup;
