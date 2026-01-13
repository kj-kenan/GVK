import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FaTimes } from 'react-icons/fa';

const ServiceModal = ({ service, isOpen, onClose }) => {
  const { getField } = useLanguage();
  
  if (!service) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
              >
                <FaTimes className="text-dark text-xl" />
              </button>
              
              {/* Cover Image */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={service.cover_image}
                  alt={getField(service, 'title')}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-8">
                <h2 className="text-3xl font-heading font-bold text-dark mb-4">
                  {getField(service, 'title')}
                </h2>
                <div className="text-gray-dark leading-relaxed mb-6 whitespace-pre-line">
                  {getField(service, 'description')}
                </div>
                
                {/* Gallery */}
                {service.images && service.images.length > 0 && (
                  <div>
                    <h3 className="text-xl font-heading font-bold text-dark mb-4">
                      {getField({ title_tr: 'Galeri', title_en: 'Gallery' }, 'title')}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {service.images.map((image, idx) => (
                        <img
                          key={idx}
                          src={image.image}
                          alt={`${getField(service, 'title')} ${idx + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;




