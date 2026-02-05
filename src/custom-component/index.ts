import { defineAsyncComponent } from 'vue'
import type { App } from 'vue'

const components = ['CircleShape', 'Picture', 'VText', 'VButton', 'Group', 'RectShape', 'LineShape', 'VTable']
const svgs = ['SVGStar', 'SVGTriangle']

const componentMap: any = {
  CircleShape: () => import('./CircleShape/Component.vue'),
  Picture: () => import('./Picture/Component.vue'),
  VText: () => import('./VText/Component.vue'),
  VButton: () => import('./VButton/Component.vue'),
  Group: () => import('./Group/Component.vue'),
  RectShape: () => import('./RectShape/Component.vue'),
  LineShape: () => import('./LineShape/Component.vue'),
  VTable: () => import('./VTable/Component.vue'),
}

const attrMap: any = {
  CircleShape: () => import('./CircleShape/Attr.vue'),
  Picture: () => import('./Picture/Attr.vue'),
  VText: () => import('./VText/Attr.vue'),
  VButton: () => import('./VButton/Attr.vue'),
  Group: () => import('./Group/Attr.vue'),
  RectShape: () => import('./RectShape/Attr.vue'),
  LineShape: () => import('./LineShape/Attr.vue'),
  VTable: () => import('./VTable/Attr.vue'),
}

const svgComponentMap: any = {
  SVGStar: () => import('./svgs/SVGStar/Component.vue'),
  SVGTriangle: () => import('./svgs/SVGTriangle/Component.vue'),
}

const svgAttrMap: any = {
  SVGStar: () => import('./svgs/SVGStar/Attr.vue'),
  SVGTriangle: () => import('./svgs/SVGTriangle/Attr.vue'),
}

export default {
  install(app: App) {
    components.forEach((key) => {
      if (componentMap[key]) {
        app.component(key, defineAsyncComponent(componentMap[key]))
      }
      if (attrMap[key]) {
        app.component(`${key}Attr`, defineAsyncComponent(attrMap[key]))
      }
    })

    svgs.forEach((key) => {
      if (svgComponentMap[key]) {
        app.component(key, defineAsyncComponent(svgComponentMap[key]))
      }
      if (svgAttrMap[key]) {
        app.component(`${key}Attr`, defineAsyncComponent(svgAttrMap[key]))
      }
    })
  },
}

export const renderConfig = {
  install(app: App) {
    components.forEach((key) => {
      if (componentMap[key]) {
        app.component(key, defineAsyncComponent(componentMap[key]))
      }
    })

    svgs.forEach((key) => {
      if (svgComponentMap[key]) {
        app.component(key, defineAsyncComponent(svgComponentMap[key]))
      }
    })
  },
}
