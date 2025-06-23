import React from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
// import { FaProjectDiagram } from "react-icons/fa";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Activeprojects: React.FC = () => {
  const { address, isConnected } = useAccount();
  const {
    data: activeProjects,
    isLoading,
    error,
  } = useScaffoldReadContract({
    contractName: "TrustChain",
    functionName: "getAllActiveProjects",
  });

  const { writeContractAsync: createBidder, isMining: isCreateBidderMinning } = useScaffoldWriteContract({
    contractName: "TrustChain",
  });

  const handleCreateBidder = async () => {
    if (!isConnected || !address) {
      console.log("Please connect your wallet first");
      return;
    }
    try {
      await createBidder({
        functionName: "createBidder",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects.</div>;
  // In Activeprojects.tsx
  if (!activeProjects || activeProjects.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-3">No Active Projects</h2>
          <p className="text-gray-300 mb-6">
            There are currently no active projects available for bidding. Check back later or create a new project to
            get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-project">
              <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg transition-all duration-200">
                Create New Project
              </button>
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow transition-all duration-200 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-medium text-gray-300 mb-2">Want to become a bidder?</h3>
          <button
            onClick={handleCreateBidder}
            disabled={isCreateBidderMinning}
            className="px-6 py-3 bg-gradient-to-r from-lime-400 to-green-500 hover:from-lime-500 hover:to-green-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center mx-auto"
          >
            <span>Register as Bidder</span>
            {isCreateBidderMinning ? (
              <svg className="w-5 h-5 ml-2 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Map contract data to UI data

  // First, define the type for project data
  type Project = {
    creator: string;
    projectId: bigint;
    description: string;
    title: string;
    timePeriod: bigint;
    deadline: bigint;
    budget: bigint;
    posted: boolean;
    projectType: number;
    auditor: string;
    hasAuditor: boolean;
  };

  // Update the mapping to use object properties instead of array indices
  const projectOptions = activeProjects.map((project: Project) => ({
    href: `/project/${project.projectId.toString()}`,
    title: project.title,
    subtitle: `Budget: ${project.budget.toString()} ETH`,
    description: project.description,
    color: "from-cyan-500 to-blue-500",
    hoverColor: "group-hover:from-cyan-600 group-hover:to-blue-600",
  }));
  return (
    <div className="relative z-10">
      {/* Dashboard Header */}
      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center relative">
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center">Active Projects</h1>
            </div>
            <div className="invisible">{/* Placeholder to maintain space */}</div>
            {/* Bidder Button remains on the right */}
            <div className="group relative">
              <button
                onClick={handleCreateBidder}
                disabled={isCreateBidderMinning}
                className="px-6 py-3 bg-gradient-to-r from-lime-400 to-green-500 hover:from-lime-500 hover:to-green-600 text-white font-bold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-green-400/50 flex items-center space-x-2"
              >
                <span>Be a Bidder</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Hover Information Box */}
              <div className="absolute right-0 mt-2 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                <div className="bg-white rounded-lg shadow-xl p-4 border border-gray-200">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Submit competitive bids for projects
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Showcase your expertise & experience
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Win contracts through transparency
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Build your reputation on blockchain
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Options */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectOptions.map(option => (
            <Link href={option.href} key={option.title} className="block">
              <div className="group relative h-full bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-gray-500 hover:-translate-y-1">
                <div className="absolute inset-0 opacity-20 bg-gradient-to-br transition-opacity duration-300 group-hover:opacity-30"></div>
                <div className="relative p-8 h-full flex flex-col">
                  <div
                    className={`p-4 rounded-lg bg-gradient-to-br ${option.color} ${option.hoverColor} mb-6 inline-block transition-all duration-300 shadow-lg`}
                  >
                    <span className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-white mb-1">{option.title}</h3>
                    </span>
                  </div>
                  <p className="text-cyan-300 text-sm mb-3">{option.subtitle}</p>
                  <p className="text-gray-300 mb-6 flex-grow line-clamp-3">{option.description}</p>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activeprojects;
