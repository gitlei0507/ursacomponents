import UrsaSearch from './components/UrsaSearch/UrsaSearch.vue'
import UrsaTable from './components/UrsaTable/UrsaTable.vue'

// 组合式能力按需导出。
export { useUrsaSearch } from './components/UrsaSearch/useUrsaSearch'
// 路由工具按需导出。
export { createUrsaMenuRouterToolkit, flattenMenus, getFirstMenuPath, getUrsaMenuIcon, setupUrsaRouterGuard } from './router/index'
// 组件按需导出。
export { UrsaSearch, UrsaTable }

// 全量安装时需要注册的组件列表。
const components = [UrsaSearch, UrsaTable]

// Vue 插件安装入口：一次性注册所有组件。
const install = (app) => {
    components.forEach((component) => {
        // 兼容 SFC 在不同构建场景下的 name 字段。
        app.component(component.name || component.__name, component)
    })
}

// 默认导出插件对象，支持 app.use(UrsaComponents)。
export default {
    install
}
