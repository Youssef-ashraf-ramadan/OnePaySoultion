import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { t, setLanguage, getLanguage } from '../utils/i18n';
import { fetchSettings } from '../store/settingsSlice';
import { registerUser, clearSuccess, clearError } from '../store/authSlice';
import './Register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { settings, loading: settingsLoading, error: settingsError } = useSelector((state) => state.settings);
  const { loading: authLoading, error: authError, success } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+20',
    phoneNumber: '',
    cuntry: 'egypt',
    password: '',
    password_confirmation: '',
    birth_date: '',
    image: null,
    location: ''
  });
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());

  // قائمة الدول مع الأعلام
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

  // Navigate to OTP page on successful registration
  useEffect(() => {
    if (success) {
      // إظهار رسالة نجاح التسجيل
      toast.success(getLanguage() === 'ar' ? 'تم التسجيل بنجاح! تم إرسال رمز التحقق إلى هاتفك.' : 'Registration successful! Verification code sent to your phone.');
      navigate('/otp');
      // مسح الـ success بعد الاستخدام
      dispatch(clearSuccess());
    }
  }, [success, navigate, dispatch]);

  // عرض الأخطاء في toast
  useEffect(() => {
    if (authError) {
      toast.error(authError.message || (getLanguage() === 'ar' ? 'حدث خطأ' : 'An error occurred'));
      // مسح الـ error بعد عرضه
      dispatch(clearError());
    }
  }, [authError, dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (name === 'countryCode') {
      // تحديث كود الدولة والدولة المقابلة
      const selectedCountry = countries.find(country => country.code === value);
      setFormData(prev => ({
        ...prev,
        countryCode: value,
        cuntry: selectedCountry ? selectedCountry.country : 'egypt'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'file' ? files[0] : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.password_confirmation) {
      alert(getLanguage() === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert(getLanguage() === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    // Format phone number (combine country code + phone number)
    const formattedPhone = `${formData.countryCode}${formData.phoneNumber}`;
    
    // Format birth date (DD-MM-YYYY)
    const formattedBirthDate = formData.birth_date;

    // إنشاء FormData للـ multipart/form-data
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formattedPhone);
    submitData.append('cuntry', formData.cuntry);
    submitData.append('password', formData.password);
    submitData.append('password_confirmation', formData.password_confirmation);
    submitData.append('birth_date', formattedBirthDate);
    submitData.append('location', formData.location);
    
    // إضافة الصورة إذا كانت موجودة
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    dispatch(registerUser(submitData));
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCurrentLanguage(lang);
    setFormData({ ...formData });
    // إعادة جلب البيانات باللغة الجديدة
    dispatch(fetchSettings());
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
            required
          />
        </div>

        <div className="form-group col-12">
          <label>{t('register.email')}</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t('register.emailPlaceholder')}
            required
          />
        </div>

        <div className="form-group col-12">
          <label>{t('register.phone')}</label>
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
              placeholder={t('register.phoneNumberPlaceholder')}
              className="phone-number-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>{t('register.birthDate')}</label>
          <input 
            type="date" 
            name="birth_date"
            value={formData.birth_date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group col-12">
          <label>{t('register.country')}</label>
          <select 
            name="cuntry"
            value={formData.cuntry}
            onChange={handleInputChange}
            className="country-select-full"
            required
          >
            {countries.map((country) => (
              <option key={country.country} value={country.country}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t('register.password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={t('register.passwordPlaceholder')}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('register.confirmPassword')}</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              placeholder={t('register.confirmPasswordPlaceholder')}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>{t('register.image')}</label>
          <input 
            type="file" 
            name="image"
            onChange={handleInputChange}
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <label>{t('register.vendorWebsite')}</label>
          <input 
            type="url" 
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder={t('register.vendorWebsitePlaceholder')}
          />
        </div>


        <button type="submit" className="submit-btn" disabled={authLoading}>
          {authLoading ? (getLanguage() === 'ar' ? 'جاري التسجيل...' : 'Registering...') : t('register.submitButton')}
        </button>
      </form>

      <div className="divider" data-text={t('register.or')}></div>

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
      {/* المحتوى - دائماً في الـ left-section */}
      <div className="left-section">
        {brandingContent}
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

export default Register;
