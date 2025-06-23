import React from "react";
import Link from "next/link";
import { BriefcaseIcon, DocumentDuplicateIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";

const dashboardOptions = [
  {
    title: "Create Project",
    subtitle: "Become a Project Creator",
    description: "Launch a new transparent project and receive competitive bids from qualified contractors.",
    icon: DocumentDuplicateIcon,
    href: "/dashboard/create-project",
    color: "from-blue-500 to-cyan-400",
    hoverColor: "group-hover:from-blue-600 group-hover:to-cyan-500",
  },
  {
    title: "Submit Proposal",
    subtitle: "Bid on Available Projects",
    description:
      "Browse open projects and submit competitive proposals to win contracts through our transparent system.",
    icon: BriefcaseIcon,
    href: "/dashboard/submit-proposal",
    color: "from-emerald-500 to-green-400",
    hoverColor: "group-hover:from-emerald-600 group-hover:to-green-500",
  },
  {
    title: "Report Concern",
    subtitle: "Whistleblower Protection",
    description: "Noticed something suspicious? Report securely with full encryption and anonymity guarantees.",
    icon: ShieldExclamationIcon,
    href: "/dashboard/report-concern",
    color: "from-amber-500 to-orange-400",
    hoverColor: "group-hover:from-amber-600 group-hover:to-orange-500",
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="relative bg-gray-900 min-h-screen overflow-hidden">
     
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Navigation Bar */}

        {/* Dashboard Header */}
        <div className="pt-32 pb-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4">TrustedBond Dashboard</h1>
            <p className="text-center text-gray-300 max-w-3xl mx-auto">
              Select an option below to begin. Our blockchain-powered platform ensures transparency and security at
              every step of the project lifecycle.
            </p>
          </div>
        </div>

        {/* Dashboard Options */}
        <div className="container mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dashboardOptions.map(option => (
              <Link href={option.href} key={option.title} className="block">
                <div className="group relative h-full bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-gray-500 hover:-translate-y-1">
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-br transition-opacity duration-300 group-hover:opacity-30"></div>

                  <div className="relative p-8 h-full flex flex-col">
                    <div
                      className={`p-4 rounded-lg bg-gradient-to-br ${option.color} ${option.hoverColor} mb-6 inline-block transition-all duration-300 shadow-lg`}
                    >
                      <span className="flex items-center space-x-2">
                        {" "}
                        {/* Add flex and space-x-2 here */}
                        <option.icon className="h-8 w-8 text-white" aria-hidden="true" />
                        <h3 className="text-xl font-bold text-white mb-1">{option.title}</h3>
                      </span>
                    </div>

                    <p className="text-cyan-300 text-sm mb-3">{option.subtitle}</p>
                    <p className="text-gray-300 mb-6 flex-grow">{option.description}</p>

                    <div className="flex items-center mt-auto">
                      <span className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300">
                        Get Started
                      </span>
                      <svg
                        className="w-5 h-5 ml-2 text-white group-hover:text-cyan-300 transition-all duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
};

export default Dashboard;
