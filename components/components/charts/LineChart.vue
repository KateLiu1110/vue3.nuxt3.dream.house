<script setup lang="ts">
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([LineChart, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer])

interface DataItem {
  year: string
  assets: number
  target: number
  houseValue: number
}

interface Props {
  data: DataItem[]
}

const props = defineProps<Props>()

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const option = computed(() => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    borderWidth: 0,
    padding: 12,
    textStyle: {
      color: '#1e293b',
      fontWeight: 600,
    },
    formatter: (params: any) => {
      let result = `${params[0].axisValue}<br/>`
      params.forEach((item: any) => {
        result += `${item.marker} ${item.seriesName}: $${item.value.toLocaleString()}<br/>`
      })
      return result
    },
  },
  legend: {
    top: 0,
    textStyle: {
      fontWeight: 600,
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: props.data.map(d => d.year),
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#94a3b8',
      fontSize: 12,
      margin: 10,
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#94a3b8',
      fontSize: 12,
      formatter: (value: number) => `${(value / 10000).toFixed(0)}W`,
    },
    splitLine: {
      lineStyle: {
        color: '#e2e8f0',
      },
    },
  },
  series: [
    {
      name: '您的累積資金',
      type: 'line',
      data: props.data.map(d => d.assets),
      smooth: true,
      lineStyle: {
        width: 4,
        color: '#10b981',
      },
      itemStyle: {
        color: '#10b981',
      },
      symbol: 'circle',
      symbolSize: 8,
    },
    {
      name: '目標總金額',
      type: 'line',
      data: props.data.map(d => d.target),
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#f97316',
        type: 'dashed',
      },
      itemStyle: {
        color: '#f97316',
      },
      symbol: 'none',
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
  min-height: 300px;
}
</style>
