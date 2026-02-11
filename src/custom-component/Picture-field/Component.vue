<template>
  <div style="overflow: hidden">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useOnEvent } from '../common/useOnEvent'

const props = defineProps({
  propValue: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  element: {
    type: Object,
    default: () => {},
  },
  linkage: {
    type: Object,
    default: () => {},
  },
  request: {
    type: Object,
    default: () => {},
  },
})

const canvasRef = ref(null)
let img = null
let ctx = null
let isFirst = true

useOnEvent(props, canvasRef)

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  drawImage()
})

watch(
  () => props.propValue.url,
  () => {
    isFirst = true
    drawImage()
  },
)
watch(() => props.element.style.width, drawImage)
watch(() => props.element.style.height, drawImage)
watch(() => props.propValue.flip.vertical, mirrorFlip)
watch(() => props.propValue.flip.horizontal, mirrorFlip)

function drawImage() {
  const { width, height } = props.element.style
  const dpr = window.devicePixelRatio || 1
  canvasRef.value.width = Math.round(width * dpr)
  canvasRef.value.height = Math.round(height * dpr)
  canvasRef.value.style.width = width + 'px'
  canvasRef.value.style.height = height + 'px'

  if (isFirst) {
    isFirst = false
    img = document.createElement('img')
    img.src = props.propValue.url
    img.onload = () => {
      mirrorFlip()
    }
  } else {
    mirrorFlip()
  }
}

function mirrorFlip() {
  const dpr = window.devicePixelRatio || 1
  const { vertical, horizontal } = props.propValue.flip
  const { width, height } = props.element.style
  const hvalue = horizontal ? -1 : 1
  const vValue = vertical ? -1 : 1

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  ctx.scale(dpr, dpr)
  ctx.translate(width / 2 - (width * hvalue) / 2, height / 2 - (height * vValue) / 2)
  ctx.scale(hvalue, vValue)
  ctx.drawImage(img, 0, 0, width, height)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
</script>
