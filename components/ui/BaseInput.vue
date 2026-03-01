<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  modelValue?: string | number
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  prefixIcon?: Component
  suffixIcon?: Component
  showPassword?: boolean
  size?: 'large' | 'default' | 'small'
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'default',
  disabled: false,
  required: false,
  showPassword: false,
})

defineEmits<{
  'update:modelValue': [value: string | number]
  blur: []
  focus: []
}>()

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`
</script>

<template>
  <div class="base-input-wrapper">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="input-container">
      <div v-if="prefixIcon" class="input-icon prefix-icon">
        <ElIcon :size="18">
          <component :is="prefixIcon" />
        </ElIcon>
      </div>
      
      <ElInput
        :id="inputId"
        :model-value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :show-password="showPassword"
        :size="size"
        class="base-input"
        @update:model-value="$emit('update:modelValue', $event)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        v-bind="$attrs"
      />
      
      <div v-if="suffixIcon" class="input-icon suffix-icon">
        <ElIcon :size="18">
          <component :is="suffixIcon" />
        </ElIcon>
      </div>
    </div>
    
    <p v-if="error" class="input-error">{{ error }}</p>
    <p v-else-if="hint" class="input-hint">{{ hint }}</p>
  </div>
</template>

<style scoped lang="scss">
.base-input-wrapper {
  width: 100%;
  margin-bottom: 1rem;
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  display: flex;
  align-items: center;
  color: #94a3b8;
  pointer-events: none;
  z-index: 10;
  
  &.prefix-icon {
    left: 1rem;
  }
  
  &.suffix-icon {
    right: 1rem;
  }
}

.base-input {
  width: 100%;
  
  :deep(.el-input__wrapper) {
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    padding: 0.75rem 1rem;
    transition: all 0.3s;
    
    &:hover {
      border-color: #cbd5e1;
    }
    
    &.is-focus {
      border-color: #fbbf24;
      box-shadow: 0 0 0 3px rgb(251 191 36 / 0.1);
    }
  }
  
  :deep(.el-input__inner) {
    &::placeholder {
      color: #cbd5e1;
    }
  }
}

.input-error {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #ef4444;
}

.input-hint {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}
</style>
