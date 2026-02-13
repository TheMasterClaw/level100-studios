import React from 'react';
import './Avatar.css';

/**
 * Avatar Component - Abstract geometric avatar for MasterClaw
 * 
 * @param {string} state - 'idle' | 'listening' | 'thinking' | 'speaking'
 * @param {string} size - 'small' | 'medium' | 'large'
 */
export default function Avatar({ state = 'idle', size = 'medium' }) {
  const sizeClasses = {
    small: { width: 60, height: 60 },
    medium: { width: 120, height: 120 },
    large: { width: 200, height: 200 },
  };

  const { width, height } = sizeClasses[size];

  return (
    <div className={`l100-avatar l100-avatar--${state} l100-avatar--${size}`}>
      <svg viewBox="0 0 200 200" style={{ width, height }}>
        <defs>
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Core */}
        <circle
          cx="100"
          cy="100"
          r="40"
          className="l100-avatar__core"
          fill="url(#coreGradient)"
          filter="url(#glow)"
        />

        {/* Orbiting nodes */}
        <g className="l100-avatar__nodes">
          <circle cx="100" cy="50" r="10" className="l100-avatar__node" />
          <circle cx="150" cy="100" r="10" className="l100-avatar__node" />
          <circle cx="100" cy="150" r="10" className="l100-avatar__node" />
          <circle cx="50" cy="100" r="10" className="l100-avatar__node" />
        </g>

        {/* Connections */}
        <g className="l100-avatar__connections">
          <line x1="100" y1="65" x2="100" y2="50" />
          <line x1="128" y1="128" x2="150" y2="100" />
          <line x1="100" y1="135" x2="100" y2="150" />
          <line x1="72" y1="72" x2="50" y2="100" />
        </g>
      </svg>
    </div>
  );
}
