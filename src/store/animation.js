export const animationActions = {
  addAnimation(animation) {
    this.curComponent.animations.push(animation)
  },
  removeAnimation(index) {
    this.curComponent.animations.splice(index, 1)
  },
  alterAnimation({ index, data = {} }) {
    if (typeof index === 'number') {
      const original = this.curComponent.animations[index]
      this.curComponent.animations[index] = { ...original, ...data }
    }
  },
}
