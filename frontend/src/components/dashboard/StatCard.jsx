import React from 'react';

const StatCard = ({ type, title, value, trend, trendType, badge, footer }) => {
  // Map type to icons and classes
  const getIcon = () => {
    switch(type) {
      case 'students':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
      case 'courses':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;
      case 'earnings':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>;
      default:
        return null;
    }
  };

  const isEarnings = type === 'earnings';

  return (
    <div className={`stat-card ${isEarnings ? 'stat-card-highlight' : ''}`}>
      {isEarnings && (
        <div className="bg-watermark">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
      )}
      
      <div className="stat-header">
        <div className={`stat-icon stat-icon-${type}`}>
          {getIcon()}
        </div>
        
        {trend && (
          <div className={`stat-trend trend-${trendType}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
            {trend}
          </div>
        )}
        
        {badge && (
          <div className="stat-badge">
            {badge}
          </div>
        )}
      </div>
      
      <div className="stat-body">
        <h3 className="stat-title">{title}</h3>
        <div className="stat-value">{value}</div>
      </div>
      
      <div className="stat-footer">
        {footer}
      </div>
    </div>
  );
};

export default StatCard;
