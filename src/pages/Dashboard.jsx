import React from 'react';
import { t, getLanguage } from '../utils/i18n';
import './Dashboard.css';

const Dashboard = () => {
  const currentLanguage = getLanguage();

  return (
    <div className="dashboard-wrapper" dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>{t('dashboard.welcome')}</h1>
          <p>{t('dashboard.subtitle')}</p>
        </div>

        <div className="dashboard-content">
          <div className="welcome-card">
            <h2>{t('dashboard.successTitle')}</h2>
            <p>{t('dashboard.successMessage')}</p>
          </div>

          <div className="dashboard-actions">
            <button className="action-btn primary">
              {t('dashboard.getStarted')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
