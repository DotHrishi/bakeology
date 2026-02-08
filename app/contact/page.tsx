"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Phone, MapPin, Send, User, Calendar, MessageSquare, Info, Instagram } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[url('/hero.png')] bg-cover bg-center bg-fixed bg-no-repeat">
      <Navbar />
      <Toaster position="top-center" />

      <div className="flex-grow flex items-center justify-center p-4 md:p-8 backdrop-blur-xs pt-24 md:pt-32">
        <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gold border-2 flex flex-col md:flex-row">

          {/* Left Side - Contact Info & Branding */}
          <div className="w-full md:w-5/12 bg-dark-blue/90 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-peach/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gold mb-6">
                Get in Touch
              </h2>
              <p className="text-light-gray/80 font-body mb-12 text-lg">
                We'd love to hear from you! Whether you have a question about our menu, pricing, or modify an order, our team is ready to answer all your questions.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-white mb-1">Phone</h3>
                    <p className="font-body text-light-gray/80">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-white mb-1">Email</h3>
                    <p className="font-body text-light-gray/80">hello@bakeology.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-white mb-1">Visit Us</h3>
                    <p className="font-body text-light-gray/80">
                      123 Baker Street, <br />
                      Foodie Town, FL 56789
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Instagram className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-white mb-1">Social</h3>
                    <a href="https://instagram.com/bakeology_nagpur" target="_blank" rel="noopener noreferrer" className="font-body text-light-gray/80 hover:text-gold transition-colors">
                      @bakeology_nagpur
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 md:mt-0">
              {/* Socials or extra info could go here */}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-7/12 bg-beige/95 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-dark-blue font-heading">
              Contact Us for Bulk Orders
            </h1>
            <p className="text-dark-gray mb-8 font-body">Fill out the form below and we'll get back to you shortly.</p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const payload = Object.fromEntries(formData.entries());

                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                });

                if (res.ok) {
                  toast.success("Request Submitted! We will get back to you soon.", {
                    duration: 5000,
                    icon: "👏",
                    style: {
                      borderRadius: "10px",
                      background: "#001D51",
                      color: "#F8C42E",
                    },
                  });
                  form.reset();
                } else {
                  toast.error("Something went wrong!");
                  const err = await res.text();
                  console.error(err);
                }
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NAME */}
                <div className="group">
                  <label htmlFor="name" className="block mb-2 font-medium text-dark-blue font-body text-sm uppercase tracking-wide">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-gray/60 group-focus-within:text-gold transition-colors">
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full pl-10 pr-4 py-3 border border-dark-gray/30 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all font-body text-dark-blue placeholder-dark-gray/40"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div className="group">
                  <label htmlFor="phone" className="block mb-2 font-medium text-dark-blue font-body text-sm uppercase tracking-wide">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-gray/60 group-focus-within:text-gold transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 border border-dark-gray/30 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all font-body text-dark-blue placeholder-dark-gray/40"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="group md:col-span-2">
                  <label htmlFor="email" className="block mb-2 font-medium text-dark-blue font-body text-sm uppercase tracking-wide">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-gray/60 group-focus-within:text-gold transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-3 border border-dark-gray/30 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all font-body text-dark-blue placeholder-dark-gray/40"
                    />
                  </div>
                </div>


                {/* DOB */}
                <div className="group">
                  <label htmlFor="dob" className="block mb-2 font-medium text-dark-blue font-body text-sm uppercase tracking-wide">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-gray/60 group-focus-within:text-gold transition-colors">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-dark-gray/30 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all font-body text-dark-blue placeholder-dark-gray/40"
                    />
                  </div>
                </div>

                {/* HEAR ABOUT US */}
                <div className="group">
                  <label htmlFor="source" className="block mb-2 font-medium text-dark-blue font-body text-sm uppercase tracking-wide">
                    Source
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-gray/60 group-focus-within:text-gold transition-colors">
                      <Info className="h-5 w-5" />
                    </div>
                    <select
                      id="source"
                      name="source"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-dark-gray/30 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all font-body text-dark-blue appearance-none"
                    >
                      <option value="">How did you hear about us?</option>
                      <option value="website">Website</option>
                      <option value="friends_family">Friends / Family</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 fill-current text-dark-gray" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="group md:col-span-2">
                  <label htmlFor="address" className="block mb-2 font-medium text-dark-blue font-body text-sm uppercase tracking-wide">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none text-dark-gray/60 group-focus-within:text-gold transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      rows={2}
                      required
                      placeholder="Your Full Address"
                      className="w-full pl-10 pr-4 py-3 border border-dark-gray/30 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all font-body text-dark-blue placeholder-dark-gray/40 resize-none"
                    />
                  </div>
                </div>


                {/* MESSAGE */}
                <div className="group md:col-span-2">
                  <label htmlFor="message" className="block mb-2 font-medium text-dark-blue font-body text-sm uppercase tracking-wide">
                    Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none text-dark-gray/60 group-focus-within:text-gold transition-colors">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about your order or query..."
                      className="w-full pl-10 pr-4 py-3 border border-dark-gray/30 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all font-body text-dark-blue placeholder-dark-gray/40 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* SUBMIT */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-dark-blue text-white font-bold text-lg rounded-xl
                             hover:bg-gold hover:text-dark-blue transform transition-all duration-300 font-body shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group-hover:scale-[1.02]"
                >
                  <span>Send Request</span>
                  <Send className="w-5 h-5 ml-2" />
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
