import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { t, setLanguage, getLanguage } from '../utils/i18n';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    alert(getLanguage() === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!');
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCurrentLanguage(lang);
    setFormData({...formData});
  };

  // تحديد ترتيب المحتوى حسب اللغة
  const isArabic = currentLanguage === 'ar';

  const formContent = (
    <div className="form-card">
      <p style={{ fontSize: "1rem", color: "#666" }}>
        {t('login.subtitle')}
      </p>
      <h2>{t('login.title')}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('login.email')}</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t('login.emailPlaceholder')} 
          />
        </div>

        <div className="form-group">
          <label>{t('login.password')}</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={t('login.passwordPlaceholder')} 
          />
          <span className="password-toggle">👁</span>
        </div>

        <div className="form-options">
          <Link to="/forgot-password" className="forgot-password">
            {t('login.forgotPassword')}
          </Link>
        </div>

        <button type="submit" className="submit-btn">
          {t('login.submitButton')}
        </button>
      </form>

      <div className="divider">{t('login.or')}</div>

      <p className="login-text">
        {t('login.noAccount')} 
        <Link to="/register" className="login-link">{t('login.createAccount')}</Link>
      </p>

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
    <div className="login-wrapper" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* المحتوى (الـ branding) - دائماً في الـ left-section */}
      <div className="left-section">
        <div className="branding-content">
          <div className="logo">
            <h1 className="logo-text">OPS</h1>
            <p className="logo-subtitle">Online Pay Solution</p>
          </div>
          <div className="main-headline">
            <h2>{t('login.welcomeTitle')}</h2>
          </div>
          <div className="description">
            <p>{t('login.welcomeDescription')}</p>
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

export default Login;
