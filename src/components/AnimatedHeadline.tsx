"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface AnimatedWord {
  text: string;
  color: string;
}

export interface AnimatedHeadlineProps {
  staticPrefix: string;
  staticSuffix: string;
  words: AnimatedWord[];
  intervalMs?: number;
  className?: string;
}

export default function AnimatedHeadline({
  staticPrefix,
  staticSuffix,
  words,
  intervalMs = 3000,
  className = "",
}: AnimatedHeadlineProps) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Find the longest text string to act as the primary ghost sizer
  const longestWord = useMemo(() => {
    if (!words || words.length === 0) return "";
    return words.reduce(
      (longest, current) =>
        current.text.length > longest.length ? current.text : longest,
      words[0].text
    );
  }, [words]);

  // Construct comprehensive accessible semantic text for screen readers & search engines
  const fullAccessibleText = useMemo(() => {
    const wordList = words.map((w) => w.text).join(", ");
    return `PingOS: ${staticPrefix} ${wordList} ${staticSuffix}`;
  }, [words, staticPrefix, staticSuffix]);

  useEffect(() => {
    // If reduced motion is requested or invalid words, do not run interval
    if (shouldReduceMotion || !words || words.length <= 1) return;

    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, intervalMs);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        startTimer();
      }
    };

    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [words, intervalMs, shouldReduceMotion]);

  if (!words || words.length === 0) {
    return null;
  }

  const currentWord = words[index] || words[0];

  return (
    <h1
      className={`text-[1.75rem] sm:text-6xl lg:text-7xl font-extrabold leading-[1.15] tracking-tight mb-6 ${className}`}
    >
      {/* Accessible semantic heading layer for Screen Readers & Search Crawlers */}
      <span className="sr-only">{fullAccessibleText}</span>

      {/* Visual layer guarded against screen reader spam */}
      <span aria-hidden="true" className="block text-text-primary">
        {staticPrefix}
      </span>

      {/* Zero-CLS Container using Single-Cell CSS Grid Overlay with Clean Vertical Masking */}
      <span
        data-testid="headline-rotator"
        aria-hidden="true"
        className="relative inline-grid grid-cols-1 grid-rows-1 items-center justify-center overflow-hidden align-middle py-1 px-1 my-0.5"
      >
        {/* Ghost Sizer: All words stacked invisibly to reserve exact maximum width & height */}
        <span
          data-testid="headline-ghost-sizer"
          className="invisible col-start-1 row-start-1 select-none pointer-events-none px-3 pb-1 font-extrabold whitespace-nowrap"
          aria-hidden="true"
        >
          {longestWord}
        </span>

        {/* Dynamic Animated Word with Synchronous Push-Through Roll */}
        <AnimatePresence initial={false}>
          <motion.span
            key={index}
            data-testid="active-headline-word"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: "60%", scale: 0.98 }
            }
            animate={{
              opacity: 1,
              y: "0%",
              scale: 1,
            }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: "-60%", scale: 0.98 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.55,
              ease: [0.16, 1, 0.3, 1], // Apple / Linear tier-1 silky easing curve
            }}
            className={`col-start-1 row-start-1 inline-block bg-linear-to-r ${currentWord.color} bg-clip-text text-transparent px-3 pb-1.5 whitespace-nowrap will-change-transform`}
          >
            {currentWord.text}
          </motion.span>
        </AnimatePresence>
      </span>

      <span aria-hidden="true" className="block text-text-primary">
        {staticSuffix}
      </span>
    </h1>
  );
}
