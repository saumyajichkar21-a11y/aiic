import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import AdminModal from '../components/AdminModal';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../api/eventApi';
import toast from 'react-hot-toast';
import { FaTrash, FaPlus, FaImage, FaCalendarAlt, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import Loader from '../components/Loader';

const ManageEvents = () => {
  const { admin } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    type: 'upcoming',
    registrationLink: '',
    image: null
  });

  if (!admin) return <Navigate to="/admin/login" />;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await getEvents();
      setEvents(data);
    } catch (error) {
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingItem(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 16), // Format for datetime-local
      venue: event.venue || '',
      type: event.type || 'upcoming',
      registrationLink: event.registrationLink || '',
      image: null // Reset to null, if stays null, server keeps old image
    });
    setPreview(event.image);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        toast.success('Event deleted');
        fetchEvents();
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
    submitData.append('date', formData.date);
    submitData.append('venue', formData.venue);
    submitData.append('type', formData.type);
    submitData.append('registrationLink', formData.registrationLink);
    if (formData.image) submitData.append('image', formData.image);

    try {
      if (editingItem) {
        await updateEvent(editingItem._id, submitData);
        toast.success('Event updated successfully!');
      } else {
        await addEvent(submitData);
        toast.success('Event added successfully!');
      }
      setModalOpen(false);
      resetForm();
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      venue: '',
      type: 'upcoming',
      registrationLink: '',
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
          <SectionHeading title="Manage Events" />
          <button className="btn-primary flex items-center gap-2" onClick={() => { resetForm(); setModalOpen(true); }}>
            <FaPlus /> Add Event
          </button>
        </div>

        <div className="overflow-x-auto bg-secondary-bg rounded-xl border border-border-color">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="bg-primary-bg/50 text-text-primary uppercase font-heading font-bold border-b border-border-color">
              <tr>
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-b border-border-color hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <img src={event.image || 'https://via.placeholder.com/100x60'} alt={event.title} className="w-16 h-10 object-cover rounded shadow" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">{event.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-accent-gold" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      event.type === 'upcoming' ? 'bg-success/20 text-success' : 'bg-text-secondary/20 text-text-secondary'
                    }`}>
                      {event.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(event)} className="text-accent-gold hover:text-yellow-400 p-2 text-lg">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(event._id)} className="text-red-500 hover:text-red-400 p-2 ml-2">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">No events found. Add one to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); resetForm(); }} 
        title={editingItem ? "Edit Event" : "Add New Event"}
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
            <p className="text-xs text-text-secondary">Click to {editingItem ? 'change' : 'upload'} event banner</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-secondary mb-1">Event Title *</label>
            <input type="text" className="form-input" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. AI Hackathon 2024" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-secondary mb-1">Description *</label>
            <textarea className="form-input" rows="3" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Details about the event..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Date *</label>
            <input type="datetime-local" className="form-input" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Type</label>
            <select className="form-input" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-secondary mb-1">Venue</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input type="text" className="form-input pl-10" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} placeholder="e.g. Main Auditorium" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-secondary mb-1">Registration Link (URL)</label>
            <input type="url" className="form-input" value={formData.registrationLink} onChange={(e) => setFormData({...formData, registrationLink: e.target.value})} placeholder="https://..." />
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default ManageEvents;
