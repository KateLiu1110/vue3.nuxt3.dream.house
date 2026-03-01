<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  title: string
  subtitle?: string
  description?: string
  icon?: Component
}

defineProps<Props>()
</script>

<template>
  <div class="page-header">
    <div class="header-content">
      <div class="header-left">
        <slot name="icon">
          <ElIcon :size="32" class="header-icon">
            <component :is="icon" />
          </ElIcon>
        </slot>
        <div>
          <div v-if="subtitle" class="header-subtitle">{{ subtitle }}</div>
          <h1 class="header-title">{{ title }}</h1>
        </div>
      </div>
      
      <div v-if="$slots.actions" class="header-actions">
        <slot name="actions" />
      </div>
    </div>
    
    <div v-if="description" class="header-description">
      {{ description }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  color: var(--color-primary);
}

.header-subtitle {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.header-title {
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-gray-800);
  margin: 0;
  line-height: 1.2;
}

.header-description {
  margin-top: 1rem;
  font-size: 1rem;
  color: var(--color-gray-600);
  line-height: 1.6;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-title {
    font-size: 1.5rem;
  }
  
  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
