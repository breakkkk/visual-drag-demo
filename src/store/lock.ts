export const lockActions = {
  lock() {
    // @ts-ignore
    this.curComponent.isLock = true
  },
  unlock() {
    // @ts-ignore
    this.curComponent.isLock = false
  },
}
