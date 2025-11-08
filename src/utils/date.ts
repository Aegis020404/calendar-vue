import type { DateStr } from '@/locales/calendar.ts';

export function getDateObject(date: DateStr): { year: number; month: number; day: number } {
  const [year, month, day] = date.split('-').map(Number);
  return {
    year: year!,
    month: month!,
    day: day!,
  };
}
export function formatServerDate(date = new Date()): DateStr {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function formatObjectToServerDate(date: {
  year: number;
  month: number;
  day: number;
}): DateStr {
  const year = date.year;
  const month = String(date.month).padStart(2, '0');
  const day = String(date.day).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
