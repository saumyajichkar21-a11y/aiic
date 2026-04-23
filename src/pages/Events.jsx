import { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import DetailModal from '../components/DetailModal';
import { getEvents } from '../api/eventApi';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  if (loading) return <Loader fullScreen />;

  const upcomingEvents = events.filter(e => e.type === 'upcoming');
  const pastEvents = events.filter(e => e.type === 'past');

  return (
    <div className="pt-32 pb-20 section-padding min-h-screen">
      <div className="container mx-auto">
        <SectionHeading title="Our Events" subtitle="Hackathons, workshops, and speaker sessions." centered />
        
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-white mb-6 border-l-4 border-accent-gold pl-4">Upcoming Events</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
              <EventCard key={event._id} event={event} onClick={handleEventClick} />
            )) : <p className="text-text-secondary">No upcoming events scheduled at the moment.</p>}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-heading font-bold text-white mb-6 border-l-4 border-text-secondary pl-4">Past Events</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pastEvents.length > 0 ? pastEvents.map(event => (
              <EventCard key={event._id} event={event} onClick={handleEventClick} />
            )) : <p className="text-text-secondary">No past events recorded.</p>}
          </div>
        </div>
      </div>

      <DetailModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        item={selectedEvent} 
        type="event" 
      />
    </div>
  );
};

export default Events;
