<script setup lang="ts">
import { computed } from 'vue'
import { Search } from 'lucide-vue-next'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import housesData from '~/server/data/houses.json'

const emit = defineEmits<{
  next: []
  prev: []
}>()

const store = usePlannerStore()

const filteredHouses = computed(() => {
  return housesData.filter(h => {
    const matchRegion = store.filterRegion === '全部' || h.region === store.filterRegion
    const matchType = store.filterType === '全部' || h.type === store.filterType
    return matchRegion && matchType
  })
})

const isSelected = (house: any) => store.selectedHouse?.id === house.id
</script>

<template>
  <div class="animate-fade-in space-y-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div class="mb-8">
        <div class="text-amber-600 font-bold text-sm mb-2 uppercase tracking-wider">Step 2</div>
        <h2 class="text-3xl font-black text-slate-800 flex items-center gap-3">
          <Search class="w-8 h-8 text-amber-500" /> 挑選您的夢幻小屋
        </h2>
      </div>
    </div>

    <!-- 筛选器 -->
    <div class="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-3 items-center">
      <div class="flex bg-slate-50 rounded-xl p-1.5 border border-slate-200">
        <button 
          v-for="region in ['全部', '北', '中', '南', '日本']" 
          :key="region"
          @click="store.filterRegion = region"
          :class="store.filterRegion === region ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
          class="px-5 py-2 rounded-lg text-sm font-bold transition-all"
        >
          {{ region }}
        </button>
      </div>
      <div class="h-8 w-px bg-slate-200 mx-2"></div>
      <div class="flex bg-slate-50 rounded-xl p-1.5 border border-slate-200">
        <button 
          v-for="type in ['全部', '預售', '中古']" 
          :key="type"
          @click="store.filterType = type"
          :class="store.filterType === type ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
          class="px-5 py-2 rounded-lg text-sm font-bold transition-all"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <!-- 房屋列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="house in filteredHouses" 
        :key="house.id"
        @click="store.selectHouse(house)"
        :class="isSelected(house) ? 'ring-4 ring-amber-400 shadow-xl scale-[1.02]' : 'border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1'"
        class="bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
      >
        <div class="h-56 overflow-hidden relative">
          <img :src="house.img" :alt="house.name" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
          <div class="absolute top-4 left-4 flex gap-2">
            <span class="bg-white/90 backdrop-blur text-slate-800 font-bold text-xs px-3 py-1.5 rounded-lg">{{ house.region }}</span>
            <span :class="house.type === '預售' ? 'bg-blue-500/90' : 'bg-emerald-500/90'" class="text-white font-bold text-xs px-3 py-1.5 rounded-lg">{{ house.type }}</span>
          </div>
        </div>
        
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h4 class="font-black text-xl text-slate-800">{{ house.name }}</h4>
            <span class="text-amber-600 font-black text-xl">${{ (house.price / 10000).toFixed(0) }} 萬</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-6">
            <span v-for="tag in house.tags" :key="tag" class="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">{{ tag }}</span>
            <span class="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">{{ house.layout }}</span>
          </div>
          
          <button :class="isSelected(house) ? 'bg-amber-100 text-amber-700' : 'bg-slate-50 text-slate-500 hover:bg-amber-400 hover:text-slate-900'" class="w-full py-3 rounded-xl font-bold transition-colors">
            {{ isSelected(house) ? '✓ 已選擇此物件' : '選擇此房屋' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <div class="flex justify-between items-center pt-8 mt-4 border-t border-slate-200">
      <ElButton size="large" @click="$emit('prev')">
        <ElIcon><ArrowLeft /></ElIcon>
        返回修改資金
      </ElButton>
      <ElButton 
        type="warning"
        size="large"
        @click="$emit('next')"
        :disabled="!store.selectedHouse"
      >
        {{ store.selectedHouse ? '選定房屋，開始精算預算' : '請先點選您喜歡的房屋' }}
        <ElIcon class="ml-2"><ArrowRight /></ElIcon>
      </ElButton>
    </div>
  </div>
</template>
