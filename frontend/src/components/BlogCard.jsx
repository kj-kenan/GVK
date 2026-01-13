import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaCalendar, FaUser } from 'react-icons/fa';

const BlogCard = ({ post, index }) => {
  const { getField, t } = useLanguage();
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(74, 95, 127, 0.15)' }}
      className="card"
    >
      <Link to={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <LazyLoadImage
            src={post.cover_image}
            alt={getField(post, 'title')}
            effect="blur"
            className="w-full h-full object-cover"
          />
          {post.category && (
            <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
              {getField(post.category, 'name')}
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-heading font-bold text-dark mb-3 line-clamp-2 hover:text-primary transition-colors">
            {getField(post, 'title')}
          </h3>
          <p className="text-gray-dark mb-4 line-clamp-3">
            {getField(post, 'excerpt')}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-dark">
            <div className="flex items-center space-x-2">
              <FaCalendar className="text-primary" />
              <span>{formatDate(post.publish_date)}</span>
            </div>
            {post.author_name && (
              <div className="flex items-center space-x-2">
                <FaUser className="text-primary" />
                <span>{post.author_name}</span>
              </div>
            )}
          </div>
          <div className="mt-4">
            <span className="text-primary font-semibold hover:text-dark transition-colors">
              {t('Devamını Oku', 'Read More')} →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;




