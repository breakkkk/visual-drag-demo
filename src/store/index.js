import { defineStore } from 'pinia'
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

// Export setDefaultcomponentData for compatibility
export { setDefaultcomponentData }

export const useStore = defineStore('main', {
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
    aceSetCanvasData(value) {
      this.canvasStyleData = value
    },
    setLastScale(value) {
      this.lastScale = value
    },
    aceSetcurComponent(value) {
      for (let i = 0; i < this.componentData.length; i++) {
        if (this.componentData[i].id === value.id) {
          this.componentData.splice(i, 1)
        }
      }
      this.componentData.push(value)
      this.curComponent = value
    },
    setClickComponentStatus(status) {
      this.isClickComponent = status
    },
    isShowRightList() {
      this.rightList = !this.rightList
    },
    toggleDarkMode(status) {
      this.isDarkMode = status
      this.canvasStyleData.background = status ? '#817f7f' : '#fff'
      localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode))
    },
    setEditMode(mode) {
      this.editMode = mode
    },
    setInEditorStatus(status) {
      this.isInEdiotr = status
    },
    setCanvasStyle(style) {
      this.canvasStyleData = style
    },
    setCurComponent({ component, index }) {
      this.curComponent = component
      this.curComponentIndex = index
    },
    setShapeStyle({ top, left, width, height, rotate, padding }) {
      const curComponent = this.curComponent
      if (top !== undefined) curComponent.style.top = Math.round(top)
      if (left !== undefined) curComponent.style.left = Math.round(left)
      if (width) curComponent.style.width = Math.round(width)
      if (padding) curComponent.style.padding = Math.round(padding)
      if (height) curComponent.style.height = Math.round(height)
      if (rotate) curComponent.style.rotate = Math.round(rotate)
    },
    setShapeSingleStyle({ key, value }) {
      this.curComponent.style[key] = value
    },
    setComponentData(componentData = []) {
      this.componentData = componentData
    },
    addComponent({ component, index }) {
      if (index !== undefined) {
        this.componentData.splice(index, 0, component)
      } else {
        this.componentData.push(component)
      }
    },
    deleteComponent(index) {
      if (index === undefined) {
        index = this.curComponentIndex
      }
      if (index == this.curComponentIndex) {
        this.curComponentIndex = null
        this.curComponent = null
      }
      if (/\d/.test(index)) {
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
