'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import Avatar from './Avatar';

const countries = [
  { name: 'Thailand', flag: '🇹🇭', stamp: 'BKK', color: 'border-blue-300' },
  { name: 'Austria', flag: '🇦🇹', stamp: 'VIE', color: 'border-sky-300' },
  { name: 'Germany', flag: '🇩🇪', stamp: 'MUC', color: 'border-blue-400' },
  { name: 'Czech Republic', flag: '🇨🇿', stamp: 'PRG', color: 'border-cyan-300' },
  { name: 'Malaysia', flag: '🇲🇾', stamp: 'KUL', color: 'border-blue-300' },
  { name: 'Singapore', flag: '🇸🇬', stamp: 'SIN', color: 'border-sky-400' },
];

function PassportStamp({ country, index }: { country: typeof countries[0]; index: number }) {
  const rotation = (index % 2 === 0 ? 1 : -1) * (3 + (index * 2) % 7);

  return (
    <motion.div
      className={`relative flex h-36 w-36 flex-col items-center justify-center rounded-full border-4 border-dashed ${country.color} bg-white p-2 sm:h-44 sm:w-44`}
      style={{ rotate: `${rotation}deg` }}
      initial={{ opacity: 0, scale: 0.5, rotate: rotation + 20 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, type: 'spring' }}
      whileHover={{ scale: 1.08, rotate: 0 }}
    >
      {/* Inner circle stamp effect */}
      <div className="absolute inset-2 rounded-full border-2 border-blue-200/50" />

      <span className="text-3xl sm:text-4xl">{country.flag}</span>
      <span className="mt-1 text-sm font-bold text-blue-900 sm:text-base">{country.name}</span>
      <span className="mt-0.5 rounded bg-blue-100 px-2 py-0.5 text-xs font-mono font-bold text-blue-500">
        {country.stamp}
      </span>

      {/* Small stamp decoration */}
      <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
        ✓
      </div>
    </motion.div>
  );
}

export default function Countries() {
  return (
    <SectionWrapper id="countries" bg="light">
      <SectionTitle subtitle="Stamps in my passport from around the world!">
        Countries I Have Visited
      </SectionTitle>

      {/* Travel route decorative line */}
      <div className="relative">
        {/* Dotted line connecting stamps */}
        <svg className="absolute inset-0 z-0 h-full w-full opacity-20" preserveAspectRatio="none">
          <motion.path
            d="M10% 20% Q30% 5% 50% 25% Q70% 45% 90% 20% Q95% 50% 80% 60% Q60% 75% 30% 65% Q10% 55% 20% 80%"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeDasharray="8 6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>

        {/* Mini plane along route */}
        <motion.div
          className="absolute left-0 top-0 z-10 text-2xl"
          animate={{
            x: [0, 200, 400, 300, 100, 0],
            y: [100, 20, 80, 150, 120, 100],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          ✈️
        </motion.div>

        {/* Avatar */}
        <div className="mb-8 flex justify-center">
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Avatar pose="traveling" size={150} className="h-[120px] w-[120px] sm:h-[150px] sm:w-[150px]" />
          </motion.div>
        </div>

        {/* Passport stamps grid */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
          {countries.map((country, i) => (
            <PassportStamp key={country.name} country={country} index={i} />
          ))}
        </div>

        {/* Decorative travel tickets */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {countries.map((c, i) => (
            <motion.div
              key={`ticket-${c.name}`}
              className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <span className="text-lg">{c.flag}</span>
              <div className="border-l border-dashed border-blue-200 pl-2">
                <span className="text-xs font-bold text-blue-900">{c.stamp}</span>
                <span className="ml-1 text-xs text-blue-400">→ ✈</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
