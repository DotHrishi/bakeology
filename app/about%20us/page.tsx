"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Star, Heart, Award, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Animation
      gsap.from(heroTextRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
      });

      // Parallax for Background (handled via CSS mostly, but we can add subtle movement)
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Story Section Fade In
      gsap.from(storyRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
        },
      });

      // Gallery Stagger
      const images = gsap.utils.toArray(".gallery-img");
      gsap.from(images, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-beige min-h-screen overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 hero-bg">
          <Image
            src="/hero.png"
            alt="Bakelogy Hero"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1
            ref={heroTextRef}
            className="text-6xl md:text-8xl font-bold text-white font-body mb-6 drop-shadow-lg leading-tight"
          >
            Crafting Memories, <br /> One Slice at a Time
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-heading font-light tracking-wide animate-fade-in-up delay-1000">
            Where passion meets premium ingredients to create edible art.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-[1px] h-16 bg-white/50 mx-auto"></div>
        </div>
      </div>

      {/* OUR STORY */}
      <section className="relative py-24 px-6 md:px-12 bg-beige overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div ref={storyRef} className="space-y-8">
            <h2 className="text-5xl md:text-6xl text-dark-blue font-body font-bold underline underline-offset-8 decoration-gold">
              Our Story
            </h2>
            <p className="text-lg md:text-xl text-dark-blue/80 font-body leading-relaxed">
              Started in a small home kitchen with nothing but a whisk and a dream, Bakelogy has evolved into Nagpur's premier destination for custom confections. We believe that every celebration deserves a centerpiece that tastes as exquisite as it looks.
            </p>
            <p className="text-lg md:text-xl text-dark-blue/80 font-body leading-relaxed">
              Our philosophy is simple: <span className="text-gold font-bold">never compromise on quality</span>. From Belgian chocolates to farm-fresh berries, every ingredient is hand-picked to ensure your first bite is pure magic.
            </p>

            <div className="pt-4">
              <div className="flex gap-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-dark-blue text-gold flex items-center justify-center">
                    <Star size={24} fill="currentColor" />
                  </div>
                  <span className="font-heading font-bold text-dark-blue">5-Star Rated</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-dark-blue text-gold flex items-center justify-center">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <span className="font-heading font-bold text-dark-blue">Made with Love</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-dark-blue text-gold flex items-center justify-center">
                    <Award size={24} />
                  </div>
                  <span className="font-heading font-bold text-dark-blue">Award Winning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative h-[600px] w-full rounded-full overflow-hidden border-4 border-gold shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
            <Image
              src="/hero.png"
              alt="Our Kitchen"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="bg-dark-blue py-20 text-white overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-body font-bold text-gold mb-4">Newly Added</h2>
          <p className="text-white/70 font-body text-lg">Swipe through our latest masterpieces</p>
        </div>

        <Carousel />
      </section>

      {/* CTA */}
      <section className="py-32 bg-[url('/hero2.png')] bg-cover bg-fixed bg-center relative">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-5xl md:text-7xl font-body font-bold mb-8">Ready to Indulge?</h2>
          <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto text-white/90">
            Let's turn your dream dessert into reality. Place your order today and experience the Bakelogy difference.
          </p>
          <Link
            href="/order now"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-dark-blue font-bold text-2xl rounded-full hover:bg-white hover:text-dark-blue transition-all transform hover:scale-105 shadow-xl font-body"
          >
            Order Now <ArrowRight />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;

const galleryItems = [
  {
    id: 1,
    src: "/menu/musttry/20250707_145412.jpg",
    alt: "Signature Cake",
    title: "Cinnamon Roll",
    textColor: "text-gold",
  },
  {
    id: 2,
    src: "/menu/musttry/20251119_130529(0).jpg",
    alt: "Custom Creations",
    title: "Rose Pista Tea Cake",
    textColor: "text-peach",
  },
  {
    id: 3,
    src: "/hero.png",
    alt: "Wedding Cakes",
    title: "Weddings",
    textColor: "text-gold",
  },
];

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(1);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const getPosition = (index: number) => {
    const len = galleryItems.length;
    const diff = (index - activeIndex + len) % len;

    if (diff === 0) return "center";
    if (diff === 1) return "right";
    return "left";
  };

  const getStyles = (position: string) => {
    if (position === "center") {
      return "left-1/2 -translate-x-1/2 z-20 opacity-100 scale-100 md:scale-110 shadow-2xl shadow-gold/20 blur-0 border-2 border-gold/30";
    }
    if (position === "left") {
      return "left-1/2 md:left-[20%] -translate-x-1/2 z-10 opacity-0 md:opacity-60 scale-90 blur-[1px] md:hover:blur-0 md:hover:opacity-80 pointer-events-none md:pointer-events-auto";
    }
    if (position === "right") {
      return "left-1/2 md:left-[80%] -translate-x-1/2 z-10 opacity-0 md:opacity-60 scale-90 blur-[1px] md:hover:blur-0 md:hover:opacity-80 pointer-events-none md:pointer-events-auto";
    }
    return "";
  };

  return (
    <div className="relative max-w-[1400px] mx-auto px-6 h-[500px] flex items-center justify-center group/carousel">
      {/* BUTTONS */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-10 z-30 w-12 h-12 rounded-full border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-dark-blue transition bg-dark-blue/50 backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-10 z-30 w-12 h-12 rounded-full border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-dark-blue transition bg-dark-blue/50 backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      {/* ITEMS CONTAINER */}
      <div className="relative w-full h-full perspective-1000">
        {galleryItems.map((item, index) => {
          const position = getPosition(index);
          const isCenter = position === "center";

          return (
            <div
              key={item.id}
              className={`absolute top-1/2 -translate-y-1/2
                          w-full md:w-1/3 h-96 md:h-[450px]
                          transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                          rounded-2xl
                          ${getStyles(position)}`}
            >
              <CarouselItem item={item} active={isCenter} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CarouselItem({ item, active = false }: { item: typeof galleryItems[0]; active?: boolean }) {
  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group`}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${active ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <span className={`${item.textColor} font-body text-2xl md:text-3xl font-bold border-b-2 border-gold pb-1`}>
          {item.title}
        </span>
      </div>
    </div>
  );
}