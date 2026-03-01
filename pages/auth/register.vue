<script setup lang="ts">
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

const registerFormRef = ref<FormInstance>()
const loading = ref(false)

const registerForm = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false,
})

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('請輸入密碼'))
  } else {
    if (registerForm.confirmPassword !== '') {
      registerFormRef.value?.validateField('confirmPassword')
    }
    callback()
  }
}

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('請再次輸入密碼'))
  } else if (value !== registerForm.password) {
    callback(new Error('兩次輸入的密碼不一致'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '請輸入姓名', trigger: 'blur' },
    { min: 2, message: '姓名長度至少 2 個字符', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    { min: 3, max: 20, message: '帳號長度為 3-20 個字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '請輸入電子郵件', trigger: 'blur' },
    { type: 'email', message: '請輸入正確的電子郵件格式', trigger: 'blur' },
  ],
  password: [
    { required: true, validator: validatePassword, trigger: 'blur' },
    { min: 6, message: '密碼長度至少 6 個字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' },
  ],
  agree: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (!value) {
          callback(new Error('請閱讀並同意服務條款和隱私政策'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
})

const handleRegister = async () => {
  if (!registerFormRef.value) return

  await registerFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const result = await authStore.register({
          name: registerForm.name,
          username: registerForm.username,
          email: registerForm.email,
          password: registerForm.password,
        })
        
        if (result.success) {
          ElMessage.success('註冊成功！即將跳轉到購屋規劃頁面...')
          setTimeout(() => {
            navigateTo('/planner')
          }, 1500)
        } else {
          ElMessage.error(result.message || '註冊失敗')
        }
      } catch (error: any) {
        ElMessage.error(error.message || '註冊過程發生錯誤')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <AuthContainer subtitle="註冊會員，開始您的購屋規劃">
    <AuthFormHeader 
      title="會員註冊" 
      description="請填寫以下資訊" 
    />

    <ElForm 
      ref="registerFormRef" 
      :model="registerForm" 
      :rules="rules" 
      label-position="top"
      size="large"
      @submit.prevent="handleRegister"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseInput
          v-model="registerForm.name"
          label="姓名"
          placeholder="請輸入真實姓名"
          required
        />

        <BaseInput
          v-model="registerForm.username"
          label="帳號"
          placeholder="設定您的帳號"
          required
        />

        <div class="md:col-span-2">
          <BaseInput
            v-model="registerForm.email"
            label="電子郵件"
            type="email"
            placeholder="example@email.com"
            required
          />
        </div>

        <BaseInput
          v-model="registerForm.password"
          label="密碼"
          type="password"
          placeholder="至少 6 個字符"
          :show-password="true"
          required
        />

        <BaseInput
          v-model="registerForm.confirmPassword"
          label="確認密碼"
          type="password"
          placeholder="再次輸入密碼"
          :show-password="true"
          required
        />
      </div>

      <ElFormItem prop="agree" class="mt-4">
        <ElCheckbox v-model="registerForm.agree">
          我已閱讀並同意
          <a href="#" class="text-amber-500 hover:text-amber-600 font-bold">服務條款</a>
          及
          <a href="#" class="text-amber-500 hover:text-amber-600 font-bold">隱私政策</a>
        </ElCheckbox>
      </ElFormItem>

      <ElFormItem class="mt-6">
        <BaseButton
          type="warning"
          size="large"
          :loading="loading"
          class="w-full"
          @click="handleRegister"
        >
          {{ loading ? '註冊中...' : '立即註冊' }}
        </BaseButton>
      </ElFormItem>

      <div class="text-center text-sm text-slate-500 mt-4">
        已經有帳號了？
        <NuxtLink to="/auth/login" class="text-amber-500 hover:text-amber-600 font-bold ml-1">
          立即登入
        </NuxtLink>
      </div>
    </ElForm>
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

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.gap-4 {
  gap: 1rem;
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .md\:col-span-2 {
    grid-column: span 2 / span 2;
  }
}
</style>
