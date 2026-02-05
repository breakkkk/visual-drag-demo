import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variable.scss";`,
      },
    },
  },
  build: {
    outDir: 'H5Editor-lib',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'H5Editor',
      fileName: (format) => `h5-editor.${format}.js`,
    },
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT' && warning.message.includes('"vue"')) return
        warn(warning)
      },
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus', 'vue-router'],
      output: {
        inlineDynamicImports: true,
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          'vue-router': 'VueRouter',
        },
        assetFileNames: `h5designer.style.css`,
      },
    },
  },
})
