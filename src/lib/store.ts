// In-memory data store (swap with database in production)
// This is a simple server-side store for badges, polls, and scores.
// In production, replace with Redis, PostgreSQL, or any persistent store.

export interface BadgeCounts {
  [key: string]: number;
}

export interface PollCounts {
  [key: string]: number;
}

export interface ScoreEntry {
  score: number;
  timestamp: number;
}

const VALID_BADGES = [
  'cricket-champ',
  'world-explorer',
  'singing-star',
  'speed-skater',
  'young-actor',
  'dance-hero',
] as const;

const VALID_POLL_OPTIONS = ['japan', 'italy', 'australia', 'canada'] as const;

export type BadgeKey = typeof VALID_BADGES[number];
export type PollOption = typeof VALID_POLL_OPTIONS[number];

// Initialize counts with seed values
const SEED_BADGES: Record<string, number> = {
  'cricket-champ': 42,
  'world-explorer': 38,
  'singing-star': 27,
  'speed-skater': 31,
  'young-actor': 24,
  'dance-hero': 35,
};
const badgeCounts: BadgeCounts = Object.fromEntries(VALID_BADGES.map(b => [b, SEED_BADGES[b] || 0]));
const pollCounts: PollCounts = Object.fromEntries(VALID_POLL_OPTIONS.map(p => [p, 0]));
const topScores: ScoreEntry[] = [];

export function isValidBadge(key: string): key is BadgeKey {
  return (VALID_BADGES as readonly string[]).includes(key);
}

export function isValidPollOption(key: string): key is PollOption {
  return (VALID_POLL_OPTIONS as readonly string[]).includes(key);
}

export function getBadgeCounts(): BadgeCounts {
  return { ...badgeCounts };
}

export function incrementBadge(key: BadgeKey): BadgeCounts {
  badgeCounts[key] = (badgeCounts[key] || 0) + 1;
  return { ...badgeCounts };
}

export function getPollCounts(): PollCounts {
  return { ...pollCounts };
}

export function incrementPoll(key: PollOption): PollCounts {
  pollCounts[key] = (pollCounts[key] || 0) + 1;
  return { ...pollCounts };
}

export function getTopScores(limit = 10): ScoreEntry[] {
  return topScores.slice(0, limit);
}

export function addScore(score: number): ScoreEntry[] {
  if (score < 0 || score > 500 || !Number.isInteger(score)) return topScores.slice(0, 10);
  topScores.push({ score, timestamp: Date.now() });
  topScores.sort((a, b) => b.score - a.score);
  if (topScores.length > 50) topScores.length = 50;
  return topScores.slice(0, 10);
}
