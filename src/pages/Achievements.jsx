import { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import AchievementCard from '../components/AchievementCard';
import Loader from '../components/Loader';
import DetailModal from '../components/DetailModal';
import { getAchievements } from '../api/achievementApi';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data } = await getAchievements();
        setAchievements(data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
    setModalOpen(true);
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="pt-32 pb-20 section-padding min-h-screen overflow-hidden">
      <div className="container mx-auto relative z-10">
        <SectionHeading title="Timeline & Achievements" subtitle="Our journey, awards, and milestones." centered />
        
        {/* Timeline line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-48 bottom-0 w-1 bg-border-color -ml-[2px] z-0"></div>
        
        <div className="mt-16 mx-auto w-full relative z-10">
          {achievements.length > 0 ? achievements.map((achievement, i) => (
            <AchievementCard 
              key={achievement._id} 
              achievement={achievement} 
              index={i} 
              onClick={handleAchievementClick}
            />
          )) : (
            <div className="text-center text-text-secondary py-12">No achievements found.</div>
          )}
        </div>
      </div>

      <DetailModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        item={selectedAchievement} 
        type="achievement" 
      />
    </div>
  );
};

export default Achievements;
