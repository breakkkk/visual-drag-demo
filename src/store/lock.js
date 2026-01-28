export const lockActions = {
  lock() {
    this.curComponent.isLock = true
  },
  unlock() {
    this.curComponent.isLock = false
  },
}
