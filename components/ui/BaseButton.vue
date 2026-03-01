<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  size?: 'large' | 'default' | 'small'
  loading?: boolean
  disabled?: boolean
  icon?: Component
  iconRight?: Component
  variant?: 'solid' | 'outline' | 'ghost'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'default',
  loading: false,
  disabled: false,
  variant: 'solid',
})

const buttonClass = computed(() => {
  return [
    'transition-all duration-300',
    props.variant === 'outline' && 'border-2',
    props.variant === 'ghost' && 'bg-transparent',
  ]
})
</script>

<template>
  <ElButton
    :type="type"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :class="buttonClass"
    v-bind="$attrs"
  >
    <ElIcon v-if="icon && !loading" class="mr-2">
      <component :is="icon" />
    </ElIcon>
    <slot />
    <ElIcon v-if="iconRight && !loading" class="ml-2">
      <component :is="iconRight" />
    </ElIcon>
  </ElButton>
</template>

<style scoped lang="scss">
:deep(.el-button) {
  font-weight: 600;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
}
</style>
