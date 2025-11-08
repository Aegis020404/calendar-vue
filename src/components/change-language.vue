<template>
  <div class="language-selector">
    <select v-model="currentLocale">
      <option v-for="(name, key) in localeCalendar.nameLanguage" :key="key" :value="key">
        {{ name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useLangStore } from '@/stores/lang-store.ts';
  import { useLocaleCalendar } from '@/composables/use-locale-calendar.ts';
  import type { LocaleKeysEnum } from '@/locales/language.ts';

  const langStore = useLangStore();
  const localeCalendar = useLocaleCalendar();

  const currentLocale = computed<LocaleKeysEnum>({
    get: () => langStore.localeLanguage,
    set: (val) => {
      langStore.setLocale(val);
    },
  });
</script>

<style scoped>
  .language-selector select {
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: white;
    font-size: 1rem;
  }
</style>
