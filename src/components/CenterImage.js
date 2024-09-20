// src/components/CenterImage.js
import React from 'react';
import './CenterImage.css';

const CenterImage = () => {
  return (
    <div className="center-image">
      <div className="glass-orb">
        <img src={`${process.env.PUBLIC_URL}/images/profile-10-square.jpeg`} alt="Paul Mercurio" />
      </div>
    </div>
  );
};

export default CenterImage;
