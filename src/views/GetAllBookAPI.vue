<template>
  <div v-if="apiResponse" class="api-response">
    <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const apiResponse = ref(null)

const getApiData = async () => {
  try {
    const response = await fetch('src/assets/json/authors.json')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const authors = await response.json()

    const allBooks = authors.flatMap(author =>
      author.famousWorks.map(work => ({
        title: work.title,
        year: work.year,
        author: author.name
      }))
    )

    apiResponse.value = {
      success: true,
      data: {
        totalBooks: allBooks.length,
        books: allBooks
      },
      timestamp: new Date().toISOString()
    }
  } catch (err) {
    apiResponse.value = {
      success: false,
      error: err.message
    }
  }
}

onMounted(() => {
  getApiData()
})
</script>
