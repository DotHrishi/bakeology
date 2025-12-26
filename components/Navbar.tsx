"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial hidden state for floating navbar
    gsap.set(floatingRef.current, { y: -100, opacity: 0 });

    ScrollTrigger.create({
      trigger: document.body,
      start: "top -150", // Show after scrolling 150px
      end: 99999,
      onEnter: () => {
        gsap.to(floatingRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(floatingRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
        });
      },
    });
  }, []);

  return (
    <>
      {/* 1. STATIC TOP NAVBAR (Normal) */}
      <nav className="relative w-full z-40 bg-[var(--color-dark-blue)] border-b border-[var(--color-dark-gray)]">
        <div className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">
          <NavContent />
        </div>
      </nav>

      {/* 2. FLOATING NAVBAR (Scroll) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div
          ref={floatingRef}
          className="pointer-events-auto mt-4 
                     bg-[var(--color-dark-blue)]/75 backdrop-blur-2xl
                     border border-gold shadow-[0_4px_30px_rgba(0,0,0,0.1)]
                     rounded-full px-12 py-3 flex items-center justify-between gap-16
                     min-w-[420px] opacity-0 translate-y-[-100px]"
        >
          <NavContent compact />
        </div>
      </div>
    </>
  );
}

function NavContent({ compact = false }: { compact?: boolean }) {
  return (
    <>
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/bakeology-logo.png"
          alt="Bakelogy Logo"
          width={compact ? 32 : 40}
          height={compact ? 32 : 40}
          className="object-contain"
        />
        {!compact && (
          <Image
            src="/bakeology-text.png"
            alt="Bakelogy"
            width={140}
            height={40}
            className="hidden sm:block object-contain"
          />
        )}
        {compact && (
          <span className="font-playfair text-xl text-gold font-bold sm:hidden">B</span>
        )}
      </Link>

      {/* LINKS */}
      <div className={`flex items-center ${compact ? 'gap-6 text-sm' : 'gap-8 text-base'} text-dark-blue font-medium font-body`}>
        <Link href="/menu" className="hover:text-peach transition-colors bg-peach p-4 rounded-full">
          Menu
        </Link>
        <Link href="/order" className="hover:text-peach transition-colors bg-peach p-4 rounded-full">
          Order
        </Link>
        <Link href="/about" className="hover:text-peach transition-colors bg-peach p-4 rounded-full">
          About
        </Link>
        <Link href="/contact" className="hover:text-peach transition-colors bg-peach p-4 rounded-full">
          Contact
        </Link>
      </div>
    </>
  );
}
