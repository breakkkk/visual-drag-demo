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
    // @ts-ignore
    this.editor = $('#editor')
  },
  setAreaData(data: Project.AreaData) {
    // @ts-ignore
    this.areaData = data
  },
  compose() {
    const components: Project.ComponentData[] = []
    // @ts-ignore
    this.areaData.components.forEach((component: Project.ComponentData) => {
      if (component.component != 'Group') {
        components.push(component)
      } else {
        const parentStyle = { ...component.style }
        const subComponents = component.propValue
        // @ts-ignore
        const editorRect = this.editor.getBoundingClientRect()
        subComponents.forEach((component: Project.ComponentData) => {
          decomposeComponent(component, editorRect, parentStyle)
        })
        components.push(...component.propValue)
      }
    })

    const groupComponent: any = {
      id: generateID(),
      component: 'Group',
      label: '组合',
      icon: 'zuhe',
      ...commonAttr,
      style: {
        ...commonStyle,
        // @ts-ignore
        ...this.areaData.style,
      },
      propValue: components,
    }
    createGroupStyle(groupComponent)

    // @ts-ignore
    this.addComponent({ component: groupComponent })
    // @ts-ignore
    this.batchDeleteComponent(this.areaData.components)
    // @ts-ignore
    this.setCurComponent({
      // @ts-ignore
      component: this.componentData[this.componentData.length - 1],
      // @ts-ignore
      index: this.componentData.length - 1,
    })

    eventBus.emit('hideArea')
    // @ts-ignore
    this.areaData.components = []
  },
  batchDeleteComponent(deleteData: Project.ComponentData[]) {
    deleteData.forEach((component) => {
      // @ts-ignore
      for (let i = 0, len = this.componentData.length; i < len; i++) {
        // @ts-ignore
        if (component.id == this.componentData[i].id) {
          // @ts-ignore
          this.componentData.splice(i, 1)
          break
        }
      }
    })
  },
  decompose() {
    // @ts-ignore
    const parentStyle = { ...this.curComponent.style }
    // @ts-ignore
    const components = this.curComponent.propValue
    // @ts-ignore
    const editorRect = this.editor.getBoundingClientRect()
    // @ts-ignore
    this.deleteComponent()
    components.forEach((component: Project.ComponentData) => {
      decomposeComponent(component, editorRect, parentStyle)
      // @ts-ignore
      this.addComponent({ component })
    })
  },
}
