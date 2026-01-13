import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ServiceCard = ({ service, index, onClick }) => {
  const { getField } = useLanguage();
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };
  
  const title = getField(service, 'title');
  const description = getField(service, 'description');
  const excerpt = description.length > 100 ? description.substring(0, 100) + '...' : description;
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(74, 95, 127, 0.15)' }}
      className="card cursor-pointer"
      onClick={() => onClick && onClick(service)}
    >
      <div className="relative h-48 overflow-hidden">
        <LazyLoadImage
          src={service.cover_image}
          alt={title}
          effect="blur"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold text-dark mb-3">
          {title}
        </h3>
        <p className="text-gray-dark mb-4 line-clamp-3">
          {excerpt}
        </p>
        <button className="text-primary font-semibold hover:text-dark transition-colors">
          {getField({ title_tr: 'Detaylar', title_en: 'Details' }, 'title')} →
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;




