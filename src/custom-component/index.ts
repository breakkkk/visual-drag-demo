import { defineAsyncComponent } from 'vue'
import type { App } from 'vue'

const components: string[] = []

const componentMap: any = {}

const attrMap: any = {}

export default {
  install(app: App) {
    const viteModules = import.meta.glob('@/custom-component/**/*.vue')
    Object.keys(viteModules).forEach((key) => {
      const pathArr = key.split('/')
      if (!pathArr || pathArr.length === 0) return

      const componentName = pathArr.find((v) => v.includes('-field'))?.replace('-field', '') || ''

      if (componentName) {
        if (!components.includes(componentName)) {
          components.push(componentName)
        }
        if (pathArr[pathArr.length - 1] == 'Component.vue') {
          componentMap[componentName] = viteModules[key]
        } else if (pathArr[pathArr.length - 1] == 'Attr.vue') {
          attrMap[componentName] = viteModules[key]
        }
      }
    })
    components.forEach((key) => {
      if (componentMap[key]) {
        app.component(key, defineAsyncComponent(componentMap[key]))
      }
      if (attrMap[key]) {
        app.component(`${key}Attr`, defineAsyncComponent(attrMap[key]))
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
        if (!components.includes(componentName)) {
          components.push(componentName)
        }
        if (pathArr[pathArr.length - 1] == 'Component.vue') {
          componentMap[componentName] = viteModules[key]
        } else if (pathArr[pathArr.length - 1] == 'Attr.vue') {
          attrMap[componentName] = viteModules[key]
        }
      }
    })
    components.forEach((key) => {
      if (componentMap[key]) {
        app.component(key, defineAsyncComponent(componentMap[key]))
      }
    })
  },
}
