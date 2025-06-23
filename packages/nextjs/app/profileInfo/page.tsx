"use client";

import React from "react";

import UserNavCards from "~~/components/Trustchaincomponents/PageComponents/userinfo";

// import Squares from "~~/src/blocks/Backgrounds/Squares/Squares";

const DashboardPage: React.FC = () => {
  return (
    <div className="relative bg-gray-900 min-h-screen overflow-hidden">
      {/* Background Squares Animation */}

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        <UserNavCards />
      </div>
    </div>
  );
};

export default DashboardPage;
