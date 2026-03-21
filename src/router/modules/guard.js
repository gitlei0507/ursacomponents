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
            console.log('[ursa-router] 导航到:', to.path, '路由名称:', to.name)
        }

        if (to.path === loginPath) {
            next()
            return
        }

        const token = typeof getToken === 'function' ? getToken() : null
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

        const menus = typeof getMenus === 'function' ? getMenus(userStore, to, from) : []
        if (Array.isArray(menus) && menus.length > 0) {
            initDynamicRoutes(router, menus, initDynamicRoutesOptions)
            if (typeof setLoadedRoutes === 'function') {
                setLoadedRoutes(userStore, true)
            }
            next({ ...to, replace: true })
            return
        }

        if (debug) {
            console.warn('[ursa-router] 没有菜单数据，跳转登录页')
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
