# 动态路由

使用 ursacomponents 的路由工具完成动态路由生成、注入与守卫联动。

## 1. 目标与整体思路

在后台管理系统中，菜单通常由后端返回。需要把菜单数据转换为 Vue Router 可识别的路由记录，并在登录后按需注入。

## 2. 整体流程

整个基于核心工具集（Toolkit）的路由生成与调用流程，可以划分为四个核心阶段：静态初始化、用户登录、守卫拦截、以及动态注入。以下是完整的调用流程分析：

1. 静态初始化阶段 (项目启动) 在项目初始化阶段，系统会准备好所有需要的“原材料”并挂载基础环境：
   扫描组件： 在 `dynamic-routes.js` 中，通过 Vite 的 `import.meta.glob` 扫描并获取 views 目录下所有的页面组件资源（懒加载函数集 `viewModules`）
   。
   实例化工具箱： 将 `viewModules` 等配置传入 `createUrsaMenuRouterToolkit`，生成并导出核心的方法 `buildRoutesFromMenus` 和 `initDynamicRoutes`
   。
   注册静态路由与守卫： 在 `index.js` 中，首先创建包含 `/login` 和布局页 / 等基础页面的静态路由实例
   。随后，调用 `setupUrsaRouterGuard` 设置前置路由守卫，并将上一步生成的 `initDynamicRoutes` 注入到守卫的配置中
   。
2. 用户登录与状态存储阶段 (认证流) 当用户访问登录页并提交凭证时，触发认证与数据初始化流程：
   获取权限与数据： 在 `useLogin` 中，调用 login API 获取认证信息后，通过 setToken 保存 Token，并通过 `useUserStore` 的 `setUserInfo` 将包含用户菜单树（menus）在内的基本信息存入 Pinia 状态库
   。
   路由重定向： 登录成功后，可以通过工具箱提供的 `getFirstMenuPath` 工具（带有 `/dashboard` 兜底），从用户的菜单数据中解析出首个可访问的菜单路径，并重定向到该页面
   。
3. 路由守卫拦截阶段 (导航流) 当页面发生跳转（例如登录后的重定向）时，`setupUrsaRouterGuard` 注册的前置路由守卫会拦截此次导航：
   登录校验： 守卫首先通过传入的 `getToken` 检查用户是否已登录
   。
   加载状态判断： 如果已登录，守卫会通过 `getUserStore` 获取用户信息，并调用 `hasLoadedRoutes`（默认读取 `store.hasLoadedAsyncRoutes` 标记）判断当前是否已经加载过动态路由
   。
   触发动态加载： 如果标记为未加载，守卫则会从 `store` 中读取用户菜单列表（`getMenus`），并调用由外部传入的 `initDynamicRoutes` 开启路由的动态生成过程
   。
4. 动态解析与注入阶段 (内部处理流) 这是 Toolkit 发挥“核心调度”作用的阶段，由 `initDynamicRoutes` 在内部完成复杂的流水线作业：
   数据拍平： 调用 `flattenMenus` 将从服务端获取的树形菜单数据拍平为一维数组，方便后续逐一映射
   。
   路径解析： 针对每一个菜单项，通过 `normalizeViewPath` 统一处理组件路径格式（例如自动补齐 .vue 后缀、去除多余斜杠）
   。
   组件匹配： 利用 `createViewResolver`，将处理后的路径与阶段一中扫描的 `viewModules` 键值进行精确匹配，提取出对应的页面组件模块
   。
   路由映射与注册： `createMenuRouteMapper` 负责将拼装好的路径和组件转换为 Vue Router 能够识别的路由对象
   ，并动态添加到 Router 实例中。
   状态闭环： 路由注入完成后，守卫会调用 `setLoadedRoutes`（默认执行 store 的 `setHasLoadedAsyncRoutes` 方法）将加载状态标记为 `true`
   。至此，流程闭环，放行用户的路由访问请求。

   ## 3. 流程图

<ImagePreview src='./image/基于核心工具集Toolkit的路由生成与调用流程.png' alt='基于核心工具集Toolkit的路由生成与调用流程' />
