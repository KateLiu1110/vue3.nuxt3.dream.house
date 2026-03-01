<script setup lang="ts">
import { HomeFilled } from '@element-plus/icons-vue'

interface Props {
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  subtitle: '開啟您的購屋之旅',
})
</script>

<template>
  <div class="auth-container">
    <div class="auth-background"></div>
    <div class="auth-content">
      <!-- Logo -->
      <div class="auth-logo">
        <div class="logo-icon">
          <ElIcon :size="40">
            <HomeFilled />
          </ElIcon>
        </div>
        <h1 class="logo-text">
          Dream<span class="logo-accent">House</span>
        </h1>
        <p class="logo-subtitle">{{ subtitle }}</p>
      </div>
      
      <!-- Card Content -->
      <div class="auth-card">
        <slot />
      </div>
      <!-- Footer Links -->
      <div v-if="$slots.footer" class="auth-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.auth-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #fffbeb 0%, #ffffff 50%, #dbeafe 100%);
  z-index: -1;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  }
}

.auth-content {
  width: 100%;
  max-width: 28rem;
  z-index: 10;
}

.auth-logo {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 1.5rem;
  box-shadow: 0 10px 15px -3px rgb(251 191 36 / 0.3);
  margin-bottom: 1rem;
  color: #1e293b;
}

.logo-text {
  font-size: 2.5rem;
  font-weight: 900;
  color: #1e293b;
  margin: 0;
  letter-spacing: -0.025em;
}

.logo-accent {
  color: #f59e0b;
}

.logo-subtitle {
  color: #64748b;
  font-size: 1rem;
  margin: 0.5rem 0 0;
}

.auth-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  padding: 2rem;
  border: 1px solid #f1f5f9;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
}
</style>
