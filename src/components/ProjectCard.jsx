import { motion } from 'framer-motion';

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-secondary-bg border border-border-color rounded-2xl overflow-hidden hover:shadow-2xl hover:border-accent-indigo transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(project)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image || 'https://via.placeholder.com/600x400'} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg to-transparent opacity-80"></div>
        <div className="absolute top-4 right-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            project.status === 'active' ? 'bg-success/20 text-success border border-success/50' : 
            project.status === 'completed' ? 'bg-accent-indigo/20 text-accent-indigo border border-accent-indigo/50' : 
            'bg-warning/20 text-warning border border-warning/50'
          }`}>
            {project.status.toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-accent-gold transition-colors">{project.title}</h3>
        <p className="text-text-secondary line-clamp-2 mb-4 text-sm">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack?.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-xs font-mono bg-primary-bg text-accent-cyan px-2 py-1 rounded border border-border-color">
              {tech}
            </span>
          ))}
          {project.techStack?.length > 3 && (
            <span className="text-xs font-mono bg-primary-bg text-text-secondary px-2 py-1 rounded border border-border-color">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
