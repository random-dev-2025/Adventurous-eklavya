'use client';

import { motion } from 'framer-motion';
import Avatar from './Avatar';
import SectionWrapper, { SectionTitle } from './SectionWrapper';

const superpowers = [
  {
    title: 'Fast Skater',
    emoji: '⛸️',
    color: 'from-sky-400 to-cyan-300',
    glow: 'shadow-sky-300/50',
    desc: 'Zooming past everyone!',
  },
  {
    title: 'Cricket Champ',
    emoji: '🏏',
    color: 'from-blue-500 to-blue-400',
    glow: 'shadow-blue-300/50',
    desc: 'Hitting sixes all day!',
  },
  {
    title: 'Young Actor',
    emoji: '🎭',
    color: 'from-indigo-400 to-blue-400',
    glow: 'shadow-indigo-300/50',
    desc: 'Lights, camera, action!',
  },
  {
    title: 'Happy Singer',
    emoji: '🎤',
    color: 'from-blue-400 to-sky-400',
    glow: 'shadow-blue-300/50',
    desc: 'Singing my heart out!',
  },
  {
    title: 'Dance Star',
    emoji: '\u{1F57A}',
    color: 'from-cyan-400 to-blue-400',
    glow: 'shadow-cyan-300/50',
    desc: 'Moving to the beat!',
  },
  {
    title: 'World Explorer',
    emoji: '🌏',
    color: 'from-blue-400 to-indigo-400',
    glow: 'shadow-blue-300/50',
    desc: 'Discovering new places!',
  },
];

export default function Superpowers() {
  return (
    <SectionWrapper id="superpowers" bg="white">
      <SectionTitle subtitle="Every hero has special powers. Here are mine!">
        Eklavya&apos;s Superpowers
      </SectionTitle>

      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
        {/* Avatar */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Avatar pose="dancing" size={180} className="h-[140px] w-[140px] sm:h-[180px] sm:w-[180px]" />
          </motion.div>
        </motion.div>

        {/* Badge grid */}
        <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {superpowers.map((power, i) => (
            <motion.div
              key={power.title}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${power.color} p-5 text-white shadow-lg ${power.glow} sm:p-6`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              {/* Decorative circles */}
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" />
              <div className="absolute -bottom-3 -left-3 h-14 w-14 rounded-full bg-white/5" />

              <motion.span
                className="mb-3 block text-4xl sm:text-5xl drop-shadow-md"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {power.emoji}
              </motion.span>
              <h3 className="mb-1 text-sm font-extrabold tracking-wide sm:text-base">{power.title}</h3>
              <p className="text-xs font-medium text-white/70 sm:text-sm">{power.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
