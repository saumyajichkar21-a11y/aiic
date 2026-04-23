import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import AdminModal from '../components/AdminModal';
import { getGallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } from '../api/galleryApi';
import toast from 'react-hot-toast';
import { FaTrash, FaPlus, FaImage, FaEdit } from 'react-icons/fa';
import Loader from '../components/Loader';

const ManageGallery = () => {
  const { admin } = useAuth();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    caption: '',
    category: 'lab',
    image: null
  });

  if (!admin) return <Navigate to="/admin/login" />;

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data } = await getGallery();
      setGallery(data);
    } catch (error) {
      toast.error('Failed to fetch gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      caption: item.caption,
      category: item.category,
      image: null
    });
    setPreview(item.image);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteGalleryItem(id);
        toast.success('Image deleted');
        fetchGallery();
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
    submitData.append('caption', formData.caption);
    submitData.append('category', formData.category);
    if (formData.image) submitData.append('image', formData.image);

    try {
      if (editingItem) {
        await updateGalleryItem(editingItem._id, submitData);
        toast.success('Gallery item updated successfully!');
      } else {
        await addGalleryItem(submitData);
        toast.success('Image added successfully!');
      }
      setModalOpen(false);
      resetForm();
      fetchGallery();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save image');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      caption: '',
      category: 'lab',
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
          <SectionHeading title="Manage Gallery" />
          <button className="btn-primary flex items-center gap-2" onClick={() => { resetForm(); setModalOpen(true); }}>
            <FaPlus /> Add Image
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div key={item._id} className="glass-card p-2 group relative overflow-hidden">
              <img src={item.image} alt={item.caption} className="w-full h-48 object-cover rounded-xl" />
              <div className="mt-4 px-2">
                <p className="text-white font-semibold truncate">{item.caption}</p>
                <p className="text-text-secondary text-xs capitalize">{item.category}</p>
              </div>
              
              <div className="absolute inset-0 bg-primary-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={() => handleEdit(item)}
                  className="w-10 h-10 rounded-full bg-white text-primary-bg flex items-center justify-center hover:bg-accent-gold transition-colors"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          {gallery.length === 0 && (
            <div className="col-span-full py-20 text-center glass-card">
              No images in the gallery yet.
            </div>
          )}
        </div>
      </div>

      <AdminModal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); resetForm(); }} 
        title={editingItem ? "Edit Image" : "Upload to Gallery"}
        onSubmit={handleSubmit}
        loading={saving}
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-dashed border-border-color mb-4 bg-primary-bg flex items-center justify-center relative group text-center px-4">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center">
                   <FaImage className="text-4xl text-border-color mb-2" />
                   <span className="text-xs text-text-secondary">Click to upload image</span>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Caption *</label>
            <input type="text" className="form-input" required value={formData.caption} onChange={(e) => setFormData({...formData, caption: e.target.value})} placeholder="e.g. Working in the Robotics Lab" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Category</label>
            <select className="form-input" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value="lab">Lab Sessions</option>
              <option value="events">Events</option>
              <option value="team">Team Meetings</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default ManageGallery;
