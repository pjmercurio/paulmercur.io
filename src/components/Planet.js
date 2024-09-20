// src/components/Planet.js
import React from 'react';
import './Planet.css';

const Planet = ({ title, image, link, style, extraClasses, onMouseEnter, onMouseLeave }) => {
    const className = `planet${extraClasses ? ` ${extraClasses}` : ''}`;
    return (
        <a href={link} className={className} style={style} target="_blank" rel="noopener noreferrer" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        </a>
    );
};

export default Planet;
