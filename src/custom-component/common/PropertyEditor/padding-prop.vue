<template>
  <div class="padding-prop">
    <div class="padding-box">
      <input class="padding-input p-top" v-model.lazy="top" @change="update" />
      <div class="middle">
        <input class="padding-input p-left" v-model.lazy="left" @change="update" />
        <div class="content-box"></div>
        <input class="padding-input p-right" v-model.lazy="right" @change="update" />
      </div>
      <input class="padding-input p-bottom" v-model.lazy="bottom" @change="update" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const top = ref(0)
const right = ref(0)
const bottom = ref(0)
const left = ref(0)

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      top.value = val.top || 0
      right.value = val.right || 0
      bottom.value = val.bottom || 0
      left.value = val.left || 0
    } else {
      top.value = 0
      right.value = 0
      bottom.value = 0
      left.value = 0
    }
  },
  { immediate: true, deep: true },
)

const update = () => {
  const result = {
    top: Number(top.value),
    right: Number(right.value),
    bottom: Number(bottom.value),
    left: Number(left.value),
  }
  emit('update:modelValue', result)
  emit('change', 'padding', result)
}
</script>

<style scoped lang="scss">
.padding-prop {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.padding-box {
  width: 200px;
  height: 120px;
  background-color: #c6d099; /* Padding color similar to DevTools */
  border: 1px dashed #666;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
}

.padding-label {
  position: absolute;
  top: 2px;
  left: 5px;
  font-size: 12px;
  color: #333;
}

.padding-input {
  width: 40px;
  text-align: center;
  background: transparent;
  border: none;
  font-size: 12px;
  color: #333;
  outline: none;

  &:focus {
    background: rgba(255, 255, 255, 0.5);
  }
}

.middle {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.content-box {
  flex: 1;
  height: 100%;
  background-color: #8ca6c5; /* Content color */
  border: 1px solid #555;
  margin: 0 5px;
  min-height: 20px;
}
</style>
