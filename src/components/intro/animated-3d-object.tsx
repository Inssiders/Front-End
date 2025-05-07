"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Animated3DObjectProps {
  position: [number, number, number];
  rotation: [number, number, number];
  textureUrl?: string;
  color?: string;
  scale?: number;
  wireframe?: boolean;
}

export function Animated3DObject({
  position,
  rotation,
  textureUrl,
  color = "#8B5A2B",
  scale = 1,
  wireframe = false,
}: Animated3DObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetPosition = useRef<[number, number, number]>(position);
  const targetRotation = useRef<[number, number, number]>(rotation);
  const currentPosition = useRef<[number, number, number]>([...position]);
  const currentRotation = useRef<[number, number, number]>([...rotation]);

  // Handle texture loading
  const texture = useTexture(textureUrl || ""); // Provide an empty string as default

  // Update target position and rotation when props change
  useEffect(() => {
    targetPosition.current = position;
    targetRotation.current = rotation;
  }, [position, rotation]);

  // Animate position and rotation on each frame
  useFrame(() => {
    if (!meshRef.current) return;

    // Smoothly interpolate position
    currentPosition.current = currentPosition.current.map((current, i) => {
      return THREE.MathUtils.lerp(current, targetPosition.current[i], 0.05);
    }) as [number, number, number];

    // Smoothly interpolate rotation
    currentRotation.current = currentRotation.current.map((current, i) => {
      return THREE.MathUtils.lerp(current, targetRotation.current[i], 0.05);
    }) as [number, number, number];

    // Apply position and rotation
    meshRef.current.position.set(...currentPosition.current);
    meshRef.current.rotation.set(...currentRotation.current);
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        map={textureUrl ? texture : null}
        wireframe={wireframe}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
}
