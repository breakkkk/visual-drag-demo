<template>
  <div class="mark-line">
    <div
      v-for="line in lines"
      v-show="lineStatus[line] || false"
      :key="line"
      :ref="(el) => setLineRef(el, line)"
      class="line"
      :class="line.includes('x') ? 'xline' : 'yline'"
    ></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'
import eventBus from '@/utils/eventBus'
import { getComponentRotatedStyle } from '@/utils/style'

const store = useStore()
const { curComponent, componentData } = storeToRefs(store)

const lines = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr']
const diff = 3
const lineStatus = reactive({
  xt: false,
  xc: false,
  xb: false,
  yl: false,
  yc: false,
  yr: false,
})
const linesRef = ref({})

const setLineRef = (el, line) => {
  if (el) {
    linesRef.value[line] = el
  }
}

onMounted(() => {
  // 监听元素移动和不移动的事件
  eventBus.on('move', (isDownward, isRightward) => {
    showLine(isDownward, isRightward)
  })

  eventBus.on('unmove', () => {
    hideLine()
  })
})

function hideLine() {
  Object.keys(lineStatus).forEach((line) => {
    lineStatus[line] = false
  })
}

function showLine(isDownward, isRightward) {
  const linesEl = linesRef.value
  const components = componentData.value
  const curComponentStyle = getComponentRotatedStyle(curComponent.value.style)
  const curComponentHalfwidth = curComponentStyle.width / 2
  const curComponentHalfHeight = curComponentStyle.height / 2

  hideLine()
  components.forEach((component) => {
    if (component == curComponent.value) return
    const componentStyle = getComponentRotatedStyle(component.style)
    const { top, left, bottom, right } = componentStyle
    const componentHalfwidth = componentStyle.width / 2
    const componentHalfHeight = componentStyle.height / 2

    const conditions = {
      top: [
        {
          isNearly: isNearly(curComponentStyle.top, top),
          lineNode: linesEl.xt, // xt
          line: 'xt',
          dragShift: top,
          lineShift: top,
        },
        {
          isNearly: isNearly(curComponentStyle.bottom, top),
          lineNode: linesEl.xt, // xt
          line: 'xt',
          dragShift: top - curComponentStyle.height,
          lineShift: top,
        },
        {
          // 组件与拖拽节点的中间是否对齐
          isNearly: isNearly(curComponentStyle.top + curComponentHalfHeight, top + componentHalfHeight),
          lineNode: linesEl.xc, // xc
          line: 'xc',
          dragShift: top + componentHalfHeight - curComponentHalfHeight,
          lineShift: top + componentHalfHeight,
        },
        {
          isNearly: isNearly(curComponentStyle.top, bottom),
          lineNode: linesEl.xb, // xb
          line: 'xb',
          dragShift: bottom,
          lineShift: bottom,
        },
        {
          isNearly: isNearly(curComponentStyle.bottom, bottom),
          lineNode: linesEl.xb, // xb
          line: 'xb',
          dragShift: bottom - curComponentStyle.height,
          lineShift: bottom,
        },
      ],
      left: [
        {
          isNearly: isNearly(curComponentStyle.left, left),
          lineNode: linesEl.yl, // yl
          line: 'yl',
          dragShift: left,
          lineShift: left,
        },
        {
          isNearly: isNearly(curComponentStyle.right, left),
          lineNode: linesEl.yl, // yl
          line: 'yl',
          dragShift: left - curComponentStyle.width,
          lineShift: left,
        },
        {
          // 组件与拖拽节点的中间是否对齐
          isNearly: isNearly(curComponentStyle.left + curComponentHalfwidth, left + componentHalfwidth),
          lineNode: linesEl.yc, // yc
          line: 'yc',
          dragShift: left + componentHalfwidth - curComponentHalfwidth,
          lineShift: left + componentHalfwidth,
        },
        {
          isNearly: isNearly(curComponentStyle.left, right),
          lineNode: linesEl.yr, // yr
          line: 'yr',
          dragShift: right,
          lineShift: right,
        },
        {
          isNearly: isNearly(curComponentStyle.right, right),
          lineNode: linesEl.yr, // yr
          line: 'yr',
          dragShift: right - curComponentStyle.width,
          lineShift: right,
        },
      ],
    }

    const needToShow = []
    const { rotate } = curComponent.value.style
    Object.keys(conditions).forEach((key) => {
      // 遍历符合的条件并处理
      conditions[key].forEach((condition) => {
        if (!condition.isNearly) return
        // 修改当前组件位移
        store.setShapeSingleStyle({
          key,
          value:
            rotate != 0 ? translatecurComponentShift(key, condition, curComponentStyle) : condition.dragShift,
        })

        condition.lineNode.style[key] = `${condition.lineShift}px`
        needToShow.push(condition.line)
      })
    })

    // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
    // 同一方向上的线只显示一条，例如多条横条只显示一条横线
    if (needToShow.length) {
      chooseTheTureLine(needToShow, isDownward, isRightward)
    }
  })
}

function translatecurComponentShift(key, condition, curComponentStyle) {
  const { width, height } = curComponent.value.style
  if (key == 'top') {
    return Math.round(condition.dragShift - (height - curComponentStyle.height) / 2)
  }

  return Math.round(condition.dragShift - (width - curComponentStyle.width) / 2)
}

function chooseTheTureLine(needToShow, isDownward, isRightward) {
  // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
  // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
  if (isRightward) {
    if (needToShow.includes('yr')) {
      lineStatus.yr = true
    } else if (needToShow.includes('yc')) {
      lineStatus.yc = true
    } else if (needToShow.includes('yl')) {
      lineStatus.yl = true
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (needToShow.includes('yl')) {
      lineStatus.yl = true
    } else if (needToShow.includes('yc')) {
      lineStatus.yc = true
    } else if (needToShow.includes('yr')) {
      lineStatus.yr = true
    }
  }

  if (isDownward) {
    if (needToShow.includes('xb')) {
      lineStatus.xb = true
    } else if (needToShow.includes('xc')) {
      lineStatus.xc = true
    } else if (needToShow.includes('xt')) {
      lineStatus.xt = true
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (needToShow.includes('xt')) {
      lineStatus.xt = true
    } else if (needToShow.includes('xc')) {
      lineStatus.xc = true
    } else if (needToShow.includes('xb')) {
      lineStatus.xb = true
    }
  }
}

function isNearly(dragValue, targetValue) {
  return Math.abs(dragValue - targetValue) <= diff
}
</script>

<style lang="scss" scoped>
.mark-line {
  height: 100%;
}

.line {
  background: #59c7f9;
  position: absolute;
  z-index: 1000;
}

.xline {
  width: 100%;
  height: 1px;
}

.yline {
  width: 1px;
  height: 100%;
}
</style>
