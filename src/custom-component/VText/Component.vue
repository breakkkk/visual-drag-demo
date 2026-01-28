<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="editMode == 'edit'" class="v-text" @keydown="handleKeydown" @keyup="handleKeyup">
    <!-- tabindex >= 0 使得双击时聚焦该元素 -->
    <div
      ref="textRef"
      :contenteditable="canEdit"
      :class="{ 'can-edit': canEdit }"
      tabindex="0"
      :style="{ verticalAlign: element.style.verticalAlign, padding: element.style.padding + 'px' }"
      @dblclick="setEdit"
      @paste="clearStyle"
      @mousedown="handleMousedown"
      @blur="handleBlur"
      @input="handleInput"
      v-html="element.propValue"
    ></div>
  </div>
  <div v-else class="v-text preview">
    <div
      :style="{ verticalAlign: element.style.verticalAlign, padding: element.style.padding + 'px' }"
      v-html="element.propValue"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'
import { keycodes } from '@/utils/shortcutKey'
import requestFn from '@/utils/request'
import eventBus from '@/utils/eventBus'
import { useOnEvent } from '../common/useOnEvent'

const props = defineProps({
  propValue: {
    type: String,
    required: true,
    default: '',
  },
  request: {
    type: Object,
    default: () => {},
  },
  element: {
    type: Object,
    default: () => {},
  },
  linkage: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['input'])

const store = useStore()
const { editMode, curComponent } = storeToRefs(store)

const canEdit = ref(false)
const ctrlKey = 17
const isCtrlDown = ref(false)
let cancelRequest = null
const textRef = ref(null)

useOnEvent(props, textRef)

onMounted(() => {
  if (props.request) {
    cancelRequest = requestFn(props.request, props.element, 'propValue', 'string')
  }
  eventBus.on('componentClick', onComponentClick)
})

onBeforeUnmount(() => {
  if (props.request && cancelRequest) {
    cancelRequest()
  }
  eventBus.off('componentClick', onComponentClick)
})

function onComponentClick() {
  if (curComponent.value && curComponent.value.id !== props.element.id) {
    canEdit.value = false
  }
}

function handleInput(e) {
  emit('input', props.element, e.target.innerHTML)
}

function handleKeydown(e) {
  if (canEdit.value) {
    e.stopPropagation()
  }
  if (e.keyCode == ctrlKey) {
    isCtrlDown.value = true
  } else if (isCtrlDown.value && canEdit.value && keycodes.includes(e.keyCode)) {
    e.stopPropagation()
  } else if (e.keyCode == 46) {
    e.stopPropagation()
  }
}

function handleKeyup(e) {
  if (canEdit.value) {
    e.stopPropagation()
  }
  if (e.keyCode == ctrlKey) {
    isCtrlDown.value = false
  }
}

function handleMousedown(e) {
  if (canEdit.value) {
    e.stopPropagation()
  }
}

function clearStyle(e) {
  e.preventDefault()
  const clp = e.clipboardData
  const text = clp.getData('text/plain') || ''
  if (text !== '') {
    document.execCommand('insertText', false, text)
  }
  emit('input', props.element, e.target.innerHTML)
}

function handleBlur(e) {
  props.element.propValue = e.target.innerHTML || '&nbsp;'
  const html = e.target.innerHTML
  if (html !== '') {
    props.element.propValue = e.target.innerHTML
  } else {
    props.element.propValue = ''
    nextTick(() => {
      props.element.propValue = '&nbsp;'
    })
  }
  canEdit.value = false
}

function setEdit() {
  if (props.element.isLock) return
  canEdit.value = true
  selectText(textRef.value)
}

function selectText(element) {
  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(element)
  selection.removeAllRanges()
  selection.addRange(range)
}
</script>

<style lang="scss" scoped>
.v-text {
  width: 100%;
  height: 100%;
  display: table;

  div {
    display: table-cell;
    width: 100%;
    height: 100%;
    outline: none;
    word-break: break-all;
    padding: 4px;
  }

  .can-edit {
    cursor: text;
    height: 100%;
  }
}

.preview {
  user-select: none;
}
</style>
