<script setup lang="ts">
import { 
  House, 
  Calculator, 
  Search, 
  DocumentCopy, 
  Document, 
  TrendingUp,
  SuccessFilled,
} from '@element-plus/icons-vue'

interface Props {
  currentStep: number
  maxReachedStep: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  goToStep: [step: number]
}>()

const steps = [
  { num: 1, label: '資金盤點', icon: Calculator },
  { num: 2, label: '挑選房屋', icon: Search },
  { num: 3, label: '預算精算', icon: DocumentCopy },
  { num: 4, label: '合約重點', icon: Document },
  { num: 5, label: '達成評估', icon: TrendingUp },
]

const isStepActive = (stepNum: number) => props.currentStep === stepNum
const isStepPast = (stepNum: number) => props.currentStep > stepNum
const isStepClickable = (stepNum: number) => stepNum <= props.maxReachedStep

const getStepClass = (stepNum: number) => {
  const classes = ['step-button']
  if (isStepActive(stepNum)) classes.push('step-active')
  else if (isStepPast(stepNum)) classes.push('step-past')
  else classes.push('step-future')
  return classes.join(' ')
}

const getStepLabelClass = (stepNum: number) => {
  const classes = ['step-label']
  if (isStepActive(stepNum)) classes.push('label-active')
  else if (isStepPast(stepNum)) classes.push('label-past')
  else classes.push('label-future')
  return classes.join(' ')
}

const getStepIcon = (stepNum: number) => {
  if (isStepPast(stepNum)) return SuccessFilled
  return steps.find(s => s.num === stepNum)?.icon
}

const onStepClick = (stepNum: number) => {
  if (isStepClickable(stepNum)) {
    emit('goToStep', stepNum)
  }
}
</script>

<template>
  <div class="stepper-wrapper">
    <div class="stepper-container">
      <div class="stepper-content">
        <div class="logo-section">
          <div class="logo-icon">
            <el-icon :size="24"><House /></el-icon>
          </div>
          <span class="logo-text">
            Dream<span class="logo-highlight">House</span>
          </span>
        </div>
        
        <div class="steps-container">
          <div class="progress-bg" />
          <div 
            class="progress-fill" 
            :style="{ width: `${((currentStep - 1) / 4) * 100}%` }"
          />

          <div
            v-for="step in steps"
            :key="step.num"
            class="step-item"
          >
            <button
              :class="getStepClass(step.num)"
              :disabled="!isStepClickable(step.num)"
              @click="onStepClick(step.num)"
            >
              <component :is="getStepIcon(step.num)" class="step-icon" />
            </button>
            <span :class="getStepLabelClass(step.num)">
              {{ step.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

const props = defineProps<Props>()

const emit = defineEmits<{
  goToStep: [step: number]
}>()

const steps = [
  { num: 1, label: '資金盤點', icon: Calculator },
  { num: 2, label: '挑選房屋', icon: Search },
  { num: 3, label: '預算精算', icon: DocumentCopy },
  { num: 4, label: '合約重點', icon: Document },
  { num: 5, label: '達成評估', icon: TrendingUp },
]

const isStepActive = (stepNum: number) => props.currentStep === stepNum
const isStepPast = (stepNum: number) => props.currentStep > stepNum
const isStepClickable = (stepNum: number) => stepNum <= props.maxReachedStep

const getStepClass = (stepNum: number) => {
  const classes = ['step-button']
  if (isStepActive(stepNum)) classes.push('step-active')
  else if (isStepPast(stepNum)) classes.push('step-past')
  else classes.push('step-future')
  return classes.join(' ')
}

const getStepLabelClass = (stepNum: number) => {
  const classes = ['step-label']
  if (isStepActive(stepNum)) classes.push('label-active')
  else if (isStepPast(stepNum)) classes.push('label-past')
  else classes.push('label-future')
  return classes.join(' ')
}

const getStepIcon = (stepNum: number) => {
  if (isStepPast(stepNum)) return SuccessFilled
  return steps.find(s => s.num === stepNum)?.icon
}

const onStepClick = (stepNum: number) => {
  if (isStepClickable(stepNum)) {
    emit('goToStep', stepNum)
  }
}
</script>

<style scoped lang="scss">
.stepper-wrapper {
  width: 100%;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 40;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.stepper-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
}

.stepper-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo-section {
  display: none;
  align-items: center;
  gap: 0.5rem;
  margin-right: 2rem;

  @media (min-width: 1024px) {
    display: flex;
  }
}

.logo-icon {
  background: #fbbf24;
  padding: 0.5rem;
  border-radius: 0.75rem;
  color: #1e293b;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: 0.025em;
  color: #1e293b;
}

.logo-highlight {
  color: #f59e0b;
}

.steps-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  max-width: 64rem;
  margin: 0 auto;
}

.progress-bg {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 4px;
  background: #f1f5f9;
  border-radius: 9999px;
  z-index: -10;
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 4px;
  background: #fbbf24;
  border-radius: 9999px;
  z-index: -10;
  transition: width 0.5s ease-in-out;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 10;
}

.step-button {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  .step-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.step-active {
  background: #fbbf24;
  color: #1e293b;
  box-shadow: 0 0 0 4px rgb(251 191 36 / 0.2);
  transform: scale(1.1);
}

.step-past {
  background: white;
  color: #f59e0b;
  border: 2px solid #fbbf24;

  &:hover {
    background: #fef3c7;
  }
}

.step-future {
  background: white;
  color: #cbd5e1;
  border: 2px solid #e2e8f0;
}

.step-label {
  font-size: 0.875rem;
  font-weight: 700;
  display: none;
  transition: color 0.3s;

  @media (min-width: 640px) {
    display: block;
  }
}

.label-active {
  color: #1e293b;
}

.label-past {
  color: #475569;
}

.label-future {
  color: #cbd5e1;
}
</style>
