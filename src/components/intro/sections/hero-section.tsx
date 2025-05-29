"use client";

import { useMobile } from "@/hooks/use-mobile";
import { motion, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface HeroSectionProps {
  firstSectionOpacity: MotionValue<number>;
  firstSectionScale: MotionValue<number>;
  firstSectionY: MotionValue<number>;
  firstVisible: boolean;
}

export function HeroSection({
  firstSectionOpacity,
  firstSectionScale,
  firstSectionY,
  firstVisible,
}: HeroSectionProps) {
  const [isImageHover, setIsImageHover] = useState(false);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const [currentDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    return `${year}년 ${month}월`;
  });
  const isMobile = useMobile();

  const renderInteractiveText = () => {
    const letters = [
      { char: "i", color: "#333" },
      { char: "n", color: "#333" },
      { char: "S", color: "#FF8C38" },
      { char: "S", color: "#FF8C38" },
      { char: "i", color: "#333" },
      { char: "d", color: "#333" },
      { char: "e", color: "#333" },
      { char: "r", color: "#333" },
    ];

    return (
      <span className="inline-flex items-baseline">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block cursor-pointer transition-colors duration-200"
            style={{ color: letter.color }}
            animate={{
              y: hoveredLetter === index ? -8 : 0,
              transition: { type: "spring", stiffness: 300, damping: 10 },
            }}
            onMouseEnter={() => setHoveredLetter(index)}
            onMouseLeave={() => setHoveredLetter(null)}
          >
            {letter.char}
          </motion.span>
        ))}
      </span>
    );
  };

  return (
    <motion.section
      style={{
        opacity: firstSectionOpacity,
        scale: firstSectionScale,
        y: firstSectionY,
      }}
      className={`fixed top-0 left-0 w-full flex flex-col justify-center items-center text-cream-100 p-8 ${
        firstVisible ? "z-30" : "z-0"
      }`}
    >
      <div className="w-full overflow-hidden bg-[#FFF8F0] flex flex-col">
        <div className="h-20 w-full bg-transparent" />
        <div className="container mx-auto px-4 py-6 flex-1 flex flex-col relative">
          <main className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-6xl">
              {/* Left Content */}
              <div className="flex flex-col justify-center relative pl-4 mb-8 md:mb-0">
                <div className="absolute -top-8 -left-8 rotate-[-15deg] bg-[#333] text-white text-sm font-bold px-3 py-1 rounded-md z-10 hidden lg:left-0 xl:block 2xl:block">
                  최신 밈
                </div>
                <div className="relative mb-8">
                  <div className="absolute -left-4 -top-8 bg-[#333] text-white px-3 py-1 text-sm font-bold">
                    TRENDING NOW
                  </div>
                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1 h-24 bg-[#FF8C38] hidden xs:block" />
                  <div className="relative">
                    <p className="text-sm font-bold text-[#FF8C38] tracking-widest hidden sm:block uppercase">
                      Trending Meme
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-3 text-[#333]">
                      <div className="flex flex-col">
                        <span style={{ fontSize: 90, marginBottom: -20 }}>
                          ❝
                        </span>
                        <span>밈 트랜드의</span>
                        <span className="inline-block text-4xl sm:text-6xl md:text-7xl ml-8 my-2">
                          {renderInteractiveText()}
                        </span>
                      </div>
                    </h2>
                    <p className="text-base md:text-lg text-[#8B5E34] mb-4 md:mb-6 ml-4">
                      지금 가장 인기있는 밈을 확인하세요!
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="bg-[#FF8C38]/10 text-[#FF8C38] font-bold px-3 py-1 rounded-full">
                      #최신 밈
                    </span>
                    <span className="bg-[#8B5E34]/10 text-[#8B5E34] font-bold px-3 py-1 rounded-full">
                      #요즘 유행
                    </span>
                    <span className="bg-[#8B5E34]/10 text-[#8B5E34] font-bold px-3 py-1 rounded-full">
                      #트렌드
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Content - Featured Meme */}
              <div className="relative max-w-60 md:max-w-md">
                <div className="absolute inset-0 bg-[#FF8C38]/20 rounded-3xl transform rotate-3" />
                <div className="relative bg-[#FFF5E9] p-3 sm:p-4 rounded-2xl shadow-lg transform -rotate-2">
                  <div className="absolute -right-3 top-10 bg-[#333] text-white px-2 z-30 sm:px-3 py-1 text-xs sm:text-sm font-bold transform rotate-90">
                    BEST MEME
                  </div>
                  <div className="absolute -left-3 sm:-left-4 top-[60%] bg-[#333] text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold transform rotate-[-5deg] z-30">
                    {currentDate} 인기 밈
                  </div>
                  <div
                    className="relative aspect-square max-w-xs sm:max-w-sm md:max-w-md mx-auto cursor-pointer overflow-hidden group"
                    onMouseEnter={() => setIsImageHover(true)}
                    onMouseLeave={() => setIsImageHover(false)}
                  >
                    <div
                      className={`absolute inset-0 bg-[#8B5E34]/70 flex flex-col items-center justify-center text-white opacity-0 transition-opacity duration-300 z-20 ${
                        isImageHover ? "opacity-100" : ""
                      }`}
                    >
                      <p className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                        밈 보기
                      </p>
                      <p className="text-xs sm:text-sm mb-2 sm:mb-4 px-4 text-center">
                        클릭하여 더 많은 밈을 확인하세요
                      </p>
                      <Link href="/posts">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-white flex items-center justify-center">
                          <ArrowRight size={isMobile ? 16 : 20} />
                        </div>
                      </Link>
                    </div>
                    <div
                      className="relative z-10 transition-transform duration-300 flex items-center justify-center h-full"
                      style={{
                        transform: isImageHover
                          ? "scale(1.1) rotate(5deg)"
                          : "scale(1) rotate(0)",
                      }}
                    >
                      <Image
                        src="/shark.png"
                        alt="Featured meme"
                        width={400}
                        height={400}
                        className="object-contain max-h-full max-w-full"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Start Button */}
          <div className="flex justify-center mt-4 sm:mt-6 mb-8 sm:mb-12">
            <Link href="/posts">
              <button className="group relative overflow-hidden bg-[#FF8C38] text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                <div className="relative z-10 flex items-center space-x-2">
                  <span>더 많은 밈 보러가기</span>
                  <ArrowRight
                    className="transition-all duration-300 group-hover:translate-x-1"
                    size={isMobile ? 18 : 20}
                  />
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
