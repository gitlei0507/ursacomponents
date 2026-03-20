import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 统一菜单组件路径格式，便于与视图模块 key 精确匹配。
const normalizeViewPath = (viewPath = '') => {
    const trimmed = String(viewPath).replace(/^\/+/, '')
    if (!trimmed) {
        return ''
    }
    return trimmed.endsWith('.vue') ? trimmed : `${trimmed}.vue`
}

// 将树形菜单展开，后续可统一按单层菜单映射路由。
const defaultFlattenMenus = (menus = []) => {
    if (!Array.isArray(menus)) {
        return []
    }

    const result = []

    const walk = (items) => {
        items.forEach((item) => {
            if (!item || typeof item !== 'object') {
                return
            }

            const { children, ...rest } = item
            result.push(rest)

            if (Array.isArray(children) && children.length > 0) {
                walk(children)
            }
        })
    }

    walk(menus)
    return result
}

const createViewResolver = ({ viewModules = {}, viewsDir = '/src/views', logger = console, debug = false } = {}) => {
    // 规整 viewsDir，避免首尾斜杠差异导致路径拼接错误。
    const normalizedViewsDir = `/${String(viewsDir).replace(/^\/+|\/+$/g, '')}`

    if (debug) {
        logger.log('[ursa-router] 可用组件路径:', Object.keys(viewModules))
    }

    return (viewPath = '') => {
        const normalized = normalizeViewPath(viewPath)
        if (!normalized) {
            return undefined
        }

        // 与 import.meta.glob 生成的模块路径保持一致。
        const key = `${normalizedViewsDir}/${normalized}`

        if (debug) {
            logger.log(`[ursa-router] 尝试加载组件: ${viewPath} -> ${key}`)
        }

        const component = viewModules[key]
        if (!component && debug) {
            logger.warn(`[ursa-router] viewModules 中不存在该路径: ${key}`)
        }

        return component
    }
}

const createMenuRouteMapper = ({ resolveComponent, logger = console, debug = false } = {}) => {
    return (menu, parentPath = '') => {
        if (!menu?.path || !menu?.component) {
            return null
        }

        const component = resolveComponent(menu.component)
        if (!component) {
            if (debug) {
                logger.warn(`[ursa-router] 未找到组件: ${menu.component}`)
            }
            return null
        }

        const fullPath = menu.path.startsWith('/')
            ? menu.path
            : `${parentPath}/${menu.path}`.replace(/\/+/g, '/')

        const routePath = fullPath.replace(/^\//, '')
        // 菜单缺少 name 时，使用稳定兜底名称，避免路由注册失败。
        const fallbackName = routePath.replace(/\//g, '_') || normalizeViewPath(menu.component).replace(/[/.]/g, '_')

        const route = {
            path: routePath,
            name: menu.name || fallbackName,
            component,
            meta: {
                title: menu.meta?.title || menu.menu_name || menu.title || menu.name || routePath,
                icon: menu.meta?.icon || menu.icon || '',
                hidden: Boolean(menu.meta?.hidden || menu.hidden)
            }
        }

        if (Array.isArray(menu.children) && menu.children.length > 0) {
            // 递归处理子菜单，生成嵌套路由。
            route.children = menu.children
                .map((child) => createMenuRouteMapper({ resolveComponent, logger, debug })(child, fullPath))
                .filter(Boolean)
        }

        return route
    }
}

export const createUrsaMenuRouterToolkit = (options = {}) => {
    const {
        viewModules = {},
        flattenMenus = defaultFlattenMenus,
        viewsDir = '/src/views',
        logger = console,
        debug = false
    } = options

    const resolveComponent = createViewResolver({ viewModules, viewsDir, logger, debug })
    const mapMenuToRoute = createMenuRouteMapper({ resolveComponent, logger, debug })

    const buildRoutesFromMenus = (menus = []) => {
        // 允许注入自定义拍平策略，兼容不同后端菜单结构。
        const sourceMenus = typeof flattenMenus === 'function' ? flattenMenus(menus) : menus
        if (!Array.isArray(sourceMenus)) {
            return []
        }
        return sourceMenus.map((menu) => mapMenuToRoute(menu)).filter(Boolean)
    }

    const initDynamicRoutes = (router, menus = [], initOptions = {}) => {
        const { parentRouteName = 'layout' } = initOptions

        if (!router || typeof router.addRoute !== 'function' || typeof router.hasRoute !== 'function') {
            return []
        }

        const routes = buildRoutesFromMenus(menus)

        routes.forEach((route) => {
            if (!route?.name) {
                return
            }

            // 已存在同名路由时不重复添加。
            if (!router.hasRoute(route.name)) {
                router.addRoute(parentRouteName, route)
            }
        })

        return routes
    }

    return {
        normalizeViewPath,
        resolveComponent,
        mapMenuToRoute,
        buildRoutesFromMenus,
        initDynamicRoutes
    }
}

export const getUrsaMenuIcon = (iconName, options = {}) => {
    const { iconMap = ElementPlusIconsVue, fallbackIcon = 'Menu' } = options
    return iconMap?.[iconName] || iconMap?.[fallbackIcon] || ElementPlusIconsVue.Menu
}

const defaultGetMenus = (store) => store?.userInfo?.menus || []
const defaultHasLoadedRoutes = (store) => Boolean(store?.hasLoadedAsyncRoutes)
const defaultSetLoadedRoutes = (store, loaded) => {
    if (typeof store?.setHasLoadedAsyncRoutes === 'function') {
        store.setHasLoadedAsyncRoutes(loaded)
    }
}

export const setupUrsaRouterGuard = (router, options = {}) => {
    const {
        getToken = () => null,
        loginPath = '/login',
        getUserStore = () => null,
        getMenus = defaultGetMenus,
        hasLoadedRoutes = defaultHasLoadedRoutes,
        setLoadedRoutes = defaultSetLoadedRoutes,
        initDynamicRoutes,
        initDynamicRoutesOptions = {},
        shouldLoadRoutes,
        onMissingMenus,
        logger = console,
        debug = false
    } = options

    if (!router || typeof router.beforeEach !== 'function') {
        throw new Error('[ursa-router] setupUrsaRouterGuard 需要有效的 router 实例')
    }

    if (typeof initDynamicRoutes !== 'function') {
        throw new Error('[ursa-router] setupUrsaRouterGuard 需要 initDynamicRoutes 方法')
    }

    return router.beforeEach((to, from, next) => {
        if (debug) {
            logger.log('[ursa-router] 导航到:', to.path, '路由名称:', to.name)
        }

        if (to.path === loginPath) {
            next()
            return
        }

        const token = typeof getToken === 'function' ? getToken() : null
        // 无登录态则拦截并跳转登录页。
        if (!token) {
            next(loginPath)
            return
        }

        const userStore = typeof getUserStore === 'function' ? getUserStore() : null

        const needLoadRoutes = typeof shouldLoadRoutes === 'function'
            ? shouldLoadRoutes({ to, from, router, userStore })
            : !hasLoadedRoutes(userStore) || to.matched.length === 0 || (to.name ? !router.hasRoute(to.name) : false)

        if (!needLoadRoutes) {
            next()
            return
        }

        // 首次进入或目标路由缺失时，按菜单动态注入路由。
        const menus = typeof getMenus === 'function' ? getMenus(userStore, to, from) : []
        if (Array.isArray(menus) && menus.length > 0) {
            initDynamicRoutes(router, menus, initDynamicRoutesOptions)
            if (typeof setLoadedRoutes === 'function') {
                setLoadedRoutes(userStore, true)
            }
            // replace 避免新增路由后产生重复历史记录。
            next({ ...to, replace: true })
            return
        }

        if (debug) {
            logger.warn('[ursa-router] 没有菜单数据，跳转登录页')
        }

        if (typeof onMissingMenus === 'function') {
            const fallback = onMissingMenus({ to, from, router, userStore })
            if (fallback) {
                next(fallback)
                return
            }
        }

        next(loginPath)
    })
}