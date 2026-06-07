<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

interface RadarDataItem {
  name: string
  max: number
}

interface SeriesDataItem {
  value: number[]
  name: string
  areaStyle?: any
}

interface Props {
  indicator: RadarDataItem[]
  data: SeriesDataItem | SeriesDataItem[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: ''
})

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  if (chartInstance) {
    chartInstance.dispose()
  }

  chartInstance = echarts.init(chartRef.value)

  const dataArray = Array.isArray(props.data) ? props.data : [props.data]

  // 为不同数据设置颜色
  const colors = ['#06B6D4', '#F97316', '#FCD34D', '#22C55E', '#EC4899']

  // 创建区域渐变
  const createAreaStyle = (color: string, opacity = 0.25) => ({
    color: {
      type: 'radial',
      x: 0.5,
      y: 0.5,
      r: 0.5,
      colorStops: [
        { offset: 0, color: color + Math.floor(opacity * 255).toString(16).padStart(2, '0') },
        { offset: 1, color: color + '10' }
      ]
    }
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
      trigger: 'item',
      backgroundColor: 'rgba(10, 25, 47, 0.95)',
      borderColor: '#06B6D4',
      borderWidth: 1,
      textStyle: {
        color: '#FFFFFF',
        fontSize: 12
      },
      extraCssText: 'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);'
    },
    legend: {
      data: dataArray.map(item => item.name),
      bottom: '3%',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 11
      },
      itemGap: 18,
      itemWidth: 14,
      itemHeight: 14,
      icon: 'circle'
    },
    radar: {
      indicator: props.indicator,
      center: ['50%', '55%'],
      radius: '62%',
      splitNumber: 4,
      name: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 500,
        padding: [0, 0, 0, 8]
      },
      nameGap: 8,
      splitLine: {
        lineStyle: {
          color: 'rgba(229, 231, 235, 0.25)',
          width: 1
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(6, 182, 212, 0.08)', 'rgba(30, 58, 138, 0.03)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(229, 231, 235, 0.35)',
          width: 1
        }
      },
      axisTick: {
        show: false
      }
    },
    series: dataArray.map((item, index) => {
      const color = colors[index % colors.length]
      return {
        type: 'radar',
        data: [item],
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: {
          width: 2.5,
          color: color
        },
        itemStyle: {
          color: color,
          borderColor: '#0A192F',
          borderWidth: 2
        },
        areaStyle: {
          color: color,
          opacity: 0.25
        },
        emphasis: {
          lineStyle: {
            width: 4,
            shadowBlur: 10,
            shadowColor: color
          },
          itemStyle: {
            color: color,
            borderColor: color,
            borderWidth: 3,
            shadowBlur: 15,
            shadowColor: color
          },
          areaStyle: {
            opacity: 0.35
          },
          scale: true
        },
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        animationDelay: index * 150
      }
    })
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

watch(() => [props.indicator, props.data], () => {
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
  min-height: 280px;
}
</style>
