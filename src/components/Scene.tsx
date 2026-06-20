"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles, RoundedBox } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

function GoldenMonolithScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const time = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    time.current += delta;
    
    // Smooth camera panning based on mouse (interactive dust & box)
    const targetX = (mouse.current.x * Math.PI) / 8;
    const targetY = (mouse.current.y * Math.PI) / 8;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    
    // Always slowly rotate the golden box
    groupRef.current.rotation.y += 0.002;
  });

  return (
    <group ref={groupRef}>
      {/* Massive Shiny Golden Box (Monolith) */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <RoundedBox args={[2.5, 4.5, 1.5]} radius={0.15} smoothness={4}>
          <meshStandardMaterial 
            color="#eab308" 
            roughness={0.15} 
            metalness={1} 
            envMapIntensity={2}
          />
        </RoundedBox>
      </Float>

      {/* Very Little Particle Dust (Layer 1 - Golden) */}
      <Sparkles 
        count={30} 
        scale={10} 
        size={4} 
        speed={0.2} 
        opacity={isDark ? 0.6 : 0.3} 
        color="#ca8a04" 
        noise={1}
      />
      
      {/* Very Little Particle Dust (Layer 2 - White/Silver for color changing effect) */}
      <Sparkles 
        count={20} 
        scale={12} 
        size={3} 
        speed={0.3} 
        opacity={isDark ? 0.5 : 0.2} 
        color="#ffffff" 
        noise={2}
      />
    </group>
  );
}

export default function Scene() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark" || !theme;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none mix-blend-normal opacity-80 dark:opacity-100">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={isDark ? 0.5 : 1} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} />
        <directionalLight position={[-10, -20, -10]} intensity={0.5} color="#ca8a04" />
        <GoldenMonolithScene isDark={isDark} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
