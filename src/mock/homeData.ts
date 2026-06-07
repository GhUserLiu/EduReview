// 首页模拟数据（对应图片1）- 汽车营销课程

export const statisticsPanelData = {
  // 教学内容构成饼图数据
  courseInfo: {
    data: [
      { value: 30, name: '理论教学', itemStyle: { color: '#F97316' } },
      { value: 45, name: '实训教学', itemStyle: { color: '#FCD34D' } },
      { value: 25, name: '案例分析', itemStyle: { color: '#06B6D4' } }
    ]
  },

  // 教师授课情况饼图数据
  teachingStatus: {
    data: [
      { value: 50, name: '优秀', itemStyle: { color: '#F97316' } },
      { value: 35, name: '良好', itemStyle: { color: '#FCD34D' } },
      { value: 15, name: '合格', itemStyle: { color: '#9CA3AF' } }
    ]
  },

  // 学生课堂表现饼图数据
  studentPerformance: {
    data: [
      { value: 35, name: '优秀', itemStyle: { color: '#F97316' } },
      { value: 40, name: '良好', itemStyle: { color: '#FCD34D' } },
      { value: 20, name: '合格', itemStyle: { color: '#9CA3AF' } },
      { value: 5, name: '待改进', itemStyle: { color: '#4B5563' } }
    ]
  },

  // 课程成绩分布条形图数据
  gradeDistribution: {
    categories: ['0-60', '60-70', '70-80', '80-90', '90-100'],
    data: [
      { value: 2, itemStyle: { color: '#9CA3AF' } },
      { value: 6, itemStyle: { color: '#FCD34D' } },
      { value: 14, itemStyle: { color: '#FCD34D' } },
      { value: 20, itemStyle: { color: '#F97316' } },
      { value: 8, itemStyle: { color: '#F97316' } }
    ]
  }
}

// 学生评估卡片数据 - 汽车营销课程
export const studentsData = [
  {
    id: 1,
    name: '王凯',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wang',
    metrics: [
      { label: '课堂参与度', value: 92, color: '#F97316' },
      { label: '销售演练', value: 88, color: '#06B6D4' },
      { label: '案例分析', value: 85, color: '#FCD34D' },
      { label: '团队协作', value: 90, color: '#3B82F6' }
    ]
  },
  {
    id: 2,
    name: '李明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Li',
    metrics: [
      { label: '课堂参与度', value: 85, color: '#3B82F6' },
      { label: '销售演练', value: 90, color: '#F97316' },
      { label: '案例分析', value: 82, color: '#FCD34D' },
      { label: '团队协作', value: 88, color: '#3B82F6' }
    ]
  },
  {
    id: 3,
    name: '张强',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
    metrics: [
      { label: '课堂参与度', value: 78, color: '#FCD34D' },
      { label: '销售演练', value: 85, color: '#3B82F6' },
      { label: '案例分析', value: 80, color: '#FCD34D' },
      { label: '团队协作', value: 92, color: '#F97316' }
    ]
  },
  {
    id: 4,
    name: '刘芳',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liu',
    metrics: [
      { label: '课堂参与度', value: 95, color: '#F97316' },
      { label: '销售演练', value: 92, color: '#F97316' },
      { label: '案例分析', value: 90, color: '#F97316' },
      { label: '团队协作', value: 88, color: '#3B82F6' }
    ]
  },
  {
    id: 5,
    name: '陈浩',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chen',
    metrics: [
      { label: '课堂参与度', value: 82, color: '#3B82F6' },
      { label: '销售演练', value: 88, color: '#3B82F6' },
      { label: '案例分析', value: 85, color: '#FCD34D' },
      { label: '团队协作', value: 90, color: '#F97316' }
    ]
  },
  {
    id: 6,
    name: '赵丽',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhao',
    metrics: [
      { label: '课堂参与度', value: 88, color: '#F97316' },
      { label: '销售演练', value: 85, color: '#3B82F6' },
      { label: '案例分析', value: 92, color: '#F97316' },
      { label: '团队协作', value: 87, color: '#3B82F6' }
    ]
  }
]
