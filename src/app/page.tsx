"use client";

import DynamicVideoGrid from "@/components/intro/dynamic-video-grid";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { JSX, useEffect, useRef, useState } from "react";

// Import ThreeScene component with dynamic import to avoid SSR issues
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
  const firstSectionOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const firstSectionScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9]);
  const firstSectionY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

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

  // Update scroll progress value for ThreeScene
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(setScrollProgressValue);
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Three.js Scene (persists across all sections) */}
      <ThreeScene
        scrollProgress={scrollProgressValue}
        textureUrl="/placeholder.svg?height=150&width=150"
        color="#8B5A2B"
      />

      {/* First Section */}
      <motion.section
        style={{
          opacity: firstSectionOpacity,
          scale: firstSectionScale,
          y: firstSectionY,
        }}
        className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-mocha-900 text-cream-100 p-8 md:p-16"
      >
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover a New Experience
          </h1>
          <p className="text-xl md:text-2xl text-cream-200 max-w-2xl mx-auto">
            Immerse yourself in a world of possibilities. Our platform offers
            innovative solutions designed to transform your digital journey.
          </p>
        </div>

        <div className="absolute bottom-8 right-8 flex flex-col items-end gap-4">
          <Link
            href="/get-started"
            className="w-48 py-3 bg-cream-100 text-mocha-900 text-center font-medium rounded-lg hover:bg-cream-200 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="w-48 py-3 border border-cream-200 text-cream-100 text-center font-medium rounded-lg hover:bg-mocha-800 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="w-48 py-3 border border-cream-200 text-cream-100 text-center font-medium rounded-lg hover:bg-mocha-800 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </motion.section>

      {/* Second Section */}
      <motion.section
        style={{ opacity: secondSectionOpacity, y: secondSectionY }}
        className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-cream-100 text-mocha-900 p-8 md:p-16"
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
        className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center bg-mocha-800 text-cream-100 p-8 md:p-16 overflow-y-auto"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center lg:text-left">
              Meme Gallery
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
