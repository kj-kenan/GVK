import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const serviceNames = {
  dahiliye: 'Dahiliye',
  laboratuvar: 'Laboratuvar',
  cerrahi: 'Cerrahi',
  radyoloji: 'Radyoloji',
  'radyoloji-uzmanlik': 'Radyoloji',
  kbb: 'KBB',
  kardiyoloji: 'Kardiyoloji',
  anesteziyoloji: 'Anesteziyoloji',
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const name = serviceNames[slug] || slug;

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Header */}
      <div className="bg-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            {name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Göstepe Veteriner Kliniği
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-12 text-center"
        >
          <p className="text-gray-500 text-xl mb-8">
            Bu sayfa yakında güncellenecek.
          </p>
          <Link to="/" className="btn-primary inline-block">
            <FaArrowLeft className="inline mr-2" />
            Ana Sayfaya Dön
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetail;
