<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const currentUser = ref(null)
const isRegistering = ref(false)

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  currentUser.value = user
})

const handleRegister = async () => {
  errorMessage.value = ''
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    email.value = ''
    password.value = ''
    console.log('User registered successfully:', currentUser.value?.email)
  } catch (error) {
    errorMessage.value = error.message
  }
}

const handleLogin = async () => {
  errorMessage.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    email.value = ''
    password.value = ''
    console.log('User logged in:', currentUser.value?.email)
  } catch (error) {
    errorMessage.value = error.message
  }
}

const handleLogout = async () => {
  try {
    await signOut(auth)
    console.log('User logged out')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center mb-4">Firebase Authentication</h1>

        <!-- User Info when logged in -->
        <div v-if="currentUser" class="card p-4 text-center">
          <h3>Welcome!</h3>
          <p><strong>Email:</strong> {{ currentUser.email }}</p>
          <p><strong>UID:</strong> {{ currentUser.uid }}</p>
          <button @click="handleLogout" class="btn btn-danger mt-2">Logout</button>
        </div>

        <!-- Login / Register Form when not logged in -->
        <div v-else class="card p-4">
          <h3 class="text-center">{{ isRegistering ? 'Register' : 'Login' }}</h3>
          <form @submit.prevent="isRegistering ? handleRegister() : handleLogin()">
            <div class="mb-3">
              <label for="fire-email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="fire-email"
                v-model="email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="fire-password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="fire-password"
                v-model="password"
                required
              />
            </div>
            <div v-if="errorMessage" class="text-danger mb-3">{{ errorMessage }}</div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary w-100 mb-2">
                {{ isRegistering ? 'Register' : 'Login' }}
              </button>
              <a href="#" @click.prevent="isRegistering = !isRegistering" class="text-decoration-none">
                {{ isRegistering ? 'Already have an account? Login' : "Don't have an account? Register" }}
              </a>
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
