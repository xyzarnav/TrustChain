"use client";

import React from "react";
import HeaderHero from "~~/components/Trustchaincomponents/HeaderHero";
import MainContent from "~~/components/Trustchaincomponents/MainContent";
import Squares from "~~/src/blocks/Backgrounds/Squares/Squares";

// import { Metadata } from "next";
/**
 * TrustChain Landing Page
 */
const TrustchainPage: React.FC = () => {
  return (
    <div className="relative bg-light min-h-screen overflow-hidden">
      {/* Background Squares Animation */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(59, 130, 246, 0.2)"
          hoverFillColor="rgba(59, 130, 246, 0.1)"
        />
      </div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeaderHero />

        {/* Main Content (Features, About, Use Cases) */}
        <MainContent />
      </div>

      {/* Font Awesome for Icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      {/* Custom CSS for Animations */}
      <style jsx global>{`
        /* Initial states for animations */
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.6s ease-out,
            transform 0.6s ease-out;
        }

        .fade-in {
          opacity: 0;
          transition: opacity 0.8s ease-out;
        }

        .scale-in {
          opacity: 0;
          transform: scale(0.9);
          transition:
            opacity 0.6s ease-out,
            transform 0.6s ease-out;
        }

        /* Animated states */
        .fade-in-up.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-in.animate {
          opacity: 1;
        }

        .scale-in.animate {
          opacity: 1;
          transform: scale(1);
        }

        /* Navbar initial animation */
        .navbar-initial-animation {
          animation: slideDown 0.5s ease-out forwards;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }

        /* Hover pulse effect */
        .hover-pulse:hover {
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Animation delay classes */
        .delay-0 {
          transition-delay: 0s;
        }

        .delay-200 {
          transition-delay: 0.2s;
        }

        .delay-400 {
          transition-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default TrustchainPage;
