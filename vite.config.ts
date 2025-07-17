import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import vueDevTools from 'vite-plugin-vue-devtools';
// import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
// import Icons from 'unplugin-icons/vite';
// import IconsResolver from 'unplugin-icons/resolver';
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';

// https://vite.dev/config/
export default defineConfig({
  // base: './', // 设置为相对路径，支持本地直接访问
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    // for dicom-parser
    // viteCommonjs(),
    false && vueDevTools()
    // AutoImport({
    //   resolvers: [
    //     // Auto import icon components
    //     // 自动导入图标组件
    //     IconsResolver({
    //       prefix: 'Icon'
    //     })
    //   ]
    // }),
    // Components({
    //   resolvers: [
    //     // Auto register icon components
    //     // 自动注册图标组件
    //     IconsResolver({
    //       // enabledCollections: ['el']
    //     })
    //   ]
    // }),
    // Icons({
    //   autoInstall: true
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api', 'color-functions']
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 9188,
    open: false,
    cors: true
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('src/icons/')) {
            return 'icons'; // 按页面拆分
          }
        }
      }
    }
  }
});
