import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: string
  name: string
  role: 'teacher' | 'admin' | 'student'
  email: string
  avatar?: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({
    id: '1',
    name: '师巧',
    role: 'teacher',
    email: 'shiqiao@example.com'
  })

  const isAuthenticated = ref(true)

  function setUser(newUser: Partial<User>) {
    user.value = { ...user.value, ...newUser }
  }

  function logout() {
    isAuthenticated.value = false
    user.value = {} as User
  }

  return {
    user,
    isAuthenticated,
    setUser,
    logout
  }
})
