<template>
  <div class="home-page">
    <h1 class="page-title">首页 - 《汽车营销》教学评估</h1>

    <!-- 顶部统计面板 -->
    <div class="statistics-panel">
      <div class="stat-cards">
        <div v-for="card in statCards" :key="card.key" class="stat-card">
          <div class="stat-header">
            <el-icon :color="card.iconColor" :size="24">
              <component :is="card.icon" />
            </el-icon>
            <span class="stat-title">{{ card.title }}</span>
          </div>
          <div class="stat-value">{{ card.value }}</div>
          <div class="stat-subtitle">{{ card.subtitle }}</div>
        </div>
      </div>

      <!-- 图表区域 -->
      <div class="charts-row">
        <div class="chart-card">
          <PieChart :data="statisticsPanelData.courseInfo.data" title="教学内容构成" />
        </div>
        <div class="chart-card">
          <PieChart :data="statisticsPanelData.teachingStatus.data" title="教师授课情况" />
        </div>
        <div class="chart-card">
          <PieChart :data="statisticsPanelData.studentPerformance.data" title="学生课堂表现" />
        </div>
        <div class="chart-card">
          <BarChart
            :categories="statisticsPanelData.gradeDistribution.categories"
            :data="statisticsPanelData.gradeDistribution.data"
            title="课程成绩分布"
            :y-axis-label="'学生人数'"
          />
        </div>
      </div>
    </div>

    <!-- 学生评估卡片区 -->
    <div class="students-section">
      <h2 class="section-title">学生评估</h2>
      <div class="students-grid">
        <StudentCard
          v-for="student in studentsData"
          :key="student.id"
          :student="student"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  DataAnalysis, Document, User, TrendCharts
} from '@element-plus/icons-vue'
import PieChart from '@/components/charts/PieChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import StudentCard from '@/components/common/StudentCard.vue'
import { statisticsPanelData, studentsData } from '@/mock/homeData'

// 统计卡片数据
const statCards = ref([
  {
    key: 'weeks',
    icon: Document,
    iconColor: '#06B6D4',
    title: '教学周数',
    value: '16',
    subtitle: '本学期'
  },
  {
    key: 'teachers',
    icon: User,
    iconColor: '#F97316',
    title: '授课教师',
    value: '3',
    subtitle: '2主讲+1企业'
  },
  {
    key: 'students',
    icon: DataAnalysis,
    iconColor: '#FCD34D',
    title: '学生总数',
    value: '42',
    subtitle: '参与评估'
  },
  {
    key: 'rate',
    icon: TrendCharts,
    iconColor: '#22C55E',
    title: '评估完成率',
    value: '95%',
    subtitle: '整体进度'
  }
])
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: $text-primary;
  margin: 0;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  color: $text-primary;
  margin: 0 0 16px 0;
}

// 统计面板
.statistics-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stat-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: $transition;

  &:hover {
    background: $bg-card-hover;
    border-color: $accent-cyan;
  }
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-title {
  font-size: 14px;
  color: $text-secondary;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: $text-primary;
}

.stat-subtitle {
  font-size: 12px;
  color: $text-muted;
}

// 图表行
.charts-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.chart-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  padding: 16px;
  height: 280px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

// 学生评估区域
.students-section {
  display: flex;
  flex-direction: column;
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 1200px) {
  .stat-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-row {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
