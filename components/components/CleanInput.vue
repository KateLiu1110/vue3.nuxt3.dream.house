<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  label: string
  modelValue: number
  icon?: Component
  prefix?: string
}

const props = defineProps<Props>()

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
        <el-icon :size="16">
          <component :is="icon" />
        </el-icon>
      </div>
      <span v-if="prefix" class="prefix">{{ prefix }}</span>
      <el-input-number
        :model-value="modelValue"
        :controls="false"
        :min="0"
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
  color: #475569;
  margin-bottom: 0.375rem;
  display: block;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:focus-within {
    border-color: #fbbf24;
    box-shadow: 0 0 0 3px rgb(251 191 36 / 0.1);
  }
}

.icon-container {
  padding-left: 0.75rem;
  padding-right: 0.5rem;
  color: #cbd5e1;
  display: flex;
  align-items: center;
}

.prefix {
  padding-left: 0.75rem;
  padding-right: 0.25rem;
  color: #cbd5e1;
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
    color: #1e293b;
    font-weight: 500;
  }
}
</style>
