'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionTitle } from './SectionWrapper';

const funFacts = [
  {
    emoji: '🌏',
    fact: 'I have already visited 6 countries before turning 8!',
    color: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    emoji: '🎭',
    fact: 'I love performing and acting on stage!',
    color: 'bg-sky-50',
    border: 'border-sky-200',
  },
  {
    emoji: '🏏',
    fact: 'Cricket is one of my absolute favorite games!',
    color: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    emoji: '🎵',
    fact: 'I love music, dancing, and all things fun!',
    color: 'bg-cyan-50',
    border: 'border-cyan-200',
  },
  {
    emoji: '🎒',
    fact: 'Every new place is a brand new adventure for me!',
    color: 'bg-sky-50',
    border: 'border-sky-200',
  },
  {
    emoji: '⭐',
    fact: 'I enjoy learning new things every single day!',
    color: 'bg-blue-50',
    border: 'border-blue-200',
  },
];

export default function FunFacts() {
  return (
    <SectionWrapper id="fun-facts" bg="white">
      <SectionTitle subtitle="Cool things about me that you should know!">
        Fun Facts
      </SectionTitle>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {funFacts.map((item, i) => (
          <motion.div
            key={i}
            className={`flex items-start gap-4 rounded-2xl border ${item.border} ${item.color} p-5 sm:p-6`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            <motion.span
              className="shrink-0 text-3xl sm:text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            >
              {item.emoji}
            </motion.span>
            <p className="text-sm font-medium leading-relaxed text-blue-800 sm:text-base">
              {item.fact}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
