import React, { useRef } from "react";
import ScrollVelocity from "~~/src/blocks/TextAnimations/ScrollVelocity/ScrollVelocity";

const UseCasesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null!) as React.RefObject<HTMLElement>;

  return (
    <>
      <section
        id="use-cases"
        className="py-5 "
        ref={sectionRef}
      >
        <div className="w-full">
          <ScrollVelocity
            velocity={100}
            className="mb-0"
            damping={100}
            stiffness={300}
            scrollContainerRef={sectionRef}
            texts={[
              "| Discover our Solutions | ",
              "Innovation at its Best",
              "Join the Future",
            ]}
            scrollerClassName="vibrant-text"
          />
        </div>
      </section>
      <style jsx global>{`
        @keyframes vibrantColors {
          0% {
            color: cyan;
          }
          25% {
            color: hotpink;
          }
          50% {
            color: limegreen;
          }
          75% {
            color: #9d00ff; /* neon purple */
          }
          100% {
            color: cyan;
          }
        }
        .vibrant-text {
          animation: vibrantColors 5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default UseCasesSection;
