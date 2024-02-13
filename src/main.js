import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import './firebase-config'; // Assurez-vous que le chemin d'accès est correct
import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')


