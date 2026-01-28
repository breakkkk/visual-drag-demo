export const contextmenuState = {
  menuTop: 0,
  menuLeft: 0,
  menuShow: false,
}

export const contextmenuActions = {
  showContextMenu({ top, left }) {
    this.menuShow = true
    this.menuTop = top
    this.menuLeft = left
  },
  hideContextMenu() {
    this.menuShow = false
  },
}
