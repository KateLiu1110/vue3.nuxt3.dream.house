export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const authStore = useAuthStore();

  // 尝试从 localStorage 恢复认证状态
  if (!authStore.isAuthenticated && import.meta.client) {
    await authStore.restoreAuth();
  }

  // 如果用户已登录，重定向到规划页
  if (authStore.isAuthenticated) {
    return navigateTo('/planner');
  }
});
