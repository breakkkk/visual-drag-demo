import { onMounted, onBeforeUnmount } from 'vue'
import eventBus from '@/utils/eventBus'

export function useOnEvent(props, elementRef) {
  function changeStyle(data = []) {
    data.forEach((item) => {
      item.style.forEach((e) => {
        if (e.key) {
          props.element.style[e.key] = e.value
        }
      })
    })
  }

  function onClick(componentId) {
    if (!props.linkage?.data) return
    const data = props.linkage.data.filter((item) => item.id === componentId && item.event === 'v-click')
    changeStyle(data)
  }

  function onHover(componentId) {
    if (!props.linkage?.data) return
    const data = props.linkage.data.filter((item) => item.id === componentId && item.event === 'v-hover')
    changeStyle(data)
  }

  onMounted(() => {
    if (props.linkage?.data?.length) {
      eventBus.on('v-click', onClick)
      eventBus.on('v-hover', onHover)
    }

    const { data, duration } = props.linkage || {}
    if (data?.length && elementRef?.value) {
      const el = elementRef.value.$el || elementRef.value
      if (el.style) {
        el.style.transition = `all ${duration}s`
      }
    }
  })

  onBeforeUnmount(() => {
    if (props.linkage?.data?.length) {
      eventBus.off('v-click', onClick)
      eventBus.off('v-hover', onHover)
    }
  })
}
