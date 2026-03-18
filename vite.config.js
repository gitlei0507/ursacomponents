import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'UrsaComponents',
            fileName: (format) => `ursacomponents.${format}.js`,
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['vue', 'element-plus', '@element-plus/icons-vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue',
                    'element-plus': 'ElementPlus',
                    '@element-plus/icons-vue': 'ElementPlusIconsVue'
                }
            }
        }
    }
})
