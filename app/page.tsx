"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ================= HERO ================= */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } }); // Smoother easing

      tl.from(".hero-logo", {
        opacity: 0,
        y: -40,
        duration: 1.2,
        ease: "back.out(1.7)", // Subtle bounce
      })
        .from(
          ".hero-text",
          {
            opacity: 0,
            y: 50,
            duration: 1.2,
            stagger: 0.2,
          },
          "-=0.8"
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
            duration: 1,
            ease: "power2.out",
            clearProps: "all",
          },
          "-=0.6"
        );

      /* ================= HERO IMAGE PARALLAX ================= */

      // Simple parallax on scroll
      gsap.to(".hero-image", {
        scrollTrigger: {
          trigger: ".hero-image",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        y: 50, // Moves slightly slower than scroll
        ease: "none",
      });

      // Entry animation
      gsap.from(".hero-image", {
        opacity: 0,
        x: 100,
        duration: 1.8,
        ease: "power3.out",
        delay: 0.5,
      });

      /* ================= SECTION 2 ================= */

      const section2Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-2",
          start: "top 75%", // Triggers earlier for smoother flow
          end: "bottom 20%",
          toggleActions: "play none none reverse", // Reverse on scroll up for liveliness
        },
      });

      section2Timeline
        .from(".section-head", {
          opacity: 0,
          x: -50,
          duration: 1.4,
          ease: "power3.out",
        })
        .from(
          ".value-item",
          {
            opacity: 0,
            x: -30,
            duration: 1.0,
            stagger: 0.2, // Tighter stagger
            ease: "power2.out",
          },
          "-=1.0"
        )
        .from(
          ".section-image",
          {
            opacity: 0,
            scale: 0.95,
            duration: 1.6,
            ease: "power2.out",
          },
          "-=1.2"
        );

      /* ================= SECTION 3 — TEXT MANIFESTO ================= */

      gsap.from(".manifesto-line", {
        scrollTrigger: {
          trigger: ".section-3",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1.5,
        stagger: 0.4,
        ease: "power3.out",
      });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />

      <main ref={rootRef} className="bg-beige overflow-hidden">

        {/* ================= HERO ================= */}
        <section className="min-h-[calc(100vh-80px)] flex items-center px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <img
                src="/bakeology-logo.png"
                alt="Bakelogy Logo"
                className="hero-logo w-24 mb-6"
              />

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-dark-blue">
                <span className="hero-text-line block">Baked with Love,</span>
                <span className="hero-text-line block text-gold">Served with Elegance</span>
              </h1>

              <p className="hero-text-line font-body text-lg sm:text-xl text-dark-gray max-w-xl mb-10">
                Premium home-baked cakes, brownies & desserts crafted in Nagpur
                for birthdays, celebrations & bulk orders.
              </p>

              <div className="hero-cta">
                <a
                  href="/menu"
                  className="inline-flex bg-[#001D51] text-white px-10 py-4 rounded-full
                             font-semibold text-2xl shadow-md transition
                             hover:shadow-lg hover:brightness-105 hover:text-gold dancing-script"
                >
                  Explore Menu
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative hero-image">
              {/* FRAME — BEHIND IMAGE */}
              <div className="absolute -top-6 -left-6 w-full h-full border border-dark-blue/40 rounded-3xl z-0 pointer-events-none" />

              {/* IMAGE — ABOVE FRAME */}
              <div className="relative z-10 w-full h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-xl bg-light-gray">
                <img
                  src="/hero.png"
                  alt="Bakelogy desserts"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>




          </div>
        </section>

        {/* ================= SECTION 2 ================= */}
        <section className="section-2 relative py-36 bg-light-gray">

          {/* COLOR ACCENTS */}
          <div className="absolute top-24 left-20 w-[300px] h-[300px] bg-peach opacity-30 blur-[120px] rounded-full" />
          <div className="absolute bottom-24 right-24 w-[260px] h-[260px] bg-gold opacity-20 blur-[120px] rounded-full" />

          <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

            {/* LEFT — IMAGE */}
            <div className="section-image relative">
              <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/hero2.png"
                  alt="Bakelogy desserts"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-dark-blue/40 rounded-3xl -z-10" />
            </div>

            {/* RIGHT — CONTENT */}
            <div>
              <h2 className="section-head font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8 text-dark-blue">
                Crafted thoughtfully.
                <br />
                <span className="text-gold">Delivered with care.</span>
              </h2>

              <p className="font-body text-lg text-dark-gray max-w-xl mb-14 leading-relaxed">
                Bakelogy is a home-baking studio based in Nagpur, focused on
                desserts that feel personal and indulgent — whether it’s a small
                celebration or a large bulk order.
              </p>

              <div className="space-y-10">
                <div className="value-item flex gap-6">
                  <span className="font-heading text-4xl text-gold">01</span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Home-baked quality
                    </h3>
                    <p className="font-body text-dark-gray">
                      Freshly prepared in small batches with consistency and
                      care.
                    </p>
                  </div>
                </div>

                <div className="value-item flex gap-6">
                  <span className="font-heading text-4xl text-gold">02</span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Bulk orders, perfected
                    </h3>
                    <p className="font-body text-dark-gray">
                      Proven experience handling orders from 10 to 1000+ pieces.
                    </p>
                  </div>
                </div>

                <div className="value-item flex gap-6">
                  <span className="font-heading text-4xl text-gold">03</span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Loved across Nagpur
                    </h3>
                    <p className="font-body text-dark-gray">
                      Built through repeat customers and genuine word-of-mouth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================= SECTION 3 : BRAND STATEMENT ================= */}
        <section className="section-3 relative py-40 bg-beige">
          <div className="max-w-5xl mx-auto px-6 text-center">

            <h2 className="manifesto-line font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-blue leading-tight mb-12">
              Baking isn’t just a process.
              <br />
              <span className="text-gold">It’s a promise.</span>
            </h2>

            <p className="manifesto-line font-body text-lg sm:text-xl text-dark-gray leading-relaxed mb-10">
              Every order at Bakelogy is prepared with the same care — whether it’s a
              single cake or a thousand brownies. We believe consistency, freshness,
              and attention to detail are what turn desserts into memories.
            </p>

            <p className="manifesto-line font-body text-lg sm:text-xl text-dark-gray leading-relaxed">
              And that’s exactly what we deliver, every time.
            </p>
          </div>
        </section>


        {/* ================= FOOTER ================= */}
<div className="h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent blur-sm" />
        <footer className="relative bg-dark-blue text-light-gray pt-10 pb-16">
          <div className="max-w-7xl mx-auto px-6">

            {/* TOP */}
            <div className="grid md:grid-cols-3 gap-16 mb-20">

              {/* BRAND */}
              <div>
                <h3 className="font-heading text-2xl font-semibold text-beige">
                  <img src="/bakeology-text.png" alt="Bakelogy Logo" className="w-75 h-15 mb-3" />
                </h3>
                <p className="font-body text-dark-gray leading-relaxed max-w-sm">
                  A home-baking studio based in Nagpur, crafting premium desserts for
                  celebrations, events, and bulk orders with consistency and care.
                </p>
              </div>

              {/* LINKS */}
              <div>
                <h4 className="text-2xl font-bold mb-4 text-gold dancing-script">
                  Explore
                </h4>
                <ul className="space-y-3 font-body text-dark-gray">
                  <li>
                    <a href="/menu" className="hover:text-[#FFC3B0] transition">
                      Menu
                    </a>
                  </li>
                  <li>
                    <a href="/order" className="hover:text-[#FFC3B0] transition">
                      Place an Order
                    </a>
                  </li>
                  <li>
                    <a href="/bulk-orders" className="hover:text-[#FFC3B0] transition">
                      Bulk Orders
                    </a>
                  </li>
                </ul>
              </div>

              {/* CONTACT */}
              <div>
                <h4 className="text-2xl font-bold mb-4 text-gold dancing-script">
                  Get in Touch
                </h4>
                <ul className="space-y-3 font-body text-dark-gray">
                  <li>Nagpur, Maharashtra</li>
                  <li>
                    <a
                      href="tel:+91XXXXXXXXXX"
                      className="hover:text-gold transition"
                    >
                      +91 XXXXXXXXXX
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:hello@bakeologynagpur.in"
                      className="hover:text-gold transition"
                    >
                      hello@bakeologynagpur.in
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            {/* DIVIDER */}
            <div className="border-t border-gold pt-4 flex flex-col sm:flex-row justify-between items-center gap-6">

              <p className="font-body text-sm text-dark-gray">
                © {new Date().getFullYear()} Bakelogy. All rights reserved.
              </p>

              <p className="font-body text-sm text-dark-gray">
                🍰 Crafted with care in Nagpur.
              </p>

            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
