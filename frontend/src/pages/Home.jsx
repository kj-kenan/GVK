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
        title={t('Kadıköy İstanbul Veteriner Kliniği', 'Veterinary Clinic Kadıköy Istanbul')}
        description={t(
          'Göztepe Veteriner Kliniği - Kadıköy İstanbul. Dahiliye, cerrahi, radyoloji, kardiyoloji, KBB, anesteziyoloji ve acil veteriner hizmetleri. Tel: 0216 411 6520',
          'Göztepe Veterinary Clinic - Kadıköy Istanbul. Internal medicine, surgery, radiology, cardiology, ENT, anesthesiology and emergency vet services.'
        )}
        url="https://goztepevet.com.tr"
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
              'Patili Dostlarınızın Sağlığı İçin Yanınızdayız',
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
                'Patili dostlarınız için sunduğumuz profesyonel veteriner hizmetleri',
                'Professional veterinary services we offer for your pet friends'
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                slug: 'laboratuvar',
                title: 'Laboratuvar',
                desc: 'Kan tahlili, idrar analizi ve kapsamlı teşhis testleri kliniğimizde.',
                icon: (
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                    <rect x="26" y="4" width="12" height="22" rx="3" stroke="#4A5F7F" strokeWidth="2.5" fill="#e8edf4"/>
                    <path d="M20 26 L12 52 Q12 58 32 58 Q52 58 52 52 L44 26Z" fill="#c8d4e8" stroke="#4A5F7F" strokeWidth="2.5" strokeLinejoin="round"/>
                    <circle cx="26" cy="42" r="3" fill="#4A5F7F"/>
                    <circle cx="36" cy="48" r="2" fill="#4A5F7F"/>
                    <circle cx="30" cy="50" r="1.5" fill="#7a95b8"/>
                  </svg>
                ),
              },
              {
                slug: 'radyoloji',
                title: 'Radyoloji',
                desc: 'Dijital röntgen ve ultrason ile hassas görüntüleme hizmetleri.',
                icon: (
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                    <rect x="8" y="8" width="48" height="38" rx="4" fill="#e8edf4" stroke="#4A5F7F" strokeWidth="2.5"/>
                    <ellipse cx="32" cy="27" rx="12" ry="10" fill="#c8d4e8" stroke="#4A5F7F" strokeWidth="2"/>
                    <ellipse cx="32" cy="27" rx="5" ry="7" fill="#4A5F7F" opacity="0.3"/>
                    <line x1="24" y1="50" x2="20" y2="58" stroke="#4A5F7F" strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="40" y1="50" x2="44" y2="58" stroke="#4A5F7F" strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="18" y1="58" x2="46" y2="58" stroke="#4A5F7F" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                slug: 'dahiliye',
                title: 'Dahiliye',
                desc: 'İç hastalıkların teşhis ve tedavisinde uzman veteriner hizmetleri.',
                icon: (
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                    <path d="M32 54 C32 54 10 40 10 26 C10 18 16 12 24 12 C28 12 31 14 32 16 C33 14 36 12 40 12 C48 12 54 18 54 26 C54 40 32 54 32 54Z" fill="#c8d4e8" stroke="#4A5F7F" strokeWidth="2.5" strokeLinejoin="round"/>
                    <path d="M26 26 L30 26 L30 22 L34 22 L34 26 L38 26 L38 30 L34 30 L34 34 L30 34 L30 30 L26 30Z" fill="#4A5F7F"/>
                  </svg>
                ),
              },
              {
                slug: 'cerrahi',
                title: 'Cerrahi',
                desc: 'Modern ekipmanlarla gerçekleştirilen güvenli operasyon hizmetleri.',
                icon: (
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                    <rect x="10" y="10" width="44" height="44" rx="8" fill="#e8edf4" stroke="#4A5F7F" strokeWidth="2.5"/>
                    <path d="M20 32 L44 32" stroke="#4A5F7F" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M32 20 L32 44" stroke="#4A5F7F" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="32" cy="32" r="8" fill="#c8d4e8" stroke="#4A5F7F" strokeWidth="2"/>
                    <path d="M20 20 L26 26 M44 20 L38 26 M20 44 L26 38 M44 44 L38 38" stroke="#4A5F7F" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                slug: 'kbb',
                title: 'KBB',
                desc: 'Kulak, burun ve boğaz hastalıklarının uzman tanı ve tedavi hizmetleri.',
                icon: (
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                    <path d="M20 12 C14 12 10 18 10 26 C10 34 16 40 20 40 C20 40 20 46 26 46 L30 46" stroke="#4A5F7F" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <path d="M20 20 C18 20 16 22 16 26 C16 30 18 34 22 34" stroke="#4A5F7F" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <circle cx="44" cy="22" r="10" fill="#e8edf4" stroke="#4A5F7F" strokeWidth="2.5"/>
                    <path d="M40 22 Q44 16 48 22 Q44 28 40 22Z" fill="#c8d4e8" stroke="#4A5F7F" strokeWidth="1.5"/>
                    <circle cx="44" cy="22" r="2" fill="#4A5F7F"/>
                    <path d="M30 50 C30 44 36 44 36 50 L36 54 L30 54 Z" fill="#c8d4e8" stroke="#4A5F7F" strokeWidth="2"/>
                  </svg>
                ),
              },
              {
                slug: 'kardiyoloji',
                title: 'Kardiyoloji',
                desc: 'Kalp ve damar hastalıklarının teşhis, takip ve tedavi hizmetleri.',
                icon: (
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                    <path d="M32 52 C32 52 8 38 8 22 C8 13 14 8 22 8 C27 8 31 11 32 14 C33 11 37 8 42 8 C50 8 56 13 56 22 C56 38 32 52 32 52Z" fill="#c8d4e8" stroke="#4A5F7F" strokeWidth="2.5" strokeLinejoin="round"/>
                    <polyline points="14,30 20,30 24,20 28,38 32,26 36,32 40,32 44,30 50,30" stroke="#4A5F7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                ),
              },
              {
                slug: 'anesteziyoloji',
                title: 'Anesteziyoloji',
                desc: 'Güvenli operasyonlar için uzman anestezi uygulamaları ve hasta takibi.',
                icon: (
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                    <rect x="24" y="4" width="16" height="8" rx="3" fill="#e8edf4" stroke="#4A5F7F" strokeWidth="2.5"/>
                    <rect x="20" y="12" width="24" height="36" rx="6" fill="#c8d4e8" stroke="#4A5F7F" strokeWidth="2.5"/>
                    <line x1="28" y1="24" x2="36" y2="24" stroke="#4A5F7F" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="28" y1="32" x2="36" y2="32" stroke="#4A5F7F" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="28" y1="40" x2="32" y2="40" stroke="#4A5F7F" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="32" y1="48" x2="32" y2="58" stroke="#4A5F7F" strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="26" y1="58" x2="38" y2="58" stroke="#4A5F7F" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                slug: 'acil',
                title: 'Acil',
                desc: 'Ani gelişen durumlarda hızlı müdahale ve acil veteriner bakımı.',
                icon: (
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
                    <rect x="6" y="18" width="52" height="32" rx="6" fill="#e8edf4" stroke="#4A5F7F" strokeWidth="2.5"/>
                    <path d="M28 26 L28 42 M20 34 L44 34" stroke="#4A5F7F" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M44 10 L54 18" stroke="#4A5F7F" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M20 10 L10 18" stroke="#4A5F7F" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="32" cy="10" r="3" fill="#4A5F7F"/>
                  </svg>
                ),
              },
            ].map((service, index) => (
              <motion.div
                key={service.slug}
                className="flex"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              >
                <Link
                  to={`/hizmetler/${service.slug}`}
                  className="flex flex-col w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                >
                  <div className="flex items-center justify-center py-10 bg-gradient-to-b from-[#eef1f6] to-white">
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 px-6 pb-8 text-center">
                    <h3 className="text-xl font-heading font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
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
      
      {/* Google Maps Section - Free iframe embed */}
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

          <div className="max-w-5xl mx-auto h-[450px]">
            <GoogleMap />
          </div>
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

export default Home;



