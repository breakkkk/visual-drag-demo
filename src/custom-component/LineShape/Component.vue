<template>
  <div ref="lineRef" class="line-shape"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useOnEvent } from '../common/useOnEvent'

const props = defineProps({
  element: {
    type: Object,
    default: () => {},
  },
  linkage: {
    type: Object,
    default: () => {},
  },
})

const lineRef = ref(null)
useOnEvent(props, lineRef)
</script>

<style lang="scss" scoped>
.line-shape {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
