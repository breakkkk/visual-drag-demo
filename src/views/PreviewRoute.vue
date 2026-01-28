<template>
  <FormPreview :componentData="componentData" :canvasStyleData="canvasStyleData" />
</template>
<script lang="ts" setup>
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'
import FormPreview from './FormPreview.vue'

const store = useStore()
const { componentData, canvasStyleData } = storeToRefs(store)
console.log('componentData', componentData)
</script>
