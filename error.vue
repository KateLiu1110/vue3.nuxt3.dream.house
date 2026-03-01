<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    required: true
  }
});

const handleError = () => clearError();
// const handleError = () => clearError({ redirect: props.error?.data?.from || '/home' });
</script>

<template>
  <NuxtLayout name="custom">
    <div>
      <h2>{{ error.statusCode }}</h2>
      <p>{{ error.message }}</p>
      <button @click="handleError">返回</button>
    </div>
  </NuxtLayout>
</template>
