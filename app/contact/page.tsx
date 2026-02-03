"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import toast, {Toaster} from 'react-hot-toast';

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[url('/hero.png')] bg-cover bg-center bg-fixed bg-no-repeat">
      <Navbar />
      <Toaster position="top-center" />
      <div className="flex-grow flex items-center justify-center p-6 backdrop-blur-[2px]">
        <div className="w-full max-w-4xl bg-beige/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-dark-blue border-2">

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-dark-blue font-body text-center underline underline-offset-8 decoration-gold">
              Contact Us for Bulk Orders
            </h1>

            <form 
              onSubmit={async (e)=>{
                e.preventDefault();

                const form = e.currentTarget;
                const formData = new FormData(form);

                const payload = Object.fromEntries(formData.entries());

                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(payload)
                });

                if(res.ok) {
                  toast.success("Request Submitted!");
                  form.reset();
                } else {
                  toast.error("Something went wrong!");
                }

                if(!res.ok) {
                  const err = await res.text();
                  console.error(err);
                }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* NAME */}
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium text-dark-blue font-body">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full p-3 border border-dark-gray/50 bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-body"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium text-dark-blue font-body">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full p-3 border border-dark-gray/50 bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-body"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium text-dark-blue font-body">
                    Mobile Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 — 10 digit number"
                    className="w-full p-3 border border-dark-gray/50 bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-body"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label htmlFor="dob" className="block mb-2 font-medium text-dark-blue font-body">
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    required
                    className="w-full p-3 border border-dark-gray/50 bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-body"
                  />
                </div>

                {/* MESSAGE */}
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block mb-2 font-medium text-dark-blue font-body">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Enter your queries or order details"
                    className="w-full p-3 border border-dark-gray/50 bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-body resize-none"
                  />
                </div>

                {/* ADDRESS */}
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block mb-2 font-medium text-dark-blue font-body">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    required
                    placeholder="Enter your full address"
                    className="w-full p-3 border border-dark-gray/50 bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-body resize-none"
                  />
                </div>

                {/* HEAR ABOUT US — DROPDOWN */}
                <div className="md:col-span-2">
                  <label htmlFor="source" className="block mb-2 font-medium text-dark-blue font-body">
                    How did you hear about us?
                  </label>
                  <select
                    id="source"
                    name="source"
                    required
                    className="w-full p-3 border border-dark-gray/50 bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-body"
                  >
                    <option value="">Select an option</option>
                    <option value="website">Website</option>
                    <option value="friends_family">Friends / Family</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>

              </div>

              {/* SUBMIT */}
              <div className="flex justify-center mt-10">
                <button
                  type="submit"
                  className="px-12 py-4 bg-dark-blue text-gold font-bold text-2xl rounded-full
                             hover:bg-gold hover:text-dark-blue transform transition-all duration-200 font-body shadow-lg"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
