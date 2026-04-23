import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import AdminModal from '../components/AdminModal';
import { getProjects, addProject, updateProject, deleteProject } from '../api/projectApi';
import toast from 'react-hot-toast';
import { FaTrash, FaPlus, FaImage, FaProjectDiagram, FaLink, FaGithub, FaEdit } from 'react-icons/fa';
import Loader from '../components/Loader';

const ManageProjects = () => {
  const { admin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    status: 'active',
    githubLink: '',
    liveLink: '',
    image: null
  });

  if (!admin) return <Navigate to="/admin/login" />;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingItem(project);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      status: project.status,
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      image: null
    });
    setPreview(project.image);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        toast.success('Project deleted');
        fetchProjects();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('techStack', formData.techStack);
    submitData.append('status', formData.status);
    submitData.append('githubLink', formData.githubLink);
    submitData.append('liveLink', formData.liveLink);
    if (formData.image) submitData.append('image', formData.image);

    try {
      if (editingItem) {
        await updateProject(editingItem._id, submitData);
        toast.success('Project updated successfully!');
      } else {
        await addProject(submitData);
        toast.success('Project added successfully!');
      }
      setModalOpen(false);
      resetForm();
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      techStack: '',
      status: 'active',
      githubLink: '',
      liveLink: '',
      image: null
    });
    setPreview(null);
    setEditingItem(null);
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="pt-32 pb-20 section-padding min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <SectionHeading title="Manage Projects" />
          <button className="btn-primary flex items-center gap-2" onClick={() => { resetForm(); setModalOpen(true); }}>
            <FaPlus /> Add Project
          </button>
        </div>

        <div className="overflow-x-auto bg-secondary-bg rounded-xl border border-border-color">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="bg-primary-bg/50 text-text-primary uppercase font-heading font-bold border-b border-border-color">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tech Stack</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b border-border-color hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <img src={project.image || 'https://via.placeholder.com/80x50'} alt={project.title} className="w-16 h-10 object-cover rounded shadow" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">{project.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      project.status === 'active' ? 'bg-success/20 text-success' : 
                      project.status === 'completed' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="bg-border-color text-text-secondary px-2 py-0.5 rounded text-[10px]">{tech}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(project)} className="text-accent-gold hover:text-yellow-400 p-2 text-lg">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-red-400 p-2 ml-2">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">No projects found. Use your creative spark to add one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); resetForm(); }} 
        title={editingItem ? "Edit Project" : "Add New Project"}
        onSubmit={handleSubmit}
        loading={saving}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 flex flex-col items-center justify-center mb-4">
            <div className="w-full h-40 rounded-xl overflow-hidden border-2 border-dashed border-border-color mb-4 bg-primary-bg flex items-center justify-center relative group">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <FaImage className="text-4xl text-border-color" />
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-xs text-text-secondary">Click to {editingItem ? 'change' : 'upload'} project cover</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-secondary mb-1">Project Title *</label>
            <input type="text" className="form-input" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Smart Solar Tracker" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-secondary mb-1">Description *</label>
            <textarea className="form-input" rows="3" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="What does this project do?"></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Tech Stack (comma separated) *</label>
            <input type="text" className="form-input" required value={formData.techStack} onChange={(e) => setFormData({...formData, techStack: e.target.value})} placeholder="e.g. React, Node.js, Arduino" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Status</label>
            <select className="form-input" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="research">Research</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">GitHub Link</label>
            <div className="relative">
              <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input type="url" className="form-input pl-10" value={formData.githubLink} onChange={(e) => setFormData({...formData, githubLink: e.target.value})} placeholder="https://github.com/..." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Live/Demo Link</label>
            <div className="relative">
              <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input type="url" className="form-input pl-10" value={formData.liveLink} onChange={(e) => setFormData({...formData, liveLink: e.target.value})} placeholder="https://..." />
            </div>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default ManageProjects;
