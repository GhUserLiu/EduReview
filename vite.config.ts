import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      external: ['@tauri-apps/api/core']
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  // Tauri expects a fixed port, fail if that port is not available
  // Tauri 打包时需要固定端口，确保端口可用
  clearScreen: false,
  // Tauri 环境变量
  envPrefix: ['VITE_', 'TAURI_']
})
