// src/components/CenterImage.js
import React from 'react';
import './CenterImage.css';

const CenterImage = ({ onClick }) => {
  return (
    <div className="center-image" onClick={onClick}>
      <div className="glass-orb">
        <img src={`${process.env.PUBLIC_URL}/images/Profile-13-Square.webp`} alt="Paul Mercurio" />
      </div>
    </div>
  );
};

export default CenterImage;
