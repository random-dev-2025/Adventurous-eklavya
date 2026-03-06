'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 via-sky-50 to-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated compass */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="mb-6"
          >
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="27" fill="white" stroke="#93C5FD" strokeWidth="3" />
              <circle cx="30" cy="30" r="22" fill="none" stroke="#DBEAFE" strokeWidth="1" />
              <polygon points="30,8 34,30 30,26 26,30" fill="#3B82F6" />
              <polygon points="30,52 34,30 30,34 26,30" fill="#CBD5E1" />
              <circle cx="30" cy="30" r="3" fill="#1E3A5F" />
            </svg>
          </motion.div>

          {/* Text */}
          <motion.p
            className="text-lg font-bold text-blue-900"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading Adventures...
          </motion.p>

          {/* Loading dots */}
          <div className="mt-4 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2.5 w-2.5 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
