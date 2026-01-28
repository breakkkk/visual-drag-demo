<template>
  <div
    id="editor"
    class="editor"
    :class="{ edit: isEdit }"
    :style="{
      ...getCanvasStyle(canvasStyleData),
      width: changeStyleWithScale(canvasStyleData.width) + 'px',
      height: changeStyleWithScale(canvasStyleData.height) + 'px',
    }"
    @contextmenu="handleContextMenu"
    @mousedown="handleMouseDown"
  >
    <!-- 网格线 -->
    <Grid :is-dark-mode="isDarkMode" />

    <!--页面组件列表展示-->
    <Shape
      v-for="(item, index) in componentData"
      :key="item.id"
      :default-style="item.style"
      :style="getShapeStyle(item.style)"
      :active="item.id === (curComponent || {}).id"
      :element="item"
      :index="index"
      :class="{ lock: item.isLock }"
    >
      <component
        :is="item.component"
        v-if="item.component.startsWith('SVG')"
        :id="'component' + item.id"
        :style="getSVGStyleWrapper(item.style)"
        class="component"
        :prop-value="item.propValue"
        :element="item"
        :request="item.request"
      />

      <component
        :is="item.component"
        v-else-if="item.component != 'VText'"
        :id="'component' + item.id"
        class="component"
        :style="getComponentStyleWrapper(item.style)"
        :prop-value="item.propValue"
        :element="item"
        :request="item.request"
      />

      <component
        :is="item.component"
        v-else
        :id="'component' + item.id"
        class="component"
        :style="getComponentStyleWrapper(item.style)"
        :prop-value="item.propValue"
        :element="item"
        :request="item.request"
        @input="handleInput"
      />
    </Shape>
    <!-- 右击菜单 -->
    <ContextMenu />
    <!-- 标线 -->
    <MarkLine />
    <!-- 选中区域 -->
    <Area v-show="isShowArea" :start="start" :width="width" :height="height" />
    <!-- 选择的组件包裹层 -->
    <GroupComponentBox v-if="areaData?.components?.length" v-bind="areaData.style" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'
import Shape from './Shape.vue'
import ContextMenu from './ContextMenu.vue'
import MarkLine from './MarkLine.vue'
import Area from './Area.vue'
import GroupComponentBox from './GroupComponentBox.vue'
import Grid from './Grid.vue'
import { getStyle, getComponentRotatedStyle, getShapeStyle, getSVGStyle, getCanvasStyle } from '@/utils/style'
import { $, isPreventDrop } from '@/utils/utils'
import eventBus from '@/utils/eventBus'
import { changeStyleWithScale } from '@/utils/translate'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: true,
  },
})

const store = useStore()
const { componentData, curComponent, canvasStyleData, editor, isDarkMode, areaData } = storeToRefs(store)

const editorX = ref(0)
const editorY = ref(0)
const start = ref({ x: 0, y: 0 })
const width = ref(0)
const height = ref(0)
const isShowArea = ref(false)
const svgFilterAttrs = ['width', 'height', 'top', 'left', 'rotate']

onMounted(() => {
  store.getEditor()
  eventBus.on('hideArea', hideArea)
})

function handleMouseDown(e) {
  if (!curComponent.value || isPreventDrop(curComponent.value.component)) {
    e.preventDefault()
  }
  hideArea()
  const rectInfo = editor.value.getBoundingClientRect()
  editorX.value = rectInfo.x
  editorY.value = rectInfo.y
  const startX = e.clientX
  const startY = e.clientY
  start.value.x = startX - editorX.value
  start.value.y = startY - editorY.value
  isShowArea.value = true

  const move = (moveEvent) => {
    width.value = Math.abs(moveEvent.clientX - startX)
    height.value = Math.abs(moveEvent.clientY - startY)
    if (moveEvent.clientX < startX) {
      start.value.x = moveEvent.clientX - editorX.value
    }
    if (moveEvent.clientY < startY) {
      start.value.y = moveEvent.clientY - editorY.value
    }
  }

  const up = (e) => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    if (e.clientX == startX && e.clientY == startY) {
      hideArea()
      return
    }
    createGroup()
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

function hideArea() {
  isShowArea.value = false
  width.value = 0
  height.value = 0
  store.setAreaData({
    style: { left: 0, top: 0, width: 0, height: 0 },
    components: [],
  })
}

function createGroup() {
  const areaDataResult = getSelectArea()
  if (areaDataResult.length <= 1) {
    hideArea()
    return
  }
  let top = Infinity,
    left = Infinity
  let right = -Infinity,
    bottom = -Infinity
  areaDataResult.forEach((component) => {
    let style = {}
    if (component.component == 'Group') {
      component.propValue.forEach((item) => {
        const rectInfo = $(`#component${item.id}`).getBoundingClientRect()
        style.left = rectInfo.left - editorX.value
        style.top = rectInfo.top - editorY.value
        style.right = rectInfo.right - editorX.value
        style.bottom = rectInfo.bottom - editorY.value
        if (style.left < left) left = style.left
        if (style.top < top) top = style.top
        if (style.right > right) right = style.right
        if (style.bottom > bottom) bottom = style.bottom
      })
    } else {
      style = getComponentRotatedStyle(component.style)
    }
    if (style.left < left) left = style.left
    if (style.top < top) top = style.top
    if (style.right > right) right = style.right
    if (style.bottom > bottom) bottom = style.bottom
  })
  start.value.x = left
  start.value.y = top
  width.value = right - left
  height.value = bottom - top
  store.setAreaData({
    style: { left, top, width: width.value, height: height.value },
    components: areaDataResult,
  })
  isShowArea.value = false
}

function getSelectArea() {
  const result = []
  const { x, y } = start.value
  componentData.value.forEach((component) => {
    if (component.isLock) return
    const { left, top, width: w, height: h } = getComponentRotatedStyle(component.style)
    if (x <= left && y <= top && left + w <= x + width.value && top + h <= y + height.value) {
      result.push(component)
    }
  })
  return result
}

function handleContextMenu(e) {
  e.stopPropagation()
  e.preventDefault()
  let editorEl = document.querySelector('.editor')
  let editorRect = editorEl.getBoundingClientRect()
  let left = e.clientX - editorRect.left
  let top = e.clientY - editorRect.top
  let adjustedLeft = left > editorRect.width ? editorRect.width : left
  let adjustedTop = top > editorRect.height ? editorRect.height : top
  store.showContextMenu({ top: adjustedTop, left: adjustedLeft })
}

function getComponentStyleWrapper(style) {
  return getStyle(style, svgFilterAttrs)
}

function getSVGStyleWrapper(style) {
  return getSVGStyle(style, svgFilterAttrs)
}

function handleInput(element, value) {
  store.setShapeStyle({ height: getTextareaHeight(element, value) })
}

function getTextareaHeight(element, text) {
  let { lineHeight, fontSize, height } = element.style
  if (lineHeight === '') {
    lineHeight = 1.5
  }
  const newHeight = (text.split('<br>').length - 1) * lineHeight * (fontSize || canvasStyleData.value.fontSize)
  return height > newHeight ? height : newHeight
}
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  background: #fff;
  margin: auto;

  .lock {
    opacity: 0.5;

    &:hover {
      cursor: not-allowed;
    }
  }
}

.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>
