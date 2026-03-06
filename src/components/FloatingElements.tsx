'use client';

import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 4,
  x = 10,
  y = 15,
  className = '',
}: FloatingElementProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [-y, y, -y],
        x: [-x / 2, x / 2, -x / 2],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

export function Star({ className = '', size = 20, color = '#FCD34D' }: { className?: string; size?: number; color?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <polygon
        points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9"
        fill={color}
      />
    </motion.svg>
  );
}

export function MusicNote({ className = '', size = 20, color = '#93C5FD' }: { className?: string; size?: number; color?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      animate={{ rotate: [-10, 10, -10] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <path
        d="M9 18V5l12-2v13"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="18" r="3" fill={color} />
      <circle cx="18" cy="16" r="3" fill={color} />
    </motion.svg>
  );
}

export function CricketBall({ className = '', size = 22 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    >
      <circle cx="12" cy="12" r="10" fill="#DC2626" />
      <path
        d="M7 5 Q12 12 7 19"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      <path
        d="M17 5 Q12 12 17 19"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
    </motion.svg>
  );
}

export function Sparkle({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12">
        <path
          d="M6 0 L7 4.5 L12 6 L7 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z"
          fill="#FCD34D"
        />
      </svg>
    </motion.div>
  );
}

// ---- Boy-themed elements ----

export function PawPrint({ className = '', size = 28, color = '#3B82F6' }: { className?: string; size?: number; color?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    >
      {/* Main pad */}
      <ellipse cx="16" cy="20" rx="7" ry="6" fill={color} />
      {/* Toe pads */}
      <ellipse cx="9" cy="12" rx="3.5" ry="4" fill={color} transform="rotate(-15 9 12)" />
      <ellipse cx="16" cy="9" rx="3.5" ry="4" fill={color} />
      <ellipse cx="23" cy="12" rx="3.5" ry="4" fill={color} transform="rotate(15 23 12)" />
      <ellipse cx="24" cy="19" rx="3" ry="3.5" fill={color} transform="rotate(30 24 19)" />
    </motion.svg>
  );
}

export function PawShield({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      animate={{ rotate: [-3, 3, -3], scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {/* Shield shape */}
      <path
        d="M24 4 L40 12 L40 28 Q40 40 24 46 Q8 40 8 28 L8 12 Z"
        fill="#2563EB"
        stroke="#1D4ED8"
        strokeWidth="1.5"
      />
      {/* Shield highlight */}
      <path
        d="M24 6 L38 13 L38 28 Q38 38 24 44"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
      {/* Paw inside shield */}
      <ellipse cx="24" cy="28" rx="5.5" ry="5" fill="white" />
      <ellipse cx="18.5" cy="21" rx="2.8" ry="3.2" fill="white" transform="rotate(-12 18.5 21)" />
      <ellipse cx="24" cy="18.5" rx="2.8" ry="3.2" fill="white" />
      <ellipse cx="29.5" cy="21" rx="2.8" ry="3.2" fill="white" transform="rotate(12 29.5 21)" />
      {/* Star on shield top */}
      <polygon points="24,8 25.5,12 29,12 26,14.5 27.5,18 24,16 20.5,18 22,14.5 19,12 22.5,12" fill="#FCD34D" />
    </motion.svg>
  );
}

export function RaceCar({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 56 30"
      className={className}
    >
      {/* Car body */}
      <path
        d="M8 18 L12 10 Q16 6 22 6 L38 6 Q42 6 45 10 L50 18 Z"
        fill="#EF4444"
      />
      {/* Windshield */}
      <path d="M18 10 L22 6 L34 6 L30 10 Z" fill="#93C5FD" opacity="0.7" />
      {/* Car bottom */}
      <rect x="4" y="18" width="48" height="6" rx="2" fill="#DC2626" />
      {/* Speed stripe */}
      <rect x="14" y="12" width="18" height="2" rx="1" fill="white" opacity="0.8" />
      {/* Number */}
      <circle cx="38" cy="14" r="4" fill="white" />
      <text x="36.5" y="16.5" fontSize="6" fontWeight="bold" fill="#DC2626" fontFamily="sans-serif">7</text>
      {/* Wheels */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}>
        <circle cx="14" cy="24" r="5" fill="#1E293B" />
        <circle cx="14" cy="24" r="2.5" fill="#64748B" />
        <line x1="14" y1="20" x2="14" y2="22" stroke="#94A3B8" strokeWidth="0.8" />
        <line x1="14" y1="26" x2="14" y2="28" stroke="#94A3B8" strokeWidth="0.8" />
        <line x1="10" y1="24" x2="12" y2="24" stroke="#94A3B8" strokeWidth="0.8" />
        <line x1="16" y1="24" x2="18" y2="24" stroke="#94A3B8" strokeWidth="0.8" />
      </motion.g>
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}>
        <circle cx="42" cy="24" r="5" fill="#1E293B" />
        <circle cx="42" cy="24" r="2.5" fill="#64748B" />
        <line x1="42" y1="20" x2="42" y2="22" stroke="#94A3B8" strokeWidth="0.8" />
        <line x1="42" y1="26" x2="42" y2="28" stroke="#94A3B8" strokeWidth="0.8" />
        <line x1="38" y1="24" x2="40" y2="24" stroke="#94A3B8" strokeWidth="0.8" />
        <line x1="44" y1="24" x2="46" y2="24" stroke="#94A3B8" strokeWidth="0.8" />
      </motion.g>
      {/* Exhaust flame */}
      <motion.path
        d="M4 20 L0 19 L2 21 L-1 22 L4 22"
        fill="#F97316"
        opacity="0.7"
        animate={{ opacity: [0.4, 0.9, 0.4], scaleX: [0.8, 1.2, 0.8] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
    </motion.svg>
  );
}

export function LightningBolt({ className = '', size = 24, color = '#FBBF24' }: { className?: string; size?: number; color?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <polygon
        points="13,2 5,14 11,14 9,22 19,10 13,10"
        fill={color}
        stroke="#F59E0B"
        strokeWidth="0.5"
      />
      {/* Glow */}
      <polygon
        points="13,2 5,14 11,14 9,22 19,10 13,10"
        fill={color}
        opacity="0.3"
        transform="scale(1.1) translate(-1.2, -1.2)"
      />
    </motion.svg>
  );
}

export function DogBone({ className = '', size = 28, color = '#E5E7EB' }: { className?: string; size?: number; color?: string }) {
  return (
    <motion.svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 40 20"
      className={className}
      animate={{ rotate: [-15, 15, -15] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {/* Bone shape */}
      <rect x="10" y="7" width="20" height="6" rx="2" fill={color} />
      <circle cx="10" cy="6" r="4" fill={color} />
      <circle cx="10" cy="14" r="4" fill={color} />
      <circle cx="30" cy="6" r="4" fill={color} />
      <circle cx="30" cy="14" r="4" fill={color} />
      {/* Highlight */}
      <path d="M12 8 L28 8" stroke="white" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </motion.svg>
  );
}

export function SpeedLines({ className = '' }: { className?: string }) {
  return (
    <motion.div className={`absolute ${className}`}>
      <motion.svg
        width="40"
        height="20"
        viewBox="0 0 40 20"
        animate={{ opacity: [0.2, 0.7, 0.2], x: [-5, 5, -5] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <line x1="0" y1="5" x2="25" y2="5" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="5" y1="10" x2="35" y2="10" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
        <line x1="2" y1="15" x2="20" y2="15" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  );
}

export function Gamepad({ className = '', size = 30 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 40 28"
      className={className}
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    >
      {/* Controller body */}
      <path
        d="M8 8 Q8 4 14 4 L26 4 Q32 4 32 8 L34 20 Q34 26 28 26 L24 26 Q22 26 20 22 Q18 26 16 26 L12 26 Q6 26 6 20 Z"
        fill="#1E293B"
        stroke="#334155"
        strokeWidth="1"
      />
      {/* D-pad */}
      <rect x="11" y="10" width="3" height="9" rx="1" fill="#475569" />
      <rect x="8" y="13" width="9" height="3" rx="1" fill="#475569" />
      {/* Buttons */}
      <circle cx="27" cy="10" r="2" fill="#EF4444" />
      <circle cx="31" cy="14" r="2" fill="#3B82F6" />
      <circle cx="27" cy="18" r="2" fill="#22C55E" />
      <circle cx="23" cy="14" r="2" fill="#FBBF24" />
      {/* Center button */}
      <circle cx="20" cy="12" r="1.5" fill="#64748B" />
    </motion.svg>
  );
}

export function Rocket({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      animate={{ y: [-3, 3, -3], rotate: [-5, 5, -5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* Rocket body */}
      <path d="M16 4 Q12 10 12 18 L20 18 Q20 10 16 4 Z" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.5" />
      {/* Nose cone */}
      <path d="M16 4 Q14 8 13 10 L19 10 Q18 8 16 4 Z" fill="#EF4444" />
      {/* Window */}
      <circle cx="16" cy="14" r="2.5" fill="#60A5FA" stroke="#3B82F6" strokeWidth="0.5" />
      <circle cx="15.5" cy="13.5" r="1" fill="rgba(255,255,255,0.4)" />
      {/* Fins */}
      <path d="M12 16 L8 22 L12 20 Z" fill="#EF4444" />
      <path d="M20 16 L24 22 L20 20 Z" fill="#EF4444" />
      {/* Flame */}
      <motion.g
        animate={{ scaleY: [0.8, 1.3, 0.8], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 0.4, repeat: Infinity }}
        style={{ transformOrigin: '16px 18px' }}
      >
        <path d="M13 18 L16 28 L19 18 Z" fill="#F97316" />
        <path d="M14 18 L16 25 L18 18 Z" fill="#FBBF24" />
      </motion.g>
    </motion.svg>
  );
}
