import { deepCopy } from '@/utils/utils'
import { useStore } from '@/store'
import { divide, multiply } from 'mathjs'

const needToChangeAttrs = ['top', 'left', 'width', 'height', 'fontSize']
// 根据比例缩放组件尺寸
const getSnapshotSize = (val: number, scale: number, snapshotData: any = null) => {
  if (snapshotData) {
    // 根据比例计算新的属性值
    return (((val / snapshotData[0].lastScale) * scale).toFixed(4) as any) - 0
  } else {
    // 否则根据当前画布的比例计算新的属性值
    // @ts-ignore
    return (((val / store.canvasStyleData.scale) * scale).toFixed(4) as any) - 0
  }
}
export default function changeComponentsSizeWithScale(scale: number, snapshotData: any = null) {
  const store = useStore()
  const componentData = snapshotData || deepCopy(store.componentData)
  componentData.forEach((component: any) => {
    Object.keys(component.style).forEach((key) => {
      if (needToChangeAttrs.includes(key)) {
        let newKey = getSnapshotSize(component.style[key], scale, snapshotData)

        if (key == 'top' || key == 'left') {
          component.style[key] = newKey
        } else {
          component.style[key] = newKey == 0 ? 1 : newKey
        }
      } else if (key == 'padding') {
        Object.keys(component.style[key]).forEach((pKey) => {
          let newKey = getSnapshotSize(component.style[key], scale, snapshotData)

          component.style[key][pKey] = newKey == 0 ? 1 : newKey
        })
      }
    })
  })

  if (snapshotData) {
    return componentData
  }

  store.setComponentData(componentData)
  // 更新后的组件数据
  store.setCurComponent({
    component: componentData[store.curComponentIndex],
    index: store.curComponentIndex,
  })

  // 更新画布的比例
  store.setCanvasStyle({
    ...store.canvasStyleData,
    scale,
  })
}

const needToChangeAttrs2 = ['width', 'height', 'fontSize']
export function changeComponentSizeWithScale(component: any) {
  const store = useStore()
  Object.keys(component.style).forEach((key) => {
    if (needToChangeAttrs2.includes(key)) {
      if (key === 'fontSize' && component.style[key] === '') return

      component.style[key] = format(component.style[key], store.canvasStyleData.scale)
    } else if (key == 'padding') {
      Object.keys(component.style[key]).forEach((pKey) => {
        component.style[key][pKey] = format(component.style[key][pKey], store.canvasStyleData.scale)
      })
    }
  })
}

function format(value: any, scale: any) {
  return multiply(value, divide(parseFloat(scale), 100))
}
