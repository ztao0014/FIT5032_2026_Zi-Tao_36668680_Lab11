<script setup>
import { ref, onMounted } from "vue"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const currentUser = ref(null)
const errorMessage = ref("")
const router = useRouter()
const auth = getAuth()

onMounted(() => {
  // Listen for auth state changes
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
    if (user) {
      console.log("Currently signed in user:", user.email)
    } else {
      console.log("No user is signed in")
    }
  })
})

const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Successfully signed in!")
      console.log("Current user:", auth.currentUser?.email)
      router.push("/FireLogin")
    })
    .catch((error) => {
      console.log(error.code)
      errorMessage.value = error.message
    })
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center mb-4">Sign In</h1>

        <!-- User Info when logged in -->
        <div v-if="currentUser" class="card p-4 text-center">
          <h3>Welcome!</h3>
          <p><strong>Email:</strong> {{ currentUser.email }}</p>
          <p><strong>UID:</strong> {{ currentUser.uid }}</p>
        </div>

        <!-- Login Form when not logged in -->
        <div v-else class="card p-4">
          <form @submit.prevent="signIn">
            <div class="mb-3">
              <label for="signin-email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="signin-email"
                placeholder="Email"
                v-model="email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="signin-password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="signin-password"
                placeholder="Password"
                v-model="password"
                required
              />
            </div>
            <div v-if="errorMessage" class="text-danger mb-3">{{ errorMessage }}</div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary w-100">Sign In to Firebase</button>
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
