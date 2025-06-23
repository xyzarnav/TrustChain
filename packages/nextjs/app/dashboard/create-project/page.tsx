"use client";

import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import {
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  LightBulbIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Createproject: React.FC = () => {
  const { writeContractAsync: createProject, isMining: iscreateProject } = useScaffoldWriteContract({
    contractName: "TrustChain",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timePeriod, setTimePeriod] = useState<bigint>(BigInt(0));
  const [budget, setBudget] = useState<bigint>(BigInt(0));
  const [jobType, setJobType] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || timePeriod <= 0 || budget <= 0) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    try {
      toast.info("Creating project...");
      await createProject({
        functionName: "createProject",
        args: [title, description, timePeriod, budget, jobType],
      });
      toast.success("Project created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create project. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
      <div className="relative z-10">
      
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mt-20 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Create Your Project</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Launch your project on the blockchain and find the perfect contractors through our transparent bidding
              system.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-700/50"
              >
                {/* Title Input */}
                <div>
                  <label htmlFor="title" className="flex items-center text-gray-300 mb-2 text-lg">
                    <DocumentTextIcon className="h-5 w-5 mr-2 text-cyan-400" />
                    Project Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter a clear, descriptive title"
                    className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label htmlFor="description" className="flex items-center text-gray-300 mb-2 text-lg">
                    <LightBulbIcon className="h-5 w-5 mr-2 text-cyan-400" />
                    Project Description
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe your project requirements, goals, and expectations in detail..."
                    className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  ></textarea>
                </div>

                {/* Time and Budget Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Time Period Input */}
                  <div>
                    <label htmlFor="timePeriod" className="flex items-center text-gray-300 mb-2 text-lg">
                      <ClockIcon className="h-5 w-5 mr-2 text-cyan-400" />
                      Time Period
                    </label>

                    <input
                      id="timePeriod"
                      type="number"
                      min="1"
                      placeholder="Enter number of days"
                      className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        try {
                          const value = e.target.value;
                          // Convert days to seconds (24 hours * 60 minutes * 60 seconds)
                          const inSeconds = value ? BigInt(Math.floor(parseFloat(value) * 24 * 60 * 60)) : BigInt(0);
                          setTimePeriod(inSeconds);
                        } catch (error) {
                          console.error("Invalid time period input:", error);
                          setTimePeriod(BigInt(0));
                        }
                      }}
                      value={Number(timePeriod) / (24 * 60 * 60)} // Convert seconds back to days for display
                    />
                  </div>

                  {/* Budget Input */}

                  <div>
                    <label htmlFor="budget" className="flex items-center text-gray-300 mb-2 text-lg">
                      <CurrencyDollarIcon className="h-5 w-5 mr-2 text-cyan-400" />
                      Budget (ETH)
                    </label>
                    <input
                      id="budget"
                      type="number"
                      step="0.0001"
                      min="0.0001"
                      placeholder="Enter amount in ETH (e.g. 0.1, 1.0, 100)"
                      className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        try {
                          const ethValue = e.target.value;
                          // Convert ETH to Wei (1 ETH = 10^18 Wei)
                          const weiValue = ethValue ? BigInt(Math.floor(parseFloat(ethValue) * 1e18)) : BigInt(0);
                          setBudget(weiValue);
                        } catch (error) {
                          console.error("Invalid budget input:", error);
                          setBudget(BigInt(0));
                        }
                      }}
                      // Display the value in ETH
                      value={budget ? Number(budget) / 1e18 : ""}
                    />
                    <p className="text-sm text-gray-400 mt-1">Enter amount in ETH • Min: 0.0001 ETH</p>
                  </div>
                </div>

                {/* Job Type Input */}
                <div>
                  <label htmlFor="jobType" className="flex items-center text-gray-300 mb-2 text-lg">
                    <TagIcon className="h-5 w-5 mr-2 text-cyan-400" />
                    Project Type
                  </label>
                  <select
                    id="jobType"
                    value={jobType}
                    onChange={e => setJobType(Number(e.target.value))}
                    className="w-full bg-gray-700/50 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  >
                    <option value={0}>Maximum Bid - Highest offer wins</option>
                    <option value={1}>Fixed Rate - Set price contract</option>
                    <option value={2}>Minimum Bid - Lowest offer wins</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 mt-8"
                  disabled={iscreateProject}
                >
                  Launch Project
                </button>
              </form>
            </div>

            {/* Information Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-700/50 sticky top-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <InformationCircleIcon className="h-6 w-6 mr-2 text-cyan-400" />
                  Project Guidelines
                </h3>
                <div className="space-y-4 text-gray-300">
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <h4 className="font-semibold text-cyan-400 mb-2">Title & Description</h4>
                    <p className="text-sm">
                      Be specific and clear about your project requirements. Include all necessary details and
                      expectations.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <h4 className="font-semibold text-cyan-400 mb-2">Timeline</h4>
                    <p className="text-sm">
                      Set a realistic timeline for project completion. Consider complexity and potential challenges.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <h4 className="font-semibold text-cyan-400 mb-2">Budget</h4>
                    <p className="text-sm">
                      Your budget should reflect the project scope and required expertise. All transactions are in ETH.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <h4 className="font-semibold text-cyan-400 mb-2">Project Types</h4>
                    <ul className="text-sm space-y-2">
                      <li>
                        • <span className="text-cyan-400">Maximum Bid:</span> Best for high-quality, competitive
                        projects
                      </li>
                      <li>
                        • <span className="text-cyan-400">Fixed Rate:</span> Ideal for pre-defined scope and budget
                      </li>
                      <li>
                        • <span className="text-cyan-400">Minimum Bid:</span>
                        Suitable for cost-effective solutions
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Createproject;
