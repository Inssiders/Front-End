"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Animated3DObject } from "./animated-3d-object";

interface ThreeSceneProps {
  scrollProgress: number;
  textureUrl?: string;
  color?: string;
  wireframe?: boolean;
}

export default function ThreeScene({
  scrollProgress,
  textureUrl,
  color = "#8B5A2B",
  wireframe = false,
}: ThreeSceneProps) {
  // Calculate position and rotation based on scroll progress
  const [position, setPosition] = useState<[number, number, number]>([
    -1.5, -1, 0,
  ]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [containerStyle, setContainerStyle] = useState({
    left: "50px",
    bottom: "50px",
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // First section (0-0.33): Bottom left
    // Second section (0.33-0.66): Center
    // Third section (0.66-1): Bottom right

    let newPosition: [number, number, number] = [-1.5, -1, 0]; // Bottom left
    let newRotation: [number, number, number] = [0, 0, 0];
    let newLeft = "50px";
    let newBottom = "50px";

    if (scrollProgress < 0.33) {
      // First section: Bottom left to center
      const t = scrollProgress / 0.33;
      newPosition = [
        -1.5 + t * 1.5, // Move from left (-1.5) to center (0)
        -1 + t * 1, // Move from bottom (-1) to center (0)
        0,
      ];
      newRotation = [0, t * Math.PI, 0]; // Rotate 180 degrees as it moves to center

      // Calculate position for the container
      const leftPos = 50 + t * (window.innerWidth / 2 - 125);
      const bottomPos = 50 + t * (window.innerHeight / 2 - 125);
      newLeft = `${leftPos}px`;
      newBottom = `${bottomPos}px`;
    } else if (scrollProgress < 0.66) {
      // Second section: Center
      newPosition = [0, 0, 0];
      newRotation = [0, Math.PI, 0]; // 180 degrees rotated

      // Center position
      newLeft = `${window.innerWidth / 2 - 75}px`;
      newBottom = `${window.innerHeight / 2 - 75}px`;
    } else {
      // Third section: Center to bottom right
      const t = (scrollProgress - 0.66) / 0.34;
      newPosition = [
        t * 1.5, // Move from center (0) to right (1.5)
        -t * 1, // Move from center (0) to bottom (-1)
        0,
      ];
      newRotation = [0, Math.PI + t * Math.PI, 0]; // Continue rotating another 180 degrees

      // Calculate position for bottom right
      const leftPos =
        window.innerWidth / 2 -
        75 +
        t * (window.innerWidth - 200 - (window.innerWidth / 2 - 75));
      const bottomPos =
        window.innerHeight / 2 - 75 + t * (50 - (window.innerHeight / 2 - 75));
      newLeft = `${leftPos}px`;
      newBottom = `${bottomPos}px`;
    }

    setPosition(newPosition);
    setRotation(newRotation);
    setContainerStyle({
      left: newLeft,
      bottom: newBottom,
    });
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="fixed w-[150px] h-[150px] z-10 pointer-events-none"
      style={{
        left: containerStyle.left,
        bottom: containerStyle.bottom,
        transition: "left 0.3s ease-out, bottom 0.3s ease-out",
      }}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Animated3DObject
          position={position}
          rotation={rotation}
          textureUrl={textureUrl}
          color={color}
          scale={1}
          wireframe={wireframe}
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
