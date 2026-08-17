import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { getSiteSettings } from '../utils/api';
import ContactForm from '../components/ContactForm';
import { FaMapMarkerAlt, FaPhone, FaMobileAlt, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import SEOHead from '../components/SEOHead';

const Contact = () => {
  const { t, getField } = useLanguage();
  const [settings, setSettings] = useState(null);
  
  useEffect(() => {
    getSiteSettings()
      .then(res => setSettings(res.data))
      .catch(console.error);
  }, []);
  
  return (
    <>
    <SEOHead
      title="İletişim"
      description="Göztepe Veteriner Kliniği iletişim — Fahrettin Kerim Gökay Caddesi No:259 Kadıköy İstanbul. Tel: 0216 411 6520 | 0533 070 2424. Randevu ve bilgi için bize ulaşın."
      url="https://goztepevet.com.tr/contact"
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
            {t('İletişim', 'Contact')}
          </motion.h1>
          <motion.p
            className="text-xl opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t(
              'Bizimle iletişime geçin',
              'Get in touch with us'
            )}
          </motion.p>
        </div>
      </section>
      
      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">
                {t('Mesaj Gönderin', 'Send a Message')}
              </h2>
              <ContactForm />
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">
                {t('İletişim Bilgileri', 'Contact Information')}
              </h2>
              
              {settings && (
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-white p-3 rounded-lg">
                      <FaMapMarkerAlt className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark mb-1">
                        {t('Adres', 'Address')}
                      </h3>
                      <p className="text-gray-dark">{getField(settings, 'address')}</p>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-white p-3 rounded-lg">
                      <FaPhone className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark mb-1">
                        {t('Telefon', 'Phone')}
                      </h3>
                      <a
                        href={`tel:${settings.phone}`}
                        className="text-gray-dark hover:text-primary transition-colors block"
                      >
                        {settings.phone}
                      </a>
                      {settings.mobile && (
                        <a
                          href={`tel:${settings.mobile}`}
                          className="text-gray-dark hover:text-primary transition-colors block mt-1"
                        >
                          {t('Cep:', 'Mobile:')} {settings.mobile}
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Mobile */}
                  {settings.mobile && (
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary text-white p-3 rounded-lg">
                        <FaMobileAlt className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark mb-1">
                          {t('Cep Telefonu', 'Mobile')}
                        </h3>
                        <a
                          href={`tel:${settings.mobile}`}
                          className="text-gray-dark hover:text-primary transition-colors"
                        >
                          {settings.mobile}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-white p-3 rounded-lg">
                      <FaEnvelope className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark mb-1">
                        {t('E-posta', 'Email')}
                      </h3>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-gray-dark hover:text-primary transition-colors"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </div>
                  
                  {/* Working Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-white p-3 rounded-lg">
                      <FaClock className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark mb-1">
                        {t('Çalışma Saatleri', 'Working Hours')}
                      </h3>
                      <p className="text-gray-dark">
                        {getField(settings, 'working_hours_weekday')}
                      </p>
                      <p className="text-gray-dark">
                        {getField(settings, 'working_hours_weekend')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Social Media */}
                  {(settings.facebook_url || settings.instagram_url || settings.twitter_url) && (
                    <div className="pt-6 border-t border-gray">
                      <h3 className="font-semibold text-dark mb-4">
                        {t('Sosyal Medya', 'Social Media')}
                      </h3>
                      <div className="flex space-x-4">
                        {settings.facebook_url && (
                          <a
                            href={settings.facebook_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-white p-3 rounded-lg hover:bg-dark transition-colors"
                          >
                            <FaFacebook className="text-2xl" />
                          </a>
                        )}
                        {settings.instagram_url && (
                          <a
                            href={settings.instagram_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-white p-3 rounded-lg hover:bg-dark transition-colors"
                          >
                            <FaInstagram className="text-2xl" />
                          </a>
                        )}
                        {settings.twitter_url && (
                          <a
                            href={settings.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-white p-3 rounded-lg hover:bg-dark transition-colors"
                          >
                            <FaTwitter className="text-2xl" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Google Maps */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold text-dark mb-6 text-center">
              {t('Konumumuz', 'Our Location')}
            </h2>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5852.604965382592!2d29.068227455820825!3d40.9803931954377!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac796f0547693%3A0xad34aa614d5c9afb!2zR8OWWlRFUEUgVkVURVLEsE5FUiBLTMSwTsSwxJ7EsA!5e0!3m2!1str!2sus!4v1786879276026!5m2!1str!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Göztepe Veteriner Kliniği Konumu"
              />
            </div>
          </motion.div>
          )}
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact;


