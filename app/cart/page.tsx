"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { items, addItem, removeItem, count } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-beige">
      <Navbar />

      <div className="max-w-4xl mx-auto w-full px-6 py-12 flex-grow">
        <h1 className="text-dark-blue font-body font-bold text-5xl mb-12 text-center underline underline-offset-8 decoration-gold">
          Your Cart
        </h1>

        {count === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-dark-gray font-body mb-8">
              Your cart is currently empty.
            </p>
            <Link
              href="/order now"
              className="inline-block px-8 py-3 bg-dark-blue text-gold font-bold text-xl rounded-full
                         hover:bg-gold hover:text-dark-blue transition-all font-body"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="bg-dark-blue backdrop-blur-md rounded-md shadow-xl overflow-hidden border border-white/50">
            <div className="divide-y divide-dark-gray/10">
              {Object.entries(items).map(([name, { quantity, image }]) => (
                <div
                  key={name}
                  className="flex items-center gap-6 p-6"
                >
                  {/* IMAGE */}
                  {/* <div className="relative w-28 h-28 overflow-hidden shadow-sm rounded-md">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  </div> */}

                  {/* DETAILS */}
                  <div className="flex-grow">
                    <h3 className="text-md font-bold text-gold font-body mb-2">
                      {name}
                    </h3>
                  </div>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center gap-4 bg-white border border-gold rounded-full p-1 shadow-sm">
                    <button
                      onClick={() => removeItem(name)}
                      className="w-8 h-8 flex items-center justify-center bg-white hover:bg-dark-blue hover:text-gold text-dark-blue rounded-full transition shadow-sm active:scale-95"
                      aria-label="Decrease quantity"
                    >
                      {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
                    </button>

                    <span className="font-bold text-xl min-w-[24px] text-center text-dark-blue font-body selection:bg-gold/30">
                      {quantity}
                    </span>

                    <button
                      onClick={() => addItem(name, image)}
                      className="w-8 h-8 flex items-center justify-center bg-dark-blue text-gold hover:bg-gold hover:text-dark-blue rounded-full transition shadow-sm active:scale-95"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL & CHECKOUT */}
            <div className="p-8 bg-white backdrop-blur-sm border-t border-dark-gray/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-dark-blue font-body tracking-wider text-md font-semibold">Total Items:</span>
                <span className="text-2xl font-bold text-dark-blue font-body">{count}</span>
              </div>

              <button className="px-12 py-4 bg-gold text-dark-blue font-bold text-xl border-2 border-dark-blue rounded-full
                             hover:bg-dark-blue hover:text-gold hover:border-2 hover:border-gold hover:shadow-gold/20 shadow-xl font-body transform hover:-translate-y-1 transition-all duration-300">
                Proceed to Confirm
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Page;