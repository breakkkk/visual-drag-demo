<template>
  <div class="canvas-container">
    <div
      class="canvas"
      :style="{
        ...getCanvasStyle(canvasStyleData),
        width: changeStyleWithScale(canvasStyleData.width) + 'px',
        height: changeStyleWithScale(canvasStyleData.height) + 'px',
      }"
    >
      <ComponentWrapper v-for="(item, index) in copyData" :key="index" :config="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ComponentWrapper from '@/components/Editor/ComponentWrapper.vue'
import { getStyle, getCanvasStyle } from '@/utils/style'
import { changeStyleWithScale } from '@/utils/translate'
import { deepCopy } from '@/utils/utils'

type IProps = {
  componentData: Project.ComponentData[]
  canvasStyleData: Project.CanvasStyleData
}

const props = defineProps<IProps>()

const emit = defineEmits(['close'])

const copyData = ref([])
const container = ref(null)

onMounted(() => {
  copyData.value = deepCopy(props.componentData)
})

function close() {
  emit('close')
}
</script>

<style lang="scss" scoped>
.canvas-container {
  width: calc(100% - 40px);
  height: calc(100% - 120px);
  overflow: auto;

  .canvas {
    background: #fff;
    position: relative;
    margin: auto;
  }
}

.close {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
