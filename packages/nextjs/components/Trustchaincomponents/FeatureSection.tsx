import { useIntersectionObserver } from "./MainContent";
import Squares from "~~/src/blocks/Backgrounds/Squares/Squares";
// import InfiniteScroll from "~~/src/blocks/Components/InfiniteScroll/InfiniteScroll";
import InfiniteMenu from "~~/src/blocks/Components/InfiniteMenu/InfiniteMenu";

const featureImages = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80", // blockchain
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", // smart contract
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", // realtime
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80", // corruption free
];
const FeaturesSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  const featuresData = [
    {
      title: "Transparency",
      image: featureImages[0],
    },
    {
      title: "Smart Contract",
      image: featureImages[1],
    },
    {
      title: "Real-time",
      image: featureImages[2],
    },
    {
      title: "Corruption-free",
      image: featureImages[3],
    },
  ];

  return (
    <section
      id="features"
      className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col justify-center relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Squares Background Component */}
      <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: "#021c44" }}></div>
      <div className="absolute inset-0 w-full h-full">
        <Squares
          speed={0.3}
          squareSize={35}
          direction="diagonal"
          borderColor="rgba(59, 130, 246, 0.15)"
          hoverFillColor="rgba(59, 130, 246, 0.08)"
        //   backgroundColor="#ffffff"
        />
      </div>

      {/* Features title section */}
      <div className="relative z-10 text-center py-20">
        <h2
          className={`text-4xl md:text-5xl font-extrabold text-white mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Features</span>
        </h2>
        <p
          className={`text-xl text-gray-300 max-w-3xl mx-auto px-4 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Experience the power of blockchain technology in government bond procurement
        </p>
      </div>

      {/* InfiniteMenu section */}
      <div className="relative z-10 w-full">
        <InfiniteMenu
          items={featuresData.map(feature => ({
            image: feature.image,
            link: "#",
            title: feature.title,
            description: "", // Empty description as requested
            className: "", // Add a default or specific className as required
          }))}
          className="w-full h-full"
          style={{
            background: "linear-gradient(135deg, rgb(2 6 23) 0%, rgb(15 23 42) 50%, rgb(30 41 59) 100%)",
            width: "100vw",
            height: "calc(100vh - 200px)",
            minHeight: "500px",
            marginLeft: "calc(-50vw + 50%)",
            marginRight: "calc(-50vw + 50%)",
          }}
        />
      </div>
    </section>
  );
};
export default FeaturesSection;
