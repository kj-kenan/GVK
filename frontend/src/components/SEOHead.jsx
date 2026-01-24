import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  image = '/logo.png',
  type = 'website',
  url 
}) => {
  const siteName = 'Göztepe Veteriner Kliniği';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Göztepe Veteriner Kliniği - Evcil dostlarınızın sağlığı için uzman kadromuzla hizmetinizdeyiz. Kadıköy, İstanbul.';
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url || window.location.href} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Turkish" />
      <meta name="author" content={siteName} />
      <link rel="canonical" href={url || window.location.href} />
    </Helmet>
  );
};

export default SEOHead;
