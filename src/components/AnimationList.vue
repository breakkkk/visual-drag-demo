<template>
  <div class="animation-list">
    <div class="div-animation">
      <el-button @click="isShowAnimation = true">添加动画</el-button>
      <el-button @click="previewAnimate">预览动画</el-button>
      <div>
        <el-tag v-for="(tag, index) in curComponent.animations" :key="index" closable @close="removeAnimation(index)">
          {{ tag.label }}
          <el-icon class="cursor" @click="handleAnimationSetting(index)"><Setting /></el-icon>
        </el-tag>
      </div>
    </div>

    <!-- 选择动画 -->
    <Modal v-model="isShowAnimation">
      <el-tabs v-model="animationActiveName">
        <el-tab-pane v-for="item in animationClassData" :key="item.label" :label="item.label" :name="item.label">
          <el-scrollbar class="animate-container">
            <div
              v-for="animate in item.children"
              :ref="(el) => setAnimationRef(el, animate.value)"
              :key="animate.value"
              class="animate"
              @mouseenter="runAnimation(animate)"
              @click="addAnimation(animate)"
            >
              <div>
                {{ animate.label }}
              </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </Modal>
    <!-- 编辑动画配置 -->
    <AnimationSettingModal
      v-if="isShowAnimationSetting"
      :cur-index="curIndex"
      @close="isShowAnimationSetting = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'
import Modal from '@/components/Modal.vue'
import AnimationSettingModal from './AnimationSettingModal.vue'
import eventBus from '@/utils/eventBus'
import animationClassData from '@/utils/animationClassData'
import runAnimationFn from '@/utils/runAnimation'
import { Setting } from '@element-plus/icons-vue'

const store = useStore()
const { curComponent } = storeToRefs(store)

const isShowAnimation = ref(false)
const animationActiveName = ref('进入')
const isShowAnimationSetting = ref(false)
const curIndex = ref(0)
const animationRefs = ref({})

const setAnimationRef = (el, key) => {
  if (el) {
    animationRefs.value[key] = el
  }
}

function addAnimation(animate) {
  store.addAnimation(animate)
  isShowAnimation.value = false
}

function previewAnimate() {
  eventBus.emit('runAnimation')
}

function removeAnimation(index) {
  store.removeAnimation(index)
  if (!curComponent.value.animations.length) {
    eventBus.emit('stopAnimation')
  }
}

function handleAnimationSetting(index) {
  isShowAnimationSetting.value = true
  curIndex.value = index
}

async function runAnimation(animate) {
  if (animate.pending) return

  animate.pending = true
  await runAnimationFn(animationRefs.value[animate.value], [animate])

  setTimeout(() => {
    animate.pending = false
  }, 100)
}
</script>

<style lang="scss">
.animation-list {
  .cursor {
    cursor: pointer;
    margin-left: 5px;
  }

  .div-animation {
    text-align: center;

    & > div {
      margin-top: 20px;
    }

    .el-tag {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      margin: auto;
      margin-bottom: 10px;
    }
  }

  .el-scrollbar__view {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 10px;

    .animate {
      cursor: pointer;
    }

    .animate > div {
      width: 100px;
      height: 60px;
      background: #f5f8fb;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 12px;
      margin-bottom: 10px;
      font-size: 12px;
      color: #333;
      border-radius: 3px;
      user-select: none;
      cursor: pointer;
    }
  }
}
</style>
