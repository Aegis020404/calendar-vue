<script setup lang="ts">
  defineProps<{
    months: string[];
    selectedMonth: number;
  }>();

  const emit = defineEmits<{
    (e: 'select-month', month: number): void;
  }>();
</script>

<template>
  <div class="month-picker">
    <div
      v-for="(monthName, index) in months"
      :key="index"
      class="month-item"
      :class="{ selected: index === selectedMonth }"
      @click="emit('select-month', index)"
    >
      <span>{{ monthName }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .month-picker {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 12px;
    .month-item {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 8px 0;
      border-radius: 4px;
      text-align: center;
      transition: all 0.2s ease;
      &:hover {
        outline: 1px solid var(--primary);
        color: var(--primary);
      }

      &.selected {
        background-color: var(--primary);
        color: white;
        font-weight: bold;
      }
    }
  }
</style>
