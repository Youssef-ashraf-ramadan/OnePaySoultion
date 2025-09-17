import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { t, setLanguage, getLanguage } from '../utils/i18n';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset Email:', email);
    setIsSubmitted(true);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCurrentLanguage(lang);
    setEmail(email);
  };

  // تحديد ترتيب المحتوى حسب اللغة
  const isArabic = currentLanguage === 'ar';

  const formContent = (
    <div className="form-card">
      <p style={{ fontSize: "1rem", color: "#666" }}>
        {t('forgotPassword.subtitle')}
      </p>
      <h2>{t('forgotPassword.title')}</h2>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('forgotPassword.email')}</label>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder={t('forgotPassword.emailPlaceholder')} 
            />
          </div>

          <button type="submit" className="submit-btn">
            {t('forgotPassword.submitButton')}
          </button>

          <div className="divider">{t('forgotPassword.or')}</div>

          <p className="login-text">
            {t('forgotPassword.rememberPassword')} 
            <Link to="/login" className="login-link">{t('forgotPassword.backToLogin')}</Link>
          </p>
        </form>
      ) : (
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
        </div>
      )}

      <div className="language-switcher">
        <label>
          <input 
            type="radio" 
            name="lang" 
            checked={currentLanguage === 'en'}
            onChange={() => handleLanguageChange('en')}
          /> 
          English
        </label>
        <label>
          <input 
            type="radio" 
            name="lang" 
            checked={currentLanguage === 'ar'}
            onChange={() => handleLanguageChange('ar')}
          /> 
          العربية
        </label>
      </div>
    </div>
  );

  return (
    <div className="forgot-password-wrapper" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* المحتوى (الـ branding) - دائماً في الـ left-section */}
      <div className="left-section">
        <div className="branding-content">
          <div className="logo">
            <h1 className="logo-text">OPS</h1>
            <p className="logo-subtitle">Online Pay Solution</p>
          </div>
          <div className="main-headline">
            <h2>{t('forgotPassword.welcomeTitle')}</h2>
          </div>
          <div className="description">
            <p>{t('forgotPassword.welcomeDescription')}</p>
          </div>
        </div>
      </div>
      
      {/* الفورم - دائماً في الـ right-section */}
      <div className="right-section">
        {formContent}
      </div>
    </div>
  );
};

export default ForgotPassword;
