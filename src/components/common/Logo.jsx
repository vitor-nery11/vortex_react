import React from 'react';

export default function Logo({ size = 'md', variant = 'dark', showText = true, className = '', onClick }) {
  // size variants
  const sizeClasses = {
    xs: { icon: 'w-6 h-6', text: 'text-lg', subtext: 'text-[9px]' },
    sm: { icon: 'w-8 h-8', text: 'text-xl', subtext: 'text-[10px]' },
    md: { icon: 'w-10 h-10', text: 'text-2xl', subtext: 'text-xs' },
    lg: { icon: 'w-14 h-14', text: 'text-3xl', subtext: 'text-sm' },
    xl: { icon: 'w-20 h-20', text: 'text-4xl', subtext: 'text-base' },
  }[size] || { icon: 'w-10 h-10', text: 'text-2xl', subtext: 'text-xs' };

  const isLightBackground = variant === 'light';

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Exact stylized geometric Vortex V Icon */}
      <div className="relative flex items-center justify-center">
        <svg 
          className={`${sizeClasses.icon} transform transition-transform hover:scale-105 duration-300 drop-shadow-sm`} 
          viewBox="0 0 100 90" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left orange polygon loop */}
          <path 
            d="M26 6L6 38L38 84H56L24 38L40 6H26Z" 
            fill="#ED3E1A" 
          />
          {/* Right triangle wing */}
          <path 
            d="M48 6L88 6L64 42L48 6Z" 
            fill="#ED3E1A" 
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span 
            className={`font-extrabold tracking-[0.22em] uppercase transition-colors ${
              isLightBackground ? 'text-vortex-navy-900' : 'text-white'
            } ${sizeClasses.text}`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            VORTEX
          </span>
        </div>
      )}
    </div>
  );
}
