import { defineStore } from 'pinia'

export interface User {
  id: string
  username: string
  email: string
  name: string
  avatar?: string
  role?: 'admin' | 'user' | 'guest'
  permissions?: string[]
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  refreshToken: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
    userRole: (state) => state.user?.role || 'guest',
    hasPermission: (state) => (permission: string) => {
      return state.user?.permissions?.includes(permission) || false
    },
  },

  actions: {
    setAuth(user: User, token: string, refreshToken?: string) {
      this.user = user
      this.token = token
      this.refreshToken = refreshToken || null
      this.isAuthenticated = true
      
      // 存储到 localStorage
      if (process.client) {
        localStorage.setItem('auth_token', token)
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken)
        }
      }
    },

    clearAuth() {
      this.user = null
      this.token = null
      this.refreshToken = null
      this.isAuthenticated = false
      
      // 清除 localStorage
      if (process.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
      }
    },

    async login(username: string, password: string) {
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { username, password },
        })
        
        if (response.success) {
          this.setAuth(response.user, response.token, response.refreshToken)
          return { success: true }
        }
        return { success: false, message: response.message }
      } catch (error: any) {
        console.error('Login error:', error)
        return { success: false, message: error.data?.message || '登录失败' }
      }
    },

    async register(userData: any) {
      try {
        const response = await $fetch('/api/auth/register', {
          method: 'POST',
          body: userData,
        })
        
        if (response.success) {
          this.setAuth(response.user, response.token, response.refreshToken)
          return { success: true }
        }
        return { success: false, message: response.message }
      } catch (error: any) {
        console.error('Register error:', error)
        return { success: false, message: error.data?.message || '注册失败' }
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.clearAuth()
      }
    },

    async checkSession() {
      if (!this.token) return false

      try {
        const response = await $fetch('/api/auth/session', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        
        if (response.success) {
          this.user = response.user
          this.isAuthenticated = true
          return true
        }
        this.clearAuth()
        return false
      } catch (error) {
        this.clearAuth()
        return false
      }
    },

    async restoreAuth() {
      if (!process.client) return

      const token = localStorage.getItem('auth_token')
      const refreshToken = localStorage.getItem('refresh_token')

      if (token) {
        this.token = token
        this.refreshToken = refreshToken
        await this.checkSession()
      }
    },
  },

  persist: true,
})
