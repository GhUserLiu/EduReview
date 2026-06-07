<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

interface BarDataItem {
  value: number
  itemStyle?: { color: string }
}

interface Props {
  categories: string[]
  data: BarDataItem[]
  title?: string
  yAxisLabel?: string
  horizontal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  yAxisLabel: '',
  horizontal: false
})

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  if (chartInstance) {
    chartInstance.dispose()
  }

  chartInstance = echarts.init(chartRef.value)

  const colors = props.data.map(item => item.itemStyle?.color || '#3B82F6')
  const values = props.data.map(item => item.value)

  // 创建渐变色
  const createGradient = (color: string) => ({
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color },
      { offset: 1, color: `${color}CC` }
    ]
  })

  const option: echarts.EChartsOption = {
    title: {
      text: props.title,
      left: 'center',
      top: '3%',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 600
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(10, 25, 47, 0.95)',
      borderColor: '#06B6D4',
      borderWidth: 1,
      textStyle: {
        color: '#FFFFFF',
        fontSize: 12
      }
    },
    grid: {
      left: props.horizontal ? '22%' : '8%',
      right: '6%',
      bottom: props.horizontal ? '8%' : '12%',
      top: props.title ? '18%' : '5%',
      containLabel: true
    },
    xAxis: {
      type: props.horizontal ? 'value' : 'category',
      data: props.horizontal ? undefined : props.categories,
      axisLine: {
        lineStyle: {
          color: 'rgba(229, 231, 235, 0.3)',
          width: 1
        }
      },
      axisLabel: {
        color: '#FFFFFF',
        fontSize: 11,
        interval: 0,
        rotate: 0
      },
      axisTick: {
        lineStyle: {
          color: 'rgba(229, 231, 235, 0.2)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(229, 231, 235, 0.08)',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: props.horizontal ? 'category' : 'value',
      data: props.horizontal ? props.categories : undefined,
      name: props.yAxisLabel,
      nameTextStyle: {
        color: '#E5E7EB',
        fontSize: 11
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(229, 231, 235, 0.3)',
          width: 1
        }
      },
      axisLabel: {
        color: '#FFFFFF',
        fontSize: 11
      },
      axisTick: {
        lineStyle: {
          color: 'rgba(229, 231, 235, 0.2)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(229, 231, 235, 0.08)',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        type: 'bar',
        data: props.horizontal ? values.map((v, i) => ({
          value: v,
          itemStyle: { color: createGradient(colors[i]) }
        })) : values.map((v, i) => ({
          value: v,
          itemStyle: { color: createGradient(colors[i]) }
        })),
        itemStyle: {
          borderRadius: props.horizontal ? [0, 4, 4, 0] : [6, 6, 0, 0],
          borderColor: '#0A192F',
          borderWidth: 1
        },
        barWidth: '55%',
        label: {
          show: true,
          position: props.horizontal ? 'right' : 'top',
          color: '#FFFFFF',
          fontSize: 11,
          formatter: (params: any) => params.value?.toString() || '',
          textShadowColor: '#000',
          textShadowBlur: 2
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.4)'
          },
          scale: true
        },
        animationDelay: (idx: number) => idx * 50,
        animationDuration: 800,
        animationEasing: 'elasticOut'
      }
    ]
  }

  chartInstance.setOption(option, true)
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

watch(() => [props.categories, props.data], () => {
  if (chartInstance) {
    initChart()
  }
}, { deep: true })

defineExpose({
  initChart,
  resizeChart
})
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 220px;
}
</style>
