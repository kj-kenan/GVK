import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 150;
  const shouldTruncate = review.text && review.text.length > maxLength;

  const displayText = expanded || !shouldTruncate
    ? review.text
    : `${review.text.substring(0, maxLength)}...`;

  // Render stars
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < review.rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ⭐
      </span>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 h-full flex flex-col"
    >
      {/* Header with avatar and name */}
      <div className="flex items-center space-x-4 mb-4">
        {review.profile_photo_url ? (
          <img
            src={review.profile_photo_url}
            alt={review.author_name}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                review.author_name
              )}&background=1e40af&color=fff`;
            }}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
            {review.author_name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{review.author_name}</h4>
          <div className="flex items-center space-x-2">
            <div className="flex text-sm">{renderStars()}</div>
            <FaGoogle className="text-blue-500" />
          </div>
        </div>
      </div>

      {/* Review text */}
      {review.text && (
        <div className="flex-1 mb-4">
          <p className="text-gray-700 leading-relaxed">{displayText}</p>
          {shouldTruncate && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-primary hover:text-secondary font-medium text-sm mt-2 transition-colors"
            >
              {expanded ? 'Daha az göster' : 'Daha fazla oku'}
            </button>
          )}
        </div>
      )}

      {/* Time posted */}
      <div className="text-sm text-gray-500 mt-auto">
        {review.relative_time_description}
      </div>
    </motion.div>
  );
};

export default ReviewCard;


