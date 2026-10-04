import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BannerCarousel from './components/BannerCarousel';
import ProductGrid from './components/ProductGrid';
import LoginForm from './components/LoginForm';
import BagDrawer from './components/BagDrawer';
import Footer from './components/Footer';
import { CheckCircle2, ShoppingBag, Heart } from 'lucide-react';
import './App.css';

function App() {
  // State management using React useState
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal & Drawer State
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);

  // User & Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhone, setUserPhone] = useState('');

  // Cart / Bag & Wishlist State
  const [bagItems, setBagItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, iconType = 'check') => {
    setToast({ message, iconType });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Add item to bag handler
  const handleAddToBag = (product) => {
    setBagItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    showToast(`Added "${product.brand}" to your Shopping Bag!`, 'bag');
  };

  // Remove item from bag
  const handleRemoveFromBag = (productId) => {
    setBagItems((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from Bag', 'check');
  };

  // Update item quantity
  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    setBagItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  // Toggle Wishlist
  const handleToggleWishlist = (productId) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to Wishlist!', 'heart');
        return [...prev, productId];
      }
    });
  };

  // Login Success
  const handleLoginSuccess = (phone) => {
    setIsLoggedIn(true);
    setUserPhone(phone);
    showToast(`Logged in successfully as +91 ${phone}!`, 'check');
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPhone('');
    showToast('Logged out successfully', 'check');
  };

  // Place Order / Checkout
  const handleCheckout = () => {
    if (!isLoggedIn) {
      setIsBagOpen(false);
      setIsLoginOpen(true);
      showToast('Please login to place your order', 'check');
      return;
    }
    setBagItems([]);
    setIsBagOpen(false);
    showToast('🎉 Order Placed Successfully! Thank you for shopping with Myntra.', 'check');
  };

  const totalBagCount = bagItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const addedBagIds = bagItems.map((item) => item.id);

  return (
    <div className="app-main-layout">
      {/* Toast Notification */}
      {toast && (
        <div className="app-toast">
          {toast.iconType === 'bag' ? (
            <ShoppingBag size={18} color="#ff3f6c" />
          ) : toast.iconType === 'heart' ? (
            <Heart size={18} color="#ff3f6c" fill="#ff3f6c" />
          ) : (
            <CheckCircle2 size={18} color="#03a685" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Navbar Component */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        bagCount={totalBagCount}
        wishlistCount={wishlistIds.length}
        isLoggedIn={isLoggedIn}
        userPhone={userPhone}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        onOpenBag={() => setIsBagOpen(true)}
      />

      {/* Main Content Area */}
      <main className="app-content">
        {/* Banner Carousel */}
        <BannerCarousel onSelectCategory={setActiveCategory} />

        {/* Product Grid Section */}
        <ProductGrid
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onAddToBag={handleAddToBag}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          addedBagIds={addedBagIds}
        />
      </main>

      {/* Login Modal Component */}
      <LoginForm
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Side Bag Overlay Drawer Component */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        bagItems={bagItems}
        onRemoveFromBag={handleRemoveFromBag}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default App;
