import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'h-6 sm:h-7',
    md: 'h-7 sm:h-8',
    lg: 'h-9 sm:h-10',
    xl: 'h-12 sm:h-14',
  };

  const heightClass = sizeMap[size];

  return (
    <div 
      className={`inline-flex items-center select-none ${className}`} 
      id="veloic-brand-logo"
      title="Veloic"
    >
      {/* Exact uploaded logo image rendered directly */}
      <img
        src="/veloic_logo_transparent.png"
        alt="VELOIC"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback to cropped JPG if PNG fails
          const target = e.currentTarget;
          if (!target.src.includes('veloic_logo_cropped.jpg')) {
            target.src = '/veloic_logo_cropped.jpg';
          }
        }}
        className={`${heightClass} w-auto object-contain transition-transform duration-200 hover:scale-[1.02]`}
      />
    </div>
  );
};

