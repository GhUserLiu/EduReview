<template>
  <el-dialog
    v-model="visible"
    title="课堂分析 - 错误类型统计分析"
    width="800px"
    @close="handleClose"
  >
    <div class="error-analysis-content">
      <div class="analysis-charts">
        <!-- 左侧：错误类型占比环形图 -->
        <div class="analysis-chart pie-chart-wrapper">
          <div class="chart-header">
            <span class="chart-title">各种类型错误占比</span>
            <span class="total-errors">总错误数: {{ totalErrors }}</span>
          </div>
          <PieChart
            :data="errorPieData"
            :subtitle="''"
          />
        </div>

        <!-- 右侧：错误频率与解决时间 -->
        <div class="analysis-chart bar-chart-wrapper">
          <div class="chart-header">
            <span class="chart-title">各种类型错误出现频率与解决时间</span>
          </div>
          <div class="bar-legend">
            <div class="legend-item">
              <span class="legend-color" style="background: #06B6D4;"></span>
              <span class="legend-label">出现次数</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background: #22C55E;"></span>
              <span class="legend-label">平均解决时间(分钟)</span>
            </div>
          </div>
          <BarChart
            :categories="frequencyData.categories"
            :data="frequencyData.data"
            title=""
            :y-axis-label="'次数/时间'"
            :horizontal="true"
          />
        </div>
      </div>

      <!-- 错误详情表格 -->
      <div class="error-details">
        <h4>错误详细分析</h4>
        <el-table :data="errorDetails" stripe style="width: 100%">
          <el-table-column prop="type" label="错误类型" width="180" />
          <el-table-column prop="count" label="出现次数" width="100" />
          <el-table-column prop="avgTime" label="平均解决时间" width="120" />
          <el-table-column prop="difficulty" label="难度等级" width="100">
            <template #default="{ row }">
              <el-tag :type="getDifficultyType(row.difficulty)">
                {{ row.difficulty }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="suggestion" label="教学建议" />
        </el-table>
      </div>
    </div>

    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" @click="handleExport">导出报告</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PieChart from './PieChart.vue'
import BarChart from './BarChart.vue'

interface ErrorItem {
  type: string
  count: number
  avgTime: number
  difficulty: string
  suggestion: string
}

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 错误类型占比数据
const errorPieData = ref([
  { value: 42, name: '知识点混淆', itemStyle: { color: '#06B6D4' } },
  { value: 28, name: '计算错误', itemStyle: { color: '#FCD34D' } },
  { value: 18, name: '审题不清', itemStyle: { color: '#F97316' } },
  { value: 12, name: '其他', itemStyle: { color: '#6B7280' } }
])

const totalErrors = computed(() =>
  errorPieData.value.reduce((sum, item) => sum + item.value, 0)
)

// 错误频率与解决时间数据
const frequencyData = ref({
  categories: ['知识点混淆', '计算错误', '审题不清', '其他'],
  data: [
    // 出现次数（蓝色）
    { value: 42, itemStyle: { color: '#06B6D4' } },
    { value: 28, itemStyle: { color: '#06B6D4' } },
    { value: 18, itemStyle: { color: '#06B6D4' } },
    { value: 12, itemStyle: { color: '#06B6D4' } }
  ]
})

// 错误详情数据
const errorDetails = ref<ErrorItem[]>([
  {
    type: '知识点混淆',
    count: 42,
    avgTime: 5.2,
    difficulty: '高',
    suggestion: '加强基础知识讲解，增加概念辨析练习'
  },
  {
    type: '计算错误',
    count: 28,
    avgTime: 3.5,
    difficulty: '中',
    suggestion: '增加计算训练，培养细心检查习惯'
  },
  {
    type: '审题不清',
    count: 18,
    avgTime: 2.1,
    difficulty: '低',
    suggestion: '培养审题技巧，强化关键词识别训练'
  },
  {
    type: '其他',
    count: 12,
    avgTime: 1.8,
    difficulty: '低',
    suggestion: '针对性分析个别情况，提供个性化指导'
  }
])

const getDifficultyType = (difficulty: string) => {
  switch (difficulty) {
    case '高': return 'danger'
    case '中': return 'warning'
    case '低': return 'success'
    default: return 'info'
  }
}

const handleClose = () => {
  visible.value = false
}

const handleExport = () => {
  // 导出报告功能
  console.log('导出错误分析报告')
}
</script>

<style lang="scss" scoped>
.error-analysis-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.analysis-charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.analysis-chart {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  padding: 16px;
  min-height: 320px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .chart-title {
    font-size: 14px;
    font-weight: 600;
    color: $text-primary;
  }

  .total-errors {
    font-size: 13px;
    color: $accent-cyan;
    font-weight: 500;
  }
}

.bar-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;

  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }

  .legend-label {
    font-size: 12px;
    color: $text-secondary;
  }
}

.error-details {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  padding: 16px;

  h4 {
    margin: 0 0 16px 0;
    font-size: 15px;
    font-weight: 600;
    color: $text-primary;
  }
}

@media (max-width: 768px) {
  .analysis-charts {
    grid-template-columns: 1fr;
  }
}
</style>
