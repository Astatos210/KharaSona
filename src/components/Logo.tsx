import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showTagline?: boolean;
  className?: string;
  theme?: 'dark' | 'light';
}

export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 ${className}`}
      aria-label="KharaSona Logo Symbol"
      role="img"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4C95D" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA8C2C" />
        </linearGradient>
        <linearGradient id="innerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E2D4A" />
          <stop offset="100%" stopColor="#0B1220" />
        </linearGradient>
      </defs>

      {/* Outer Coin / Precision Lens Rim */}
      <circle
        cx="24"
        cy="24"
        r="22"
        fill="url(#innerGlow)"
        stroke="url(#goldGradient)"
        strokeWidth="2.5"
      />

      {/* Internal Calibration Reticle / Outer Orbit */}
      <circle
        cx="24"
        cy="24"
        r="18.5"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="2 3"
      />

      {/* Geometric Analytical Eye / Focus Aperture */}
      <path
        d="M13 24C16.8 17.8 31.2 17.8 35 24C31.2 30.2 16.8 30.2 13 24Z"
        stroke="url(#goldGradient)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Precision Lens Core / Iris */}
      <circle
        cx="24"
        cy="24"
        r="3.5"
        fill="#0B1220"
        stroke="url(#goldGradient)"
        strokeWidth="1.6"
      />
      <circle cx="24" cy="24" r="1.6" fill="#F4C95D" />

      {/* Upward Analytical Price Trend Trajectory */}
      <path
        d="M15 27.5L21.5 22.5L26.5 25L33 17"
        stroke="#F4C95D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Target Marker Accent */}
      <polyline
        points="29.5 17 33 17 33 20.5"
        stroke="#F4C95D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showWordmark = true,
  showTagline = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 26, text: 'text-lg', subtext: 'text-[10px]' },
    md: { icon: 34, text: 'text-xl', subtext: 'text-xs' },
    lg: { icon: 42, text: 'text-2xl', subtext: 'text-sm' },
    xl: { icon: 54, text: 'text-3xl', subtext: 'text-base' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <LogoIcon size={currentSize.icon} />

      {showWordmark && (
        <div className="flex flex-col">
          <div className={`font-bold tracking-tight leading-none ${currentSize.text}`}>
            <span className="text-slate-100">Khara</span>
            <span className="text-gold bg-gradient-to-r from-gold-bright to-gold bg-clip-text text-transparent font-extrabold">
              Sona
            </span>
          </div>
          {showTagline && (
            <span
              className={`text-slate-400 font-medium tracking-wide mt-1 ${currentSize.subtext}`}
            >
              Same gold. Clearer prices.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
