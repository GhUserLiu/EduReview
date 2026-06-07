<template>
  <div class="analysis-page">
    <h1 class="page-title">课堂分析</h1>

    <!-- 第一行：3个卡片 -->
    <div class="cards-row cards-row-3">
      <div class="analysis-card">
        <div class="card-header">
          <span>📊 课堂活跃度</span>
          <el-button type="primary" size="small" @click="errorDialogVisible = true">
            错误分析
          </el-button>
        </div>
        <div class="card-body">
          <BarChart
            :categories="classroomAnalysisData.categories"
            :data="barChartData"
            :y-axis-label="'参与度(%)'"
          />
        </div>
      </div>

      <div class="analysis-card">
        <div class="card-header">
          <span>🏆 教师评价</span>
        </div>
        <div class="card-body">
          <RadarChart :indicator="teacherEvaluationData.indicator" :data="teacherEvaluationData.data" />
        </div>
      </div>

      <div class="analysis-card">
        <div class="card-header">
          <span>💬 学生反馈</span>
        </div>
        <div class="card-body">
          <BarChart
            :categories="studentFeedbackData.categories"
            :data="feedbackBarData"
            :y-axis-label="'评分'"
            :horizontal="true"
          />
        </div>
      </div>
    </div>

    <!-- 第二行：4个卡片 -->
    <div class="cards-row cards-row-4">
      <div class="analysis-card">
        <div class="card-header">
          <span>🎯 课堂活动</span>
        </div>
        <div class="card-body">
          <RadarChart :indicator="activityRadarData.indicator" :data="activityRadarData.data" />
        </div>
      </div>

      <div class="analysis-card">
        <div class="card-header">
          <span>📈 课堂表现</span>
        </div>
        <div class="card-body">
          <BarChart
            :categories="classroomPerformanceData.categories"
            :data="classroomPerformanceData.data"
            :y-axis-label="'数值'"
          />
        </div>
      </div>

      <div class="analysis-card">
        <div class="card-header">
          <span>👥 团队协作</span>
        </div>
        <div class="card-body">
          <BarChart
            :categories="teamCollaborationData.categories"
            :data="teamBarData"
            :y-axis-label="'协作评分'"
          />
        </div>
      </div>

      <div class="analysis-card">
        <div class="card-header">
          <span>🔗 学生互动</span>
        </div>
        <div class="card-body card-body-list">
          <div class="interaction-list">
            <div v-for="student in studentInteractionData" :key="student.id" class="interaction-item">
              <img :src="student.avatar" :alt="student.name" class="interaction-avatar" />
              <span class="interaction-name">{{ student.name }}</span>
              <span class="interaction-count">{{ student.interactions }}次</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第三行：个人表现和趋势 -->
    <div class="cards-row cards-row-2">
      <div class="analysis-card">
        <div class="card-header">
          <span>👤 个人表现</span>
        </div>
        <div class="card-body">
          <BarChart
            :categories="personalPerformanceData.categories"
            :data="personalBarData"
            :y-axis-label="'分数'"
          />
        </div>
      </div>

      <div class="analysis-card">
        <div class="card-header">
          <span>📊 反馈趋势</span>
        </div>
        <div class="card-body">
          <LineChart
            :categories="feedbackTrendData.dates"
            :series="trendSeries"
            :y-axis-label="'百分比(%)'"
          />
        </div>
      </div>
    </div>

    <!-- 情境类型分析弹窗 -->
    <el-dialog
      v-model="contextDialogVisible"
      title="课堂分析 - 情境类型分析"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-charts">
          <div class="dialog-chart">
            <PieChart
              :data="contextTypeAnalysis.pieData"
              title="情境类型分布"
              :subtitle="'总时长: 45分钟'"
            />
          </div>
          <div class="dialog-chart">
            <BarChart
              :categories="contextTypeAnalysis.barData.categories"
              :data="contextTypeAnalysis.barData.data"
              title="各情境参与度"
              :y-axis-label="'参与度(%)'"
              :horizontal="true"
            />
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 错误类型分析弹窗 -->
    <ErrorAnalysisDialog v-model="errorDialogVisible" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import RadarChart from '@/components/charts/RadarChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import ErrorAnalysisDialog from '@/components/charts/ErrorAnalysisDialog.vue'
import {
  classroomAnalysisData,
  teacherEvaluationData,
  studentFeedbackData,
  activityRadarData,
  classroomPerformanceData,
  teamCollaborationData,
  studentInteractionData,
  personalPerformanceData,
  feedbackTrendData,
  contextTypeAnalysis
} from '@/mock/analysisData'

// 计算图表数据，确保格式正确
const barChartData = computed(() =>
  classroomAnalysisData.data.map(v => ({ value: v, itemStyle: { color: '#06B6D4' } }))
)

const feedbackBarData = computed(() =>
  studentFeedbackData.data.map(v => ({ value: v, itemStyle: { color: '#FCD34D' } }))
)

const teamBarData = computed(() =>
  teamCollaborationData.data.map(v => ({ value: v, itemStyle: { color: '#A855F7' } }))
)

const personalBarData = computed(() =>
  personalPerformanceData.data.map(v => ({ value: v, itemStyle: { color: '#14B8A6' } }))
)

const trendSeries = computed(() => [
  { name: '满意度', data: feedbackTrendData.satisfaction, color: '#06B6D4' },
  { name: '参与率', data: feedbackTrendData.participation, color: '#F97316' }
])

// 弹窗控制
const contextDialogVisible = ref(false)
const errorDialogVisible = ref(false)
</script>

<style lang="scss" scoped>
.analysis-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: $text-primary;
  margin: 0;
}

.cards-row {
  display: grid;
  gap: 16px;
}

.cards-row-3 {
  grid-template-columns: repeat(3, 1fr);
}

.cards-row-4 {
  grid-template-columns: repeat(4, 1fr);
}

.cards-row-2 {
  grid-template-columns: repeat(2, 1fr);
}

.analysis-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  overflow: hidden;
  transition: $transition;
  display: flex;
  flex-direction: column;

  &:hover {
    background: $bg-card-hover;
    border-color: $accent-cyan;
    box-shadow: $shadow-md;
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 16px;
  background: rgba(6, 182, 212, 0.1);
  border-bottom: 1px solid $border-color;
  color: $text-primary;
  font-weight: 500;
  font-size: 15px;
}

.card-body {
  flex: 1;
  padding: 16px;
  min-height: 220px;
}

.card-body-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.interaction-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.interaction-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: $transition;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.interaction-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.interaction-name {
  flex: 1;
  color: $text-secondary;
  font-size: 14px;
}

.interaction-count {
  color: $accent-cyan;
  font-size: 14px;
  font-weight: 600;
}

.dialog-content {
  padding: 10px 0;
}

.dialog-charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.dialog-chart {
  height: 320px;
}

@media (max-width: 1400px) {
  .cards-row-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .cards-row-3,
  .cards-row-4,
  .cards-row-2 {
    grid-template-columns: 1fr;
  }

  .dialog-charts {
    grid-template-columns: 1fr;
  }
}
</style>
