<script setup>
import BaseUrsaTagsView from './BaseUrsaTagsView.vue'
import SourceCodeViewer from '../shared/SourceCodeViewer.vue'

const loadBaseUrsaTagsViewSource = async () => (await import('./BaseUrsaTagsView.vue?raw')).default
</script>

# UrsaTagsView 标签组件

提供标签功能，基于 Element Plus 的 `el-tabs` 封装，用于展示和管理多页面访问状态，支持标签切换、关闭与路由联动。

## 基础示例

<BaseUrsaTagsView />

<SourceCodeViewer :load-source="loadBaseUrsaTagsViewSource" language="vue" />

💡 说明：因为 UrsaTagsView 强依赖于 vue router，示例中无 router，因此需要模拟数据，真实项目中，只需要 `import` 标签组件后，只用 `<UrsaTagsView>`

## 属性

| 参数        | 说明           | 类型     | 默认值         |
| ----------- | -------------- | -------- | -------------- |
| `homePath`  | 首页标签路由   | `String` | `'/dashboard'` |
| `homeTitle` | 首页标签显示名 | `String` | `'首页'`       |
