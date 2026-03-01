export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const authStore = useAuthStore();

  // 尝试从 localStorage 恢复认证状态
  if (!authStore.isAuthenticated && import.meta.client) {
    await authStore.restoreAuth();
  }

  // 如果用户未登录，重定向到登录页
  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login');
  }

  // 验证 token 是否有效
  const isValid = await authStore.checkSession();
  if (!isValid) {
    return navigateTo('/auth/login');
  }
});
