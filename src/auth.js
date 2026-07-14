import { ref } from 'vue'

// Hardcoded credentials for demo purposes
const VALID_USERNAME = 'admin'
const VALID_PASSWORD = 'password123'

export const isAuthenticated = ref(false)

export const login = (username, password) => {
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    isAuthenticated.value = true
    return true
  }
  return false
}

export const logout = () => {
  isAuthenticated.value = false
}
