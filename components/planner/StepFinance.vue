<script setup lang="ts">
import { UserFilled, User, ArrowRight } from '@element-plus/icons-vue'

const emit = defineEmits<{
  next: []
}>()

const store = usePlannerStore()
</script>

<template>
  <div class="animate-fade-in space-y-8">
    <!-- Banner -->
    <div class="relative rounded-3xl overflow-hidden bg-white shadow-xl flex flex-col md:flex-row min-h-[400px]">
      <div class="relative p-8 md:p-12 z-10 w-full md:w-1/2 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold mb-6">
          <ElIcon><UserFilled /></ElIcon> 您好！專屬購屋顧問上線
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-slate-800 mb-4 leading-tight">
          為您打造專屬的 <br/>
          <span class="text-amber-500">夢幻小屋計畫</span>
        </h1>
        <p class="text-slate-600 text-lg leading-relaxed mb-8">
          買房不只是看房價，更要精算現金流。我們將透過簡單幾個步驟，幫您釐清財務現況，並配對最適合您的溫馨好宅。
        </p>
      </div>
      
      <div class="w-full md:w-1/2 relative h-64 md:h-auto">
        <img 
          src= "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
          alt="Sunny House" 
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-white/20 to-white/90 md:to-white"></div>
      </div>
    </div>

    <!-- 输入表单 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <ElIcon class="text-amber-500"><User /></ElIcon> 第一步：您的財務現況
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ElFormItem label="目前可動用購屋資金">
            <ElInputNumber 
              v-model="store.currentSavings" 
              :min="0" 
              :step="100000"
              class="w-full"
              size="large"
            />
          </ElFormItem>
          <ElFormItem label="每月實領薪水">
            <ElInputNumber 
              v-model="store.monthlySalary" 
              :min="0"
              :step="1000" 
              class="w-full"
              size="large"
            />
          </ElFormItem>
          
          <div class="md:col-span-2 bg-slate-50 p-6 rounded-2xl">
            <h4 class="text-base font-bold text-slate-700 mb-4">估算每月生活開銷</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ElFormItem label="每日餐費">
                <ElInputNumber v-model="store.dailyFood" :min="0" size="large" class="w-full" />
              </ElFormItem>
              <ElFormItem label="月租金/房貸">
                <ElInputNumber v-model="store.monthlyRent" :min="0" size="large" class="w-full" />
              </ElFormItem>
              <ElFormItem label="交通費">
                <ElInputNumber v-model="store.monthlyTransport" :min="0" size="large" class="w-full" />
              </ElFormItem>
              <ElFormItem label="娛樂/其他">
                <ElInputNumber v-model="store.monthlyEntertainment" :min="0" size="large" class="w-full" />
              </ElFormItem>
            </div>
          </div>
        </div>
      </div>

      <!-- 结果显示 -->
      <div class="lg:col-span-1 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
        <div class="absolute top-0 w-full h-2 bg-gradient-to-r from-amber-300 to-amber-500"></div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">每月可存金額</h3>
        <p class="text-sm text-slate-500 mb-6">這將是您未來的購屋引擎</p>
        
        <div class="text-center mb-8">
          <div :class="store.monthlySavings > 0 ? 'text-emerald-500' : 'text-red-500'" class="text-4xl font-black">
            ${{ store.monthlySavings.toLocaleString() }}
          </div>
        </div>

        <ElButton 
          type="warning"
          size="large"
          @click="$emit('next')"
          :disabled="!store.isFinanceValid"
          class="w-full"
        >
          下一步：挑選夢幻小屋
          <ElIcon class="ml-2"><ArrowRight /></ElIcon>
        </ElButton>
        
        <p v-if="!store.isFinanceValid" class="text-sm text-red-500 font-medium mt-3">
          ※ 每月開銷不可大於薪水喔！
        </p>
      </div>
    </div>
  </div>
</template>
