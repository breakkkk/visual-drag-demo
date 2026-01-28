<template>
  <div class="component-list" @dragstart="handleDragStart">
    <div v-for="(item, index) in componentList" :key="index" class="list" draggable="true" :data-index="index">
      <span v-if="item.icon.substr(0, 2) === 'el'" :class="item.icon"></span>
      <span v-else class="iconfont" :class="'icon-' + item.icon"></span>
    </div>
  </div>
</template>

<script setup>
import componentList from '@/custom-component/component-list'

const handleDragStart = (e) => {
  console.log('e.target.dataset', e.target.dataset)
  e.dataTransfer.setData('index', e.target.dataset.index)
}
</script>

<style lang="scss" scoped>
.component-list {
  opacity: 1;
  height: 65%;
  padding: 8px;
  display: grid;
  position: relative;
  grid-gap: 10px 19px;
  grid-template-columns: repeat(auto-fill, 80px);
  grid-template-rows: repeat(auto-fill, 40px);
  transition: opacity 0.5s 0.5s;

  .list {
    width: 80px;
    height: 40px;
    border: 1px solid #ddd;
    cursor: grab;
    text-align: center;
    color: var(--text-color);
    padding: 2px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    &:active {
      cursor: grabbing;
    }

    .iconfont {
      margin-right: 4px;
      font-size: 20px;
    }

    .icon-wenben,
    .icon-biaoge {
      font-size: 18px;
    }

    .icon-tupian {
      font-size: 16px;
    }
  }
}
</style>
