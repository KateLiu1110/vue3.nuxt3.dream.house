<script setup lang="ts">
import { FileSpreadsheet } from 'lucide-vue-next'
import { Lock, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const emit = defineEmits<{
  next: []
  prev: []
}>()

const store = usePlannerStore()
</script>

<template>
  <div class="animate-fade-in space-y-8">
    <div class="mb-8">
      <div class="text-amber-600 font-bold text-sm mb-2 uppercase tracking-wider">Step 3</div>
      <h2 class="text-3xl font-black text-slate-800 flex items-center gap-3">
        <FileSpreadsheet class="w-8 h-8 text-amber-500" /> 購屋預算精算表
      </h2>
    </div>
    
    <div class="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <p class="text-slate-500 font-medium mb-1">您目前選擇的夢幻小屋：</p>
          <h3 class="text-2xl font-black text-slate-800">{{ store.selectedHouse?.name }}</h3>
          <p class="text-sm text-amber-600 font-bold mt-2 bg-amber-50 inline-block px-3 py-1 rounded-lg">
            ※ 點擊下方表格內的數字即可修改預估金額
          </p>
        </div>
        <div class="bg-emerald-50 border border-emerald-100 px-8 py-4 rounded-2xl flex flex-col items-end">
          <span class="text-sm font-bold text-emerald-700 mb-1">交屋當日總需現金</span>
          <span class="text-3xl font-black text-emerald-600">
            ${{ store.targetTotalCash.toLocaleString() }}
          </span>
        </div>
      </div>

      <!-- Excel-like Table -->
      <div class="border border-slate-200 rounded-2xl overflow-hidden bg-white">
        <!-- 表头 -->
        <div class="grid grid-cols-12 bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
          <div class="col-span-1 p-4 border-r border-slate-200 text-center">項次</div>
          <div class="col-span-4 p-4 border-r border-slate-200">預算項目</div>
          <div class="col-span-3 p-4 border-r border-slate-200 text-right">預估金額 (TWD)</div>
          <div class="col-span-4 p-4">備註說明</div>
        </div>

        <!-- 行1:房屋总价 -->
        <div class="grid grid-cols-12 border-b border-slate-100 bg-slate-50/50">
          <div class="col-span-1 p-4 border-r border-slate-100 text-center text-slate-400">1</div>
          <div class="col-span-4 p-4 border-r border-slate-100 text-slate-800 font-bold">房屋總價</div>
          <div class="col-span-3 p-4 border-r border-slate-100 text-right text-slate-600 font-medium">
            ${{ store.targetHousePrice.toLocaleString() }}
          </div>
          <div class="col-span-4 p-4 text-slate-500 text-sm flex items-center">
            <ElIcon class="mr-1"><Lock /></ElIcon> 固定金額 (來自所選物件)
          </div>
        </div>

        <!-- 行2:头期款 -->
        <div class="grid grid-cols-12 border-b border-slate-100">
          <div class="col-span-1 p-4 border-r border-slate-100 text-center text-slate-400">2</div>
          <div class="col-span-4 p-4 border-r border-slate-100 text-blue-600 font-bold">頭期款現金</div>
          <div class="col-span-3 p-4 border-r border-slate-100 text-right font-bold text-blue-700 bg-blue-50/50">
            ${{ store.targetDownPayment.toLocaleString() }}
          </div>
          <div class="col-span-4 p-3 flex items-center gap-2">
            <span class="text-slate-500 text-sm">比例：</span>
            <ElSelect v-model="store.downPaymentRate" size="small">
              <ElOption :value="20" label="20% (首購標準)" />
              <ElOption :value="25" label="25%" />
              <ElOption :value="30" label="30% (投資/第二戶)" />
            </ElSelect>
          </div>
        </div>

        <!-- 行3:装潢 -->
        <div class="grid grid-cols-12 border-b border-slate-100 hover:bg-amber-50/30">
          <div class="col-span-1 p-4 border-r border-slate-100 text-center text-slate-400">3</div>
          <div class="col-span-4 p-4 border-r border-slate-100 text-slate-700 font-bold">室內裝潢工程</div>
          <div class="col-span-3 p-4 border-r border-slate-100">
            <ElInputNumber 
              v-model="store.costsData.renovation" 
              :min="0" 
              :step="100000"
              controls-position="right"
              class="w-full"
            />
          </div>
          <div class="col-span-4 p-4 text-slate-500 text-sm">建議抓每坪 5~8 萬</div>
        </div>

        <!-- 行4:家具 -->
        <div class="grid grid-cols-12 border-b border-slate-100 hover:bg-amber-50/30">
          <div class="col-span-1 p-4 border-r border-slate-100 text-center text-slate-400">4</div>
          <div class="col-span-4 p-4 border-r border-slate-100 text-slate-700 font-bold">家具與家電購置</div>
          <div class="col-span-3 p-4 border-r border-slate-100">
            <ElInputNumber 
              v-model="store.costsData.furniture" 
              :min="0" 
              :step="50000"
              controls-position="right"
              class="w-full"
            />
          </div>
          <div class="col-span-4 p-4 text-slate-500 text-sm">冷氣、冰箱、床墊等大宗開銷</div>
        </div>

        <!-- 行5:税费 -->
        <div class="grid grid-cols-12 border-b border-slate-100 hover:bg-amber-50/30">
          <div class="col-span-1 p-4 border-r border-slate-100 text-center text-slate-400">5</div>
          <div class="col-span-4 p-4 border-r border-slate-100 text-slate-700 font-bold">契稅與規費代書</div>
          <div class="col-span-3 p-4 border-r border-slate-100">
            <ElInputNumber 
              v-model="store.costsData.taxes" 
              :min="0" 
              :step="10000"
              controls-position="right"
              class="w-full"
            />
          </div>
          <div class="col-span-4 p-4 text-slate-500 text-sm">契稅、印花稅、代書費 (約房價 1-2%)</div>
        </div>

        <!-- 行6:杂支 -->
        <div class="grid grid-cols-12 border-b border-slate-100 hover:bg-amber-50/30">
          <div class="col-span-1 p-4 border-r border-slate-100 text-center text-slate-400">6</div>
          <div class="col-span-4 p-4 border-r border-slate-100 text-slate-700 font-bold">搬遷與其他雜支</div>
          <div class="col-span-3 p-4 border-r border-slate-100">
            <ElInputNumber 
              v-model="store.costsData.misc" 
              :min="0" 
              :step="10000"
              controls-position="right"
              class="w-full"
            />
          </div>
          <div class="col-span-4 p-4 text-slate-500 text-sm">包含保險、仲介費等</div>
        </div>

        <!-- 总计行 -->
        <div class="grid grid-cols-12 bg-emerald-50 border-t-2 border-emerald-400">
          <div class="col-span-5 p-5 border-r border-emerald-200 text-right font-black text-emerald-800 text-lg">
            總目標現金：
          </div>
          <div class="col-span-3 p-5 border-r border-emerald-200 text-right text-emerald-600 font-black text-2xl">
            ${{ store.targetTotalCash.toLocaleString() }}
          </div>
          <div class="col-span-4 p-5 text-sm text-emerald-700 font-medium flex items-center">
            此為您交屋當天需準備的現金總額
          </div>
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <div class="flex justify-between items-center pt-8 border-t border-slate-200">
      <ElButton size="large" @click="$emit('prev')">
        <ElIcon><ArrowLeft /></ElIcon>
        返回重新挑選
      </ElButton>
      <ElButton type="warning" size="large" @click="$emit('next')">
        確認預算，進入合約教學
        <ElIcon class="ml-2"><ArrowRight /></ElIcon>
      </ElButton>
    </div>
  </div>
</template>
