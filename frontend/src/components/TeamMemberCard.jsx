import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const TeamMemberCard = ({ member, index }) => {
  const { getField } = useLanguage();
  const [showBio, setShowBio] = useState(false);
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="card relative overflow-hidden"
      onMouseEnter={() => setShowBio(true)}
      onMouseLeave={() => setShowBio(false)}
    >
      <div className="relative">
        <LazyLoadImage
          src={member.photo}
          alt={member.name}
          effect="blur"
          className="w-full h-64 object-cover object-center"
        />
        
        {/* Bio Overlay */}
        <AnimatePresence>
          {showBio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-primary/95 p-6 flex items-center justify-center"
            >
              <p className="text-white text-center text-sm">
                {getField(member, 'bio')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-6 text-center">
        <h3 className="text-xl font-heading font-bold text-dark mb-2">
          {member.name}
        </h3>
        <p className="text-primary font-medium mb-1">
          {getField(member, 'title')}
        </p>
        <p className="text-gray-dark text-sm">
          {getField(member, 'specialty')}
        </p>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;




