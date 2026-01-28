export const contextmenuState = {
  menuTop: 0,
  menuLeft: 0,
  menuShow: false,
}

export const contextmenuActions = {
  showContextMenu({ top, left }: { top: number; left: number }) {
    // @ts-ignore
    this.menuShow = true
    // @ts-ignore
    this.menuTop = top
    // @ts-ignore
    this.menuLeft = left
  },
  hideContextMenu() {
    // @ts-ignore
    this.menuShow = false
  },
}
