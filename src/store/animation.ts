export const animationActions = {
  addAnimation(animation: any) {
    // @ts-ignore
    this.curComponent.animations.push(animation)
  },
  removeAnimation(index: number) {
    // @ts-ignore
    this.curComponent.animations.splice(index, 1)
  },
  alterAnimation({ index, data = {} }: { index: number; data: any }) {
    if (typeof index === 'number') {
      // @ts-ignore
      const original = this.curComponent.animations[index]
      // @ts-ignore
      this.curComponent.animations[index] = { ...original, ...data }
    }
  },
}
