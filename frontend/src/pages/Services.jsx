import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getServices } from '../utils/api';
import { useApi } from '../hooks/useApi';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import Loading from '../components/Loading';
import SEOHead from '../components/SEOHead';

const Services = () => {
  const { t } = useLanguage();
  const { data: services, loading } = useApi(getServices);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleServiceClick = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };
  
  if (loading) return <Loading />;
  
  return (
    <>
    <SEOHead
      title="Hizmetlerimiz"
      description="Göztepe Veteriner Kliniği Kadıköy İstanbul — Dahiliye, cerrahi, radyoloji, kardiyoloji, KBB, anesteziyoloji ve acil veteriner hizmetleri. Modern ekipmanlarla uzman kadromuzla yanınızdayız."
      url="https://goztepevet.com.tr/services"
    />
    <div className="pt-28 md:pt-32 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('Hizmetlerimiz', 'Our Services')}
          </motion.h1>
          <motion.p
            className="text-xl opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t(
              'Evcil dostlarınız için sunduğumuz profesyonel veteriner hizmetleri',
              'Professional veterinary services we offer for your pet friends'
            )}
          </motion.p>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  onClick={handleServiceClick}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-dark">
              {t('Henüz hizmet bulunmamaktadır.', 'No services available yet.')}
            </p>
          )}
        </div>
      </section>
      
      <ServiceModal
        service={selectedService}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
    </>
  );
};

export default Services;


