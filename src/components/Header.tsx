"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-between items-center px-10 py-6 ${
        scrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-zinc-900" : "bg-transparent"
      }`}
    >
      <Link href="/" data-cursor-hover className="flex items-center gap-2 z-50">
        <span className="text-white font-bold text-xl tracking-widest uppercase">Editify.</span>
      </Link>

      <nav className="hidden md:flex items-center gap-10">
        <Magnetic>
          <Link href="/#works" data-cursor-hover className="text-sm font-medium uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
            Works
          </Link>
        </Magnetic>
        <Magnetic>
          <Link href="/#pricing" data-cursor-hover className="text-sm font-medium uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
            Pricing
          </Link>
        </Magnetic>
        <Magnetic>
          <Link href="/about" data-cursor-hover className="text-sm font-medium uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
            About
          </Link>
        </Magnetic>
        <Magnetic>
          <Link href="mailto:hello@editify.studios" data-cursor-hover className="text-sm font-medium uppercase tracking-widest text-black bg-white px-6 py-2 rounded-full hover:bg-zinc-200 transition-colors">
            Contact
          </Link>
        </Magnetic>
      </nav>
    </header>
  );
}
