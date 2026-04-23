import { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';
import DetailModal from '../components/DetailModal';
import { getProjects } from '../api/projectApi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects(filter);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [filter]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="pt-32 pb-20 section-padding min-h-screen bg-primary-bg">
      <div className="container mx-auto">
        <SectionHeading title="Our Projects" subtitle="Showcasing technical excellence and research." centered />
        
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {[
            { label: 'All', value: '' }, 
            { label: 'Active', value: 'active' }, 
            { label: 'Completed', value: 'completed' }, 
            { label: 'Research', value: 'research' }
          ].map(f => (
            <button
              key={f.label}
              onClick={() => setFilter(f.value)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${filter === f.value ? 'bg-accent-indigo text-white' : 'bg-secondary-bg text-text-secondary hover:text-white border border-border-color'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} onClick={handleProjectClick} />
          ))}
          {projects.length === 0 && (
            <div className="col-span-full text-center text-text-secondary py-12">No projects found for this filter.</div>
          )}
        </div>
      </div>

      <DetailModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        item={selectedProject} 
        type="project" 
      />
    </div>
  );
};

export default Projects;
