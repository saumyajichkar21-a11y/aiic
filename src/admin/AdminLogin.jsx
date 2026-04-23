import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-bg section-padding">
      <div className="glass-card w-full max-w-md p-8">
        <h2 className="text-3xl font-heading font-bold text-center text-white mb-8">Admin <span className="text-accent-gold">Login</span></h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2 tracking-wide uppercase text-[10px]">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aiic.mit"
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2 tracking-wide uppercase text-[10px]">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input"
            />
          </div>
          <button type="submit" className="w-full btn-primary py-4 mt-4 shadow-xl">
            Authorize Access
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
