import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { t, setLanguage, getLanguage } from '../utils/i18n';
import { verifyForgotPasswordOTP, resendForgotPasswordOTP, clearSuccess, clearResendSuccess } from '../store/authSlice';
import { fetchSettings } from '../store/settingsSlice';
import './OTP.css';

const ForgetOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, loading, error, success, resendSuccess } = useSelector((state) => state.auth);
  const { settings, loading: settingsLoading, error: settingsError } = useSelector((state) => state.settings);
  
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Fetch settings on component mount
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    // مسح الـ success و resendSuccess عند دخول الصفحة
    dispatch(clearSuccess());
    dispatch(clearResendSuccess());
    
    if (!phone) {
      navigate('/forgot-password');
      return;
    }

    // بدء العد التنازلي
    const newTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(newTimer);
          setTimer(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimer(newTimer);

    return () => {
      if (newTimer) {
        clearInterval(newTimer);
        setTimer(null);
      }
    };
  }, [phone, navigate, dispatch]);

  useEffect(() => {
    if (success) {
      // Navigate to reset password page
      navigate('/reset-password', { state: { phone } });
      // مسح الـ success بعد الاستخدام
      dispatch(clearSuccess());
    }
  }, [success, navigate, phone, dispatch]);

  useEffect(() => {
    if (resendSuccess) {
      toast.success(getLanguage() === 'ar' ? 'تم إرسال رمز التحقق مرة أخرى' : 'Verification code sent again');
      
      // مسح الـ timer القديم لو كان موجود
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
      
      setTimeLeft(60);
      setCanResend(false);
      setOtp(['', '', '', '', '']);
      dispatch(clearResendSuccess());
      
      // بدء العد التنازلي الجديد
      const newTimer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setCanResend(true);
            clearInterval(newTimer);
            setTimer(null);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      setTimer(newTimer);
    }
  }, [resendSuccess, dispatch, timer]);

  // تنظيف الـ timer عند unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    };
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // منع إدخال أكثر من رقم واحد
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // الانتقال للـ input التالي تلقائياً
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // مسح الـ input الحالي عند الضغط على Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    if (otpString.length !== 5) {
      toast.error(getLanguage() === 'ar' ? 'يرجى إدخال رمز التحقق كاملاً' : 'Please enter the complete verification code');
      return;
    }

    dispatch(verifyForgotPasswordOTP({
      phone: phone,
      token: otpString
    }));
  };

  const handleResend = () => {
    dispatch(resendForgotPasswordOTP({ phone }));
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
      <h2>{t('otp.title')}</h2>
      <p style={{ fontSize: "1rem", color: "#666", marginBottom: "30px" }}>
        {t('otp.subtitle')} {phone}
      </p>

      <form onSubmit={handleSubmit} className="otp-form">
        <div className="otp-inputs" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="otp-input"
              autoComplete="off"
            />
          ))}
        </div>

        {error && (
          <div className="error-message">
            {error.message || (getLanguage() === 'ar' ? 'حدث خطأ' : 'An error occurred')}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (getLanguage() === 'ar' ? 'جاري التحقق...' : 'Verifying...') : t('otp.verify')}
        </button>
      </form>

      <div className="resend-section">
        {canResend ? (
          <button onClick={handleResend} className="resend-btn">
            {t('otp.resend')}
          </button>
        ) : (
          <p className="countdown-text">
            {t('otp.resendIn')} {timeLeft}s
          </p>
        )}
      </div>

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

export default ForgetOtp;
