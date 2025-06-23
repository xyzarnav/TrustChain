"use client";

import React from "react";
import Footer from "~~/components/Trustchaincomponents/Footer";
import Navbar from "~~/components/Trustchaincomponents/NewNavbar";
import UserProjects from "~~/components/Trustchaincomponents/PageComponents/userprojects";

// import Squares from "~~/src/blocks/Backgrounds/Squares/Squares";

const DashboardPage: React.FC = () => {
  return (
    <div className="relative bg-gray-900 min-h-screen overflow-hidden">
      {/* Background Squares Animation */}

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        <Navbar />
        <UserProjects />
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;
