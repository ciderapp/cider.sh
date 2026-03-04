import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [
    vue(),
    compression({ algorithm: 'gzip', threshold: 1024 }),
    compression({ algorithm: 'brotliCompress', threshold: 1024 }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'pinia'],
        },
      },
    },
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
  },
  css: {
    devSourcemap: true,
  },
})
