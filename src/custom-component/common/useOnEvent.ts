import { onMounted, onBeforeUnmount } from 'vue'
import eventBus from '@/utils/eventBus'

export function useOnEvent(props: any, elementRef: any) {
  function changeStyle(data: any[] = []) {
    data.forEach((item) => {
      item.style.forEach((e: any) => {
        if (e.key) {
          props.element.style[e.key] = e.value
        }
      })
    })
  }

  function onClick(componentId: string) {
    if (!props.linkage?.data) return
    const data = props.linkage.data.filter((item: any) => item.id === componentId && item.event === 'v-click')
    changeStyle(data)
  }

  function onHover(componentId: string) {
    if (!props.linkage?.data) return
    const data = props.linkage.data.filter((item: any) => item.id === componentId && item.event === 'v-hover')
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
