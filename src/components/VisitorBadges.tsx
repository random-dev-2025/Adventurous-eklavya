'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { useRateLimitedAction, useSessionTracker } from '@/hooks/useRateLimitedAction';

const BADGES = [
  { key: 'cricket-champ', title: 'Cricket Champ', emoji: '🏏', color: 'from-blue-500 to-blue-400' },
  { key: 'world-explorer', title: 'World Explorer', emoji: '🌍', color: 'from-sky-400 to-cyan-300' },
  { key: 'singing-star', title: 'Singing Star', emoji: '🎤', color: 'from-blue-400 to-indigo-400' },
  { key: 'speed-skater', title: 'Speed Skater', emoji: '⛸️', color: 'from-cyan-400 to-blue-400' },
  { key: 'young-actor', title: 'Young Actor', emoji: '🎭', color: 'from-indigo-400 to-blue-500' },
  { key: 'dance-hero', title: 'Dance Hero', emoji: '\u{1F57A}', color: 'from-blue-400 to-sky-400' },
] as const;

function ConfettiBurst({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360;
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
            style={{
              backgroundColor: ['#3B82F6', '#FCD34D', '#60A5FA', '#38BDF8'][i % 4],
            }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: Math.cos(rad) * 60,
              y: Math.sin(rad) * 60,
              scale: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

export default function VisitorBadges() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [bursting, setBursting] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const canAct = useRateLimitedAction(3000);
  const { hasVoted, markVoted } = useSessionTracker('eklavya-badges');

  useEffect(() => {
    fetch('/api/badges').then(r => r.json()).then(setCounts).catch(() => {});
  }, []);

  const awardBadge = useCallback(async (key: string) => {
    if (!canAct(key)) {
      setMessage('Wait a moment before awarding again!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    if (hasVoted(key)) {
      setMessage('You already awarded this badge!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    // Optimistic update
    setCounts(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    setBursting(key);
    setTimeout(() => setBursting(null), 700);

    try {
      const res = await fetch('/api/badges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badge: key }),
      });
      if (res.ok) {
        const data = await res.json();
        setCounts(data);
        markVoted(key);
        setMessage('Badge awarded! ⭐');
      } else {
        // Rollback
        setCounts(prev => ({ ...prev, [key]: Math.max((prev[key] || 1) - 1, 0) }));
        setMessage(res.status === 429 ? 'Slow down a bit!' : 'Try again later!');
      }
    } catch {
      setCounts(prev => ({ ...prev, [key]: Math.max((prev[key] || 1) - 1, 0) }));
      setMessage('Connection error!');
    }
    setTimeout(() => setMessage(''), 2500);
  }, [canAct, hasVoted, markVoted]);

  return (
    <SectionWrapper id="badges" bg="light">
      <SectionTitle subtitle="Tap any card below to award Eklavya a badge!">
        Vote for Eklavya&apos;s Best Talent
      </SectionTitle>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
        {BADGES.map((badge, i) => {
          const awarded = hasVoted(badge.key);
          return (
            <motion.button
              key={badge.key}
              onClick={() => awardBadge(badge.key)}
              disabled={awarded}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${badge.color} p-5 text-left text-white shadow-lg transition-shadow hover:shadow-xl disabled:opacity-80 sm:p-6`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={!awarded ? { scale: 1.04, y: -3 } : {}}
              whileTap={!awarded ? { scale: 0.97 } : {}}
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" />
              <ConfettiBurst show={bursting === badge.key} />

              <motion.span
                className="mb-2 block text-3xl sm:text-4xl"
                animate={bursting === badge.key ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {badge.emoji}
              </motion.span>

              <h3 className="mb-1 text-sm font-bold sm:text-base">{badge.title}</h3>

              <div className="flex items-center gap-1.5">
                <motion.span
                  className="text-xl font-bold tabular-nums"
                  key={counts[badge.key]}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                >
                  {counts[badge.key] || 0}
                </motion.span>
                <span className="text-xs opacity-80">votes</span>
              </div>

              {awarded && (
                <div className="absolute right-3 top-3 rounded-full bg-white/30 px-2 py-0.5 text-xs font-bold">
                  ✓ Awarded
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {message && (
          <motion.p
            className="mt-6 text-center text-sm font-semibold text-blue-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
