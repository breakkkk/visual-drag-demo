import FormRender from './views/FormRender.vue'
import FormPreview from './views/FormPreview.vue'
import customComponent from '@/custom-component'
import type { App } from 'vue'

import '@/assets/iconfont/iconfont.css'
import '@/styles/animate.scss'
import '@/styles/global.scss'
import '@/styles/dark.scss'

const install = (app: App) => {
  app.component('FormRender', FormRender)
  app.component('FormPreview', FormPreview)
  app.use(customComponent)
}

export { FormRender, FormPreview, install }

export default {
  install,
}
