<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  label: string
  modelValue: number
  icon?: Component
  prefix?: string
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  step: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const handleUpdate = (value: number | null) => {
  emit('update:modelValue', value ?? 0)
}
</script>

<template>
  <div class="clean-input">
    <label class="label">{{ label }}</label>
    <div class="input-wrapper">
      <div v-if="icon" class="icon-container">
        <ElIcon :size="16">
          <component :is="icon" />
        </ElIcon>
      </div>
      <span v-if="prefix" class="prefix">{{ prefix }}</span>
      <ElInputNumber
        :model-value="modelValue"
        :controls="false"
        :min="min"
        :max="max"
        :step="step"
        class="input-field"
        @update:model-value="handleUpdate"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.clean-input {
  width: 100%;
}

.label {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-gray-600);
  margin-bottom: 0.375rem;
  display: block;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: var(--shadow-sm);

  &:focus-within {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgb(251 191 36 / 0.1);
  }
}

.icon-container {
  padding-left: 0.75rem;
  padding-right: 0.5rem;
  color: var(--color-gray-400);
  display: flex;
  align-items: center;
}

.prefix {
  padding-left: 0.75rem;
  padding-right: 0.25rem;
  color: var(--color-gray-400);
  font-weight: 500;
}

.input-field {
  flex: 1;
  background: transparent;
  border: none;
  box-shadow: none;

  :deep(.el-input__wrapper) {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0.75rem;
  }

  :deep(.el-input__inner) {
    color: var(--color-gray-800);
    font-weight: 500;
  }
}
</style>
