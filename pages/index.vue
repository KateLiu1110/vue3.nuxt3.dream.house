<script setup lang="ts">
import { HomeFilled, Star, ArrowRight, Check, DataAnalysis, DocumentChecked, Top } from '@element-plus/icons-vue'

definePageMeta({
  layout: 'custom',
})

const authStore = useAuthStore()

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Navbar -->
      <nav class="relative z-10 px-6 py-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center shadow-lg">
              <ElIcon :size="24" class="text-slate-900"><HomeFilled /></ElIcon>
            </div>
            <span class="text-2xl font-black text-slate-800">
              Dream<span class="text-amber-500">House</span>
            </span>
          </div>

          <div class="flex items-center gap-4">
            <NuxtLink v-if="!authStore.isAuthenticated" to="/auth/login">
              <ElButton size="large">登入</ElButton>
            </NuxtLink>
            <NuxtLink v-if="!authStore.isAuthenticated" to="/auth/register">
              <ElButton type="primary" size="large">免費註冊</ElButton>
            </NuxtLink>
            <NuxtLink v-if="authStore.isAuthenticated" to="/planner">
              <ElButton type="primary" size="large">進入系統</ElButton>
            </NuxtLink>
          </div>
        </div>
      </nav>

      <!-- Hero Content -->
      <div class="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ElTag type="warning" size="large" class="mb-6">
              <ElIcon class="mr-1"><Star /></ElIcon>
              智能購屋規劃系統
            </ElTag>
            
            <h1 class="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
              開啟您的<br/>
              <span class="text-amber-500">夢幻小屋</span><br/>
              規劃之旅
            </h1>

            <p class="text-xl text-slate-600 mb-8 leading-relaxed">
              從財務規劃到合約簽署，5 個步驟完成您的購屋藍圖。
              讓專業的財務分析工具，幫您找到最適合的購屋方案。
            </p>

            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/auth/register">
                <ElButton type="primary" size="large">
                  立即開始規劃
                  <ElIcon class="ml-2"><ArrowRight /></ElIcon>
                </ElButton>
              </NuxtLink>
              
              <ElButton size="large" @click="scrollToFeatures">
                了解更多
              </ElButton>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-200">
              <div>
                <div class="text-3xl font-black text-amber-600">5</div>
                <div class="text-sm text-slate-600">個簡單步驟</div>
              </div>
              <div>
                <div class="text-3xl font-black text-blue-600">100%</div>
                <div class="text-sm text-slate-600">免費使用</div>
              </div>
              <div>
                <div class="text-3xl font-black text-emerald-600">24/7</div>
                <div class="text-sm text-slate-600">隨時規劃</div>
              </div>
            </div>
          </div>

          <div class="relative hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
              alt="Dream House"
              class="rounded-3xl shadow-2xl"
            />
            <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <ElIcon :size="24" class="text-emerald-600"><Check /></ElIcon>
                </div>
                <div>
                  <div class="font-bold text-slate-800">智能分析</div>
                  <div class="text-sm text-slate-500">AI 驅動財務規劃</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="bg-white py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-black text-slate-900 mb-4">
            為什麼選擇 DreamHouse？
          </h2>
          <p class="text-xl text-slate-600">
            專業、簡單、安全的購屋規劃工具
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <ElCard shadow="hover" class="text-center">
            <ElIcon :size="48" class="text-blue-500 mb-4"><DataAnalysis /></ElIcon>
            <h3 class="text-xl font-bold text-slate-800 mb-3">智能財務分析</h3>
            <p class="text-slate-600">
              自動計算現金流、儲蓄能力，精準預測購屋目標達成時間
            </p>
          </ElCard>

          <ElCard shadow="hover" class="text-center">
            <ElIcon :size="48" class="text-emerald-500 mb-4"><DocumentChecked /></ElIcon>
            <h3 class="text-xl font-bold text-slate-800 mb-3">電子合約簽署</h3>
            <p class="text-slate-600">
              內建電子簽名功能，安全記錄您的購屋意向
            </p>
          </ElCard>

          <ElCard shadow="hover" class="text-center">
            <ElIcon :size="48" class="text-amber-500 mb-4"><Top /></ElIcon>
            <h3 class="text-xl font-bold text-slate-800 mb-3">10 年增值預測</h3>
            <p class="text-slate-600">
              基於 5% 年化報酬率，預測您的資產增長曲線
            </p>
          </ElCard>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gradient-to-r from-amber-400 to-amber-500 py-20">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-black text-slate-900 mb-4">
          開始規劃您的購屋藍圖
        </h2>
        <p class="text-xl text-slate-800 mb-8">
          只需 5 分鐘，完成專屬於您的購屋財務計畫
        </p>
        <NuxtLink to="/auth/register">
          <ElButton type="info" size="large" class="text-lg px-12 py-6">
            立即免費註冊
            <ElIcon class="ml-2"><ArrowRight /></ElIcon>
          </ElButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-slate-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
                <ElIcon :size="20" class="text-slate-900"><HomeFilled /></ElIcon>
              </div>
              <span class="text-xl font-black">
                Dream<span class="text-amber-400">House</span>
              </span>
            </div>
            <p class="text-slate-400">
              讓每個人都能輕鬆規劃自己的購屋之路
            </p>
          </div>

          <div>
            <h4 class="font-bold mb-4">快速連結</h4>
            <div class="space-y-2 text-slate-400">
              <div><NuxtLink to="/auth/login" class="hover:text-white">登入</NuxtLink></div>
              <div><NuxtLink to="/auth/register" class="hover:text-white">註冊</NuxtLink></div>
            </div>
          </div>

          <div>
            <h4 class="font-bold mb-4">聯絡我們</h4>
            <div class="text-slate-400">
              <div>Email: contact@dreamhouse.com</div>
              <div>© 2026 DreamHouse. All rights reserved.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
:deep(.el-button--primary) {
  background: #fbbf24;
  border-color: #fbbf24;
  color: #1e293b;
  font-weight: 700;
}

:deep(.el-button--primary:hover) {
  background: #f59e0b;
  border-color: #f59e0b;
}
</style>
