import { createPinia, defineStore } from 'pinia'
import { alignActions } from './align'
import { animationActions } from './animation'
import { composeState, composeActions } from './compose'
import { contextmenuState, contextmenuActions } from './contextmenu'
import { copyState, copyActions } from './copy'
import { eventActions } from './event'
import { layerActions } from './layer'
import { lockActions } from './lock'
import { snapshotState, snapshotActions } from './snapshot'
import { setDefaultcomponentData } from './defaults'

const store = createPinia()
// Export setDefaultcomponentData for compatibility
export { setDefaultcomponentData }

const _useStore = defineStore('main', {
  state: () => ({
    // index.js state
    lastScale: 100,
    editMode: 'edit', // edit preview
    canvasStyleData: {
      width: 1200,
      height: 740,
      scale: 100,
      color: '#000',
      opacity: 1,
      background: '#fff',
      fontSize: 14,
    },
    isInEdiotr: false,
    componentData: [],
    curComponent: null,
    curComponentIndex: null,
    isClickComponent: false,
    rightList: true,
    isDarkMode: false,

    // Merged states from modules
    ...composeState,
    ...contextmenuState,
    ...copyState,
    ...snapshotState,
  }),

  actions: {
    // index.js mutations (now actions)
    aceSetCanvasData(value: Project.CanvasStyleData) {
      this.canvasStyleData = value
    },
    setLastScale(value: number) {
      this.lastScale = value
    },
    aceSetcurComponent(value: Project.ComponentData) {
      for (let i = 0; i < this.componentData.length; i++) {
        // @ts-ignore
        if (this.componentData[i].id === value.id) {
          // @ts-ignore
          this.componentData.splice(i, 1)
        }
      }
      // @ts-ignore
      this.componentData.push(value)
      // @ts-ignore
      this.curComponent = value
    },
    setClickComponentStatus(status: boolean) {
      this.isClickComponent = status
    },
    isShowRightList() {
      this.rightList = !this.rightList
    },
    toggleDarkMode(status: boolean) {
      this.isDarkMode = status
      this.canvasStyleData.background = status ? '#817f7f' : '#fff'
      localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode))
    },
    setEditMode(mode: string) {
      this.editMode = mode
    },
    setInEditorStatus(status: boolean) {
      this.isInEdiotr = status
    },
    setCanvasStyle(style: Project.CanvasStyleData) {
      this.canvasStyleData = style
    },
    setCurComponent({ component, index }: { component: Project.ComponentData | null; index: number | null }) {
      // @ts-ignore
      this.curComponent = component
      // @ts-ignore
      this.curComponentIndex = index
    },
    setShapeStyle({ top, left, width, height, rotate, padding }: Project.ComponentStyle) {
      const curComponent = this.curComponent
      // @ts-ignore
      if (top !== undefined) curComponent.style.top = Math.round(top)
      // @ts-ignore
      if (left !== undefined) curComponent.style.left = Math.round(left)
      // @ts-ignore
      if (width) curComponent.style.width = Math.round(width)
      // @ts-ignore
      if (padding) curComponent.style.padding = Math.round(padding)
      // @ts-ignore
      if (height) curComponent.style.height = Math.round(height)
      // @ts-ignore
      if (rotate) curComponent.style.rotate = Math.round(rotate)
    },
    setShapeSingleStyle({ key, value }: { key: string; value: any }) {
      // @ts-ignore
      this.curComponent.style[key] = value
    },
    setComponentData(componentData: Project.ComponentData[] = []) {
      // @ts-ignore
      this.componentData = componentData
    },
    addComponent({ component, index }: { component: Project.ComponentData; index?: number }) {
      if (index !== undefined) {
        // @ts-ignore
        this.componentData.splice(index, 0, component)
      } else {
        // @ts-ignore
        this.componentData.push(component)
      }
    },
    deleteComponent(index?: number) {
      if (index === undefined) {
        // @ts-ignore
        index = this.curComponentIndex
      }
      if (index == this.curComponentIndex) {
        this.curComponentIndex = null
        this.curComponent = null
      }
      // @ts-ignore
      if (/\d/.test(index)) {
        // @ts-ignore
        this.componentData.splice(index, 1)
      }
    },

    // Merged actions from modules
    ...alignActions,
    ...animationActions,
    ...composeActions,
    ...contextmenuActions,
    ...copyActions,
    ...eventActions,
    ...layerActions,
    ...lockActions,
    ...snapshotActions,
  },
})

export const useStore = () => _useStore(store)
