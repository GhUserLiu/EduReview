import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/layouts/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'classroom-analysis',
        name: 'ClassroomAnalysis',
        component: () => import('@/views/ClassroomAnalysis.vue'),
        meta: { title: '课堂分析' }
      },
      {
        path: 'classroom-management',
        name: 'ClassroomManagement',
        component: () => import('@/views/ClassroomManagement.vue'),
        meta: { title: '课堂管理' }
      },
      {
        path: 'activities',
        name: 'Activities',
        component: () => import('@/views/Activities.vue'),
        meta: { title: '课堂活动' }
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/Feedback.vue'),
        meta: { title: '教学反馈' }
      },
      {
        path: 'student-evaluation',
        name: 'StudentEvaluation',
        component: () => import('@/views/StudentEvaluation.vue'),
        meta: { title: '学生评价' }
      },
      {
        path: 'personal-center',
        name: 'PersonalCenter',
        component: () => import('@/views/PersonalCenter.vue'),
        meta: { title: '个人中心' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
