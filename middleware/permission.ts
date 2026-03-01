export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // 尝试从 localStorage 恢复认证状态
  if (!authStore.isAuthenticated && process.client) {
    await authStore.restoreAuth()
  }

  // 检查是否需要管理员权限
  const requiresAdmin = to.meta.requiresAdmin
  
  if (requiresAdmin && !authStore.isAdmin) {
    ElMessage.error('您没有访问此页面的权限')
    return navigateTo('/planner')
  }
  
  // 检查特定权限
  const requiredPermission = to.meta.permission as string
  if (requiredPermission && !authStore.hasPermission(requiredPermission)) {
    ElMessage.error('您没有访问此页面的权限')
    return navigateTo('/planner')
  }
})
