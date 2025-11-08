<script setup lang="ts">
  const props = defineProps<{
    dayList: (number | undefined)[][];
    currentPosition: { month: number; year: number };
    date: { day: number; month: number; year: number };
    weekDays: string[];
  }>();

  const emit = defineEmits<{
    (e: 'update:date', newDate: { day: number; month: number; year: number }): void;
  }>();

  function selectDay(day: number) {
    emit('update:date', {
      day,
      month: props.currentPosition.month,
      year: props.currentPosition.year,
    });
  }
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="(dayName, index) in weekDays" :key="index">{{ dayName }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(week, weekIndex) in dayList" :key="weekIndex">
        <td
          v-for="(day, idx) in week"
          :key="idx"
          :class="{
            selected:
              day &&
              day === date.day &&
              props.currentPosition.month === date.month &&
              props.currentPosition.year === date.year,
            active: day,
          }"
          @click="day && selectDay(day)"
        >
          <span v-if="day">{{ day }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style lang="scss" scoped>
  .table {
    border-collapse: separate;
    width: 100%;
    & thead {
      & tr {
        font-size: 12px;
        justify-content: space-between;
        width: 100%;
        & th {
          font-weight: 400;
          padding-bottom: 8px;
        }
      }
    }
    & td {
      text-align: center;
      height: 38px;
      width: 38px;
      &.selected {
        border: 1px solid var(--secondary);
      }
      &.active {
        cursor: pointer;
        border-radius: 5px;

        &:hover {
          border: 1px solid var(--primary);
        }
      }
    }
  }
</style>
