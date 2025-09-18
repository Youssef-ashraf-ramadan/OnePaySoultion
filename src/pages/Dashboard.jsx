import React from 'react';
import { useSelector } from 'react-redux';
import { t, getLanguage } from '../utils/i18n';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
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
            
            {user && (
              <div className="user-info">
                <h3>{t('dashboard.userInfo')}</h3>
                <p><strong>{t('dashboard.phone')}:</strong> {user.phone || 'N/A'}</p>
                <p><strong>{t('dashboard.email')}:</strong> {user.email || 'N/A'}</p>
                <p><strong>{t('dashboard.name')}:</strong> {user.name || 'N/A'}</p>
              </div>
            )}
          </div>

          <div className="dashboard-actions">
            <button className="action-btn primary">
              {t('dashboard.getStarted')}
            </button>
            <button className="action-btn secondary">
              {t('dashboard.viewProfile')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
