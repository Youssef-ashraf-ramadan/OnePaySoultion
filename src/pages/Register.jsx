import React, { useState } from 'react';
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

  const countries = [
    { code: 'SA', name: 'السعودية', flag: '🇸🇦' },
    { code: 'AE', name: 'الإمارات', flag: '🇦🇪' },
    { code: 'KW', name: 'الكويت', flag: '🇰🇼' },
    { code: 'QA', name: 'قطر', flag: '🇶🇦' },
    { code: 'BH', name: 'البحرين', flag: '🇧🇭' },
    { code: 'OM', name: 'عمان', flag: '🇴🇲' },
    { code: 'JO', name: 'الأردن', flag: '🇯🇴' },
    { code: 'LB', name: 'لبنان', flag: '🇱🇧' },
    { code: 'EG', name: 'مصر', flag: '🇪🇬' },
    { code: 'MA', name: 'المغرب', flag: '🇲🇦' },
    { code: 'TN', name: 'تونس', flag: '🇹🇳' },
    { code: 'DZ', name: 'الجزائر', flag: '🇩🇿' }
  ];

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
    alert('تم إرسال البيانات بنجاح!');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Left Side - Form Section */}
        <div className="form-section">
          <div className="form-header">
            <h2>سجل معلوماتك معنا</h2>
            <p>املأ البيانات التالية للبدء</p>
          </div>
          
          <form onSubmit={handleSubmit} className="register-form">
            {/* Name and Email Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">الاسم الكامل</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="example@email.com"
                />
              </div>
            </div>

            {/* Password and Phone Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">كلمة المرور</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="أدخل كلمة المرور"
                  minLength="6"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">رقم الهاتف</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+966 50 123 4567"
                />
              </div>
            </div>

            {/* Country and Website Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country">البلد</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">اختر البلد</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="vendorWebsite">موقع البائع</label>
                <input
                  type="url"
                  id="vendorWebsite"
                  name="vendorWebsite"
                  value={formData.vendorWebsite}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              سجل معلوماتك
            </button>
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
