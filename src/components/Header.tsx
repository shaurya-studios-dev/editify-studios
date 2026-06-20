"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-between items-center px-6 md:px-10 py-6 ${
        scrolled ? "bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900" : "bg-transparent"
      }`}
    >
      <Link href="/" data-cursor-hover className="flex items-center gap-3 z-50 group">
        <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-105 rounded-full overflow-hidden border border-yellow-600/30">
          <Image src="/logo.png" alt="Editify Logo" fill className="object-cover" />
        </div>
        <span className="text-zinc-900 dark:text-white font-bold text-xl tracking-widest uppercase">Editify.</span>
      </Link>

      <nav className="hidden md:flex items-center gap-10">
        <Magnetic>
          <button 
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = "/#works";
              }
            }}
            data-cursor-hover 
            className="text-sm font-medium uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Works
          </button>
        </Magnetic>
        <Magnetic>
          <a href="/#pricing" data-cursor-hover className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            Pricing
          </a>
        </Magnetic>
        <Magnetic>
          <Link href="/about" data-cursor-hover className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            About
          </Link>
        </Magnetic>
        <ThemeToggle />
      </nav>
    </header>
  );
}
