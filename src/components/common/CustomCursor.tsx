"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Fast, snapping springs for maximum responsiveness
  const fastConfig = { damping: 25, stiffness: 450 };
  const cursorX = useSpring(mouseX, fastConfig);
  const cursorY = useSpring(mouseY, fastConfig);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media (min-width: 768px) {
        * { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Outer Ring */}
      <motion.div
        className="w-10 h-10 border border-primary/50 rounded-full flex items-center justify-center relative"
        animate={{
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.5)",
          borderWidth: isHovering ? "1px" : "2px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Pulsing inner glow while hovering */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 bg-primary rounded-full blur-md"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Central Precision Dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]" />
    </motion.div>
  );
};

import { AnimatePresence } from "motion/react";
