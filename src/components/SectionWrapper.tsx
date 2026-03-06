'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  bg?: 'white' | 'light' | 'blue';
}

export default function SectionWrapper({ children, id, className = '', bg = 'white' }: SectionWrapperProps) {
  const bgClass = {
    white: 'bg-white',
    light: 'bg-sky-50/50',
    blue: 'bg-gradient-to-b from-blue-50 to-sky-50',
  }[bg];

  return (
    <section id={id} className={`relative overflow-hidden py-16 md:py-24 ${bgClass} ${className}`}>
      <motion.div
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionTitle({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-12 text-center md:mb-16">
      <motion.div
        className="mb-4 flex justify-center"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
      </motion.div>
      <motion.h2
        className="text-3xl font-extrabold tracking-tight text-blue-900 sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mx-auto mt-4 max-w-xl text-base font-medium text-blue-400/80 sm:text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
