import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import AdminModal from '../components/AdminModal';
import { getTeam, addMember, updateMember, deleteMember } from '../api/teamApi';
import toast from 'react-hot-toast';
import { FaTrash, FaPlus, FaImage, FaEdit } from 'react-icons/fa';
import Loader from '../components/Loader';

const ManageTeam = () => {
  const { admin } = useAuth();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    domain: '',
    category: 'member',
    email: '',
    linkedin: '',
    github: '',
    image: null
  });

  if (!admin) return <Navigate to="/admin/login" />;

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const { data } = await getTeam();
      setTeam(data);
    } catch (error) {
      toast.error('Failed to fetch team');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setEditingItem(member);
    setFormData({
      name: member.name,
      role: member.role,
      domain: member.domain || '',
      category: member.category,
      email: member.email || '',
      linkedin: member.linkedin || '',
      github: member.github || '',
      image: null
    });
    setPreview(member.photo);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteMember(id);
        toast.success('Member deleted');
        fetchTeam();
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
    
    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('role', formData.role);
    submitData.append('domain', formData.domain);
    submitData.append('category', formData.category);
    if (formData.email) submitData.append('email', formData.email);
    if (formData.linkedin) submitData.append('linkedin', formData.linkedin);
    if (formData.github) submitData.append('github', formData.github);
    if (formData.image) submitData.append('photo', formData.image);

    try {
      if (editingItem) {
        await updateMember(editingItem._id, submitData);
        toast.success('Team member updated successfully!');
      } else {
        await addMember(submitData);
        toast.success('Team member added successfully!');
      }
      setModalOpen(false);
      resetForm();
      fetchTeam();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save member');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: '', 
      role: '', 
      domain: '',
      category: 'member', 
      email: '',
      linkedin: '', 
      github: '', 
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
          <SectionHeading title="Manage Team" />
          <button className="btn-primary flex items-center gap-2" onClick={() => { resetForm(); setModalOpen(true); }}>
            <FaPlus /> Add Member
          </button>
        </div>

        <div className="overflow-x-auto bg-secondary-bg rounded-xl border border-border-color">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="bg-primary-bg/50 text-text-primary uppercase font-heading font-bold border-b border-border-color">
              <tr>
                <th className="px-6 py-4">Photo</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Domain</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member) => (
                <tr key={member._id} className="border-b border-border-color hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <img src={member.photo || 'https://via.placeholder.com/50'} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">{member.name}</td>
                  <td className="px-6 py-4 text-accent-cyan">{member.role}</td>
                  <td className="px-6 py-4">{member.domain}</td>
                  <td className="px-6 py-4 capitalize">{member.category}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(member)} className="text-accent-gold hover:text-yellow-400 p-2 text-lg">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(member._id)} className="text-red-500 hover:text-red-400 p-2 ml-2 text-lg">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {team.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">No team members found. Click Add Member to create one.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); resetForm(); }} 
        title={editingItem ? "Edit Team Member" : "Add New Team Member"}
        onSubmit={handleSubmit}
        loading={saving}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 flex flex-col items-center justify-center mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-border-color mb-4 bg-primary-bg flex items-center justify-center relative group">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <FaImage className="text-3xl text-border-color" />
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-xs text-text-secondary">Click to {editingItem ? 'change' : 'upload'} photo</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Full Name *</label>
            <input type="text" className="form-input" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Role *</label>
            <input type="text" className="form-input" required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} placeholder="e.g. Lead Developer" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Domain *</label>
            <input type="text" className="form-input" required value={formData.domain} onChange={(e) => setFormData({...formData, domain: e.target.value})} placeholder="e.g. Technical, Research" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Category *</label>
            <select className="form-input" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value="faculty">Faculty Advisor</option>
              <option value="core">Core Member</option>
              <option value="member">General Member</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-secondary mb-1">Email Address</label>
            <input type="email" className="form-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="team@aiic.mit" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">LinkedIn URL</label>
            <input type="url" className="form-input" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} placeholder="https://linkedin.com/..." />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">GitHub URL</label>
            <input type="url" className="form-input" value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} placeholder="https://github.com/..." />
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default ManageTeam;
