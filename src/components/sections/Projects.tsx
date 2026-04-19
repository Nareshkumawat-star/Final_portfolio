"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { nasalization } from "@/app/fonts";

import { ProjectCard } from "../Cards";
import { projectsData } from "@/constant/";

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-80px",
    amount: 0.1,
  });

  return (
    <section
      ref={ref}
      id="projects"
      className="py-24 max-w-6xl mx-auto relative overflow-hidden"
    >


      <div className="mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-24 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-secondary/30 blur-[100px] rounded-full animate-pulse pointer-events-none" />
          <motion.h2
            className={`${nasalization.className} text-4xl md:text-6xl font-bold text-primary relative z-10`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            My Projects
            <motion.div 
              className="h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mt-6 mx-auto"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 280, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
          </motion.h2>
        </div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {projectsData.map((proj, index) => (
            <ProjectCard
              key={proj.name}
              index={index}
              title={proj.name}
              desc={proj.description}
              github={proj.github_link}
              demo={proj.demo}
              tech={proj.tech}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
