<script setup lang="ts">
import { HomeFilled, User, Setting, SwitchButton, ArrowDown } from '@element-plus/icons-vue'
import { TrendingUp } from 'lucide-vue-next'
import BaseButton from '~/components/ui/BaseButton.vue'

const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const handleLogout = async () => {
  try {
    await authStore.logout()
    ElMessage.success('已成功登出')
    await navigateTo('/auth/login')
  } catch (error) {
    ElMessage.error('登出失敗')
  }
}
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-logo">
        <NuxtLink to="/" class="logo-link">
          <div class="logo-icon">
            <ElIcon :size="24"><HomeFilled /></ElIcon>
          </div>
          <span class="logo-text">
            Dream<span class="logo-accent">House</span>
          </span>
        </NuxtLink>
      </div>

      <nav v-if="isAuthenticated" class="header-nav">
        <NuxtLink to="/planner" class="nav-link" active-class="nav-link-active">
          <ElIcon><TrendingUp /></ElIcon>
          <span>購屋規劃</span>
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <div v-if="isAuthenticated" class="user-menu">
          <ElDropdown>
            <div class="user-trigger">
              <ElAvatar :size="36" :src="user?.avatar">
                {{ user?.name?.charAt(0) || 'U' }}
              </ElAvatar>
              <span class="user-name">{{ user?.name }}</span>
              <ElIcon class="ml-1"><ArrowDown /></ElIcon>
            </div>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem>
                  <ElIcon><User /></ElIcon>
                  個人資料
                </ElDropdownItem>
                <ElDropdownItem>
                  <ElIcon><Setting /></ElIcon>
                  設定
                </ElDropdownItem>
                <ElDropdownItem divided @click="handleLogout">
                  <ElIcon><SwitchButton /></ElIcon>
                  登出
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </div>
        <div v-else class="auth-buttons">
          <BaseButton type="text" @click="navigateTo('/auth/login')">
            登入
          </BaseButton>
          <BaseButton type="warning" @click="navigateTo('/auth/register')">
            註冊
          </BaseButton>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  border-bottom: 1px solid var(--color-gray-200);
  box-shadow: var(--shadow-sm);
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.header-logo {
  flex-shrink: 0;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: all 0.3s;
  
  &:hover {
    opacity: 0.8;
  }
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  border-radius: 0.75rem;
  color: var(--color-gray-900);
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--color-gray-800);
  letter-spacing: -0.025em;
}

.logo-accent {
  color: var(--color-primary);
}

.header-nav {
  flex: 1;
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  color: var(--color-gray-600);
  text-decoration: none;
  transition: all 0.3s;
  
  &:hover {
    background: var(--color-gray-100);
    color: var(--color-gray-900);
  }
}

.nav-link-active {
  background: var(--color-primary);
  color: white;
  
  &:hover {
    background: var(--color-primary-dark);
    color: white;
  }
}

.header-actions {
  flex-shrink: 0;
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-trigger {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: var(--color-gray-100);
  }
}

.user-name {
  font-weight: 600;
  color: var(--color-gray-700);
  
  @media (max-width: 640px) {
    display: none;
  }
}

.auth-buttons {
  display: flex;
  gap: 0.5rem;
}

.ml-1 {
  margin-left: 0.25rem;
}
</style>
