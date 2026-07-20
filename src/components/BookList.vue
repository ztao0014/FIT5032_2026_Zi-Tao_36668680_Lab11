<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <p><em>Query: where('isbn', '>', 1000), orderBy('isbn', 'asc'), limit(5)</em></p>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="editBook(book)" style="margin-left: 10px;">Edit</button>
        <button @click="deleteBook(book.id)" style="margin-left: 5px; color: red;">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '../Firebase/init.js'
import { collection, query, where, orderBy, limit, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])

    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000), orderBy('isbn', 'asc'), limit(5))
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    const deleteBook = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id))
        console.log('Book deleted:', id)
        fetchBooks()
      } catch (error) {
        console.error('Error deleting book:', error)
      }
    }

    const editBook = async (book) => {
      const newName = prompt('Enter new book name:', book.name)
      const newIsbn = prompt('Enter new ISBN:', book.isbn)
      if (newName && newIsbn) {
        try {
          await updateDoc(doc(db, 'books', book.id), {
            name: newName,
            isbn: Number(newIsbn)
          })
          console.log('Book updated:', book.id)
          fetchBooks()
        } catch (error) {
          console.error('Error updating book:', error)
        }
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return { books, deleteBook, editBook }
  }
}
</script>
