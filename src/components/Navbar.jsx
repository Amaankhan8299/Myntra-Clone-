import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, X, Menu, LogOut, CheckCircle2 } from 'lucide-react';
import './Navbar.css';

const Navbar = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  bagCount,
  wishlistCount,
  isLoggedIn,
  userPhone,
  onOpenLogin,
  onLogout,
  onOpenBag
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const categories = [
    { id: 'all', label: 'ALL' },
    { id: 'men', label: 'MEN', tag: 'NEW' },
    { id: 'women', label: 'WOMEN', tag: 'POPULAR' },
    { id: 'kids', label: 'KIDS' },
    { id: 'home', label: 'HOME & LIVING' },
    { id: 'beauty', label: 'BEAUTY' },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="navbar-logo" onClick={() => onSelectCategory('all')}>
          <svg className="myntra-svg-logo" viewBox="0 0 52 36" fill="none">
            <path d="M10.1 0L19.5 28.3L13.8 35.8L0 14.5L10.1 0Z" fill="#FF3F6C" />
            <path d="M22.8 0L32.2 28.3L26.5 35.8L12.7 14.5L22.8 0Z" fill="#F43361" />
            <path d="M35.6 0L45 28.3L39.3 35.8L25.5 14.5L35.6 0Z" fill="#FF905A" />
            <path d="M42.1 0L51.5 28.3L45.8 35.8L32 14.5L42.1 0Z" fill="#FFC700" />
          </svg>
          <span className="logo-text">MYNTRA</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={`navbar-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                onSelectCategory(cat.id);
                setIsMobileMenuOpen(false);
              }}
            >
              {cat.label}
              {cat.tag && <span className="category-tag">{cat.tag}</span>}
            </button>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="navbar-search">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => onSearchChange('')}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Right Actions (Profile, Wishlist, Bag) */}
        <div className="navbar-actions">
          {/* Profile Dropdown Container */}
          <div
            className="action-item profile-action"
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
            onClick={() => {
              if (!isLoggedIn) onOpenLogin();
            }}
          >
            <User size={20} className="action-icon" />
            <span className="action-label">{isLoggedIn ? 'Account' : 'Profile'}</span>

            {/* Profile Dropdown Box */}
            {isProfileHovered && (
              <div className="profile-dropdown">
                {isLoggedIn ? (
                  <div className="dropdown-content">
                    <div className="user-welcome">
                      <p className="welcome-title">Welcome Back!</p>
                      <p className="user-contact">+91 {userPhone}</p>
                    </div>
                    <hr className="dropdown-divider" />
                    <ul className="dropdown-links">
                      <li>Orders & Returns</li>
                      <li>Wishlist</li>
                      <li>Myntra Credit</li>
                      <li>Coupons</li>
                      <li>Saved Cards</li>
                    </ul>
                    <button className="logout-btn" onClick={onLogout}>
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="dropdown-content">
                    <p className="dropdown-headline">Welcome</p>
                    <p className="dropdown-subtext">To access account and manage orders</p>
                    <button className="login-trigger-btn" onClick={onOpenLogin}>
                      LOGIN / SIGNUP
                    </button>
                    <hr className="dropdown-divider" />
                    <ul className="dropdown-links">
                      <li>Orders</li>
                      <li>Wishlist</li>
                      <li>Gift Cards</li>
                      <li>Contact Us</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <div className="action-item">
            <Heart size={20} className="action-icon" />
            <span className="action-label">Wishlist</span>
            {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
          </div>

          {/* Bag Icon */}
          <div className="action-item bag-action" onClick={onOpenBag}>
            <ShoppingBag size={20} className="action-icon" />
            <span className="action-label">Bag</span>
            {bagCount > 0 && <span className="action-badge bag-badge">{bagCount}</span>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
