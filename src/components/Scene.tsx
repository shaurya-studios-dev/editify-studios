"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Scene() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark" || !theme; // Default to dark

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40 mix-blend-difference">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={isDark ? 0.2 : 0.8} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.5 : 1} />
        <Sphere args={[2, 64, 64]} scale={2.5}>
          <MeshDistortMaterial
            color={isDark ? "#222222" : "#dddddd"}
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.2}
            metalness={isDark ? 0.8 : 0.2}
          />
        </Sphere>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
