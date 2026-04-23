import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { submitContact } from '../api/contactApi';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 section-padding min-h-screen">
      <div className="container mx-auto">
        <SectionHeading title="Contact Us" subtitle="Have questions? Want to collaborate or invest? Reach out to us." centered />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 bg-secondary-bg/50 rounded-2xl border border-border-color overflow-hidden p-2">
          
          <div className="p-8 lg:p-12 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-heading font-bold text-white mb-6">Get In Touch</h3>
              <p className="text-text-secondary mb-8">
                Fill out the form and our team will get back to you within 24 hours. Connect with us for incubation opportunities, event sponsorships, or membership queries.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start text-text-secondary">
                  <FaMapMarkerAlt className="text-accent-gold mt-1 mr-4 text-xl" />
                  <div>
                    <p className="font-bold text-white">Our Location</p>
                    <p>MIT Campus, Beed Bypass Road<br />Chhatrapati Sambhajinagar (Aurangabad)<br />Maharashtra 431010</p>
                  </div>
                </div>
                <div className="flex items-center text-text-secondary">
                  <FaEnvelope className="text-accent-gold mr-4 text-xl" />
                  <div>
                    <p className="font-bold text-white">Email</p>
                    <a href="mailto:info@aiic.mit.asia" className="hover:text-accent-gold transition-colors">info@aiic.mit.asia</a>
                  </div>
                </div>
                <div className="flex items-center text-text-secondary">
                  <FaPhone className="text-accent-gold mr-4 text-xl" />
                  <div>
                    <p className="font-bold text-white">Phone</p>
                    <p>+91 (0240) 2375111</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              {/* Optional: Simple Map / Graphic placeholder */}
              <div className="w-full h-48 rounded-xl bg-primary-bg border border-border-color flex items-center justify-center text-text-secondary">
                 Google Maps Embed placeholder
              </div>
            </div>
          </div>

          <div className="glass-card p-8 lg:p-12 !border-0 !rounded-xl bg-primary-bg/80">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-indigo transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-indigo transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  required
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-indigo transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-secondary-bg border border-border-color rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-indigo transition-colors resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
