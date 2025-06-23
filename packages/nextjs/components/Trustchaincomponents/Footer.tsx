import React from "react";

const bgImage =
  "https://images.unsplash.https://img.freepik.com/free-vector/business-people-using-computers-closing-deal-online-cartoon-illustration_74855-14301.jpg?t=st=1749726176~exp=1749729776~hmac=16fc11b870012ac20aed9d3c985d0d993350800210ce210a1c6262e8d9ee9146&w=1380/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1200&q=80";

const TrustChainFooter = () => {
  return (
    <footer
      id="contact"
      className="relative text-white py-16"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-blue-900/80 backdrop-blur-md"></div>
      <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand & tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
            Trusted Bond
          </span>
          <p className="text-gray-300 mb-3">
            Revolutionizing government bond bidding with <span className="text-cyan-300 font-semibold">Web3</span>.
          </p>
          <div className="flex space-x-3 mt-2">
            <a href="#" aria-label="Twitter" className="text-cyan-300 hover:text-white transition-colors text-2xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-cyan-300 hover:text-white transition-colors text-2xl">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" aria-label="GitHub" className="text-cyan-300 hover:text-white transition-colors text-2xl">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            Quick Links
          </h3>
          <ul className="space-y-2 text-center md:text-left">
            <li>
              <a href="#home" className="text-gray-300 hover:text-cyan-300 transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-300 hover:text-cyan-300 transition-colors duration-200">
                About
              </a>
            </li>
            <li>
              <a href="#features" className="text-gray-300 hover:text-cyan-300 transition-colors duration-200">
                Features
              </a>
            </li>
            <li>
              <a href="#use-cases" className="text-gray-300 hover:text-cyan-300 transition-colors duration-200">
                Use Cases
              </a>
            </li>
          </ul>
        </div>
        {/* Contact */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            Contact Us
          </h3>
          <div className="flex items-center justify-center md:justify-start mb-2 text-gray-300">
            <span className="mr-2 text-cyan-300">
              <i className="fas fa-envelope"></i>
            </span>
            <span>info@trustedbond.com</span>
          </div>
          <div className="flex items-center justify-center md:justify-start mb-4 text-gray-300">
            <span className="mr-2 text-cyan-300">
              <i className="fas fa-phone"></i>
            </span>
            <span>+91 98765 43210</span>
          </div>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href="#" className="text-cyan-300 hover:text-white transition-colors text-2xl" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-cyan-300 hover:text-white transition-colors text-2xl" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="text-cyan-300 hover:text-white transition-colors text-2xl" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="relative z-10 border-t border-blue-900/40 mt-12 pt-8 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Trusted Bond. All rights reserved.
      </div>
    </footer>
  );
};

export default TrustChainFooter;
