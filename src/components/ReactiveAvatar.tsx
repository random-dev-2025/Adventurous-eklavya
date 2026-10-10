'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import Avatar, { type AvatarPose } from './Avatar';

type Mood = 'idle' | 'hello' | 'dancing' | 'sleeping';

const SLEEP_AFTER_MS = 30_000;
const LEFT_TOP_AT = 400; // px scrolled before a return to the top counts
const BACK_AT_TOP = 80;

const MOOD_POSE: Record<Mood, AvatarPose> = {
  idle: 'waving',
  hello: 'hello',
  dancing: 'dancing',
  sleeping: 'sleeping',
};

const MOOD_MOTION = {
  idle: { y: [-5, 5, -5], rotate: 0, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } },
  hello: { y: [-5, 5, -5], rotate: 0, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const } },
  dancing: {
    y: [0, -18, 0, -18, 0],
    rotate: [0, -10, 0, 10, 0],
    transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' as const },
  },
  sleeping: { y: [2, 5, 2], rotate: 8, transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const } },
};

const DANCE_LINES = ["Let's dance!", 'Dance party!', 'Watch my moves!', 'Boogie time!'];

export default function ReactiveAvatar({ className = '' }: { className?: string }) {
  const [mood, setMood] = useState<Mood>('idle');
  const [bubble, setBubble] = useState<string | null>(null);
  const moodTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const sleepTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const moodRef = useRef<Mood>('idle');
  const leftTop = useRef(false);
  const danceCount = useRef(0);

  // Show a mood for a while, then go back to idle
  const play = useCallback((next: Mood, text: string | null, ms: number) => {
    clearTimeout(moodTimer.current);
    moodRef.current = next;
    setMood(next);
    setBubble(text);
    moodTimer.current = setTimeout(() => {
      moodRef.current = 'idle';
      setMood('idle');
      setBubble(null);
    }, ms);
  }, []);

  // Fall asleep after 30s with no activity; wake up on any activity
  useEffect(() => {
    const goToSleep = () => {
      clearTimeout(moodTimer.current);
      moodRef.current = 'sleeping';
      setMood('sleeping');
      setBubble(null);
    };

    const onActivity = () => {
      if (moodRef.current === 'sleeping') play('hello', "*Yawn* I'm awake!", 2500);
      clearTimeout(sleepTimer.current);
      sleepTimer.current = setTimeout(goToSleep, SLEEP_AFTER_MS);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel'] as const;
    events.forEach(e => window.addEventListener(e, onActivity, { passive: true }));
    sleepTimer.current = setTimeout(goToSleep, SLEEP_AFTER_MS);

    return () => {
      events.forEach(e => window.removeEventListener(e, onActivity));
      clearTimeout(sleepTimer.current);
    };
  }, [play]);

  // Wave hello when someone scrolls back up to the top
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > LEFT_TOP_AT) leftTop.current = true;
      else if (y < BACK_AT_TOP && leftTop.current) {
        leftTop.current = false;
        play('hello', 'Welcome back!', 3000);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [play]);

  // A small hint after the page loads
  useEffect(() => {
    const show = setTimeout(() => {
      if (moodRef.current === 'idle') setBubble('Psst... tap me!');
    }, 3500);
    const hide = setTimeout(() => {
      if (moodRef.current === 'idle') setBubble(null);
    }, 7500);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
      clearTimeout(moodTimer.current);
    };
  }, []);

  const handleClick = () => {
    const line = DANCE_LINES[danceCount.current % DANCE_LINES.length];
    danceCount.current += 1;
    play('dancing', line, 3000);
  };

  return (
    <div className="relative">
      {/* Speech bubble */}
      <AnimatePresence>
        {bubble && (
          <motion.div
            key={bubble}
            className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-white px-4 py-1.5 text-sm font-extrabold text-blue-700 shadow-lg sm:-top-6 sm:text-base"
            initial={{ opacity: 0, y: 10, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            {bubble}
            <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music notes while dancing */}
      <AnimatePresence>
        {mood === 'dancing' &&
          ['♪', '♫', '♪'].map((note, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute z-20 text-2xl text-cyan-300"
              style={{ left: `${15 + i * 32}%`, top: '30%' }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -60 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.35 }}
            >
              {note}
            </motion.span>
          ))}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleClick}
        className="relative z-10 block cursor-pointer rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/60"
        aria-label="Make Eklavya dance"
        animate={MOOD_MOTION[mood]}
        whileTap={{ scale: 0.92 }}
      >
        <Avatar pose={MOOD_POSE[mood]} size={220} className={className} />
      </motion.button>
    </div>
  );
}
