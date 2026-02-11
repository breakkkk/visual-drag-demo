<template>
  <div class="v-common-attr" @mousedown="setInitial(curComponent.style)">
    <el-collapse v-model="activeName" accordion @change="onChange">
      <el-collapse-item title="通用样式" name="style">
        <el-form>
          <el-form-item v-for="({ key, label, component }, index) in styleKeys" :key="index" :label="label">
            <el-color-picker v-if="isIncludesColor(key)" v-model="curComponent.style[key]" show-alpha></el-color-picker>
            <el-select v-else-if="selectKey.includes(key)" v-model="curComponent.style[key]">
              <el-option
                v-for="item in optionMap[key]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-else-if="key == 'fontSize' && curComponent.component == 'VText'"
              v-model.number="curComponent.style[key]"
              type="number"
              @input="setFontSize(curComponent)"
            />
            <component
              :is="component + '-prop'"
              v-else-if="component"
              v-model="curComponent.style[key]"
              @change="updateShapeStyle"
            />
            <el-input v-else v-model.number="curComponent.style[key]" type="number" />
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <!-- <Request v-if="curComponent.request"></Request>
      <Linkage v-if="curComponent.linkage"></Linkage> -->
    </el-collapse>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'
import { styleData, selectKey, optionMap } from '@/utils/attr'
import Request from './Request.vue'
import Linkage from './Linkage.vue'

const store = useStore()
const { curComponent } = storeToRefs(store)

const activeName = ref('')
const initialStyle = ref(null)

const styleKeys = computed(() => {
  if (curComponent.value) {
    const curComponentStyleKeys = Object.keys(curComponent.value.style)
    return styleData.filter((item) => curComponentStyleKeys.includes(item.key))
  }
  return []
})

watch(curComponent, () => {
  activeName.value = curComponent.value.collapseName
})

onMounted(() => {
  activeName.value = curComponent.value.collapseName
})

function setInitial(style) {
  initialStyle.value = JSON.parse(JSON.stringify(style))
}

function setFontSize() {
  const proportion = curComponent.value.style.fontSize / initialStyle.value.fontSize
  const updatedStyle = {
    width: (proportion * initialStyle.value.width).toFixed(4),
    height: (proportion * initialStyle.value.height).toFixed(4),
    padding: {
      left: (proportion * initialStyle.value.padding.left).toFixed(4),
      right: (proportion * initialStyle.value.padding.right).toFixed(4),
      top: (proportion * initialStyle.value.padding.top).toFixed(4),
      bottom: (proportion * initialStyle.value.padding.bottom).toFixed(4),
    },
  }
  store.setShapeStyle(updatedStyle)
  store.recordSnapshot()
}

function onChange() {
  curComponent.value.collapseName = activeName.value
}

function isIncludesColor(str) {
  return str.toLowerCase().includes('color')
}
</script>

<style lang="scss">
.v-common-attr {
  .el-input-group__prepend {
    padding: 0 10px;
  }
}
</style>
