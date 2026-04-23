import { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import TeamCard from '../components/TeamCard';
import Loader from '../components/Loader';
import DetailModal from '../components/DetailModal';
import { getTeam } from '../api/teamApi';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await getTeam();
        setTeam(data);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const filteredTeam = filter === 'all' ? team : team.filter(member => member.category === filter);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="pt-32 pb-20 section-padding min-h-screen">
      <div className="container mx-auto">
        <SectionHeading title="Meet The Team" subtitle="The minds behind the innovation." centered />
        
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {['all', 'faculty', 'core', 'member'].map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${filter === category ? 'bg-accent-gold text-primary-bg' : 'bg-secondary-bg text-text-secondary hover:text-white border border-border-color'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredTeam.map(member => (
            <TeamCard key={member._id} member={member} onClick={handleMemberClick} />
          ))}
          {filteredTeam.length === 0 && (
            <div className="col-span-full text-center text-text-secondary py-12">No members found in this category.</div>
          )}
        </div>
      </div>

      <DetailModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        item={selectedMember} 
        type="team" 
      />
    </div>
  );
};

export default Team;
