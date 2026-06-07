import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 当前激活的菜单
  const activeMenu = ref('/')

  // 设置激活菜单
  const setActiveMenu = (path: string) => {
    activeMenu.value = path
  }

  return {
    activeMenu,
    setActiveMenu
  }
})
