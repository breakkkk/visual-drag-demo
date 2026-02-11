import { sin, cos, toPercent } from '@/utils/translate'

export function getShapeStyle(style: Project.ComponentStyle) {
  const result: any = {}
  ;['width', 'height', 'top', 'left', 'rotate'].forEach((attr) => {
    if (attr != 'rotate') {
      result[attr] = `${style[attr]}px`
    } else {
      result.transform = `rotate(${style[attr]}deg)`
    }
  })

  return result
}

const needUnit = ['fontSize', 'width', 'height', 'top', 'left', 'borderWidth', 'letterSpacing', 'borderRadius']

export function getSVGStyle(style: Project.ComponentStyle, filter: string[] = []) {
  const result: any = {}

  ;[
    'opacity',
    'width',
    'height',
    'top',
    'left',
    'rotate',
    'fontSize',
    'fontWeight',
    'lineHeight',
    'letterSpacing',
    'textAlign',
    'color',
  ].forEach((key) => {
    if (!filter.includes(key)) {
      if (key != 'rotate') {
        if (style[key] !== '') {
          result[key] = style[key]

          if (needUnit.includes(key)) {
            result[key] += 'px'
          }
        }
      } else {
        result.transform = `${key}(${style[key]}deg)`
      }
    }
  })

  return result
}

export function getStyle(style: Project.ComponentStyle, filter: string[] = []) {
  const result: any = {}
  Object.keys(style).forEach((key) => {
    if (!filter.includes(key)) {
      if (key == 'rotate') {
        result.transform = `${key}(${style[key]}deg)`
      } else if (key == 'padding') {
        if (style[key]) {
          result.padding = `${style[key].top}px ${style[key].right}px ${style[key].bottom}px ${style[key].left}px`
        }
      } else {
        if (style[key] !== '') {
          result[key] = style[key]

          if (needUnit.includes(key)) {
            result[key] += 'px'
          }
        }
      }
    }
  })

  return result
}

// 获取一个组件旋转 rotate 后的样式
export function getComponentRotatedStyle(style: Project.ComponentStyle) {
  style = { ...style }
  if (style.rotate != 0) {
    const newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate)
    const diffX = (style.width - newWidth) / 2 // 旋转后范围变小是正值，变大是负值
    style.left += diffX
    // @ts-ignore
    style.right = style.left + newWidth

    const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate)
    const diffY = (newHeight - style.height) / 2 // 始终是正
    style.top -= diffY
    // @ts-ignore
    style.bottom = style.top + newHeight

    style.width = newWidth
    style.height = newHeight
  } else {
    // @ts-ignore
    style.bottom = style.top + style.height
    // @ts-ignore
    style.right = style.left + style.width
  }

  return style
}

const filterKeys = ['width', 'height', 'scale']
export function getCanvasStyle(canvasStyleData: Project.CanvasStyleData) {
  const result: any = {}
  Object.keys(canvasStyleData)
    .filter((key) => !filterKeys.includes(key))
    .forEach((key) => {
      // @ts-ignore
      result[key] = canvasStyleData[key]
      if (key === 'fontSize') {
        result[key] += 'px'
      }
    })

  return result
}

export function createGroupStyle(groupComponent: Project.ComponentData) {
  const parentStyle = groupComponent.style
  groupComponent.propValue.forEach((component: Project.ComponentData) => {
    // component.groupStyle 的 top left 是相对于 group 组件的位置
    // 如果已存在 component.groupStyle，说明已经计算过一次了。不需要再次计算
    if (!Object.keys(component.groupStyle).length) {
      const style = { ...component.style }
      if (component.component.startsWith('SVG')) {
        component.groupStyle = getSVGStyle(style)
      } else {
        component.groupStyle = getStyle(style)
      }

      component.groupStyle.left = toPercent((style.left - parentStyle.left) / parentStyle.width)
      component.groupStyle.top = toPercent((style.top - parentStyle.top) / parentStyle.height)
      component.groupStyle.width = toPercent(style.width / parentStyle.width)
      component.groupStyle.height = toPercent(style.height / parentStyle.height)
    }
  })
}
