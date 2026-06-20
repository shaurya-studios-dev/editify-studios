"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      data-cursor-hover
      className="relative w-[72px] h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 shadow-inner overflow-hidden border border-zinc-300/50 dark:border-zinc-700/50 transition-all duration-500 ease-in-out flex items-center px-1 group"
      aria-label="Toggle theme"
    >
      {/* Background glow effect */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${theme === "dark" ? "opacity-100 bg-gradient-to-r from-zinc-800 to-zinc-900" : "opacity-0"}`} />
      
      {/* Icons positioned permanently in the background */}
      <div className="absolute left-3 flex items-center justify-center pointer-events-none">
        <Sun className={`w-4 h-4 transition-all duration-500 ${theme === "light" ? "text-yellow-600 opacity-100 scale-100" : "text-zinc-500 opacity-50 scale-75"}`} />
      </div>
      <div className="absolute right-3 flex items-center justify-center pointer-events-none">
        <Moon className={`w-4 h-4 transition-all duration-500 ${theme === "dark" ? "text-blue-400 opacity-100 scale-100" : "text-zinc-500 opacity-50 scale-75"}`} />
      </div>

      {/* The sliding toggle orb */}
      <div 
        className={`absolute w-7 h-7 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 ${
          theme === "dark" 
            ? "translate-x-[36px] bg-zinc-950 border border-zinc-700" 
            : "translate-x-0 bg-white border border-zinc-100"
        }`}
      />
    </button>
  );
}
