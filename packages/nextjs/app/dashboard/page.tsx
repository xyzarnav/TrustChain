"use client";

import React from "react";
import Dashboard from "~~/components/Trustchaincomponents/PageComponents/Dashboard";

// import Squares from "~~/src/blocks/Backgrounds/Squares/Squares";

const DashboardPage: React.FC = () => {
  return (
    <div className="relative bg-gray-900 min-h-screen overflow-hidden">
      {/* Background Squares Animation */}

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
