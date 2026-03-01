<script setup lang="ts">
import { 
  Money, 
  Calculator, 
  User, 
  UserFilled, 
  ArrowRight,
} from '@element-plus/icons-vue'

interface Props {
  currentSavings: number
  monthlySalary: number
  dailyFood: number
  monthlyTransport: number
  monthlyRent: number
  monthlyEntertainment: number
  monthlySavings: number
  isFinanceValid: boolean
  cashFlowData: Array<{ name: string; value: number; color: string }>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:currentSavings': [value: number]
  'update:monthlySalary': [value: number]
  'update:dailyFood': [value: number]
  'update:monthlyTransport': [value: number]
  'update:monthlyRent': [value: number]
  'update:monthlyEntertainment': [value: number]
  next: []
}>()

const currentSavings = computed({
  get: () => props.currentSavings,
  set: (val) => emit('update:currentSavings', val),
})

const monthlySalary = computed({
  get: () => props.monthlySalary,
  set: (val) => emit('update:monthlySalary', val),
})

const dailyFood = computed({
  get: () => props.dailyFood,
  set: (val) => emit('update:dailyFood', val),
})

const monthlyTransport = computed({
  get: () => props.monthlyTransport,
  set: (val) => emit('update:monthlyTransport', val),
})

const monthlyRent = computed({
  get: () => props.monthlyRent,
  set: (val) => emit('update:monthlyRent', val),
})

const monthlyEntertainment = computed({
  get: () => props.monthlyEntertainment,
  set: (val) => emit('update:monthlyEntertainment', val),
})

const handleNext = () => {
  emit('next')
}
</script>

<template>
  <div class="step-finance animate-fade-in">
    <!-- 首页 Banner -->
    <div class="banner-section">
      <div class="banner-text">
        <div class="welcome-badge">
          <el-icon><UserFilled /></el-icon>
          您好！專屬購屋顧問上線
        </div>
        <h1 class="banner-title">
          為您打造專屬的 <br>
          <span class="highlight">夢幻小屋計畫</span>
        </h1>
        <p class="banner-description">
          買房不只是看房價，更要精算現金流。我們將透過簡單幾個步驟，幫您釐清財務現況，並配對最適合您的溫馨好宅。
        </p>
      </div>
      
      <div class="banner-image">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
          alt="Sunny House"
        >
        <div class="image-overlay" />
        
        <div class="consultant-card animate-bounce-slow">
          <div class="avatar">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" alt="Consultant">
          </div>
          <div>
            <p class="card-title">免費為您試算</p>
            <p class="card-subtitle">只需輸入您的收支狀況</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 表单与摘要 -->
    <div class="content-grid">
      <div class="form-section">
        <h3 class="section-title">
          <el-icon><User /></el-icon>
          第一步：您的財務現況
        </h3>
        <div class="inputs-grid">
          <CleanInput
            v-model="currentSavings"
            label="目前可動用購屋資金"
            :icon="Money"
          />
          <CleanInput
            v-model="monthlySalary"
            label="每月實領薪水"
            :icon="Money"
          />
          
          <div class="expenses-group">
            <h4 class="expenses-title">
              <el-icon><Calculator /></el-icon>
              估算每月生活開銷
            </h4>
            <div class="expenses-grid">
              <CleanInput v-model="dailyFood" label="每日餐費" prefix="$" />
              <CleanInput v-model="monthlyRent" label="月租金/房貸" prefix="$" />
              <CleanInput v-model="monthlyTransport" label="交通費" prefix="$" />
              <CleanInput v-model="monthlyEntertainment" label="娛樂/其他" prefix="$" />
            </div>
          </div>
        </div>
      </div>

      <div class="summary-section">
        <div class="top-bar" />
        <h3 class="summary-title">每月可存金額</h3>
        <p class="summary-subtitle">這將是您未來的購屋引擎</p>
        
        <div class="chart-wrapper">
          <PieChart :data="cashFlowData" inner-radius="70%" outer-radius="90%" />
          <div class="chart-center">
            <span :class="['amount', monthlySavings > 0 ? 'positive' : 'negative']">
              ${{ monthlySavings.toLocaleString() }}
            </span>
          </div>
        </div>

        <el-button
          type="warning"
          size="large"
          :disabled="!isFinanceValid"
          class="next-button"
          @click="handleNext"
        >
          下一步：挑選夢幻小屋
          <el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
        
        <p v-if="!isFinanceValid" class="error-text">
          ※ 每月開銷不可大於薪水喔！
        </p>
      </div>
    </div>
  </div>
</template>
  cashFlowData: Array<{ name: string; value: number; color: string }>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:currentSavings': [value: number]
  'update:monthlySalary': [value: number]
  'update:dailyFood': [value: number]
  'update:monthlyTransport': [value: number]
  'update:monthlyRent': [value: number]
  'update:monthlyEntertainment': [value: number]
  next: []
}>()

const currentSavings = computed({
  get: () => props.currentSavings,
  set: (val) => emit('update:currentSavings', val),
})

const monthlySalary = computed({
  get: () => props.monthlySalary,
  set: (val) => emit('update:monthlySalary', val),
})

const dailyFood = computed({
  get: () => props.dailyFood,
  set: (val) => emit('update:dailyFood', val),
})

const monthlyTransport = computed({
  get: () => props.monthlyTransport,
  set: (val) => emit('update:monthlyTransport', val),
})

const monthlyRent = computed({
  get: () => props.monthlyRent,
  set: (val) => emit('update:monthlyRent', val),
})

const monthlyEntertainment = computed({
  get: () => props.monthlyEntertainment,
  set: (val) => emit('update:monthlyEntertainment', val),
})

const handleNext = () => {
  emit('next')
}
</script>

<style scoped lang="scss">
.step-finance {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.banner-section {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  min-height: 400px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.banner-text {
  position: relative;
  padding: 2rem;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  order: 2;
  background: linear-gradient(to bottom right, white, #f8fafc);

  @media (min-width: 768px) {
    width: 50%;
    order: 1;
    padding: 3rem;
  }
}

.welcome-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 1rem;
  border-radius: 9999px;
  background: #fef3c7;
  color: #b45309;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  width: fit-content;
}

.banner-title {
  font-size: 2.25rem;
  font-weight: 900;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
}

.highlight {
  color: #f59e0b;
}

.banner-description {
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.75;
  margin-bottom: 2rem;
}

.banner-image {
  width: 100%;
  position: relative;
  order: 1;
  height: 16rem;

  @media (min-width: 768px) {
    width: 50%;
    order: 2;
    height: auto;
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, transparent, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.9));

  @media (min-width: 768px) {
    background: linear-gradient(to left, transparent, rgba(255, 255, 255, 0.2), white);
  }
}

.consultant-card {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  padding: 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    bottom: 3rem;
    right: 3rem;
  }
}

.avatar {
  width: 3.5rem;
  height: 3.5rem;
  background: #fef3c7;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
}

.card-subtitle {
  font-size: 0.75rem;
  color: #64748b;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
}

.form-section {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid #f1f5f9;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .el-icon {
    color: #f59e0b;
    font-size: 1.5rem;
  }
}

.inputs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.expenses-group {
  grid-column: 1 / -1;
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #f1f5f9;
}

.expenses-title {
  font-size: 1rem;
  font-weight: 700;
  color: #475569;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .el-icon {
    color: #3b82f6;
    font-size: 1.25rem;
  }
}

.expenses-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.summary-section {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.top-bar {
  position: absolute;
  top: 0;
  width: 100%;
  height: 0.5rem;
  background: linear-gradient(to right, #fde68a, #fbbf24);
}

.summary-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.summary-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.chart-wrapper {
  width: 100%;
  height: 220px;
  position: relative;
  margin-bottom: 1.5rem;
}

.chart-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.amount {
  font-size: 1.875rem;
  font-weight: 900;

  &.positive {
    color: #10b981;
  }

  &.negative {
    color: #ef4444;
  }
}

.next-button {
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  font-weight: 900;
  font-size: 1.125rem;
  transition: all 0.3s;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);

  &:hover:not(:disabled) {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    transform: translateY(-2px);
  }

  &:disabled {
    background: #f1f5f9;
    border-color: #f1f5f9;
    color: #cbd5e1;
    cursor: not-allowed;
    box-shadow: none;
  }
}

.error-text {
  font-size: 0.875rem;
  color: #ef4444;
  font-weight: 500;
  margin-top: 0.75rem;
}
</style>
