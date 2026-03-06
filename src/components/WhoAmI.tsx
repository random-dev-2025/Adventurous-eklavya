'use client';

import { motion } from 'framer-motion';
import Avatar from './Avatar';
import SectionWrapper, { SectionTitle } from './SectionWrapper';

const traits = [
  { emoji: '😊', label: 'Cheerful', color: 'from-blue-400 to-cyan-300' },
  { emoji: '🧒', label: '7 Years Old', color: 'from-sky-400 to-blue-300' },
  { emoji: '🧠', label: 'Smart', color: 'from-blue-500 to-indigo-400' },
  { emoji: '⚡', label: 'Energetic', color: 'from-cyan-400 to-blue-400' },
  { emoji: '🌍', label: 'Adventurous', color: 'from-blue-400 to-sky-300' },
  { emoji: '📚', label: 'Likes to read', color: 'from-indigo-400 to-blue-400' },
  { emoji: '🏠', label: 'With Mom & Dad', color: 'from-sky-400 to-cyan-300' },
  { emoji: '🎉', label: 'Fun-Loving', color: 'from-blue-300 to-sky-400' },
];

export default function WhoAmI() {
  return (
    <SectionWrapper id="who-am-i" bg="white">
      <SectionTitle subtitle="Let me tell you a little about myself!">
        Who Am I?
      </SectionTitle>

      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
        {/* Avatar side */}
        <motion.div
          className="flex shrink-0 justify-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Avatar pose="explorer" size={200} className="h-[160px] w-[160px] sm:h-[200px] sm:w-[200px]" />
          </motion.div>
        </motion.div>

        {/* Info bubbles */}
        <div className="flex-1">
          <motion.p
            className="mb-6 text-center text-lg leading-relaxed text-blue-800/80 md:text-left md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi! I&apos;m <span className="font-bold text-blue-600">Eklavya</span> - a curious little
            explorer who loves trying fun activities and discovering amazing places around the world!
          </motion.p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.label}
                className={`flex flex-col items-center rounded-2xl bg-gradient-to-br ${trait.color} p-3 text-center text-white shadow-md sm:p-4`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <span className="text-2xl sm:text-3xl">{trait.emoji}</span>
                <span className="mt-1 text-xs font-semibold sm:text-sm">{trait.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
