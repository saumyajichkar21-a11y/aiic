import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const TeamCard = ({ member, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card group relative overflow-hidden cursor-pointer"
      onClick={() => onClick(member)}
    >
      <div className="absolute top-0 right-0 bg-accent-indigo text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10 shadow-lg">
        {member.domain}
      </div>
      
      <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-border-color group-hover:border-accent-gold transition-colors duration-300">
        <img 
          src={member.photo || 'https://via.placeholder.com/150'} 
          alt={member.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary-bg/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {member.linkedin && (
            <a 
              href={member.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-accent-gold transition-colors hover:scale-110 transform duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <FaLinkedin size={22} />
            </a>
          )}
          {member.github && (
            <a 
              href={member.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-accent-gold transition-colors hover:scale-110 transform duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={22} />
            </a>
          )}
          {member.email && (
            <a 
              href={`mailto:${member.email}`} 
              className="text-white hover:text-accent-gold transition-colors hover:scale-110 transform duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <FaEnvelope size={22} />
            </a>
          )}
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-heading font-semibold text-white mb-1 group-hover:text-accent-gold transition-colors">{member.name}</h3>
        <p className="text-accent-cyan font-medium text-sm">{member.role}</p>
        <div className="mt-4 text-[10px] text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-bold">
          View Profile
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
