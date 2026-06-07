// 课堂分析页面模拟数据（对应图片2、3）- 汽车营销课程

// 课堂分析 - 参与度统计
export const classroomAnalysisData = {
  categories: ['第1周', '第2周', '第3周', '第4周', '第5周'],
  data: [78, 85, 82, 90, 88]
}

// 教师评价雷达图数据
export const teacherEvaluationData = {
  indicator: [
    { name: '案例教学', max: 100 },
    { name: '实战指导', max: 100 },
    { name: '市场分析', max: 100 },
    { name: '客户沟通', max: 100 },
    { name: '销售技巧', max: 100 }
  ],
  data: [
    { value: [90, 88, 85, 92, 87], name: '当前教师' },
    { value: [82, 80, 78, 85, 80], name: '平均水平' }
  ]
}

// 学生反馈数据
export const studentFeedbackData = {
  categories: ['课程内容', '实训安排', '案例分析', '互动质量', '总体评价'],
  data: [4.6, 4.4, 4.2, 4.5, 4.5]
}

// 课堂活动雷达图数据
export const activityRadarData = {
  indicator: [
    { name: '角色扮演', max: 100 },
    { name: '销售演练', max: 100 },
    { name: '小组讨论', max: 100 },
    { name: '案例分析', max: 100 },
    { name: '产品展示', max: 100 }
  ],
  data: [
    { value: [80, 88, 75, 85, 82], name: '活动分布' }
  ]
}

// 课堂表现柱状图数据
export const classroomPerformanceData = {
  categories: ['发言次数', '提问质量', '讨论参与', '任务完成', '出勤率'],
  data: [
    { value: 45, itemStyle: { color: '#06B6D4' } },
    { value: 38, itemStyle: { color: '#3B82F6' } },
    { value: 85, itemStyle: { color: '#F97316' } },
    { value: 92, itemStyle: { color: '#FCD34D' } },
    { value: 98, itemStyle: { color: '#22C55E' } }
  ]
}

// 团队协作数据
export const teamCollaborationData = {
  categories: ['小组A', '小组B', '小组C', '小组D', '小组E'],
  data: [88, 92, 85, 90, 87]
}

// 学生互动数据（用于头像列表）
export const studentInteractionData = [
  { id: 1, name: '张明', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', interactions: 28 },
  { id: 2, name: '李华', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka', interactions: 22 },
  { id: 3, name: '王芳', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe', interactions: 35 },
  { id: 4, name: '刘强', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max', interactions: 18 },
  { id: 5, name: '陈静', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily', interactions: 31 }
]

// 个人表现数据
export const personalPerformanceData = {
  categories: ['出勤', '作业', '测验', '期中', '期末'],
  data: [98, 92, 88, 90, 85]
}

// 情境类型分析弹窗数据（图片3）
export const contextTypeAnalysis = {
  // 饼图数据 - 情境类型分布
  pieData: [
    { value: 40, name: '课堂提问', itemStyle: { color: '#06B6D4' } },
    { value: 25, name: '小组讨论', itemStyle: { color: '#FCD34D' } },
    { value: 20, name: '教师讲解', itemStyle: { color: '#F97316' } },
    { value: 15, name: '学生展示', itemStyle: { color: '#3B82F6' } }
  ],

  // 条形图数据 - 各情境的参与度
  barData: {
    categories: ['课堂提问', '小组讨论', '教师讲解', '学生展示'],
    data: [
      { value: 85, itemStyle: { color: '#06B6D4' } },
      { value: 92, itemStyle: { color: '#FCD34D' } },
      { value: 65, itemStyle: { color: '#F97316' } },
      { value: 78, itemStyle: { color: '#3B82F6' } }
    ]
  }
}

// 课堂反馈趋势数据
export const feedbackTrendData = {
  dates: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周'],
  satisfaction: [82, 85, 88, 90, 87, 92],
  participation: [75, 78, 85, 88, 90, 95]
}
