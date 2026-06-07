// Tauri API 封装 - 带浏览器兼容性

// 动态导入 Tauri API
let tauriInvoke: <T>(cmd: string, args?: Record<string, unknown>) => Promise<T> | null = null

// 检测是否在 Tauri 环境中
const isTauri = typeof window !== 'undefined' && '__TAURI__' in window

// 浏览器环境 - 使用 localStorage 模拟
const browserInvoke = async <T>(cmd: string, args: Record<string, unknown>): Promise<T> => {
  console.log(`[Mock API] ${cmd}`, args)

  switch (cmd) {
    case 'save_data': {
      const { key, value } = args as { key: string; value: unknown }
      localStorage.setItem(key, JSON.stringify(value))
      return undefined as T
    }
    case 'load_data': {
      const { key } = args as { key: string }
      const data = localStorage.getItem(key)
      return (data ? JSON.parse(data) : null) as T
    }
    case 'delete_data': {
      const { key } = args as { key: string }
      localStorage.removeItem(key)
      return undefined as T
    }
    case 'list_keys': {
      const keys = Object.keys(localStorage).filter(k => !k.startsWith('__'))
      return keys as T
    }
    case 'get_app_version': {
      return '1.0.0' as T
    }
    default:
      throw new Error(`Unknown command: ${cmd}`)
  }
}

// 初始化 Tauri API
async function initTauriAPI() {
  if (isTauri && !tauriInvoke) {
    try {
      const tauriApi = await import('@tauri-apps/api/core')
      tauriInvoke = tauriApi.invoke
    } catch (error) {
      console.error('Failed to load Tauri API:', error)
    }
  }
}

// 自动初始化
if (isTauri) {
  initTauriAPI()
}

/**
 * 获取 invoke 函数
 */
function getInvoke() {
  return tauriInvoke || browserInvoke
}

/**
 * 保存数据到本地存储
 */
export async function saveData(key: string, value: unknown): Promise<void> {
  return getInvoke()('save_data', { key, value })
}

/**
 * 从本地存储加载数据
 */
export async function loadData<T = unknown>(key: string): Promise<T | null> {
  const result = await getInvoke()<T>('load_data', { key })
  return result
}

/**
 * 删除本地存储的数据
 */
export async function deleteData(key: string): Promise<void> {
  return getInvoke()('delete_data', { key })
}

/**
 * 列出所有存储的键
 */
export async function listKeys(): Promise<string[]> {
  return getInvoke()('list_keys')
}

/**
 * 获取应用版本
 */
export async function getAppVersion(): Promise<string> {
  return getInvoke()('get_app_version')
}

/**
 * 存储键名常量
 */
export const STORAGE_KEYS = {
  COURSE_DATA: 'course_data',
  EVALUATION_DATA: 'evaluation_data',
  ACTIVITIES_DATA: 'activities_data',
  FEEDBACK_DATA: 'feedback_data',
  USER_DATA: 'user_data',
  SETTINGS: 'settings'
} as const

/**
 * 检查是否在 Tauri 环境中
 */
export { isTauri }

/**
 * 等待 Tauri API 初始化完成
 */
export async function ready() {
  if (isTauri) {
    await initTauriAPI()
  }
}
