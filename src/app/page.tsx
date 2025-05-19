"use client";

import DynamicVideoGrid from "@/components/intro/dynamic-video-grid";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useRef, useState } from "react";
// Import ThreeScene component with dynamic import to avoid SSR issues

interface MemeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function Home(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // First section animations
  const firstSectionOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const firstSectionScale = useTransform(scrollYProgress, [0, 0.33], [1, 0.9]);
  const firstSectionY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

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
  const [buttonHoverProgress, setButtonHoverProgress] = useState<number>(0);
  const [isImageHover, setIsImageHover] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>("");

  //inSSider letter animation
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  // Check if mobile using the hook
  const isMobile = useMobile();

  //route
  const router = useRouter();
  // Current featured meme image - CHANGE THIS TO UPDATE THE IMAGE
  const featuredMeme: MemeImageProps = {
    src: "/shark.png", // Replace this path to change the image
    alt: "Featured meme", // Update alt text accordingly
    width: 400,
    height: 400,
  };
  const renderInteractiveText = () => {
    const text = "inSSider";
    const colors = {
      i: "#333",
      n: "#333",
      S: "#FF8C38",
      S2: "#FF8C38", // Second S
      i2: "#333", // Second i
      d: "#333",
      e: "#333",
      r: "#333",
    };

    const letters = [
      { char: "i", color: colors.i },
      { char: "n", color: colors.n },
      { char: "S", color: colors.S },
      { char: "S", color: colors.S2 },
      { char: "i", color: colors.i2 },
      { char: "d", color: colors.d },
      { char: "e", color: colors.e },
      { char: "r", color: colors.r },
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
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
              },
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
    <div ref={containerRef} className="relative h-[300vh]  ">
      {/* First Section */}
      <motion.section
        style={{
          opacity: firstSectionOpacity,
          scale: firstSectionScale,
          y: firstSectionY,
        }}
        className={`fixed top-0 left-0 w-full  flex flex-col justify-center items-center text-cream-100 p-8  ${
          firstVisible ? "z-30" : "z-0"
        } `}
      >
        <div className=" w-full overflow-hidden bg-[#FFF8F0] flex flex-col">
          {/* Increased space for header to 80px */}
          <div className="h-20 w-full bg-transparent"></div>

          <div className="container mx-auto px-4 py-6 flex-1 flex flex-col relative">
            {/* Added extra padding to move content down slightly */}
            <main className="flex-1 flex items-center justify-center ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-6xl">
                {/* Left content - with mobile optimizations */}
                <div className="flex flex-col justify-center relative pl-4 mb-8 md:mb-0">
                  <div className="absolute -top-8 -left-8 rotate-[-15deg] bg-[#333] text-white text-sm font-bold px-3 py-1 rounded-md z-10 hidden lg:left-0 xl:block 2xl:block'">
                    최신 밈
                  </div>

                  {/* Non-interactive typography without box */}
                  <div className="relative mb-8">
                    {/* Moved TRENDING NOW to not overlap with logo */}
                    <div className="absolute -left-4 -top-8 bg-[#333] text-white px-3 py-1 text-sm font-bold ">
                      TRENDING NOW
                    </div>

                    {/* Single decorative element - hidden on very small screens */}
                    <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1 h-24 bg-[#FF8C38] hidden xs:block"></div>

                    {/* Non-interactive text with trendy typography - mobile optimized */}
                    <div className="relative">
                      <p className="text-sm font-bold text-[#FF8C38] mb-2 tracking-widest hidden sm:block uppercase">
                        Trending Meme
                      </p>

                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-3 text-[#333]">
                        <div className="flex flex-col">
                          <span style={{ fontSize: 90, marginBottom: -20 }}>
                            ❝
                          </span>
                          <span>밈 트랜드의</span>
                          <span className="inline-block text-4xl sm:text-6xl md:text-7xl -ml-2 my-2 ml-2">
                            {renderInteractiveText()}
                          </span>
                          <span className="text-3xl sm:text-5xl ml-1"></span>
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

                {/* Right content with flexible image container - mobile optimized */}
                <div className="relative max-w-60 md:max-w-md">
                  <div className="absolute inset-0 bg-[#FF8C38]/20 rounded-3xl transform rotate-3"></div>

                  <div className="relative bg-[#FFF5E9] p-3 sm:p-4 rounded-2xl shadow-lg transform -rotate-2">
                    <div className="absolute -right-3 top-10 bg-[#333] text-white px-2 z-30 sm:px-3 py-1 text-xs sm:text-sm font-bold transform rotate-90">
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
                        setIsImageHover(true);
                      }}
                      onMouseLeave={() => setIsImageHover(false)}
                    >
                      {/* Interactive elements that appear on hover/touch */}
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
                        className={`absolute top-1/4 left-1/4 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-[#FF8C38] transition-all duration-500 hidden sm:block ${
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
                        className={`absolute bottom-1/4 right-1/4 w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-[#FF8C38] transition-all duration-500 hidden sm:block ${
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

                    <div className="absolute -left-3 sm:-left-4 bottom-10 z-30 hidden md:block bg-[#333] text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold transform -rotate-90">
                      VIRAL
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* Centered START button with left-to-right lightening effect */}
            <div className="flex justify-center mt-4 sm:mt-6 mb-8 sm:mb-12">
              <Link href="/posts">
                <button
                  className="group relative overflow-hidden bg-[#FF8C38] text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                  onMouseEnter={() => setIsButtonHover(true)}
                  onMouseLeave={() => setIsButtonHover(false)}
                  onClick={() => router.push("/posts")}
                >
                  {/* Progressive lightening effect overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[#FFA559] to-[#FF8C38] transition-opacity duration-300"
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
          </div>

          {/* Background decorative elements - hidden on small screens */}
          <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-[#FF8C38]/30 hidden sm:block"></div>
          <div className="absolute bottom-40 left-55 w-24 h-24 rounded-full bg-[#FF8C38]/20 hidden sm:block"></div>
          <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-[#FF8C38]/20 hidden sm:block"></div>
        </div>
      </motion.section>

      {/* Second Section */}
      <motion.section
        style={{ opacity: secondSectionOpacity, y: secondSectionY }}
        className={`fixed top-0 left-0 w-full  flex flex-col justify-center items-center bg-cream-100 text-mocha-900 p-8 md:p-16 ${
          secondVisible ? "z-30" : "z-0"
        }`}
      >
        <div className=" bg-white flex flex-col p-6 overflow-hidden">
          {/* Simplified Top Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto flex items-start gap-6 mb-6"
          >
            {/* Vertical Title Section */}
            <div className="space-y-2">
              <motion.div
                initial={{ rotate: -3, scale: 0.9 }}
                animate={{ rotate: -3, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="inline-block bg-black text-white px-3 py-1 ml-5 text-sm font-medium rounded-full transform -rotate-3"
              >
                밈 트렌드의
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-start"
              >
                <span className="text-5xl">❝</span>
                <div className="flex flex-row items-center space-x-2">
                  <h1 className="text-xl font-bold"></h1>
                  <h1 className="text-5xl font-bold">
                    in
                    <motion.span
                      animate={{
                        color: ["#FF9142", "#FF7D29", "#FF9142"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      className="text-[#FF9142]"
                    >
                      SS
                    </motion.span>
                    ider
                  </h1>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-amber-700 text-sm"
              >
                지금 가장 인기있는 밈을 확인하세요!
              </motion.p>

              {/* Horizontal Hashtags */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap gap-2 pt-1"
              >
                {["#트렌디", "#meme", "#요즘뜨는거"].map((tag, index) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05, backgroundColor: "#FFBB80" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm cursor-pointer hover:shadow-md transition-all duration-200"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Main Content */}
          <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-start"
            >
              <div className="max-w-lg w-full">
                <motion.div
                  whileHover={{
                    boxShadow:
                      "0 10px 25px -5px rgba(249, 115, 22, 0.1), 0 8px 10px -6px rgba(249, 115, 22, 0.1)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="bg-orange-50 p-5 rounded-lg h-full flex flex-col justify-between hover:bg-orange-100/50 transition-colors duration-300"
                >
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <h2 className="font-bold text-lg group flex items-center">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-block"
                        >
                          INSSIDER는?
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6, duration: 0.4 }}
                          className="ml-2 text-orange-400 text-sm"
                        >
                          ✨
                        </motion.span>
                      </h2>
                      <p className="text-sm mt-1">
                        밈과 유행의 중심, <strong>INSSIDER(인싸이더)</strong>는
                        지금 가장 뜨거운 트렌드를 한눈에 즐길 수 있는 밈
                        큐레이션 플랫폼입니다. 지금 인터넷을 달구는 짧은 밈
                        영상, 톡톡 튀는 유행어, 요즘 애들 춤 챌린지까지 모두
                        모았습니다.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <h2 className="font-bold text-lg group flex items-center">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-block"
                        >
                          어떻게 이용하나요?
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7, duration: 0.4 }}
                          className="ml-2 text-orange-400 text-sm"
                        >
                          🚀
                        </motion.span>
                      </h2>
                      <ul className="text-sm space-y-2 mt-1">
                        {[
                          {
                            icon: "💡",
                            title: "인싸 밈 갤러리",
                            content:
                              "에서 카테고리별 최신 밈을 탐색하세요! 드라마, 예능, K-POP, 유튜브 등 다양한 주제로 나뉜 갤러리에서 취향 저격 밈을 발견할 수 있어요.",
                          },
                          {
                            icon: "🔍",
                            title: "검색 기능",
                            content:
                              "으로 지금 핫한 키워드를 빠르게 찾아보세요. 트렌드 검색창에 떠오르는 단어나 짧은 문장을 입력하면 관련 밈을 바로 확인할 수 있어요.",
                          },
                          {
                            icon: "✏️",
                            title: "공감밈 제작",
                            content:
                              "으로 나만의 콘텐츠를 만들어보세요! 일상에서 공감할 수 있는 상황을 재미있게 표현하여 다른 사용자들과 공유할 수 있어요.",
                          },
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.6 + index * 0.1,
                              duration: 0.4,
                            }}
                            whileHover={{ x: 5 }}
                            className="flex gap-2 group"
                          >
                            <motion.span
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                              className="flex-shrink-0 transition-transform duration-200"
                            >
                              {item.icon}
                            </motion.span>
                            <span>
                              <strong className="group-hover:text-orange-500 transition-colors duration-200">
                                {item.title}
                              </strong>
                              {item.content}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-4 pt-3 border-t border-orange-100"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: "🔥", text: "실시간 트렌드" },
                        { icon: "🌈", text: "다양한 카테고리" },
                        { icon: "🔍", text: "스마트 검색" },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -5 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10,
                          }}
                          className="text-center cursor-pointer"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                            }}
                            className="bg-orange-100 rounded-full h-8 w-8 flex items-center justify-center mx-auto mb-1 hover:bg-orange-200 transition-colors duration-200"
                          >
                            <span className="text-sm">{item.icon}</span>
                          </motion.div>
                          <p className="text-xs text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                            {item.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Recommendation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-start hidden md:block"
            >
              <div className="space-y-4 max-w-lg w-full">
                <motion.div
                  whileHover={{
                    boxShadow:
                      "0 10px 25px -5px rgba(219, 39, 119, 0.1), 0 8px 10px -6px rgba(219, 39, 119, 0.1)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="bg-gradient-to-r from-pink-300 via-purple-300 to-purple-400 text-gray-800 p-5 rounded-lg shadow-sm"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="font-bold text-lg mb-3 flex items-center"
                  >
                    이런 분들께 추천해요!
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.6,
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                      className="ml-2"
                    >
                      ✨
                    </motion.span>
                  </motion.h2>
                  <ul className="grid grid-cols-2 gap-3">
                    {[
                      {
                        icon: "👉",
                        title: "트렌드 선도자",
                        desc: "친구보다 한 발 앞서 트렌드를 알고 싶은 분",
                      },
                      {
                        icon: "👉",
                        title: "밈 수집러",
                        desc: "웃긴 건 무조건 저장하는 밈 수집러",
                      },
                      {
                        icon: "👉",
                        title: "크리에이터",
                        desc: "SNS에 올릴 컨텐츠 아이디어가 필요한 크리에이터",
                      },
                      {
                        icon: "👉",
                        title: "트렌드 팔로워",
                        desc: "요즘 유행하는 밈 언어를 이해하고 싶은 사람",
                      },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.03 }}
                        className="flex gap-2 items-start group cursor-pointer"
                      >
                        <motion.div
                          whileHover={{ rotate: 15 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10,
                          }}
                          className="bg-white/40 rounded-full p-1 flex-shrink-0 group-hover:bg-white/60 transition-colors duration-200"
                        >
                          <span className="text-sm">{item.icon}</span>
                        </motion.div>
                        <div>
                          <h3 className="font-medium text-sm group-hover:text-gray-900 transition-colors duration-200">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-700">{item.desc}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="mt-4 text-center"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Button className="bg-white text-purple-500 hover:bg-white/90 shadow-sm text-sm group relative overflow-hidden">
                      <Link href="posts">
                        <span className="relative z-10 group-hover:text-purple-700 transition-colors duration-200">
                          지금 인기 밈 보러가기
                        </span>
                      </Link>
                      <motion.span
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 h-1 bg-purple-200"
                      />
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  whileHover={{
                    boxShadow:
                      "0 10px 25px -5px rgba(249, 115, 22, 0.1), 0 8px 10px -6px rgba(249, 115, 22, 0.1)",
                  }}
                  className="bg-orange-50 p-5 rounded-lg hover:bg-orange-100/50 transition-colors duration-300"
                >
                  <h2 className="font-bold text-lg mb-3 flex items-center">
                    INSSIDER 특징
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.8,
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                      className="ml-2"
                    >
                      🌟
                    </motion.span>
                  </h2>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        icon: "🔥",
                        title: "실시간 트렌드",
                        desc: "매일 업데이트되는 최신 밈",
                      },
                      {
                        icon: "🌈",
                        title: "다양한 카테고리",
                        desc: "주제별 밈 탐색",
                      },
                      {
                        icon: "🔍",
                        title: "스마트 검색",
                        desc: "키워드로 빠른 검색",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                        whileHover={{ y: -5 }}
                        className="text-center cursor-pointer group"
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                            rotate: 10,
                            backgroundColor: "#FFBB80",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10,
                          }}
                          className="bg-orange-100 rounded-full h-10 w-10 flex items-center justify-center mx-auto mb-2 transition-colors duration-200"
                        >
                          <span>{item.icon}</span>
                        </motion.div>
                        <h3 className="font-medium text-xs group-hover:text-orange-600 transition-colors duration-200">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </main>
        </div>
      </motion.section>

      {/* Third Section - Meme Content with Dynamic Frame Layout */}
      <motion.section
        style={{ opacity: thirdSectionOpacity, y: thirdSectionY }}
        className={`fixed top-0 left-0 w-full  flex flex-col justify-center bg-mocha-800 text-cream-100 p-8  overflow-y-auto ${
          thirdVisible ? "z-30" : "z-0"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 ">
          <div className="w-full  ">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-mocha-900 ">
              요즘 가장 핫한 <span className="text-orange-500">밈</span> 모음
            </h2>
          </div>

          <div className="w-full max-w-6xl mx-auto min-h-[600px]">
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
