'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import Avatar, { type AvatarPose } from './Avatar';

interface Frame {
  pose: AvatarPose;
  move?: string;
  shout?: string;
  duration: number;
}

// One loop of the karate "video" - like frames of a GIF
const FRAMES: Frame[] = [
  { pose: 'karate-ready', move: 'Ready Stance', shout: 'OSU!', duration: 1300 },
  { pose: 'karate-punch', move: 'Power Punch', shout: 'HI-YAH!', duration: 1000 },
  { pose: 'karate-ready', duration: 600 },
  { pose: 'karate-kick', move: 'Flying Side Kick', shout: 'KIAI!', duration: 1200 },
  { pose: 'karate-ready', duration: 600 },
  { pose: 'karate-chop', move: 'Board Breaker Chop', shout: 'BAM!', duration: 1500 },
  { pose: 'karate-ready', duration: 800 },
];

const MOVE_FRAMES = FRAMES.filter(f => f.move);

const BODY_MOTION: Record<string, { x: number; y: number; rotate: number }> = {
  'karate-ready': { x: 0, y: 0, rotate: 0 },
  'karate-punch': { x: 10, y: 0, rotate: 2 },
  'karate-kick': { x: -6, y: -10, rotate: -4 },
  'karate-chop': { x: 6, y: 6, rotate: 3 },
};

// Belt path at Eklavya's dojo - EARNED_BELT is the belt he has now
const BELTS = [
  { name: 'White', color: '#F8FAFC', knot: '#CBD5E1' },
  { name: 'Yellow', color: '#FACC15', knot: '#CA8A04' },
  { name: 'Orange', color: '#F97316', knot: '#C2410C' },
  { name: 'Green', color: '#16A34A', knot: '#15803D' },
  { name: 'Blue', color: '#2563EB', knot: '#1D4ED8' },
  { name: 'Purple', color: '#9333EA', knot: '#7E22CE' },
  { name: 'Brown', color: '#92400E', knot: '#78350F' },
  { name: 'Black', color: '#111827', knot: '#000000' },
];
const EARNED_BELT = 'Green';
const NEXT_BELT = BELTS[BELTS.findIndex(b => b.name === EARNED_BELT) + 1]?.name;

function BeltIcon({ color, knot }: { color: string; knot: string }) {
  return (
    <svg viewBox="0 0 48 32" className="h-7 w-10 sm:h-8 sm:w-12" aria-hidden="true">
      <rect x="2" y="8" width="44" height="8" rx="2" fill={color} stroke="#94A3B8" strokeWidth="0.8" />
      <rect x="19" y="5" width="10" height="14" rx="3" fill={knot} />
      <path d="M21 18 L16 30 L21 30 L24 19 Z" fill={color} stroke="#94A3B8" strokeWidth="0.8" />
      <path d="M27 18 L32 30 L27 30 L24 19 Z" fill={color} stroke="#94A3B8" strokeWidth="0.8" />
    </svg>
  );
}

function Trophy() {
  return (
    <svg viewBox="0 0 120 140" className="h-36 w-32 drop-shadow-xl sm:h-40 sm:w-36" aria-hidden="true">
      <defs>
        <linearGradient id="trophyGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <clipPath id="trophyCup">
          <path d="M28 14 L92 14 L88 52 Q84 78 60 82 Q36 78 32 52 Z" />
        </clipPath>
      </defs>
      {/* Handles */}
      <path d="M30 22 Q8 22 12 42 Q16 58 34 58" fill="none" stroke="url(#trophyGold)" strokeWidth="7" strokeLinecap="round" />
      <path d="M90 22 Q112 22 108 42 Q104 58 86 58" fill="none" stroke="url(#trophyGold)" strokeWidth="7" strokeLinecap="round" />
      {/* Cup */}
      <path d="M28 14 L92 14 L88 52 Q84 78 60 82 Q36 78 32 52 Z" fill="url(#trophyGold)" />
      {/* Moving shine */}
      <g clipPath="url(#trophyCup)">
        <rect x="-30" y="0" width="16" height="100" fill="white" opacity="0.45" transform="skewX(-20)">
          <animate attributeName="x" values="-30;130" dur="2.5s" repeatCount="indefinite" />
        </rect>
      </g>
      {/* Star on cup */}
      <path d="M60 30 L64 40 L75 40 L66 47 L69 58 L60 51 L51 58 L54 47 L45 40 L56 40 Z" fill="#FEF3C7" />
      {/* Stem and base */}
      <rect x="53" y="80" width="14" height="18" fill="url(#trophyGold)" />
      <rect x="36" y="98" width="48" height="10" rx="3" fill="url(#trophyGold)" />
      <rect x="28" y="108" width="64" height="20" rx="4" fill="#1E3A8A" />
      <text x="60" y="122" textAnchor="middle" fontSize="10" fontWeight="900" fill="#FDE68A" fontFamily="sans-serif">KARATE</text>
    </svg>
  );
}

const SHOUT_COLORS = ['text-red-500', 'text-orange-500', 'text-blue-600', 'text-amber-500'];

export default function KarateShow() {
  const reduceMotion = useReducedMotion();
  // null = follow the default (autoplay unless the viewer prefers reduced motion)
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const playing = userPlaying ?? !reduceMotion;
  const togglePlaying = () => setUserPlaying(!playing);
  const [frameIndex, setFrameIndex] = useState(0);
  const [movesDone, setMovesDone] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      const next = (frameIndex + 1) % FRAMES.length;
      setFrameIndex(next);
      if (FRAMES[next].move && FRAMES[next].pose !== 'karate-ready') setMovesDone(m => m + 1);
    }, FRAMES[frameIndex].duration);
    return () => clearTimeout(timer);
  }, [playing, frameIndex]);

  const frame = FRAMES[frameIndex];
  // The last named move shown, so the caption stays during "ready" frames
  const currentMove = [...FRAMES.slice(0, frameIndex + 1)].reverse().find(f => f.move) ?? FRAMES[0];
  const isChop = frame.pose === 'karate-chop';

  return (
    <SectionWrapper id="karate" bg="blue">
      <SectionTitle subtitle="Watch my coolest karate moves! Hi-yah!">
        Karate Kid Eklavya
      </SectionTitle>

      <div className="mx-auto max-w-xl">
        {/* Video screen */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-b from-amber-50 to-orange-100 shadow-xl shadow-blue-200/50"
          animate={isChop && playing ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            type="button"
            onClick={togglePlaying}
            className="block w-full cursor-pointer"
            aria-label={playing ? 'Pause karate video' : 'Play karate video'}
          >
            <div className="relative aspect-[4/3] w-full">
              {/* Dojo wall: hanging scroll */}
              <div className="absolute left-5 top-4 flex h-28 w-12 flex-col items-center rounded-sm bg-white/90 py-2 shadow-sm sm:left-8 sm:h-32 sm:w-14">
                <div className="absolute -top-1 h-2 w-16 rounded-full bg-amber-800 sm:w-[4.5rem]" />
                <span className="text-xl font-black leading-tight text-red-600 sm:text-2xl">空</span>
                <span className="text-xl font-black leading-tight text-red-600 sm:text-2xl">手</span>
                <span className="mt-1 h-4 w-4 rounded-full bg-red-500/80" />
              </div>

              {/* Dojo wall: window with sun */}
              <div className="absolute right-5 top-4 h-16 w-20 overflow-hidden rounded-lg border-4 border-amber-700/60 bg-gradient-to-b from-sky-200 to-sky-100 sm:right-8 sm:h-20 sm:w-24">
                <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-yellow-300" />
                <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-amber-700/60" />
              </div>

              {/* Wooden floor */}
              <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-b from-amber-300 to-amber-400">
                <div className="absolute inset-x-0 top-0 h-1 bg-amber-600/40" />
                {[20, 40, 60, 80].map(left => (
                  <div key={left} className="absolute inset-y-0 w-px bg-amber-600/30" style={{ left: `${left}%` }} />
                ))}
              </div>

              {/* Eklavya doing karate */}
              <motion.div
                className="absolute inset-x-0 bottom-[6%] flex justify-center"
                animate={BODY_MOTION[frame.pose]}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              >
                <Avatar pose={frame.pose} size={300} className="h-[185px] w-[185px] sm:h-[300px] sm:w-[300px]" />
              </motion.div>

              {/* Comic shout bubble */}
              <AnimatePresence>
                {frame.shout && (
                  <motion.div
                    key={frameIndex}
                    className={`absolute left-1/2 top-[8%] -translate-x-1/2 rounded-2xl border-4 border-current bg-white px-4 py-1 text-2xl font-black italic tracking-wide shadow-md sm:text-3xl ${SHOUT_COLORS[frameIndex % SHOUT_COLORS.length]}`}
                    initial={{ scale: 0, rotate: -15, opacity: 0 }}
                    animate={{ scale: 1, rotate: -6, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                  >
                    {frame.shout}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* REC badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold text-white sm:text-xs">
                <motion.span
                  className="h-2 w-2 rounded-full bg-red-500"
                  animate={playing ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                {playing ? 'LIVE FROM THE DOJO' : 'PAUSED'}
              </div>

              {/* Big play icon when paused */}
              {!playing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#2563EB" aria-hidden="true">
                      <path d="M8 5 L19 12 L8 19 Z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </button>

          {/* Video control bar */}
          <div className="flex items-center gap-3 bg-white px-4 py-3">
            <button
              type="button"
              onClick={togglePlaying}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                  <rect x="2" y="1" width="3.5" height="12" rx="1" />
                  <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                  <path d="M3 1 L12 7 L3 13 Z" />
                </svg>
              )}
            </button>

            {/* Progress: one segment per frame */}
            <div className="flex flex-1 gap-1">
              {FRAMES.map((f, i) => (
                <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-blue-100" style={{ flexGrow: f.duration }}>
                  <div className={`h-full rounded-full bg-blue-500 transition-all duration-300 ${i <= frameIndex ? 'w-full' : 'w-0'}`} />
                </div>
              ))}
            </div>

            <span className="shrink-0 text-xs font-bold text-blue-900 sm:text-sm">{currentMove.move}</span>
          </div>
        </motion.div>

        {/* Move list + counter */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {MOVE_FRAMES.map(f => (
            <span
              key={f.move}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors sm:text-sm ${
                currentMove.move === f.move ? 'bg-blue-500 text-white shadow' : 'bg-white text-blue-400'
              }`}
            >
              {f.move}
            </span>
          ))}
        </div>
        <p className="mt-4 text-center text-sm font-semibold text-blue-400">
          Moves performed: <span className="tabular-nums text-blue-600">{movesDone}</span> 🥋
        </p>
      </div>

      {/* Trophy + belt journey */}
      <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
        <motion.div
          className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-amber-50 to-yellow-100 p-6 text-center shadow-lg shadow-amber-100"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        >
          <motion.div animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <Trophy />
          </motion.div>
          <h3 className="mt-2 text-lg font-black text-amber-800">Trophy Winner!</h3>
          <p className="text-sm font-semibold text-amber-600">I won a karate trophy 🏆</p>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center rounded-3xl bg-white p-6 shadow-lg shadow-blue-100 md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h3 className="text-lg font-black text-blue-900">My Belt Journey</h3>
          <p className="text-sm font-semibold text-blue-400">
            {EARNED_BELT} belt earned! Training hard to get my black belt soon 💪
          </p>

          <div className="relative mt-8">
            {/* Track from the first belt's center to the last belt's center */}
            <div className="absolute left-5 right-5 top-4 h-1.5 rounded-full bg-blue-100 sm:left-6 sm:right-6">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-slate-300 via-orange-400 to-green-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${(BELTS.findIndex(b => b.name === EARNED_BELT) / (BELTS.length - 1)) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              />
            </div>

            <ol className="relative flex justify-between">
              {BELTS.map((belt, i) => {
                const earnedIndex = BELTS.findIndex(b => b.name === EARNED_BELT);
                const earned = i <= earnedIndex;
                const current = i === earnedIndex;
                const goal = i === BELTS.length - 1;
                return (
                  <li key={belt.name} className="relative flex flex-col items-center">
                    {current && (
                      <motion.span
                        className="absolute -top-8 whitespace-nowrap rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-black text-white shadow sm:text-xs"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        I&apos;m here!
                      </motion.span>
                    )}
                    {goal && (
                      <motion.span
                        className="absolute -top-8 whitespace-nowrap rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-black text-yellow-300 shadow sm:text-xs"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Goal ⭐
                      </motion.span>
                    )}
                    <motion.div
                      className={`flex items-center justify-center rounded-xl bg-white p-0.5 ${
                        current ? 'ring-4 ring-green-400' : goal ? 'ring-2 ring-dashed ring-gray-400' : ''
                      } ${earned ? '' : 'opacity-40 grayscale-[60%]'}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', delay: 0.2 + i * 0.08 }}
                    >
                      <BeltIcon color={belt.color} knot={belt.knot} />
                    </motion.div>
                    <span className={`mt-1 text-[10px] font-bold sm:text-xs ${earned ? 'text-blue-900' : 'text-blue-300'}`}>
                      {belt.name}
                      {earned && ' ✓'}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold sm:text-sm">
            <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">🥋 {EARNED_BELT} belt: done!</span>
            {NEXT_BELT && <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">⏭️ Next up: {NEXT_BELT} belt</span>}
            <span className="rounded-full bg-gray-900 px-3 py-1 text-yellow-300">🎯 Dream: Black belt</span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
