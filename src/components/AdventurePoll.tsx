'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { useRateLimitedAction, useSessionTracker } from '@/hooks/useRateLimitedAction';

const DESTINATIONS = [
  { key: 'bali', name: 'Bali', flag: '\u{1F1EE}\u{1F1E9}', emoji: '\u{1F3DD}\u{FE0F}', desc: 'Temples, rice terraces & beaches!', color: 'from-emerald-400 to-teal-500' },
  { key: 'japan', name: 'Japan', flag: '\u{1F1EF}\u{1F1F5}', emoji: '\u{1F3EF}', desc: 'Land of the Rising Sun!', color: 'from-red-400 to-pink-500' },
  { key: 'australia', name: 'Australia', flag: '\u{1F1E6}\u{1F1FA}', emoji: '\u{1F998}', desc: 'Kangaroos & the Great Reef!', color: 'from-amber-400 to-orange-500' },
  { key: 'new-zealand', name: 'New Zealand', flag: '\u{1F1F3}\u{1F1FF}', emoji: '\u{1F3D4}\u{FE0F}', desc: 'Hobbits & stunning mountains!', color: 'from-blue-400 to-indigo-500' },
] as const;

export default function AdventurePoll() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState(false);
  const [message, setMessage] = useState('');
  const canAct = useRateLimitedAction(5000);
  const { hasVoted, markVoted } = useSessionTracker('eklavya-poll');

  useEffect(() => {
    fetch('/api/poll').then(r => r.json()).then(data => {
      setCounts(data);
      // Check if user already voted this session
      if (DESTINATIONS.some(d => hasVoted(d.key))) setVoted(true);
    }).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalVotes = Object.values(counts).reduce((a, b) => a + b, 0);

  const castVote = useCallback(async (key: string) => {
    if (voted) return;
    if (!canAct('poll')) {
      setMessage('Wait a moment!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    // Optimistic
    setCounts(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    setVoted(true);

    try {
      const res = await fetch('/api/poll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option: key }),
      });
      if (res.ok) {
        const data = await res.json();
        setCounts(data);
        markVoted(key);
      } else {
        setCounts(prev => ({ ...prev, [key]: Math.max((prev[key] || 1) - 1, 0) }));
        setVoted(false);
        setMessage(res.status === 429 ? 'Too many votes!' : 'Try again!');
      }
    } catch {
      setCounts(prev => ({ ...prev, [key]: Math.max((prev[key] || 1) - 1, 0) }));
      setVoted(false);
      setMessage('Connection error!');
    }
    setTimeout(() => setMessage(''), 2500);
  }, [voted, canAct, markVoted]);

  return (
    <SectionWrapper id="poll" bg="white">
      <SectionTitle subtitle="Which country should be Eklavya's next big adventure?">
        Guess My Next Adventure
      </SectionTitle>

      <div className="mx-auto max-w-2xl">
        {/* Destination cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {DESTINATIONS.map((dest, i) => {
            const count = counts[dest.key] || 0;
            const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

            return (
              <motion.button
                key={dest.key}
                onClick={() => castVote(dest.key)}
                disabled={voted}
                className="group relative overflow-hidden rounded-2xl border-2 border-blue-100 bg-white p-4 text-left shadow-md transition-all hover:border-blue-300 hover:shadow-xl disabled:cursor-default sm:p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={!voted ? { y: -6, scale: 1.03 } : {}}
                whileTap={!voted ? { scale: 0.97 } : {}}
              >
                {/* Gradient accent top bar */}
                <div className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${dest.color}`} />

                {/* Progress bar background */}
                <AnimatePresence>
                  {voted && (
                    <motion.div
                      className="absolute bottom-0 left-0 top-0 bg-blue-50/80"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-3xl sm:text-4xl">{dest.flag}</span>
                    <span className="text-2xl">{dest.emoji}</span>
                  </div>
                  <h3 className="mb-1 text-base font-extrabold text-blue-900 sm:text-lg">
                    {dest.name}
                  </h3>
                  <p className="text-xs font-medium text-blue-400">{dest.desc}</p>

                  {voted && (
                    <motion.div
                      className="mt-3 flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-blue-100">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${dest.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        />
                      </div>
                      <motion.span
                        className="text-sm font-bold text-blue-600 tabular-nums"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: 'spring' }}
                      >
                        {pct}%
                      </motion.span>
                    </motion.div>
                  )}
                </div>

                {/* Vote prompt on hover */}
                {!voted && (
                  <motion.div
                    className="absolute right-3 top-4 flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-400 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Vote
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {voted && (
          <motion.p
            className="mt-6 text-center text-sm text-blue-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Thanks for voting! {totalVotes} adventurers have voted so far.
          </motion.p>
        )}

        <AnimatePresence>
          {message && (
            <motion.p
              className="mt-4 text-center text-sm font-semibold text-blue-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
