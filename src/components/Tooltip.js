// src/components/Tooltip.js
import React from 'react';
import './Tooltip.css';

const Tooltip = ({ visible, content, position }) => {
    return (
        <div className="tooltip" style={{
            left: position.x,
            top: position.y,
            opacity: `${visible ? 1 : 0}`,
        }}>
            {content}
        </div>
    );
  };

export default Tooltip;