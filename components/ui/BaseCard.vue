<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  variant?: 'default' | 'bordered' | 'elevated' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  hover: false,
})

const cardClass = computed(() => [
  'base-card',
  `card-${props.variant}`,
  props.hover && 'card-hover',
])

const bodyClass = computed(() => [
  'card-body',
  `padding-${props.padding}`,
])
</script>

<template>
  <div :class="cardClass">
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 class="card-title">{{ title }}</h3>
        <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
      </slot>
    </div>
    
    <div :class="bodyClass">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-card {
  background: white;
  border-radius: 1.5rem;
  transition: all 0.3s ease;
  overflow: hidden;
}

.card-default {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.card-bordered {
  border: 1px solid #e2e8f0;
}

.card-elevated {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.card-flat {
  background: #f8fafc;
}

.card-hover {
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  }
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.card-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.5rem 0 0;
}

.card-body {
  &.padding-none {
    padding: 0;
  }
  
  &.padding-sm {
    padding: 0.75rem;
  }
  
  &.padding-md {
    padding: 1.5rem;
  }
  
  &.padding-lg {
    padding: 2rem;
  }
}

.card-footer {
  padding: 1.5rem;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
}
</style>
