import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Feedback {
  id: string
  studentId: string
  studentName: string
  category: 'teaching' | 'content' | 'environment' | 'other'
  rating: number
  content: string
  date: string
  status: 'pending' | 'reviewed' | 'resolved'
  reply?: string
}

export const useFeedbackStore = defineStore('feedback', () => {
  const feedbacks = ref<Feedback[]>([
    {
      id: '1',
      studentId: '1',
      studentName: '张明',
      category: 'teaching',
      rating: 5,
      content: '老师讲解非常清晰，案例分析很有帮助，希望增加更多实战环节',
      date: '2024-03-10',
      status: 'reviewed',
      reply: '感谢你的反馈，我们会在后续课程中增加更多实战演练环节'
    },
    {
      id: '2',
      studentId: '2',
      studentName: '李华',
      category: 'content',
      rating: 4,
      content: '课程内容很实用，但是新能源汽车部分内容可以再深入一些',
      date: '2024-03-12',
      status: 'pending'
    },
    {
      id: '3',
      studentId: '3',
      studentName: '王芳',
      category: 'environment',
      rating: 5,
      content: '实训环境很好，设备齐全，学到了很多实际操作经验',
      date: '2024-03-14',
      status: 'resolved'
    }
  ])

  const selectedCategory = ref<string>('all')

  function addFeedback(feedback: Omit<Feedback, 'id'>) {
    const newFeedback: Feedback = {
      ...feedback,
      id: Date.now().toString(),
      status: 'pending'
    }
    feedbacks.value.unshift(newFeedback)
    return newFeedback
  }

  function updateFeedback(id: string, updates: Partial<Feedback>) {
    const index = feedbacks.value.findIndex(f => f.id === id)
    if (index !== -1) {
      feedbacks.value[index] = { ...feedbacks.value[index], ...updates }
    }
  }

  function deleteFeedback(id: string) {
    const index = feedbacks.value.findIndex(f => f.id === id)
    if (index !== -1) {
      feedbacks.value.splice(index, 1)
    }
  }

  function replyToFeedback(id: string, reply: string) {
    updateFeedback(id, { reply, status: 'resolved' })
  }

  function getFilteredFeedbacks() {
    if (selectedCategory.value === 'all') {
      return feedbacks.value
    }
    return feedbacks.value.filter(f => f.category === selectedCategory.value)
  }

  function getFeedbackStats() {
    return {
      total: feedbacks.value.length,
      pending: feedbacks.value.filter(f => f.status === 'pending').length,
      reviewed: feedbacks.value.filter(f => f.status === 'reviewed').length,
      resolved: feedbacks.value.filter(f => f.status === 'resolved').length,
      averageRating: feedbacks.value.length > 0
        ? feedbacks.value.reduce((sum, f) => sum + f.rating, 0) / feedbacks.value.length
        : 0
    }
  }

  return {
    feedbacks,
    selectedCategory,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    replyToFeedback,
    getFilteredFeedbacks,
    getFeedbackStats
  }
})
