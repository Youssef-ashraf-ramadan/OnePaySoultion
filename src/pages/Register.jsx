import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { t, setLanguage, getLanguage } from '../utils/i18n';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Swiper data
  const swiperData = [
    {
      id: 1,
      title: t('register.swiper.slide1.title'),
      description: t('register.swiper.slide1.description'),
      currency: "€ $ £ ₹ ¥ ₽"
    },
    {
      id: 2,
      title: t('register.swiper.slide2.title'),
      description: t('register.swiper.slide2.description'),
      currency: "💳 🏦 📱 💰"
    },
    {
      id: 3,
      title: t('register.swiper.slide3.title'),
      description: t('register.swiper.slide3.description'),
      currency: "🌍 🌎 🌏 🗺️"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());

  // Auto-rotate swiper
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % swiperData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [swiperData.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(getLanguage() === 'ar' ? 'تم إرسال البيانات بنجاح!' : 'Data submitted successfully!');
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCurrentLanguage(lang);
    setFormData({ ...formData });
  };

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  // تحديد ترتيب المحتوى حسب اللغة
  const isArabic = currentLanguage === 'ar';
  
  const brandingContent = (
    <div className="branding-content">
      <div className="logo">
        <h1 className="logo-text">OPS</h1>
        <p className="logo-subtitle">Online Pay Solution</p>
      </div>
      <div className="main-headline">
        <h2 key={currentSlide} className="slide-title">
          {swiperData[currentSlide].title}
        </h2>
      </div>
      <div className="description">
        <p key={currentSlide} className="slide-description">
          {swiperData[currentSlide].description}
        </p>
      </div>
      <div className="indicators">
        {swiperData.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );

  const formContent = (
    <div className="form-card">
      <p style={{ fontSize: "1rem", color: "#666" }}>
        {t('register.getStarted')}
      </p>
      <h2>{t('register.createAccount')}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('register.fullName')}</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t('register.fullNamePlaceholder')} 
          />
        </div>

        <div className="form-group">
          <label>{t('register.email')}</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t('register.emailPlaceholder')} 
          />
        </div>

        <div className="form-group">
          <label>{t('register.password')}</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={t('register.passwordPlaceholder')} 
          />
          <span className="password-toggle">👁</span>
        </div>

        <button type="submit" className="submit-btn">
          {t('register.submitButton')}
        </button>
      </form>

      <div className="divider">{t('register.or')}</div>

      <p className="login-text">
        {t('register.hasAccount')} 
        <Link to="/login" className="login-link">{t('register.login')}</Link>
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
    <div className="register-wrapper" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* المحتوى (الـ swiper) - دائماً في الـ left-section */}
      <div className="left-section">
        {brandingContent}
        <div className="currency-background" key={currentSlide}>
          {swiperData[currentSlide].currency}
        </div>
      </div>
      
      {/* الفورم - دائماً في الـ right-section */}
      <div className="right-section">
        {formContent}
      </div>
    </div>
  );
};

export default Register;
