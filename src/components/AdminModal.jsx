import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSpinner } from 'react-icons/fa';

const AdminModal = ({ isOpen, onClose, title, onSubmit, children, loading }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!loading ? onClose : undefined}
          className="absolute inset-0 bg-primary-bg/80 backdrop-blur-sm"
        />
        
        {/* Modal body */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-secondary-bg border border-border-color rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border-color">
            <h3 className="text-2xl font-heading font-bold text-white">{title}</h3>
            <button 
              onClick={!loading ? onClose : undefined} 
              className="text-text-secondary hover:text-white transition-colors p-2"
              disabled={loading}
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          {/* Form */}
          <form onSubmit={onSubmit} className="flex flex-col flex-grow overflow-hidden">
            {/* Scrollable body */}
            <div className="p-6 overflow-y-auto flex-grow space-y-4 custom-scrollbar">
              {children}
            </div>
            
            {/* Footer fixed */}
            <div className="p-6 border-t border-border-color bg-primary-bg/30 flex justify-end gap-4">
              <button 
                type="button" 
                onClick={onClose}
                disabled={loading}
                className="px-6 py-2 rounded font-semibold text-text-secondary hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary py-2 px-8 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Saving...
                  </>
                ) : 'Save Record'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminModal;
