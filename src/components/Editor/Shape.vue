<template>
  <div ref="shapeRef" class="shape" :class="{ active }" @click="selectCurComponent" @mousedown="handleMouseDownOnShape">
    <span v-show="isActive()" class="iconfont icon-xiangyouxuanzhuan" @mousedown="handleRotate"></span>
    <span v-show="element.isLock" class="iconfont icon-suo"></span>
    <div
      v-for="item in isActive() ? getPointList() : []"
      :key="item"
      class="shape-point"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'
import eventBus from '@/utils/eventBus'
import runAnimation from '@/utils/runAnimation'
import calculateComponentPositonAndSize from '@/utils/calculateComponentPositonAndSize'
import { mod360 } from '@/utils/translate'
import { isPreventDrop } from '@/utils/utils'

const props = defineProps({
  active: { type: Boolean, default: false },
  element: { type: Object, required: true },
  defaultStyle: { type: Object, required: true },
  index: { type: [Number, String], required: true, default: 0 },
})

const store = useStore()
const { curComponent, editor, rightList } = storeToRefs(store)

const pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']
const pointList2 = ['r', 'l']
const initialAngle = { lt: 0, t: 45, rt: 90, r: 135, rb: 180, b: 225, lb: 270, l: 315 }
const angleToCursor = [
  { start: 338, end: 23, cursor: 'nw' },
  { start: 23, end: 68, cursor: 'n' },
  { start: 68, end: 113, cursor: 'ne' },
  { start: 113, end: 158, cursor: 'e' },
  { start: 158, end: 203, cursor: 'se' },
  { start: 203, end: 248, cursor: 's' },
  { start: 248, end: 293, cursor: 'sw' },
  { start: 293, end: 338, cursor: 'w' },
]
const cursors = ref({})
const shapeRef = ref(null)

onMounted(() => {
  if (curComponent.value) {
    cursors.value = getCursor()
  }
  eventBus.on('runAnimation', () => {
    if (props.element == curComponent.value) {
      runAnimation(shapeRef.value, curComponent.value.animations)
    }
  })
  eventBus.on('stopAnimation', () => {
    shapeRef.value.classList.remove('animated', 'infinite')
  })
})

function getPointList() {
  return props.element.component === 'line-shape' ? pointList2 : pointList
}

function isActive() {
  return props.active && !props.element.isLock
}

function handleRotate(e) {
  store.setClickComponentStatus(true)
  e.preventDefault()
  e.stopPropagation()
  const pos = { ...props.defaultStyle }
  const startY = e.clientY
  const startX = e.clientX
  const startRotate = pos.rotate

  const rect = shapeRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)
  let hasMove = false

  const move = (moveEvent) => {
    hasMove = true
    const curX = moveEvent.clientX
    const curY = moveEvent.clientY
    const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
    pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore
    store.setShapeStyle(pos)
  }

  const up = () => {
    hasMove && store.recordSnapshot()
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    cursors.value = getCursor()
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

function getPointStyle(point) {
  const { width, height } = props.defaultStyle
  const hasT = /t/.test(point)
  const hasB = /b/.test(point)
  const hasL = /l/.test(point)
  const hasR = /r/.test(point)
  let newLeft = 0
  let newTop = 0

  if (point.length === 2) {
    newLeft = hasL ? 0 : width
    newTop = hasT ? 0 : height
  } else {
    if (hasT || hasB) {
      newLeft = width / 2
      newTop = hasT ? 0 : height
    }
    if (hasL || hasR) {
      newLeft = hasL ? 0 : width
      newTop = Math.floor(height / 2)
    }
  }

  return {
    marginLeft: '-4px',
    marginTop: '-4px',
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: cursors.value[point],
  }
}

function getCursor() {
  const { rotate } = curComponent.value.style
  const rotateMod = mod360(rotate)
  const result = {}
  let lastMatchIndex = -1

  pointList.forEach((point) => {
    const angle = mod360(initialAngle[point] + rotateMod)
    const len = angleToCursor.length
    while (true) {
      lastMatchIndex = (lastMatchIndex + 1) % len
      const angleLimit = angleToCursor[lastMatchIndex]
      if (angle < 23 || angle >= 338) {
        result[point] = 'nw-resize'
        return
      }
      if (angleLimit.start <= angle && angle < angleLimit.end) {
        result[point] = `${angleLimit.cursor}-resize`
        return
      }
    }
  })
  return result
}

function handleMouseDownOnShape(e) {
  nextTick(() => eventBus.emit('componentClick'))
  store.setInEditorStatus(true)
  store.setClickComponentStatus(true)
  if (isPreventDrop(props.element.component)) {
    e.preventDefault()
  }
  e.stopPropagation()
  store.setCurComponent({ component: props.element, index: props.index })
  if (props.element.isLock) return

  cursors.value = getCursor()
  const pos = { ...props.defaultStyle }
  const startY = e.clientY
  const startX = e.clientX
  const startTop = Number(pos.top)
  const startLeft = Number(pos.left)
  let hasMove = false

  const move = (moveEvent) => {
    hasMove = true
    const curX = moveEvent.clientX
    const curY = moveEvent.clientY
    pos.top = curY - startY + startTop
    pos.left = curX - startX + startLeft
    store.setShapeStyle(pos)
    nextTick(() => {
      eventBus.emit('move', curY - startY > 0, curX - startX > 0)
    })
  }

  const up = () => {
    hasMove && store.recordSnapshot()
    eventBus.emit('unmove')
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

function selectCurComponent(e) {
  e.stopPropagation()
  e.preventDefault()
  store.hideContextMenu()
  if (!rightList.value) {
    store.isShowRightList()
  }
}

function handleMouseDownOnPoint(point, e) {
  store.setInEditorStatus(true)
  store.setClickComponentStatus(true)
  e.stopPropagation()
  e.preventDefault()
  const style = { ...props.defaultStyle }
  const proportion = style.width / style.height
  const center = {
    x: style.left + style.width / 2,
    y: style.top + style.height / 2,
  }
  const editorRectInfo = editor.value.getBoundingClientRect()
  const pointRect = e.target.getBoundingClientRect()
  const curPoint = {
    x: Math.round(pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2),
    y: Math.round(pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2),
  }
  const symmetricPoint = {
    x: center.x - (curPoint.x - center.x),
    y: center.y - (curPoint.y - center.y),
  }
  let needSave = false
  let isFirst = true
  const needLockProportion = isNeedLockProportion()

  const move = (moveEvent) => {
    if (isFirst) {
      isFirst = false
      return
    }
    needSave = true
    const curPositon = {
      x: moveEvent.clientX - Math.round(editorRectInfo.left),
      y: moveEvent.clientY - Math.round(editorRectInfo.top),
    }
    calculateComponentPositonAndSize(point, style, curPositon, proportion, needLockProportion, {
      center,
      curPoint,
      symmetricPoint,
    })
    store.setShapeStyle(style)
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    needSave && store.recordSnapshot()
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

function isNeedLockProportion() {
  if (props.element.component != 'Group') return false
  const ratates = [0, 90, 180, 360]
  for (const component of props.element.propValue) {
    if (!ratates.includes(mod360(parseInt(component.style.rotate)))) {
      return true
    }
  }
  return false
}
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }
}

.active {
  outline: 1px solid #70c0ff;
  user-select: none;
}

.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}

.icon-xiangyouxuanzhuan {
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  cursor: grab;
  color: #59c7f9;
  font-size: 20px;
  font-weight: 600;

  &:active {
    cursor: grabbing;
  }
}

.icon-suo {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
