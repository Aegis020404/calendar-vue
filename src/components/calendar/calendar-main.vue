<script setup lang="ts">
  import '@/styles/calendar-transitions.scss';

  import { computed, reactive, ref, watch } from 'vue';
  import CalendarHeader from '@/components/calendar/calendar-header.vue';
  import CalendarTable from '@/components/calendar/calendar-table.vue';
  import { type DateStr, MIN_YEAR } from '@/locales/calendar.ts';
  import { useLocaleCalendar } from '@/composables/use-locale-calendar.ts';
  import CalendarMonthPicker from '@/components/calendar/calendar-month-picker.vue';
  import CalendarYearPicker from '@/components/calendar/calendar-year-picker.vue';
  import { getCalendarDays } from '@/components/calendar/get-calendar-days.ts';
  import { formatObjectToServerDate, formatServerDate, getDateObject } from '@/utils/date.ts';

  interface CalendarMainProps {
    modelValue?: DateStr;
  }

  const props = withDefaults(defineProps<CalendarMainProps>(), {
    modelValue: formatServerDate(),
  });
  const emit = defineEmits<{
    (e: 'update:modelValue', newVal: DateStr): void;
  }>();
  const currentPosition = reactive(getDateObject(props.modelValue));
  const localDateObj = ref(getDateObject(props.modelValue));
  watch(
    () => props.modelValue,
    () => {
      if (localDateObj.value === getDateObject(props.modelValue)) return;
      Object.assign(currentPosition, getDateObject(props.modelValue));
      localDateObj.value = getDateObject(props.modelValue);
    },
    {
      // once: true,
    },
  );
  watch(
    localDateObj,
    () => {
      emit('update:modelValue', formatObjectToServerDate(localDateObj.value));
    },
    {
      deep: true,
    },
  );

  const localCalendar = useLocaleCalendar();

  const dayList = computed(() => getCalendarDays(currentPosition.year, currentPosition.month));
  const direction = ref<'next' | 'prev'>('next');

  function changeMonth(delta: number) {
    direction.value = delta > 0 ? 'next' : 'prev';

    let newMonth = currentPosition.month + delta;
    let newYear = currentPosition.year;

    // Если месяц выходит за пределы 1..12
    while (newMonth > 12) {
      newMonth -= 12;
      newYear += 1;
    }

    while (newMonth < 1) {
      newMonth += 12;
      newYear -= 1;
    }
    if (newYear <= MIN_YEAR) return;
    currentPosition.year = newYear;
    currentPosition.month = newMonth;
  }

  //
  const isMonthPickerOpen = ref(false);
  function openMonthPicker() {
    isMonthPickerOpen.value = true;
  }
  function selectMonth(index: number) {
    currentPosition.month = index;
    isMonthPickerOpen.value = false;
  }
  const isYearPickerOpen = ref(false);
  //
  function openYearPicker() {
    isYearPickerOpen.value = true;
  }
  function selectYear(index: number) {
    currentPosition.year = index;
    isYearPickerOpen.value = false;
  }
</script>

<template>
  <div class="calendar">
    <CalendarHeader
      :currentMonth="currentPosition.month"
      :currentYear="currentPosition.year"
      :monthNames="localCalendar.shortMonthNames"
      @change-month="changeMonth"
      @open-month-picker="openMonthPicker"
      @open-year-picker="openYearPicker"
    />
    <div class="calendar-table-wrapper">
      <transition name="month-picker-slide">
        <CalendarMonthPicker
          v-if="isMonthPickerOpen"
          class="picker-container"
          :months="localCalendar.shortMonthNames"
          :selectedMonth="currentPosition.month"
          @select-month="selectMonth"
        />
      </transition>
      <transition name="slide-up">
        <CalendarYearPicker
          v-if="isYearPickerOpen"
          class="picker-container"
          :currentYear="currentPosition.year"
          @select-year="selectYear"
        />
      </transition>

      <transition :name="`slide-${direction}`" mode="out-in">
        <CalendarTable
          :key="currentPosition.year + '-' + currentPosition.month"
          :dayList="dayList"
          :currentPosition="currentPosition"
          v-model:date="localDateObj"
          :weekDays="localCalendar.shortWeekNames"
        />
      </transition>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .calendar {
    border-radius: 5px;
    //transform: scale(2) translate(100px, 100px);
    position: relative;
    background-color: white;
    padding: 12px 8px 4px 8px;
    width: 300px;
  }
  .calendar-table-wrapper {
    overflow: hidden;
  }
  .picker-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    z-index: 1000;
  }
</style>
