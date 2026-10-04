import React, { useState } from 'react';
import { X, ShieldCheck, ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import './LoginForm.css';

const LoginForm = ({ isOpen, onClose, onLoginSuccess }) => {
  const [step, setStep] = useState(1); // Step 1: Mobile input, Step 2: OTP
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate sending OTP
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next field
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setError('Please enter complete 4-digit OTP');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(phoneNumber);
      // Reset state
      setStep(1);
      setPhoneNumber('');
      setOtp(['', '', '', '']);
      onClose();
    }, 800);
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="login-close-btn" onClick={onClose} aria-label="Close Modal">
          <X size={20} />
        </button>

        {/* Top Banner Image */}
        <div className="login-banner">
          <div className="banner-content">
            <span className="banner-tag">MYNTRA INSIDER</span>
            <h3 className="banner-offer">Flat ₹200 OFF</h3>
            <p className="banner-sub">Plus Free Shipping on Your First Order!</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="login-body">
          {step === 1 ? (
            <form onSubmit={handleMobileSubmit} className="login-form">
              <div className="login-header-text">
                <h2>Login <span>or</span> Signup</h2>
              </div>

              <div className="input-group">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Mobile Number *"
                  value={phoneNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setPhoneNumber(val);
                    if (error) setError('');
                  }}
                  autoFocus
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <p className="terms-text">
                By continuing, I agree to the <a href="#terms">Terms of Use</a> & <a href="#privacy">Privacy Policy</a>
              </p>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SENDING OTP...' : 'CONTINUE'}
              </button>

              <div className="help-login-text">
                Have trouble logging in? <a href="#help">Get help</a>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="login-form otp-form">
              <div className="login-header-text">
                <h2>Verify with OTP</h2>
                <p className="otp-sent-to">
                  Sent via SMS to <strong>+91 {phoneNumber}</strong>
                  <button
                    type="button"
                    className="edit-phone-btn"
                    onClick={() => setStep(1)}
                  >
                    Edit
                  </button>
                </p>
              </div>

              {/* 4 Digit OTP Inputs */}
              <div className="otp-inputs-wrapper">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="otp-box"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {error && <p className="error-message">{error}</p>}

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'VERIFYING...' : 'VERIFY OTP'}
              </button>

              <p className="resend-text">
                Resend OTP in <span className="timer">00:29</span>
              </p>
            </form>
          )}

          <div className="security-badge">
            <ShieldCheck size={16} /> 100% Genuine & Secure Myntra Account
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
