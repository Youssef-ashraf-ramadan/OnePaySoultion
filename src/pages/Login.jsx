import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { t, setLanguage, getLanguage } from '../utils/i18n';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

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
    // هنا يمكن إضافة منطق تسجيل الدخول
    alert(getLanguage() === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!');
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Force re-render by updating state
    setFormData({...formData});
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side - Form Section */}
        <div className="form-section">
          <div className="form-header">
            <h2>{t('login.title')}</h2>
            <p>{t('login.subtitle')}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">{t('login.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder={t('login.emailPlaceholder')}
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">{t('login.password')}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder={t('login.passwordPlaceholder')}
              />
            </div>

            {/* Forgot Password */}
            <div className="form-options">
              <Link to="/forgot-password" className="forgot-password">
                {t('login.forgotPassword')}
              </Link>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              {t('login.submitButton')}
            </button>

            {/* Register Link */}
            <div className="register-link">
              <p>{t('login.noAccount')} <Link to="/register">{t('login.createAccount')}</Link></p>
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

export default Login;
