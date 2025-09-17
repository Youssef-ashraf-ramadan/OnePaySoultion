import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { t, setLanguage, getLanguage } from '../utils/i18n';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset Email:', email);
    // هنا يمكن إضافة منطق إرسال رابط إعادة تعيين كلمة المرور
    setIsSubmitted(true);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Force re-render by updating state
    setEmail(email);
  };

  if (isSubmitted) {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <div className="form-section">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>{t('forgotPassword.successTitle')}</h2>
            <p>{t('forgotPassword.successMessage')}</p>
            <p className="email-sent">{t('forgotPassword.emailSent')} {email}</p>
            <div className="action-buttons">
              <Link to="/login" className="back-to-login-btn">
                {t('forgotPassword.backToLoginBtn')}
              </Link>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="resend-btn"
              >
                {t('forgotPassword.resendBtn')}
              </button>
            </div>
            {/* Language Switcher */}
            <div className="language-switcher">
              <button 
                type="button" 
                className={`lang-btn ${getLanguage() === 'ar' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('ar')}
              >
                عربي
              </button>
              <button 
                type="button" 
                className={`lang-btn ${getLanguage() === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                English
              </button>
            </div>
          </div>
          </div>
          <div className="image-section">
            <div className="logo-container">
              <img src="/logo.jpeg" alt="OPS Logo" className="logo-image" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        {/* Left Side - Form Section */}
        <div className="form-section">
          <div className="form-header">
            <h2>{t('forgotPassword.title')}</h2>
            <p>{t('forgotPassword.subtitle')}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="forgot-password-form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">{t('forgotPassword.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
                placeholder={t('forgotPassword.emailPlaceholder')}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              {t('forgotPassword.submitButton')}
            </button>

            {/* Back to Login Link */}
            <div className="back-link">
              <Link to="/login" className="back-to-login">
                {t('forgotPassword.backToLogin')}
              </Link>
            </div>

            {/* Language Switcher */}
            <div className="language-switcher">
              <button 
                type="button" 
                className={`lang-btn ${getLanguage() === 'ar' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('ar')}
              >
                عربي
              </button>
              <button 
                type="button" 
                className={`lang-btn ${getLanguage() === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                English
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Logo Section */}
        <div className="image-section">
          <div className="logo-container">
            <img src="/logo.jpeg" alt="OPS Logo" className="logo-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
