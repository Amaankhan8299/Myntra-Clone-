import React from 'react';
import { ShieldCheck, RefreshCw, Truck, Award } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="myntra-footer">
      {/* Guarantees Section */}
      <div className="footer-guarantees">
        <div className="footer-guarantee-container">
          <div className="guarantee-item">
            <ShieldCheck size={36} className="guarantee-icon" />
            <div>
              <h4>100% ORIGINAL</h4>
              <p>guarantee for all products at myntra.com</p>
            </div>
          </div>
          <div className="guarantee-item">
            <RefreshCw size={36} className="guarantee-icon" />
            <div>
              <h4>Return within 14days</h4>
              <p>of receiving your order</p>
            </div>
          </div>
          <div className="guarantee-item">
            <Truck size={36} className="guarantee-icon" />
            <div>
              <h4>Get free delivery</h4>
              <p>for every order above ₹799</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-links-container">
        <div className="footer-col">
          <h4>ONLINE SHOPPING</h4>
          <ul>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Home & Living</li>
            <li>Beauty</li>
            <li>Gift Cards</li>
            <li>Myntra Insider</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>CUSTOMER POLICIES</h4>
          <ul>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>T&C</li>
            <li>Terms Of Use</li>
            <li>Track Orders</li>
            <li>Shipping</li>
            <li>Cancellation</li>
            <li>Returns</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>EXPERIENCE MYNTRA APP ON MOBILE</h4>
          <div className="app-download-badges">
            <img
              src="https://constant.myntassets.com/web/assets/img/80a5db90-8536-40ac-a477-72f5c22509121539674178924-google_play.png"
              alt="Google Play Store"
            />
            <img
              src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png"
              alt="Apple App Store"
            />
          </div>

          <h4 className="social-header">KEEP IN TOUCH</h4>
          <div className="social-links">
            <span className="social-icon">f</span>
            <span className="social-icon">t</span>
            <span className="social-icon">yt</span>
            <span className="social-icon">ig</span>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>© 2026 www.myntra.com. All rights reserved. (Myntra Frontend React Clone)</p>
      </div>
    </footer>
  );
};

export default Footer;
