<template>
  <div class="real-time-component-list">
    <div
      v-for="(item, index) in componentData"
      :key="index"
      class="list"
      :class="{ actived: transformIndex(index) === curComponentIndex }"
      @click="onClick(transformIndex(index))"
    >
      <span class="iconfont" :class="'icon-' + getComponent(index).icon"></span>
      <span>{{ getComponent(index).label }}</span>
      <div class="icon-container">
        <span class="iconfont icon-shangyi" @click="upComponent(transformIndex(index))"></span>
        <span class="iconfont icon-xiayi" @click="downComponent(transformIndex(index))"></span>
        <span class="iconfont icon-shanchu" @click="deleteComponent(transformIndex(index))"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'

const store = useStore()
const { componentData, curComponentIndex, rightList } = storeToRefs(store)

function getComponent(index) {
  return componentData.value[componentData.value.length - 1 - index]
}

function transformIndex(index) {
  return componentData.value.length - 1 - index
}

function onClick(index) {
  if (!rightList.value) {
    store.isShowRightList()
  }
  setCurComponent(index)
}

function deleteComponent() {
  setTimeout(() => {
    store.deleteComponent()
    store.recordSnapshot()
  })
}

function upComponent() {
  setTimeout(() => {
    store.upComponent()
    store.recordSnapshot()
  })
}

function downComponent() {
  setTimeout(() => {
    store.downComponent()
    store.recordSnapshot()
  })
}

function setCurComponent(index) {
  store.setCurComponent({ component: componentData.value[index], index })
}
</script>

<style lang="scss" scoped>
.real-time-component-list {
  height: 35%;

  .list {
    height: 30px;
    cursor: grab;
    text-align: center;
    color: #333;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0 10px;
    position: relative;
    user-select: none;
    opacity: 1;

    &:active {
      cursor: grabbing;
    }

    &:hover {
      background-color: rgba(200, 200, 200, 0.2);

      .icon-container {
        display: block;
      }
    }

    .iconfont {
      margin-right: 4px;
      font-size: 16px;
    }

    .icon-wenben,
    .icon-tupian {
      font-size: 14px;
    }

    .icon-container {
      position: absolute;
      right: 10px;
      display: none;

      .iconfont {
        cursor: pointer;
      }
    }
  }

  .actived {
    background: #ecf5ff;
    color: #409eff;
  }
}
</style>
