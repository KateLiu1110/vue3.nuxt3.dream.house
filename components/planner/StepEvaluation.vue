<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { TrendingUp, ShieldCheck } from 'lucide-vue-next'
import { CircleCheckFilled, Download, PieChart, TrophyBase } from '@element-plus/icons-vue'
import LineChart from '~/components/components/charts/LineChart.vue'
import PieChartComponent from '~/components/components/charts/PieChart.vue'

const store = usePlannerStore()

// 通过父组件传递的 provide
const showReportModal = inject<Ref<boolean>>('showReportModal')!

const showModal = () => {
  showReportModal.value = true
}
</script>

<template>
  <div class="animate-fade-in space-y-8">
    <div class="mb-8">
      <div class="text-amber-600 font-bold text-sm mb-2 uppercase tracking-wider">Step 5</div>
      <h2 class="text-3xl font-black text-slate-800 flex items-center gap-3">
        <TrendingUp class="w-8 h-8 text-amber-500" /> 您的購屋計畫書
      </h2>
    </div>
    
    <!-- 总结 Header -->
    <div class="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-sm gap-8">
      <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-emerald-500"></div>
      <div class="flex-1">
        <div class="text-emerald-600 font-bold text-sm mb-3 flex items-center gap-2 bg-emerald-50 inline-flex px-3 py-1 rounded-full">
          <ElIcon><CircleCheckFilled /></ElIcon> 評估報告已為您準備好
        </div>
        <h2 class="text-4xl font-black text-slate-800 mb-2">{{ store.selectedHouse?.name }}</h2>
        <div class="text-slate-500 text-lg">
          目標總需現金：<span class="text-3xl font-black text-emerald-500 ml-2">${{ store.targetTotalCash.toLocaleString() }}</span>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        <div class="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center w-full sm:w-auto">
          <div class="text-slate-500 font-bold mb-2">預計達成時間</div>
          <div class="text-5xl font-black text-slate-800">
            {{ store.yearsToGoal === -1 ? '>10' : store.yearsToGoal }} 
            <span class="text-2xl text-slate-500">年</span>
          </div>
        </div>
        <ElButton 
          type="warning"
          size="large"
          @click="showModal"
          class="w-full sm:w-auto h-full py-6"
        >
          <ElIcon class="mr-2"><Download /></ElIcon>
          儲存為 PDF<br/>購屋指南
        </ElButton>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 资产增值图表 -->
      <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <h3 class="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <TrendingUp class="w-6 h-6 text-emerald-500" /> 資金成長與購屋目標追蹤
        </h3>
        <p class="text-slate-500 text-sm font-medium mb-6">
          預測基礎：每月穩定存入 ${{ store.monthlySavings.toLocaleString() }}，並投入 5% 報酬率的穩健標的。
        </p>
        
        <div class="h-[300px] w-full">
          <LineChart :data="store.projectionData" />
        </div>
      </div>

      <!-- 成本结构 -->
      <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <h3 class="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <ElIcon class="text-blue-500"><PieChart /></ElIcon> 購屋成本結構
        </h3>
        
        <div class="h-[280px] w-full mb-6">
          <PieChartComponent :data="store.costsPieData" />
        </div>
        
        <div class="space-y-4">
          <div v-for="item in store.costsPieData" :key="item.name" class="flex items-center justify-between p-4 rounded-xl bg-slate-50">
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: item.color }"></div>
              <span class="font-bold text-slate-700">{{ item.name }}</span>
            </div>
            <span class="font-black text-slate-800">${{ item.value.toLocaleString() }}</span>
          </div>
        </div>

        <div class="mt-6 p-5 bg-emerald-50 rounded-xl border-2 border-emerald-200">
          <div class="flex justify-between items-center">
            <span class="font-black text-emerald-800 text-lg">總計</span>
            <span class="font-black text-emerald-600 text-2xl">${{ store.targetTotalCash.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 执行建议 -->
    <div class="bg-slate-50 p-8 rounded-2xl border border-slate-200">
      <h4 class="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
        <ElIcon class="text-emerald-500"><TrophyBase /></ElIcon> 顧問執行建議
      </h4>
      <div class="space-y-4 text-slate-700 leading-relaxed">
        <p class="font-medium">
          <strong class="text-emerald-600">✅ 執行方針：</strong> 
          建議您每月發薪日當天，設定自動轉帳將 <strong class="text-lg">${{ store.monthlySavings.toLocaleString() }}</strong> 轉入購屋專用帳戶。
          並可考慮配置穩健的 ETF (預估 5% 報酬率) 以抵抗通膨。
        </p>
        
        <div class="border-t border-slate-200 pt-4 mt-4">
          <p class="font-black mb-3 text-slate-800 flex items-center gap-2">
            <ElIcon class="text-blue-500"><ShieldCheck /></ElIcon> 簽約防雷提醒：
          </p>
          <ul class="list-disc pl-6 space-y-2">
            <li>務必堅持使用「價金履約保證專戶」，保障款項安全。</li>
            <li>若是購買中古屋，請確認「現況交屋」條款是否免除了屋主的漏水保固責任。</li>
            <li>合約特約條款中，強烈建議加註「若銀行核貸成數不足 8 成，買方得無條件解約退款」。</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <div class="flex justify-center pt-8">
      <ElButton size="large" @click="store.reset(); store.setStep(1)">
        重新規劃新目標
      </ElButton>
    </div>
  </div>
</template>
