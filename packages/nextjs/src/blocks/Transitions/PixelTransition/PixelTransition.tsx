import React, { useEffect, useState, useRef, CSSProperties } from "react";

interface PixelTransitionProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  className?: string;
  style?: CSSProperties;
  aspectRatio?: string;
}

const PixelTransition: React.FC<PixelTransitionProps> = ({
  firstContent,
  secondContent,
  gridSize = 15,
  pixelColor = "rgb(15, 23, 42)",
  animationStepDuration = 0.05,
  className = "",
  style = {},
  aspectRatio = "16/9",
}) => {
  const [showFirst, setShowFirst] = useState(true);
  const [pixels, setPixels] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Create pixel grid array
  useEffect(() => {
    // Create a grid of pixel indices
    const totalPixels = gridSize * gridSize;
    const indices = Array.from({ length: totalPixels }, (_, i) => i);
    
    // Shuffle the array
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    setPixels(indices);
  }, [gridSize]);

  // Toggle between first and second content on hover
  useEffect(() => {
    if (!pixels.length) return;

    if (isHovering === showFirst) {
      const pixelsCopy = [...pixels];
      let currentIndex = 0;
      
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        const pixelsToShow = pixelsCopy.slice(0, currentIndex);
        const gridItems = containerRef.current?.querySelectorAll('.pixel') || [];
        
        gridItems.forEach((item, i) => {
          if (pixelsToShow.includes(i)) {
            (item as HTMLElement).style.opacity = isHovering ? '1' : '0';
          }
        });

        currentIndex += Math.ceil(pixels.length / 20); // Speed up the animation
        
        if (currentIndex >= pixels.length) {
          clearInterval(intervalRef.current!);
          setShowFirst(!isHovering);
        }
      }, animationStepDuration * 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, pixels, showFirst, animationStepDuration]);

  // Create a grid of pixel divs
  const renderPixels = () => {
    return pixels.map((_, i) => (
      <div
        key={i}
        className="pixel absolute transition-opacity duration-300"
        style={{
          width: `${100 / gridSize}%`,
          height: `${100 / gridSize}%`,
          left: `${(i % gridSize) * (100 / gridSize)}%`,
          top: `${Math.floor(i / gridSize) * (100 / gridSize)}%`,
          backgroundColor: pixelColor,
          opacity: 0,
        }}
      />
    ));
  };

  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      style={{ ...style, aspectRatio }}
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => setIsHovering(!isHovering)}
    >
      {/* First content (always rendered) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showFirst ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
        {firstContent}
      </div>
      
      {/* Second content (always rendered) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${!showFirst ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
        {secondContent}
      </div>
      
      {/* Pixelated overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {renderPixels()}
      </div>
    </div>
  );
};

export default PixelTransition;
