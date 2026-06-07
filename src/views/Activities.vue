<template>
  <div class="activities-page">
    <h1 class="page-title">课堂活动</h1>

    <!-- 活动统计 -->
    <div class="activity-stats">
      <div class="stat-card" v-for="stat in activityStats" :key="stat.key">
        <div class="stat-icon" :style="{ background: stat.bgColor }">
          <el-icon :size="32" :color="stat.iconColor">
            <component :is="stat.icon" />
          </el-icon>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- 活动列表 -->
    <div class="activities-section">
      <div class="section-header">
        <h2>本周课堂活动</h2>
        <el-button type="primary" size="small">
          <el-icon><Plus /></el-icon>
          创建活动
        </el-button>
      </div>

      <div class="activity-cards">
        <div class="activity-card" v-for="activity in activities" :key="activity.id">
          <div class="activity-header">
            <div class="activity-type" :class="`type-${activity.type}`">
              {{ activity.typeName }}
            </div>
            <div class="activity-time">{{ activity.time }}</div>
          </div>
          <div class="activity-title">{{ activity.title }}</div>
          <div class="activity-desc">{{ activity.desc }}</div>
          <div class="activity-footer">
            <div class="activity-participants">
              <el-icon><User /></el-icon>
              <span>{{ activity.participants }}人参与</span>
            </div>
            <div class="activity-status" :class="`status-${activity.status}`">
              {{ activity.statusText }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 活动趋势图 -->
    <div class="chart-section">
      <h2>活动参与趋势</h2>
      <div class="chart-container">
        <LineChart
          :categories="trendData.categories"
          :series="trendData.series"
          :y-axis-label="'参与人数'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChatDotRound, UserFilled, Promotion, Document, Plus, User, Operation } from '@element-plus/icons-vue'
import LineChart from '@/components/charts/LineChart.vue'

const activityStats = ref([
  { key: 'roleplay', icon: UserFilled, iconColor: '#F97316', bgColor: 'rgba(249, 115, 22, 0.1)', label: '角色扮演', value: '12次' },
  { key: 'practice', icon: Operation, iconColor: '#06B6D4', bgColor: 'rgba(6, 182, 212, 0.1)', label: '销售演练', value: '8次' },
  { key: 'discussion', icon: ChatDotRound, iconColor: '#FCD34D', bgColor: 'rgba(252, 211, 77, 0.1)', label: '小组讨论', value: '15次' },
  { key: 'case', icon: Document, iconColor: '#22C55E', bgColor: 'rgba(34, 197, 94, 0.1)', label: '案例分析', value: '6次' },
])

const activities = ref([
  {
    id: 1,
    type: 'roleplay',
    typeName: '角色扮演',
    time: '周一 第3-4节',
    title: '4S店销售顾问模拟接待',
    desc: '学生分组扮演销售顾问和客户，完成从接待到成交的全流程',
    participants: 45,
    status: 'completed',
    statusText: '已完成'
  },
  {
    id: 2,
    type: 'practice',
    typeName: '销售演练',
    time: '周二 第5-6节',
    title: '新能源汽车产品卖点演练',
    desc: '针对比亚迪/特斯拉等新能源车型进行卖点提炼和话术练习',
    participants: 42,
    status: 'completed',
    statusText: '已完成'
  },
  {
    id: 3,
    type: 'discussion',
    typeName: '小组讨论',
    time: '周三 第3-4节',
    title: '客户异议处理策略研讨',
    desc: '针对"价格太贵"、"再考虑考虑"等常见异议进行小组讨论',
    participants: 45,
    status: 'active',
    statusText: '进行中'
  },
  {
    id: 4,
    type: 'case',
    typeName: '案例分析',
    time: '周四 第1-2节',
    title: '某品牌汽车营销案例分析',
    desc: '分析某汽车品牌的市场定位、营销策略和销售技巧',
    participants: 45,
    status: 'pending',
    statusText: '待开始'
  },
  {
    id: 5,
    type: 'roleplay',
    typeName: '角色扮演',
    time: '周五 第7-8节',
    title: '电话营销话术演练',
    desc: '模拟电话邀约客户到店和电话跟进的场景',
    participants: 43,
    status: 'pending',
    statusText: '待开始'
  },
  {
    id: 6,
    type: 'practice',
    typeName: '销售演练',
    time: '周五 第3-4节',
    title: '试乘试驾流程模拟',
    desc: '完整的试乘试驾服务流程演练，包括路线规划和陪同讲解',
    participants: 40,
    status: 'pending',
    statusText: '待开始'
  },
])

const trendData = ref({
  categories: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周'],
  series: [
    { name: '角色扮演', data: [38, 40, 42, 41, 43, 45], color: '#F97316' },
    { name: '销售演练', data: [35, 38, 40, 42, 42, 44], color: '#06B6D4' },
    { name: '小组讨论', data: [40, 42, 43, 44, 45, 45], color: '#FCD34D' },
  ]
})
</script>

<style lang="scss" scoped>
.activities-page {
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

.activity-stats {
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
  align-items: center;
  gap: 16px;
  transition: $transition;

  &:hover {
    background: $bg-card-hover;
    border-color: $accent-cyan;
  }
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: $text-primary;
}

.stat-label {
  font-size: 13px;
  color: $text-muted;
}

.activities-section {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 18px;
    font-weight: 500;
    color: $text-primary;
    margin: 0;
  }
}

.activity-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.activity-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $card-radius;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: $transition;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: $accent-cyan;
  }
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-type {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;

  &.type-roleplay {
    background: rgba(249, 115, 22, 0.2);
    color: #F97316;
  }

  &.type-practice {
    background: rgba(6, 182, 212, 0.2);
    color: #06B6D4;
  }

  &.type-discussion {
    background: rgba(252, 211, 77, 0.2);
    color: #FCD34D;
  }

  &.type-case {
    background: rgba(34, 197, 94, 0.2);
    color: #22C55E;
  }
}

.activity-time {
  font-size: 12px;
  color: $text-muted;
}

.activity-title {
  font-size: 15px;
  font-weight: 500;
  color: $text-primary;
}

.activity-desc {
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.5;
  flex: 1;
}

.activity-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.activity-participants {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: $text-secondary;
}

.activity-status {
  font-size: 12px;
  font-weight: 500;

  &.status-completed {
    color: #22C55E;
  }

  &.status-active {
    color: #06B6D4;
  }

  &.status-pending {
    color: #9CA3AF;
  }
}

.chart-section {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  padding: 20px;

  h2 {
    font-size: 18px;
    font-weight: 500;
    color: $text-primary;
    margin: 0 0 16px 0;
  }
}

.chart-container {
  height: 300px;
}

@media (max-width: 1200px) {
  .activity-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
