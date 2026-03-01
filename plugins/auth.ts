export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  // 在客户端恢复认证状态
  if (process.client) {
    await authStore.restoreAuth()
  }
})
