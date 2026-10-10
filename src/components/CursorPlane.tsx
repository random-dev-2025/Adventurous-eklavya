'use client';

import { motion, AnimatePresence, useMotionValue, useSpring, useAnimationFrame, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef, useSyncExternalStore } from 'react';

interface Puff {
  id: number;
  x: number;
  y: number;
  size: number;
}

const PUFF_EVERY_MS = 45;

const FINE_POINTER = '(pointer: fine)';
const subscribePointer = (cb: () => void) => {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const MAX_PUFFS = 28;

// A little plane that chases the mouse all over the website, leaving a smoke trail.
// Only shows for mouse/trackpad users (not touch screens).
export default function CursorPlane() {
  const reduceMotion = useReducedMotion();
  const enabled = useSyncExternalStore(subscribePointer, () => window.matchMedia(FINE_POINTER).matches, () => false);
  const [inside, setInside] = useState(false);
  const [puffs, setPuffs] = useState<Puff[]>([]);

  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);
  const x = useSpring(targetX, { stiffness: 90, damping: 16, mass: 0.8 });
  const y = useSpring(targetY, { stiffness: 90, damping: 16, mass: 0.8 });
  const angle = useMotionValue(0);

  const last = useRef({ x: -100, y: -100, puffAt: 0, id: 0 });
  const insideRef = useRef(false);

  useEffect(() => {
    if (!enabled || reduceMotion) return;

    const setInsideState = (value: boolean) => {
      if (insideRef.current === value) return;
      insideRef.current = value;
      setInside(value);
    };

    const onMove = (e: MouseEvent) => {
      if (!insideRef.current) {
        // Start the plane right at the cursor instead of flying in from far away
        x.jump(e.clientX - 40);
        y.jump(e.clientY);
      }
      targetX.set(e.clientX);
      targetY.set(e.clientY);
      setInsideState(true);
    };
    // Park the plane when the mouse leaves the browser window
    const onLeave = () => setInsideState(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, reduceMotion, targetX, targetY, x, y]);

  // Point the plane where it is flying and puff smoke behind it
  useAnimationFrame(time => {
    if (!insideRef.current) return;
    const cx = x.get();
    const cy = y.get();
    const dx = cx - last.current.x;
    const dy = cy - last.current.y;
    const speed = Math.hypot(dx, dy);

    if (speed > 0.6) {
      const target = (Math.atan2(dy, dx) * 180) / Math.PI;
      const current = angle.get();
      // Turn the short way round
      const diff = ((target - current + 540) % 360) - 180;
      angle.set(current + diff * 0.2);
    }

    if (speed > 1.2 && time - last.current.puffAt > PUFF_EVERY_MS) {
      last.current.puffAt = time;
      const rad = (angle.get() * Math.PI) / 180;
      const puff = {
        id: last.current.id++,
        // Smoke comes out of the tail
        x: cx - Math.cos(rad) * 22,
        y: cy - Math.sin(rad) * 22,
        size: 8 + Math.random() * 8,
      };
      setPuffs(prev => [...prev.slice(-(MAX_PUFFS - 1)), puff]);
    }

    last.current.x = cx;
    last.current.y = cy;
  });

  if (!enabled || reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      {/* Smoke trail */}
      <AnimatePresence>
        {puffs.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full border border-sky-400/60 bg-sky-300/70"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size, marginLeft: -p.size / 2, marginTop: -p.size / 2 }}
            initial={{ opacity: 0.85, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            onAnimationComplete={() => setPuffs(prev => prev.filter(q => q.id !== p.id))}
          />
        ))}
      </AnimatePresence>

      {/* The plane */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x, y, rotate: angle, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: inside ? 1 : 0, scale: inside ? 1 : 0.4 }}
        transition={{ duration: 0.25 }}
      >
        <svg width="52" height="40" viewBox="0 0 52 40" className="drop-shadow-lg">
          {/* Back wing */}
          <path d="M22 18 L12 4 L18 4 L32 18 Z" fill="#1D4ED8" />
          {/* Tail fin */}
          <path d="M6 18 L2 8 L7 8 L13 18 Z" fill="#DC2626" />
          {/* Body */}
          <path d="M4 20 Q4 15 12 15 L42 15 Q51 16 51 20 Q51 24 42 25 L12 25 Q4 25 4 20 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
          {/* Stripe */}
          <path d="M8 21 L44 21" stroke="#3B82F6" strokeWidth="2" />
          {/* Windows */}
          {[16, 22, 28, 34].map(cx => (
            <circle key={cx} cx={cx} cy="18.5" r="1.4" fill="#60A5FA" />
          ))}
          {/* Cockpit */}
          <path d="M42 16.5 Q48 17 49 19.5 L42 19.5 Z" fill="#1E3A8A" />
          {/* Front wing */}
          <path d="M22 22 L12 36 L18 36 L32 22 Z" fill="#2563EB" />
        </svg>
      </motion.div>
    </div>
  );
}
