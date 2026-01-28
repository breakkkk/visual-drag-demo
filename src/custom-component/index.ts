import { defineAsyncComponent } from 'vue'
import type { App } from 'vue'

const components = [
  'CircleShape',
  'Picture',
  'VText',
  'VButton',
  'Group',
  'RectShape',
  'LineShape',
  'VTable',
  'VChart',
]
const svgs = ['SVGStar', 'SVGTriangle']

export default {
  install(app: App) {
    components.forEach((key) => {
      app.component(key, defineAsyncComponent(() => import(`@/custom-component/${key}/Component.vue`)))
      app.component(`${key}Attr`, defineAsyncComponent(() => import(`@/custom-component/${key}/Attr.vue`)))
    })

    svgs.forEach((key) => {
      app.component(key, defineAsyncComponent(() => import(`@/custom-component/svgs/${key}/Component.vue`)))
      app.component(`${key}Attr`, defineAsyncComponent(() => import(`@/custom-component/svgs/${key}/Attr.vue`)))
    })
  },
}
