<script setup lang="ts">
  import '@/styles/calendar-transitions.scss';
  import { ref, computed } from 'vue';
  import { MIN_YEAR } from '@/locales/calendar.ts';

  const props = defineProps<{
    currentYear: number;
  }>();

  const emit = defineEmits<{
    (e: 'select-year', year: number): void;
  }>();

  const yearsPerPage = 24;

  const pageIndex = ref(0);

  const startYear = ref(Math.max(props.currentYear - Math.floor(yearsPerPage / 2), MIN_YEAR));

  const years = computed(() => {
    const arr = [];
    const start = startYear.value + pageIndex.value * yearsPerPage;
    for (let i = 0; i < yearsPerPage; i++) arr.push(start + i);
    return arr;
  });

  function handleSelect(year: number) {
    emit('select-year', year);
  }
  const direction = ref<'next' | 'prev'>('next');

  function prevPage() {
    direction.value = 'prev';
    if (startYear.value + (pageIndex.value - 1) * yearsPerPage >= MIN_YEAR) {
      pageIndex.value--;
    }
  }

  function nextPage() {
    direction.value = 'next';
    pageIndex.value++;
  }
</script>

<template>
  <div class="year-picker-container">
    <button class="nav-btn left" @click="prevPage">◀</button>
    <transition :name="`slide-${direction}`" mode="out-in">
      <div class="year-picker-grid" :key="pageIndex">
        <div
          v-for="year in years"
          :key="year"
          class="year-item"
          :class="{ selected: year === props.currentYear }"
          @click="handleSelect(year)"
        >
          {{ year }}
        </div>
      </div>
    </transition>

    <button class="nav-btn right" @click="nextPage">▶</button>
  </div>
</template>

<style lang="scss" scoped>
  .year-picker-container {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 4px;
    font-size: 14px;

    .nav-btn {
      cursor: pointer;
      border: none;
      background: transparent;
      font-size: 18px;
      padding: 4px;
      &:hover {
        color: var(--primary);
      }
    }

    .year-picker-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      flex: 1;
      padding: 0 8px;
    }

    .year-item {
      cursor: pointer;
      padding: 6px 0;
      text-align: center;
      border-radius: 4px;
      transition: background 0.2s ease;

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
