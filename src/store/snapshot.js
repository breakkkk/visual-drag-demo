import { deepCopy } from '@/utils/utils'
import changeComponentsSizeWithScale from '@/utils/changeComponentsSizeWithScale'
import { getDefaultcomponentData } from './defaults'

export const snapshotState = {
  snapshotData: [],
  snapshotIndex: -1,
}

export const snapshotActions = {
  undo() {
    if (this.snapshotIndex >= 0) {
      this.snapshotIndex--
      let componentData = deepCopy(this.snapshotData[this.snapshotIndex]) || getDefaultcomponentData()
      componentData = changeComponentsSizeWithScale(this, this.lastScale, componentData)
      this.setComponentData(componentData)
      const curComponent = componentData.find((component) => component.id === this.curComponent?.id)
      const index = curComponent ? componentData.indexOf(curComponent) : null
      this.setCurComponent({ component: curComponent, index })
    }
  },
  redo() {
    if (this.snapshotIndex < this.snapshotData.length - 1) {
      this.snapshotIndex++
      let componentData = changeComponentsSizeWithScale(
        this,
        this.lastScale,
        deepCopy(this.snapshotData[this.snapshotIndex]),
      )
      this.setComponentData(componentData)
    }
  },
  recordSnapshot() {
    let copyData = deepCopy(this.componentData)
    copyData.forEach((v) => (v.lastScale = this.lastScale))
    this.snapshotData[++this.snapshotIndex] = copyData
    if (this.snapshotIndex < this.snapshotData.length - 1) {
      this.snapshotData = this.snapshotData.slice(0, this.snapshotIndex + 1)
    }
  },
}
