<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

interface Props {
  data: Array<{ value: number; name: string; itemStyle?: { color: string } }>
  title?: string
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: ''
})

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  if (chartInstance) {
    chartInstance.dispose()
  }

  chartInstance = echarts.init(chartRef.value)

  const option: echarts.EChartsOption = {
    title: {
      text: props.title,
      subtext: props.subtitle,
      left: 'center',
      top: props.title || props.subtitle ? '5%' : 'center',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 600
      },
      subtextStyle: {
        color: '#E5E7EB',
        fontSize: 12
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const percent = params.percent.toFixed(1)
        return `${params.name}: ${params.value} (${percent}%)`
      },
      backgroundColor: 'rgba(10, 25, 47, 0.95)',
      borderColor: '#06B6D4',
      borderWidth: 1,
      textStyle: {
        color: '#FFFFFF',
        fontSize: 13
      },
      extraCssText: 'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);'
    },
    legend: {
      orient: 'vertical',
      right: 15,
      top: 'center',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 12
      },
      itemGap: 12,
      itemWidth: 14,
      itemHeight: 14,
      icon: 'circle'
    },
    series: [
      {
        type: 'pie',
        radius: ['38%', '68%'],
        center: ['35%', '52%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#0A192F',
          borderWidth: 3
        },
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 11,
          formatter: '{b}\n{d}%',
          lineHeight: 18
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#06B6D4'
          },
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.6)'
          },
          scale: true,
          scaleSize: 12
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 10,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.25)',
            width: 1.5
          },
          smooth: true
        },
        data: props.data,
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: (idx: number) => Math.random() * 200
      }
    ]
  }

  chartInstance.setOption(option)
}

const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onMounted(() => {
  nextTick(() => {
    initChart()
  })
  window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

watch(() => props.data, () => {
  if (chartInstance) {
    initChart()
  }
}, { deep: true })

// 暴露初始化方法供父组件调用
defineExpose({
  initChart,
  resizeChart
})
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
