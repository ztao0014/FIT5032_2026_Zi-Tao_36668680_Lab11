<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
  <p v-if="currentUser">Logged in as: {{ currentUser.email }}</p>
  <p><button v-if="currentUser" @click="signout">Logout</button></p>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const currentUser = ref(null)
const router = useRouter()
const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  currentUser.value = user
})

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Login Successful!")
      router.push("/")
      console.log(auth.currentUser)
    })
    .catch((error) => {
      console.log(error.code)
    })
}

const signout = () => {
  signOut(auth).then(() => {
    console.log("User logged out")
    currentUser.value = null
    router.push("/FireLogin")
  })
}
</script>
