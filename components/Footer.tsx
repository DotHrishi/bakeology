import React from 'react'
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="relative z-50">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent blur-sm" />
      <footer className="relative bg-[#001D51] text-light-gray pt-20 pb-10 overflow-hidden">
        {/* PATTERN OVERLAY */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/bakeology-logo.png')] bg-repeat bg-[length:200px]" style={{ backgroundBlendMode: 'overlay' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* NEWSLETTER */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 backdrop-blur-lg rounded-3xl p-8 mb-20 border border-white/10">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-heading text-gold mb-2">Join our Sweet Circle</h3>
              <p className="text-white/60 font-body">Get exclusive offers and early access to new menus.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                suppressHydrationWarning
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-gold w-full md:w-80"
              />
              <button suppressHydrationWarning className="bg-gold text-dark-blue px-6 py-3 rounded-full font-body font-bold hover:bg-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* TOP GRID */}
          <div className="grid md:grid-cols-4 gap-12 mb-10">

            {/* BRAND */}
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <h3 className="font-heading text-3xl font-bold text-white"><img src="/bakeology-text.png" alt="Bakelogy" className='w-100' /></h3>
              </Link>
              <p className="font-body text-white/60 leading-relaxed max-w-sm mb-8">
                A home-baking studio based in Nagpur, crafting premium desserts for
                celebrations, events, and bulk orders with consistency and care.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/bakeology_nagpur/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-dark-blue transition-colors"><Instagram size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-dark-blue transition-colors"><Facebook size={20} /></a>
              </div>
            </div>

            {/* LINKS */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-gold font-body">
                Explore
              </h4>
              <ul className="space-y-4 font-body text-white/70">
                <li>
                  <Link href="/order now" className="hover:text-gold transition flex items-center gap-2 group">
                    Order Now <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link href="/about us" className="hover:text-gold transition flex items-center gap-2 group">
                    About Us <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-gold transition flex items-center gap-2 group">
                    My Cart <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-gold font-body">
                Get in Touch
              </h4>
              <ul className="space-y-4 font-body text-white/70">
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-gold" />
                  <span>Nagpur, Maharashtra</span>
                </li>
                <li>
                  <a href="tel:+91XXXXXXXXXX" className="hover:text-gold transition flex items-center gap-3">
                    <Phone size={18} className="text-gold" />
                    <span>+91 XXXXXXXXXX</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@bakeologynagpur.in" className="hover:text-gold transition flex items-center gap-3">
                    <Mail size={18} className="text-gold" />
                    <span>hello@bakeologynagpur.in</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* DIVIDER */}
          <div className="border-t border-white/10 pt-3 flex flex-col md:flex-row justify-between items-center gap-6">

            <p suppressHydrationWarning className="font-body text-sm text-white/40">
              © {new Date().getFullYear()} Bakelogy. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-white/40 font-body">
              <a href="#" className="hover:text-gold transition">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition">Terms of Service</a>
            </div>

          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer