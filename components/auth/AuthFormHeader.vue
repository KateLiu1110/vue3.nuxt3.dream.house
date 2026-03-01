<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div class="auth-form-header">
    <h2 class="form-title">{{ title }}</h2>
    <p v-if="description" class="form-description">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">
.auth-form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 0.5rem;
}

.form-description {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
}
</style>
