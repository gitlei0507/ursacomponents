<script setup>
import BaseUrsaMenu from './BaseUrsaMenu.vue'
import SourceCodeViewer from '../shared/SourceCodeViewer.vue'

const loadBaseUrsaMenuSource = async () => (await import('./BaseUrsaMenu.vue?raw')).default
const loadIconResolverUrsaMenuSource = async () => (await import('./IconResolverUrsaMenu.vue?raw')).default
</script>

# UrsaMenu 菜单组件

提供导航菜单，基于 Element Plus 的 `el-menu`、`el-menu-item`、`el-menu-item` 封装，支持树形菜单、图标映射和隐藏项过滤。

## 基础示例

<BaseUrsaMenu />

<SourceCodeViewer :load-source="loadIconResolverUrsaMenuSource" language="vue" />

## 属性

| 参数            | 说明                           | 类型       | 默认值         | 数据来源                       |
| --------------- | ------------------------------ | ---------- | -------------- | ------------------------------ |
| `menus`         | 菜单数组                       | `Array`    | `[]`           | 根据用户权限返回的菜单数组对象 |
| `defaultActive` | 默认激活菜单路径               | `String`   | `''`           | `$route.path`                  |
| `title`         | 菜单顶部标题                   | `String`   | `管理系统后台` |                                |
| `asideWidth`    | 侧栏宽度                       | `String`   | `'200px'`      |                                |
| `router`        | 是否启用路由模式               | `Boolean`  | `true`         |                                |
| `filterHidden`  | 是否过滤 `hidden: true` 的菜单 | `Boolean`  | `true`         |                                |
| `defaultTitle`  | 菜单名称兜底                   | `String`   | `未命名菜单`   |                                |
| `iconResolver`  | 自定义图标解析函数             | `Function` | `undefined`    |                                |

## iconResolver 示例

`iconResolver` 可用于将后端返回的图标编码映射为实际图标组件，例如：`dashboard -> House`。

<SourceCodeViewer :load-source="loadIconResolverUrsaMenuSource" language="vue" />
