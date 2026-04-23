import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SectionHeading from '../components/SectionHeading';
import { FaUsers, FaProjectDiagram, FaImages, FaCalendarAlt, FaTrophy, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();

  if (!admin) {
    return <Navigate to="/admin/login" />;
  }

  const menu = [
    { name: 'Manage Team', icon: <FaUsers />, path: '/admin/team', color: 'text-blue-400' },
    { name: 'Manage Projects', icon: <FaProjectDiagram />, path: '/admin/projects', color: 'text-indigo-400' },
    { name: 'Manage Gallery', icon: <FaImages />, path: '/admin/gallery', color: 'text-pink-400' },
    { name: 'Manage Events', icon: <FaCalendarAlt />, path: '/admin/events', color: 'text-green-400' },
    { name: 'Manage Achievements', icon: <FaTrophy />, path: '/admin/achievements', color: 'text-yellow-400' },
    { name: 'View Messages', icon: <FaEnvelope />, path: '/admin/messages', color: 'text-red-400' },
  ];

  return (
    <div className="pt-32 pb-20 section-padding min-h-screen bg-primary-bg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <SectionHeading title="Admin Dashboard" subtitle={`Welcome, ${admin.email}`} />
          <button onClick={logout} className="btn-secondary !border-red-500 !text-red-500 hover:!bg-red-500 hover:!text-white flex items-center gap-2">
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((item) => (
            <Link key={item.name} to={item.path} className="glass-card hover:-translate-y-2 transition-transform duration-300 flex items-center p-8">
              <div className={`text-4xl mr-6 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-white">{item.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
