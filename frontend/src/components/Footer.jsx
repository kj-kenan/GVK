import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getSiteSettings } from '../utils/api';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const { t, getField } = useLanguage();
  const [settings, setSettings] = useState(null);
  
  useEffect(() => {
    getSiteSettings().then(res => setSettings(res.data)).catch(console.error);
  }, []);
  
  const quickLinks = [
    { path: '/services', label_tr: 'Hizmetler', label_en: 'Services' },
    { path: '/team', label_tr: 'Ekibimiz', label_en: 'Our Team' },
    { path: '/blog', label_tr: 'Blog', label_en: 'Blog' },
    { path: '/contact', label_tr: 'İletişim', label_en: 'Contact' },
  ];
  
  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logonew.png" 
                alt="Göztepe Veteriner Kliniği" 
                className="h-16 w-16 md:h-20 md:w-20 object-contain drop-shadow-lg"
              />
              <h3 className="text-2xl md:text-3xl font-heading font-bold">
                Göztepe Veteriner Kliniği
              </h3>
            </div>
            <p className="text-gray-300 mb-4">
              {t(
                'Evcil dostlarınızın sağlığı için modern veteriner hizmetleri sunuyoruz.',
                'We provide modern veterinary services for your pet friends\' health.'
              )}
            </p>
            <div className="flex space-x-4">
              {settings?.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-accent transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
              )}
              {settings?.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              )}
              {settings?.twitter_url && (
                <a
                  href={settings.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-accent transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              )}
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-heading font-bold mb-4">
              {t('Hızlı Bağlantılar', 'Quick Links')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {t(link.label_tr, link.label_en)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-xl font-heading font-bold mb-4">
              {t('İletişim', 'Contact')}
            </h4>
            {settings && (
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0" />
                  <span>{getField(settings, 'address')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaPhone className="text-accent flex-shrink-0" />
                  <div>
                    <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors block">
                      {settings.phone}
                    </a>
                    {settings.mobile && (
                      <a href={`tel:${settings.mobile}`} className="hover:text-white transition-colors block text-sm">
                        {settings.mobile}
                      </a>
                    )}
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <FaEnvelope className="text-accent flex-shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                    {settings.email}
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p className="mb-2">
            © 2024 Göztepe Veteriner Kliniği. {t('Tüm hakları saklıdır.', 'All rights reserved.')}
          </p>
          <p className="text-sm">
            {t("1995'ten beri hizmetinizdeyiz.", 'Serving since 1995.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


