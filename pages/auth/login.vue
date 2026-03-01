<script setup lang="ts">
import { User, Lock, InfoFilled } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import AuthContainer from '~/components/auth/AuthContainer.vue'
import AuthFormHeader from '~/components/auth/AuthFormHeader.vue'
import BaseInput from '~/components/ui/BaseInput.vue'
import BaseButton from '~/components/ui/BaseButton.vue'

definePageMeta({
  layout: 'custom',
  middleware: 'guest',
})

const router = useRouter()
const authStore = useAuthStore()

const loginFormRef = ref<FormInstance>()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    { min: 3, message: '帳號長度至少 3 個字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, message: '密碼長度至少 6 個字符', trigger: 'blur' },
  ],
})

const handleLogin = async () => {
  if (!loginFormRef.value) return

  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const result = await authStore.login(loginForm.username, loginForm.password)
        
        if (result.success) {
          ElMessage.success('登入成功！')
          await navigateTo('/planner')
        } else {
          ElMessage.error(result.message || '登入失敗')
        }
      } catch (error: any) {
        ElMessage.error(error.message || '登入過程發生錯誤')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <AuthContainer subtitle="開啟您的購屋之旅">
    <AuthFormHeader 
      title="會員登入" 
      description="請輸入您的帳號密碼" 
    />

    <ElForm 
      ref="loginFormRef" 
      :model="loginForm" 
      :rules="rules" 
      label-position="top"
      size="large"
      @submit.prevent="handleLogin"
    >
      <BaseInput
        v-model="loginForm.username"
        label="帳號"
        placeholder="請輸入帳號"
        :prefix-icon="User"
        required
      />

      <BaseInput
        v-model="loginForm.password"
        label="密碼"
        type="password"
        placeholder="請輸入密碼"
        :prefix-icon="Lock"
        :show-password="true"
        required
        @keyup.enter="handleLogin"
      />

      <ElFormItem class="mt-6">
        <BaseButton
          type="warning"
          size="large"
          :loading="loading"
          class="w-full"
          @click="handleLogin"
        >
          {{ loading ? '登入中...' : '立即登入' }}
        </BaseButton>
      </ElFormItem>

      <div class="text-center text-sm text-slate-500 mt-4">
        還沒有帳號嗎？
        <NuxtLink to="/auth/register" class="text-amber-500 hover:text-amber-600 font-bold ml-1">
          立即註冊
        </NuxtLink>
      </div>
    </ElForm>

    <template #footer>
      <div class="p-4 bg-blue-50 rounded-xl border border-blue-100">
        <div class="text-sm text-blue-800">
          <div class="font-bold mb-2 flex items-center gap-2 justify-center">
            <ElIcon><InfoFilled /></ElIcon>
            測試帳號
          </div>
          <div class="space-y-1 text-blue-600">
            <div>帳號：<code class="bg-white px-2 py-0.5 rounded">demo</code></div>
            <div>密碼：<code class="bg-white px-2 py-0.5 rounded">demo123</code></div>
          </div>
        </div>
      </div>
    </template>
  </AuthContainer>
</template>

<style scoped lang="scss">
.w-full {
  width: 100%;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-6 {
  margin-top: 1.5rem;
}
</style>
