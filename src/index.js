import UrsaSearch from './components/UrsaSearch/UrsaSearch.vue'
import UrsaTable from './components/UrsaTable/UrsaTable.vue'

export { useUrsaSearch } from './components/UrsaSearch/useUrsaSearch'
export { createUrsaMenuRouterToolkit, getUrsaMenuIcon, setupUrsaRouterGuard } from './router/index'
export { UrsaSearch, UrsaTable }

const components = [UrsaSearch, UrsaTable]

const install = (app) => {
    components.forEach((component) => {
        app.component(component.name || component.__name, component)
    })
}

export default {
    install
}
