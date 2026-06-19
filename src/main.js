import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import GlobalInfoAlert from './components/GlobalInfoAlert.vue'

const app = createApp(App)

app.use(ElementPlus)
app.component('GlobalInfoAlert', GlobalInfoAlert)
app.mount('#app')
