"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { experienceData } from "@/constant";
import { ExperienceCard } from "../Cards";
import { nasalization } from "@/app/fonts";

export function Experience() {
  const ref = useRef(null);
  useInView(ref, {
    once: false,
    margin: "-80px",
    amount: 0.1,
  });

  return (
    <section
      ref={ref}
      id="experience"
      className="py-24 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Background decoration */}



      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-24 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-primary/20 blur-[100px] rounded-full animate-pulse pointer-events-none" />
          <motion.h2
            className={`${nasalization.className} text-4xl md:text-6xl font-bold text-primary relative z-10`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Experience
            <motion.div 
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-6 mx-auto"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 240, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </motion.h2>

          <motion.p
          className="text-xs text-muted-foreground max-w-2xl mx-auto mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          >
            My professional journey and key experiences
          </motion.p>
        </div>


        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />


          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <ExperienceCard
                key={`${exp.company}-${index}`}
                role={exp.role}
                year={exp.year}
                description={exp.description}
                company={exp.company}
                technologies={exp.technologies}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
