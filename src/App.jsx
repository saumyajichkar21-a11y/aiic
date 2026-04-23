import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ManageTeam from './admin/ManageTeam';
import ManageProjects from './admin/ManageProjects';
import ManageGallery from './admin/ManageGallery';
import ManageEvents from './admin/ManageEvents';
import ManageAchievements from './admin/ManageAchievements';
import ViewMessages from './admin/ViewMessages';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/team" element={<ManageTeam />} />
              <Route path="/admin/projects" element={<ManageProjects />} />
              <Route path="/admin/gallery" element={<ManageGallery />} />
              <Route path="/admin/events" element={<ManageEvents />} />
              <Route path="/admin/achievements" element={<ManageAchievements />} />
              <Route path="/admin/messages" element={<ViewMessages />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right"
          toastOptions={{
            style: {
              background: '#0A1628',
              color: '#fff',
              border: '1px solid #1E293B',
            },
          }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
