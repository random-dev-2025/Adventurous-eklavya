'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#who-am-i' },
  { label: 'Interests', href: '#what-i-love' },
  { label: 'Superpowers', href: '#superpowers' },
  { label: 'Travels', href: '#travel-map' },
  { label: 'Cricket', href: '#cricket-game' },
  { label: 'Gallery', href: '#gallery' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 shadow-lg shadow-blue-100/50 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <button
            onClick={() => handleNav('#home')}
            className="flex items-center gap-2 text-lg font-bold"
          >
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-amber-100 to-orange-100 shadow-md ring-2 ring-blue-400/50">
              <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                {/* Face */}
                <circle cx="24" cy="27" r="14" fill="#D4A574" />
                {/* Ears */}
                <circle cx="10" cy="27" r="3" fill="#C4956A" />
                <circle cx="38" cy="27" r="3" fill="#C4956A" />
                {/* Hair peeking from under cap - short sides */}
                <path d="M10 22 Q10 18 13 16 L12 22 Z" fill="#1A1A2E" />
                <path d="M38 22 Q38 18 35 16 L36 22 Z" fill="#1A1A2E" />
                <path d="M11 24 Q10 20 14 18 L13 24 Z" fill="#1A1A2E" />
                {/* Hair fringe peeking from cap front */}
                <path d="M16 18 Q18 14 22 16 L20 19 Z" fill="#1A1A2E" />
                <path d="M19 17 Q22 13 25 15 L23 18 Z" fill="#2D2D4E" />
                {/* Sideways cap */}
                <path d="M8 18 Q8 8 24 6 Q40 8 40 18 L38 16 Q36 10 24 8 Q12 10 10 16 Z" fill="#2563EB" />
                {/* Cap panel lines */}
                <path d="M16 8 Q20 6 24 7" fill="none" stroke="#1D4ED8" strokeWidth="0.8" />
                <path d="M32 8 Q28 6 24 7" fill="none" stroke="#1D4ED8" strokeWidth="0.8" />
                {/* Cap brim - tilted to the side */}
                <path d="M6 18 Q4 16 2 17 Q0 18 2 20 Q4 21 8 20 L10 18 Z" fill="#1D4ED8" />
                <path d="M6 18 L10 18 Q8 17 6 18 Z" fill="#1E40AF" />
                {/* Cap button on top */}
                <circle cx="24" cy="7" r="1.5" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="0.5" />
                {/* Cap logo - small star */}
                <polygon points="7,18.5 7.5,17.5 8.5,17.5 7.8,18 8,19 7,18.5 6,19 6.2,18 5.5,17.5 6.5,17.5" fill="#FCD34D" />
                {/* Round glasses */}
                <circle cx="19" cy="26" r="5.5" fill="none" stroke="#3D2B1F" strokeWidth="1.8" />
                <circle cx="29" cy="26" r="5.5" fill="none" stroke="#3D2B1F" strokeWidth="1.8" />
                <path d="M24.5 26 Q24 24.5 23.5 26" fill="none" stroke="#3D2B1F" strokeWidth="1.2" />
                <line x1="13.5" y1="25" x2="10" y2="24" stroke="#3D2B1F" strokeWidth="1.2" />
                <line x1="34.5" y1="25" x2="38" y2="24" stroke="#3D2B1F" strokeWidth="1.2" />
                {/* Eyes behind glasses */}
                <circle cx="19" cy="26" r="2" fill="#1A1A2E" />
                <circle cx="29" cy="26" r="2" fill="#1A1A2E" />
                <circle cx="18.3" cy="25.3" r="0.8" fill="white" />
                <circle cx="28.3" cy="25.3" r="0.8" fill="white" />
                {/* Friendly smile */}
                <path d="M20 33 Q24 37 28 33" fill="none" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />
                {/* Blush */}
                <circle cx="15" cy="31" r="2.5" fill="#FFB5B5" opacity="0.4" />
                <circle cx="33" cy="31" r="2.5" fill="#FFB5B5" opacity="0.4" />
                {/* Nose */}
                <path d="M23.5 29 Q24 30.5 24.5 29" fill="none" stroke="#B8865C" strokeWidth="1" strokeLinecap="round" />
                {/* Shirt collar peek */}
                <path d="M16 41 Q24 43 32 41" fill="#C0392B" stroke="#A93226" strokeWidth="0.5" />
                <path d="M20 41 Q24 39 28 41" fill="white" />
              </svg>
            </span>
            <span className={`hidden sm:inline ${scrolled ? 'text-blue-900' : 'text-white'}`}>
              Eklavya
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  scrolled
                    ? 'text-blue-700 hover:bg-blue-50/80 hover:text-blue-600'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <motion.div
                className={`h-0.5 w-6 rounded-full ${scrolled ? 'bg-blue-900' : 'bg-white'}`}
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.div
                className={`h-0.5 w-6 rounded-full ${scrolled ? 'bg-blue-900' : 'bg-white'}`}
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.div
                className={`h-0.5 w-6 rounded-full ${scrolled ? 'bg-blue-900' : 'bg-white'}`}
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-start justify-center bg-white/95 pt-20 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="rounded-2xl px-8 py-3 text-lg font-medium text-blue-800 transition-colors hover:bg-blue-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
