<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  title: string
  subtitle: string
  icon: Component
}

defineProps<Props>()
</script>

<template>
  <div class="section-header">
    <div class="subtitle">
      {{ subtitle }}
    </div>
    <h2 class="title">
      <el-icon class="icon" :size="32">
        <component :is="icon" />
      </el-icon>
      {{ title }}
    </h2>
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
  color: #d97706;
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.title {
  font-size: 1.875rem;
  font-weight: 900;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon {
  color: #f59e0b;
}
</style>
