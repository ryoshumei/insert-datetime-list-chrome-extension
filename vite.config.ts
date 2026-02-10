import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.'
        },
        {
          src: 'public/icons',
          dest: '.'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
        content: resolve(__dirname, 'src/content/index.ts')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'popup' ? 'popup/index.js' : `${chunkInfo.name}/index.js`
        },
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'popup.css') {
            return 'popup/index.css'
          }
          return 'assets/[name].[ext]'
        }
      }
    }
  }
})
