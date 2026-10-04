import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Tag, ArrowRight } from 'lucide-react';
import './BannerCarousel.css';

const BANNERS = [
  {
    id: 1,
    image: '/images/banner1.jpg',
    title: 'FASHION FRENZY SALE',
    subtitle: 'FLAT 50% - 80% OFF',
    tagline: 'Top Global Brands & Latest Runway Styles',
    code: 'DEALS70',
    buttonText: 'SHOP NOW',
    category: 'all',
    bgGradient: 'linear-gradient(135deg, #ff3f6c 0%, #ff905a 100%)'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop',
    title: 'NEW SEASON ARRIVALS',
    subtitle: 'MIN. 40% OFF ON LUXURY DRESSES',
    tagline: 'Elevate Your Everyday Style Statement',
    code: 'NEWSTYLE',
    buttonText: 'EXPLORE WOMEN',
    category: 'women',
    bgGradient: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1400&auto=format&fit=crop',
    title: 'URBAN STREETWEAR & SNEAKERS',
    subtitle: 'EXPLORE TOP ATHLEISURE BRANDS',
    tagline: 'Puma, Nike, Adidas, HRX & More',
    code: 'SNEAKERHUB',
    buttonText: 'DISCOVER MEN',
    category: 'men',
    bgGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
  }
];

const BannerCarousel = ({ onSelectCategory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const currentBanner = BANNERS[currentIndex];

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        {/* Slides */}
        {BANNERS.map((banner, idx) => (
          <div
            key={banner.id}
            className={`carousel-slide ${idx === currentIndex ? 'active' : ''}`}
          >
            <img src={banner.image} alt={banner.title} className="slide-image" />
            <div className="slide-overlay">
              <div className="slide-content">
                <span className="banner-badge">
                  <Sparkles size={14} /> LIMITED TIME OFFER
                </span>
                <h2 className="banner-title">{banner.title}</h2>
                <p className="banner-subtitle">{banner.subtitle}</p>
                <p className="banner-tagline">{banner.tagline}</p>
                <div className="banner-actions">
                  <button
                    className="banner-cta-btn"
                    onClick={() => onSelectCategory(banner.category)}
                  >
                    {banner.buttonText} <ArrowRight size={16} />
                  </button>
                  <span className="coupon-badge">
                    <Tag size={14} /> Use Code: <strong>{banner.code}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Arrow Controls */}
        <button className="carousel-arrow prev-arrow" onClick={handlePrev} aria-label="Previous Banner">
          <ChevronLeft size={24} />
        </button>
        <button className="carousel-arrow next-arrow" onClick={handleNext} aria-label="Next Banner">
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="carousel-dots">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to banner ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
