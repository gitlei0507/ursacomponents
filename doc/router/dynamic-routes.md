# 动态路由

使用 ursacomponents 的路由工具完成动态路由生成、注入与守卫联动。

## 1. 目标与整体思路

在后台管理系统中，菜单通常由后端返回。需要把菜单数据转换为 Vue Router 可识别的路由记录，并在登录后按需注入。

`ursacomponents` 提供了一整套工具：

1. `createViewResolver`：把菜单里的组件路径字符串映射为页面组件。
2. `createMenuRouteMapper`：把单个菜单节点映射成路由对象。
3. `createUrsaMenuRouterToolkit`：整合拍平、映射、注入能力。
4. `setupUrsaRouterGuard`：在前置守卫中完成登录校验和动态路由初始化。

## 2. 菜单数据约定

菜单节点至少需要：

1. `path`：路由路径。
2. `component`：页面组件路径（相对 `viewsDir`）。

推荐字段：

1. `name`：路由名称。
2. `menu_name` 或 `title`：菜单标题。
3. `icon`：菜单图标。
4. `children`：子菜单。
5. `hidden`：是否隐藏。

示例：

```json
[
  {
    "id": 10,
    "parent_id": 0,
    "path": "/dashboard",
    "name": "dashboard",
    "menu_name": "首页",
    "component": "dashboard/index",
    "icon": "House"
  },
  {
    "id": 20,
    "parent_id": 0,
    "path": "/system",
    "menu_name": "系统管理",
    "component": "system/index",
    "children": [
      {
        "id": 21,
        "parent_id": 20,
        "path": "user",
        "menu_name": "用户管理",
        "component": "system/user/index",
        "icon": "User"
      }
    ]
  }
]
```

## 3. 生成流程（从菜单到路由）

<ImagePreview src="./image/从菜单到路由生成流程.png" alt="从菜单到路由生成流程" />

关键点：

1. `normalizeViewPath` 会自动补 `.vue` 后缀。
2. `createMenuRouteMapper` 会把绝对路径转换为相对路径后再挂到父路由下。
3. 默认父路由名是 `layout`，若根布局路由名称不同，需要显式传入。

## 4. 在项目中接入

### 4.1 创建工具箱

```js
import { createUrsaMenuRouterToolkit } from "ursacomponents";

// key 的形式如：/src/views/system/user/index.vue
const viewModules = import.meta.glob("/src/views/**/*.vue");

export const ursaDynamicToolkit = createUrsaMenuRouterToolkit({
  viewModules,
  viewsDir: "/src/views",
  debug: import.meta.env.DEV,
});
```

### 4.2 在路由守卫中初始化动态路由

```js
// src/router/guard.js
import { setupUrsaRouterGuard } from "ursacomponents";
import router from "./index";
import { ursaDynamicToolkit } from "./dynamic-toolkit";
import { useUserStore } from "@/store/modules/user";

setupUrsaRouterGuard(router, {
  getToken: () => localStorage.getItem("token"),
  loginPath: "/login",
  getUserStore: () => useUserStore(),
  getMenus: (store) => store.userInfo?.menus || [],
  hasLoadedRoutes: (store) => Boolean(store.hasLoadedAsyncRoutes),
  setLoadedRoutes: (store, loaded) => store.setHasLoadedAsyncRoutes(loaded),
  initDynamicRoutes: (routerInstance, menus) =>
    ursaDynamicToolkit.initDynamicRoutes(routerInstance, menus, {
      // 与 layout 根路由 name 保持一致
      parentRouteName: "layout",
    }),
  onMissingMenus: () => "/login",
  debug: import.meta.env.DEV,
});
```

### 4.3 Store 最小约定

`setupUrsaRouterGuard` 默认读取下列结构，可以保持一致，也可以在参数里改成自定义读取方式。

```js
// 仅示意
state: () => ({
	userInfo: {
		menus: []
	},
	hasLoadedAsyncRoutes: false
}),
actions: {
	setHasLoadedAsyncRoutes(loaded) {
		this.hasLoadedAsyncRoutes = loaded
	}
}
```

## 5. 首次登录到页面

1. 用户访问业务页，进入 `beforeEach`。
2. 无 token 跳转 `/login`；有 token 则继续。
3. 判定是否需要加载动态路由。
4. 从 store 读取菜单，调用 `initDynamicRoutes`。
5. 动态路由注入完成后执行 `next({ ...to, replace: true })`。
6. 重新进入目标页，此时路由已存在，页面正常渲染。

## 6. 常见问题与排查

### 6.1 提示“未找到组件”

排查顺序：

1. `menu.component` 是否与 `viewsDir` 相同。
2. `import.meta.glob` 的匹配范围是否覆盖目标页面。
3. 组件路径是否拼写错误，是否缺少目录层级。

建议先打开 `debug: true`，查看工具打印的“尝试加载组件”日志。

### 6.2 动态路由重复注册

工具内部会基于路由 `name` + `router.hasRoute(name)` 去重。

建议：

1. 后端返回稳定的 `name`。
2. 若未提供 `name`，确保 `path` 唯一，避免 fallback name 冲突。

### 6.3 页面刷新后 404

通常是“刷新后守卫未及时注入动态路由”或“服务端未配置 history fallback”。

建议：

1. 确认刷新时会触发 `setupUrsaRouterGuard`。
2. 确认菜单在守卫执行时可拿到。
3. 部署端开启 SPA 回退到 `index.html`。

## 7. 与 UrsaMenu 的配合建议

1. 路由侧使用同一份后端菜单数据生成动态路由。
2. 菜单侧将同一份数据直接传给 `UrsaMenu`。
3. `UrsaMenu` 组件设置 `:router="true"` 时，点击菜单会走路由跳转。

这样可以保证“菜单可见项”和“真实可访问路由”一致，降低维护成本。
