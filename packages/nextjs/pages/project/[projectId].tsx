"use client";

import React from "react";
// import Link from "next/link";
import Footer from "~~/components/Trustchaincomponents/Footer";
import Navbar from "~~/components/Trustchaincomponents/NewNavbar";
import ProjectDetails from "~~/components/Trustchaincomponents/PageComponents/ProjectDetails";

const ProjectPage = () => {
  return (
    <div className="relative bg-gray-900 min-h-screen overflow-hidden">
      <Navbar />
      <ProjectDetails />
      <Footer />
    </div>
  );
};

export default ProjectPage;
