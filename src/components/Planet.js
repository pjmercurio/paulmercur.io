// src/components/Planet.js
import React from 'react';
import './Planet.css';

const Planet = ({ link, style, extraClasses, onMouseEnter, onMouseLeave, onClick }) => {
    const className = `planet${extraClasses ? ` ${extraClasses}` : ''}`;

    if (onClick) {
        return (
            <div className={className} style={style} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            </div>
        );
    }

    return (
        <a href={link} className={className} style={style} target="_blank" rel="noopener noreferrer" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        </a>
    );
};

export default Planet;
