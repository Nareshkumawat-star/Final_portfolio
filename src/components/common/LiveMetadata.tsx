"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LuClock, LuCloudSun } from "react-icons/lu";

export const LiveMetadata = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-6 text-[10px] md:text-xs text-muted-foreground/60 font-mono tracking-wider mt-4">
      <motion.div 
        className="flex items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <LuClock className="text-primary/50 w-3 h-3" />
        <span>JAIPUR, IN: {time}</span>
      </motion.div>
      
      <div className="w-1 h-1 rounded-full bg-primary/20" />
      
      <motion.div 
        className="flex items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <LuCloudSun className="text-secondary/50 w-3 h-3" />
        <span>STATUS: ALWAYS SUNSET</span>
      </motion.div>
    </div>
  );
};
