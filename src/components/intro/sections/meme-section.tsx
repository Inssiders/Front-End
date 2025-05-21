"use client";

import DynamicVideoGrid from "@/components/intro/dynamic-video-grid";
import { motion, MotionValue } from "framer-motion";
import { useState } from "react";

interface MemeSectionProps {
  thirdSectionOpacity: MotionValue<number>;
  thirdSectionY: MotionValue<number>;
  thirdVisible: boolean;
}

export function MemeSection({
  thirdSectionOpacity,
  thirdSectionY,
  thirdVisible,
}: MemeSectionProps) {
  const [showFrames, setShowFrames] = useState(true);

  return (
    <motion.section
      style={{ opacity: thirdSectionOpacity, y: thirdSectionY }}
      className={`fixed top-0 left-0 w-full flex flex-col justify-center bg-mocha-800 text-cream-100 p-8 overflow-y-auto ${
        thirdVisible ? "z-30" : "z-0"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 min-h-[800px] items-center justify-center">
        <div className="w-full relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 via-orange-300/20 to-orange-400/30 rounded-2xl blur-lg transform group-hover:scale-105 transition-transform duration-500 opacity-50"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-center text-mocha-900 relative">
            요즘 가장 핫한 <span className="text-orange-500">밈</span> 모음
          </h2>
        </div>

        <div className="w-full max-w-6xl mx-auto min-h-[600px] relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 rounded-3xl opacity-75 group-hover:opacity-100 blur transition duration-500 h-[550px]"></div>

          <div className="relative p-1 rounded-2xl transition-all duration-500 group-hover:transform group-hover:scale-[1.01]">
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl">
              <DynamicVideoGrid
                showFrames={showFrames}
                onToggleShowFrames={setShowFrames}
              />
            </div>

            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-orange-400 rounded-tl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-orange-400 rounded-tr transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-orange-400 rounded-bl transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-orange-400 rounded-br transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
