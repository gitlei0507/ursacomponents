// 将树形菜单拍平，方便后续统一按单层菜单映射路由。
export const flattenMenus = (menus = []) => {
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

// 获取首个可用菜单路径；业务可通过 fallbackPath 指定默认落地页。
export const getFirstMenuPath = (menus = [], options = {}) => {
    const { fallbackPath = '/dashboard' } = options
    const first = flattenMenus(menus).find((menu) => typeof menu.path === 'string' && menu.path)
    return first?.path || fallbackPath
}
