import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { submitContact } from '../utils/api';
import { useApiMutation } from '../hooks/useApi';

const ContactForm = () => {
  const { t } = useLanguage();
  const { mutate, loading, error, success } = useApiMutation();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutate(submitContact, formData);
      // Clear form on success
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      // Error is handled by useApiMutation
    }
  };
  
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="full_name" className="block text-dark font-medium mb-2">
          {t('Ad Soyad', 'Full Name')} *
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
          className="input-field"
          placeholder={t('Adınız ve soyadınız', 'Your full name')}
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-dark font-medium mb-2">
          {t('E-posta', 'Email')} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
          placeholder={t('E-posta adresiniz', 'Your email address')}
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-dark font-medium mb-2">
          {t('Telefon', 'Phone')} *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="input-field"
          placeholder={t('Telefon numaranız', 'Your phone number')}
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-dark font-medium mb-2">
          {t('Mesaj', 'Message')} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          className="textarea-field"
          placeholder={t('Mesajınız...', 'Your message...')}
        />
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {t('Bir hata oluştu. Lütfen tekrar deneyin.', 'An error occurred. Please try again.')}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {t('Mesajınız başarıyla gönderildi!', 'Your message has been sent successfully!')}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <div className="spinner w-5 h-5 border-2 mr-2"></div>
            {t('Gönderiliyor...', 'Sending...')}
          </span>
        ) : (
          t('Mesaj Gönder', 'Send Message')
        )}
      </button>
    </motion.form>
  );
};

export default ContactForm;




