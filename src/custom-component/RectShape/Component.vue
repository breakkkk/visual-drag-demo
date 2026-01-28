<template>
  <div ref="rectRef" class="rect-shape">
    <v-text :prop-value="element.propValue" :element="element" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useOnEvent } from '../common/useOnEvent'

const props = defineProps({
  propValue: {
    type: String,
    required: true,
    default: '',
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

const rectRef = ref(null)
useOnEvent(props, rectRef)
</script>

<style lang="scss" scoped>
.rect-shape {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
