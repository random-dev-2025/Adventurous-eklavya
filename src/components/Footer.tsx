'use client';

import { motion } from 'framer-motion';
import Avatar from './Avatar';

function FooterStar({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      animate={{
        opacity: [0.2, 0.8, 0.2],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{ duration: 2 + delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path
          d="M10 0 L12 7 L20 8 L14 13 L15 20 L10 16 L5 20 L6 13 L0 8 L8 7 Z"
          fill="#93C5FD"
          opacity="0.6"
        />
      </svg>
    </motion.div>
  );
}

function FloatingParticle({ delay, x }: { delay: number; x: string }) {
  return (
    <motion.div
      className="absolute h-1 w-1 rounded-full bg-blue-300/40"
      style={{ left: x, bottom: '20%' }}
      animate={{
        y: [0, -80, -160],
        opacity: [0, 0.6, 0],
        x: [0, 15, 0],
      }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/80 to-blue-100 pb-8 pt-20">
      {/* Top wave */}
      <div className="absolute left-0 top-0 w-full -translate-y-[97%]">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80 L0 40 Q240 10 480 35 Q720 60 960 30 Q1200 0 1440 25 L1440 80 Z" fill="white" />
        </svg>
      </div>

      {/* Background decorations */}
      <FooterStar x="5%" y="15%" size={16} delay={0} />
      <FooterStar x="15%" y="60%" size={12} delay={0.5} />
      <FooterStar x="85%" y="20%" size={14} delay={1} />
      <FooterStar x="90%" y="55%" size={10} delay={1.5} />
      <FooterStar x="50%" y="10%" size={18} delay={0.3} />
      <FooterStar x="70%" y="70%" size={12} delay={0.8} />
      <FooterStar x="30%" y="75%" size={14} delay={1.2} />

      {/* Rising particles */}
      <FloatingParticle delay={0} x="20%" />
      <FloatingParticle delay={1} x="40%" />
      <FloatingParticle delay={2} x="60%" />
      <FloatingParticle delay={0.5} x="80%" />
      <FloatingParticle delay={1.5} x="35%" />
      <FloatingParticle delay={2.5} x="65%" />

      {/* Gradient orbs */}
      <div className="absolute -left-20 top-10 h-40 w-40 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="absolute -right-20 top-20 h-48 w-48 rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Avatar with animated ring */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            {/* Spinning conic gradient ring */}
            <motion.div
              className="absolute -inset-3 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #3B82F6, #06B6D4, #8B5CF6, #3B82F6)',
                padding: '2px',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div className="h-full w-full rounded-full bg-blue-50" />
            </motion.div>

            <motion.div
              className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-white"
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Avatar pose="waving" size={110} className="h-[90px] w-[90px]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Message card */}
        <motion.div
          className="mx-auto mb-8 max-w-lg rounded-3xl border border-blue-100 bg-white/60 p-6 shadow-lg shadow-blue-100/30 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.h3
            className="mb-3 text-2xl font-black tracking-tight text-blue-900 sm:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Thanks for visiting{' '}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Adventurous Eklavya
            </span>
          </motion.h3>

          <motion.p
            className="mb-6 text-base font-medium text-blue-400/80 sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            More adventures coming soon! Stay tuned for new stories.
          </motion.p>

          {/* Fun stats row */}
          <motion.div
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-2xl font-black text-blue-600">6</div>
              <div className="text-xs font-semibold text-blue-300">Countries</div>
            </div>
            <div className="h-8 w-px bg-blue-100" />
            <div className="text-center">
              <div className="text-2xl font-black text-blue-600">{'\u221E'}</div>
              <div className="text-xs font-semibold text-blue-300">Adventures</div>
            </div>
            <div className="h-8 w-px bg-blue-100" />
            <div className="text-center">
              <div className="text-2xl font-black text-blue-600">7</div>
              <div className="text-xs font-semibold text-blue-300">Years Old</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="mx-auto mb-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-200" />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M10 0 L12 7 L20 8 L14 13 L15 20 L10 16 L5 20 L6 13 L0 8 L8 7 Z" fill="#60A5FA" />
            </svg>
          </motion.div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-200" />
        </motion.div>

        {/* Credit */}
        <motion.p
          className="text-xs font-medium text-blue-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Made with{' '}
          <motion.span
            className="inline-block text-red-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            &#10084;
          </motion.span>{' '}
          by Eklavya&apos;s Uncle
        </motion.p>
      </div>
    </footer>
  );
}
