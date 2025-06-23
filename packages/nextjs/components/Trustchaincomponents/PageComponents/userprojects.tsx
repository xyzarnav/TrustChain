import { useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { ArrowTopRightOnSquareIcon, ClockIcon, CurrencyDollarIcon, DocumentTextIcon, TagIcon } from "@heroicons/react/24/outline";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";


const UserProjects: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  const { data: yourProjects, isLoading } = useScaffoldReadContract({
    contractName: "TrustChain",
    functionName: "getProjectsByCreator",
    args: [address],
  });

  const getProjectTypeName = (type: number): string => {
    const projectTypes = {
      0: "Maximum Bid",
      1: "Fixed Rate",
      2: "Minimum Bid",
    } as const;
    return projectTypes[type as keyof typeof projectTypes] ?? "Unknown Type";
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-900">
        <DocumentTextIcon className="h-16 w-16 text-gray-600 mb-4" />
        <h2 className="text-xl text-gray-400">Please connect your wallet to view your projects</h2>
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
        <div className="text-center pt-15 mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Your Projects</h1>
          <p className="text-gray-400">Manage and track all your created projects</p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-medium text-gray-300">Total Projects</h3>
            <p className="text-3xl font-bold text-white">{yourProjects?.length || 0}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-medium text-gray-300">Active Projects</h3>
            <p className="text-3xl font-bold text-cyan-500">{yourProjects?.filter(p => p.posted).length || 0}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-medium text-gray-300">Completed</h3>
            <p className="text-3xl font-bold text-green-500">{yourProjects?.filter(p => !p.posted).length || 0}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "active" ? "bg-cyan-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Active Projects
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "completed" ? "bg-cyan-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Completed Projects
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yourProjects?.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white truncate">{project.title}</h3>
                <Link href={`/project/${project.projectId.toString()}`} className="text-cyan-400 hover:text-cyan-300">
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </Link>
              </div>

              <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-gray-300">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2 text-cyan-400" />
                  <span>{Number(project.budget) / 1e18} ETH</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <ClockIcon className="h-5 w-5 mr-2 text-cyan-400" />
                  <span>{Number(project.timePeriod) / (24 * 60 * 60)} days</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <TagIcon className="h-5 w-5 mr-2 text-cyan-400" />
                  <span>{getProjectTypeName(Number(project.projectType))}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    project.posted ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"
                  }`}
                >
                  {project.posted ? "Active" : "Completed"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!yourProjects || yourProjects.length === 0) && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-4">You haven&#39;t created any projects yet.</p>
            <Link
              href="/dashboard/create-project"
              className="inline-flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
            >
              Create Your First Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProjects;