'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionTitle } from './SectionWrapper';

const adventures = [
  {
    title: 'Traveling the World',
    desc: 'Exploring amazing countries and cultures',
    emoji: '🌍',
    scene: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 to-blue-50">
        <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-4xl" animate={{ x: [-20, 20, -20] }} transition={{ duration: 4, repeat: Infinity }}>
          ✈️
        </motion.div>
        <div className="absolute bottom-2 left-4 text-lg">🏔️</div>
        <div className="absolute bottom-2 right-4 text-lg">🌴</div>
        <motion.div className="absolute left-6 top-4 text-sm" animate={{ y: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity }}>☁️</motion.div>
        <motion.div className="absolute right-8 top-6 text-sm" animate={{ y: [-3, 1, -3] }} transition={{ duration: 4, repeat: Infinity }}>☁️</motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-green-200 to-green-300 rounded-b-2xl" />
      </div>
    ),
    color: 'from-blue-400 to-sky-300',
  },
  {
    title: 'Skating Adventures',
    desc: 'Zooming around on roller skates',
    emoji: '⛸️',
    scene: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 to-sky-100">
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl"
          animate={{ x: [-30, 30, -30], rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🛼
        </motion.div>
        <motion.div className="absolute bottom-12 left-8 text-xs text-blue-300" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          ～～～
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-b-2xl" />
        <motion.text className="absolute right-6 top-4 text-xs text-yellow-400" animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1, repeat: Infinity }}>⭐</motion.text>
      </div>
    ),
    color: 'from-cyan-400 to-blue-300',
  },
  {
    title: 'Cricket Time',
    desc: 'Hitting sixes and winning games',
    emoji: '🏏',
    scene: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-blue-50">
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-200 to-green-100 rounded-b-2xl" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl">🏏</div>
        <motion.div
          className="absolute bottom-12 right-8 text-xl"
          animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🏐
        </motion.div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
          <div className="h-8 w-0.5 bg-yellow-400" />
          <div className="h-8 w-0.5 bg-yellow-400 absolute left-2 top-0" />
          <div className="h-8 w-0.5 bg-yellow-400 absolute left-4 top-0" />
        </div>
      </div>
    ),
    color: 'from-blue-500 to-blue-400',
  },
  {
    title: 'Singing Songs',
    desc: 'Making music and singing along',
    emoji: '🎤',
    scene: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-3xl">🎤</div>
        <motion.div className="absolute left-8 top-6 text-lg" animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          🎵
        </motion.div>
        <motion.div className="absolute right-6 top-8 text-lg" animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
          🎶
        </motion.div>
        <motion.div className="absolute left-1/2 top-4 text-sm" animate={{ y: [0, -12, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
          ♪
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-b-2xl" />
      </div>
    ),
    color: 'from-indigo-400 to-blue-400',
  },
  {
    title: 'Dancing Fun',
    desc: 'Moving and grooving to the beat',
    emoji: '💃',
    scene: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50">
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-3xl"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          🕺
        </motion.div>
        <motion.div className="absolute left-4 top-4 h-2 w-2 rounded-full bg-blue-300" animate={{ scale: [0, 1.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <motion.div className="absolute right-6 top-8 h-2 w-2 rounded-full bg-cyan-300" animate={{ scale: [0, 1.5, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
        <motion.div className="absolute left-8 bottom-16 h-2 w-2 rounded-full bg-sky-300" animate={{ scale: [0, 1.5, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-blue-100/50 to-cyan-100/50 rounded-b-2xl" />
      </div>
    ),
    color: 'from-sky-400 to-blue-400',
  },
  {
    title: 'Acting Star',
    desc: 'Performing on stage with style',
    emoji: '🎭',
    scene: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/10 to-indigo-50">
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-3xl">🎭</div>
        <motion.div
          className="absolute inset-x-0 bottom-0 h-3 rounded-b-2xl bg-gradient-to-r from-yellow-200/50 via-yellow-100/30 to-yellow-200/50"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Spotlight */}
        <motion.div
          className="absolute left-1/2 top-0 h-full w-16 -translate-x-1/2 bg-gradient-to-b from-yellow-100/40 to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div className="absolute left-4 top-3 text-sm" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>⭐</motion.div>
        <motion.div className="absolute right-4 top-3 text-sm" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>⭐</motion.div>
      </div>
    ),
    color: 'from-blue-500 to-indigo-400',
  },
];

export default function Gallery() {
  return (
    <SectionWrapper id="gallery" bg="blue">
      <SectionTitle subtitle="A scrapbook of my favorite moments and activities!">
        Adventure Gallery
      </SectionTitle>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {adventures.map((adventure, i) => (
          <motion.div
            key={adventure.title}
            className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md transition-shadow hover:shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
          >
            {/* Scene illustration */}
            <div className="h-36 sm:h-44">
              {adventure.scene}
            </div>

            {/* Info */}
            <div className="p-4 sm:p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">{adventure.emoji}</span>
                <h3 className="text-base font-bold text-blue-900 sm:text-lg">
                  {adventure.title}
                </h3>
              </div>
              <p className="text-sm text-blue-400">{adventure.desc}</p>

              {/* Bottom accent */}
              <div className={`mt-3 h-1 w-12 rounded-full bg-gradient-to-r ${adventure.color} transition-all group-hover:w-full`} />
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
