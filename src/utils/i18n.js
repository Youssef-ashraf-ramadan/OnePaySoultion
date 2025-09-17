import arTranslations from '../locales/ar.json';
import enTranslations from '../locales/en.json';

const translations = {
  ar: arTranslations,
  en: enTranslations
};

let currentLanguage = 'ar';

export const setLanguage = (lang) => {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
};

export const getLanguage = () => currentLanguage;

export const t = (key) => {
  const keys = key.split('.');
  let value = translations[currentLanguage];
  
  for (const k of keys) {
    if (value && value[k]) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return value;
};

export const getCountries = () => {
  const countries = [
    { code: 'SA', flag: '🇸🇦' },
    { code: 'AE', flag: '🇦🇪' },
    { code: 'KW', flag: '🇰🇼' },
    { code: 'QA', flag: '🇶🇦' },
    { code: 'BH', flag: '🇧🇭' },
    { code: 'OM', flag: '🇴🇲' },
    { code: 'JO', flag: '🇯🇴' },
    { code: 'LB', flag: '🇱🇧' },
    { code: 'EG', flag: '🇪🇬' },
    { code: 'MA', flag: '🇲🇦' },
    { code: 'TN', flag: '🇹🇳' },
    { code: 'DZ', flag: '🇩🇿' }
  ];
  
  return countries.map(country => ({
    ...country,
    name: t(`countries.${country.code}`)
  }));
};
