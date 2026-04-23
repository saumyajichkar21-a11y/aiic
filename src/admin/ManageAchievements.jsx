import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import AdminModal from '../components/AdminModal';
import { getAchievements, addAchievement, updateAchievement, deleteAchievement } from '../api/achievementApi';
import toast from 'react-hot-toast';
import { FaTrash, FaPlus, FaImage, FaAward, FaCalendarAlt, FaEdit } from 'react-icons/fa';
import Loader from '../components/Loader';

const ManageAchievements = () => {
  const { admin } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'award',
    date: '',
    image: null
  });

  if (!admin) return <Navigate to="/admin/login" />;

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data } = await getAchievements();
      setAchievements(data);
    } catch (error) {
      toast.error('Failed to fetch achievements');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ach) => {
    setEditingItem(ach);
    setFormData({
      title: ach.title,
      description: ach.description,
      category: ach.category,
      date: new Date(ach.date).toISOString().split('T')[0], // Format for date input
      image: null
    });
    setPreview(ach.image);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await deleteAchievement(id);
        toast.success('Achievement deleted');
        fetchAchievements();
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
    submitData.append('category', formData.category);
    submitData.append('date', formData.date);
    if (formData.image) submitData.append('image', formData.image);

    try {
      if (editingItem) {
        await updateAchievement(editingItem._id, submitData);
        toast.success('Achievement updated successfully!');
      } else {
        await addAchievement(submitData);
        toast.success('Achievement added successfully!');
      }
      setModalOpen(false);
      resetForm();
      fetchAchievements();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save achievement');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'award',
      date: '',
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
          <SectionHeading title="Manage Achievements" />
          <button className="btn-primary flex items-center gap-2" onClick={() => { resetForm(); setModalOpen(true); }}>
            <FaPlus /> Add Achievement
          </button>
        </div>

        <div className="overflow-x-auto bg-secondary-bg rounded-xl border border-border-color">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="bg-primary-bg/50 text-text-primary uppercase font-heading font-bold border-b border-border-color">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map((ach) => (
                <tr key={ach._id} className="border-b border-border-color hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <img src={ach.image || 'https://via.placeholder.com/80x50'} alt={ach.title} className="w-16 h-10 object-cover rounded shadow" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">{ach.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 capitalize">
                      <FaAward className="text-accent-gold" />
                      {ach.category}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-accent-gold" size={12} />
                      {new Date(ach.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(ach)} className="text-accent-gold hover:text-yellow-400 p-2 text-lg">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(ach._id)} className="text-red-500 hover:text-red-400 p-2 ml-2">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {achievements.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">No achievements recorded yet. Add one to inspire the council!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); resetForm(); }} 
        title={editingItem ? "Edit Achievement" : "Add New Achievement"}
        onSubmit={handleSubmit}
        loading={saving}
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col items-center justify-center mb-4">
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
            <p className="text-xs text-text-secondary">Upload a {editingItem ? 'new' : ''} photo of the achievement/award</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Title *</label>
            <input type="text" className="form-input" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Best Startup Award 2024" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Description *</label>
            <textarea className="form-input" rows="3" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Tell the story of how this was achieved..."></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-1">Category</label>
              <select className="form-input" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="award">Award</option>
                <option value="publication">Publication</option>
                <option value="recognition">Recognition</option>
                <option value="milestone">Milestone</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-1">Date *</label>
              <input type="date" className="form-input" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
            </div>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default ManageAchievements;
