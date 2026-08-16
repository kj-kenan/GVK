import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getBlogPosts, getBlogCategories } from '../utils/api';
import BlogCard from '../components/BlogCard';
import Loading from '../components/Loading';
import SEOHead from '../components/SEOHead';

const Blog = () => {
  const { t, getField } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, page]);
  
  const fetchCategories = async () => {
    try {
      const res = await getBlogCategories();
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getBlogPosts(page, selectedCategory);
      
      if (page === 1) {
        setPosts(res.data.results || res.data);
      } else {
        setPosts(prev => [...prev, ...(res.data.results || res.data)]);
      }
      
      setHasMore(!!res.data.next);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug);
    setPage(1);
    setPosts([]);
  };
  
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };
  
  if (loading && page === 1) return <Loading />;
  
  return (
    <>
    <SEOHead
      title="Blog"
      description="Göztepe Veteriner Kliniği blogu — Evcil hayvan sağlığı, bakımı ve beslenmesi hakkında uzman veteriner hekimlerimizin ipuçları ve güncel bilgiler. Kadıköy İstanbul."
      url="https://goztepevet.com.tr/blog"
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
            {t('Blog', 'Blog')}
          </motion.h1>
          <motion.p
            className="text-xl opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t(
              'Evcil hayvan bakımı hakkında faydalı bilgiler ve ipuçları',
              'Useful information and tips about pet care'
            )}
          </motion.p>
        </div>
      </section>
      
      {/* Categories Filter */}
      {categories.length > 0 && (
        <section className="py-8 bg-gray-light">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !selectedCategory
                    ? 'bg-primary text-white'
                    : 'bg-white text-dark hover:bg-primary hover:text-white'
                }`}
              >
                {t('Tümü', 'All')}
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.slug
                      ? 'bg-primary text-white'
                      : 'bg-white text-dark hover:bg-primary hover:text-white'
                  }`}
                >
                  {getField(category, 'name')}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {posts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
              
              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="btn-outline disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <div className="spinner w-5 h-5 border-2 mr-2"></div>
                        {t('Yükleniyor...', 'Loading...')}
                      </span>
                    ) : (
                      t('Daha Fazla Yükle', 'Load More')
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-dark">
              {t('Henüz blog yazısı bulunmamaktadır.', 'No blog posts available yet.')}
            </p>
          )}
        </div>
      </section>
    </div>
    </>
  );
};

export default Blog;


