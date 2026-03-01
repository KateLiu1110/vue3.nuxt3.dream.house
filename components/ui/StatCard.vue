<script setup lang="ts">
import type { Component } from 'vue'
import { TrendingUp, TrendingDown } from 'lucide-vue-next'

interface Props {
  label: string
  value: number | string
  icon: Component
  iconColor?: string
  iconBgColor?: string
  prefix?: string
  suffix?: string
  change?: number
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: '#1e293b',
  iconBgColor: '#f1f5f9',
  prefix: '',
  suffix: '',
  variant: 'default',
})

const formattedValue = computed(() => {
  const val = typeof props.value === 'number' ? props.value.toLocaleString() : props.value
  return `${props.prefix}${val}${props.suffix}`
})

const variantClass = computed(() => `variant-${props.variant}`)

const changeClass = computed(() => {
  if (props.change === undefined) return ''
  return props.change > 0 ? 'change-positive' : 'change-negative'
})

const changeIcon = computed(() => {
  if (props.change === undefined) return null
  return props.change > 0 ? TrendingUp : TrendingDown
})
</script>

<template>
  <div class="stat-card" :class="variantClass">
    <div class="stat-icon" :style="{ backgroundColor: iconBgColor }">
      <ElIcon :size="24" :color="iconColor">
        <component :is="icon" />
      </ElIcon>
    </div>
    
    <div class="stat-content">
      <div class="stat-label">{{ label }}</div>
      <div class="stat-value">{{ formattedValue }}</div>
      <div v-if="change !== undefined" class="stat-change" :class="changeClass">
        <ElIcon :size="14">
          <component :is="changeIcon" />
        </ElIcon>
        {{ Math.abs(change) }}%
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  border: 1px solid #f1f5f9;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    transform: translateY(-2px);
  }
}

.variant-success {
  border-color: #dcfce7;
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
}

.variant-warning {
  border-color: #fef3c7;
  background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
}

.variant-danger {
  border-color: #fee2e2;
  background: linear-gradient(135deg, #ffffff 0%, #fef2f2 100%);
}

.variant-info {
  border-color: #dbeafe;
  background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
}

.stat-icon {
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1.2;
}

.stat-change {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.25rem;
  
  &.change-positive {
    color: #10b981;
  }
  
  &.change-negative {
    color: #ef4444;
  }
}
</style>
