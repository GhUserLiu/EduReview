<template>
  <div class="personal-center-page">
    <h1 class="page-title">个人中心</h1>

    <div class="personal-content">
      <!-- 左侧个人信息 -->
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">
            <span>师</span>
          </div>
          <h2 class="profile-name">师巧</h2>
          <p class="profile-title">汽车营销主讲教师</p>
          <p class="profile-dept">山西工程科技职业大学 · 汽车工程学院</p>
        </div>
        <div class="profile-stats">
          <div class="stat-item">
            <div class="stat-value">16</div>
            <div class="stat-label">教学周数</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">45</div>
            <div class="stat-label">授课学生</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">4.6</div>
            <div class="stat-label">好评率</div>
          </div>
        </div>
        <div class="profile-actions">
          <el-button class="action-btn action-btn-primary">
            <el-icon><Edit /></el-icon>
            编辑资料
          </el-button>
          <el-button class="action-btn action-btn-info">
            <el-icon><Setting /></el-icon>
            设置
          </el-button>
        </div>

        <!-- 教学能力雷达图 -->
        <div class="chart-section">
          <div class="chart-title">教学能力评估</div>
          <RadarChart
            :indicator="abilityIndicator"
            :data="abilityData"
          />
        </div>
      </div>

      <!-- 右侧功能区域 -->
      <div class="functional-area">
        <!-- 教学数据统计卡片 -->
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-icon stat-icon-cyan">
              <el-icon :size="20"><DataAnalysis /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-info-value">64</div>
              <div class="stat-info-label">授课学时</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-icon-orange">
              <el-icon :size="20"><UserFilled /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-info-value">45</div>
              <div class="stat-info-label">学生人数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-icon-green">
              <el-icon :size="20"><StarFilled /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-info-value">4.6</div>
              <div class="stat-info-label">平均评分</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-icon-yellow">
              <el-icon :size="20"><ChatDotRound /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-info-value">89</div>
              <div class="stat-info-label">收到反馈</div>
            </div>
          </div>
        </div>

        <!-- 教学趋势分析 -->
        <div class="chart-card">
          <div class="section-header">
            <el-icon class="header-icon-cyan"><TrendCharts /></el-icon>
            <span>教学表现趋势</span>
          </div>
          <LineChart
            :categories="trendData.categories"
            :series="trendData.series"
            :y-axis-label="'评分'"
          />
        </div>

        <!-- 学生评价分布 -->
        <div class="chart-row">
          <div class="chart-card half">
            <div class="section-header">
              <el-icon class="header-icon-purple"><PieChart /></el-icon>
              <span>学生评价分布</span>
            </div>
            <PieChart
              :data="evaluationPieData"
              subtitle="总评价数: 89"
            />
          </div>
          <div class="chart-card half">
            <div class="section-header">
              <el-icon class="header-icon-orange"><Histogram /></el-icon>
              <span>课堂活动参与度</span>
            </div>
            <BarChart
              :categories="activityData.categories"
              :data="activityData.data"
              :y-axis-label="'参与人数'"
            />
          </div>
        </div>

        <!-- 快捷操作 -->
        <div class="section-card">
          <div class="section-header">
            <el-icon class="header-icon-green"><Operation /></el-icon>
            <span>快捷操作</span>
          </div>
          <div class="quick-actions">
            <el-button class="action-btn action-btn-primary">
              <el-icon><Plus /></el-icon>
              发布作业
            </el-button>
            <el-button class="action-btn action-btn-success">
              <el-icon><EditPen /></el-icon>
              录入成绩
            </el-button>
            <el-button class="action-btn action-btn-warning">
              <el-icon><Bell /></el-icon>
              发布通知
            </el-button>
            <el-button class="action-btn action-btn-info">
              <el-icon><Download /></el-icon>
              导出报表
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 近期活动 -->
    <div class="recent-section">
      <div class="section-header-full">
        <el-icon class="header-icon-yellow"><Clock /></el-icon>
        <span>近期教学活动</span>
      </div>
      <el-timeline>
        <el-timeline-item
          v-for="activity in recentActivities"
          :key="activity.id"
          :timestamp="activity.time"
          :color="activity.color"
        >
          <div class="timeline-content">
            <div class="activity-title">{{ activity.title }}</div>
            <div class="activity-desc">{{ activity.desc }}</div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  User, Edit, Setting, TrendCharts, DataAnalysis, UserFilled,
  StarFilled, ChatDotRound, Operation, Plus, EditPen, Bell, Download,
  PieChart as PieChartIcon, Histogram, Clock
} from '@element-plus/icons-vue'
import RadarChart from '@/components/charts/RadarChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import BarChart from '@/components/charts/BarChart.vue'

// 教学能力雷达图数据
const abilityIndicator = ref([
  { name: '教学设计', max: 100 },
  { name: '课堂管理', max: 100 },
  { name: '互动能力', max: 100 },
  { name: '语言表达', max: 100 },
  { name: '教学创新', max: 100 }
])

const abilityData = ref({
  name: '教学能力',
  value: [92, 88, 95, 90, 85]
})

// 教学趋势数据
const trendData = ref({
  categories: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周'],
  series: [
    { name: '学生满意度', data: [4.2, 4.3, 4.5, 4.4, 4.6, 4.7], color: '#06B6D4' },
    { name: '课堂活跃度', data: [78, 82, 85, 88, 90, 92], color: '#F97316' }
  ]
})

// 学生评价分布
const evaluationPieData = ref([
  { value: 65, name: '非常满意', itemStyle: { color: '#22C55E' } },
  { value: 20, name: '满意', itemStyle: { color: '#06B6D4' } },
  { value: 3, name: '一般', itemStyle: { color: '#FCD34D' } },
  { value: 1, name: '待改进', itemStyle: { color: '#EF4444' } }
])

// 课堂活动参与度
const activityData = ref({
  categories: ['小组讨论', '角色扮演', '案例分析', '实操演练', '课堂展示'],
  data: [
    { value: 42, itemStyle: { color: '#06B6D4' } },
    { value: 38, itemStyle: { color: '#A855F7' } },
    { value: 35, itemStyle: { color: '#22C55E' } },
    { value: 40, itemStyle: { color: '#F97316' } },
    { value: 32, itemStyle: { color: '#FCD34D' } }
  ]
})

// 近期活动
const recentActivities = ref([
  {
    id: 1,
    time: '2024-06-05',
    title: '4S店销售顾问模拟接待',
    desc: '学生分组扮演销售顾问和客户，完成从接待到成交的全流程',
    color: '#F97316'
  },
  {
    id: 2,
    time: '2024-06-04',
    title: '新能源汽车产品卖点演练',
    desc: '针对新能源车型进行卖点提炼和话术练习',
    color: '#06B6D4'
  },
  {
    id: 3,
    time: '2024-06-03',
    title: '客户异议处理策略研讨',
    desc: '针对常见异议进行小组讨论和分析',
    color: '#FCD34D'
  },
  {
    id: 4,
    time: '2024-06-02',
    title: '发布第5周作业',
    desc: '汽车销售话术设计与应用',
    color: '#22C55E'
  },
  {
    id: 5,
    time: '2024-06-01',
    title: '某品牌汽车营销案例分析',
    desc: '分析某汽车品牌的市场定位和营销策略',
    color: '#3B82F6'
  }
])
</script>

<style lang="scss" scoped>
.personal-center-page {
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

.personal-content {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 20px;
}

// 个人信息卡片
.profile-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

.profile-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06B6D4, #3B82F6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
}

.profile-name {
  font-size: 22px;
  font-weight: 600;
  color: $text-primary;
  margin: 0;
}

.profile-title {
  font-size: 14px;
  color: $text-secondary;
  margin: 0;
}

.profile-dept {
  font-size: 12px;
  color: $text-muted;
  margin: 0;
  text-align: center;
  line-height: 1.4;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: $accent-cyan;
}

.stat-label {
  font-size: 13px;
  color: $text-muted;
  margin-top: 6px;
}

.stat-divider {
  width: 1px;
  background: $border-color;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .el-button {
    width: 100%;

    :deep(.el-icon) {
      width: 16px;
      height: 16px;
    }
  }
}

// 自定义操作按钮样式
.action-btn {
  width: 100%;
  border: 1px solid;
  transition: $transition;

  :deep(.el-icon) {
    width: 16px;
    height: 16px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &.action-btn-primary {
    background: rgba(6, 182, 212, 0.15);
    border-color: #06B6D4;
    color: #06B6D4;

    &:hover {
      background: rgba(6, 182, 212, 0.25);
      border-color: #22D3EE;
    }
  }

  &.action-btn-success {
    background: rgba(34, 197, 94, 0.15);
    border-color: #22C55E;
    color: #22C55E;

    &:hover {
      background: rgba(34, 197, 94, 0.25);
      border-color: #4ADE80;
    }
  }

  &.action-btn-warning {
    background: rgba(249, 115, 22, 0.15);
    border-color: #F97316;
    color: #F97316;

    &:hover {
      background: rgba(249, 115, 22, 0.25);
      border-color: #FB923C;
    }
  }

  &.action-btn-info {
    background: rgba(168, 85, 247, 0.15);
    border-color: #A855F7;
    color: #A855F7;

    &:hover {
      background: rgba(168, 85, 247, 0.25);
      border-color: #C084FC;
    }
  }
}

.chart-section {
  background: rgba(6, 182, 212, 0.05);
  border-radius: $card-radius;
  padding: 16px;

  .chart-title {
    font-size: 14px;
    font-weight: 500;
    color: $text-primary;
    text-align: center;
    margin-bottom: 12px;
  }
}

// 功能区域
.functional-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

// 统计卡片
.stats-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: $transition;

  &:hover {
    background: $bg-card-hover;
    border-color: $accent-cyan;
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }

  :deep(.el-icon) {
    width: 20px;
    height: 20px;
  }
}

.stat-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #FFFFFF;

  &.stat-icon-cyan {
    background: linear-gradient(135deg, #06B6D4, #0891B2);
  }

  &.stat-icon-orange {
    background: linear-gradient(135deg, #F97316, #EA580C);
  }

  &.stat-icon-green {
    background: linear-gradient(135deg, #22C55E, #16A34A);
  }

  &.stat-icon-yellow {
    background: linear-gradient(135deg, #FCD34D, #F59E0B);
  }
}

.stat-info {
  flex: 1;
}

.stat-info-value {
  font-size: 22px;
  font-weight: 700;
  color: $text-primary;
}

.stat-info-label {
  font-size: 12px;
  color: $text-muted;
  margin-top: 4px;
}

// 图表卡片
.chart-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  overflow: hidden;
  min-height: 280px;

  &.half {
    min-height: 300px;
  }
}

.chart-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.section-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  background: rgba(6, 182, 212, 0.1);
  border-bottom: 1px solid $border-color;
  color: $text-primary;
  font-weight: 500;
  font-size: 15px;

  :deep(.el-icon) {
    width: 18px;
    height: 18px;
  }

  .header-icon-cyan {
    color: #06B6D4;
  }

  .header-icon-purple {
    color: #A855F7;
  }

  .header-icon-orange {
    color: #F97316;
  }

  .header-icon-green {
    color: #22C55E;
  }
}

.section-header-full {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  background: rgba(6, 182, 212, 0.1);
  border-radius: $card-radius $card-radius 0 0;
  color: $text-primary;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 16px;

  :deep(.el-icon) {
    width: 20px;
    height: 20px;
  }

  .header-icon-yellow {
    color: #FCD34D;
  }
}

.quick-actions {
  padding: 16px 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

// 近期活动
.recent-section {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  padding: 0 20px 20px 20px;
}

.timeline-content {
  padding: 8px 0;
}

.activity-title {
  font-size: 15px;
  font-weight: 500;
  color: $text-primary;
  margin-bottom: 6px;
}

.activity-desc {
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.6;
}

:deep(.el-timeline-item__timestamp) {
  color: $text-secondary;
  font-size: 13px;
}

:deep(.el-timeline-item__wrapper) {
  padding-left: 20px;
}

@media (max-width: 1400px) {
  .stats-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .personal-content {
    grid-template-columns: 1fr;
  }

  .chart-row {
    grid-template-columns: 1fr;
  }

  .stats-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
