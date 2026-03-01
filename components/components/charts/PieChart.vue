<script setup lang="ts">
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer])

interface Props {
  data: Array<{ name: string; value: number; color: string }>
  innerRadius?: string
  outerRadius?: string
}

const props = withDefaults(defineProps<Props>(), {
  innerRadius: '60%',
  outerRadius: '80%',
})

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: ${c}',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    borderWidth: 0,
    padding: 12,
    textStyle: {
      color: '#1e293b',
      fontWeight: 600,
    },
  },
  series: [
    {
      type: 'pie',
      radius: [props.innerRadius, props.outerRadius],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 4,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: false,
        },
        scale: true,
        scaleSize: 10,
      },
      data: props.data.map(item => ({
        value: item.value,
        name: item.name,
        itemStyle: {
          color: item.color,
        },
      })),
    },
  ],
}))

onMounted(() => {
  if (process.client && chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(option.value)
    
    const handleResize = () => {
      chartInstance?.resize()
    }
    
    window.addEventListener('resize', handleResize)
    
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
      chartInstance?.dispose()
    })
  }
})

watch(() => props.data, () => {
  if (chartInstance) {
    chartInstance.setOption(option.value)
  }
}, { deep: true })
</script>

<template>
  <div ref="chartRef" class="chart-container" />
</template>

<style scoped lang="scss">
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
