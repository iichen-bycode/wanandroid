import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    requireTransform({
      fileRegex: /.js$|.vue$/
    }),
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/base.scss";@import "@/style/common.scss";@import "@/style/iconfont.scss";'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    // 配置代理
    proxy: {
      '/api':{
        target:'https://www.wanandroid.com',
        changeOrigin: true,             //是否跨域
        secure: true,                   //是否https接口
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
})
