<template>
  <div class="feedback-page">
    <h1 class="page-title">教学反馈</h1>

    <!-- 反馈概览 -->
    <div class="feedback-overview">
      <div class="overview-card">
        <div class="overview-header">
          <el-icon><StarFilled /></el-icon>
          <span>学生满意度</span>
        </div>
        <div class="overview-body">
          <div class="satisfaction-score">
            <div class="score">4.6</div>
            <div class="score-label">综合评分</div>
          </div>
          <div class="satisfaction-breakdown">
            <div class="rating-item">
              <span>非常满意</span>
              <div class="rating-bar">
                <div class="rating-fill" style="width: 68%; background: #22C55E;"></div>
              </div>
              <span>68%</span>
            </div>
            <div class="rating-item">
              <span>满意</span>
              <div class="rating-bar">
                <div class="rating-fill" style="width: 24%; background: #06B6D4;"></div>
              </div>
              <span>24%</span>
            </div>
            <div class="rating-item">
              <span>一般</span>
              <div class="rating-bar">
                <div class="rating-fill" style="width: 6%; background: #FCD34D;"></div>
              </div>
              <span>6%</span>
            </div>
            <div class="rating-item">
              <span>不满意</span>
              <div class="rating-bar">
                <div class="rating-fill" style="width: 2%; background: #EF4444;"></div>
              </div>
              <span>2%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="overview-card">
        <div class="overview-header">
          <el-icon><ChatDotRound /></el-icon>
          <span>反馈统计</span>
        </div>
        <div class="overview-body">
          <div class="stat-grid">
            <div class="mini-stat">
              <div class="mini-stat-value">89</div>
              <div class="mini-stat-label">收到反馈</div>
            </div>
            <div class="mini-stat">
              <div class="mini-stat-value">42</div>
              <div class="mini-stat-label">建议采纳</div>
            </div>
            <div class="mini-stat">
              <div class="mini-stat-value">95%</div>
              <div class="mini-stat-label">响应率</div>
            </div>
            <div class="mini-stat">
              <div class="mini-stat-value">3天</div>
              <div class="mini-stat-label">平均响应</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最新反馈列表 -->
    <div class="feedback-section">
      <div class="section-header">
        <h2>最新学生反馈</h2>
        <el-button type="primary" size="small">查看全部</el-button>
      </div>
      <div class="feedback-list">
        <div class="feedback-item" v-for="item in feedbackList" :key="item.id">
          <div class="feedback-header">
            <div class="feedback-author">
              <div class="author-avatar">{{ item.author[0] }}</div>
              <div class="author-info">
                <div class="author-name">{{ item.author }}</div>
                <div class="author-time">{{ item.time }}</div>
              </div>
            </div>
            <el-rate v-model="item.rating" disabled size="small" />
          </div>
          <div class="feedback-content">{{ item.content }}</div>
          <div class="feedback-tags">
            <el-tag v-for="tag in item.tags" :key="tag" size="small" type="info">{{ tag }}</el-tag>
          </div>
          <div class="feedback-actions">
            <el-button link type="primary" size="small">回复</el-button>
            <el-button link type="primary" size="small">采纳建议</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 反馈趋势图 -->
    <div class="chart-section">
      <h2>满意度趋势</h2>
      <div class="chart-container">
        <LineChart
          :categories="trendData.categories"
          :series="trendData.series"
          :y-axis-label="'评分'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { StarFilled, ChatDotRound } from '@element-plus/icons-vue'
import LineChart from '@/components/charts/LineChart.vue'

const feedbackList = ref([
  {
    id: 1,
    author: '王强',
    time: '2024-06-05 14:30',
    rating: 5,
    content: '课程内容非常实用，特别是销售话术的演练让我收获很大。老师讲解生动，案例分析贴近实际工作场景。',
    tags: ['内容实用', '讲解生动']
  },
  {
    id: 2,
    author: '李明',
    time: '2024-06-04 16:20',
    rating: 4,
    content: '角色扮演环节很有意思，但是希望能有更多时间进行练习。新能源汽车营销内容可以再深入一些。',
    tags: ['互动有趣', '内容建议']
  },
  {
    id: 3,
    author: '张丽',
    time: '2024-06-04 10:15',
    rating: 5,
    content: '老师对汽车行业的见解很深刻，4S店实地参观让我对汽车销售有了更直观的认识。期待更多实战训练！',
    tags: ['行业洞察', '实践教学']
  },
  {
    id: 4,
    author: '赵华',
    time: '2024-06-03 15:45',
    rating: 4,
    content: '课程安排合理，但是客户异议处理环节希望能增加更多真实案例。小组讨论氛围很好。',
    tags: ['安排合理', '案例需求']
  },
  {
    id: 5,
    author: '刘芳',
    time: '2024-06-02 09:30',
    rating: 5,
    content: '非常喜欢这堂课！老师耐心指导，每个同学都有充分练习机会。电话营销演练对我帮助很大。',
    tags: ['耐心指导', '充分练习']
  }
])

const trendData = ref({
  categories: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周'],
  series: [
    { name: '满意度', data: [4.2, 4.3, 4.4, 4.5, 4.5, 4.6], color: '#22C55E' },
    { name: '参与率', data: [82, 85, 88, 90, 92, 95], color: '#06B6D4' }
  ]
})
</script>

<style lang="scss" scoped>
.feedback-page {
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

.feedback-overview {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}

.overview-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  overflow: hidden;
}

.overview-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  background: rgba(34, 197, 94, 0.1);
  border-bottom: 1px solid $border-color;
  color: $text-primary;
  font-weight: 500;
}

.overview-body {
  padding: 20px;
}

.satisfaction-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .score {
    font-size: 48px;
    font-weight: 700;
    color: $accent-green;
    line-height: 1;
  }

  .score-label {
    font-size: 14px;
    color: $text-muted;
    margin-top: 8px;
  }
}

.satisfaction-breakdown {
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rating-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: $text-secondary;

  > span:first-child {
    width: 60px;
    flex-shrink: 0;
  }

  > span:last-child {
    width: 40px;
    flex-shrink: 0;
    text-align: right;
    color: $text-primary;
    font-weight: 600;
  }
}

.rating-bar {
  flex: 1;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.rating-fill {
  height: 100%;
  border-radius: 12px;
  transition: width 0.5s ease;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.mini-stat {
  text-align: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.mini-stat-value {
  font-size: 24px;
  font-weight: 700;
  color: $text-primary;
}

.mini-stat-label {
  font-size: 12px;
  color: $text-muted;
  margin-top: 4px;
}

.feedback-section {
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

.feedback-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feedback-item {
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: $transition;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: $accent-cyan;
  }
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feedback-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06B6D4, #3B82F6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.author-name {
  font-size: 14px;
  color: $text-primary;
  font-weight: 500;
}

.author-time {
  font-size: 12px;
  color: $text-muted;
  margin-top: 2px;
}

.feedback-content {
  font-size: 14px;
  color: $text-secondary;
  line-height: 1.6;
}

.feedback-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feedback-actions {
  display: flex;
  gap: 12px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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
  height: 280px;
}
</style>
