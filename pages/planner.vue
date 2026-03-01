<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import TheStepper from '~/components/planner/TheStepper.vue';
import ReportModal from '~/components/planner/TheReportModal.vue';

definePageMeta({
  middleware: 'auth'
});

const store = usePlannerStore();
const showReportModal = ref(false);

// 提供modal控制给子组件
provide('showReportModal', showReportModal);

const currentStepComponent = computed(() => {
  switch (store.currentStep) {
    case 1: return defineAsyncComponent(() => import('~/components/planner/StepFinance.vue'));
    case 2: return defineAsyncComponent(() => import('~/components/planner/StepSearch.vue'));
    case 3: return defineAsyncComponent(() => import('~/components/planner/StepBudget.vue'));
    case 4: return defineAsyncComponent(() => import('~/components/planner/StepContract.vue'));
    case 5: return defineAsyncComponent(() => import('~/components/planner/StepEvaluation.vue'));
    default: return defineAsyncComponent(() => import('~/components/planner/StepFinance.vue'));
  }
});

function handleChangeStep(step: number) {
  if (store.canAccessStep(step)) {
    store.setStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    ElMessage.warning('請先完成當前步驟');
  }
}

function handleNext() {
  const success = store.nextStep();
  if (success) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    ElMessage.warning('請完成所有必填項目後再繼續');
  }
}

function handlePrev() {
  store.prevStep();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Stepper -->
    <TheStepper
      :current-step="store.currentStep"
      :max-reached-step="store.maxReachedStep"
      @change-step="handleChangeStep"
    />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
      <component
        :is="currentStepComponent"
        @next="handleNext"
        @prev="handlePrev"
      />
    </main>

    <!-- Report Modal -->
    <ReportModal v-model="showReportModal" />
  </div>
</template>
