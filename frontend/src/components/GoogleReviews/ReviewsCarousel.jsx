import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useLanguage } from '../../contexts/LanguageContext';
import ReviewCard from './ReviewCard';
import Loading from '../Loading';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewsCarousel = () => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ average_rating: 0, total_reviews: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/reviews/summary/');
      const data = await response.json();
      
      if (response.ok) {
        setReviews(data.reviews || []);
        setSummary({
          average_rating: data.average_rating || 0,
          total_reviews: data.total_reviews || 0,
        });
      } else {
        throw new Error(data.message || 'Failed to fetch reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-2">
          {t('Yorumlar yüklenirken bir hata oluştu', 'Error loading reviews')}
        </p>
        <p className="text-sm text-gray-600">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          {t('Henüz değerlendirme bulunmuyor', 'No reviews available yet')}
        </p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
            {t('Müşteri Değerlendirmeleri', 'Customer Reviews')}
          </h2>
          
          {/* Rating Summary */}
          {summary.total_reviews > 0 && (
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl font-bold text-primary">
                {t('MÜKEMMEL', 'EXCELLENT')}
              </span>
              <div className="flex text-xl">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-gray-600 flex items-center justify-center space-x-2">
            <img 
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" 
              alt="Google" 
              className="h-6"
            />
            <span>
              {t(
                `${summary.average_rating.toFixed(1)} • ${summary.total_reviews} değerlendirme`,
                `${summary.average_rating.toFixed(1)} • ${summary.total_reviews} reviews`
              )}
            </span>
          </p>
        </div>

        {/* Reviews Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Göztepe Veteriner Kliniği')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors shadow-md hover:shadow-lg"
          >
            <img 
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" 
              alt="Google" 
              className="h-5"
            />
            <span className="font-medium">
              {t('Değerlendirme Yap', 'Leave a Review')}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;


