import Link from "next/link";
import { ClipboardDocumentCheckIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const UserNavCards: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-15 mt-15">
        {/* Your Projects Card */}
        <Link
          href="/profileInfo/yourproject"
          className="group relative bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
        >
          <div className="absolute top-0 right-0 p-4">
            <DocumentTextIcon className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-white mb-2">Your Projects</h3>
            <p className="text-gray-400 mb-4">
              Manage and track all your created projects. View status, bids, and progress.
            </p>
            <span className="inline-flex items-center text-cyan-400 group-hover:text-cyan-300">
              View Projects
              <svg
                className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Your Bids Card */}
        <Link
          href="/profileInfo/yourbids"
          className="group relative bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
        >
          <div className="absolute top-0 right-0 p-4">
            <ClipboardDocumentCheckIcon className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-white mb-2">Your Bids</h3>
            <p className="text-gray-400 mb-4">
              Track your submitted bids and their status. Monitor accepted and pending proposals.
            </p>
            <span className="inline-flex items-center text-cyan-400 group-hover:text-cyan-300">
              View Bids
              <svg
                className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserNavCards;
