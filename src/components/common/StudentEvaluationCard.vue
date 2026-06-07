<template>
  <div class="student-card">
    <div class="card-header">
      <img :src="student.avatar" :alt="student.name" class="student-avatar" />
      <div class="student-info">
        <h3 class="student-name">{{ student.name }}</h3>
        <span class="student-id">ID: {{ student.id }}</span>
      </div>
      <div class="overall-score" :class="getScoreClass(student.overallScore)">
        {{ student.overallScore }}
      </div>
    </div>
    <div class="card-body">
      <div class="score-item">
        <span class="score-label">课堂参与</span>
        <div class="score-bar-container">
          <div class="score-bar" :style="{ width: `${student.participation}%`, background: '#06B6D4' }"></div>
          <span class="score-value">{{ student.participation }}/100</span>
        </div>
      </div>
      <div class="score-item">
        <span class="score-label">小组合作</span>
        <div class="score-bar-container">
          <div class="score-bar" :style="{ width: `${student.collaboration}%`, background: '#A855F7' }"></div>
          <span class="score-value">{{ student.collaboration }}/100</span>
        </div>
      </div>
      <div class="score-item">
        <span class="score-label">课堂互动</span>
        <div class="score-bar-container">
          <div class="score-bar" :style="{ width: `${student.interaction}%`, background: '#F97316' }"></div>
          <span class="score-value">{{ student.interaction }}/100</span>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <button class="detail-btn" @click="$emit('viewDetail', student)">查看详情</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Student {
  id: string
  name: string
  avatar: string
  participation: number
  collaboration: number
  interaction: number
  overallScore: number
}

interface Props {
  student: Student
}

defineProps<Props>()
defineEmits<{
  viewDetail: [student: Student]
}>()

const getScoreClass = (score: number) => {
  if (score >= 90) return 'excellent'
  if (score >= 80) return 'good'
  if (score >= 70) return 'average'
  return 'poor'
}
</script>

<style lang="scss" scoped>
.student-card {
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
    transform: translateY(-2px);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: rgba(6, 182, 212, 0.08);
  border-bottom: 1px solid $border-color;
}

.student-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid $accent-cyan;
}

.student-info {
  flex: 1;
}

.student-name {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: $text-primary;
}

.student-id {
  font-size: 12px;
  color: $text-secondary;
}

.overall-score {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #0A192F;

  &.excellent {
    background: linear-gradient(135deg, #22C55E, #16A34A);
  }

  &.good {
    background: linear-gradient(135deg, #06B6D4, #0891B2);
  }

  &.average {
    background: linear-gradient(135deg, #F97316, #EA580C);
  }

  &.poor {
    background: linear-gradient(135deg, #EF4444, #DC2626);
  }
}

.card-body {
  flex: 1;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.score-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.score-label {
  font-size: 12px;
  color: $text-secondary;
}

.score-bar-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.score-bar {
  height: 8px;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.score-value {
  font-size: 12px;
  color: $text-primary;
  font-weight: 500;
  min-width: 35px;
}

.card-footer {
  padding: 12px 14px;
  border-top: 1px solid $border-color;
}

.detail-btn {
  width: 100%;
  padding: 8px;
  background: rgba(6, 182, 212, 0.15);
  border: 1px solid $accent-cyan;
  border-radius: 6px;
  color: $accent-cyan;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: $transition;

  &:hover {
    background: $accent-cyan;
    color: #0A192F;
  }
}
</style>
