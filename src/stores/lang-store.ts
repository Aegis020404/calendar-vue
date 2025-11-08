import { defineStore } from 'pinia';
import { LocaleKeysEnum } from '@/locales/language.ts';

export const useLangStore = defineStore('lang', {
  state: () => ({
    localeLanguage: (localStorage.getItem('localeLanguage') as LocaleKeysEnum) || LocaleKeysEnum.EN,
  }),
  actions: {
    setLocale(newLocale: string) {
      if (!Object.values(LocaleKeysEnum).includes(newLocale as LocaleKeysEnum)) {
        throw new Error(
          `Не добавлен такой язык: ${newLocale}. добавленные: ${Object.values(LocaleKeysEnum).join(', ')}`,
        );
      }

      this.localeLanguage = newLocale as LocaleKeysEnum;
      localStorage.setItem('localeLanguage', newLocale);
    },
  },
});
