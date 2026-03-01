<script setup lang="ts">
import { FileText } from 'lucide-vue-next'
import { DocumentChecked, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const emit = defineEmits<{
  next: []
  prev: []
}>()

const store = usePlannerStore()

const contractContent = [
  { 
    title: "壹、買賣標的與面積", 
    content: "已經為您確認房屋標的。\n請仔細核對：\n- 權狀總坪數與主建物坪數是否相符\n- 車位是屬於法定停車位還是增設停車位\n\n小提醒：若為日本物件，面積計算方式不含陽台，請以『專有面積』為準喔！" 
  },
  { 
    title: "貳、付款條件與履約保證", 
    content: "為了您的資金安全，建議一律採用「價金履約保證」。\n付款分為四期：\n1. 簽約款 (通常為10%)\n2. 備證用印款 (通常為10%)\n3. 完稅款 (通常為10%)\n4. 交屋尾款 (貸款70%)\n\n安心建議：合約務必加註『若貸款成數不足8成，買方得無條件解約』。" 
  },
  { 
    title: "參、現況說明與瑕疵擔保", 
    content: "屋主需對房屋現況負責（契約不適合責任）。\n應確認項目：\n- 是否有漏水、壁癌紀錄\n- 是否為輻射屋或海砂屋\n\n贴心提醒：中古屋若約定『現況交屋』，交屋前務必詳細驗屋，保障自身權益！" 
  }
]

const handleComplete = () => {
  store.acceptContract()
  emit('next')
}
</script>

<template>
  <div class="animate-fade-in space-y-8 max-w-4xl mx-auto">
    <div class="mb-8">
      <div class="text-amber-600 font-bold text-sm mb-2 uppercase tracking-wider">Step 4</div>
      <h2 class="text-3xl font-black text-slate-800 flex items-center gap-3">
        <FileText class="w-8 h-8 text-amber-500" /> 合約重點畫線
      </h2>
    </div>

    <div class="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
      <div class="bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-2xl min-h-[350px] flex flex-col shadow-inner">
        <div class="flex justify-between items-center border-b border-slate-200 pb-6 mb-8">
          <span class="font-black text-2xl text-slate-800 flex items-center gap-3">
            <ElIcon class="text-emerald-500"><DocumentChecked /></ElIcon>
            {{ contractContent[store.contractPage].title }}
          </span>
          <span class="font-bold text-slate-400 bg-white px-3 py-1 rounded-lg border border-slate-200">
            頁數 {{ store.contractPage + 1 }} / {{ contractContent.length }}
          </span>
        </div>
        
        <p class="text-slate-700 leading-loose whitespace-pre-line text-lg flex-1 font-medium">
          {{ contractContent[store.contractPage].content }}
        </p>
        
        <div class="flex justify-center items-center gap-8 mt-10">
          <ElButton 
            circle
            size="large"
            @click="store.contractPage = Math.max(0, store.contractPage - 1)"
            :disabled="store.contractPage === 0"
          >
            <ElIcon><ArrowLeft /></ElIcon>
          </ElButton>
          
          <div class="flex gap-3">
            <div 
              v-for="(_, idx) in contractContent" 
              :key="idx"
              :class="idx === store.contractPage ? 'bg-amber-400 scale-125' : 'bg-slate-300'"
              class="w-3 h-3 rounded-full transition-all"
            ></div>
          </div>

          <ElButton 
            circle
            size="large"
            @click="store.contractPage = Math.min(contractContent.length - 1, store.contractPage + 1)"
            :disabled="store.contractPage === contractContent.length - 1"
          >
            <ElIcon><ArrowRight /></ElIcon>
          </ElButton>
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <div class="flex justify-between items-center pt-8 border-t border-slate-200">
      <ElButton size="large" @click="$emit('prev')">
        <ElIcon><ArrowLeft /></ElIcon>
        返回修改預算
      </ElButton>
      <ElButton 
        type="success"
        size="large"
        @click="handleComplete"
        :disabled="store.contractPage < contractContent.length - 1"
      >
        {{ store.contractPage === contractContent.length - 1 ? '我已了解合約，觀看最終評估報告' : '請先看完所有合約教學喔' }}
        <ElIcon class="ml-2"><ArrowRight /></ElIcon>
      </ElButton>
    </div>
  </div>
</template>
