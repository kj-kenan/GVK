import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { submitTestimonial } from '../utils/api';
import { useApiMutation } from '../hooks/useApi';
import { FaTimes, FaUpload } from 'react-icons/fa';

const TestimonialUploadModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { mutate, loading, error, success, reset } = useApiMutation();
  const [formData, setFormData] = useState({
    pet_photo: null,
    owner_name: '',
    pet_name: '',
    description: '',
    email: '',
  });
  const [preview, setPreview] = useState(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(t('Dosya boyutu 5MB\'dan küçük olmalıdır.', 'File size must be less than 5MB.'));
        return;
      }
      setFormData({ ...formData, pet_photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('pet_photo', formData.pet_photo);
    data.append('owner_name', formData.owner_name);
    data.append('pet_name', formData.pet_name);
    data.append('description', formData.description);
    data.append('email', formData.email);
    
    try {
      await mutate(submitTestimonial, data);
      // Reset form on success
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      // Error handled by useApiMutation
    }
  };
  
  const handleClose = () => {
    setFormData({
      pet_photo: null,
      owner_name: '',
      pet_name: '',
      description: '',
      email: '',
    });
    setPreview(null);
    reset();
    onClose();
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-heading font-bold text-dark">
                    {t('Fotoğrafını Paylaş', 'Share Your Photo')}
                  </h2>
                  <button
                    onClick={handleClose}
                    className="text-gray-dark hover:text-dark transition-colors"
                  >
                    <FaTimes className="text-2xl" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* File Upload */}
                  <div>
                    <label className="block text-dark font-medium mb-2">
                      {t('Evcil Hayvan Fotoğrafı', 'Pet Photo')} *
                    </label>
                    <div className="border-2 border-dashed border-gray rounded-lg p-6 text-center">
                      {preview ? (
                        <div className="relative">
                          <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, pet_photo: null });
                              setPreview(null);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <FaUpload className="text-4xl text-primary mx-auto mb-2" />
                          <p className="text-gray-dark mb-2">
                            {t('Fotoğraf yüklemek için tıklayın', 'Click to upload photo')}
                          </p>
                          <p className="text-sm text-gray-dark">
                            {t('Maks. 5MB (JPEG, PNG, WebP)', 'Max. 5MB (JPEG, PNG, WebP)')}
                          </p>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileChange}
                            required
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="owner_name" className="block text-dark font-medium mb-2">
                        {t('Sahip Adı', 'Owner Name')}
                      </label>
                      <input
                        type="text"
                        id="owner_name"
                        name="owner_name"
                        value={formData.owner_name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder={t('İsteğe bağlı', 'Optional')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="pet_name" className="block text-dark font-medium mb-2">
                        {t('Evcil Hayvan Adı', 'Pet Name')}
                      </label>
                      <input
                        type="text"
                        id="pet_name"
                        name="pet_name"
                        value={formData.pet_name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder={t('İsteğe bağlı', 'Optional')}
                      />
                    </div>
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
                      placeholder={t('E-posta adresiniz', 'Your email')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-dark font-medium mb-2">
                      {t('Açıklama', 'Description')}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      maxLength="500"
                      rows="3"
                      className="textarea-field"
                      placeholder={t('İsteğe bağlı (maks. 500 karakter)', 'Optional (max. 500 characters)')}
                    />
                  </div>
                  
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {t('Bir hata oluştu. Lütfen tekrar deneyin.', 'An error occurred. Please try again.')}
                    </div>
                  )}
                  
                  {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                      {t(
                        'Fotoğrafınız başarıyla gönderildi! Onaylandıktan sonra görünecektir.',
                        'Your photo has been submitted! It will appear after approval.'
                      )}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <div className="spinner w-5 h-5 border-2 mr-2"></div>
                        {t('Gönderiliyor...', 'Uploading...')}
                      </span>
                    ) : (
                      t('Gönder', 'Submit')
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TestimonialUploadModal;




