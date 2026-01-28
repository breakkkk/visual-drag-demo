import { getComponentRotatedStyle } from '@/utils/style'

export const alignActions = {
  // Helper function for changing alignment
  changeAlign(componentData, Align) {
    if (Array.isArray(componentData)) {
      componentData.forEach((item) => {
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
    if (this.areaData.components.length > 1) {
      let minLeft = Math.min(
        ...this.areaData.components.map((component) => {
          let rotatedStyle = getComponentRotatedStyle(component.style)
          return rotatedStyle.left
        }),
      )
      this.areaData.components.forEach((component) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        let diffX = rotatedStyle.left - minLeft
        this.changeAlign(component, { left: component.style.left - diffX })
      })
    } else {
      let rotateLeft = getComponentRotatedStyle(this.curComponent.style)
      let newLeft = this.curComponent.style.left - rotateLeft.left
      this.changeAlign(this.curComponent, { left: newLeft })
    }
  },
  rightAlign() {
    if (this.areaData.components.length > 1) {
      let maxRight = Math.max(
        ...this.areaData.components.map((component) => {
          let rotatedStyle = getComponentRotatedStyle(component.style)
          return rotatedStyle.right
        }),
      )
      this.areaData.components.forEach((component) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        let diffX = maxRight - rotatedStyle.right
        this.changeAlign(component, { left: component.style.left + diffX })
      })
    } else {
      let rotatedStyle = getComponentRotatedStyle(this.curComponent.style)
      let newLeft = this.curComponent.style.left - rotatedStyle.left
      let right = this.canvasStyleData.width + newLeft - rotatedStyle.width
      this.changeAlign(this.curComponent, { left: right })
    }
  },
  centerAlign() {
    if (this.areaData.components.length > 1) {
      let minLeft = Math.min(
        ...this.areaData.components.map((component) => getComponentRotatedStyle(component.style).left),
      )
      let maxRight = Math.max(
        ...this.areaData.components.map((component) => getComponentRotatedStyle(component.style).right),
      )
      let centerX = (minLeft + maxRight) / 2
      this.areaData.components.forEach((component) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        let componentCenterX = (rotatedStyle.left + rotatedStyle.right) / 2
        let diffX = centerX - componentCenterX
        this.changeAlign(component, { left: component.style.left + diffX })
      })
    } else {
      let rotatedStyle = getComponentRotatedStyle(this.curComponent.style)
      let canvasCenterX = this.canvasStyleData.width / 2
      let componentCenterX = (rotatedStyle.left + rotatedStyle.right) / 2
      let newLeft = this.curComponent.style.left + (canvasCenterX - componentCenterX)
      this.changeAlign(this.curComponent, { left: newLeft })
    }
  },
  topAlign() {
    if (this.areaData.components.length > 1) {
      let minTop = Math.min(
        ...this.areaData.components.map((component) => {
          let rotatedStyle = getComponentRotatedStyle(component.style)
          return rotatedStyle.top
        }),
      )
      this.areaData.components.forEach((component) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        let diffY = rotatedStyle.top - minTop
        this.changeAlign(component, { top: component.style.top - diffY })
      })
    } else {
      let rotatedStyle = getComponentRotatedStyle(this.curComponent.style)
      let newTop = this.curComponent.style.top - rotatedStyle.top
      this.changeAlign(this.curComponent, { top: newTop })
    }
  },
  bottomAlign() {
    if (this.areaData.components.length > 1) {
      let maxBottom = Math.max(
        ...this.areaData.components.map((component) => {
          let rotatedStyle = getComponentRotatedStyle(component.style)
          return rotatedStyle.bottom
        }),
      )
      this.areaData.components.forEach((component) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        let diffY = maxBottom - rotatedStyle.bottom
        this.changeAlign(component, { top: component.style.top + diffY })
      })
    } else {
      let rotatedStyle = getComponentRotatedStyle(this.curComponent.style)
      let newTop = this.curComponent.style.top - rotatedStyle.top
      let top = this.canvasStyleData.height + newTop - rotatedStyle.height
      this.changeAlign(this.curComponent, { top })
    }
  },
  middleAlign() {
    if (this.areaData.components.length > 1) {
      let minTop = Math.min(
        ...this.areaData.components.map((component) => getComponentRotatedStyle(component.style).top),
      )
      let maxBottom = Math.max(
        ...this.areaData.components.map((component) => getComponentRotatedStyle(component.style).bottom),
      )
      let centerY = (minTop + maxBottom) / 2
      this.areaData.components.forEach((component) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        let componentCenterY = (rotatedStyle.top + rotatedStyle.bottom) / 2
        let diffY = centerY - componentCenterY
        this.changeAlign(component, { top: component.style.top + diffY })
      })
    } else {
      let rotatedStyle = getComponentRotatedStyle(this.curComponent.style)
      let canvasCenterY = this.canvasStyleData.height / 2
      let componentCenterY = (rotatedStyle.top + rotatedStyle.bottom) / 2
      let newTop = this.curComponent.style.top + (canvasCenterY - componentCenterY)
      this.changeAlign(this.curComponent, { top: newTop })
    }
  },
  verticalSpacing() {
    const components = this.areaData.components
    if (components.length > 2) {
      let totalHeight = 0
      components.forEach((component) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        totalHeight += rotatedStyle.height
      })
      const containerHeight = this.areaData.style.height
      const availableSpace = containerHeight - totalHeight
      const spacing = Math.floor(availableSpace / (components.length - 1))
      components.sort((a, b) => getComponentRotatedStyle(a.style).top - getComponentRotatedStyle(b.style).top)
      let currentTop = 0
      components.forEach((component) => {
        this.changeAlign(component, { top: this.areaData.style.top + currentTop })
        currentTop += spacing + getComponentRotatedStyle(component.style).height
      })
    }
  },
  horizontalSpacing() {
    const components = this.areaData.components
    if (components.length > 2) {
      let totalWidth = 0
      components.forEach((component) => {
        let rotatedStyle = getComponentRotatedStyle(component.style)
        totalWidth += rotatedStyle.width
      })
      const containerWidth = this.areaData.style.width
      const availableSpace = containerWidth - totalWidth
      const spacing = Math.floor(availableSpace / (components.length - 1))
      components.sort((a, b) => getComponentRotatedStyle(a.style).left - getComponentRotatedStyle(b.style).left)
      let currentLeft = 0
      components.forEach((component) => {
        component.style.left = this.areaData.style.left + currentLeft
        currentLeft += spacing + getComponentRotatedStyle(component.style).width
      })
    }
  },
}
