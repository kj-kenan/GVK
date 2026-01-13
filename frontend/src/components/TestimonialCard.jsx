import React from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const TestimonialCard = ({ testimonial, index, onClick }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.05,
      },
    },
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer"
      onClick={() => onClick && onClick(testimonial)}
    >
      <LazyLoadImage
        src={testimonial.pet_photo}
        alt={testimonial.pet_name || 'Pet photo'}
        effect="blur"
        className="w-full h-full object-cover aspect-square"
      />
      {(testimonial.pet_name || testimonial.owner_name) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          {testimonial.pet_name && (
            <p className="text-white font-bold text-lg">{testimonial.pet_name}</p>
          )}
          {testimonial.owner_name && (
            <p className="text-white/90 text-sm">{testimonial.owner_name}</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TestimonialCard;




