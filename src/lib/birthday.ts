// Birthday mode utility for Eklavya's birthday (22 November)
const BIRTHDAY_MONTH = 10; // November (0-indexed)
const BIRTHDAY_DAY = 22;

// Set to true during development to preview birthday mode
const DEV_FORCE_BIRTHDAY = false;

export function isBirthdayMode(): boolean {
  if (DEV_FORCE_BIRTHDAY && process.env.NODE_ENV === 'development') return true;
  const now = new Date();
  return now.getMonth() === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY;
}
