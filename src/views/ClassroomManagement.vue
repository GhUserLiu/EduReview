<template>
  <div class="management-page">
    <h1 class="page-title">课堂管理</h1>

    <!-- 课程信息卡片 -->
    <div class="info-cards">
      <div class="info-card">
        <div class="info-header">
          <el-icon><Document /></el-icon>
          <span>课程信息</span>
        </div>
        <div class="info-body">
          <div class="info-item">
            <span class="info-label">课程名称</span>
            <span class="info-value">汽车营销</span>
          </div>
          <div class="info-item">
            <span class="info-label">授课班级</span>
            <span class="info-value">汽车服务2401班</span>
          </div>
          <div class="info-item">
            <span class="info-label">学生人数</span>
            <span class="info-value">42人</span>
          </div>
          <div class="info-item">
            <span class="info-label">学分/学时</span>
            <span class="info-value">4学分 / 64学时</span>
          </div>
        </div>
      </div>

      <div class="info-card">
        <div class="info-header">
          <el-icon><User /></el-icon>
          <span>授课教师</span>
        </div>
        <div class="info-body">
          <div class="teacher-item">
            <div class="teacher-avatar">师</div>
            <div class="teacher-info">
              <div class="teacher-name">师巧</div>
              <div class="teacher-role">主讲教师</div>
            </div>
            <el-tag type="success">在职</el-tag>
          </div>
          <div class="teacher-item">
            <div class="teacher-avatar">王</div>
            <div class="teacher-info">
              <div class="teacher-name">王春晖</div>
              <div class="teacher-role">主讲教师</div>
            </div>
            <el-tag type="success">在职</el-tag>
          </div>
          <div class="teacher-item">
            <div class="teacher-avatar">季</div>
            <div class="teacher-info">
              <div class="teacher-name">季喜军</div>
              <div class="teacher-role">企业指导（太原某4S店）</div>
            </div>
            <el-tag type="warning">企业</el-tag>
          </div>
        </div>
      </div>

      <div class="info-card">
        <div class="info-header">
          <el-icon><DataAnalysis /></el-icon>
          <span>教学进度</span>
        </div>
        <div class="info-body">
          <div class="progress-item">
            <span class="progress-label">理论教学</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 75%"></div>
            </div>
            <span class="progress-value">75%</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">实训教学</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 60%"></div>
            </div>
            <span class="progress-value">60%</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">案例分析</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 50%"></div>
            </div>
            <span class="progress-value">50%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 教学安排表格 -->
    <div class="table-section">
      <div class="section-header">
        <h2>教学安排</h2>
        <el-button type="primary" size="small">
          <el-icon><Plus /></el-icon>
          添加安排
        </el-button>
      </div>
      <el-table :data="scheduleData" style="width: 100%" :header-cell-style="{ background: 'rgba(6, 182, 212, 0.1)', color: '#FFFFFF' }" :cell-style="{ background: 'transparent', color: '#E5E7EB' }">
        <el-table-column prop="week" label="周次" width="80" />
        <el-table-column prop="topic" label="教学内容" />
        <el-table-column prop="type" label="类型" width="120">
          <template #default="{ row }">
            <el-tag :type="row.type === '理论' ? 'primary' : row.type === '实训' ? 'success' : 'warning'">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="hours" label="学时" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '已完成' ? 'success' : row.status === '进行中' ? 'warning' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button link type="primary" size="small">查看</el-button>
            <el-button link type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Document, User, DataAnalysis, Plus } from '@element-plus/icons-vue'

const scheduleData = ref([
  { week: '第1周', topic: '汽车营销概述与行业发展趋势', type: '理论', hours: 4, status: '已完成' },
  { week: '第2周', topic: '汽车消费者行为分析', type: '理论', hours: 4, status: '已完成' },
  { week: '第3周', topic: '汽车产品知识与卖点提炼', type: '实训', hours: 4, status: '已完成' },
  { week: '第4周', topic: '汽车销售流程与技巧', type: '实训', hours: 4, status: '进行中' },
  { week: '第5周', topic: '4S店销售实战演练', type: '实训', hours: 4, status: '进行中' },
  { week: '第6周', topic: '新能源汽车营销策略', type: '案例', hours: 4, status: '待开始' },
  { week: '第7周', topic: '汽车网络营销与新媒体', type: '案例', hours: 4, status: '待开始' },
  { week: '第8周', topic: '客户关系管理与发展', type: '理论', hours: 4, status: '待开始' },
])
</script>

<style lang="scss" scoped>
.management-page {
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

.info-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.info-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  overflow: hidden;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: rgba(6, 182, 212, 0.1);
  border-bottom: 1px solid $border-color;
  color: $text-primary;
  font-weight: 500;
}

.info-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }
}

.info-label {
  font-size: 14px;
  color: $text-secondary;
}

.info-value {
  font-size: 14px;
  color: $text-primary;
  font-weight: 500;
}

.teacher-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.teacher-avatar {
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

.teacher-info {
  flex: 1;
}

.teacher-name {
  font-size: 14px;
  color: $text-primary;
  font-weight: 500;
}

.teacher-role {
  font-size: 12px;
  color: $text-muted;
  margin-top: 2px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-label {
  width: 60px;
  font-size: 13px;
  color: $text-secondary;
  flex-shrink: 0;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #06B6D4, #3B82F6);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-value {
  width: 40px;
  font-size: 13px;
  color: $text-primary;
  text-align: right;
  flex-shrink: 0;
}

.table-section {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  padding: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h2 {
    font-size: 16px;
    font-weight: 500;
    color: $text-primary;
    margin: 0;
  }
}

:deep(.el-table) {
  background: transparent;
  --el-table-border-color: rgba(255, 255, 255, 0.1);
  --el-table-tr-bg-color: transparent;
  --el-table-current-row-bg-color: rgba(6, 182, 212, 0.1);
}

:deep(.el-table__body tr:hover > td) {
  background: rgba(255, 255, 255, 0.05) !important;
}
</style>
