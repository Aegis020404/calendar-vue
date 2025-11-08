<script setup lang="ts">
  const props = defineProps<{
    currentMonth: number;
    currentYear: number;
    monthNames: string[];
  }>();

  const emit = defineEmits<{
    (e: 'change-month', delta: number): void;
    (e: 'open-year-picker'): void;
    (e: 'open-month-picker'): void;
  }>();
</script>

<template>
  <header class="calendar-header">
    <button
      @click="emit('change-month', -1)"
      style="transform: rotate(180deg)"
      class="change-month"
    >
      ▶
    </button>

    <div class="current-month-year">
      <div @click="emit('open-month-picker')">{{ props.monthNames[props.currentMonth - 1] }}</div>
      <div @click="emit('open-year-picker')">{{ props.currentYear }}</div>
    </div>

    <button @click="emit('change-month', 1)" class="change-month">▶</button>
  </header>
</template>
<style lang="scss" scoped>
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0 14px;
    margin-bottom: 18px;

    & .current-month-year {
      display: flex;
      justify-content: center;
      align-items: center;

      & div {
        font-weight: 400;
        padding: 0 5px;
        cursor: pointer;
        border: 1px dashed transparent;
        &:hover {
          border-radius: 5px;
          color: var(--primary);
          border: 1px dashed var(--primary);
          transition: all 0.2s ease;
        }
      }
    }
    & .change-month {
      &:hover {
        cursor: pointer;
        transition: color 0.2s ease;
        color: var(--primary);
      }
    }
  }
</style>
