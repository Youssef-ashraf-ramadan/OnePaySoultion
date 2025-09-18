import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { t, setLanguage, getLanguage } from '../utils/i18n';
import { fetchSettings } from '../store/settingsSlice';
import { loginUser, clearNeedsVerification } from '../store/authSlice';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { settings, loading: settingsLoading, error: settingsError } = useSelector((state) => state.settings);
  const { loading: authLoading, error: authError, success, needsVerification } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    countryCode: '+20',
    phoneNumber: '',
    password: ''
  });
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
    // مسح needsVerification عند دخول الصفحة
    dispatch(clearNeedsVerification());
  }, [dispatch]);

  // Navigate to OTP page on successful login or if needs verification
  useEffect(() => {
    if (success) {
      if (needsVerification) {
        // إذا كان الكود 415، معناه المستخدم محتاج يفعل حسابه
        toast.success(getLanguage() === 'ar' ? 'يرجى تفعيل حسابك أولاً' : 'Please verify your account first');
        navigate('/otp');
        dispatch(clearNeedsVerification());
      } else {
        // تسجيل دخول عادي
        navigate('/otp');
      }
    }
  }, [success, needsVerification, navigate, dispatch]);

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
    
    dispatch(loginUser({
      phone: formattedPhone,
      password: formData.password
    }));
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
        {t('login.subtitle')}
      </p>
      <h2>{t('login.title')}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('login.phone')}</label>
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
              placeholder={t('login.phoneNumberPlaceholder')}
              className="phone-number-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>{t('login.password')}</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={t('login.passwordPlaceholder')} 
            required
          />
        </div>

        {authError && (
          <div className="error-message">
            {authError.message || (getLanguage() === 'ar' ? 'حدث خطأ' : 'An error occurred')}
          </div>
        )}

        <div className="form-options">
          <Link to="/forgot-password" className="forgot-password">
            {t('login.forgotPassword')}
          </Link>
        </div>

        <button type="submit" className="submit-btn" disabled={authLoading}>
          {authLoading ? (getLanguage() === 'ar' ? 'جاري تسجيل الدخول...' : 'Logging in...') : t('login.submitButton')}
        </button>
      </form>

      <div className="divider" data-text={t('login.or')}></div>

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

export default Login;
