"use client";

import {
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { HeroSection } from "./sections/hero-section";
import { InfoSection } from "./sections/info-section";
import { MemeSection } from "./sections/meme-section";

export default function IntroClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Section visibility states
  const [firstVisible, setFirstVisible] = useState(true);
  const [secondVisible, setSecondVisible] = useState(false);
  const [thirdVisible, setThirdVisible] = useState(false);

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Update section visibility based on scroll progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setFirstVisible(latest >= 0 && latest < 0.3);
    setSecondVisible(latest >= 0.3 && latest < 0.6);
    setThirdVisible(latest >= 0.6);
  });

  // First section transforms
  const firstSectionOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const firstSectionScale = useTransform(smoothProgress, [0, 0.33], [1, 0.9]);
  const firstSectionY = useTransform(smoothProgress, [0, 0.2], [0, -50]);

  // Second section transforms
  const secondSectionOpacity = useTransform(
    smoothProgress,
    [0.2, 0.3, 0.55, 0.65],
    [0, 1, 1, 0]
  );
  const secondSectionY = useTransform(
    smoothProgress,
    [0.2, 0.3, 0.55, 0.65],
    [100, 0, 0, -100]
  );

  // Third section transforms
  const thirdSectionOpacity = useTransform(smoothProgress, [0.6, 0.7], [0, 1]);
  const thirdSectionY = useTransform(smoothProgress, [0.6, 0.7], [100, 0]);

  return (
    <div className="relative">
      <div ref={containerRef} className="relative h-[300vh] overflow-hidden">
        <HeroSection
          firstSectionOpacity={firstSectionOpacity}
          firstSectionScale={firstSectionScale}
          firstSectionY={firstSectionY}
          firstVisible={firstVisible}
        />
        <InfoSection
          secondSectionOpacity={secondSectionOpacity}
          secondSectionY={secondSectionY}
          secondVisible={secondVisible}
        />
        <MemeSection
          thirdSectionOpacity={thirdSectionOpacity}
          thirdSectionY={thirdSectionY}
          thirdVisible={thirdVisible}
        />
      </div>
    </div>
  );
}
