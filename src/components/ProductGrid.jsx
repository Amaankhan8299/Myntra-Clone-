import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Check, Filter, ArrowUpDown } from 'lucide-react';
import './ProductGrid.css';

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    category: 'men',
    brand: 'ROADSTER',
    name: 'Men Blue Solid Denim Trucker Jacket',
    image: '/images/jacket.jpg',
    originalPrice: 3499,
    discountPrice: 1399,
    discountPercent: 60,
    rating: 4.4,
    ratingCount: '3.2k',
    isTrending: true
  },
  {
    id: 2,
    category: 'women',
    brand: 'ANOUK',
    name: 'Women Floral Printed Midi A-Line Dress',
    image: '/images/dress.jpg',
    originalPrice: 2799,
    discountPrice: 1119,
    discountPercent: 60,
    rating: 4.6,
    ratingCount: '1.8k',
    isTrending: true
  },
  {
    id: 3,
    category: 'men',
    brand: 'LUXE URBAN',
    name: 'Men White & Beige Retro Chunky Sneakers',
    image: '/images/sneakers.jpg',
    originalPrice: 4999,
    discountPrice: 2499,
    discountPercent: 50,
    rating: 4.5,
    ratingCount: '950',
    isTrending: false
  },
  {
    id: 4,
    category: 'women',
    brand: 'MANGO',
    name: 'Women Structured Solid Tote Handbag',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    originalPrice: 3990,
    discountPrice: 1995,
    discountPercent: 50,
    rating: 4.7,
    ratingCount: '620',
    isTrending: true
  },
  {
    id: 5,
    category: 'men',
    brand: 'HRX BY HRITHIK',
    name: 'Men Black Rapid-Dry Running T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    originalPrice: 1299,
    discountPrice: 599,
    discountPercent: 54,
    rating: 4.3,
    ratingCount: '5.4k',
    isTrending: false
  },
  {
    id: 6,
    category: 'women',
    brand: 'BIBA',
    name: 'Women Fuchsia Pink Printed Kurta Set',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    originalPrice: 4599,
    discountPrice: 2299,
    discountPercent: 50,
    rating: 4.8,
    ratingCount: '4.1k',
    isTrending: true
  },
  {
    id: 7,
    category: 'kids',
    brand: 'GINI & JONY',
    name: 'Boys Cotton Printed Casual Shirt',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop',
    originalPrice: 1499,
    discountPrice: 699,
    discountPercent: 53,
    rating: 4.2,
    ratingCount: '410',
    isTrending: false
  },
  {
    id: 8,
    category: 'beauty',
    brand: "L'OREAL PARIS",
    name: 'Revitalift Serum with Hyaluronic Acid',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    originalPrice: 999,
    discountPrice: 749,
    discountPercent: 25,
    rating: 4.6,
    ratingCount: '8.9k',
    isTrending: true
  },
  {
    id: 9,
    category: 'home',
    brand: 'BOMBAY DYEING',
    name: '100% Cotton 144 TC Double Bed Sheet Set',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop',
    originalPrice: 2499,
    discountPrice: 1249,
    discountPercent: 50,
    rating: 4.4,
    ratingCount: '1.2k',
    isTrending: false
  },
  {
    id: 10,
    category: 'men',
    brand: "LEVI'S",
    name: 'Men 511 Slim Fit Mid-Rise Jeans',
    image: 'https://images.unsplash.com/photo-1542272604-780c36856d64?q=80&w=800&auto=format&fit=crop',
    originalPrice: 3899,
    discountPrice: 2339,
    discountPercent: 40,
    rating: 4.5,
    ratingCount: '6.7k',
    isTrending: true
  },
  {
    id: 11,
    category: 'beauty',
    brand: 'FOREST ESSENTIALS',
    name: 'Luxury Facial Cleanser Kashmiri Saffron',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    originalPrice: 1575,
    discountPrice: 1417,
    discountPercent: 10,
    rating: 4.8,
    ratingCount: '2.3k',
    isTrending: true
  },
  {
    id: 12,
    category: 'kids',
    brand: 'MOTHERCARE',
    name: 'Girls Pastel Tiered Cotton Sundress',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800&auto=format&fit=crop',
    originalPrice: 1899,
    discountPrice: 949,
    discountPercent: 50,
    rating: 4.5,
    ratingCount: '340',
    isTrending: false
  }
];

const ProductGrid = ({
  activeCategory,
  searchQuery,
  onAddToBag,
  onToggleWishlist,
  wishlistIds = [],
  addedBagIds = []
}) => {
  const [sortBy, setSortBy] = useState('recommended');

  // Filter products by search and category
  let filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.discountPrice - b.discountPrice);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.discountPrice - a.discountPrice);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'discount') {
    filteredProducts.sort((a, b) => b.discountPercent - a.discountPercent);
  }

  return (
    <section className="product-grid-section">
      <div className="product-grid-container">
        {/* Header Bar: Title & Filters */}
        <div className="grid-header">
          <div className="grid-title-wrapper">
            <h2 className="grid-category-title">
              {activeCategory.toUpperCase()} PRODUCTS
            </h2>
            <span className="grid-item-count">
              - {filteredProducts.length} items
            </span>
          </div>

          <div className="grid-controls">
            <div className="sort-wrapper">
              <ArrowUpDown size={16} className="sort-icon" />
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Better Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="no-products">
            <Filter size={48} className="no-prod-icon" />
            <h3>No products found</h3>
            <p>Try searching for another keyword or change your category filter.</p>
          </div>
        )}

        {/* Product Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isAddedToBag = addedBagIds.includes(product.id);

            return (
              <div key={product.id} className="product-card">
                {/* Image Container */}
                <div className="card-image-wrapper">
                  <img src={product.image} alt={product.name} className="card-image" />
                  
                  {/* Rating Tag */}
                  <div className="rating-badge">
                    <span className="rating-score">{product.rating}</span>
                    <Star size={12} className="star-icon" />
                    <span className="rating-divider">|</span>
                    <span className="rating-count">{product.ratingCount}</span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={() => onToggleWishlist(product.id)}
                    aria-label="Wishlist Item"
                  >
                    <Heart size={18} fill={isWishlisted ? '#ff3f6c' : 'none'} color={isWishlisted ? '#ff3f6c' : '#282c3f'} />
                  </button>

                  {/* Trending Tag */}
                  {product.isTrending && (
                    <span className="trending-badge">TRENDING</span>
                  )}
                </div>

                {/* Card Details */}
                <div className="card-details">
                  <h3 className="card-brand">{product.brand}</h3>
                  <p className="card-name" title={product.name}>{product.name}</p>
                  
                  {/* Pricing */}
                  <div className="card-pricing">
                    <span className="discount-price">₹{product.discountPrice}</span>
                    <span className="original-price">₹{product.originalPrice}</span>
                    <span className="discount-percent">({product.discountPercent}% OFF)</span>
                  </div>

                  {/* Add to Bag CTA Button */}
                  <button
                    className={`add-bag-btn ${isAddedToBag ? 'added' : ''}`}
                    onClick={() => onAddToBag(product)}
                  >
                    {isAddedToBag ? (
                      <>
                        <Check size={16} /> ADDED TO BAG
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} /> ADD TO BAG
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
