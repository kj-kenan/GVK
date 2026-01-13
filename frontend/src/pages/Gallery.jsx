import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getGallery } from '../utils/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loading from '../components/Loading';

const Gallery = () => {
  const { t, getField } = useLanguage();
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  
  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);
  
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await getGallery(selectedCategory);
      setImages(res.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(res.data.map(img => img.category_tr))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
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
            {t('Klinik Galerisi', 'Clinic Gallery')}
          </motion.h1>
          <motion.p
            className="text-xl opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t(
              'Kliniğimizden görüntüler',
              'Images from our clinic'
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
                onClick={() => setSelectedCategory(null)}
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
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-dark hover:bg-primary hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setLightboxImage(image)}
                >
                  <LazyLoadImage
                    src={image.image}
                    alt={getField(image, 'title')}
                    effect="blur"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-semibold">{getField(image, 'title')}</p>
                    <p className="text-white/80 text-sm">{getField(image, 'category')}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-dark">
              {t('Henüz galeri resmi bulunmamaktadır.', 'No gallery images available yet.')}
            </p>
          )}
        </div>
      </section>
      
      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-6xl max-h-[90vh]"
          >
            <img
              src={lightboxImage.image}
              alt={getField(lightboxImage, 'title')}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-accent transition-colors"
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

export default Gallery;


