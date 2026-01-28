<template>
  <div ref="circleRef" class="circle-shape">
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

const circleRef = ref(null)
useOnEvent(props, circleRef)
</script>

<style lang="scss" scoped>
.circle-shape {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: auto;
}
</style>
