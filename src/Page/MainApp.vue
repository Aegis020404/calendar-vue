<script setup lang="ts">
  import ChangeLanguage from '@/components/change-language.vue';
  import CalendarMain from '@/components/calendar/calendar-main.vue';
  import InputDate from '@/components/input-date.vue';
  import { ref } from 'vue';
  import type { DateStr } from '@/locales/calendar.ts';

  const date = ref<undefined | DateStr>(undefined);
</script>

<template>
  <header class="header">
    <div class="calendar-container">
      <CalendarMain v-model="date" />
      <InputDate v-model="date" />
    </div>
    <ChangeLanguage />
  </header>
  <main></main>
  <footer></footer>
</template>
<style scoped>
  .header {
    min-height: 350px; /*Чтобы не прыгал в зависимости от рядов в календаре*/
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: 10px 20px;
    background: var(--secondary);
    & .calendar-container {
      display: flex;
      gap: 10px;
    }
  }
</style>
