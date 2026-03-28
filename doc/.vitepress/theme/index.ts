import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'ursacomponents/style.css'
import ImagePreview from '../../components/shared/ImagePreview.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.component('ImagePreview', ImagePreview)
  },
}
