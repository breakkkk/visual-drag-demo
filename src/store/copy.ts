import { deepCopy } from '@/utils/utils'
import toast from '@/utils/toast'
import generateID from '@/utils/generateID'

function deepCopyHelper(data: any) {
  const result = deepCopy(data)
  result.id = generateID()
  if (result.component === 'Group') {
    result.propValue.forEach((component: any, i: number) => {
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
    // @ts-ignore
    if (!this.curComponent) {
      toast('请选择组件')
      return
    }
    // @ts-ignore
    this.restorePreCutData()
    // @ts-ignore
    this.copyDataAction()
    // @ts-ignore
    this.isCut = false
  },
  paste(isMouse: boolean) {
    // @ts-ignore
    if (!this.copyData) {
      toast('请选择组件')
      return
    }
    // @ts-ignore
    const data = this.copyData.data
    if (isMouse) {
      // @ts-ignore
      data.style.top = this.menuTop
      // @ts-ignore
      data.style.left = this.menuLeft
    } else {
      data.style.top += 10
      data.style.left += 10
    }
    // @ts-ignore
    this.addComponent({ component: deepCopyHelper(data) })
    // @ts-ignore
    if (this.isCut) {
      // @ts-ignore
      this.copyData = null
    }
  },
  cut() {
    // @ts-ignore
    if (!this.curComponent) {
      toast('请选择组件')
      return
    }
    // @ts-ignore
    this.restorePreCutData()
    // @ts-ignore
    this.copyDataAction()
    // @ts-ignore
    this.deleteComponent()
    // @ts-ignore
    this.isCut = true
  },
  restorePreCutData() {
    // @ts-ignore
    if (this.isCut && this.copyData) {
      // @ts-ignore
      const data = deepCopy(this.copyData.data)
      // @ts-ignore
      const index = this.copyData.index
      // @ts-ignore
      this.addComponent({ component: data, index })
      // @ts-ignore
      if (this.curComponentIndex >= index) {
        // @ts-ignore
        this.curComponentIndex++
      }
    }
  },
  copyDataAction() {
    // @ts-ignore
    this.copyData = {
      // @ts-ignore
      data: deepCopy(this.curComponent),
      // @ts-ignore
      index: this.curComponentIndex,
    }
  },
}
