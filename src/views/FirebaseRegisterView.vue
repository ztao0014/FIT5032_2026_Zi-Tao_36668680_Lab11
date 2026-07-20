<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Register Successful!")
      router.push("/FireLogin")
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center mb-4">Create an Account</h1>
        <div class="card p-4">
          <form @submit.prevent="register">
            <div class="mb-3">
              <label for="reg-email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="reg-email"
                placeholder="Email"
                v-model="email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="reg-password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="reg-password"
                placeholder="Password"
                v-model="password"
                required
              />
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary w-100">Save to Firebase</button>
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
