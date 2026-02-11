import { defineAsyncComponent } from 'vue'
import type { App } from 'vue'

const componentMap: any = {}

export default {
  install(app: App) {
    const viteModules = import.meta.glob('@/custom-component/**/*.vue')
    Object.keys(viteModules).forEach((key) => {
      const pathArr = key.split('/')
      if (!pathArr || pathArr.length === 0) return

      const componentName = pathArr.find((v) => v.includes('-field'))?.replace('-field', '') || ''

      if (componentName) {
        if (pathArr[pathArr.length - 1] == 'Component.vue') {
          componentMap[componentName] = viteModules[key]
        } else if (pathArr[pathArr.length - 1] == 'Attr.vue') {
          componentMap[componentName + 'Attr'] = viteModules[key]
        }
      }

      // 查找属性编辑器
      const propName = pathArr.find((v) => v.includes('-prop'))?.replace('.vue', '') || ''
      if (propName) {
        console.log('propName', propName)
        componentMap[propName] = viteModules[key]
      }
    })
    Object.keys(componentMap).forEach((key) => {
      if (componentMap[key]) {
        app.component(key, defineAsyncComponent(componentMap[key]))
      }
    })
  },
}

export const renderConfig = {
  install(app: App) {
    const viteModules = import.meta.glob('@/custom-component/**/Component.vue')
    Object.keys(viteModules).forEach((key) => {
      const pathArr = key.split('/')
      if (!pathArr || pathArr.length === 0) return

      const componentName = pathArr.find((v) => v.includes('-field'))?.replace('-field', '') || ''

      if (componentName) {
        if (pathArr[pathArr.length - 1] == 'Component.vue') {
          componentMap[componentName] = viteModules[key]
        }
      }
    })
    Object.keys(componentMap).forEach((key) => {
      if (componentMap[key]) {
        app.component(key, defineAsyncComponent(componentMap[key]))
      }
    })
  },
}
