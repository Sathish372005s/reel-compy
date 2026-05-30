"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = [
  "Capture The Reel",
  "Edit Fast",
  "Deliver Quickly",
];

export default function Typewriter() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.substring(0, text.length + 1));

          if (text === currentWord) {
            setTimeout(() => setIsDeleting(true), 1000);
          }
        } else {
          setText(currentWord.substring(0, text.length - 1));

          if (text === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <div className="flex items-center justify-center border border-white/10 bg-zinc-950/40 backdrop-blur-xl p-4 rounded-2xl shadow-lg mt-6">

      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
        {text}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
          }}
          className="text-yellow-400"
        >
          |
        </motion.span>
      </h1>
    </div>
  );
}