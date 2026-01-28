import { $ } from '@/utils/utils'
import decomposeComponent from '@/utils/decomposeComponent'
import generateID from '@/utils/generateID'
import { commonStyle, commonAttr } from '@/custom-component/component-list'
import { createGroupStyle } from '@/utils/style'
import eventBus from '@/utils/eventBus'

export const composeState = {
  areaData: {
    style: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    components: [],
  },
  editor: null,
}

export const composeActions = {
  getEditor() {
    this.editor = $('#editor')
  },
  setAreaData(data) {
    this.areaData = data
  },
  compose() {
    const components = []
    this.areaData.components.forEach((component) => {
      if (component.component != 'Group') {
        components.push(component)
      } else {
        const parentStyle = { ...component.style }
        const subComponents = component.propValue
        const editorRect = this.editor.getBoundingClientRect()
        subComponents.forEach((component) => {
          decomposeComponent(component, editorRect, parentStyle)
        })
        components.push(...component.propValue)
      }
    })

    const groupComponent = {
      id: generateID(),
      component: 'Group',
      label: '组合',
      icon: 'zuhe',
      ...commonAttr,
      style: {
        ...commonStyle,
        ...this.areaData.style,
      },
      propValue: components,
    }
    createGroupStyle(groupComponent)

    this.addComponent({ component: groupComponent })
    this.batchDeleteComponent(this.areaData.components)
    this.setCurComponent({
      component: this.componentData[this.componentData.length - 1],
      index: this.componentData.length - 1,
    })

    eventBus.emit('hideArea')
    this.areaData.components = []
  },
  batchDeleteComponent(deleteData) {
    deleteData.forEach((component) => {
      for (let i = 0, len = this.componentData.length; i < len; i++) {
        if (component.id == this.componentData[i].id) {
          this.componentData.splice(i, 1)
          break
        }
      }
    })
  },
  decompose() {
    const parentStyle = { ...this.curComponent.style }
    const components = this.curComponent.propValue
    const editorRect = this.editor.getBoundingClientRect()
    this.deleteComponent()
    components.forEach((component) => {
      decomposeComponent(component, editorRect, parentStyle)
      this.addComponent({ component })
    })
  },
}
