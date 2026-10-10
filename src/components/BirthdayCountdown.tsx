'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import Avatar from './Avatar';
import { BIRTH_YEAR, getNextBirthday } from '@/lib/birthday';

const DAY_MS = 24 * 60 * 60 * 1000;

// Things Eklavya packs as his birthday gets closer.
// `daysLeft` = it goes into the suitcase once the birthday is this many days away.
const PACKING_LIST = [
  { emoji: '👕', name: 'Comfy T-shirt', daysLeft: 60 },
  { emoji: '🏏', name: 'Cricket bat', daysLeft: 50 },
  { emoji: '🥋', name: 'Karate belt', daysLeft: 40 },
  { emoji: '🐶', name: 'Paw Patrol pup', daysLeft: 30 },
  { emoji: '🕶️', name: 'Cool shades', daysLeft: 21 },
  { emoji: '🎈', name: 'Balloons', daysLeft: 14 },
  { emoji: '🎁', name: 'Surprise gift', daysLeft: 7 },
  { emoji: '👑', name: 'Birthday crown', daysLeft: 2 },
];

function TimeTile({ value, label }: { value: number | null; label: string }) {
  const text = value === null ? '--' : String(value).padStart(2, '0');
  return (
    <div className="flex w-[4.5rem] flex-col items-center rounded-2xl bg-white px-2 py-3 shadow-md shadow-blue-100 sm:w-24 sm:py-4">
      <div className="relative h-9 overflow-hidden sm:h-12">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="block text-3xl font-black tabular-nums text-blue-600 sm:text-5xl"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-blue-300 sm:text-xs">{label}</span>
    </div>
  );
}

function Suitcase({ packed, closed }: { packed: typeof PACKING_LIST; closed: boolean }) {
  return (
    <div className="relative w-48 sm:w-60">
      {/* Lid: stands open behind the case, then flips shut when everything is packed */}
      <motion.div
        className="relative z-10 mx-auto w-full overflow-visible rounded-t-2xl border-4 border-b-0 border-blue-700 bg-gradient-to-b from-blue-500 to-blue-600"
        initial={false}
        animate={{ height: closed ? 40 : 88 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      >
        {closed ? (
          <>
            <div className="absolute inset-x-6 top-1/2 h-1 -translate-y-1/2 rounded-full bg-blue-300/50" />
            {/* Handle */}
            <div className="absolute -top-5 left-1/2 h-4 w-14 -translate-x-1/2 rounded-t-full border-4 border-b-0 border-blue-800" />
            <motion.span
              className="absolute -right-3 -top-5 rotate-12 rounded-lg bg-yellow-300 px-2 py-0.5 text-xs font-black text-blue-900 shadow"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.4 }}
            >
              READY!
            </motion.span>
          </>
        ) : (
          // Inside lining with a mesh pocket
          <div className="absolute inset-2 rounded-xl bg-sky-200/90">
            <div
              className="absolute inset-x-3 bottom-2 top-1/2 rounded-lg border-2 border-sky-300"
              style={{ backgroundImage: 'radial-gradient(#7DD3FC 1px, transparent 1px)', backgroundSize: '6px 6px' }}
            />
          </div>
        )}
      </motion.div>

      {/* Base */}
      <div className="relative h-32 rounded-b-2xl border-4 border-blue-700 bg-gradient-to-b from-sky-100 to-blue-200 p-2 sm:h-36">
        {/* Straps */}
        <div className="absolute inset-y-0 left-6 w-2 bg-blue-700/20" />
        <div className="absolute inset-y-0 right-6 w-2 bg-blue-700/20" />
        {/* Stickers */}
        <span className="absolute -left-3 bottom-3 -rotate-12 text-xl">🌏</span>
        <span className="absolute -right-3 bottom-6 rotate-12 text-xl">⭐</span>

        <div className="relative grid h-full grid-cols-4 place-items-center gap-1">
          {packed.map((item, i) => (
            <motion.span
              key={item.name}
              className="text-2xl sm:text-3xl"
              initial={{ scale: 0, y: -40 }}
              whileInView={{ scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.3 + i * 0.15 }}
              title={item.name}
            >
              {item.emoji}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Wheels */}
      <div className="flex justify-between px-6">
        <span className="h-4 w-4 rounded-full border-2 border-blue-800 bg-blue-400" />
        <span className="h-4 w-4 rounded-full border-2 border-blue-800 bg-blue-400" />
      </div>
    </div>
  );
}

export default function BirthdayCountdown() {
  const [now, setNow] = useState<number | null>(null);

  // Ticks every second (starts on the client so server and browser agree)
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);

  const birthday = getNextBirthday(now === null ? undefined : new Date(now));
  const turning = birthday.getFullYear() - BIRTH_YEAR;
  const msLeft = now === null ? null : Math.max(0, birthday.getTime() - now);
  const isToday = msLeft === 0;

  const days = msLeft === null ? null : Math.floor(msLeft / DAY_MS);
  const hours = msLeft === null ? null : Math.floor((msLeft % DAY_MS) / 3_600_000);
  const minutes = msLeft === null ? null : Math.floor((msLeft % 3_600_000) / 60_000);
  const seconds = msLeft === null ? null : Math.floor((msLeft % 60_000) / 1000);

  const daysToGo = msLeft === null ? Infinity : Math.ceil(msLeft / DAY_MS);
  const packed = PACKING_LIST.filter(item => daysToGo <= item.daysLeft);
  const nextItem = PACKING_LIST.find(item => daysToGo > item.daysLeft);
  const lastPacked = packed[packed.length - 1];
  const allPacked = packed.length === PACKING_LIST.length;

  return (
    <SectionWrapper id="countdown" bg="light">
      <SectionTitle subtitle={`Eklavya turns ${turning} on 22nd November! 🎂`}>
        Birthday Countdown
      </SectionTitle>

      {/* Countdown clock */}
      {isToday ? (
        <motion.p
          className="mb-10 text-center text-3xl font-black text-blue-600 sm:text-5xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          🎉 It&apos;s my birthday TODAY! 🎉
        </motion.p>
      ) : (
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-4" aria-live="off">
          <TimeTile value={days} label="Days" />
          <TimeTile value={hours} label="Hours" />
          <TimeTile value={minutes} label="Mins" />
          <TimeTile value={seconds} label="Secs" />
        </div>
      )}

      {/* Packing scene */}
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-lg shadow-blue-100 sm:p-8">
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-end sm:gap-10">
          <div className="relative">
            <motion.div
              animate={allPacked ? { y: [0, -14, 0], rotate: [0, -6, 0, 6, 0] } : { y: [-3, 3, -3] }}
              transition={{ duration: allPacked ? 0.9 : 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Avatar
                pose={allPacked ? 'dancing' : 'traveling'}
                size={170}
                className="h-[150px] w-[150px] sm:h-[170px] sm:w-[170px]"
              />
            </motion.div>

            {/* Latest item flying from his hands into the suitcase */}
            {lastPacked && !allPacked && (
              <motion.span
                className="pointer-events-none absolute right-2 top-1/2 hidden text-3xl sm:block"
                animate={{
                  x: [0, 60, 120],
                  y: [0, -70, 10],
                  rotate: [0, 180, 360],
                  opacity: [1, 1, 0],
                  scale: [1, 1.2, 0.6],
                }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
              >
                {lastPacked.emoji}
              </motion.span>
            )}
          </div>

          <Suitcase packed={packed} closed={allPacked} />
        </div>

        {/* Packing progress */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="mb-2 flex items-center justify-between text-sm font-bold">
            <span className="text-blue-900">Suitcase packed</span>
            <span className="tabular-nums text-blue-500">
              {packed.length}/{PACKING_LIST.length}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-blue-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
              initial={{ width: 0 }}
              whileInView={{ width: `${(packed.length / PACKING_LIST.length) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="mt-3 text-center text-sm font-semibold text-blue-400">
            {allPacked
              ? 'All packed and ready to party! 🥳'
              : nextItem && now !== null
                ? `Next to pack: ${nextItem.emoji} ${nextItem.name} in ${daysToGo - nextItem.daysLeft} day${daysToGo - nextItem.daysLeft === 1 ? '' : 's'}`
                : 'Getting ready to pack...'}
          </p>
        </div>

        {/* Still to pack */}
        {!allPacked && (
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {PACKING_LIST.map(item => {
              const isPacked = packed.includes(item);
              return (
                <span
                  key={item.name}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                    isPacked ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-300'
                  }`}
                >
                  <span className={isPacked ? '' : 'opacity-40 grayscale'}>{item.emoji}</span>
                  {item.name}
                  {isPacked && ' ✓'}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
