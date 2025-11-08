import { computed } from 'vue';
import { useLangStore } from '@/stores/lang-store.ts';
import { localeCalendar, type ILocaleData } from '@/locales/calendar.ts';

export function useLocaleCalendar() {
  const langStore = useLangStore();
  return computed<ILocaleData>(() => localeCalendar[langStore.localeLanguage]);
}
