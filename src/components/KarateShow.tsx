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
    </SectionWrapper>
  );
}
