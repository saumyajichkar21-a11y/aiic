import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SectionHeading from '../components/SectionHeading';

const ViewMessages = () => {
  const { admin } = useAuth();
  if (!admin) return <Navigate to="/admin/login" />;

  return (
    <div className="pt-32 pb-20 section-padding min-h-screen">
      <div className="container mx-auto text-center">
        <SectionHeading title="View Messages" />
        <p className="text-text-secondary">Messages View functionality will be implemented here.</p>
      </div>
    </div>
  );
};
export default ViewMessages;
