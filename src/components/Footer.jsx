import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary-bg pt-16 pb-8 border-t border-border-color">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-2xl font-heading font-bold text-white">
            <span className="text-accent-gold">AIIC</span> MIT
          </Link>
          <p className="text-text-secondary text-sm leading-relaxed">
            Anand Innovation & Incubation Council. Fostering innovation, entrepreneurship, and prototyping at Marathwada Institute of Technology, Chhatrapati Sambhajinagar.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-heading font-semibold text-lg">Quick Links</h4>
          <ul className="flex flex-col gap-2">
            <li><Link to="/about" className="text-text-secondary hover:text-accent-gold transition-colors">About Us</Link></li>
            <li><Link to="/team" className="text-text-secondary hover:text-accent-gold transition-colors">Our Team</Link></li>
            <li><Link to="/projects" className="text-text-secondary hover:text-accent-gold transition-colors">Projects</Link></li>
            <li><Link to="/events" className="text-text-secondary hover:text-accent-gold transition-colors">Events</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-heading font-semibold text-lg">Contact</h4>
          <ul className="flex flex-col gap-2 text-text-secondary text-sm">
            <li>MIT Campus, Beed Bypass Road</li>
            <li>Chhatrapati Sambhajinagar, Maharashtra 431010</li>
            <li className="mt-2"><a href="mailto:info@aiic.mit.asia" className="hover:text-accent-gold transition-colors">info@aiic.mit.asia</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white font-heading font-semibold text-lg">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-border-color flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary-bg transition-colors"><FaLinkedin size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-border-color flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary-bg transition-colors"><FaInstagram size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-border-color flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary-bg transition-colors"><FaGithub size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-border-color flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary-bg transition-colors"><FaTwitter size={18} /></a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 text-center border-t border-border-color pt-8">
        <p className="text-text-secondary text-sm">
          &copy; {new Date().getFullYear()} AIIC MIT Aurangabad. All rights reserved. <Link to="/admin/login" className="text-text-secondary/40 hover:text-accent-gold transition-colors ml-2 underline decoration-transparent hover:decoration-accent-gold">Admin Panel</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
