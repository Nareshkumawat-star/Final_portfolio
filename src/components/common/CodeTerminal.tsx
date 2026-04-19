"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

const codeSnippet = `const developer = {
  name: "Naresh Kumawat",
  role: "Full-Stack Software Engineer",
  expertise: ["React", "Next.js", "Node.js", "DSA"],
  passion: "Building efficient & scalable code",
  mission: "Elevating brands through code",
  location: "Jaipur, India",
  hireable: true,
  status: "Optimizing the world..."
};

// Initializing professional excellence...
developer.initialize();`;

export const CodeTerminal = () => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [index, setIndex] = useState(0);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (index < codeSnippet.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode((prev) => prev + codeSnippet[index]);
        setIndex((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Simple Manual Syntax Highlighting
  const renderHighlightedCode = (code: string) => {
    return code.split(/(\"[\s\S]*?\"|const|developer|role|expertise|passion|mission|location|hireable|status|true|\/\/.*|\n)/g).map((part, i) => {
      if (part === "const") return <span key={i} className="text-purple-400">const</span>;
      if (part === "developer") return <span key={i} className="text-yellow-400">developer</span>;
      if (part === "true") return <span key={i} className="text-orange-400">true</span>;
      if (part.startsWith("//")) return <span key={i} className="text-green-600/60 italic">{part}</span>;
      if (part.startsWith("\"")) return <span key={i} className="text-orange-300">{part}</span>;
      if (["role", "expertise", "passion", "mission", "location", "hireable", "status"].includes(part)) {
        return <span key={i} className="text-blue-300">{part}</span>;
      }
      return <span key={i} className="text-gray-300">{part}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="w-full max-w-lg aspect-video bg-[#0c0c0e]/90 border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative group cursor-default select-none"
    >
      {/* Terminal Title Bar */}
      <div
        style={{ transform: "translateZ(50px)" }}
        className="flex items-center justify-between px-3 md:px-4 py-2 bg-white/5 border-b border-white/5"
      >
        <div className="flex gap-2">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[9px] md:text-[10px] text-gray-500 font-mono tracking-tighter uppercase opacity-50">naresh.tsx</div>
      </div>

      {/* Terminal Content */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="p-4 md:p-6 font-mono text-[11px] md:text-sm leading-relaxed overflow-hidden"
      >
        <pre className="whitespace-pre-wrap">
          {renderHighlightedCode(displayedCode)}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1.5 h-4 bg-primary/80 ml-1 translate-y-0.5"
          >
            &nbsp;
          </motion.span>
        </pre>
      </div>

      {/* Background Subtle Glow */}
      <div
        style={{ transform: "translateZ(-10px)" }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none"
      />
    </motion.div>
  );
};


