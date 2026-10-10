'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import Avatar from './Avatar';

// ---------- Shared pool pieces ----------

function WaterFront({ top }: { top: number }) {
  // Semi-transparent water in front of the swimmer, with a moving wavy edge
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0" style={{ top }}>
      <motion.svg
        className="absolute -top-3 left-0 h-4 w-[200%]"
        viewBox="0 0 400 16"
        preserveAspectRatio="none"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <path
          d="M0 8 Q25 0 50 8 T100 8 T150 8 T200 8 T250 8 T300 8 T350 8 T400 8 L400 16 L0 16 Z"
          fill="rgba(34,211,238,0.75)"
        />
      </motion.svg>
      <div className="h-full w-full bg-gradient-to-b from-cyan-400/75 to-sky-600/80" />
    </div>
  );
}

function LaneRope({ top }: { top: string }) {
  return (
    <div
      className="absolute inset-x-0 h-1.5"
      style={{
        top,
        backgroundImage: 'repeating-linear-gradient(90deg, #EF4444 0 10px, #FFFFFF 10px 20px)',
      }}
    />
  );
}

function Bubbles() {
  return (
    <>
      {[12, 30, 52, 70, 88].map((left, i) => (
        <motion.span
          key={left}
          className="absolute bottom-2 h-2.5 w-2.5 rounded-full border border-white/70 bg-white/30"
          style={{ left: `${left}%` }}
          animate={{ y: [0, -110], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

// ---------- Watch me swim (looping show) ----------

type Step =
  | { kind: 'lap'; to: number; facingLeft: boolean; caption: string; ms: number }
  | { kind: 'dive'; caption: string; ms: number }
  | { kind: 'splash'; caption: string; ms: number };

const DIVE_LANDING = 40; // % from left where the cannonball lands

const STEPS: Step[] = [
  { kind: 'lap', to: 68, facingLeft: false, caption: 'Freestyle', ms: 2600 },
  { kind: 'lap', to: 4, facingLeft: true, caption: 'Freestyle', ms: 2600 },
  { kind: 'lap', to: 68, facingLeft: false, caption: 'Super Speed Freestyle', ms: 1800 },
  { kind: 'dive', caption: 'Cannonball!', ms: 1400 },
  { kind: 'splash', caption: 'Cannonball!', ms: 1700 },
  { kind: 'lap', to: 4, facingLeft: true, caption: 'Back to the start', ms: 2000 },
];

const SWIMMER_SIZE = 210;
const WATERLINE = 178;
const AVATAR_TOP = WATERLINE - 128; // puts the water at his waist so the arms show

function SwimShow() {
  const reduceMotion = useReducedMotion();
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const playing = userPlaying ?? !reduceMotion;
  const [stepIndex, setStepIndex] = useState(0);
  const [laps, setLaps] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (STEPS[stepIndex].kind === 'lap') setLaps(l => l + 1);
      setStepIndex(i => (i + 1) % STEPS.length);
    }, STEPS[stepIndex].ms);
    return () => clearTimeout(timer);
  }, [playing, stepIndex]);

  const step = STEPS[stepIndex];
  // Where the swimmer was before this step (for the cannonball start)
  const target =
    step.kind === 'lap'
      ? { left: `${step.to}%`, top: AVATAR_TOP, rotate: step.facingLeft ? -8 : 8, scaleX: step.facingLeft ? -1 : 1 }
      : step.kind === 'dive'
        ? { left: ['2%', '20%', `${DIVE_LANDING}%`], top: [-10, -50, AVATAR_TOP + 30], rotate: [0, 360, 720], scaleX: 1 }
        : { left: `${DIVE_LANDING}%`, top: [AVATAR_TOP + 30, AVATAR_TOP - 6, AVATAR_TOP], rotate: 0, scaleX: 1 };

  const transition =
    step.kind === 'lap'
      ? { duration: step.ms / 1000, ease: 'easeInOut' as const, scaleX: { duration: 0 } }
      : step.kind === 'dive'
        ? { duration: step.ms / 1000, ease: 'easeIn' as const, times: [0, 0.4, 1], scaleX: { duration: 0 } }
        : { duration: 0.9, ease: 'easeOut' as const };

  return (
    <div>
      <button
        type="button"
        onClick={() => setUserPlaying(!playing)}
        className="relative block h-[320px] w-full cursor-pointer overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-b from-sky-200 to-cyan-100 shadow-xl shadow-cyan-200/50"
        aria-label={playing ? 'Pause swimming show' : 'Play swimming show'}
      >
        {/* Pool deck, sky and diving board */}
        <div className="absolute inset-x-0 top-0 h-[170px] bg-gradient-to-b from-sky-300 to-sky-100" />
        <div className="absolute right-6 top-5 h-12 w-12 rounded-full bg-yellow-300 shadow-[0_0_30px_#FDE047]" />
        <div className="absolute left-0 top-[130px] h-3 w-24 rounded-r-md bg-blue-700" />
        <div className="absolute left-3 top-[133px] h-11 w-2 bg-blue-900" />

        {/* Pool tiles behind the water */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            top: WATERLINE - 10,
            backgroundColor: '#67E8F9',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* The swimmer */}
        <motion.div className="absolute" style={{ width: SWIMMER_SIZE }} animate={target} transition={transition}>
          <Avatar pose="swimming" size={SWIMMER_SIZE} className="h-[210px] w-[210px]" />
        </motion.div>

        <WaterFront top={WATERLINE} />
        <LaneRope top="calc(100% - 26px)" />
        <Bubbles />

        {/* Splash! */}
        <AnimatePresence>
          {step.kind === 'splash' && (
            <motion.div
              key={`splash-${stepIndex}`}
              className="pointer-events-none absolute"
              style={{ left: `calc(${DIVE_LANDING}% + ${SWIMMER_SIZE / 2}px)`, top: WATERLINE }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white"
                initial={{ width: 20, height: 8, opacity: 1 }}
                animate={{ width: 220, height: 40, opacity: 0 }}
                transition={{ duration: 1 }}
              />
              {Array.from({ length: 10 }).map((_, i) => {
                const angle = (-160 + i * 15) * (Math.PI / 180);
                return (
                  <motion.span
                    key={i}
                    className="absolute h-3 w-3 rounded-full bg-white/90"
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ x: Math.cos(angle) * 90, y: [0, Math.sin(angle) * 110, 20], opacity: [1, 1, 0] }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shout bubble */}
        <AnimatePresence>
          {(step.kind === 'dive' || step.kind === 'splash') && (
            <motion.div
              key={step.kind}
              className="absolute left-1/2 top-4 -translate-x-1/2 rounded-2xl border-4 border-current bg-white px-4 py-1 text-2xl font-black italic text-sky-600 shadow-md sm:text-3xl"
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: -5 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 14 }}
            >
              {step.kind === 'dive' ? 'CANNONBALL!' : 'SPLASH!'}
            </motion.div>
          )}
        </AnimatePresence>

        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#0284C7" aria-hidden="true">
                <path d="M8 5 L19 12 L8 19 Z" />
              </svg>
            </div>
          </div>
        )}
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm font-bold">
        <span className="rounded-full bg-sky-500 px-3 py-1 text-white shadow">{step.caption}</span>
        <span className="rounded-full bg-white px-3 py-1 text-sky-600 shadow-sm">
          Laps swum: <span className="tabular-nums">{laps}</span> 🏊
        </span>
      </div>
    </div>
  );
}

// ---------- Race me! (tap game) ----------

type RaceState = 'ready' | 'countdown' | 'racing' | 'won' | 'lost';

const SHARK_TIME_MS = 8500; // how long the shark takes to finish
const STROKE_DISTANCE = 2.6; // % moved per tap
const BEST_KEY = 'eklavya-swim-best';
const LANE_H = 104;

function Shark() {
  return (
    <svg viewBox="0 0 120 60" className="h-[60px] w-[120px]" aria-hidden="true">
      <path d="M8 34 Q30 16 70 18 Q100 20 116 34 Q100 46 70 48 Q30 50 8 34 Z" fill="#64748B" />
      <path d="M8 34 Q2 22 0 14 L16 30 Z" fill="#64748B" />
      <path d="M8 34 Q2 46 0 54 L16 38 Z" fill="#64748B" />
      <path d="M58 18 L70 0 L78 19 Z" fill="#475569" />
      <path d="M30 38 Q70 50 112 36 Q100 46 70 48 Q40 50 30 38 Z" fill="#E2E8F0" />
      <circle cx="98" cy="29" r="3" fill="#0F172A" />
      <circle cx="99" cy="28" r="1" fill="white" />
      <path d="M96 38 L100 41 L104 38 L108 40" fill="none" stroke="#0F172A" strokeWidth="1.5" />
    </svg>
  );
}

function SwimRace() {
  const [state, setState] = useState<RaceState>('ready');
  const [count, setCount] = useState(3);
  const [me, setMe] = useState(0);
  const [shark, setShark] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);

  const meRef = useRef(0);
  const stateRef = useRef<RaceState>('ready');
  const startRef = useRef(0);
  const frameRef = useRef(0);
  const bestRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(BEST_KEY);
      if (saved) {
        const value = Number(saved);
        bestRef.current = value;
        requestAnimationFrame(() => setBest(value));
      }
    } catch {
      // Storage can be unavailable (private mode) - the game still works
    }
  }, []);

  const finish = useCallback((result: 'won' | 'lost', time: number) => {
    stateRef.current = result;
    setState(result);
    cancelAnimationFrame(frameRef.current);
    if (result === 'won') {
      const better = bestRef.current === null || time < bestRef.current;
      setIsNewBest(better);
      if (better) {
        bestRef.current = time;
        setBest(time);
        try {
          window.localStorage.setItem(BEST_KEY, String(time));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  // Race loop: moves the shark and the clock every frame while racing
  useEffect(() => {
    if (state !== 'racing') return;
    startRef.current = performance.now();
    const loop = () => {
      if (stateRef.current !== 'racing') return;
      const t = performance.now() - startRef.current;
      // The shark speeds up and slows down a little as it swims
      const sharkPos = Math.min(100, (t / SHARK_TIME_MS) * 100 + Math.sin(t / 400) * 1.5);
      setShark(Math.max(0, sharkPos));
      setElapsed(t);
      if (sharkPos >= 100) {
        finish('lost', t);
        return;
      }
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [state, finish]);

  const start = () => {
    meRef.current = 0;
    setMe(0);
    setShark(0);
    setElapsed(0);
    setIsNewBest(false);
    setCount(3);
    stateRef.current = 'countdown';
    setState('countdown');
  };

  // 3-2-1-GO!
  useEffect(() => {
    if (state !== 'countdown') return;
    const timer = setTimeout(() => {
      if (count > 1) {
        setCount(c => c - 1);
      } else {
        stateRef.current = 'racing';
        setState('racing');
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [state, count]);

  const stroke = useCallback(() => {
    if (stateRef.current !== 'racing') return;
    meRef.current = Math.min(100, meRef.current + STROKE_DISTANCE);
    setMe(meRef.current);
    if (meRef.current >= 100) finish('won', performance.now() - startRef.current);
  }, [finish]);

  // Space bar also makes him swim
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || stateRef.current !== 'racing') return;
      e.preventDefault();
      stroke();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stroke]);

  const seconds = (elapsed / 1000).toFixed(1);

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-cyan-300 shadow-xl shadow-cyan-200/50">
        {/* Finish line */}
        <div
          className="absolute inset-y-0 right-10 z-10 w-3"
          style={{ backgroundImage: 'repeating-conic-gradient(#0F172A 0% 25%, #FFFFFF 0% 50%)', backgroundSize: '12px 12px' }}
        />

        {/* Lane 1: Eklavya */}
        <div className="relative overflow-hidden" style={{ height: LANE_H }}>
          <span className="absolute left-2 top-1 z-20 rounded-full bg-white/80 px-2 text-[10px] font-black text-sky-700">EKLAVYA</span>
          <motion.div
            className="absolute"
            style={{ top: 6, width: 90 }}
            animate={{ left: `calc(${me * 0.82}% )` }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <Avatar pose="swimming" size={90} className="h-[90px] w-[90px]" />
          </motion.div>
          <WaterFront top={58} />
        </div>

        <LaneRope top={`${LANE_H - 3}px`} />

        {/* Lane 2: the shark */}
        <div className="relative overflow-hidden" style={{ height: LANE_H }}>
          <span className="absolute left-2 top-1 z-20 rounded-full bg-white/80 px-2 text-[10px] font-black text-slate-600">SHARK</span>
          <motion.div className="absolute" style={{ top: 30, left: `calc(${shark * 0.82}% )` }}>
            <Shark />
          </motion.div>
          <WaterFront top={58} />
        </div>

        {/* Overlays */}
        <AnimatePresence>
          {state === 'countdown' && (
            <motion.div
              key={count}
              className="absolute inset-0 z-30 flex items-center justify-center text-7xl font-black text-white drop-shadow-lg"
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              {count}
            </motion.div>
          )}
          {(state === 'won' || state === 'lost') && (
            <motion.div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-1 bg-sky-900/50 text-center text-white backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.p
                className="text-3xl font-black sm:text-4xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              >
                {state === 'won' ? '🏅 Eklavya wins! 🏅' : '🦈 The shark won!'}
              </motion.p>
              <p className="text-sm font-bold sm:text-base">
                {state === 'won' ? `Time: ${seconds}s${isNewBest ? ' - New best time!' : ''}` : 'Tap faster to beat it next time!'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-col items-center gap-3">
        {state === 'racing' ? (
          <motion.button
            type="button"
            onClick={stroke}
            className="w-full max-w-xs select-none rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-8 py-4 text-xl font-black text-white shadow-lg shadow-sky-300/50"
            style={{ touchAction: 'manipulation' }}
            whileTap={{ scale: 0.92 }}
          >
            SWIM! 🏊
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onClick={start}
            disabled={state === 'countdown'}
            className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3 text-lg font-bold text-white shadow-lg shadow-blue-300/50 disabled:opacity-60"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {state === 'ready' || state === 'countdown' ? 'Start the race! 🏁' : 'Race again! 🔁'}
          </motion.button>
        )}
        <p className="text-center text-sm font-semibold text-sky-600">
          Tap the SWIM button (or press space) as fast as you can to beat the shark!
          {best !== null && <span className="block text-sky-800">Best time: {(best / 1000).toFixed(1)}s ⏱️</span>}
        </p>
      </div>
    </div>
  );
}

// ---------- Section ----------

export default function SplashZone() {
  const [mode, setMode] = useState<'show' | 'race'>('show');

  return (
    <SectionWrapper id="swimming" bg="blue">
      <SectionTitle subtitle="I'm an amazing swimmer! Watch me zoom, or try to race me!">
        Splash Zone
      </SectionTitle>

      <div className="mx-auto max-w-2xl">
        {/* Mode tabs */}
        <div className="mx-auto mb-6 flex w-fit rounded-full bg-white p-1 shadow-md" role="tablist">
          {(
            [
              { key: 'show', label: '🎬 Watch me swim' },
              { key: 'race', label: '🏁 Race me!' },
            ] as const
          ).map(tab => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={mode === tab.key}
              onClick={() => setMode(tab.key)}
              className={`relative rounded-full px-5 py-2 text-sm font-bold transition-colors sm:text-base ${
                mode === tab.key ? 'text-white' : 'text-sky-600 hover:text-sky-800'
              }`}
            >
              {mode === tab.key && (
                <motion.span
                  layoutId="splash-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        {mode === 'show' ? <SwimShow /> : <SwimRace />}
      </div>
    </SectionWrapper>
  );
}
