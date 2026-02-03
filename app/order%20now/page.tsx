"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuCard from "@/components/MenuCard";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const menuData = [
  {
    category: "Cheesecakes",
    items: [
      { name: "Classic New York", image: "/menu/cheesecakes/20251117_143050.jpg", price: "₹250", desc: "Velvety smooth & rich" },
      { name: "Blueberry", image: "/menu/cheesecakes/20251117_143050.jpg", fav: true, price: "₹280", desc: "Zesty berry compote swirl" },
      { name: "Nutella", image: "/menu/cheesecakes/20251117_143050.jpg", price: "₹290", desc: "Hazelnut chocolate bliss" },
      { name: "Basque", image: "/menu/cheesecakes/20251117_143050.jpg", price: "₹300", desc: "Caramelized burnt top" },
    ],
  },
  {
    category: "Tiramisu",
    items: [
      { name: "Tiramisu Box", image: "/menu/tiramisu/20250613_204242.jpg", fav: true, price: "₹450", desc: "Espresso soaked elegance" },
    ],
  },
  {
    category: "Brownies",
    items: [
      { name: "Fudgy Walnut", image: "/menu/brownies/20250802_151515.jpg", price: "₹150", desc: "Gooey chocolate crunch" },
      { name: "Overloaded", image: "/menu/brownies/20250802_151515.jpg", fav: true, price: "₹180", desc: "Pure chocolate decadence" },
    ],
  },
  {
    category: "Cupcakes",
    items: [
      { name: "Vanilla Bean", image: "/menu/cupcakes/20251010_101010.jpg", price: "₹80", desc: "Light, fluffy & fragrant" },
      { name: "Double Choco", image: "/menu/cupcakes/20251010_101010.jpg", price: "₹90", desc: "Intense cocoa delight" },
    ],
  },
];


export default function MenuPage() {
  useEffect(() => {
    // ✅ FIX: GSAP context + null safety
    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll(".menu-section");

      sections.forEach((section) => {
        const items = section.querySelectorAll(".menu-item");
        if (!items.length) return;

        gsap.from(items, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });
    });

    return () => ctx.revert(); // ✅ FIX: cleanup on unmount
  }, []);

  return (
    <div className="bg-beige min-h-screen">
      <Navbar />

      {/* MENU HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
            alt="Menu Hero"
            fill
            priority
            sizes="100vw" // ✅ FIX: required when using fill
            className="object-cover brightness-[0.45]"
          />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl text-white font-body font-bold drop-shadow-lg mb-4">
            Our Creations
          </h1>
          <p className="text-xl text-white/90 font-heading tracking-widest uppercase">
            <span className="text-peach">- Order Now -</span>
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
          <ChevronDown size={32} />
        </div>
      </section>

      <main className="px-6 py-20 max-w-7xl mx-auto space-y-32">
        {menuData.map((section) => (
          <section
            key={section.category}
            id={section.category}
            className="menu-section scroll-mt-40"
          >
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-5xl font-bold text-dark-blue font-body flex-shrink-0">
                {section.category}
              </h2>
              <div className="h-[1px] bg-dark-blue/10 flex-grow" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="menu-item perspective-1000 h-full"
                >
                  <MenuCard
                    name={item.name}
                    image={item.image}
                    isFavorite={item.fav}
                    price={item.price}
                    description={item.desc}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* FINAL CTA */}
      <section className="py-20 bg-dark-blue text-center text-white">
        <p className="text-2xl font-heading mb-6 max-w-2xl mx-auto px-6">
          "One cannot think well, love well, sleep well, if one has not dined well."
        </p>
        <p className="text-gold font-body text-3xl">
          ― Virginia Woolf
        </p>
      </section>

      <Footer />
    </div>
  );
}
