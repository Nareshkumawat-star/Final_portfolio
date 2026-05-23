"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { selfData } from "@/constant";

import { quentine, mono } from "@/app/fonts";

import { CodeTerminal, Magnetic } from "@/components/common";
import SplitText from "@/components/bits/SplitText";
import ShinyText from "@/components/bits/ShinyText";
import RotatingText from "@/components/bits/RotatingText";

export const Hero = () => {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-start px-6 pt-24 md:pt-32 relative overflow-hidden gpu-accelerated will-change-transform"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-full sm:max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            className="w-full lg:max-w-2xl space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="space-y-6">
              <motion.h1
                className={`${quentine.className} text-5xl md:text-7xl lg:text-8xl font-bold leading-normal py-2`}
                style={{ color: "hsl(var(--primary))" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <SplitText text={selfData.name} delay={50} />
              </motion.h1>

              <motion.p
                className={`${mono.className} text-lg md:text-xl`}
                style={{ color: "hsl(var(--secondary))" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <RotatingText 
                  texts={selfData.roles}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-secondary/10 text-secondary overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </motion.p>

              <motion.p
                className="text-base md:text-lg max-w-2xl leading-relaxed"
                style={{ color: "hsl(var(--foreground) / 0.8)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                {selfData.bio}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  className="relative group overflow-hidden btn-primary shadow-lg hover:shadow-xl px-10 h-14"
                >
                  <Link href="/resume">
                    <span className="relative z-10 font-bold tracking-wide">
                      <ShinyText text="View Resume" speed={3} className="text-white" />
                    </span>
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Right Side: Code Terminal */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <CodeTerminal />
          </div>
        </div>
      </div>
    </section>
  );
};
