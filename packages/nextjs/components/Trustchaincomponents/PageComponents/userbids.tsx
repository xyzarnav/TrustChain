import { useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { ArrowTopRightOnSquareIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";


const UserBids: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"pending" | "accepted" | "rejected">("pending");

  const { data: yourBids, isLoading } = useScaffoldReadContract({
    contractName: "TrustChain",
    functionName: "getBidsByUser",
    args: [address],
  });

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-900">
        <DocumentTextIcon className="h-16 w-16 text-gray-600 mb-4" />
        <h2 className="text-xl text-gray-400">Please connect your wallet to view your bids</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Your Bids</h1>
          <p className="text-gray-400">Track and manage all your project bids</p>
        </div>

        {/* Bid Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-medium text-gray-300">Total Bids</h3>
            <p className="text-3xl font-bold text-white">{yourBids?.length || 0}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-medium text-gray-300">Accepted Bids</h3>
            <p className="text-3xl font-bold text-green-500">{yourBids?.filter(bid => bid.accepted).length || 0}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-medium text-gray-300">Pending Bids</h3>
            <p className="text-3xl font-bold text-cyan-500">{yourBids?.filter(bid => !bid.accepted).length || 0}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "pending" ? "bg-cyan-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Pending Bids
          </button>
          <button
            onClick={() => setActiveTab("accepted")}
            className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "accepted" ? "bg-cyan-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Accepted Bids
          </button>
          <button
            onClick={() => setActiveTab("rejected")}
            className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "rejected" ? "bg-cyan-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Rejected Bids
          </button>
        </div>

        {/* Bids Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yourBids?.map((bid, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">Bid #{bid.bidId.toString()}</h3>
                <Link href={`/project/${bid.projectId.toString()}`} className="text-cyan-400 hover:text-cyan-300">
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </Link>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2 text-cyan-400" />
                  <span>{Number(bid.amount) / 1e18} ETH</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <ClockIcon className="h-5 w-5 mr-2 text-cyan-400" />
                  <span>Project #{bid.projectId.toString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    bid.accepted ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {bid.accepted ? (
                    <>
                      <CheckCircleIcon className="h-4 w-4 mr-1.5" />
                      Accepted
                    </>
                  ) : (
                    <>
                      <ClockIcon className="h-4 w-4 mr-1.5" />
                      Pending
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!yourBids || yourBids.length === 0) && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">No bids found</h3>
            <p className="text-gray-500 mb-4">You haven&#39;t placed any bids yet.</p>
            <Link
              href="/projects"
              className="inline-flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
            >
              Browse Projects
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBids;