// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

// app.component('DataTable', DataTable)
// app.component('Column', Column)

// Your web app's Firebase configuration
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyAqsWBZ976DihfMlDNdLJAIfhHfmBtwCyw",
  authDomain: "week7-zitao-36668680.firebaseapp.com",
  projectId: "week7-zitao-36668680",
  storageBucket: "week7-zitao-36668680.firebasestorage.app",
  messagingSenderId: "493740199185",
  appId: "1:493740199185:web:69f7ed701566e1da6b50b0"
}

// Initialize Firebase
initializeApp(firebaseConfig)

app.mount('#app')
