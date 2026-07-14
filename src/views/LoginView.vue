<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../auth.js'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  if (login(username.value, password.value)) {
    errorMessage.value = ''
    router.push('/about')
  } else {
    errorMessage.value = 'Invalid username or password. Please try again.'
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center mb-4">Members Login</h1>
        <div class="card p-4">
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="login-username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="login-username"
                v-model="username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="login-password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="login-password"
                v-model="password"
                required
              />
            </div>
            <div v-if="errorMessage" class="text-danger mb-3">{{ errorMessage }}</div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary w-100">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
