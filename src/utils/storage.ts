import { watch } from 'vue'
import type { Store } from 'pinia'
import { saveData, loadData } from '@/api'

/**
 * 存储持久化配置
 */
interface PersistenceOptions {
  key: string
  exclude?: string[] // 排除的字段
}

/**
 * 为 Pinia Store 添加持久化功能
 */
export function persistStore<T extends Record<string, unknown>>(
  store: Store,
  options: PersistenceOptions
) {
  const { key, exclude = [] } = options

  // 从本地加载数据
  async function load() {
    try {
      const data = await loadData<T>(key)
      if (data) {
        // 排除指定字段
        const filteredData = Object.entries(data).reduce((acc, [k, v]) => {
          if (!exclude.includes(k)) {
            acc[k] = v
          }
          return acc
        }, {} as Record<string, unknown>)

        // 更新 store
        Object.assign(store, filteredData)
      }
    } catch (error) {
      console.error(`Failed to load store data for ${key}:`, error)
    }
  }

  // 监听 store 变化并保存
  function subscribe() {
    watch(
      () => store.$state,
      (state) => {
        // 排除指定字段
        const filteredData = Object.entries(state).reduce((acc, [k, v]) => {
          if (!exclude.includes(k)) {
            acc[k] = v
          }
          return acc
        }, {} as Record<string, unknown>)

        saveData(key, filteredData).catch((error) => {
          console.error(`Failed to save store data for ${key}:`, error)
        })
      },
      { deep: true }
    )
  }

  return {
    load,
    subscribe
  }
}

/**
 * 初始化所有 stores 的持久化
 */
export async function initPersistence() {
  const { useCourseStore } = await import('@/stores/course')
  const { useEvaluationStore } = await import('@/stores/evaluation')
  const { useActivitiesStore } = await import('@/stores/activities')
  const { useFeedbackStore } = await import('@/stores/feedback')
  const { useUserStore } = await import('@/stores/user')

  const courseStore = useCourseStore()
  const evaluationStore = useEvaluationStore()
  const activitiesStore = useActivitiesStore()
  const feedbackStore = useFeedbackStore()
  const userStore = useUserStore()

  // 加载保存的数据
  await Promise.all([
    persistStore(courseStore, { key: 'course_data' }).load(),
    persistStore(evaluationStore, { key: 'evaluation_data' }).load(),
    persistStore(activitiesStore, { key: 'activities_data' }).load(),
    persistStore(feedbackStore, { key: 'feedback_data' }).load(),
    persistStore(userStore, { key: 'user_data' }).load()
  ])

  // 订阅变化
  persistStore(courseStore, { key: 'course_data' }).subscribe()
  persistStore(evaluationStore, { key: 'evaluation_data' }).subscribe()
  persistStore(activitiesStore, { key: 'activities_data' }).subscribe()
  persistStore(feedbackStore, { key: 'feedback_data' }).subscribe()
  persistStore(userStore, { key: 'user_data' }).subscribe()
}

/**
 * 清除所有数据
 */
export async function clearAllData() {
  const { deleteData } = await import('@/api')
  const keys = ['course_data', 'evaluation_data', 'activities_data', 'feedback_data', 'user_data']

  await Promise.all(keys.map(key => deleteData(key)))
}
