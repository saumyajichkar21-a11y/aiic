import { motion } from 'framer-motion';
import { FaTrophy, FaBookOpen, FaMedal, FaFlag } from 'react-icons/fa';

const AchievementCard = ({ achievement, index, onClick }) => {
  const getIcon = (category) => {
    switch (category) {
      case 'award': return <FaTrophy />;
      case 'publication': return <FaBookOpen />;
      case 'recognition': return <FaMedal />;
      case 'milestone': return <FaFlag />;
      default: return <FaTrophy />;
    }
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`relative flex items-center justify-between md:justify-normal w-full mb-8 cursor-pointer group ${isEven ? 'md:flex-row-reverse' : ''}`}
      onClick={() => onClick(achievement)}
    >
      {/* Timeline marker for desktop */}
      <div className="hidden md:flex absolute left-1/2 -ml-6 w-12 h-12 rounded-full border-4 border-primary-bg bg-accent-gold text-primary-bg items-center justify-center text-xl z-10 shadow-[0_0_15px_rgba(245,166,35,0.4)] group-hover:scale-110 transition-transform">
        {getIcon(achievement.category)}
      </div>

      <div className={`w-full md:w-[48%] ${!isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <div className="glass-card p-6 h-full border-l-4 border-l-accent-gold md:border-l-0 md:border-t-4 md:border-t-accent-gold relative group-hover:border-accent-cyan transition-colors">
          {/* Mobile icon */}
          <div className="md:hidden absolute -left-4 top-4 w-8 h-8 rounded-full bg-accent-gold text-primary-bg flex items-center justify-center shadow-lg">
            {getIcon(achievement.category)}
          </div>
          
          <div className="text-accent-cyan font-mono text-sm mb-2 font-bold">
            {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          
          <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-accent-gold transition-colors">{achievement.title}</h3>
          <p className="text-text-secondary text-sm line-clamp-3">{achievement.description}</p>
          
          {achievement.image && (
            <div className="mt-4 rounded-lg overflow-hidden h-48 relative">
              <img src={achievement.image} alt={achievement.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
            </div>
          )}
          
          <div className="mt-4 text-xs font-bold text-accent-gold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
             View Full Story →
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
