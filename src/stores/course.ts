import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Teacher {
  id: string
  name: string
  role: string
  type: 'instructor' | 'enterprise'
  status: 'active' | 'inactive'
}

export interface ScheduleItem {
  id: string
  week: string
  topic: string
  type: 'theory' | 'practice' | 'case'
  hours: number
  status: 'pending' | 'ongoing' | 'completed'
}

export interface CourseInfo {
  name: string
  className: string
  studentCount: number
  credits: number
  hours: number
}

export const useCourseStore = defineStore('course', () => {
  const courseInfo = ref<CourseInfo>({
    name: '汽车营销',
    className: '汽车服务2401班',
    studentCount: 42,
    credits: 4,
    hours: 64
  })

  const teachers = ref<Teacher[]>([
    { id: '1', name: '师巧', role: '主讲教师', type: 'instructor', status: 'active' },
    { id: '2', name: '王春晖', role: '主讲教师', type: 'instructor', status: 'active' },
    { id: '3', name: '季喜军', role: '企业指导（太原某4S店）', type: 'enterprise', status: 'active' }
  ])

  const schedules = ref<ScheduleItem[]>([
    { id: '1', week: '第1周', topic: '汽车营销概述与行业发展趋势', type: 'theory', hours: 4, status: 'completed' },
    { id: '2', week: '第2周', topic: '汽车消费者行为分析', type: 'theory', hours: 4, status: 'completed' },
    { id: '3', week: '第3周', topic: '汽车产品知识与卖点提炼', type: 'practice', hours: 4, status: 'completed' },
    { id: '4', week: '第4周', topic: '汽车销售流程与技巧', type: 'practice', hours: 4, status: 'ongoing' },
    { id: '5', week: '第5周', topic: '4S店销售实战演练', type: 'practice', hours: 4, status: 'ongoing' },
    { id: '6', week: '第6周', topic: '新能源汽车营销策略', type: 'case', hours: 4, status: 'pending' },
    { id: '7', week: '第7周', topic: '汽车网络营销与新媒体', type: 'case', hours: 4, status: 'pending' },
    { id: '8', week: '第8周', topic: '客户关系管理与发展', type: 'theory', hours: 4, status: 'pending' }
  ])

  const progress = ref({
    theory: 75,
    practice: 60,
    case: 50
  })

  function addSchedule(schedule: Omit<ScheduleItem, 'id'>) {
    const newSchedule: ScheduleItem = {
      ...schedule,
      id: Date.now().toString()
    }
    schedules.value.push(newSchedule)
    return newSchedule
  }

  function updateSchedule(id: string, updates: Partial<ScheduleItem>) {
    const index = schedules.value.findIndex(s => s.id === id)
    if (index !== -1) {
      schedules.value[index] = { ...schedules.value[index], ...updates }
    }
  }

  function deleteSchedule(id: string) {
    const index = schedules.value.findIndex(s => s.id === id)
    if (index !== -1) {
      schedules.value.splice(index, 1)
    }
  }

  function addTeacher(teacher: Omit<Teacher, 'id'>) {
    const newTeacher: Teacher = {
      ...teacher,
      id: Date.now().toString()
    }
    teachers.value.push(newTeacher)
    return newTeacher
  }

  return {
    courseInfo,
    teachers,
    schedules,
    progress,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    addTeacher
  }
})
