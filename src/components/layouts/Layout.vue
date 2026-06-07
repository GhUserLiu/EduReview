<template>
  <div class="layout-container">
    <LeftSidebar />
    <div class="main-content">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LeftSidebar from './LeftSidebar.vue'
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: $bg-primary;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
</style>
