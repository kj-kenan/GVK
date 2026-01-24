import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getServices, getTeam, getBlogPosts, getTestimonials } from '../utils/api';
import ServiceCard from '../components/ServiceCard';
import TeamMemberCard from '../components/TeamMemberCard';
import BlogCard from '../components/BlogCard';
import TestimonialCard from '../components/TestimonialCard';
import ServiceModal from '../components/ServiceModal';
import Loading from '../components/Loading';
import SkeletonCard from '../components/SkeletonCard';
import ReviewsCarousel from '../components/GoogleReviews/ReviewsCarousel';
import GoogleMap from '../components/GoogleMap';
import SEOHead from '../components/SEOHead';
import { FaArrowDown } from 'react-icons/fa';

const Home = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, teamRes, blogRes, testimonialsRes] = await Promise.all([
          getServices(),
          getTeam(),
          getBlogPosts(1),
          getTestimonials(),
        ]);
        
        // Handle different response formats safely
        setServices(Array.isArray(servicesRes.data) ? servicesRes.data.slice(0, 6) : []);
        setTeam(
          teamRes.data.results 
            ? teamRes.data.results 
            : Array.isArray(teamRes.data) 
              ? teamRes.data 
              : []
        );
        setBlogPosts(
          blogRes.data.results 
            ? blogRes.data.results.slice(0, 3) 
            : Array.isArray(blogRes.data) 
              ? blogRes.data.slice(0, 3) 
              : []
        );
        setTestimonials(Array.isArray(testimonialsRes.data) ? testimonialsRes.data.slice(0, 9) : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set empty arrays so the page still renders
        setServices([]);
        setTeam([]);
        setBlogPosts([]);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleServiceClick = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };
  
  // Show skeleton instead of loading spinner
  const showSkeletons = loading;
  
  return (
    <>
      <SEOHead 
        title={t('Ana Sayfa', 'Home')}
        description={t(
          'Göztepe Veteriner Kliniği - Kadıköy İstanbul. Evcil dostlarınızın sağlığı için uzman veteriner hekimlerimizle 7/24 hizmetinizdeyiz.',
          'Göztepe Veterinary Clinic - Kadıköy Istanbul. We are at your service 24/7 with our expert veterinarians for the health of your pets.'
        )}
      />
      <div className="home">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=2000)',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t(
              'Evcil Dostlarınızın Sağlığı İçin Yanınızdayız',
              'We Are Here for Your Pets\' Health'
            )}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t(
              'Modern veteriner hizmetlerimizle patili dostlarımıza hak ettikleri ilgiyi gösteriyoruz.',
              'We show our furry friends the care they deserve with our modern veterinary services.'
            )}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/services" className="btn-primary">
              {t('Hizmetlerimiz', 'Our Services')}
            </Link>
            <Link to="/contact" className="btn-secondary">
              {t('İletişim', 'Contact')}
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaArrowDown className="text-white text-3xl" />
        </motion.div>
      </section>
      
      {/* Services Preview */}
      <section className="py-20 bg-gray-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">{t('Hizmetlerimiz', 'Our Services')}</h2>
            <p className="section-subtitle">
              {t(
                'Evcil dostlarınız için sunduğumuz profesyonel veteriner hizmetleri',
                'Professional veterinary services we offer for your pet friends'
              )}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {showSkeletons ? (
              // Show skeleton cards while loading
              [...Array(6)].map((_, index) => (
                <SkeletonCard key={index} type="service" />
              ))
            ) : (
              services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  onClick={handleServiceClick}
                />
              ))
            )}
          </div>
          
          <div className="text-center">
            <Link to="/services" className="btn-outline">
              {t('Tüm Hizmetlerimiz', 'All Services')}
            </Link>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">{t('Uzman Ekibimiz', 'Our Expert Team')}</h2>
            <p className="section-subtitle">
              {t(
                'Alanında uzman veteriner hekimlerimiz',
                'Our expert veterinarians'
              )}
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, index) => (
              <div key={member.id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-xs">
                <TeamMemberCard member={member} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Preview */}
      {blogPosts.length > 0 && (
        <section className="py-20 bg-gray-light">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-title">{t('Blog Yazılarımız', 'Our Blog Posts')}</h2>
              <p className="section-subtitle">
                {t(
                  'Evcil hayvan bakımı hakkında faydalı bilgiler',
                  'Useful information about pet care'
                )}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {blogPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/blog" className="btn-outline">
                {t('Tüm Blog Yazıları', 'All Blog Posts')}
              </Link>
            </div>
          </div>
        </section>
      )}
      
      {/* Testimonials Showcase */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-title">{t('Sizden Gelenler', 'From You')}</h2>
              <p className="section-subtitle">
                {t(
                  'Evcil dostlarınızın mutlu anlarını bizimle paylaşın',
                  'Share your pets\' happy moments with us'
                )}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/testimonials" className="btn-primary">
                {t('Fotoğrafını Paylaş', 'Share Your Photo')}
              </Link>
            </div>
          </div>
        </section>
      )}
      
      {/* Google Reviews Section */}
      <ReviewsCarousel />
      
      {/* Google Maps Section - Only show if API key is configured */}
      {import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-title">{t('Konumumuz', 'Our Location')}</h2>
              <p className="section-subtitle">
                {t(
                  'Bizi ziyaret edin, evcil dostlarınızın sağlığı için yanınızdayız',
                  'Visit us, we are here for your pets\' health'
                )}
              </p>
            </motion.div>
            
            <div className="max-w-5xl mx-auto">
              <GoogleMap
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                placeId={import.meta.env.VITE_GOOGLE_PLACE_ID}
              />
            </div>
          </div>
        </section>
      )}
      
      <ServiceModal
        service={selectedService}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      </div>
    </>
  );
};

export default Home;



