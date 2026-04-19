"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FaSearch, 
  FaUser, 
  FaCode, 
  FaBriefcase, 
  FaEnvelope, 
  FaGithub, 
  FaLinkedin, 
  FaFileDownload,
  FaTerminal
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useRouter } from "next/navigation";

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const actions = [
    { id: "about", icon: <FaUser />, title: "Go to About", category: "Navigation", action: () => scrollToSection("about") },
    { id: "projects", icon: <FaCode />, title: "Go to Projects", category: "Navigation", action: () => scrollToSection("projects") },
    { id: "experience", icon: <FaBriefcase />, title: "Go to Experience", category: "Navigation", action: () => scrollToSection("experience") },
    { id: "contact", icon: <FaEnvelope />, title: "Go to Contact", category: "Navigation", action: () => scrollToSection("contact") },
    { id: "github", icon: <FaGithub />, title: "Visit GitHub", category: "Socials", action: () => window.open("https://github.com/Nareshkumawat-star", "_blank") },
    { id: "linkedin", icon: <FaLinkedin />, title: "Visit LinkedIn", category: "Socials", action: () => window.open("https://www.linkedin.com/in/nareshkumawat06/", "_blank") },
    { id: "leetcode", icon: <SiLeetcode />, title: "Visit LeetCode", category: "Socials", action: () => window.open("https://leetcode.com/u/naresh20_soe/", "_blank") },
    { id: "resume", icon: <FaFileDownload />, title: "Download Resume", category: "Media", action: () => window.open("/resume", "_blank") },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const filteredActions = actions.filter((action) =>
    action.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
          />

          {/* Palette Container */}
          <div className="fixed inset-0 flex items-start justify-center pt-[15vh] px-4 pointer-events-none z-[1000]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-xl bg-[#09090b]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto ring-1 ring-white/20"
            >
              <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/5">
                <FaTerminal className="text-primary w-4 h-4 mr-3" />
                <input
                  autoFocus
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500 text-sm py-1"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex items-center gap-1.5 ml-2">
                  <span className="text-[10px] text-gray-400 px-1.5 py-0.5 bg-white/10 rounded border border-white/10">ESC</span>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
                {filteredActions.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-sm text-gray-400">No results found for "{search}"</p>
                  </div>
                ) : (
                  Object.entries(
                    filteredActions.reduce((acc, action) => {
                      if (!acc[action.category]) acc[action.category] = [];
                      acc[action.category].push(action);
                      return acc;
                    }, {} as Record<string, typeof actions>)
                  ).map(([category, items]) => (
                    <div key={category} className="mb-2">
                      <h3 className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-primary/70">{category}</h3>
                      {items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => item.action()}
                          className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors group text-left"
                        >
                          <div className="w-8 h-8 flex items-center justify-center rounded bg-white/5 text-gray-400 group-hover:text-primary transition-colors">
                            {item.icon}
                          </div>
                          <span className="ml-3 font-medium">{item.title}</span>
                          <span className="ml-auto text-xs text-gray-600 group-hover:text-gray-400">Action</span>
                        </button>
                      ))}
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 py-3 border-t border-white/10 bg-white/5 flex items-center justify-between">
                <p className="text-[10px] text-gray-500">
                  Search through the command palette to find anything quickly.
                </p>
                <div className="flex items-center gap-2">
                   <div className="flex gap-1 items-center bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-gray-400">
                      <span>Enter</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
