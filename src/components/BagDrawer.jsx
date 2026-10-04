import React from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Tag, CheckCircle2 } from 'lucide-react';
import './BagDrawer.css';

const BagDrawer = ({ isOpen, onClose, bagItems, onRemoveFromBag, onUpdateQuantity, onCheckout }) => {
  if (!isOpen) return null;

  const totalMRP = bagItems.reduce((acc, item) => acc + item.originalPrice * (item.quantity || 1), 0);
  const totalDiscountPrice = bagItems.reduce((acc, item) => acc + item.discountPrice * (item.quantity || 1), 0);
  const totalDiscount = totalMRP - totalDiscountPrice;
  const convenienceFee = bagItems.length > 0 ? 99 : 0;
  const finalAmount = totalDiscountPrice > 0 ? totalDiscountPrice + convenienceFee : 0;

  return (
    <div className="bag-drawer-overlay" onClick={onClose}>
      <div className="bag-drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bag-drawer-header">
          <div className="bag-header-title">
            <ShoppingBag size={20} color="#ff3f6c" />
            <h3>SHOPPING BAG ({bagItems.length})</h3>
          </div>
          <button className="bag-close-btn" onClick={onClose} aria-label="Close Bag Drawer">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="bag-drawer-body">
          {bagItems.length === 0 ? (
            <div className="empty-bag-state">
              <ShoppingBag size={64} className="empty-bag-icon" />
              <h4>Hey, it feels so light!</h4>
              <p>There is nothing in your bag. Let's add some items.</p>
              <button className="shop-now-btn" onClick={onClose}>
                ADD ITEMS FROM WISHLIST
              </button>
            </div>
          ) : (
            <div className="bag-content-wrapper">
              {/* Offers Promo Banner */}
              <div className="bag-offer-bar">
                <Tag size={16} /> <span>Yay! You qualify for <strong>FREE Delivery</strong></span>
              </div>

              {/* Items List */}
              <div className="bag-items-list">
                {bagItems.map((item) => (
                  <div key={item.id} className="bag-item-card">
                    <img src={item.image} alt={item.name} className="bag-item-img" />
                    
                    <div className="bag-item-info">
                      <h4 className="bag-item-brand">{item.brand}</h4>
                      <p className="bag-item-name">{item.name}</p>
                      
                      <div className="bag-item-pricing">
                        <span className="price-discount">₹{item.discountPrice}</span>
                        <span className="price-original">₹{item.originalPrice}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="bag-item-controls">
                        <div className="qty-selector">
                          <button
                            onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity || 1}</span>
                          <button onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}>
                            +
                          </button>
                        </div>

                        <button
                          className="remove-item-btn"
                          onClick={() => onRemoveFromBag(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="price-details-box">
                <h4>PRICE DETAILS ({bagItems.length} Items)</h4>
                
                <div className="price-row">
                  <span>Total MRP</span>
                  <span>₹{totalMRP}</span>
                </div>
                <div className="price-row green">
                  <span>Discount on MRP</span>
                  <span>- ₹{totalDiscount}</span>
                </div>
                <div className="price-row">
                  <span>Convenience Fee</span>
                  <span>{convenienceFee > 0 ? `₹${convenienceFee}` : 'FREE'}</span>
                </div>
                
                <hr className="price-divider" />
                
                <div className="price-row total-row">
                  <span>Total Amount</span>
                  <span>₹{finalAmount}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Place Order Button */}
        {bagItems.length > 0 && (
          <div className="bag-drawer-footer">
            <div className="footer-amount">
              <span className="lbl">Total</span>
              <span className="val">₹{finalAmount}</span>
            </div>
            <button className="place-order-btn" onClick={onCheckout}>
              PLACE ORDER <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BagDrawer;
