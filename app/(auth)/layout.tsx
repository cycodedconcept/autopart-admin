"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// --- MOCK CAROUSEL SLIDES DATA ---
// Replace placeholders with your own image imports or asset paths
const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: "/images/authpix.png", // or your authpix variable reference
    title: "Manage Inventory Across All Warehouses",
    description:
      "Monitor stock levels, track shipments, and manage supplier orders in real time from a single optimized dashboard.",
  },
  {
    id: 2,
    image: "/images/authpix.png",
    title: "Real-time Analytics & Reporting",
    description:
      "Gain deeper insights into profit margins, customer sales trends, and inventory turnover instantly.",
  },
  {
    id: 3,
    image: "/images/authpix.png",
    title: "Seamless Supplier Integrations",
    description:
      "Automate restocking workflows and directly sync communication logs with global fulfillment partners.",
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically cycle through slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      {/* Main Structural Wrapper Container */}
      <div className="bg-white flex w-full overflow-hidden min-h-190">
        {/* LEFT COLUMN: Injected Form Content (Login / Register pages) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="w-full max-w-md p-4 md:p-8 m-auto border rounded-xl border-bordercolor shadow-lg lg:shadow-sm shadow-[#14151A0F]">{children}</div>
        </div>

        {/* RIGHT COLUMN: Interactive Branding/Marketing Carousel */}
        <div className="hidden md:flex w-1/2">
          <div className=" w-full h-full rounded-2xl bg-linear-to-br from-aorange from-35%  to-aorange to-50% p-8 flex-col justify-between items-center relative text-white transition-all duration-500 overflow-hidden">
            {/* Abstract background mesh effect layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(255,255,255,0.4),transparent_60%)]"></div>

            {/* CAROUSEL IMAGE WORKSPACE */}
            <div className="w-full h-3/4 flex-1 flex items-center justify-center relative  min-h-60 ">
              {CAROUSEL_SLIDES.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute transition-all duration-700 ease-in-out flex justify-center items-center ${
                    index === currentSlide
                      ? "opacity-100 transform translate-x-0 scale-100"
                      : "opacity-0 transform translate-x-8 scale-95 pointer-events-none"
                  }`}
                >
                  {/* Image shell tracking current context slide state */}
                  <div className="relative w-150 h-150 ">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="(max-w-md)\ 100vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* CAROUSEL TEXT CONTENT FOOTER */}
            <div className="w-full text-center z-10  flex flex-col justify-end min-h-36">
              {CAROUSEL_SLIDES.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`transition-all duration-500 ${
                    index === currentSlide ? "block" : "hidden"
                  }`}
                >
                  <h3 className="text-lg lg:text-[32px] font-bold mb-2 animate-fade-in leading-snug">
                    {slide.title}
                  </h3>
                  <p className="text-[10px] text-orange-100 max-w-xs mx-auto leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              ))}

              {/* Interactive Navigation Indicator Dots/Pips */}
              <div className="flex justify-center space-x-1.5 mt-6">
                {CAROUSEL_SLIDES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-5 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
