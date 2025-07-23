import React from 'react';
import './statCard.css';

const StatCards = ({ title, details, icon }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {/* <img
          src={icon}
          alt="icon"
          className="card-icon"
        /> */}
      </div>
      <div className="card-details">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="detail-row">
            <span className="detail-key">{key.replace(/([A-Z])/g, ' $1')}:</span>
            <span className="detail-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCards;
