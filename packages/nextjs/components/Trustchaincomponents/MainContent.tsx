import React, { useEffect, useRef, useState } from "react";
// import CardSwap from "../../src/blocks/Components/CardSwap/CardSwap";
// import TiltedCard from "../../src/blocks/Components/TiltedCard/TiltedCard";
import AboutSection from "./AboutSection";
import FeaturesSection from "./FeatureSection";
import UseCasesSection from "./UsecaseSection";

// --- About Section Components & Data ---
// --- Use Cases Section Components & Data ---

// Define types
interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
}

type IntersectionHookReturn = [React.RefObject<HTMLElement | null>, boolean];

// --- Intersection Observer Hook ---
export const useIntersectionObserver = (options: IntersectionOptions): IntersectionHookReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // If you only want the animation to run once, uncomment the line below
        // observer.unobserve(entry.target);
      } else {
        // Optional: Reset visibility if element leaves viewport (for re-animation)
        // setIsVisible(false);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]); // Depend on options to re-create observer if they change

  return [ref, isVisible];
};

// --- MainContent Component combining all sections ---
const MainContent: React.FC = () => {
  return (
    <>
      <FeaturesSection />
      <AboutSection />
      <UseCasesSection />
    </>
  );
};

export default MainContent;
