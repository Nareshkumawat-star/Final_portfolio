"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useChat } from "@ai-sdk/react";
import { Bot, X, Send, User, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile to adjust layout
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                left: isMobile ? "12px" : undefined,
                right: isMobile ? "12px" : "24px",
                bottom: isMobile ? "90px" : "100px"
            }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
                "absolute pointer-events-auto",
                isMobile ? "w-[calc(100vw-24px)]" : "w-[320px]"
            )}
          >
            <Card className="h-[450px] bg-[#0a0a0a] border border-zinc-800 flex flex-col overflow-hidden shadow-2xl ring-1 ring-white/5">
              
              {/* Chat Content */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin scrollbar-thumb-primary/10"
              >
                {messages.length === 0 && (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto border border-primary/20">
                        <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-[12px] font-nasalization text-primary uppercase tracking-widest font-bold">Naresh Assistant</h3>
                        <p className="text-[10px] text-zinc-500 italic px-4">
                          How can I help you today?
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                        {["Skills", "Projects", "Contact"].map((q) => (
                            <button
                                key={q}
                                type="button"
                                onClick={() => {
                                    handleInputChange({ target: { value: q } } as any);
                                }}
                                className="text-[9px] px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-primary/20 transition-all text-zinc-400 font-mono"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                  </div>
                )}

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "flex gap-2 max-w-[95%]",
                      m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 border",
                        m.role === "user" ? "bg-zinc-800 border-zinc-700" : "bg-primary/20 border-primary/30"
                    )}>
                      {m.role === "user" ? <User className="w-3 h-3 text-zinc-400" /> : <Bot className="w-3 h-3 text-primary" />}
                    </div>
                    <div className={cn(
                      "p-3 rounded-xl text-[12px] leading-relaxed",
                      m.role === "user" 
                        ? "bg-primary text-white rounded-tr-none" 
                        : "bg-zinc-900 border border-zinc-800 rounded-tl-none text-zinc-200 prose prose-invert prose-p:my-0 prose-sm font-medium"
                    )}>
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Bot className="w-3 h-3 text-primary animate-pulse" />
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl rounded-tl-none">
                        <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.span 
                                    key={i}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                                    className="w-1 h-1 rounded-full bg-primary" 
                                />
                            ))}
                        </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <form 
                onSubmit={handleSubmit}
                className="p-3 border-t border-zinc-800 bg-[#0d0d0d]"
              >
                <div className="relative flex items-center gap-2">
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask something..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-[12px] focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600 text-zinc-200 pr-10"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!input || isLoading}
                    className="absolute right-1 h-7 w-7 rounded-md bg-primary hover:bg-primary/90 disabled:opacity-30"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button (Slightly Smaller too) */}
      <div className="fixed bottom-6 right-6 pointer-events-auto">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border border-primary/40",
              isOpen 
                ? "bg-primary text-white" 
                : "bg-black text-primary"
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.button>
      </div>
    </div>
  );
};
