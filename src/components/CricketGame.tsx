'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useRef, useEffect } from 'react';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import Avatar from './Avatar';

const GAME_DURATION = 25; // seconds
const BALL_INTERVAL = 1200; // ms between ball moves
const HIT_MESSAGES = ['Great shot!', 'Awesome!', 'What a hit!', 'Superb!', 'Brilliant!', 'SIX!', 'FOUR!'];

interface BallState {
  x: number;
  y: number;
  isBonus: boolean;
  isSix: boolean;
}

export default function CricketGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [ball, setBall] = useState<BallState | null>(null);
  const [hitMessage, setHitMessage] = useState('');
  const [topScores, setTopScores] = useState<{ score: number }[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const ballTimerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    fetch('/api/scores').then(r => r.json()).then(setTopScores).catch(() => {});
  }, []);

  const moveBall = useCallback(() => {
    const rand = Math.random();
    const isBonus = rand > 0.85;
    const isSix = rand > 0.95;
    setBall({
      x: 10 + Math.random() * 75,
      y: 10 + Math.random() * 70,
      isBonus,
      isSix,
    });
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setHitMessage('');
    moveBall();

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          clearInterval(ballTimerRef.current);
          setGameState('ended');
          setBall(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    ballTimerRef.current = setInterval(moveBall, BALL_INTERVAL);
  }, [moveBall]);

  const endGame = useCallback(async (finalScore: number) => {
    try {
      const res = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: finalScore }),
      });
      if (res.ok) {
        const data = await res.json();
        setTopScores(data);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (gameState === 'ended' && score > 0) {
      endGame(score);
    }
  }, [gameState, score, endGame]);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearInterval(ballTimerRef.current);
    };
  }, []);

  const hitBall = useCallback(() => {
    if (!ball || gameState !== 'playing') return;
    const runs = ball.isSix ? 6 : ball.isBonus ? 4 : 1;
    setScore(prev => prev + runs);
    const msg = ball.isSix ? 'SIX! 🎆' : ball.isBonus ? 'FOUR! 🏏' : HIT_MESSAGES[Math.floor(Math.random() * 5)];
    setHitMessage(msg);
    setTimeout(() => setHitMessage(''), 800);
    moveBall();
  }, [ball, gameState, moveBall]);

  return (
    <SectionWrapper id="cricket-game" bg="blue">
      <SectionTitle subtitle="Tap the cricket ball and score as many runs as you can!">
        Play Cricket with Eklavya
      </SectionTitle>

      <div className="mx-auto max-w-lg">
        {/* Game header */}
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-white px-5 py-3 shadow-md">
          <div className="text-center">
            <p className="text-xs text-blue-400">Score</p>
            <motion.p
              className="text-2xl font-bold text-blue-900 tabular-nums"
              key={score}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
            >
              {score}
            </motion.p>
          </div>
          <div className="text-center">
            <p className="text-xs text-blue-400">Runs</p>
            <p className="text-lg font-bold text-blue-600">🏏</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-blue-400">Time</p>
            <p className={`text-2xl font-bold tabular-nums ${timeLeft <= 5 ? 'text-red-500' : 'text-blue-900'}`}>
              {timeLeft}s
            </p>
          </div>
        </div>

        {/* Game area */}
        <div
          ref={gameAreaRef}
          className="relative mb-4 overflow-hidden rounded-3xl bg-gradient-to-b from-green-100 to-green-200 shadow-inner"
          style={{ height: 280, touchAction: 'manipulation' }}
        >
          {/* Pitch lines */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-green-300/50 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-20 w-12 -translate-x-1/2 -translate-y-1/2 rounded border-2 border-green-300/40" />

          {/* Avatar in corner */}
          <div className="absolute bottom-2 left-2 opacity-60">
            <Avatar pose="cricket" size={60} />
          </div>

          {gameState === 'idle' && (
            <motion.div
              className="flex h-full flex-col items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-base font-bold text-green-800">Ready to play?</p>
              <motion.button
                onClick={startGame}
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3 text-lg font-bold text-white shadow-lg shadow-blue-300/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Game! 🏏
              </motion.button>
            </motion.div>
          )}

          {gameState === 'playing' && ball && (
            <motion.button
              className="absolute z-10 flex items-center justify-center"
              style={{
                left: `${ball.x}%`,
                top: `${ball.y}%`,
                width: ball.isSix ? 52 : ball.isBonus ? 46 : 40,
                height: ball.isSix ? 52 : ball.isBonus ? 46 : 40,
                transform: 'translate(-50%, -50%)',
              }}
              key={`${ball.x}-${ball.y}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12 }}
              onClick={hitBall}
              aria-label="Hit the ball"
            >
              <motion.svg
                viewBox="0 0 40 40"
                className="h-full w-full drop-shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <circle cx="20" cy="20" r="18" fill={ball.isSix ? '#FCD34D' : ball.isBonus ? '#F59E0B' : '#DC2626'} />
                <path d="M12 8 Q20 20 12 32" fill="none" stroke="white" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M28 8 Q20 20 28 32" fill="none" stroke="white" strokeWidth="2" strokeDasharray="3 3" />
                {ball.isSix && <text x="14" y="24" fontSize="12" fill="white" fontWeight="bold">6</text>}
                {ball.isBonus && !ball.isSix && <text x="14" y="24" fontSize="12" fill="white" fontWeight="bold">4</text>}
              </motion.svg>
            </motion.button>
          )}

          {/* Hit message */}
          <AnimatePresence>
            {hitMessage && (
              <motion.div
                className="absolute inset-x-0 top-4 z-20 text-center"
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
              >
                <span className="rounded-full bg-white/90 px-4 py-1.5 text-lg font-bold text-blue-900 shadow-md">
                  {hitMessage}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {gameState === 'ended' && (
            <motion.div
              className="flex h-full flex-col items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-sm text-green-700">Game Over!</p>
              <motion.p
                className="text-3xl font-extrabold text-blue-900"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                You scored {score} runs! 🏏
              </motion.p>
              <p className="text-sm text-green-700">
                {score >= 50 ? 'Incredible batting!' : score >= 30 ? 'Awesome batting!' : score >= 15 ? 'Great effort!' : 'Nice try!'}
              </p>
              <motion.button
                onClick={startGame}
                className="mt-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-2.5 font-bold text-white shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Top scores */}
        {topScores.length > 0 && (
          <motion.div
            className="rounded-2xl bg-white p-4 shadow-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-2 text-center text-sm font-bold text-blue-900">Top Scores</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {topScores.slice(0, 5).map((entry, i) => (
                <span
                  key={i}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    i === 0 ? 'bg-yellow-100 text-yellow-700' :
                    i === 1 ? 'bg-gray-100 text-gray-600' :
                    i === 2 ? 'bg-orange-50 text-orange-600' :
                    'bg-blue-50 text-blue-500'
                  }`}
                >
                  #{i + 1}: {entry.score} runs
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
