"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles, Icosahedron } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

function ComplexInteractiveScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Smooth camera panning based on mouse
    const targetX = (mouse.current.x * Math.PI) / 6;
    const targetY = (mouse.current.y * Math.PI) / 6;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    
    // Always slowly rotate the globe
    groupRef.current.rotation.y += 0.001;
  });

  const materialColor = isDark ? "#ffffff" : "#000000";
  const sparkleColor = isDark ? "#ca8a04" : "#eab308"; // Golden sparkles

  return (
    <group ref={groupRef}>
      {/* Outer Geodesic Globe */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron args={[2.5, 2]}>
          <meshStandardMaterial 
            color={materialColor} 
            wireframe 
            transparent 
            opacity={isDark ? 0.15 : 0.08} 
            roughness={0.1} 
            metalness={0.8} 
          />
        </Icosahedron>
      </Float>

      {/* Inner Golden Core */}
      <Float speed={2} rotationIntensity={-1} floatIntensity={0.5}>
        <Icosahedron args={[1.5, 1]}>
          <meshStandardMaterial 
            color={isDark ? "#ca8a04" : "#eab308"} 
            wireframe 
            transparent 
            opacity={0.4} 
          />
        </Icosahedron>
      </Float>

      {/* Background Interactive Sparkles */}
      <Sparkles 
        count={400} 
        scale={12} 
        size={2.5} 
        speed={0.3} 
        opacity={isDark ? 0.4 : 0.2} 
        color={sparkleColor} 
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
    <div className="fixed inset-0 z-[-1] pointer-events-none mix-blend-difference">
      <Canvas camera={{ position: [0, 0, 7] }}>
        <ambientLight intensity={isDark ? 0.2 : 0.8} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.5 : 1} />
        <ComplexInteractiveScene isDark={isDark} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
