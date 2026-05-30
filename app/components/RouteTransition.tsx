"use client";

import { useEffect, useRef, useState } from "react";
import { Aperture } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function RouteTransition() {
  const [active, setActive] = useState(false);
  const hideTimerRef = useRef<number | null>(null);

  const play = () => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
    }

    setActive(true);
    hideTimerRef.current = window.setTimeout(() => {
      setActive(false);
    }, 920);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!anchor) {
        return;
      }

      const url = new URL(anchor.href);
      const current = new URL(window.location.href);

      if (url.origin !== current.origin || url.pathname === current.pathname) {
        return;
      }

      play();
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-[80] pointer-events-none overflow-hidden bg-black"
        >
          {[0, 1, 2, 3].map((panel) => (
            <motion.div
              key={panel}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: [0, 1, 1, 0] }}
              transition={{
                duration: 0.92,
                times: [0, 0.28, 0.68, 1],
                delay: panel * 0.035,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="absolute top-0 h-full origin-top bg-gradient-to-b from-red-950 via-black to-black"
              style={{
                left: `${panel * 25}%`,
                width: "25.2%",
              }}
            />
          ))}

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="absolute left-0 top-1/2 h-px w-full origin-left bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_32px_rgba(239,68,68,1)]"
          />

          <motion.div
            initial={{ scale: 0.65, opacity: 0, rotate: -90 }}
            animate={{ scale: [0.65, 1.15, 0.95], opacity: [0, 1, 0], rotate: 180 }}
            transition={{ duration: 0.86, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-white"
          >
            <Aperture className="h-14 w-14 text-red-500 drop-shadow-[0_0_28px_rgba(239,68,68,1)]" />
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
