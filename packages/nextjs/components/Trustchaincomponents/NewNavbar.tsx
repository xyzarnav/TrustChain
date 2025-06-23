import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useAccount } from "wagmi";
import { HomeIcon, LightBulbIcon, PhoneIcon, SparklesIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { WalletIcon } from "@heroicons/react/24/outline";

// import { Address } from "~~/components/scaffold-eth";

const navLinks = [
  { name: "Home", href: "#home", icon: HomeIcon },
  { name: "Profile ", href: "/profileInfo ", icon: UserCircleIcon },
  { name: "Dashboard", href: "/dashboard", icon: SparklesIcon },
  { name: "Use Cases", href: "#use-cases", icon: LightBulbIcon },
  { name: "Contact", href: "#contact", icon: PhoneIcon },
];

const TrustChainNavbar = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <nav className="absolute inset-x-0 top-20 mx-auto max-w-6xl bg-gray-800 bg-opacity-90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center justify-between z-50 mb-10">
      {/* Brand/Logo Section */}
      <div className="text-white text-xl font-semibold tracking-wider flex-shrink-0">TrustedBond</div>

      {/* Navigation Links Section */}
      <div className="hidden md:flex items-center space-x-6 mx-4 flex-grow justify-center">
        {navLinks.map(link => (
          <a
            key={link.name}
            href={link.href}
            className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 ease-in-out group"
          >
            <link.icon className="w-5 h-5 mr-2 text-gray-400 group-hover:text-cyan-300 transition-colors duration-300" />
            <span className="text-base font-medium">{link.name}</span>
          </a>
        ))}
      </div>

      {/* Connect Wallet Button Section */}

      <div className="flex items-center gap-2 flex-shrink-0">
        <WalletIcon className="w-5 h-5 text-gray-400" />
        <ConnectButton chainStatus="none" accountStatus="address" showBalance={false} />
      </div>
    </nav>
  );
};

export default TrustChainNavbar;
