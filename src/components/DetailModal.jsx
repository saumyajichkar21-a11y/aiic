import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaLink, FaTrophy, FaBookOpen, FaMedal, FaFlag, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const DetailModal = ({ isOpen, onClose, item, type }) => {
  if (!item) return null;

  const getIcon = (category) => {
    switch (category) {
      case 'award': return <FaTrophy />;
      case 'publication': return <FaBookOpen />;
      case 'recognition': return <FaMedal />;
      case 'milestone': return <FaFlag />;
      default: return null;
    }
  };

  const isEvent = type === 'event';
  const isProject = type === 'project';
  const isTeam = type === 'team';
  const itemDate = item.date ? new Date(item.date) : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary-bg/90 backdrop-blur-md"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl bg-secondary-bg border border-border-color rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-primary-bg/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-accent-gold hover:text-primary-bg transition-all"
            >
              <FaTimes />
            </button>

            {/* Header Image / Team Photo */}
            <div className={`relative ${isTeam ? 'h-72 md:h-96' : 'h-64 md:h-80'} w-full overflow-hidden`}>
              <img
                src={isTeam ? (item.photo || 'https://via.placeholder.com/400x400') : (item.image || 'https://via.placeholder.com/800x400')}
                alt={item.title || item.name}
                className={`w-full h-full ${isTeam ? 'object-contain bg-primary-bg/50' : 'object-cover'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-bg via-transparent to-transparent"></div>
              
              {/* Category Icon for Achievements */}
              {type === 'achievement' && item.category && (
                <div className="absolute bottom-6 left-8 w-14 h-14 rounded-full bg-accent-gold text-primary-bg flex items-center justify-center text-2xl shadow-xl">
                  {getIcon(item.category)}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 -mt-6 relative z-10">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isEvent ? (item.type === 'upcoming' ? 'bg-accent-indigo text-white' : 'bg-border-color text-text-secondary') : 
                  isProject ? (item.status === 'active' ? 'bg-success text-white' : 'bg-accent-indigo text-white') :
                  isTeam ? 'bg-accent-cyan text-primary-bg' :
                  'bg-accent-gold text-primary-bg'
                }`}>
                  {isEvent ? item.type : isProject ? item.status : isTeam ? item.category : item.category}
                </span>
                
                {isTeam && (
                   <span className="text-accent-gold text-sm font-semibold tracking-wide uppercase">
                    {item.domain}
                  </span>
                )}

                {itemDate && !isTeam && (
                  <span className="text-text-secondary text-sm font-mono flex items-center gap-2">
                    <FaCalendarAlt className="text-accent-cyan" />
                    {itemDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                )}
              </div>

              <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-2 leading-tight">
                {item.title || item.name}
              </h2>
              
              {isTeam && (
                <p className="text-xl text-text-secondary mb-8 font-medium italic">
                  {item.role}
                </p>
              )}

              {isEvent && item.venue && (
                <div className="flex items-center gap-2 text-text-secondary mb-6 bg-primary-bg/50 p-3 rounded-lg border border-border-color/50 inline-flex">
                  <FaMapMarkerAlt className="text-accent-gold" />
                  <span className="text-sm font-medium">{item.venue}</span>
                </div>
              )}

              {isProject && item.techStack && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-primary-bg text-accent-cyan text-xs font-mono rounded border border-border-color">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {isTeam && (
                <div className="flex gap-6 mb-8 text-2xl text-text-secondary">
                  {item.linkedin && (
                    <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">
                      <FaLinkedin />
                    </a>
                  )}
                  {item.github && (
                    <a href={item.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">
                      <FaGithub />
                    </a>
                  )}
                  {item.email && (
                    <a href={`mailto:${item.email}`} className="hover:text-accent-gold transition-colors">
                      <FaEnvelope />
                    </a>
                  )}
                </div>
              )}

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-text-secondary leading-relaxed mb-8 whitespace-pre-wrap">
                  {item.description || item.bio || `No additional details available for this ${type}.`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-border-color">
                {isEvent && item.registrationLink && item.type === 'upcoming' && (
                  <a
                    href={item.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                  >
                    Register for Event <FaLink />
                  </a>
                )}
                {isProject && (item.githubLink || item.liveLink) && (
                  <>
                    {item.githubLink && (
                      <a href={item.githubLink} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
                        GitHub Repo <FaGithub />
                      </a>
                    )}
                    {item.liveLink && (
                      <a href={item.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                        Live Demo <FaLink />
                      </a>
                    )}
                  </>
                )}
                <button
                  onClick={onClose}
                  className="btn-secondary"
                >
                  Close View
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DetailModal;
