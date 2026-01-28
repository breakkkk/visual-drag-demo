import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import customComponent from '@/custom-component'

import '@/assets/iconfont/iconfont.css'
import '@/styles/animate.scss'
import '@/styles/reset.css'
import '@/styles/global.scss'
import '@/styles/dark.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus, { size: 'small' })
app.use(pinia)
app.use(router)
app.use(customComponent)

app.mount('#app')
