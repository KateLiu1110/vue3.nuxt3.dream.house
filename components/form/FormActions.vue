<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import BaseButton from '~/components/ui/BaseButton.vue'

interface Props {
  showBack?: boolean
  showNext?: boolean
  backText?: string
  nextText?: string
  nextType?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  backDisabled?: boolean
  nextDisabled?: boolean
  loading?: boolean
  size?: 'large' | 'default' | 'small'
}

withDefaults(defineProps<Props>(), {
  showBack: true,
  showNext: true,
  backText: '上一步',
  nextText: '下一步',
  nextType: 'warning',
  backDisabled: false,
  nextDisabled: false,
  loading: false,
  size: 'large',
})

defineEmits<{
  back: []
  next: []
}>()
</script>

<template>
  <div class="form-actions">
    <slot name="prepend" />
    
    <BaseButton
      v-if="showBack"
      type="default"
      :size="size"
      :disabled="backDisabled"
      @click="$emit('back')"
    >
      <template #icon>
        <ArrowLeft />
      </template>
      {{ backText }}
    </BaseButton>
    
    <div class="flex-1"></div>
    
    <BaseButton
      v-if="showNext"
      :type="nextType"
      :size="size"
      :loading="loading"
      :disabled="nextDisabled"
      @click="$emit('next')"
    >
      {{ nextText }}
      <template #icon-right>
        <ArrowRight />
      </template>
    </BaseButton>
    
    <slot name="append" />
  </div>
</template>

<style scoped lang="scss">
.form-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
}
</style>
