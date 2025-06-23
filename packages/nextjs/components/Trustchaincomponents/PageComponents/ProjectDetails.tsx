import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Abi } from "viem";
// import { publicClient } from "wagmi"; // Import publicClient from wagmi (adjust if your setup is different)
// import { PublicClient } from "viem";
// import { formatEther } from "viem";
// import { ReadContractData } from "wagmi/query";
import { readContract } from "viem/actions";
import { usePublicClient } from "wagmi";
import { useAccount } from "wagmi";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  PaperClipIcon,
  TagIcon,
  TrophyIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth/useDeployedContractInfo";

const ProjectDetails: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: deployedContract } = useDeployedContractInfo("TrustChain");
  const client = usePublicClient();
  const router = useRouter();
  const { projectId } = router.query;
  const parsedProjectId = projectId ? (Array.isArray(projectId) ? BigInt(projectId[0]) : BigInt(projectId)) : undefined;
  const [bidWinnerID, SetbidWinnerID] = useState<bigint>(BigInt(0));
  const [amount, Setamount] = useState<bigint>(BigInt(0));
  const [ipfHash, SetipfHash] = useState("");
  const [bidAmount, setBidAmount] = useState<bigint | undefined>(undefined); // State for the winner's bid amount
  const abi = deployedContract?.abi as Abi | undefined;

  const { writeContractAsync: createBid, isMining: iscreateBidMining } = useScaffoldWriteContract({
    contractName: "TrustChain",
  });
  const { writeContractAsync: awardBond, isMining: isawardBondMining } = useScaffoldWriteContract({
    contractName: "TrustChain",
  });
  const { writeContractAsync: bidEvaluation, isMining: isawardbidEvaluationMining } = useScaffoldWriteContract({
    contractName: "TrustChain",
  });

  const { data: project, isLoading } = useScaffoldReadContract({
    contractName: "TrustChain",
    functionName: "getProjectById",
    args: [parsedProjectId !== undefined ? BigInt(parsedProjectId) : undefined],
  });

  // Effect to extract bid amount when winnerBidData is available
  const handleBidEvaluation = async () => {
    if (!address || !isConnected) {
      toast.error("Please connect your wallet.");
      return;
    }

    if (!parsedProjectId) {
      toast.error("Invalid Project ID.");
      return;
    }

    try {
      // toast.loading("Evaluating bids...");

      // Step 1: Evaluate bids
      await bidEvaluation({
        functionName: "bidEvaluation",
        args: [parsedProjectId],
      });

      toast.success("Bid Evaluated Successfully!");

      // Optionally fetch and display the winner after evaluation
      if (abi && deployedContract?.address && client) {
        try {
          const winnerBidId = (await readContract(client, {
            address: deployedContract.address,
            abi,
            functionName: "getProjectBidWinner",
            args: [parsedProjectId],
          })) as bigint;

          if (winnerBidId) {
            SetbidWinnerID(winnerBidId);
            toast.info(`Winning bid ID: ${winnerBidId.toString()}`);
          }
        } catch (winnerFetchError) {
          console.warn("Could not fetch winner ID after evaluation:", winnerFetchError);
        }
      }
    } catch (error) {
      toast.error("Bid Evaluation Failed");
      console.error("Bid evaluation error:", error);
      setBidAmount(undefined);
    }
  };

  // -------------------------AWARD BOND AFTER EVAL------------
  const handleAwardbond = async () => {
    if (!address || !isConnected) {
      console.log("Not connected");
      toast.error("Please connect your wallet.");
      return;
    }
    if (!parsedProjectId) {
      console.log("Invalid ProjectId");
      toast.error("Invalid Project ID.");
      return;
    }
    // toast.loading("Processing bond award...");
    try {
      // Step 2: Read BidWinnerId
      if (!abi || !deployedContract?.address || !client) {
        toast.error("Contract ABI or address not loaded.");
        return;
      }
      const winnerBidId = (await readContract(client, {
        address: deployedContract.address,
        abi,
        functionName: "getProjectBidWinner",
        args: [parsedProjectId],
      })) as bigint;

      SetbidWinnerID(winnerBidId);
      console.log(winnerBidId);

      const winnerBond = (await readContract(client, {
        address: deployedContract.address,
        abi,
        functionName: "bids",
        args: [winnerBidId],
      })) as unknown as any[];

      const winningAmount = winnerBond[3] as bigint;
      if (!winningAmount || winningAmount <= BigInt(0)) {
        toast.error("Invalid bid amount in winning bid");
        return;
      }
      setBidAmount(winningAmount);
      console.log("winning Amount is--->", winningAmount);
      console.log("Parsed Bid Winner id -->", bidWinnerID);
      console.log("Parsed Project id -->", parsedProjectId);
      // Award Winning Bid Amount to Winner
      await awardBond({
        functionName: "awardBond",
        args: [parsedProjectId, winnerBidId],
        value: winningAmount,
      });
      console.log(bidAmount);
      toast.success(`Bond Awarded successfully! of Amount:${winningAmount}`);
    } catch (error: any) {
      const errorMessage = error?.message || "Unknown error";
      const userFriendlyMessage = errorMessage.includes("Must send full bid amount")
        ? "Failed: Must send the exact bid amount"
        : "Bond award failed";

      toast.error(userFriendlyMessage);
      console.error("Award bond error:", error);
    }
  };
  // --------------------------------------CreateBid------------------------------//
  const handleCreateBid = async () => {
    if (!address || !isConnected) {
      console.log("Not connected");
      return;
    }
    if (!amount || amount <= BigInt(0)) {
      console.log("Invalid amount");
      return;
    }

    if (!ipfHash.trim()) {
      console.log("Please enter a proposal");
      return;
    }
    try {
      await createBid({
        functionName: "createBid",
        args: [parsedProjectId, ipfHash, amount],
      });
      toast.success("Bid submitted successfully!");

      Setamount(BigInt(0));
      SetipfHash("");
    } catch (error) {
      toast.error("Bid Failed");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!parsedProjectId) console.warn("Invalid project ID");
  }, [parsedProjectId]);

  // Loading and error states
  if (!parsedProjectId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <div className="bg-red-500/10 text-red-500 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Invalid Project ID</h2>
          <p>Unable to load project details. Please check the URL and try again.</p>
          <Link
            href="/dashboard/submit-proposal"
            className="inline-flex items-center mt-4 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" /> Go Back
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mb-4"></div>
          <p className="text-cyan-400 font-medium">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <div className="bg-gray-800 text-gray-300 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
          <p>The project you&#39;re looking for doesn&#39;t exist or has been removed.</p>
          <Link
            href="/"
            className="inline-flex items-center mt-4 text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const [title, budget, description, deadline, posted, projectId_, projectType, creator, timePeriod] = project;

  // Map numeric project type to readable name
  const getProjectTypeName = (type: number): string => {
    const projectTypes = {
      0: "Maximum Bid", // Highest bid wins
      1: "Fixed Rate", // Set price, first come first serve
      2: "Minimum Bid", // Lowest bid wins
    } as const;

    return projectTypes[type as keyof typeof projectTypes] ?? "Unknown Type";
  };

  return (
    <section className="mt-11 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link
          href="/dashboard/submit-proposal"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to Projects
        </Link>

        {/* Enhanced Header */}
        <header className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-8 mb-8 border border-gray-700/50 shadow-xl">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2">{title}</h1>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-full text-sm font-medium">
                  <TagIcon className="h-4 w-4 mr-1.5" />
                  {getProjectTypeName(Number(projectType))}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                    posted ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {posted ? <CheckCircleIcon className="h-4 w-4 mr-1.5" /> : <XCircleIcon className="h-4 w-4 mr-1.5" />}
                  {posted ? "Active" : "Closed"}
                </span>
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400 mb-1 flex items-center justify-center">
                <CurrencyDollarIcon className="h-4 w-4 mr-1.5" /> Budget
              </p>
              <p className="text-2xl font-bold text-white">
                {budget ? (Number(budget) / 1e18).toFixed(4) : "0.0000"} ETH{" "}
                {/* Adjust toFixed for desired decimal places */}
              </p>
            </div>
          </div>
        </header>

        {/* Enhanced Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/70 rounded-xl shadow-lg p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <DocumentTextIcon className="h-6 w-6 mr-2 text-cyan-400" /> Project Overview
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{description}</p>
            </div>

            {/* Enhanced Bidding Form */}

            {address !== creator ? (
              <div className="bg-gray-800/70 rounded-xl p-8 border border-gray-700/50 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <TrophyIcon className="h-6 w-6 mr-2 text-cyan-400" /> Place a Bid
                </h2>

                <form
                  className="space-y-6"
                  onSubmit={e => {
                    e.preventDefault();
                    handleCreateBid();
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="bidAmount" className="flex items-center text-gray-300 mb-2">
                        <CurrencyDollarIcon className="h-4 w-4 mr-1.5" /> Bid Amount (ETH)
                      </label>
                      <input
                        id="bidAmount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          try {
                            const value = e.target.value;
                            // Convert ETH to Wei (assuming 18 decimals)
                            const inWei = value ? BigInt(Math.floor(parseFloat(value) * 1e18)) : BigInt(0);
                            Setamount(inWei);
                          } catch (error) {
                            console.log(error);

                            Setamount(BigInt(0));
                          }
                        }}
                        disabled={iscreateBidMining}
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                        <TagIcon className="h-4 w-4 mr-1.5 text-cyan-400" /> Project ID
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-white bg-gray-800/50 px-4 py-2 rounded-md">
                          #{projectId_.toString()}
                        </span>
                        <button
                          className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-md hover:bg-gray-800/50"
                          onClick={() => navigator.clipboard.writeText(projectId_.toString())}
                          title="Copy Project ID"
                        >
                          <ClipboardDocumentIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bidProposal" className="flex items-center text-gray-300 mb-2">
                      <ClipboardDocumentIcon className="h-4 w-5 mr-1.5" /> Your Proposal
                    </label>
                    <textarea
                      id="bidProposal"
                      rows={4}
                      placeholder="Describe your approach to completing this project..."
                      className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      onChange={e => SetipfHash(e.target.value)}
                      disabled={iscreateBidMining}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      disabled={iscreateBidMining}
                    >
                      <PaperClipIcon className="h-5 w-5 mr-2" />
                      {iscreateBidMining ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Submit Bid"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Show Award Contract Button for creator
              <div className="bg-gray-800/70 rounded-xl p-8 border border-gray-700/50 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <TrophyIcon className="h-6 w-6 mr-2 text-cyan-400" /> Award Contract
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={handleAwardbond}
                    disabled={isawardbidEvaluationMining || isawardBondMining}
                    className="w-1/2 inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <UserIcon className="h-5 w-5 mr-2" />
                    View and Award Bids
                  </button>
                  <button
                    disabled={isawardbidEvaluationMining || isawardBondMining}
                    onClick={handleBidEvaluation}
                    className="w-1/2 inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <ChartBarIcon className="h-5 w-5 mr-2" />
                    Evaluate Bid
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Enhanced Metadata Column */}
          <div className="space-y-6">
            {/* Project Details Card */}
            <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700/50 shadow-lg">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <TagIcon className="h-5 w-5 mr-2 text-cyan-400" /> Project Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 flex items-center">
                    <TagIcon className="h-4 w-4 mr-1.5" /> ID
                  </span>
                  <span className="text-white font-medium">{projectId_.toString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1.5" /> Duration
                  </span>
                  <span className="text-white font-medium">
                    {(Number(timePeriod) / (24 * 60 * 60)).toFixed(2)} days
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1.5" /> Deadline
                  </span>
                  <span className="text-white font-medium">
                    {new Date(Number(deadline) * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Creator Card */}
            <div className="bg-gray-800/70 rounded-xl p-6 border border-gray-700/50 shadow-lg">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-cyan-400" /> Creator
              </h3>
              <div className="text-gray-300 break-all font-mono bg-gray-900/50 p-3 rounded">{creator}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
