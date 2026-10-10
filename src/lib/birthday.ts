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

export const BIRTH_YEAR = 2018;

// Midnight at the start of Eklavya's next birthday (today's, if it is his birthday)
export function getNextBirthday(now: Date = new Date()): Date {
  const thisYear = new Date(now.getFullYear(), BIRTHDAY_MONTH, BIRTHDAY_DAY);
  const endOfThisYears = new Date(now.getFullYear(), BIRTHDAY_MONTH, BIRTHDAY_DAY + 1);
  if (now < endOfThisYears) return thisYear;
  return new Date(now.getFullYear() + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY);
}
