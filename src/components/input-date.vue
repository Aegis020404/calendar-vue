<script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { DateStr } from '@/locales/calendar.ts';

  const props = defineProps<{
    modelValue?: DateStr;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: DateStr): void;
  }>();

  const localDate = ref(props.modelValue ?? '');

  watch(
    () => props.modelValue,
    (newVal) => {
      localDate.value = newVal ?? '';
    },
  );

  function onInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value as DateStr;

    // Валидация: дата не меньше 1970-01-01
    if (!value || value < '1970-01-01') {
      localDate.value = '1970-01-01';
      emit('update:modelValue', '1970-01-01');
    } else {
      localDate.value = value;
      emit('update:modelValue', value);
    }
  }
</script>

<template>
  <div class="input-date">
    <input
      type="date"
      :value="localDate"
      @input="onInputChange"
      class="date-input"
      min="1970-01-01"
    />
  </div>
</template>

<style scoped lang="scss">
  .input-date {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 14px;

    & .date-input {
      padding: 6px 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: white;
    }
  }
</style>
