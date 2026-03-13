"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { User, Phone, MapPin, Info, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", phone: "", address: "", source: "" });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.phone)) {
      setPhoneError("Please enter a valid 10-digit phone number");
      return;
    }
    setPhoneError("");
    setLoading(true);

    const orderItems = Object.entries(items).map(([name, { quantity, price }]) => ({
      name,
      quantity,
      price,
      subtotal: quantity * price,
    }));

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, items: orderItems, total }),
    });
    const data = await res.json();

    setLoading(false);
    if (data.success) {
      setOrderId(data.id);
      setConfirmed(true);
    }
  };

  const handleDone = () => {
    clearCart();
    router.push("/");
  };

  if (count === 0 && !confirmed) {
    return (
      <div className="min-h-screen flex flex-col bg-beige">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-6 text-center px-6">
          <p className="text-2xl text-dark-blue font-body font-semibold">Your cart is empty.</p>
          <Link href="/order%20now" className="px-8 py-3 bg-dark-blue text-gold font-body font-bold rounded-full hover:bg-gold hover:text-dark-blue transition-all">
            Browse Menu
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-beige">
      <Navbar />

      <div className="max-w-2xl mx-auto w-full px-6 py-12 flex-grow">
        <h1 className="text-dark-blue font-body font-bold text-4xl mb-10 text-center underline underline-offset-8 decoration-gold">
          Confirm Your Order
        </h1>

        {/* ORDER SUMMARY */}
        <div className="bg-dark-blue rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-gold font-body font-bold text-lg mb-4">Order Summary</h2>
          <div className="divide-y divide-white/10">
            {Object.entries(items).map(([name, { quantity, price }]) => (
              <div key={name} className="flex justify-between items-center py-3 text-sm font-body">
                <span className="text-white">{name}</span>
                <span className="text-white/60">₹{price} × {quantity}</span>
                <span className="text-gold font-bold">₹{price * quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/20">
            <span className="text-white font-body font-semibold">Total</span>
            <span className="text-gold font-body font-bold text-xl">₹{total}</span>
          </div>
          <p className="text-white/40 font-body text-xs italic mt-2">*All prices are inclusive of GST</p>
        </div>

        {/* DETAILS FORM */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
          <h2 className="text-dark-blue font-body font-bold text-lg">Your Details</h2>

          {/* NAME */}
          <div className="group">
            <label className="block mb-2 text-sm font-body font-medium text-dark-blue uppercase tracking-wide">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-gray/60 group-focus-within:text-gold transition-colors" />
              <input
                name="name"
                type="text"
                required
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-dark-gray/30 rounded-lg font-body text-dark-blue focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all placeholder-dark-gray/40"
              />
            </div>
          </div>

          {/* PHONE */}
          <div className="group">
            <label className="block mb-2 text-sm font-body font-medium text-dark-blue uppercase tracking-wide">
              Contact Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-gray/60 group-focus-within:text-gold transition-colors" />
              <input
                name="phone"
                type="tel"
                required
                placeholder="9876543210"
                maxLength={10}
                value={form.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setForm((prev) => ({ ...prev, phone: val }));
                  if (phoneError) setPhoneError("");
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg font-body text-dark-blue focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all placeholder-dark-gray/40 ${
                  phoneError ? "border-red-500" : "border-dark-gray/30"
                }`}
              />
            </div>
            {phoneError && <p className="text-red-500 text-xs font-body mt-1">{phoneError}</p>}
          </div>

          {/* ADDRESS */}
          <div className="group">
            <label className="block mb-2 text-sm font-body font-medium text-dark-blue uppercase tracking-wide">
              Delivery Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-dark-gray/60 group-focus-within:text-gold transition-colors" />
              <textarea
                name="address"
                required
                rows={3}
                placeholder="Your full delivery address"
                value={form.address}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-dark-gray/30 rounded-lg font-body text-dark-blue focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all placeholder-dark-gray/40 resize-none"
              />
            </div>
          </div>

          {/* SOURCE */}
          <div className="group">
            <label className="block mb-2 text-sm font-body font-medium text-dark-blue uppercase tracking-wide">
              How did you hear about us?
            </label>
            <div className="relative">
              <Info className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-gray/60 group-focus-within:text-gold transition-colors pointer-events-none" />
              <select
                name="source"
                required
                value={form.source}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-dark-gray/30 rounded-lg font-body text-dark-blue focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all appearance-none bg-white"
              >
                <option value="">Select an option</option>
                <option value="instagram">Instagram</option>
                <option value="friends_family">Friends / Family</option>
                <option value="website">Website</option>
                <option value="facebook">Facebook</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 fill-current text-dark-gray" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-dark-blue text-gold font-body font-bold text-lg rounded-xl hover:bg-gold hover:text-dark-blue transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>
        </form>
      </div>

      <Footer />

      {/* CONFIRMATION MODAL */}
      {confirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-dark-blue flex items-center justify-center shadow-lg">
              <CheckCircle className="text-gold w-10 h-10" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-3xl font-body font-bold text-dark-blue mb-2">Order Confirmed!</h2>
              {orderId && (
                <p className="text-dark-blue bg-dark-blue/10 font-body font-bold text-lg px-4 py-2 rounded-lg mb-2">
                  Order ID: #{orderId}
                </p>
              )}
              <p className="text-dark-gray font-body text-lg">We&apos;ll get back to you soon!</p>
            </div>
            <button
              onClick={handleDone}
              className="px-10 py-3 bg-dark-blue text-gold font-body font-bold text-lg rounded-full hover:bg-gold hover:text-dark-blue transition-all duration-300 shadow-md"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
