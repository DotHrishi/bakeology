"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const floatingRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initial hidden state for floating navbar
    gsap.set(floatingRef.current, { y: -100, opacity: 0 });

    ScrollTrigger.create({
      trigger: document.body,
      start: "top -150",
      end: 99999,
      onEnter: () => {
        // Only show floating nav on larger screens
        if (window.innerWidth > 768) {
          gsap.to(floatingRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        }
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
      <nav className="relative w-full z-40 bg-dark-blue border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 relative z-50">
            <Image
              src="/bakeology-logo.png"
              alt="Bakelogy Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <Image
              src="/bakeology-text.png"
              alt="Bakelogy"
              width={200}
              height={40}
              className="hidden lg:block object-contain"
            />
          </Link>

          {/* DESKTOP CONTENT */}
          <div className="hidden md:flex items-center gap-10">
            <NavLinks />
            <div className="text-gold font-extrabold font-serif">|</div>
            <CartIcon />
          </div>

          {/* MOBILE ICONS */}
          <div className="md:hidden flex items-center gap-5 relative z-50">
            <CartIcon />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gold p-1 active:scale-95 transition-transform"
            >
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 bg-dark-blue z-40 flex flex-col items-center justify-center gap-12 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-8 text-3xl font-heading font-bold text-white">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition">Home</Link>
          <Link href="/order now" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold text-peach transition">Order Now</Link>
          <Link href="/about us" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition">About Us</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition">Contact</Link>
        </div>

        <div className="w-16 h-[1px] bg-white/20" />

        <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-2xl text-gold font-heading">
          <ShoppingBag size={24} />
          <span>My Cart</span>
        </Link>
      </div>

      {/* 2. FLOATING NAVBAR (Scroll - Desktop Only) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div
          ref={floatingRef}
          className="pointer-events-auto mt-4 
                     bg-dark-blue/85 backdrop-blur-2xl
                     border border-gold shadow-[0_4px_30px_rgba(0,0,0,0.1)]
                     rounded-full px-12 py-3 hidden md:flex items-center justify-between gap-16
                     min-w-[420px] opacity-0 translate-y-[-100px]"
        >
          <NavContentCompact />
        </div>
      </div>
    </>
  );
}

function NavLinks() {
  return (
    <div className="flex items-center gap-10 text-xl font-medium font-body text-light-gray">
      {["Order Now", "About Us", "Contact"].map((item) => (
        <Link
          key={item}
          href={`/${item.toLowerCase()}`}
          className="relative group hover:text-gold transition"
        >
          {item}
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all group-hover:w-full" />
        </Link>
      ))}
    </div>
  )
}

function CartIcon({ compact = false }: { compact?: boolean }) {
  const { count } = useCart();
  return (
    <Link href="/cart" className="relative group">
      <ShoppingBag
        className={`${compact ? "w-5 h-5" : "w-6 h-6"} text-light-gray group-hover:text-gold transition`}
      />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-dark-blue bg-gold rounded-full">
          {count}
        </span>
      )}
    </Link>
  )
}

function NavContentCompact() {
  return (
    <>
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/bakeology-logo.png"
          alt="Bakelogy Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      </Link>

      <div className="flex items-center gap-6 text-xl font-medium font-body">
        <NavLinks />
        <div className="text-gold font-extrabold font-serif">|</div>
        <CartIcon compact />
      </div>
    </>
  );
}

