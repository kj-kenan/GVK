import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getBlogPostDetail } from '../utils/api';
import { useApi } from '../hooks/useApi';
import Loading from '../components/Loading';
import { FaCalendar, FaUser, FaArrowLeft, FaTag } from 'react-icons/fa';

const BlogDetail = () => {
  const { slug } = useParams();
  const { t, getField } = useLanguage();
  const { data: post, loading, error } = useApi(() => getBlogPostDetail(slug), [slug]);
  
  if (loading) return <Loading />;
  
  if (error || !post) {
    return (
      <div className="pt-28 md:pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-dark mb-4">
            {t('Blog yazısı bulunamadı', 'Blog post not found')}
          </h2>
          <Link to="/blog" className="btn-outline">
            {t('Bloga Dön', 'Back to Blog')}
          </Link>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  return (
    <div className="pt-28 md:pt-32 min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-primary hover:text-dark transition-colors"
        >
          <FaArrowLeft />
          <span>{t('Bloga Dön', 'Back to Blog')}</span>
        </Link>
      </div>
      
      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 overflow-hidden"
      >
        <img
          src={post.cover_image}
          alt={getField(post, 'title')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </motion.div>
      
      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Category Badge */}
            {post.category && (
              <span className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full text-sm mb-4">
                <FaTag />
                <span>{getField(post.category, 'name')}</span>
              </span>
            )}
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6">
              {getField(post, 'title')}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-dark mb-8 pb-8 border-b border-gray">
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
            
            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-dark leading-relaxed whitespace-pre-line">
                {getField(post, 'content')}
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;


