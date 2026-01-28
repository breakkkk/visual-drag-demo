import { getComponentRotatedStyle } from '@/utils/style'

export const alignActions = {
  // Helper function for changing alignment
  changeAlign(componentData: any, Align: any) {
    if (Array.isArray(componentData)) {
      componentData.forEach((item) => {
        // @ts-ignore
        this.changeAlign(item, Align)
      })
      return
    }
    for (let key in Align) {
      if (Align.hasOwnProperty(key)) {
        componentData.style[key] = Align[key]
      }
    }
  },

  leftAlign() {
    // @ts-ignore
    if (this.areaData.components.length > 1) {
      let minLeft = Math.min(
        // @ts-ignore
        ...this.areaData.components.map((component: any) => {
          let rotatedStyle = getComponentRotatedStyle(component.style)
          return rotatedStyle.left
        }),
      )
      // @ts-ignore
      this.areaData.components.forEach((component: any) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        let diffX = rotatedStyle.left - minLeft
        // @ts-ignore
        this.changeAlign(component, { left: component.style.left - diffX })
      })
    } else {
      // @ts-ignore
      let rotateLeft = getComponentRotatedStyle(this.curComponent.style)
      // @ts-ignore
      let newLeft = this.curComponent.style.left - rotateLeft.left
      // @ts-ignore
      this.changeAlign(this.curComponent, { left: newLeft })
    }
  },
  rightAlign() {
    // @ts-ignore
    if (this.areaData.components.length > 1) {
      let maxRight = Math.max(
        // @ts-ignore
        ...this.areaData.components.map((component: any) => {
          let rotatedStyle = getComponentRotatedStyle(component.style)
          // @ts-ignore
          return rotatedStyle.right
        }),
      )
      // @ts-ignore
      this.areaData.components.forEach((component: any) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        // @ts-ignore
        let diffX = maxRight - rotatedStyle.right
        // @ts-ignore
        this.changeAlign(component, { left: component.style.left + diffX })
      })
    } else {
      // @ts-ignore
      let rotatedStyle = getComponentRotatedStyle(this.curComponent.style)
      // @ts-ignore
      let newLeft = this.curComponent.style.left - rotatedStyle.left
      // @ts-ignore
      let right = this.canvasStyleData.width + newLeft - rotatedStyle.width
      // @ts-ignore
      this.changeAlign(this.curComponent, { left: right })
    }
  },
  centerAlign() {
    // @ts-ignore
    if (this.areaData.components.length > 1) {
      let minLeft = Math.min(
        // @ts-ignore
        ...this.areaData.components.map((component: any) => getComponentRotatedStyle(component.style).left),
      )
      let maxRight = Math.max(
        // @ts-ignore
        ...this.areaData.components.map((component: any) => getComponentRotatedStyle(component.style).right),
      )
      let centerX = (minLeft + maxRight) / 2
      // @ts-ignore
      this.areaData.components.forEach((component: any) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        // @ts-ignore
        let componentCenterX = (rotatedStyle.left + rotatedStyle.right) / 2
        let diffX = centerX - componentCenterX
        // @ts-ignore
        this.changeAlign(component, { left: component.style.left + diffX })
      })
    } else {
      // @ts-ignore
      let rotatedStyle = getComponentRotatedStyle(this.curComponent.style)
      // @ts-ignore
      let canvasCenterX = this.canvasStyleData.width / 2
      // @ts-ignore
      let componentCenterX = (rotatedStyle.left + rotatedStyle.right) / 2
      // @ts-ignore
      let newLeft = this.curComponent.style.left + (canvasCenterX - componentCenterX)
      // @ts-ignore
      this.changeAlign(this.curComponent, { left: newLeft })
    }
  },
  topAlign() {
    // @ts-ignore
    if (this.areaData.components.length > 1) {
      let minTop = Math.min(
        // @ts-ignore
        ...this.areaData.components.map((component: any) => {
          let rotatedStyle = getComponentRotatedStyle(component.style)
          return rotatedStyle.top
        }),
      )
      // @ts-ignore
      this.areaData.components.forEach((component: any) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        let diffY = rotatedStyle.top - minTop
        // @ts-ignore
        this.changeAlign(component, { top: component.style.top - diffY })
      })
    } else {
      // @ts-ignore
      let rotatedStyle = getComponentRotatedStyle(this.curComponent.style)
      // @ts-ignore
      let newTop = this.curComponent.style.top - rotatedStyle.top
      // @ts-ignore
      this.changeAlign(this.curComponent, { top: newTop })
    }
  },
  bottomAlign() {
    // @ts-ignore
    if (this.areaData.components.length > 1) {
      let maxBottom = Math.max(
        // @ts-ignore
        ...this.areaData.components.map((component: any) => {
          let rotatedStyle = getComponentRotatedStyle(component.style)
          // @ts-ignore
          return rotatedStyle.bottom
        }),
      )
      // @ts-ignore
      this.areaData.components.forEach((component: any) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        // @ts-ignore
        let diffY = maxBottom - rotatedStyle.bottom
        // @ts-ignore
        this.changeAlign(component, { top: component.style.top + diffY })
      })
    } else {
      // @ts-ignore
      let rotatedStyle = getComponentRotatedStyle(this.curComponent.style)
      // @ts-ignore
      let newTop = this.curComponent.style.top - rotatedStyle.top
      // @ts-ignore
      let top = this.canvasStyleData.height + newTop - rotatedStyle.height
      // @ts-ignore
      this.changeAlign(this.curComponent, { top })
    }
  },
  middleAlign() {
    // @ts-ignore
    if (this.areaData.components.length > 1) {
      let minTop = Math.min(
        // @ts-ignore
        ...this.areaData.components.map((component: any) => getComponentRotatedStyle(component.style).top),
      )
      let maxBottom = Math.max(
        // @ts-ignore
        ...this.areaData.components.map((component: any) => getComponentRotatedStyle(component.style).bottom),
      )
      let centerY = (minTop + maxBottom) / 2
      // @ts-ignore
      this.areaData.components.forEach((component: any) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        // @ts-ignore
        let componentCenterY = (rotatedStyle.top + rotatedStyle.bottom) / 2
        let diffY = centerY - componentCenterY
        // @ts-ignore
        this.changeAlign(component, { top: component.style.top + diffY })
      })
    } else {
      // @ts-ignore
      let rotatedStyle = getComponentRotatedStyle(this.curComponent.style)
      // @ts-ignore
      let canvasCenterY = this.canvasStyleData.height / 2
      // @ts-ignore
      let componentCenterY = (rotatedStyle.top + rotatedStyle.bottom) / 2
      // @ts-ignore
      let newTop = this.curComponent.style.top + (canvasCenterY - componentCenterY)
      // @ts-ignore
      this.changeAlign(this.curComponent, { top: newTop })
    }
  },
  verticalSpacing() {
    // @ts-ignore
    const components = this.areaData.components
    if (components.length > 2) {
      let totalHeight = 0
      // @ts-ignore
      components.forEach((component: any) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        totalHeight += rotatedStyle.height
      })
      // @ts-ignore
      const containerHeight = this.areaData.style.height
      const availableSpace = containerHeight - totalHeight
      const spacing = Math.floor(availableSpace / (components.length - 1))
      // @ts-ignore
      components.sort((a: any, b: any) => getComponentRotatedStyle(a.style).top - getComponentRotatedStyle(b.style).top)
      let currentTop = 0
      // @ts-ignore
      components.forEach((component: any) => {
        // @ts-ignore
        this.changeAlign(component, { top: this.areaData.style.top + currentTop })
        currentTop += spacing + getComponentRotatedStyle(component.style).height
      })
    }
  },
  horizontalSpacing() {
    // @ts-ignore
    const components = this.areaData.components
    if (components.length > 2) {
      let totalWidth = 0
      // @ts-ignore
      components.forEach((component: any) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        totalWidth += rotatedStyle.width
      })
      // @ts-ignore
      const containerWidth = this.areaData.style.width
      const availableSpace = containerWidth - totalWidth
      const spacing = Math.floor(availableSpace / (components.length - 1))
      // @ts-ignore
      components.sort((a: any, b: any) => getComponentRotatedStyle(a.style).left - getComponentRotatedStyle(b.style).left)
      let currentLeft = 0
      // @ts-ignore
      components.forEach((component: any) => {
        // @ts-ignore
        component.style.left = this.areaData.style.left + currentLeft
        currentLeft += spacing + getComponentRotatedStyle(component.style).width
      })
    }
  },
}
