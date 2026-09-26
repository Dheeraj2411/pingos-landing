"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useIsPresent } from "framer-motion";

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

interface AnimatedWordItemProps {
  word: AnimatedWord;
  shouldReduceMotion: boolean | null;
}

function AnimatedWordItem({ word, shouldReduceMotion }: AnimatedWordItemProps) {
  const isPresent = useIsPresent();

  return (
    <motion.span
      data-testid={isPresent ? "active-headline-word" : "exiting-headline-word"}
      aria-hidden={!isPresent}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: "115%", filter: "blur(8px)", scale: 0.98 }
      }
      animate={{
        opacity: 1,
        y: "0%",
        filter: "blur(0px)",
        scale: 1,
      }}
      exit={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: "-115%", filter: "blur(8px)", scale: 0.98 }
      }
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.65,
        ease: [0.76, 0, 0.24, 1], // Luxury Quartic Ease-In-Out
      }}
      className={`col-start-1 row-start-1 inline-block bg-linear-to-r ${word.color} bg-clip-text text-transparent px-3 pb-1.5 whitespace-nowrap will-change-[transform,opacity,filter]`}
      style={{
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
        transformStyle: "preserve-3d",
      }}
    >
      {word.text}
    </motion.span>
  );
}

export default function AnimatedHeadline({
  staticPrefix,
  staticSuffix,
  words,
  intervalMs = 3000,
  className = "",
}: AnimatedHeadlineProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute longest word across all metrics to prevent layout shifts (CLS = 0)
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
    if (!words || words.length === 0) return `${staticPrefix} ${staticSuffix}`.trim();
    const wordList = words.map((w) => w.text).join(", ");
    return `PingOS: ${staticPrefix} ${wordList} ${staticSuffix}`;
  }, [words, staticPrefix, staticSuffix]);

  useEffect(() => {
    // If reduced motion is requested, words are invalid/single, or paused by user interaction, do not run interval
    if (shouldReduceMotion || !words || words.length <= 1 || isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

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
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [words, intervalMs, shouldReduceMotion, isPaused]);

  if (!words || words.length === 0) {
    return null;
  }

  const safeIndex = words.length > 0 ? index % words.length : 0;
  const currentWord = words[safeIndex] || words[0];

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
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        tabIndex={0}
        role="region"
        aria-label="Rotating features"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
        className="relative inline-grid grid-cols-1 grid-rows-1 items-center justify-center overflow-hidden align-middle py-1 px-1 my-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-sm"
      >
        {/* Ghost Sizer: Reserves exact maximum width & height for absolute zero layout shift */}
        <span
          data-testid="headline-ghost-sizer"
          className="invisible col-start-1 row-start-1 select-none pointer-events-none px-3 pb-1.5 font-extrabold whitespace-nowrap opacity-0"
          aria-hidden="true"
        >
          {longestWord}
        </span>

        {/* Dynamic Animated Word with Synchronous Push-Through Roll */}
        <AnimatePresence initial={false}>
          <AnimatedWordItem
            key={safeIndex}
            word={currentWord}
            shouldReduceMotion={shouldReduceMotion}
          />
        </AnimatePresence>
      </span>

      <span aria-hidden="true" className="block text-text-primary">
        {staticSuffix}
      </span>
    </h1>
  );
}
