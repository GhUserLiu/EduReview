<template>
  <div class="evaluation-page">
    <div class="page-header">
      <h1 class="page-title">学生个体评价</h1>
      <div class="header-actions">
        <el-select v-model="selectedClass" placeholder="选择班级" style="width: 180px">
          <el-option label="一年级1班" value="1-1" />
          <el-option label="一年级2班" value="1-2" />
          <el-option label="二年级1班" value="2-1" />
        </el-select>
        <el-select v-model="selectedDate" placeholder="选择日期" style="width: 150px">
          <el-option label="今天" value="today" />
          <el-option label="本周" value="week" />
          <el-option label="本月" value="month" />
        </el-select>
      </div>
    </div>

    <div class="content-layout">
      <!-- 中间内容区 -->
      <div class="middle-section">
        <!-- 上半部分：3个饼图 -->
        <div class="pie-charts-row">
          <div class="pie-chart-card">
            <div class="chart-title">
              <span class="chart-icon">📊</span>
              <span>课堂参与情况</span>
            </div>
            <PieChart
              :data="participationData"
              :subtitle="`总参与人数: ${totalParticipants}`"
            />
          </div>
          <div class="pie-chart-card">
            <div class="chart-title">
              <span class="chart-icon">🤝</span>
              <span>小组合作情况</span>
            </div>
            <PieChart
              :data="collaborationData"
              :subtitle="`总小组数: ${totalGroups}`"
            />
          </div>
          <div class="pie-chart-card">
            <div class="chart-title">
              <span class="chart-icon">💬</span>
              <span>课堂互动情况</span>
            </div>
            <PieChart
              :data="interactionData"
              :subtitle="`总互动次数: ${totalInteractions}`"
            />
          </div>
        </div>

        <!-- 下半部分：课堂表现趋势 -->
        <div class="trend-chart-card">
          <div class="chart-title">
            <span class="chart-icon">📈</span>
            <span>课堂表现趋势</span>
          </div>
          <BarChart
            :categories="trendData.students"
            :data="trendData.data"
            title=""
            :y-axis-label="'评分'"
          />
        </div>
      </div>

      <!-- 右侧学生信息区 -->
      <div class="right-section">
        <div class="section-header">
          <h3>学生评价列表</h3>
          <el-input
            v-model="searchText"
            placeholder="搜索学生"
            prefix-icon="Search"
            style="width: 180px"
            clearable
          />
        </div>
        <div class="students-grid">
          <StudentEvaluationCard
            v-for="student in filteredStudents"
            :key="student.id"
            :student="student"
            @view-detail="handleViewDetail"
          />
        </div>
      </div>
    </div>

    <!-- 学生详情弹窗 -->
    <el-dialog
      v-model="detailDialogVisible"
      :title="`学生详情 - ${selectedStudent?.name}`"
      width="700px"
    >
      <div class="detail-content" v-if="selectedStudent">
        <div class="detail-header">
          <img :src="selectedStudent.avatar" :alt="selectedStudent.name" class="detail-avatar" />
          <div class="detail-info">
            <h3>{{ selectedStudent.name }}</h3>
            <p>学号: {{ selectedStudent.id }}</p>
            <div class="detail-score">
              <span class="score-label">综合评分:</span>
              <span class="score-value" :class="getScoreClass(selectedStudent.overallScore)">
                {{ selectedStudent.overallScore }}
              </span>
            </div>
          </div>
        </div>
        <div class="detail-charts">
          <div class="detail-chart">
            <RadarChart
              title="能力雷达图"
              :indicator="detailRadarIndicator"
              :data="detailRadarData"
            />
          </div>
          <div class="detail-chart">
            <LineChart
              title="近期表现趋势"
              :categories="detailTrendData.dates"
              :series="detailTrendData.series"
              :y-axis-label="'评分'"
            />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import StudentEvaluationCard from '@/components/common/StudentEvaluationCard.vue'
import PieChart from '@/components/charts/PieChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import RadarChart from '@/components/charts/RadarChart.vue'
import LineChart from '@/components/charts/LineChart.vue'

// 筛选条件
const selectedClass = ref('1-1')
const selectedDate = ref('today')
const searchText = ref('')

// 饼图数据
const participationData = ref([
  { value: 18, name: '积极参与', itemStyle: { color: '#06B6D4' } },
  { value: 8, name: '一般参与', itemStyle: { color: '#A855F7' } },
  { value: 2, name: '未参与', itemStyle: { color: '#6B7280' } }
])

const collaborationData = ref([
  { value: 15, name: '有效合作', itemStyle: { color: '#22C55E' } },
  { value: 10, name: '被动合作', itemStyle: { color: '#06B6D4' } },
  { value: 3, name: '未合作', itemStyle: { color: '#6B7280' } }
])

const interactionData = ref([
  { value: 20, name: '主动发言', itemStyle: { color: '#F97316' } },
  { value: 6, name: '被动发言', itemStyle: { color: '#06B6D4' } },
  { value: 2, name: '未发言', itemStyle: { color: '#6B7280' } }
])

const totalParticipants = computed(() => participationData.value.reduce((a, b) => a + b.value, 0))
const totalGroups = computed(() => collaborationData.value.reduce((a, b) => a + b.value, 0))
const totalInteractions = computed(() => interactionData.value.reduce((a, b) => a + b.value, 0))

// 趋势图数据
const trendData = ref({
  students: ['张三', '李四', '王五', '赵六', '孙七', '周八'],
  data: [
    { value: 85, itemStyle: { color: '#06B6D4' } },
    { value: 78, itemStyle: { color: '#06B6D4' } },
    { value: 92, itemStyle: { color: '#06B6D4' } },
    { value: 88, itemStyle: { color: '#06B6D4' } },
    { value: 76, itemStyle: { color: '#06B6D4' } },
    { value: 90, itemStyle: { color: '#06B6D4' } }
  ]
})

// 学生数据
const students = ref([
  {
    id: '2021001',
    name: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    participation: 85,
    collaboration: 90,
    interaction: 78,
    overallScore: 88
  },
  {
    id: '2021002',
    name: '李四',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    participation: 78,
    collaboration: 85,
    interaction: 82,
    overallScore: 82
  },
  {
    id: '2021003',
    name: '王五',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zara',
    participation: 92,
    collaboration: 88,
    interaction: 95,
    overallScore: 92
  },
  {
    id: '2021004',
    name: '赵六',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
    participation: 88,
    collaboration: 80,
    interaction: 85,
    overallScore: 86
  },
  {
    id: '2021005',
    name: '孙七',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia',
    participation: 76,
    collaboration: 78,
    interaction: 70,
    overallScore: 75
  },
  {
    id: '2021006',
    name: '周八',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah',
    participation: 90,
    collaboration: 92,
    interaction: 88,
    overallScore: 90
  }
])

const filteredStudents = computed(() => {
  if (!searchText.value) return students.value
  return students.value.filter(s =>
    s.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
    s.id.includes(searchText.value)
  )
})

// 详情弹窗
const detailDialogVisible = ref(false)
const selectedStudent = ref<typeof students.value[0] | null>(null)

const handleViewDetail = (student: typeof students.value[0]) => {
  selectedStudent.value = student
  detailDialogVisible.value = true
}

const getScoreClass = (score: number) => {
  if (score >= 90) return 'excellent'
  if (score >= 80) return 'good'
  if (score >= 70) return 'average'
  return 'poor'
}

// 详情雷达图数据
const detailRadarIndicator = ref([
  { name: '课堂参与', max: 100 },
  { name: '小组合作', max: 100 },
  { name: '课堂互动', max: 100 },
  { name: '作业完成', max: 100 },
  { name: '测试成绩', max: 100 }
])

const detailRadarData = ref({
  name: '能力评估',
  value: [85, 90, 78, 88, 82]
})

// 详情趋势图数据
const detailTrendData = ref({
  dates: ['周一', '周二', '周三', '周四', '周五'],
  series: [
    { name: '课堂表现', data: [82, 85, 88, 86, 90], color: '#06B6D4' },
    { name: '作业质量', data: [80, 82, 85, 88, 87], color: '#A855F7' }
  ]
})
</script>

<style lang="scss" scoped>
.evaluation-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;

  .header-actions {
    display: flex;
    gap: 12px;
  }
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: $text-primary;
  margin: 0;
}

.content-layout {
  display: flex;
  gap: 20px;
  flex: 1;
  overflow: hidden;
}

.middle-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}

.pie-charts-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.pie-chart-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  overflow: hidden;
  transition: $transition;

  &:hover {
    background: $bg-card-hover;
    border-color: $accent-cyan;
    box-shadow: $shadow-md;
  }
}

.chart-title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  background: rgba(6, 182, 212, 0.08);
  border-bottom: 1px solid $border-color;
  color: $text-primary;
  font-weight: 500;
  font-size: 15px;

  .chart-icon {
    font-size: 18px;
  }
}

.trend-chart-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  overflow: hidden;
  transition: $transition;
  flex: 1;

  &:hover {
    background: $bg-card-hover;
    border-color: $accent-cyan;
    box-shadow: $shadow-md;
  }
}

.right-section {
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: $text-primary;
  }
}

.students-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-header {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: rgba(6, 182, 212, 0.08);
  border-radius: $card-radius;
}

.detail-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid $accent-cyan;
}

.detail-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: $text-primary;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: $text-secondary;
  }

  .detail-score {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;

    .score-label {
      font-size: 14px;
      color: $text-secondary;
    }

    .score-value {
      font-size: 28px;
      font-weight: 700;
      color: #0A192F;

      &.excellent {
        color: #22C55E;
      }

      &.good {
        color: #06B6D4;
      }

      &.average {
        color: #F97316;
      }

      &.poor {
        color: #EF4444;
      }
    }
  }
}

.detail-charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.detail-chart {
  height: 280px;
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  padding: 16px;
}

@media (max-width: 1400px) {
  .pie-charts-row {
    grid-template-columns: 1fr;
  }

  .right-section {
    width: 320px;
  }
}

@media (max-width: 1024px) {
  .content-layout {
    flex-direction: column;
  }

  .right-section {
    width: 100%;
  }

  .detail-charts {
    grid-template-columns: 1fr;
  }
}
</style>
