import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({
  title,
  description,
  image = 'https://goztepevet.com.tr/logonew.png',
  type = 'website',
  url
}) => {
  const siteName = 'Göztepe Veteriner Kliniği';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Kadıköy İstanbul Veteriner`;
  const defaultDescription = 'Göztepe Veteriner Kliniği - Kadıköy İstanbul. Dahiliye, cerrahi, radyoloji, kardiyoloji, acil veteriner hizmetleri. Uzman kadromuzla yanınızdayız.';
  const canonicalUrl = url || 'https://goztepevet.com.tr';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Turkish" />
      <meta name="author" content={siteName} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="tr_TR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;
