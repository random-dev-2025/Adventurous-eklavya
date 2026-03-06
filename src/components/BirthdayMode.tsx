'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { isBirthdayMode } from '@/lib/birthday';

function Balloon({ delay, x, color }: { delay: number; x: number; color: string }) {
  return (
    <motion.div
      className="pointer-events-none fixed z-[60]"
      style={{ left: `${x}%` }}
      initial={{ bottom: -100, opacity: 0 }}
      animate={{ bottom: '110vh', opacity: [0, 1, 1, 0.8, 0] }}
      transition={{ duration: 8 + Math.random() * 4, delay, ease: 'easeOut' }}
    >
      <svg width="36" height="50" viewBox="0 0 36 50">
        <ellipse cx="18" cy="18" rx="16" ry="18" fill={color} opacity="0.85" />
        <ellipse cx="18" cy="18" rx="10" ry="14" fill="white" opacity="0.15" />
        <polygon points="14,35 18,38 22,35 18,36" fill={color} />
        <line x1="18" y1="38" x2="18" y2="50" stroke={color} strokeWidth="1" opacity="0.6" />
      </svg>
    </motion.div>
  );
}

function Confetti({ delay, x }: { delay: number; x: number }) {
  const colors = ['#3B82F6', '#60A5FA', '#FCD34D', '#93C5FD', '#38BDF8', '#BFDBFE'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = 6 + Math.random() * 6;

  return (
    <motion.div
      className="pointer-events-none fixed z-[60]"
      style={{ left: `${x}%`, top: -20 }}
      initial={{ y: 0, rotate: 0, opacity: 1 }}
      animate={{
        y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900,
        rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
        x: (Math.random() - 0.5) * 200,
        opacity: [1, 1, 0],
      }}
      transition={{ duration: 4 + Math.random() * 3, delay, ease: 'easeIn' }}
    >
      <div
        style={{
          width: size,
          height: size * 0.6,
          backgroundColor: color,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        }}
      />
    </motion.div>
  );
}

export default function BirthdayMode() {
  const [isBirthday, setIsBirthday] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    setIsBirthday(isBirthdayMode());
  }, []);

  if (!isBirthday) return null;

  const balloonColors = ['#3B82F6', '#60A5FA', '#38BDF8', '#93C5FD', '#FCD34D', '#6366F1'];

  return (
    <>
      {/* Balloons */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Balloon
          key={`balloon-${i}`}
          delay={i * 0.8}
          x={5 + i * 12 + Math.random() * 5}
          color={balloonColors[i % balloonColors.length]}
        />
      ))}

      {/* Confetti burst */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Confetti key={`confetti-${i}`} delay={0.5 + i * 0.1} x={Math.random() * 100} />
      ))}

      {/* Birthday banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="fixed left-0 right-0 top-16 z-[55] flex justify-center px-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, delay: 1 }}
          >
            <div className="relative flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 text-white shadow-xl shadow-blue-300/40">
              <span className="text-2xl">🎂</span>
              <div>
                <p className="text-sm font-bold sm:text-base">
                  Happy Birthday, Eklavya! 🎉
                </p>
                <p className="text-xs opacity-80">
                  Today is a very special adventure day!
                </p>
              </div>
              <span className="text-2xl">🎈</span>
              <button
                onClick={() => setShowBanner(false)}
                className="ml-2 rounded-full p-1 text-white/70 hover:bg-white/20 hover:text-white"
                aria-label="Close banner"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Export for use in Avatar component - birthday hat overlay
export function BirthdayHat({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <g>
      <polygon points="100,38 88,65 112,65" fill="#FCD34D" />
      <circle cx="100" cy="38" r="4" fill="#EF4444" />
      <rect x="88" y="63" width="24" height="5" rx="2" fill="#FCD34D" />
      <circle cx="92" cy="65" r="2" fill="#3B82F6" />
      <circle cx="100" cy="65" r="2" fill="#EF4444" />
      <circle cx="108" cy="65" r="2" fill="#3B82F6" />
    </g>
  );
}
