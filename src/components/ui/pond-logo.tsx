import React from 'react';

interface PondLogoProps {
  className?: string;
  size?: number;
  variant?: 'default' | 'simple' | 'animated';
}

export function PondLogo({ className = "", size = 40, variant = 'default' }: PondLogoProps) {
  const logoId = `logo-${Math.random().toString(36).substr(2, 9)}`;
  
  if (variant === 'simple') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`simpleGradient-${logoId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>
        
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill={`url(#simpleGradient-${logoId})`}
          stroke="#e2e8f0"
          strokeWidth="2"
        />
        
        {/* Inner circle background */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="#f8fafc"
        />
        
        {/* Simple fish shapes */}
        <g transform="translate(50, 50)">
          <path
            d="M -15 -8 Q -5 -12 8 -8 Q 12 -5 8 -2 Q -5 -4 -15 -8 Z"
            fill="#1e40af"
          />
          <path
            d="M -15 -8 L -20 -12 L -18 -8 L -20 -4 Z"
            fill="#1e40af"
          />
          <circle cx="2" cy="-6" r="1" fill="#f8fafc" />
        </g>
        
        <g transform="translate(50, 50) rotate(180)">
          <path
            d="M -15 -8 Q -5 -12 8 -8 Q 12 -5 8 -2 Q -5 -4 -15 -8 Z"
            fill="#3b82f6"
          />
          <path
            d="M -15 -8 L -20 -12 L -18 -8 L -20 -4 Z"
            fill="#3b82f6"
          />
          <circle cx="2" cy="-6" r="1" fill="#f8fafc" />
        </g>
      </svg>
    );
  }

  // Default variant - simplified without problematic filters
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`bgGradient-${logoId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
        <radialGradient id={`fishGradient1-${logoId}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </radialGradient>
        <radialGradient id={`fishGradient2-${logoId}`} cx="70%" cy="70%" r="70%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </radialGradient>
      </defs>
      
      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill={`url(#bgGradient-${logoId})`}
        stroke="#e2e8f0"
        strokeWidth="2"
      />
      
      {/* Inner circle background */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="#f8fafc"
        stroke="#cbd5e1"
        strokeWidth="1"
      />
      
      {/* Top fish (swimming right) */}
      <g transform="translate(50, 50)">
        <path
          d="M -15 -8 Q -5 -12 8 -8 Q 12 -5 8 -2 Q -5 -4 -15 -8 Z"
          fill={`url(#fishGradient1-${logoId})`}
        />
        <path
          d="M -15 -8 L -22 -12 L -20 -8 L -22 -4 Z"
          fill={`url(#fishGradient1-${logoId})`}
        />
        <circle cx="2" cy="-6" r="1.5" fill="#f8fafc" />
        <circle cx="2.5" cy="-6" r="0.5" fill="#1e40af" />
      </g>
      
      {/* Bottom fish (swimming left) */}
      <g transform="translate(50, 50) rotate(180)">
        <path
          d="M -15 -8 Q -5 -12 8 -8 Q 12 -5 8 -2 Q -5 -4 -15 -8 Z"
          fill={`url(#fishGradient2-${logoId})`}
        />
        <path
          d="M -15 -8 L -22 -12 L -20 -8 L -22 -4 Z"
          fill={`url(#fishGradient2-${logoId})`}
        />
        <circle cx="2" cy="-6" r="1.5" fill="#f8fafc" />
        <circle cx="2.5" cy="-6" r="0.5" fill="#1e40af" />
      </g>
      
      {/* Decorative water ripples */}
      <circle cx="50" cy="50" r="32" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#60a5fa" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

export default PondLogo;