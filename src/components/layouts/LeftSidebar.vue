<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h1>汽车营销课程评价</h1>
      <p class="subtitle">山西工程科技职业大学</p>
    </div>
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      background-color="#1E3A8A"
      text-color="#FFFFFF"
      active-text-color="#06B6D4"
      router
    >
      <el-menu-item index="/">
        <el-icon><House /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-menu-item index="/classroom-analysis">
        <el-icon><DataAnalysis /></el-icon>
        <template #title>课堂分析</template>
      </el-menu-item>
      <el-menu-item index="/classroom-management">
        <el-icon><Management /></el-icon>
        <template #title>课堂管理</template>
      </el-menu-item>
      <el-menu-item index="/activities">
        <el-icon><Operation /></el-icon>
        <template #title>课堂活动</template>
      </el-menu-item>
      <el-menu-item index="/feedback">
        <el-icon><ChatDotRound /></el-icon>
        <template #title>教学反馈</template>
      </el-menu-item>
      <el-menu-item index="/student-evaluation">
        <el-icon><User /></el-icon>
        <template #title>学生评价</template>
      </el-menu-item>
      <el-menu-item index="/personal-center">
        <el-icon><User /></el-icon>
        <template #title>个人中心</template>
      </el-menu-item>
    </el-menu>
    <div class="sidebar-footer">
      <el-button type="info" plain @click="handleLogout">
        <el-icon><SwitchButton /></el-icon>
        <span>退出登录</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()

const activeMenu = computed(() => route.path)

const handleLogout = () => {
  ElMessage.info('退出登录功能待实现')
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: $sidebar-width;
  height: 100%;
  background-color: $bg-secondary;
  display: flex;
  flex-direction: column;
  border-right: 1px solid $border-color;
}

.sidebar-header {
  padding: 20px 16px;
  text-align: center;
  border-bottom: 1px solid $border-color;

  h1 {
    font-size: 18px;
    font-weight: 600;
    color: $text-primary;
    letter-spacing: 1px;
    margin: 0 0 8px 0;
  }

  .subtitle {
    font-size: 12px;
    color: $text-muted;
    margin: 0;
    line-height: 1.4;
  }
}

.sidebar-menu {
  flex: 1;
  border-right: none;
  padding: 8px 0;

  :deep(.el-menu-item) {
    height: 48px;
    line-height: 48px;
    margin: 2px 12px;
    border-radius: 8px;
    transition: $transition;
    display: flex;
    align-items: center;

    &:hover {
      background-color: rgba(6, 182, 212, 0.2) !important;
    }

    &.is-active {
      background-color: rgba(6, 182, 212, 0.3) !important;
      border-left: 3px solid $accent-cyan;
    }

    .el-icon {
      margin-right: 12px;
      font-size: 18px;
      width: 20px;
      height: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    span {
      font-size: 14px;
      color: #FFFFFF !important;
      line-height: 48px;
    }
  }
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid $border-color;

  .el-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    .el-icon {
      font-size: 16px;
    }

    span {
      font-size: 14px;
    }
  }
}
</style>
