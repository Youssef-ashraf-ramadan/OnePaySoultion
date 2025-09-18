import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { t, setLanguage, getLanguage } from '../utils/i18n';
import { resetPassword, clearError, clearSuccess } from '../store/authSlice';
import { fetchSettings } from '../store/settingsSlice';
import './OTP.css';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, success } = useSelector((state) => state.auth);
  const { settings, loading: settingsLoading, error: settingsError } = useSelector((state) => state.settings);
  
  const [formData, setFormData] = useState({
    password: '',
    password_confirmation: ''
  });
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());
  
  const phone = location.state?.phone;

  useEffect(() => {
    // Fetch settings on component mount
    dispatch(fetchSettings());
    // مسح أي error موجود عند دخول الصفحة
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (!phone) {
      navigate('/forgot-password');
      return;
    }
  }, [phone, navigate]);

  useEffect(() => {
    if (success) {
      toast.success(getLanguage() === 'ar' ? 'تم تغيير كلمة المرور بنجاح!' : 'Password changed successfully!');
      navigate('/login');
      dispatch(clearSuccess());
    }
  }, [success, navigate, dispatch]);

  // عرض الأخطاء في toast
  useEffect(() => {
    if (error) {
      toast.error(error.message || (getLanguage() === 'ar' ? 'حدث خطأ' : 'An error occurred'));
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirmation) {
      toast.error(getLanguage() === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error(getLanguage() === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    dispatch(resetPassword({
      phone: phone,
      password: formData.password,
      password_confirmation: formData.password_confirmation
    }));
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCurrentLanguage(lang);
  };

  const isArabic = currentLanguage === 'ar';

  const brandingContent = (
    <div className="branding-content">
      <div className="logo-section">
        <h1 className="brand-name">OPS</h1>
        <p className="brand-subtitle">Online Pay Solution</p>
      </div>
      <div className="currency-background">
        <div className="currency-symbol">$</div>
        <div className="currency-symbol">€</div>
        <div className="currency-symbol">£</div>
        <div className="currency-symbol">¥</div>
        <div className="currency-symbol">₹</div>
        <div className="currency-symbol">₽</div>
        <div className="currency-symbol">₩</div>
        <div className="currency-symbol">₪</div>
        <div className="currency-symbol">₦</div>
        <div className="currency-symbol">₵</div>
        <div className="currency-symbol">₴</div>
        <div className="currency-symbol">₸</div>
        <div className="currency-symbol">₼</div>
        <div className="currency-symbol">₾</div>
        <div className="currency-symbol">₿</div>
      </div>
      <div className="slide-content">
        <h2 className="slide-title">
          {settingsLoading ? 'Loading...' : settings?.title || 'Welcome'}
        </h2>
      </div>
      <div className="description">
        <p className="slide-description">
          {settingsLoading ? 'Loading...' : settings?.desc || 'Secure payment solution'}
        </p>
      </div>
    </div>
  );

  const formContent = (
    <div className="form-card">
      <h2>{t('resetPassword.title')}</h2>
      <p style={{ fontSize: "1rem", color: "#666", marginBottom: "30px" }}>
        {t('resetPassword.subtitle')}
      </p>

      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label>{t('resetPassword.newPassword')}</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={t('resetPassword.newPasswordPlaceholder')}
            required
          />
        </div>

        <div className="form-group">
          <label>{t('resetPassword.confirmPassword')}</label>
          <input 
            type="password" 
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleInputChange}
            placeholder={t('resetPassword.confirmPasswordPlaceholder')}
            required
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? (getLanguage() === 'ar' ? 'جاري الحفظ...' : 'Saving...') : t('resetPassword.submitButton')}
        </button>
      </form>

      <div className="language-switcher">
        <label>
          <input 
            type="radio" 
            name="lang" 
            checked={currentLanguage === 'en'}
            onChange={() => handleLanguageChange('en')}
          />
          <span>English</span>
        </label>
        <label>
          <input 
            type="radio" 
            name="lang" 
            checked={currentLanguage === 'ar'}
            onChange={() => handleLanguageChange('ar')}
          />
          <span>العربية</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="otp-wrapper">
      <div className={`left-section ${isArabic ? 'rtl' : 'ltr'}`}>
        {brandingContent}
      </div>
      <div className={`right-section ${isArabic ? 'rtl' : 'ltr'}`}>
        {formContent}
      </div>
    </div>
  );
};

export default ResetPassword;
