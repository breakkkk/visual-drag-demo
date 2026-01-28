import { deepCopy } from '@/utils/utils'
import changeComponentsSizeWithScale from '@/utils/changeComponentsSizeWithScale'
import { getDefaultcomponentData } from './defaults'

export const snapshotState = {
  snapshotData: [],
  snapshotIndex: -1,
}

export const snapshotActions = {
  undo() {
    // @ts-ignore
    if (this.snapshotIndex >= 0) {
      // @ts-ignore
      this.snapshotIndex--
      // @ts-ignore
      let componentData = deepCopy(this.snapshotData[this.snapshotIndex]) || getDefaultcomponentData()
      // @ts-ignore
      componentData = changeComponentsSizeWithScale(this.lastScale, componentData)
      // @ts-ignore
      this.setComponentData(componentData)
      // @ts-ignore
      const curComponent = componentData.find((component) => component.id === this.curComponent?.id)
      const index = curComponent ? componentData.indexOf(curComponent) : null
      // @ts-ignore
      this.setCurComponent({ component: curComponent, index })
    }
  },
  redo() {
    // @ts-ignore
    if (this.snapshotIndex < this.snapshotData.length - 1) {
      // @ts-ignore
      this.snapshotIndex++
      let componentData = changeComponentsSizeWithScale(
        // @ts-ignore
        this.lastScale,
        // @ts-ignore
        deepCopy(this.snapshotData[this.snapshotIndex]),
      )
      // @ts-ignore
      this.setComponentData(componentData)
    }
  },
  recordSnapshot() {
    // @ts-ignore
    let copyData = deepCopy(this.componentData)
    // @ts-ignore
    copyData.forEach((v) => (v.lastScale = this.lastScale))
    // @ts-ignore
    this.snapshotData[++this.snapshotIndex] = copyData
    // @ts-ignore
    if (this.snapshotIndex < this.snapshotData.length - 1) {
      // @ts-ignore
      this.snapshotData = this.snapshotData.slice(0, this.snapshotIndex + 1)
    }
  },
}
