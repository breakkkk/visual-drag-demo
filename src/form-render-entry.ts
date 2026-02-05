import FormPreview from './views/FormPreview.vue'
import {renderConfig} from '@/custom-component'
import type { App } from 'vue'

import '@/assets/iconfont/iconfont.css'
import '@/styles/animate.scss'
import '@/styles/global.scss'
import '@/styles/dark.scss'

const install = (app: App) => {
  app.component('FormPreview', FormPreview)
  app.use(renderConfig)
}

export { FormPreview, install }

export default {
  install,
}
