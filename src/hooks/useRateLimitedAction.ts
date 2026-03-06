'use client';

import { useCallback, useRef } from 'react';

// Client-side rate limiter: prevents rapid repeated actions per key
export function useRateLimitedAction(cooldownMs = 3000) {
  const lastAction = useRef<Record<string, number>>({});

  const canAct = useCallback((key: string): boolean => {
    const now = Date.now();
    const last = lastAction.current[key] || 0;
    if (now - last < cooldownMs) return false;
    lastAction.current[key] = now;
    return true;
  }, [cooldownMs]);

  return canAct;
}

// Client-side session tracker: prevents voting twice per session
export function useSessionTracker(storageKey: string) {
  const getVoted = (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    } catch {
      return [];
    }
  };

  const hasVoted = (key: string): boolean => getVoted().includes(key);

  const markVoted = (key: string) => {
    if (typeof window === 'undefined') return;
    const voted = getVoted();
    if (!voted.includes(key)) {
      voted.push(key);
      sessionStorage.setItem(storageKey, JSON.stringify(voted));
    }
  };

  return { hasVoted, markVoted };
}
