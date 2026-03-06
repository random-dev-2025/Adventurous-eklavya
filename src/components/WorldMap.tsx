'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import Avatar from './Avatar';

interface CountryData {
  name: string;
  code: string;
  flag: string;
  fact: string;
  stamp: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
  cities: string[];
}

const COUNTRIES: CountryData[] = [
  {
    name: 'Thailand',
    code: 'TH',
    flag: '\u{1F1F9}\u{1F1ED}',
    stamp: 'BKK',
    fact: 'Amazing temples & street food!',
    color: '#10B981',
    gradientFrom: 'from-emerald-400',
    gradientTo: 'to-teal-500',
    icon: '\u{1F3DB}\u{FE0F}',
    cities: ['Bangkok', 'Phuket', 'Krabi'],
  },
  {
    name: 'Malaysia',
    code: 'MY',
    flag: '\u{1F1F2}\u{1F1FE}',
    stamp: 'KUL',
    fact: 'Petronas Towers are huge!',
    color: '#F59E0B',
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-orange-500',
    icon: '\u{1F3D7}\u{FE0F}',
    cities: ['Kuala Lumpur'],
  },
  {
    name: 'Singapore',
    code: 'SG',
    flag: '\u{1F1F8}\u{1F1EC}',
    stamp: 'SIN',
    fact: 'The Lion City!',
    color: '#EF4444',
    gradientFrom: 'from-red-400',
    gradientTo: 'to-rose-500',
    icon: '\u{1F981}',
    cities: ['Singapore'],
  },
  {
    name: 'Austria',
    code: 'AT',
    flag: '\u{1F1E6}\u{1F1F9}',
    stamp: 'VIE',
    fact: 'Beautiful mountains & music!',
    color: '#8B5CF6',
    gradientFrom: 'from-violet-400',
    gradientTo: 'to-purple-500',
    icon: '\u{1F3D4}\u{FE0F}',
    cities: ['Vienna', 'Innsbruck', 'Hallstatt', 'Salzburg'],
  },
  {
    name: 'Germany',
    code: 'DE',
    flag: '\u{1F1E9}\u{1F1EA}',
    stamp: 'MUC',
    fact: 'Cool castles & chocolates!',
    color: '#3B82F6',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-indigo-500',
    icon: '\u{1F3F0}',
    cities: ['Munich', 'Fussen'],
  },
  {
    name: 'Czech Republic',
    code: 'CZ',
    flag: '\u{1F1E8}\u{1F1FF}',
    stamp: 'PRG',
    fact: 'Fairy tale city!',
    color: '#06B6D4',
    gradientFrom: 'from-cyan-400',
    gradientTo: 'to-sky-500',
    icon: '\u{1F30D}',
    cities: ['Prague'],
  },
];

const TRAVEL_SEQUENCE = ['TH', 'MY', 'SG', 'AT', 'DE', 'CZ'];

// Passport-style travel card component
function TravelCard({
  country,
  isActive,
  isVisited,
  onClick,
  index,
}: {
  country: CountryData;
  isActive: boolean;
  isVisited: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
        isActive
          ? 'border-blue-400 shadow-xl shadow-blue-200/50'
          : isVisited
            ? 'border-blue-200 shadow-md hover:border-blue-300 hover:shadow-lg'
            : 'border-gray-200 opacity-50'
      }`}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: isVisited ? 1 : 0.5, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={isVisited ? { scale: 1.03, y: -4 } : {}}
      whileTap={isVisited ? { scale: 0.98 } : {}}
      onClick={onClick}
    >
      {/* Flag & icon visual */}
      <div className={`relative flex h-32 w-full items-center justify-center overflow-hidden sm:h-36 bg-gradient-to-br ${isActive ? country.gradientFrom + ' ' + country.gradientTo : isVisited ? country.gradientFrom + ' ' + country.gradientTo : 'from-gray-200 to-gray-300'}`}>
        {/* Decorative circles in background */}
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10" />
        <div className="absolute right-8 bottom-2 h-10 w-10 rounded-full bg-white/5" />

        {/* Large flag */}
        <motion.div
          className="text-5xl sm:text-6xl drop-shadow-md"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
        >
          {country.flag}
        </motion.div>

        {/* Landmark icon */}
        <motion.div
          className="absolute left-2 bottom-2 text-2xl opacity-70"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 0.7, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {country.icon}
        </motion.div>

        {/* VISITED stamp - slams in with rotation */}
        <AnimatePresence>
          {isVisited && (
            <motion.div
              className="absolute inset-0 z-10 flex items-center justify-center"
              initial={{ scale: 3, rotate: -25, opacity: 0 }}
              animate={{ scale: 1, rotate: -12, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <div className="rounded-md border-[3px] border-green-500 px-3 py-1 sm:px-4 sm:py-1.5 bg-white/20 backdrop-blur-sm">
                <span className="font-mono text-sm font-black tracking-widest text-green-500 sm:text-base drop-shadow-sm">
                  VISITED
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active pulse ring */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/40"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Country info */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-blue-900 sm:text-base">{country.name}</h3>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 font-mono text-xs font-bold text-blue-500">
            {country.stamp}
          </span>
        </div>
        <p className="mt-1 text-xs text-blue-400">{country.fact}</p>
        {/* Cities visited */}
        {isVisited && (
          <div className="mt-2 flex flex-wrap gap-1">
            {country.cities.map((city, ci) => (
              <motion.span
                key={city}
                className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: ci * 0.15 }}
              >
                {city}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function WorldMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [visitedSet, setVisitedSet] = useState<Set<string>>(new Set());

  // Use native IntersectionObserver for reliable in-view detection
  useEffect(() => {
    if (!ref.current || journeyStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !journeyStarted) {
          setJourneyStarted(true);

          TRAVEL_SEQUENCE.forEach((code, i) => {
            setTimeout(() => {
              setVisitedSet(prev => new Set([...prev, code]));
              setActiveIndex(i);
            }, i * 1200 + 500);
          });

          setTimeout(() => {
            setActiveIndex(-1);
          }, TRAVEL_SEQUENCE.length * 1200 + 1500);

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [journeyStarted]);

  const handleCardClick = (code: string, index: number) => {
    if (!visitedSet.has(code)) return;
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const handleReplay = () => {
    setVisitedSet(new Set());
    setActiveIndex(-1);
    setJourneyStarted(false);
    // Re-trigger after a brief reset
    setTimeout(() => {
      setJourneyStarted(true);
      TRAVEL_SEQUENCE.forEach((code, i) => {
        setTimeout(() => {
          setVisitedSet(prev => new Set([...prev, code]));
          setActiveIndex(i);
        }, i * 1200 + 500);
      });
      setTimeout(() => setActiveIndex(-1), TRAVEL_SEQUENCE.length * 1200 + 1500);
    }, 100);
  };

  const activeCountry = activeIndex >= 0 ? COUNTRIES.find(c => c.code === TRAVEL_SEQUENCE[activeIndex]) : null;

  return (
    <SectionWrapper id="travel-map" bg="light">
      <SectionTitle subtitle="Follow Eklavya's adventures around the world!">
        My Travel Journey
      </SectionTitle>

      <div className="relative mx-auto max-w-5xl">
        {/* Travel avatar and route header */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Avatar pose="traveling" size={120} className="h-[90px] w-[90px] drop-shadow-lg sm:h-[110px] sm:w-[110px]" />
          </motion.div>

          {/* Journey progress bar */}
          <div className="flex w-full max-w-md items-center gap-2">
            <span className="text-lg">{'\u{1F1EE}\u{1F1F3}'}</span>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-blue-100">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: `${(visitedSet.size / TRAVEL_SEQUENCE.length) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </div>
            <span className="text-sm font-bold text-blue-600">
              {visitedSet.size}/{TRAVEL_SEQUENCE.length}
            </span>
          </div>
        </div>

        {/* Zoomed map cards grid */}
        <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {COUNTRIES.map((country, i) => {
            const seqIndex = TRAVEL_SEQUENCE.indexOf(country.code);
            const isVisited = visitedSet.has(country.code);
            const isActive = activeIndex === seqIndex;

            return (
              <TravelCard
                key={country.code}
                country={country}
                isActive={isActive}
                isVisited={isVisited}
                onClick={() => handleCardClick(country.code, seqIndex)}
                index={i}
              />
            );
          })}
        </div>

        {/* Active country detail popup */}
        <AnimatePresence>
          {activeCountry && (
            <motion.div
              className="mt-6 overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-r from-white to-blue-50 p-4 shadow-lg sm:p-6"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                  {activeCountry.flag}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-blue-900">{activeCountry.name}</h4>
                  <p className="text-sm text-blue-400">{activeCountry.fact}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {activeCountry.cities.map((city, ci) => (
                      <motion.span
                        key={city}
                        className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-600"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: ci * 0.12 }}
                      >
                        {city}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-sm font-bold text-blue-600">
                    {activeCountry.stamp}
                  </span>
                  <span className="text-xs text-green-500 font-semibold">Visited &#10003;</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Journey complete + replay */}
        {visitedSet.size === TRAVEL_SEQUENCE.length && (
          <motion.div
            className="mt-8 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.p
              className="text-center text-sm font-bold text-blue-500"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Journey Complete! 6 countries explored!
            </motion.p>
            <motion.button
              onClick={handleReplay}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-2.5 font-bold text-white shadow-lg shadow-blue-300/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              />
              <span className="relative z-10">Replay My Journey</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
