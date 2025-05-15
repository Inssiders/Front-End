"use client";

import {
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DynamicVideoGrid from "@/components/intro/dynamic-video-grid";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { JSX, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
// Import ThreeScene component with dynamic import to avoid SSR issues

interface MemeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}
const ThreeScene = dynamic(() => import("@/components/intro/three-scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed w-[150px] h-[150px] bottom-[50px] left-[50px] bg-mocha-700 rounded-md" />
  ),
});

export default function Home(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // First section animations
  const firstSectionOpacity = useTransform(scrollYProgress, [0, 0.33], [1, 0]);
  const firstSectionScale = useTransform(scrollYProgress, [0, 0.33], [1, 0.9]);
  const firstSectionY = useTransform(scrollYProgress, [0, 0.33], [0, -50]);

  // Second section animations
  const secondSectionOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.55, 0.65],
    [0, 1, 1, 0]
  );
  const secondSectionY = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.55, 0.65],
    [100, 0, 0, -100]
  );

  // Third section animations
  const thirdSectionOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const thirdSectionY = useTransform(scrollYProgress, [0.6, 0.7], [100, 0]);

  const [mounted, setMounted] = useState<boolean>(false);
  const [showFrames, setShowFrames] = useState<boolean>(true);
  const [scrollProgressValue, setScrollProgressValue] = useState<number>(0);

  // 섹션별 isVisible 상태값
  const [firstVisible, setFirstVisible] = useState(false);
  const [secondVisible, setSecondVisible] = useState(false);
  const [thirdVisible, setThirdVisible] = useState(false);

  // scrollYProgress에 따라 isVisible 업데이트
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      setFirstVisible(v >= 0 && v < 0.3);
      setSecondVisible(v >= 0.3 && v < 0.6);
      setThirdVisible(v >= 0.6);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);
  //button animation
  const [isButtonHover, setIsButtonHover] = useState(false);
  const [buttonHoverProgress, setButtonHoverProgress] = useState(0);
  const [isImageHover, setIsImageHover] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  // Check if mobile using the hook
  const isMobile = useMediaQuery("(max-width: 768px)");

  //route
  const router = useRouter();
  // Current featured meme image - CHANGE THIS TO UPDATE THE IMAGE
  const featuredMeme: MemeImageProps = {
    src: "/shark.png", // Replace this path to change the image
    alt: "Featured meme", // Update alt text accordingly
    width: 400,
    height: 400,
  };
  // Update scroll progress value for ThreeScene
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(setScrollProgressValue);
    return () => unsubscribe();
  }, [scrollYProgress]);

  //button hover animation
  useEffect(() => {
    let animationFrame: number;
    let startTime: number;

    const animateHover = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const duration = 500; // Animation duration in ms

      if (isButtonHover) {
        // Animate progress from 0 to 100 over duration
        const progress = Math.min(elapsed / duration, 1);
        setButtonHoverProgress(progress);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateHover);
        }
      } else {
        // Animate progress from current to 0 over duration
        const progress = Math.max(1 - elapsed / duration, 0);
        setButtonHoverProgress(progress);

        if (progress > 0) {
          animationFrame = requestAnimationFrame(animateHover);
        }
      }
    };

    if (isButtonHover) {
      startTime = 0;
      animationFrame = requestAnimationFrame(animateHover);
    } else if (buttonHoverProgress > 0) {
      startTime = 0;
      animationFrame = requestAnimationFrame(animateHover);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isButtonHover, buttonHoverProgress]);

  //current date
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // JavaScript months are 0-indexed
    setCurrentDate(`${year}년 ${month}월`);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh] ">
      {/* Three.js Scene (persists across all sections) */}
      {/*  <ThreeScene
        scrollProgress={scrollProgressValue}
        textureUrl="/placeholder.svg?height=150&width=150"
        color="#8B5A2B"
      />*/}

      {/* First Section */}
      <motion.section
        style={{
          opacity: firstSectionOpacity,
          scale: firstSectionScale,
          y: firstSectionY,
        }}
        className={`fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center  text-cream-100 p-8 md:p-16  ${
          firstVisible ? "z-30" : "z-0"
        } `}
      >
        <div className="min-h-screen w-full overflow-hidden bg-[#5CE1E6] flex flex-col">
          {/* Increased space for header to 80px */}
          <div className="h-20 w-full bg-transparent"></div>

          <div className="container mx-auto px-4 py-6 flex-1 flex flex-col relative">
            {/* Added extra padding to move content down slightly */}
            <main className="flex-1 flex items-center justify-center pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-6xl">
                {/* Left content - with mobile optimizations */}
                <div className="flex flex-col justify-center relative pl-4 mb-8 md:mb-0">
                  <div className="absolute -top-8 -left-8 rotate-[-15deg] bg-[#333] text-white text-sm font-bold px-3 py-1 rounded-md z-10">
                    최신 밈
                  </div>

                  {/* Non-interactive typography without box */}
                  <div className="relative mb-8">
                    {/* Moved TRENDING NOW to not overlap with logo */}
                    <div className="absolute -left-4 -top-10 bg-[#333] text-white px-3 py-1 text-sm font-bold">
                      TRENDING NOW
                    </div>

                    {/* Single decorative element - hidden on very small screens */}
                    <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1 h-24 bg-[#d35f4d] hidden xs:block"></div>

                    {/* Non-interactive text with trendy typography - mobile optimized */}
                    <div className="relative">
                      <p className="text-sm font-bold text-[#d35f4d] mb-2 tracking-widest uppercase">
                        Trending Meme
                      </p>

                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-3 text-[#333]">
                        <div className="flex flex-col">
                          <span style={{ fontSize: 90, marginBottom: -20 }}>
                            ❝
                          </span>
                          <span>밈 트랜드의</span>
                          <span className="inline-block text-4xl sm:text-6xl md:text-7xl -ml-2 my-2">
                            <span className="text-[#333]">in</span>
                            <span className="text-[#d35f4d]">SS</span>
                            <span className="text-[#333]">ider</span>
                          </span>
                          <span className="text-3xl sm:text-5xl ml-1"></span>
                        </div>
                      </h2>

                      <p className="text-base md:text-lg text-[#6b5744] mb-4 md:mb-6 ml-4">
                        지금 가장 인기있는 밈을 확인하세요!
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="bg-[#d35f4d]/10 text-[#d35f4d] font-bold px-3 py-1 rounded-full">
                        #트랄라레로
                      </span>
                      <span className="bg-[#4a3728]/10 text-[#4a3728] font-bold px-3 py-1 rounded-full">
                        #brain rot
                      </span>
                      <span className="bg-[#4a3728]/10 text-[#4a3728] font-bold px-3 py-1 rounded-full">
                        #트렌딩
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right content with flexible image container - mobile optimized */}
                <div className="relative">
                  <div className="absolute inset-0 bg-[#d35f4d]/20 rounded-3xl transform rotate-3"></div>

                  <div className="relative bg-[#f8f1ea] p-3 sm:p-4 rounded-2xl shadow-lg transform -rotate-2">
                    <div className="absolute -right-3 top-10 bg-[#333] text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold transform rotate-90">
                      BEST MEME
                    </div>

                    {/* Repositioned date text at 60% height on the left side of image */}
                    <div className="absolute -left-3 sm:-left-4 top-[60%] bg-[#333] text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold transform rotate-[-5deg] z-30">
                      {currentDate} 인기 밈
                    </div>

                    {/* Flexible image container that can accommodate any image */}
                    <div
                      className="relative aspect-square max-w-xs sm:max-w-sm md:max-w-md mx-auto cursor-pointer overflow-hidden group"
                      onMouseEnter={() => {
                        console.log("hovered!");
                        setIsImageHover(true);
                      }}
                      onMouseLeave={() => setIsImageHover(false)}
                      onClick={() => isMobile && alert("밈 보기!")} // Mobile click handler
                    >
                      {/* Interactive elements that appear on hover/touch */}
                      <div
                        className={`absolute inset-0 bg-[#4a3728]/70 flex flex-col items-center justify-center text-white opacity-0 transition-opacity duration-300 z-20 ${
                          isImageHover ? "opacity-100" : ""
                        }`}
                      >
                        <p className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                          밈 보기
                        </p>
                        <p className="text-xs sm:text-sm mb-2 sm:mb-4 px-4 text-center">
                          클릭하여 더 많은 밈을 확인하세요
                        </p>
                        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-white flex items-center justify-center">
                          <ArrowRight size={isMobile ? 16 : 20} />
                        </div>
                      </div>

                      {/* Flexible image with hover effect - can be any image */}
                      <div
                        className="relative z-10 transition-transform duration-300 flex items-center justify-center h-full"
                        style={{
                          transform: isImageHover
                            ? "scale(1.1) rotate(5deg)"
                            : "scale(1) rotate(0)",
                        }}
                      >
                        {/* 
                      This Image component can be replaced with any image
                      Just update the featuredMeme object at the top of the component
                    */}
                        <Image
                          src={featuredMeme.src || "/placeholder.svg"}
                          alt={featuredMeme.alt}
                          width={featuredMeme.width}
                          height={featuredMeme.height}
                          className="object-contain max-h-full max-w-full"
                          priority
                        />
                      </div>

                      {/* Animated circles that appear on hover - hidden on very small screens */}
                      <div
                        className={`absolute top-1/4 left-1/4 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-[#d35f4d] transition-all duration-500 hidden sm:block ${
                          isImageHover
                            ? "opacity-70 scale-100"
                            : "opacity-0 scale-0"
                        }`}
                        style={{
                          transform: isImageHover
                            ? "translateX(-20px) translateY(-20px)"
                            : "translateX(0) translateY(0)",
                        }}
                      ></div>
                      <div
                        className={`absolute bottom-1/4 right-1/4 w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-[#d35f4d] transition-all duration-500 hidden sm:block ${
                          isImageHover
                            ? "opacity-70 scale-100"
                            : "opacity-0 scale-0"
                        }`}
                        style={{
                          transform: isImageHover
                            ? "translateX(20px) translateY(20px)"
                            : "translateX(0) translateY(0)",
                        }}
                      ></div>
                    </div>

                    <div className="absolute -left-3 sm:-left-4 bottom-10 bg-[#333] text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold transform -rotate-90">
                      VIRAL
                    </div>
                  </div>

                  <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-20 sm:w-24 h-6 sm:h-8 bg-[#333] text-white flex items-center justify-center text-xs font-bold transform rotate-3">
                    #SHARKMEME
                  </div>
                </div>
              </div>
            </main>

            {/* Centered START button with left-to-right lightening effect */}
            <div className="flex justify-center mt-4 sm:mt-6 mb-8 sm:mb-12">
              <Link href="/memes">
                <button
                  className="group relative overflow-hidden bg-[#d35f4d] text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                  onMouseEnter={() => setIsButtonHover(true)}
                  onMouseLeave={() => setIsButtonHover(false)}
                  onClick={() => router.push("/memes")}
                >
                  {/* Progressive lightening effect overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[#ff7b6d] to-[#d35f4d] transition-opacity duration-300"
                    style={{
                      clipPath: `polygon(0 0, ${
                        buttonHoverProgress * 100
                      }% 0, ${buttonHoverProgress * 100}% 100%, 0 100%)`,
                      opacity: 1,
                    }}
                  ></div>

                  {/* Button content */}

                  <div className="relative z-10 flex items-center space-x-2">
                    <span>클릭하여 더 많은 밈을 확인하세요</span>
                    <ArrowRight
                      className={`transition-all duration-300 ${
                        isButtonHover ? "translate-x-1" : ""
                      }`}
                      size={isMobile ? 18 : 20}
                    />
                  </div>
                </button>
              </Link>
            </div>

            {/* LOGIN button moved up slightly - mobile optimized */}
            <div
              className={`fixed ${
                isMobile ? "bottom-6" : "bottom-10"
              } right-6 z-50`}
            >
              <Button
                variant="outline"
                className="border-2 border-[#4a3728] bg-[#f8f1ea] hover:bg-[#4a3728]/10 text-[#4a3728] px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-bold rounded-lg shadow-lg"
              >
                LOGIN
              </Button>
            </div>
          </div>

          {/* Background decorative elements - hidden on small screens */}
          <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-[#d35f4d]/30 hidden sm:block"></div>
          <div className="absolute bottom-40 left-10 w-24 h-24 rounded-full bg-[#d35f4d]/20 hidden sm:block"></div>
          <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-[#d35f4d]/20 hidden sm:block"></div>
        </div>
      </motion.section>

      {/* Second Section */}
      <motion.section
        style={{ opacity: secondSectionOpacity, y: secondSectionY }}
        className={`fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-cream-100 text-mocha-900 p-8 md:p-16 ${
          secondVisible ? "z-30" : "z-0"
        }`}
      >
        <div className="max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Features</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            We provide cutting-edge solutions that make your experience seamless
            and enjoyable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-cream-200 p-6 rounded-xl transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-3">Intuitive Design</h3>
              <p>
                Experience a seamless interface that makes navigation effortless
                and enjoyable.
              </p>
            </div>
            <div className="bg-cream-200 p-6 rounded-xl transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-3">Smart Solutions</h3>
              <p>
                Our intelligent tools adapt to your needs, providing
                personalized recommendations.
              </p>
            </div>
            <div className="bg-cream-200 p-6 rounded-xl transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
              <p>
                Connect with users worldwide and expand your horizons with our
                platform.
              </p>
            </div>
            <div className="bg-cream-200 p-6 rounded-xl transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-3">Secure Platform</h3>
              <p>
                Rest easy knowing your data is protected with our
                state-of-the-art security measures.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Third Section - Meme Content with Dynamic Frame Layout */}
      <motion.section
        style={{ opacity: thirdSectionOpacity, y: thirdSectionY }}
        className={`fixed top-0 left-0 w-full h-screen flex flex-col justify-center bg-mocha-800 text-cream-100 p-8 md:p-16 overflow-y-auto ${
          thirdVisible ? "z-30" : "z-0"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center lg:text-left">
              최신 밈
            </h2>
            <p className="text-lg mb-6">
              Explore our collection of trending memes. Hover over any video to
              play it and see it in action. Our curated selection brings you the
              best content from across the internet.
            </p>
            <p className="text-lg mb-6">
              Each meme represents a unique moment in internet culture,
              carefully selected for your entertainment.
            </p>
          </div>

          <div className="lg:w-3/4">
            <DynamicVideoGrid
              showFrames={showFrames}
              onToggleShowFrames={setShowFrames}
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
