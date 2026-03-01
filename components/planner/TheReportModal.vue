<script setup lang="ts">
import { computed, ref } from 'vue'
import { Printer, FullScreen, Clock } from '@element-plus/icons-vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const store = usePlannerStore()
const isFullscreen = ref(false)

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('zh-TW')
})

const handleClose = () => {
  visible.value = false
}

const handlePrint = () => {
  window.print()
}
</script>

<template>
  <ElDialog 
    v-model="visible"
    title="個人購屋計畫書 (列印預覽)"
    width="90%"
    :fullscreen="isFullscreen"
    @close="handleClose"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <span class="font-black text-lg">個人購屋計畫書 (列印預覽)</span>
        <div class="flex gap-2">
          <ElButton @click="handlePrint" type="warning">
            <ElIcon><Printer /></ElIcon>
            列印或儲存 PDF
          </ElButton>
          <ElButton @click="isFullscreen = !isFullscreen" circle>
            <ElIcon><FullScreen /></ElIcon>
          </ElButton>
        </div>
      </div>
    </template>

    <!-- Report Content -->
    <div id="report-content" class="p-10 bg-white text-slate-800 space-y-10">
      <div class="text-center border-b-4 border-amber-400 pb-8 mb-8">
        <h1 class="text-4xl font-black text-slate-900 mb-3">DreamHouse 購屋財務規劃指南</h1>
        <p class="text-slate-500 font-bold">為您量身打造的專屬計畫 • {{ currentDate }}</p>
      </div>

      <div class="grid grid-cols-2 gap-12">
        <!-- 财务现况 -->
        <div>
          <h4 class="text-xl font-black border-l-4 border-blue-500 pl-4 mb-6">1. 您的財務現況</h4>
          <table class="w-full text-base">
            <tbody>
              <tr class="border-b border-slate-100">
                <td class="py-3 text-slate-600">現有可動用資金</td>
                <td class="py-3 font-bold text-right">${{ store.currentSavings.toLocaleString() }}</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="py-3 text-slate-600">每月實領薪水</td>
                <td class="py-3 font-bold text-right">${{ store.monthlySalary.toLocaleString() }}</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="py-3 text-slate-600">每月總生活支出</td>
                <td class="py-3 font-bold text-right text-red-500">-${{ store.totalExpenses.toLocaleString() }}</td>
              </tr>
              <tr class="bg-emerald-50">
                <td class="py-4 pl-3 font-black text-slate-800">每月可投入購屋款</td>
                <td class="py-4 pr-3 font-black text-right text-emerald-600">+${{ store.monthlySavings.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 购屋目标 -->
        <div>
          <h4 class="text-xl font-black border-l-4 border-amber-500 pl-4 mb-6">2. 購屋目標精算</h4>
          <table class="w-full text-base">
            <tbody>
              <tr class="border-b border-slate-100">
                <td class="py-3 text-slate-600">標的物名稱</td>
                <td class="py-3 font-bold text-right text-amber-600">{{ store.selectedHouse?.name }}</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class=" py-3 text-slate-600">房屋總價</td>
                <td class="py-3 font-bold text-right">${{ store.targetHousePrice.toLocaleString() }}</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="py-3 text-slate-600">頭期款現金 ({{ store.downPaymentRate }}%)</td>
                <td class="py-3 font-bold text-right">${{ store.targetDownPayment.toLocaleString() }}</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="py-3 text-slate-600">裝潢與家具預算</td>
                <td class="py-3 font-bold text-right">${{ (store.costsData.renovation + store.costsData.furniture).toLocaleString() }}</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="py-3 text-slate-600">規費與雜支</td>
                <td class="py-3 font-bold text-right">${{ (store.costsData.taxes + store.costsData.misc).toLocaleString() }}</td>
              </tr>
              <tr class="bg-amber-50 border-t-2 border-amber-400">
                <td class="py-4 pl-3 font-black text-slate-900">交屋總需現金</td>
                <td class="py-4 pr-3 font-black text-right text-amber-600 text-lg">${{ store.targetTotalCash.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 顾问建议 -->
      <div class="bg-slate-50 p-8 rounded-2xl border border-slate-200">
        <h4 class="text-xl font-black border-l-4 border-emerald-500 pl-4 mb-6">3. 顧問執行建議</h4>
        <div class="flex items-center gap-4 text-xl bg-white p-6 rounded-xl border border-slate-200 mb-6">
          <ElIcon class="text-emerald-500" :size="32"><Clock /></ElIcon>
          預計達成購屋目標時間：
          <span class="font-black text-3xl text-emerald-600">
            {{ store.yearsToGoal === -1 ? '>10' : store.yearsToGoal }} 年
          </span>
        </div>
        
        <p class="text-base text-slate-700 leading-relaxed mb-6 font-medium">
          <strong>✅ 執行方針：</strong> 建議您每月發薪日當天，設定自動轉帳將 
          <strong>${{ store.monthlySavings.toLocaleString() }}</strong> 轉入購屋專用帳戶。
          並可考慮配置穩健的 ETF (預估 5% 報酬率) 以抵抗通膨。
        </p>
        
        <div class="border-t border-slate-200 pt-6 mt-2">
          <p class="font-black mb-3 text-slate-800">🛡️ 簽約防雷提醒：</p>
          <ul class="list-disc pl-6 space-y-2 font-medium text-slate-700">
            <li>務必堅持使用「價金履約保證專戶」，保障款項安全。</li>
            <li>若是購買中古屋，請確認「現況交屋」條款是否免除了屋主的漏水保固責任。</li>
            <li>合約特約條款中，強烈建議加註「若銀行核貸成數不足 8 成，買方得無條件解約退款」。</li>
          </ul>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t-2 border-slate-200 text-center text-sm text-slate-400">
        <p>
          本報告由 DreamHouse 顧問系統自動生成，為您提供客觀的財務藍圖。<br/>
          買房是人生大事，實際決策請徵詢專業不動產經紀人與您的家人。
        </p>
      </div>
    </div>
  </ElDialog>
</template>

<style scoped>
@media print {
  :deep(.el-dialog__header),
  :deep(.el-dialog__footer) {
    display: none !important;
  }
}
</style>
