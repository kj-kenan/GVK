import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  const navLinks = [
    { path: '/services', label_tr: 'Hizmetler', label_en: 'Services' },
    { path: '/team', label_tr: 'Ekibimiz', label_en: 'Our Team' },
    { path: '/blog', label_tr: 'Blog', label_en: 'Blog' },
    { path: '/gallery', label_tr: 'Galeri', label_en: 'Gallery' },
    { path: '/testimonials', label_tr: 'Sizden Gelenler', label_en: 'From You' },
    { path: '/contact', label_tr: 'İletişim', label_en: 'Contact' },
  ];
  
  const isHomePage = location.pathname === '/';
  
  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || !isHomePage || mobileMenuOpen
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logonew.png" 
              alt="Göztepe Veteriner Kliniği" 
              className="h-16 w-16 md:h-20 md:w-20 object-contain drop-shadow-lg"
            />
            <span className={`hidden sm:block text-2xl md:text-3xl font-heading font-bold ${
              scrolled || !isHomePage ? 'text-primary' : 'text-white'
            }`}>
              Göztepe Veteriner Kliniği
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`font-medium transition-colors hover:text-primary ${
                    scrolled || !isHomePage
                      ? 'text-dark'
                      : 'text-white hover:text-accent'
                  } ${location.pathname === link.path ? 'text-primary' : ''}`}
                >
                  {language === 'tr' ? link.label_tr : link.label_en}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Language Switcher & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                scrolled || !isHomePage
                  ? 'bg-light text-primary hover:bg-primary hover:text-white'
                  : 'bg-white/20 text-white hover:bg-white hover:text-primary'
              }`}
            >
              {language === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
            </button>
            
            {/* Mobile Hamburger */}
            <button
              className={`lg:hidden text-2xl ${
                scrolled || !isHomePage ? 'text-dark' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white mt-4 rounded-lg shadow-lg"
            >
              <ul className="py-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`block px-6 py-3 text-dark hover:bg-light hover:text-primary transition-colors ${
                        location.pathname === link.path ? 'bg-light text-primary font-semibold' : ''
                      }`}
                    >
                      {language === 'tr' ? link.label_tr : link.label_en}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;


