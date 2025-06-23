import React, { useEffect, useState } from "react";
import CTAButton from "./CTAButton";
import Squares from "~~/src/blocks/Backgrounds/Squares/Squares";

const HeaderHero = () => {
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateText(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen h-auto flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pb-20"
    >
      {/* Squares Background Component */}
      <div className="absolute inset-0 w-full h-full">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(59, 130, 246, 0.2)"
          hoverFillColor="rgba(59, 130, 246, 0.1)"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <h1
          className={`text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8 transition-all duration-1000 ${
            animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Revolutionizing{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Government Bond
          </span>{" "}
          Bidding with Web3
        </h1>

        <p
          className={`text-xl md:text-2xl text-gray-100 mb-10 transition-all duration-1000 delay-200 ${
            animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Trusted Bond leverages blockchain technology to bring unparalleled transparency, security, and efficiency to
          government bond procurement.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-400 ${
            animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <CTAButton
            text="Explore Now"
            onClick={() => {
              const element = document.getElementById("features");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm"
          />
          <CTAButton
            text="Learn More"
            onClick={() => {
              const element = document.getElementById("about");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          />
        </div>

        {/* Web3 style metrics */}
        <div
          className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-white transition-all duration-1000 delay-600 mb-20 ${
            animateText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold text-cyan-300 mb-2">100%</div>
            <div className="text-sm opacity-80">Transparency</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold text-purple-300 mb-2">0%</div>
            <div className="text-sm opacity-80">Manipulation</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-bold text-pink-300 mb-2">24/7</div>
            <div className="text-sm opacity-80">Accessibility</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;