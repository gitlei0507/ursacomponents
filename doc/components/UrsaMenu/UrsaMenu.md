<script setup>
import BaseUrsaMenu from './BaseUrsaMenu.vue'
import SourceCodeViewer from '../shared/SourceCodeViewer.vue'

const loadBaseUrsaMenuSource = async () => (await import('./BaseUrsaMenu.vue?raw')).default
const loadIconResolverUrsaMenuSource = async () => (await import('./IconResolverUrsaMenu.vue?raw')).default
</script>

# UrsaMenu 菜单组件

提供导航菜单，基于 Element Plus 的 `el-menu`、`el-menu-item`、`el-sub-menu` 封装，支持树形菜单、图标映射和隐藏项过滤。

## 基础示例

<BaseUrsaMenu />

<SourceCodeViewer :load-source="loadBaseUrsaMenuSource" language="vue" />

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

## 数据示例

后台一般返回"菜单权限列表"，前端将其转换后传给 `UrsaMenu` 的 `menus`。

<details>
  <summary>查看数据</summary>

```json
[
  {
    "menu_name": "首页",
    "path": "/dashboard",
    "icon": "dashboard",
    "hidden": false,
    "children": []
  },
  {
    "menu_name": "系统管理",
    "path": "/system",
    "icon": "setting",
    "hidden": false,
    "children": [
      {
        "menu_name": "用户管理",
        "path": "/system/user",
        "icon": "user",
        "hidden": false
      },
      {
        "menu_name": "角色管理",
        "path": "/system/role",
        "icon": "user",
        "hidden": false
      }
    ]
  },
  {
    "menu_name": "隐藏菜单",
    "path": "/hidden",
    "icon": "hidden",
    "hidden": true,
    "children": []
  }
]
```

</details>

## 调用过程

说明从后台获取菜单数据到最终渲染的完整链路。

### 1. 登录后获取用户与菜单数据

登录成功后，前端通常会请求一个“当前用户信息”接口，接口中包含菜单权限列表：

```ts
const fetchUserInfo = async () => {
  const { data } = await api.getUserInfo();
  // data.menus 即后台返回菜单
  userInfo.value = data;
};
```

### 2. 将后台菜单转为树形结构

后台可能返回扁平结构，`UrsaMenu` 需要树形结构。 可直接使用 `ursacomponents` 的 `buildMenuTree`：

```ts
import { buildMenuTree } from "ursacomponents";

const treeMenus = buildMenuTree(userInfo.value?.menus || []);
```

这一步会把：

- `parent_id = 0` 的菜单作为一级菜单
- 其他菜单挂到对应父菜单 `children`

### 3. 初始化动态路由，见【动态路由】章节

### 4. 一般会将转换后的树形菜单存放在 Pinia 中

### 5. 从 Pinia 中获取菜单数据，在 layout 侧边栏渲染 UrsaMenu

### 6. 点击菜单后的最终行为

`UrsaMenu` 内部基于 `el-menu` 的 `router` 模式工作。  
点击菜单项时：

- 菜单的 `path` 会触发路由跳转
- Vue Router 匹配到第 3 步注入的动态路由
- `layout` 中的 `<router-view />` 渲染目标页面组件
