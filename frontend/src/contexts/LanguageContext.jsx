import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Load language from localStorage or default to 'tr'
    return localStorage.getItem('language') || 'tr';
  });
  
  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };
  
  const t = (trText, enText) => {
    return language === 'tr' ? trText : (enText || trText);
  };
  
  // Get field value based on current language
  const getField = (obj, fieldName) => {
    if (!obj) return '';
    const trField = obj[`${fieldName}_tr`];
    const enField = obj[`${fieldName}_en`];
    return language === 'tr' ? trField : (enField || trField);
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, getField }}>
      {children}
    </LanguageContext.Provider>
  );
};




