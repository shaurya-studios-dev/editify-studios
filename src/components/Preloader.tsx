"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [slideUp, setSlideUp] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          
          // Trigger slide up animation
          setTimeout(() => {
            setSlideUp(true);
            document.body.style.overflow = "auto";
          }, 400);

          // Unmount after animation completes
          setTimeout(() => {
            setHidden(true);
          }, 1400); // 400 + 1000ms animation duration

          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100000] bg-white dark:bg-[#050505] flex flex-col items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)] ${slideUp ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="flex flex-col items-center gap-8 overflow-hidden">
        <h1 className="text-black dark:text-white text-4xl md:text-6xl font-bold tracking-[0.3em] uppercase relative">
          <span className="opacity-10 text-black dark:text-white">Editify</span>
          <div 
            className="absolute top-0 left-0 text-yellow-500 overflow-hidden whitespace-nowrap transition-[width] duration-[150ms] ease-linear"
            style={{ width: `${percent}%` }}
          >
            Editify
          </div>
        </h1>
        <div className="text-zinc-500 text-sm tracking-widest font-mono font-light">
          {Math.min(percent, 100)}%
        </div>
      </div>
    </div>
  );
}
