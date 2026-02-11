<template>
  <div class="attr-list">
    <CommonAttr></CommonAttr>
    <el-form>
      <el-form-item label="镜像翻转">
        <div style="clear: both">
          <el-checkbox v-model="curComponent.propValue.flip.horizontal" label="horizontal">水平翻转</el-checkbox>
          <el-checkbox v-model="curComponent.propValue.flip.vertical" label="vertical">垂直翻转</el-checkbox>
        </div>
      </el-form-item>
      <el-form-item label="图片URL">
        <el-input v-model="curComponent.propValue.url" placeholder="请输入图片URL" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import CommonAttr from '@/custom-component/common/CommonAttr.vue'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'

const store = useStore()
const { curComponent } = storeToRefs(store)
</script>
