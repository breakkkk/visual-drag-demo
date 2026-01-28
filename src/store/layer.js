import { swap } from '@/utils/utils'
import toast from '@/utils/toast'

export const layerActions = {
  upComponent() {
    const { componentData, curComponentIndex } = this
    if (curComponentIndex < componentData.length - 1) {
      swap(componentData, curComponentIndex, curComponentIndex + 1)
      this.curComponentIndex = curComponentIndex + 1
    } else {
      toast('已经到顶了')
    }
  },
  downComponent() {
    const { componentData, curComponentIndex } = this
    if (curComponentIndex > 0) {
      swap(componentData, curComponentIndex, curComponentIndex - 1)
      this.curComponentIndex = curComponentIndex - 1
    } else {
      toast('已经到底了')
    }
  },
  topComponent() {
    const { componentData, curComponentIndex, curComponent } = this
    if (curComponentIndex < componentData.length - 1) {
      componentData.splice(curComponentIndex, 1)
      componentData.push(curComponent)
      this.curComponentIndex = componentData.length - 1
    } else {
      toast('已经到顶了')
    }
  },
  bottomComponent() {
    const { componentData, curComponentIndex, curComponent } = this
    if (curComponentIndex > 0) {
      componentData.splice(curComponentIndex, 1)
      componentData.unshift(curComponent)
      this.curComponentIndex = 0
    } else {
      toast('已经到底了')
    }
  },
}
