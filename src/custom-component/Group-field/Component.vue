<template>
  <div ref="groupRef" class="group">
    <div>
      <component
        :is="item.component"
        v-for="item in propValue"
        :id="'component' + item.id"
        :key="item.id"
        class="component"
        :style="item.groupStyle"
        :prop-value="item.propValue"
        :element="item"
        :request="item.request"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useOnEvent } from '../common/useOnEvent'

const props = defineProps({
  propValue: {
    type: Array,
    default: () => [],
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

const groupRef = ref(null)
useOnEvent(props, groupRef)
</script>

<style lang="scss" scoped>
.group {
  & > div {
    position: relative;
    width: 100%;
    height: 100%;

    .component {
      position: absolute;
    }
  }
}
</style>
