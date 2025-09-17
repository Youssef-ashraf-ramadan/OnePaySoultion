import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { t, setLanguage, getLanguage, getCountries } from '../utils/i18n';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    vendorWebsite: ''
  });

  const countries = getCountries();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // هنا يمكن إضافة منطق إرسال البيانات
    alert(getLanguage() === 'ar' ? 'تم إرسال البيانات بنجاح!' : 'Data submitted successfully!');
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Force re-render by updating state
    setFormData({...formData});
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Left Side - Form Section */}
        <div className="form-section">
          <div className="form-header">
            <h2>{t('register.title')}</h2>
            <p>{t('register.subtitle')}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="register-form">
            {/* Name and Email Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('register.fullName')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder={t('register.fullNamePlaceholder')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('register.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder={t('register.emailPlaceholder')}
                />
              </div>
            </div>

            {/* Password and Phone Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">{t('register.password')}</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder={t('register.passwordPlaceholder')}
                  minLength="6"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">{t('register.phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder={t('register.phonePlaceholder')}
                />
              </div>
            </div>

            {/* Country and Website Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country">{t('register.country')}</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{t('register.countryPlaceholder')}</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="vendorWebsite">{t('register.vendorWebsite')}</label>
                <input
                  type="url"
                  id="vendorWebsite"
                  name="vendorWebsite"
                  value={formData.vendorWebsite}
                  onChange={handleInputChange}
                  placeholder={t('register.vendorWebsitePlaceholder')}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              {t('register.submitButton')}
            </button>

            {/* Login Link */}
            <div className="login-link">
              <p>{t('register.hasAccount')} <Link to="/login">{t('register.login')}</Link></p>
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

export default Register;
