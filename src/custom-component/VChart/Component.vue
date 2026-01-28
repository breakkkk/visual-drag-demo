<template>
  <v-chart ref="chart" class="chart" :option="propValue.option" autoresize />
</template>

<script setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart, BarChart, LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { useOnEvent } from '../common/useOnEvent'

use([
  CanvasRenderer,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  LineChart,
])

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
})

const chart = ref(null)
useOnEvent(props, chart)
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
