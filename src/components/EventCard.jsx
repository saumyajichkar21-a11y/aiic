import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const EventCard = ({ event, onClick }) => {
  const isUpcoming = event.type === 'upcoming';
  const eventDate = new Date(event.date);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-2xl border cursor-pointer group transition-all duration-300 ${isUpcoming ? 'border-accent-indigo shadow-[0_0_15px_rgba(79,70,229,0.2)] bg-secondary-bg hover:shadow-indigo-500/30' : 'border-border-color bg-primary-bg/50 hover:border-accent-gold/50'}`}
      onClick={() => onClick(event)}
    >
      {isUpcoming && (
        <div className="absolute top-4 -right-8 bg-accent-gold text-primary-bg font-bold py-1 px-10 transform rotate-45 z-10 shadow-md">
          UPCOMING
        </div>
      )}
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Date Box */}
        <div className={`md:w-32 flex-shrink-0 flex flex-col items-center justify-center p-6 transition-colors ${isUpcoming ? 'bg-gradient-indigo text-white group-hover:from-indigo-500' : 'bg-secondary-bg text-text-secondary border-r border-border-color'}`}>
          <span className="text-4xl font-heading font-bold leading-none">{eventDate.getDate()}</span>
          <span className="text-sm font-bold uppercase tracking-widest mt-1">
            {eventDate.toLocaleString('default', { month: 'short' })} '{eventDate.getFullYear().toString().substr(-2)}
          </span>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8 flex-grow flex flex-col justify-center relative">
          <h3 className={`text-2xl font-heading font-bold mb-3 group-hover:text-accent-gold transition-colors ${isUpcoming ? 'text-white' : 'text-text-primary'}`}>
            {event.title}
          </h3>
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">
            {event.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mt-auto">
            <div className="flex items-center text-xs text-text-secondary">
              <FaCalendarAlt className="mr-2 text-accent-cyan" />
              {eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            {event.venue && (
              <div className="flex items-center text-xs text-text-secondary">
                <FaMapMarkerAlt className="mr-2 text-accent-cyan" />
                {event.venue}
              </div>
            )}
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-bold text-accent-cyan group-hover:underline uppercase tracking-tighter">Learn More →</span>
            
            {isUpcoming && event.registrationLink && (
              <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="btn-secondary py-1 px-4 text-[10px] uppercase inline-block">
                Register
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
