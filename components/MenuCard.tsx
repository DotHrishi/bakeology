"use client";

import Image from "next/image";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

type MenuCardProps = {
  name: string;
  image: string;
  isFavorite?: boolean;
  price?: string;
  description?: string;
};

export default function MenuCard({ name, image, isFavorite, price = "₹--", description }: MenuCardProps) {
  const { addItem, removeItem, getItemCount } = useCart();
  const quantity = getItemCount(name);

  // Mobile interaction: Click image to toggle description
  const [showDesc, setShowDesc] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addItem(name, image);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeItem(name);
  };

  return (
    <div
      className="group relative bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 h-full flex flex-col items-center text-center border border-transparent hover:border-gold/20"
      onClick={() => setShowDesc(!showDesc)}
    >

      {/* IMAGE CONTAINER */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl mb-6 shadow-inner cursor-pointer">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* HOVER/CLICK DESCRIPTION OVERLAY */}
        {description && (
          <div className={`absolute inset-0 bg-dark-blue/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${showDesc ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <p className="text-white font-body text-sm italic leading-relaxed tracking-wide">
              "{description}"
            </p>
          </div>
        )}

        {/* BADGE */}
        {isFavorite && (
          <div className="absolute top-4 right-4 bg-dark-blue backdrop-blur-md text-peach text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm z-10 font-heading tracking-[0.2em] uppercase border border-gold/20">
            Star Pick
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-grow flex flex-col justify-between w-full gap-5">
        <div>
          <h3 className="text-2xl font-bold text-dark-blue font-heading leading-tight group-hover:text-gold transition-colors duration-300">
            {name}
          </h3>
          <div className="h-[2px] w-12 bg-gold/30 mx-auto mt-4 rounded-full group-hover:w-20 transition-all duration-500" />
        </div>

        {/* ACTIONS & PRICE */}
        <div className="w-full mt-auto flex items-center justify-between gap-4">

          {/* PRICE */}
          <div className="text-2xl font-bold text-dark-blue dancing-script tracking-tight">
            {price}
          </div>

          {/* BUTTON (HALF WIDTH) */}
          <div className="w-1/2">
            {quantity === 0 ? (
              <button
                suppressHydrationWarning
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2 border border-dark-blue bg-transparent text-dark-blue py-3 rounded-full font-bold hover:bg-dark-blue hover:text-gold hover:border-dark-blue transition-all duration-300 group/btn shadow-[0_4px_14px_rgba(0,0,0,0.02)]"
              >
                <span className="font-heading uppercase tracking-widest text-sm">Add To Cart</span>
                <ShoppingBag size={14} className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300 hidden sm:block" />
              </button>
            ) : (
              <div className="w-full flex items-center justify-between bg-dark-blue text-gold rounded-full p-1.5 shadow-xl animate-in fade-in zoom-in duration-300 border border-gold/10">
                <button
                  suppressHydrationWarning
                  onClick={handleRemove}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition active:scale-90"
                >
                  <Minus size={14} />
                </button>
                <span className="font-heading text-xl text-white font-medium">{quantity}</span>
                <button
                  suppressHydrationWarning
                  onClick={handleAdd}
                  className="w-8 h-8 flex items-center justify-center bg-gold text-dark-blue rounded-full transition active:scale-90 hover:brightness-110 shadow-md"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

