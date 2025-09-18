import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { t, setLanguage, getLanguage } from '../utils/i18n';
import { fetchSettings } from '../store/settingsSlice';
import { forgotPassword, clearError, clearSuccess } from '../store/authSlice';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { settings, loading: settingsLoading, error: settingsError } = useSelector((state) => state.settings);
  const { loading: authLoading, error: authError, success } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    countryCode: '+20',
    phoneNumber: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());

  const countries = [
    { code: '+20', name: 'Egypt', country: 'egypt', flag: '🇪🇬' },
    { code: '+966', name: 'Saudi Arabia', country: 'saudi_arabia', flag: '🇸🇦' },
    { code: '+971', name: 'UAE', country: 'uae', flag: '🇦🇪' },
    { code: '+965', name: 'Kuwait', country: 'kuwait', flag: '🇰🇼' },
    { code: '+974', name: 'Qatar', country: 'qatar', flag: '🇶🇦' },
    { code: '+973', name: 'Bahrain', country: 'bahrain', flag: '🇧🇭' },
    { code: '+968', name: 'Oman', country: 'oman', flag: '🇴🇲' },
    { code: '+962', name: 'Jordan', country: 'jordan', flag: '🇯🇴' },
    { code: '+961', name: 'Lebanon', country: 'lebanon', flag: '🇱🇧' },
    { code: '+212', name: 'Morocco', country: 'morocco', flag: '🇲🇦' },
    { code: '+216', name: 'Tunisia', country: 'tunisia', flag: '🇹🇳' },
    { code: '+213', name: 'Algeria', country: 'algeria', flag: '🇩🇿' },
    { code: '+1', name: 'USA', country: 'usa', flag: '🇺🇸' },
    { code: '+44', name: 'UK', country: 'uk', flag: '🇬🇧' },
    { code: '+33', name: 'France', country: 'france', flag: '🇫🇷' },
    { code: '+49', name: 'Germany', country: 'germany', flag: '🇩🇪' },
    { code: '+39', name: 'Italy', country: 'italy', flag: '🇮🇹' },
    { code: '+34', name: 'Spain', country: 'spain', flag: '🇪🇸' },
    { code: '+90', name: 'Turkey', country: 'turkey', flag: '🇹🇷' },
    { code: '+91', name: 'India', country: 'india', flag: '🇮🇳' },
    { code: '+86', name: 'China', country: 'china', flag: '🇨🇳' },
    { code: '+81', name: 'Japan', country: 'japan', flag: '🇯🇵' },
    { code: '+82', name: 'South Korea', country: 'south_korea', flag: '🇰🇷' },
    { code: '+61', name: 'Australia', country: 'australia', flag: '🇦🇺' },
    { code: '+55', name: 'Brazil', country: 'brazil', flag: '🇧🇷' },
    { code: '+52', name: 'Mexico', country: 'mexico', flag: '🇲🇽' },
    { code: '+7', name: 'Russia', country: 'russia', flag: '🇷🇺' },
    { code: '+27', name: 'South Africa', country: 'south_africa', flag: '🇿🇦' },
    { code: '+234', name: 'Nigeria', country: 'nigeria', flag: '🇳🇬' },
    { code: '+254', name: 'Kenya', country: 'kenya', flag: '🇰🇪' }
  ];

  // Fetch settings on component mount
  useEffect(() => {
    dispatch(fetchSettings());
    // مسح أي error موجود عند دخول الصفحة
    dispatch(clearError());
  }, [dispatch]);

  // عرض الأخطاء في toast
  useEffect(() => {
    if (authError) {
      toast.error(authError.message || (getLanguage() === 'ar' ? 'حدث خطأ' : 'An error occurred'));
      // مسح الـ error بعد عرضه
      dispatch(clearError());
    }
  }, [authError, dispatch]);

  // Navigate to ForgetOtp page on successful forgot password
  useEffect(() => {
    console.log('Success state:', success);
    if (success) {
      console.log('Navigating to /forget-otp');
      toast.success(getLanguage() === 'ar' ? 'تم إرسال رمز التحقق إلى هاتفك' : 'Verification code sent to your phone');
      navigate('/forget-otp');
      // مسح الـ success بعد الـ navigation
      dispatch(clearSuccess());
    }
  }, [success, navigate, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format phone number
    const formattedPhone = `${formData.countryCode}${formData.phoneNumber}`;
    console.log('Dispatching forgotPassword with phone:', formattedPhone);
    
    dispatch(forgotPassword({ phone: formattedPhone }));
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCurrentLanguage(lang);
    setFormData({...formData});
    // إعادة جلب البيانات باللغة الجديدة
    dispatch(fetchSettings());
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
            <label>{t('forgotPassword.phone')}</label>
            <div className="phone-input-group">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className="country-select"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder={t('forgotPassword.phoneNumberPlaceholder')}
                className="phone-number-input"
                required
              />
            </div>
          </div>


          <button type="submit" className="submit-btn" disabled={authLoading}>
            {authLoading ? (getLanguage() === 'ar' ? 'جاري الإرسال...' : 'Sending...') : t('forgotPassword.submitButton')}
          </button>

          <div className="divider" data-text={t('forgotPassword.or')}></div>

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
          <p className="email-sent">{t('forgotPassword.phoneSent')} {`${formData.countryCode}${formData.phoneNumber}`}</p>
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
      {/* المحتوى - دائماً في الـ left-section */}
      <div className="left-section">
        <div className="branding-content">
          <div className="logo">
            <h1 className="logo-text">OPS</h1>
            <p className="logo-subtitle">Online Pay Solution</p>
          </div>
          <div className="main-headline">
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
        <div className="currency-background">
          € $ £ ₹ ¥ ₽
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
