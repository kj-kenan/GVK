import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getTestimonials } from '../utils/api';
import { useApi } from '../hooks/useApi';
import TestimonialCard from '../components/TestimonialCard';
import TestimonialUploadModal from '../components/TestimonialUploadModal';
import Loading from '../components/Loading';

const Testimonials = () => {
  const { t } = useLanguage();
  const { data: testimonials, loading } = useApi(getTestimonials);
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  
  const handleTestimonialClick = (testimonial) => {
    setLightboxImage(testimonial);
  };
  
  if (loading) return <Loading />;
  
  return (
    <div className="pt-28 md:pt-32 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('Sizden Gelenler', 'From You')}
          </motion.h1>
          <motion.p
            className="text-xl opacity-90 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t(
              'Evcil dostlarınızın mutlu anlarını bizimle paylaşın',
              'Share your pets\' happy moments with us'
            )}
          </motion.p>
          <motion.button
            onClick={() => setModalOpen(true)}
            className="btn-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            {t('Fotoğrafını Paylaş', 'Share Your Photo')}
          </motion.button>
        </div>
      </section>
      
      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {testimonials && testimonials.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                  onClick={handleTestimonialClick}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-dark">
              {t('Henüz paylaşım bulunmamaktadır.', 'No testimonials available yet.')}
            </p>
          )}
        </div>
      </section>
      
      {/* Upload Modal */}
      <TestimonialUploadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      
      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-4xl"
          >
            <img
              src={lightboxImage.pet_photo}
              alt={lightboxImage.pet_name || 'Pet photo'}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            {(lightboxImage.pet_name || lightboxImage.owner_name || lightboxImage.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-6 rounded-b-lg">
                {lightboxImage.pet_name && (
                  <p className="text-2xl font-bold mb-2">{lightboxImage.pet_name}</p>
                )}
                {lightboxImage.owner_name && (
                  <p className="text-lg mb-2">{lightboxImage.owner_name}</p>
                )}
                {lightboxImage.description && (
                  <p className="text-white/90">{lightboxImage.description}</p>
                )}
              </div>
            )}
            <button
              className="absolute top-4 right-4 bg-white text-dark rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-light transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              ×
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;


