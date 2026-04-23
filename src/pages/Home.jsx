import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRocket, FaLightbulb, FaUsers } from 'react-icons/fa';
import AnimatedCounter from '../components/AnimatedCounter';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import EventCard from '../components/EventCard';
import DetailModal from '../components/DetailModal';
import { getProjects } from '../api/projectApi';
import { getUpcomingEvents } from '../api/eventApi';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Dummy data for initial presentation / fallback
  const dummyProjects = [
    { _id: 'd1', title: 'Solar Car Prototype', description: 'A fully functional solar-powered vehicle...', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', techStack: ['SolidWorks', 'Arduino', 'C++'], status: 'active' },
    { _id: 'd2', title: 'AI Assistant', description: 'Voice-controlled smart assistant for campus navigation.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', techStack: ['Python', 'TensorFlow', 'React'], status: 'completed' },
    { _id: 'd3', title: 'Smart Agriculture IoT', description: 'Soil monitoring and automatic irrigation system.', image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', techStack: ['IoT', 'NodeMCU', 'MongoDB'], status: 'research' },
  ];

  const dummyEvents = [
    { _id: 'e1', title: 'Annual Hackathon 2026', description: 'Join us for 48 hours of intense coding and innovation.', date: new Date(Date.now() + 864000000).toISOString(), type: 'upcoming', venue: 'Main Auditorium, MIT' },
    { _id: 'e2', title: 'Startup Pitch Deck', description: 'Present your ideas to seed-stage investors.', date: new Date(Date.now() + 1728000000).toISOString(), type: 'upcoming', venue: 'Seminar Hall 1' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, eventRes] = await Promise.all([
          getProjects(),
          getUpcomingEvents()
        ]);
        
        // Only show up to 3 featured projects
        const liveProjects = projRes.data.slice(0, 3);
        if (liveProjects.length > 0) setFeaturedProjects(liveProjects);
        else setFeaturedProjects(dummyProjects);

        const liveEvents = eventRes.data.slice(0, 2);
        if (liveEvents.length > 0) setUpcomingEvents(liveEvents);
        else setUpcomingEvents(dummyEvents);

      } catch (error) {
        console.error('Failed to fetch home data:', error);
        setFeaturedProjects(dummyProjects);
        setUpcomingEvents(dummyEvents);
      }
    };
    fetchData();
  }, []);

  const handleItemClick = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-indigo/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-gold/20 rounded-full blur-[120px] mix-blend-screen"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white tracking-tight mb-6 leading-tight">
              Innovate. Iterate. <br />
              <span className="text-transparent bg-clip-text bg-gradient-gold animate-pulse-slow">Incubate.</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-10 font-light">
              Empowering the next generation of creators and entrepreneurs at Marathwada Institute of Technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact" className="btn-primary text-lg">Join the Council</Link>
              <Link to="/projects" className="btn-secondary text-lg bg-secondary-bg/50 backdrop-blur-sm">Explore Projects</Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-[30px] h-[50px] rounded-full border-2 border-text-secondary flex justify-center p-2">
            <div className="w-2 h-3 bg-accent-gold rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Pillars Section */}
      <section className="section-padding bg-primary-bg relative z-20">
        <div className="container mx-auto">
          <SectionHeading title="What We Do" subtitle="Our core pillars designed to transform ideas into successful enterprises." centered />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: <FaRocket />, title: 'Incubation', desc: 'Providing workspace, resources, and seed funding opportunities for early-stage startups.' },
              { icon: <FaLightbulb />, title: 'Prototyping', desc: 'Access to state-of-the-art labs and equipment to build your MVP.' },
              { icon: <FaUsers />, title: 'Mentorship', desc: 'Guidance from industry experts, alumni, and faculty advisors.' }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="glass-card text-center group"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-indigo flex items-center justify-center text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-text-secondary">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary-bg border-y border-border-color">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <AnimatedCounter end={120} suffix="+" label="Active Members" />
            <AnimatedCounter end={45} suffix="+" label="Projects Built" />
            <AnimatedCounter end={15} suffix="+" label="Startups Incubated" />
            <AnimatedCounter end={50} suffix="+" label="Events Hosted" />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-primary-bg">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <SectionHeading title="Featured Projects" subtitle="Discover what our talented members are building." />
            <Link to="/projects" className="hidden md:block btn-secondary text-sm">View All Projects</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <motion.div key={project._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <ProjectCard project={project} onClick={(p) => handleItemClick(p, 'project')} />
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/projects" className="btn-secondary text-sm inline-block w-full">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Events Quick View */}
      <section className="section-padding bg-gradient-to-b from-secondary-bg to-primary-bg">
        <div className="container mx-auto">
          <SectionHeading title="Upcoming Events" subtitle="Mark your calendars for our latest hackathons and workshops." centered />
          <div className="max-w-4xl mx-auto space-y-6 mt-12">
            {upcomingEvents.map((event, i) => (
              <EventCard key={event._id} event={event} onClick={(e) => handleItemClick(e, 'event')} />
            ))}
          </div>
          <div className="text-center mt-12">
             <Link to="/events" className="btn-secondary">View Event Calendar</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-indigo opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Ready to Build the Future?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">Whether you're a student looking to learn, or an investor looking for the next big thing.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-primary-bg text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all text-lg">Contact Us Today</Link>
          </div>
        </div>
      </section>

      <DetailModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        item={selectedItem} 
        type={modalType} 
      />
    </div>
  );
};

export default Home;
