<template>
  <div @click="onClick" @mouseenter="onMouseEnter">
    <component
      :is="config.component"
      v-if="config.component.startsWith('SVG')"
      ref="componentRef"
      class="component"
      :style="getSVGStyle(config.style)"
      :prop-value="config.propValue"
      :element="config"
      :request="config.request"
      :linkage="config.linkage"
    />

    <component
      :is="config.component"
      v-else
      ref="componentRef"
      class="component"
      :style="getStyle(config.style)"
      :prop-value="config.propValue"
      :element="config"
      :request="config.request"
      :linkage="config.linkage"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getStyle, getSVGStyle } from '@/utils/style'
import runAnimation from '@/utils/runAnimation'
import { events } from '@/utils/events'
import eventBus from '@/utils/eventBus'

const props = defineProps({
  config: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

const componentRef = ref(null)

onMounted(() => {
  const el = componentRef.value?.$el || componentRef.value
  runAnimation(el, props.config.animations)
})

function onClick() {
  const componentEvents = props.config.events
  Object.keys(componentEvents).forEach((event) => {
    events[event](componentEvents[event])
  })

  eventBus.emit('v-click', props.config.id)
}

function onMouseEnter() {
  eventBus.emit('v-hover', props.config.id)
}
</script>

<style lang="scss" scoped>
.component {
  position: absolute;
}
</style>
