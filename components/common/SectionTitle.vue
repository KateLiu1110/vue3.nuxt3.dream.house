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
  <div class="section-header">
    <div v-if="subtitle" class="subtitle">
      {{ subtitle }}
    </div>
    <h2 class="title">
      <ElIcon v-if="icon" class="icon" :size="32">
        <component :is="icon" />
      </ElIcon>
      {{ title }}
    </h2>
    <p v-if="description" class="description">
      {{ description }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.section-header {
  margin-bottom: 2rem;
}

.subtitle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary-dark);
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.title {
  font-size: 1.875rem;
  font-weight: 900;
  color: var(--color-gray-800);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
}

.icon {
  color: var(--color-primary);
}

.description {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: var(--color-gray-600);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
  }
}
</style>
