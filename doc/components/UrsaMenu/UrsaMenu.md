<script setup>
import BaseUrsaMenu from './BaseUrsaMenu.vue'
import SourceCodeViewer from '../shared/SourceCodeViewer.vue'

const loadBaseUrsaMenuSource = async () => (await import('./BaseUrsaMenu.vue?raw')).default
</script>

# UrsaMenu 菜单组件

提供后台导航菜单，基于 Element Plus `el-menu` 封装，支持树形菜单、图标映射和隐藏项过滤。

## 基础用法

<BaseUrsaMenu />

<SourceCodeViewer :load-source="loadBaseUrsaMenuSource" language="vue" />

示例源码：`doc/components/UrsaMenu/BaseUrsaMenu.vue`

## Props

| 参数            | 说明                           | 类型       | 默认值         |
| --------------- | ------------------------------ | ---------- | -------------- |
| `menus`         | 菜单数组                       | `Array`    | `[]`           |
| `defaultActive` | 默认激活菜单路径               | `String`   | `''`           |
| `title`         | 菜单顶部标题                   | `String`   | `管理系统后台` |
| `asideWidth`    | 侧栏宽度                       | `String`   | `'200px'`      |
| `router`        | 是否启用路由模式               | `Boolean`  | `true`         |
| `filterHidden`  | 是否过滤 `hidden: true` 的菜单 | `Boolean`  | `true`         |
| `defaultTitle`  | 菜单名称兜底文案               | `String`   | `未命名菜单`   |
| `iconResolver`  | 自定义图标解析函数             | `Function` | `undefined`    |

## 菜单数据结构

```ts
type MenuItem = {
  path: string;
  menu_name?: string;
  title?: string;
  icon?: string;
  hidden?: boolean;
  children?: MenuItem[];
};
```
