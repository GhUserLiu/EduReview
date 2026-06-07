<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

interface SeriesData {
  name: string
  data: number[]
  color?: string
}

interface Props {
  categories: string[]
  series: SeriesData[]
  title?: string
  yAxisLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  yAxisLabel: ''
})

const chartRef = ref<HTMLDivElement>()
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  if (chartInstance) {
    chartInstance.dispose()
  }

  chartInstance = echarts.init(chartRef.value)

  const colors = ['#06B6D4', '#F97316', '#FCD34D', '#22C55E']

  // 创建渐变色
  const createGradient = (color: string) => ({
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: color + '80' }, // 50% opacity
      { offset: 1, color: color + '05' }  // ~2% opacity
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
      backgroundColor: 'rgba(10, 25, 47, 0.95)',
      borderColor: '#06B6D4',
      borderWidth: 1,
      textStyle: {
        color: '#FFFFFF',
        fontSize: 12
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#06B6D4',
          width: 1,
          type: 'dashed'
        }
      }
    },
    legend: {
      data: props.series.map(s => s.name),
      bottom: '3%',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 12
      },
      itemGap: 20
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '12%',
      top: props.title ? '18%' : '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.categories,
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
        show: true,
        lineStyle: {
          color: 'rgba(229, 231, 235, 0.05)',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'value',
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
    series: props.series.map((s, index) => {
      const baseColor = s.color || colors[index % colors.length]
      return {
        name: s.name,
        type: 'line',
        smooth: true,
        data: s.data,
        symbol: 'circle',
        symbolSize: 6,
        showSymbol: false,
        lineStyle: {
          width: 3,
          color: baseColor
        },
        itemStyle: {
          color: baseColor,
          borderColor: '#0A192F',
          borderWidth: 2
        },
        emphasis: {
          scale: true,
          focus: 'series',
          itemStyle: {
            color: baseColor,
            borderColor: baseColor,
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: baseColor
          }
        },
        areaStyle: {
          color: createGradient(baseColor),
          opacity: 1
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

watch(() => [props.categories, props.series], () => {
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
