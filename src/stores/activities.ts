import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Activity {
  id: string
  title: string
  type: 'discussion' | 'roleplay' | 'case' | 'presentation'
  date: string
  duration: number
  status: 'planned' | 'ongoing' | 'completed'
  participants: number
  description: string
}

export const useActivitiesStore = defineStore('activities', () => {
  const activities = ref<Activity[]>([
    {
      id: '1',
      title: '4S店销售角色扮演',
      type: 'roleplay',
      date: '2024-03-15',
      duration: 90,
      status: 'completed',
      participants: 42,
      description: '模拟4S店销售场景，分组进行销售顾问与顾客的角色扮演'
    },
    {
      id: '2',
      title: '新能源汽车营销案例讨论',
      type: 'case',
      date: '2024-03-22',
      duration: 60,
      status: 'completed',
      participants: 40,
      description: '分析特斯拉、比亚迪等新能源汽车品牌的营销策略'
    },
    {
      id: '3',
      title: '汽车产品卖点展示比赛',
      type: 'presentation',
      date: '2024-03-29',
      duration: 120,
      status: 'ongoing',
      participants: 38,
      description: '分组选择一款车型，准备并进行卖点展示'
    },
    {
      id: '4',
      title: '客户异议处理小组讨论',
      type: 'discussion',
      date: '2024-04-05',
      duration: 60,
      status: 'planned',
      participants: 0,
      description: '针对常见客户异议进行小组讨论和解决方案设计'
    }
  ])

  function addActivity(activity: Omit<Activity, 'id'>) {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString()
    }
    activities.value.push(newActivity)
    return newActivity
  }

  function updateActivity(id: string, updates: Partial<Activity>) {
    const index = activities.value.findIndex(a => a.id === id)
    if (index !== -1) {
      activities.value[index] = { ...activities.value[index], ...updates }
    }
  }

  function deleteActivity(id: string) {
    const index = activities.value.findIndex(a => a.id === id)
    if (index !== -1) {
      activities.value.splice(index, 1)
    }
  }

  function getActivityById(id: string) {
    return activities.value.find(a => a.id === id)
  }

  function getActivitiesByStatus(status: Activity['status']) {
    return activities.value.filter(a => a.status === status)
  }

  return {
    activities,
    addActivity,
    updateActivity,
    deleteActivity,
    getActivityById,
    getActivitiesByStatus
  }
})
