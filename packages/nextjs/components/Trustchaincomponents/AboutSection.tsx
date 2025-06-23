// import React, { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "./MainContent";
import ScrambledText from "~~/src/blocks/TextAnimations/ScrambledText/ScrambledText";

const AboutSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, rootMargin: "0px 0px -100px 0px" });

  return (
    <section id="about" className="py-16" ref={ref as React.RefObject<HTMLElement>}>
      {/* Centered heading */}
      <div className="container mx-auto px-4 mb-16">
        <h2
          className={`text-4xl md:text-5xl font-extrabold text-white text-center mb-6 leading-tight drop-shadow transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          About{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Trusted Bond</span>
        </h2>
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Stylish Image Card */}
        <div
          className={`
            lg:w-1/2 transition-all duration-700
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <div className="relative my-5 w-full h-full rounded-2xl overflow-hidden shadow-xl border border-slate-700">
            <img
              src="https://img.freepik.com/free-vector/blockchain-background-with-isometric-shapes_23-2147869900.jpg?t=st=1749728577~exp=1749732177~hmac=4f223e38ee7d6bf1ed279adfe44b2ae21eb678f749d93727947747bd584ddeb6&w=1380"
              alt="Blockchain abstract"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
            <div className="relative z-10 flex flex-col h-full justify-end p-8">
              <span className="text-white text-2xl font-bold drop-shadow-lg">Powering Trust with Technology</span>
              <span className="mt-2 text-cyan-300 font-semibold tracking-wide drop-shadow">
                Secure. Transparent. Decentralized.
              </span>
            </div>
          </div>
          <div className="relative my-5 w-full h-full rounded-2xl overflow-hidden shadow-xl border border-slate-700">
            <img
              src="https://img.freepik.com/free-vector/valuable-cryptocurrency-dogecoin-illustration_23-2149201703.jpg?t=st=1749728127~exp=1749731727~hmac=6feeaa33e2b756a178e2b2560b31ed8a6d253fef110a1fb5a7f95b9e7a704bd3&w=1380"
              alt="Blockchain abstract"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
            <div className="relative z-10 flex flex-col h-full justify-end p-8">
              <span className="text-white text-2xl font-bold drop-shadow-lg">Powering Trust with Technology</span>
              <span className="mt-2 text-cyan-300 font-semibold tracking-wide drop-shadow">
                Secure. Transparent. Decentralized.
              </span>
            </div>
          </div>
        </div>
        {/* Right: Content */}
        <div
          className={`
            lg:w-1/2 transition-all duration-700
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <div className="text-gray-200 text-lg leading-relaxed mb-5">
            <ScrambledText className="!m-0 max-w-full text-base md:text-lg" speed={50}>
              Trusted Bond is a pioneering Web3 platform dedicated to transforming the conventional landscape of
              government bond bidding. Our mission is to introduce unparalleled transparency, security, and efficiency
              to public procurement by leveraging the power of decentralized blockchain technology.
            </ScrambledText>
          </div>
          <div className="text-gray-300 text-lg leading-relaxed mb-5">
            <ScrambledText className="!m-0 max-w-full text-base md:text-lg" speed={50}>
              By building on Web3 principles, Trusted Bond enables secure and decentralized governance over the bond
              bidding process. Smart contracts automate the entire lifecycle, from bid submission to bond allocation,
              ensuring that rules are enforced without human intervention.
            </ScrambledText>
          </div>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-cyan-200">
              <span className="mr-2 text-xl">✔️</span>
              <span>Fraud and favoritism are minimized</span>
            </li>
            <li className="flex items-center text-cyan-200">
              <span className="mr-2 text-xl">✔️</span>
              <span>Taxpayers benefit from fair, open processes</span>
            </li>
            <li className="flex items-center text-cyan-200">
              <span className="mr-2 text-xl">✔️</span>
              <span>Equitable access for all bidders</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
