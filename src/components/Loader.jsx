const Loader = ({ fullScreen = false }) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 z-50 bg-primary-bg flex justify-center items-center" 
    : "flex justify-center items-center py-20";

  return (
    <div className={containerClass}>
      <div className="relative w-24 h-24">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-t-4 border-accent-gold animate-spin shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
        {/* Inner glowing ring */}
        <div className="absolute inset-2 rounded-full border-b-4 border-accent-cyan animate-spin-slow"></div>
        {/* Center dot */}
        <div className="absolute inset-10 bg-white rounded-full animate-pulse blur-[2px]"></div>
      </div>
    </div>
  );
};

export default Loader;
