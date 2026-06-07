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
            <span class="info-value">{{ courseStore.courseInfo.name }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">授课班级</span>
            <span class="info-value">{{ courseStore.courseInfo.className }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">学生人数</span>
            <span class="info-value">{{ courseStore.courseInfo.studentCount }}人</span>
          </div>
          <div class="info-item">
            <span class="info-label">学分/学时</span>
            <span class="info-value">{{ courseStore.courseInfo.credits }}学分 / {{ courseStore.courseInfo.hours }}学时</span>
          </div>
        </div>
      </div>

      <div class="info-card">
        <div class="info-header">
          <el-icon><User /></el-icon>
          <span>授课教师</span>
          <el-button link type="primary" size="small" @click="showAddTeacherDialog">添加</el-button>
        </div>
        <div class="info-body">
          <div v-for="teacher in courseStore.teachers" :key="teacher.id" class="teacher-item">
            <div class="teacher-avatar">{{ teacher.name.charAt(0) }}</div>
            <div class="teacher-info">
              <div class="teacher-name">{{ teacher.name }}</div>
              <div class="teacher-role">{{ teacher.role }}</div>
            </div>
            <el-tag :type="teacher.type === 'instructor' ? 'success' : 'warning'">
              {{ teacher.type === 'instructor' ? '在职' : '企业' }}
            </el-tag>
            <el-button link type="danger" size="small" @click="deleteTeacher(teacher.id)">删除</el-button>
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
              <div class="progress-fill" :style="{ width: courseStore.progress.theory + '%' }"></div>
            </div>
            <span class="progress-value">{{ courseStore.progress.theory }}%</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">实训教学</span>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: courseStore.progress.practice + '%' }"></div>
            </div>
            <span class="progress-value">{{ courseStore.progress.practice }}%</span>
          </div>
          <div class="progress-item">
            <span class="progress-label">案例分析</span>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: courseStore.progress.case + '%' }"></div>
            </div>
            <span class="progress-value">{{ courseStore.progress.case }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 教学安排表格 -->
    <div class="table-section">
      <div class="section-header">
        <h2>教学安排</h2>
        <el-button type="primary" size="small" @click="showAddScheduleDialog">
          <el-icon><Plus /></el-icon>
          添加安排
        </el-button>
      </div>
      <el-table :data="courseStore.schedules" style="width: 100%" :header-cell-style="{ background: 'rgba(6, 182, 212, 0.1)', color: '#FFFFFF' }" :cell-style="{ background: 'transparent', color: '#E5E7EB' }">
        <el-table-column prop="week" label="周次" width="80" />
        <el-table-column prop="topic" label="教学内容" />
        <el-table-column prop="type" label="类型" width="120">
          <template #default="{ row }">
            <el-tag :type="getTypeColor(row.type)">{{ getTypeLabel(row.type) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="hours" label="学时" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusColor(row.status)">{{ getStatusLabel(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="editSchedule(row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="deleteSchedule(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加/编辑教学安排对话框 -->
    <el-dialog
      v-model="scheduleDialogVisible"
      :title="isEditingSchedule ? '编辑教学安排' : '添加教学安排'"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form :model="scheduleForm" label-width="80px">
        <el-form-item label="周次">
          <el-input v-model="scheduleForm.week" placeholder="如：第9周" />
        </el-form-item>
        <el-form-item label="教学内容">
          <el-input v-model="scheduleForm.topic" placeholder="输入教学内容" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="scheduleForm.type" placeholder="选择类型">
            <el-option label="理论" value="theory" />
            <el-option label="实训" value="practice" />
            <el-option label="案例" value="case" />
          </el-select>
        </el-form-item>
        <el-form-item label="学时">
          <el-input-number v-model="scheduleForm.hours" :min="1" :max="8" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="scheduleForm.status" placeholder="选择状态">
            <el-option label="待开始" value="pending" />
            <el-option label="进行中" value="ongoing" />
            <el-option label="已完成" value="completed" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="scheduleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveSchedule">保存</el-button>
      </template>
    </el-dialog>

    <!-- 添加教师对话框 -->
    <el-dialog
      v-model="teacherDialogVisible"
      title="添加教师"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form :model="teacherForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="teacherForm.name" placeholder="教师姓名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="teacherForm.role" placeholder="如：主讲教师" />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="teacherForm.type">
            <el-radio value="instructor">在职教师</el-radio>
            <el-radio value="enterprise">企业导师</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="teacherDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveTeacher">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Document, User, DataAnalysis, Plus } from '@element-plus/icons-vue'
import { useCourseStore } from '@/stores'

const courseStore = useCourseStore()

// 教学安排对话框
const scheduleDialogVisible = ref(false)
const isEditingSchedule = ref(false)
const editingScheduleId = ref<string | null>(null)
const scheduleForm = reactive({
  week: '',
  topic: '',
  type: 'theory' as 'theory' | 'practice' | 'case',
  hours: 4,
  status: 'pending' as 'pending' | 'ongoing' | 'completed'
})

// 教师对话框
const teacherDialogVisible = ref(false)
const teacherForm = reactive({
  name: '',
  role: '',
  type: 'instructor' as 'instructor' | 'enterprise'
})

// 显示添加教学安排对话框
function showAddScheduleDialog() {
  isEditingSchedule.value = false
  editingScheduleId.value = null
  Object.assign(scheduleForm, {
    week: '',
    topic: '',
    type: 'theory',
    hours: 4,
    status: 'pending'
  })
  scheduleDialogVisible.value = true
}

// 编辑教学安排
function editSchedule(row: any) {
  isEditingSchedule.value = true
  editingScheduleId.value = row.id
  Object.assign(scheduleForm, {
    week: row.week,
    topic: row.topic,
    type: row.type,
    hours: row.hours,
    status: row.status
  })
  scheduleDialogVisible.value = true
}

// 保存教学安排
function saveSchedule() {
  if (!scheduleForm.week || !scheduleForm.topic) {
    ElMessage.warning('请填写完整信息')
    return
  }

  if (isEditingSchedule.value && editingScheduleId.value) {
    courseStore.updateSchedule(editingScheduleId.value, scheduleForm)
    ElMessage.success('更新成功')
  } else {
    courseStore.addSchedule(scheduleForm)
    ElMessage.success('添加成功')
  }

  scheduleDialogVisible.value = false
}

// 删除教学安排
function deleteSchedule(id: string) {
  ElMessageBox.confirm('确定要删除这条教学安排吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    courseStore.deleteSchedule(id)
    ElMessage.success('删除成功')
  }).catch(() => {
    // 取消删除
  })
}

// 显示添加教师对话框
function showAddTeacherDialog() {
  Object.assign(teacherForm, {
    name: '',
    role: '',
    type: 'instructor'
  })
  teacherDialogVisible.value = true
}

// 保存教师
function saveTeacher() {
  if (!teacherForm.name || !teacherForm.role) {
    ElMessage.warning('请填写完整信息')
    return
  }

  courseStore.addTeacher(teacherForm)
  ElMessage.success('添加成功')
  teacherDialogVisible.value = false
}

// 删除教师
function deleteTeacher(id: string) {
  ElMessageBox.confirm('确定要删除这位教师吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = courseStore.teachers.findIndex(t => t.id === id)
    if (index !== -1) {
      courseStore.teachers.splice(index, 1)
    }
    ElMessage.success('删除成功')
  }).catch(() => {
    // 取消删除
  })
}

// 辅助函数
function getTypeLabel(type: string) {
  const labels: Record<string, string> = {
    theory: '理论',
    practice: '实训',
    case: '案例'
  }
  return labels[type] || type
}

function getTypeColor(type: string) {
  const colors: Record<string, any> = {
    theory: 'primary',
    practice: 'success',
    case: 'warning'
  }
  return colors[type] || 'info'
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: '待开始',
    ongoing: '进行中',
    completed: '已完成'
  }
  return labels[status] || status
}

function getStatusColor(status: string) {
  const colors: Record<string, any> = {
    pending: 'info',
    ongoing: 'warning',
    completed: 'success'
  }
  return colors[status] || 'info'
}
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

  .el-button {
    margin-left: auto;
  }
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
  flex-shrink: 0;
}

.teacher-info {
  flex: 1;
  min-width: 0;
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
