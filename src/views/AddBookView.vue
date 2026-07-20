<script setup>
import { ref } from "vue"
import { db } from "../Firebase/init.js"
import { collection, addDoc } from "firebase/firestore"
import BookList from "../components/BookList.vue"

const isbn = ref(null)
const name = ref("")
const refreshKey = ref(0)

const addBook = async () => {
  try {
    const docRef = await addDoc(collection(db, "books"), {
      isbn: Number(isbn.value),
      name: name.value
    })
    console.log("Document written with ID: ", docRef.id)
    isbn.value = null
    name.value = ""
    refreshKey.value++
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center mb-4">Add a Book</h1>
        <div class="card p-4">
          <form @submit.prevent="addBook">
            <div class="mb-3">
              <label for="isbn" class="form-label">ISBN</label>
              <input
                type="number"
                class="form-control"
                id="isbn"
                v-model="isbn"
                required
              />
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">Book Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="name"
                required
              />
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary w-100">Add Book</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <BookList :key="refreshKey" />
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
