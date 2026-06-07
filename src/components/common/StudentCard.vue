<template>
  <div class="student-card">
    <div class="student-avatar">
      <img :src="student.avatar" :alt="student.name" />
    </div>
    <div class="student-info">
      <h3 class="student-name">{{ student.name }}</h3>
      <div class="student-metrics">
        <div v-for="(metric, index) in student.metrics" :key="index" class="metric-item">
          <div class="metric-label">{{ metric.label }}</div>
          <div class="metric-bar">
            <div
              class="metric-fill"
              :style="{ width: metric.value + '%', backgroundColor: metric.color }"
            ></div>
          </div>
          <div class="metric-value">{{ metric.value }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Metric {
  label: string
  value: number
  color: string
}

interface Student {
  id: number
  name: string
  avatar: string
  metrics: Metric[]
}

defineProps<{
  student: Student
}>()
</script>

<style lang="scss" scoped>
.student-card {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: $card-radius;
  padding: 16px;
  display: flex;
  gap: 16px;
  transition: $transition;

  &:hover {
    background: $bg-card-hover;
    border-color: $accent-cyan;
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }
}

.student-avatar {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #3B82F6, #06B6D4);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.student-info {
  flex: 1;
  min-width: 0;
}

.student-name {
  font-size: 16px;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 12px;
}

.student-metrics {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.metric-label {
  width: 70px;
  font-size: 12px;
  color: $text-secondary;
  flex-shrink: 0;
}

.metric-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.metric-value {
  width: 35px;
  font-size: 12px;
  color: $text-primary;
  text-align: right;
  flex-shrink: 0;
}
</style>
