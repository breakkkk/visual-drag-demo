import { deepCopy } from '@/utils/utils'
import toast from '@/utils/toast'
import generateID from '@/utils/generateID'

function deepCopyHelper(data) {
  const result = deepCopy(data)
  result.id = generateID()
  if (result.component === 'Group') {
    result.propValue.forEach((component, i) => {
      result.propValue[i] = deepCopyHelper(component)
    })
  }
  return result
}

export const copyState = {
  copyData: null,
  isCut: false,
}

export const copyActions = {
  copy() {
    if (!this.curComponent) {
      toast('请选择组件')
      return
    }
    this.restorePreCutData()
    this.copyDataAction()
    this.isCut = false
  },
  paste(isMouse) {
    if (!this.copyData) {
      toast('请选择组件')
      return
    }
    const data = this.copyData.data
    if (isMouse) {
      data.style.top = this.menuTop
      data.style.left = this.menuLeft
    } else {
      data.style.top += 10
      data.style.left += 10
    }
    this.addComponent({ component: deepCopyHelper(data) })
    if (this.isCut) {
      this.copyData = null
    }
  },
  cut() {
    if (!this.curComponent) {
      toast('请选择组件')
      return
    }
    this.restorePreCutData()
    this.copyDataAction()
    this.deleteComponent()
    this.isCut = true
  },
  restorePreCutData() {
    if (this.isCut && this.copyData) {
      const data = deepCopy(this.copyData.data)
      const index = this.copyData.index
      this.addComponent({ component: data, index })
      if (this.curComponentIndex >= index) {
        this.curComponentIndex++
      }
    }
  },
  copyDataAction() {
    this.copyData = {
      data: deepCopy(this.curComponent),
      index: this.curComponentIndex,
    }
  },
}
