<script setup lang="ts">
import { CircleCheckFilled, HomeFilled } from '@element-plus/icons-vue';
import { Calculator, FileSpreadsheet, FileText, Search, TrendingUp } from 'lucide-vue-next';

const props = defineProps<{
  currentStep: number
  maxReachedStep: number
}>();

defineEmits<{
  changeStep: [step: number]
}>();

const steps = [
  { num: 1, label: '資金盤點', icon: Calculator },
  { num: 2, label: '挑選房屋', icon: Search },
  { num: 3, label: '預算精算', icon: FileSpreadsheet },
  { num: 4, label: '合約重點', icon: FileText },
  { num: 5, label: '達成評估', icon: TrendingUp }
];

const plannerStore = usePlannerStore();

const isActive = (num: number) => props.currentStep === num;
const isPast = (num: number) => props.currentStep > num;
function isClickable(num: number) {
  // 检查是否可以访问该步骤
  return plannerStore.canAccessStep(num);
}

function getStepClass(num: number) {
  const base = 'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm';

  if (isActive(num)) {
    return `${base} bg-amber-400 text-slate-900 ring-4 ring-amber-100 scale-110`;
  }

  if (isPast(num)) {
    return `${base} bg-white text-amber-500 border-2 border-amber-400 hover:bg-amber-50 cursor-pointer`;
  }

  if (isClickable(num)) {
    return `${base} bg-white text-slate-600 border-2 border-slate-300 hover:bg-slate-50 cursor-pointer`;
  }

  return `${base} bg-white text-slate-400 border-2 border-slate-200 cursor-not-allowed opacity-50`;
}

function getLabelClass(num: number) {
  if (isActive(num)) {
    return 'text-slate-900';
  }

  if (isPast(num)) {
    return 'text-slate-700';
  }

  return 'text-slate-400';
}
</script>

<template>
  <div class="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="hidden lg:flex items-center gap-2 mr-8">
          <div class="bg-amber-400 p-2 rounded-xl text-slate-900 shadow-sm">
            <ElIcon :size="24"><HomeFilled /></ElIcon>
          </div>
          <span class="text-xl font-black tracking-wide text-slate-800">
            Dream<span class="text-amber-500">House</span>
          </span>
        </div>
        
        <!-- Stepper -->
        <div class="flex-1 flex items-center justify-between relative max-w-4xl mx-auto">
          <!-- Background Line -->
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full -z-10"></div>
          <!-- Progress Bar -->
          <div 
            class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-amber-400 rounded-full -z-10 transition-all duration-500"
            :style="{ width: `${((currentStep - 1) / 4) * 100}%` }"
          ></div>

          <div 
            v-for="step in steps" 
            :key="step.num"
            class="flex flex-col items-center gap-2 relative z-10"
          >
            <button 
              @click="isClickable(step.num) && $emit('changeStep', step.num)"
              :disabled="!isClickable(step.num)"
              :class="getStepClass(step.num)"
            >
              <ElIcon v-if="isPast(step.num)" :size="20"><CircleCheckFilled /></ElIcon>
              <component v-else :is="step.icon" class="w-5 h-5" />
            </button>
            <span :class="getLabelClass(step.num)" class="text-sm font-bold hidden sm:block">
              {{ step.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
