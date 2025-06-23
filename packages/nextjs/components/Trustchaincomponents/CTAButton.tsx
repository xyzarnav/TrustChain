import React from "react";

interface CTAButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${className} hover-pulse`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CTAButton;
