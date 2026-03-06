'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionTitle } from './SectionWrapper';

const activities = [
  {
    title: 'Traveling',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 sm:h-14 sm:w-14">
        <motion.g animate={{ x: [-2, 2, -2], y: [-1, 1, -1] }} transition={{ duration: 3, repeat: Infinity }}>
          <path d="M24 4 L28 18 L42 18 L30 26 L34 40 L24 32 L14 40 L18 26 L6 18 L20 18 Z" fill="none" stroke="#60A5FA" strokeWidth="1" opacity="0.3" />
          <path d="M10 34 L38 14" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M36 12 L40 8 L42 12 L38 14 Z" fill="#3B82F6" />
          <circle cx="12" cy="33" r="3" fill="#60A5FA" opacity="0.5" />
          <circle cx="25" cy="23" r="2" fill="#60A5FA" opacity="0.4" />
        </motion.g>
      </svg>
    ),
    color: 'from-blue-400 to-sky-300',
    desc: 'Exploring amazing places!',
  },
  {
    title: 'Roller Skating',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 sm:h-14 sm:w-14">
        <rect x="10" y="20" width="28" height="10" rx="5" fill="#3B82F6" />
        <motion.circle cx="16" cy="35" r="4" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1.5" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
        <motion.circle cx="32" cy="35" r="4" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1.5" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
        <motion.circle cx="24" cy="35" r="4" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1.5" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
        <path d="M14 20 L14 14 Q14 10 18 10 L30 10 Q34 10 34 14 L34 20" fill="#93C5FD" />
      </svg>
    ),
    color: 'from-sky-400 to-cyan-300',
    desc: 'Zooming around super fast!',
  },
  {
    title: 'Playing Cricket',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 sm:h-14 sm:w-14">
        <rect x="20" y="4" width="5" height="30" rx="2" fill="#D97706" />
        <rect x="18" y="4" width="9" height="12" rx="2" fill="#F59E0B" />
        <motion.circle cx="36" cy="38" r="6" fill="#DC2626" animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
        </motion.circle>
        <path d="M33 35 Q36 38 33 41" fill="none" stroke="white" strokeWidth="1" />
        <path d="M39 35 Q36 38 39 41" fill="none" stroke="white" strokeWidth="1" />
      </svg>
    ),
    color: 'from-blue-500 to-blue-400',
    desc: 'Hitting sixes like a champ!',
  },
  {
    title: 'Dancing',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 sm:h-14 sm:w-14">
        <motion.g animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ originX: '24px', originY: '24px' }}>
          <circle cx="24" cy="10" r="5" fill="#3B82F6" />
          <line x1="24" y1="15" x2="24" y2="30" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="20" x2="16" y2="14" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="20" x2="34" y2="16" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="30" x2="18" y2="40" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="30" x2="32" y2="38" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        <motion.text x="6" y="12" fontSize="8" fill="#93C5FD" animate={{ opacity: [0, 1, 0], y: [-2, -8] }} transition={{ duration: 2, repeat: Infinity }}>&#10022;</motion.text>
        <motion.text x="36" y="10" fontSize="8" fill="#93C5FD" animate={{ opacity: [0, 1, 0], y: [-2, -8] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>&#10022;</motion.text>
      </svg>
    ),
    color: 'from-cyan-400 to-blue-400',
    desc: 'Moving to the rhythm!',
  },
  {
    title: 'Singing',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 sm:h-14 sm:w-14">
        <rect x="21" y="20" width="6" height="16" rx="3" fill="#6B7280" />
        <circle cx="24" cy="18" r="6" fill="#374151" />
        <circle cx="24" cy="18" r="4" fill="#6B7280" />
        <line x1="21" y1="36" x2="14" y2="42" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
        <line x1="27" y1="36" x2="34" y2="42" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="42" x2="34" y2="42" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
        <motion.text x="32" y="14" fontSize="12" fill="#60A5FA" animate={{ opacity: [0, 1, 0], y: [0, -8] }} transition={{ duration: 1.5, repeat: Infinity }}>&#9835;</motion.text>
        <motion.text x="8" y="18" fontSize="10" fill="#93C5FD" animate={{ opacity: [0, 1, 0], y: [0, -6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>&#9834;</motion.text>
      </svg>
    ),
    color: 'from-blue-400 to-indigo-400',
    desc: 'Singing my favorite songs!',
  },
  {
    title: 'Acting',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 sm:h-14 sm:w-14">
        <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          {/* Happy mask */}
          <circle cx="18" cy="22" r="12" fill="#3B82F6" />
          <circle cx="14" cy="19" r="2" fill="white" />
          <circle cx="22" cy="19" r="2" fill="white" />
          <path d="M13 26 Q18 32 23 26" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Sad mask */}
          <circle cx="32" cy="26" r="12" fill="#1E3A8A" />
          <circle cx="28" cy="23" r="2" fill="white" />
          <circle cx="36" cy="23" r="2" fill="white" />
          <path d="M27 31 Q32 26 37 31" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
        <motion.ellipse cx="24" cy="42" rx="20" ry="3" fill="#FCD34D" opacity="0.2" animate={{ rx: [20, 22, 20] }} transition={{ duration: 2, repeat: Infinity }} />
      </svg>
    ),
    color: 'from-indigo-400 to-blue-500',
    desc: 'Lights, camera, action!',
  },
];

export default function WhatILove() {
  return (
    <SectionWrapper id="what-i-love" bg="light">
      <SectionTitle subtitle="These are the things that make my heart happy!">
        What I Love
      </SectionTitle>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.title}
            className="group relative flex flex-col items-center rounded-3xl bg-white p-5 shadow-md transition-shadow hover:shadow-xl sm:p-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
          >
            {/* Gradient accent top */}
            <div className={`absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${activity.color}`} />

            {/* Icon */}
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 sm:h-20 sm:w-20">
              {activity.icon}
            </div>

            {/* Title */}
            <h3 className="mb-1 text-base font-bold text-blue-900 sm:text-lg">
              {activity.title}
            </h3>

            {/* Description */}
            <p className="text-center text-xs text-blue-400 sm:text-sm">
              {activity.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
