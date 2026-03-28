import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { reactive, provide, mergeProps, unref, useSSRContext } from "vue";
import { O as Oe, S as SourceCodeViewer } from "./SourceCodeViewer.BOCOoOQx.js";
import { routeLocationKey, routerKey } from "vue-router";
import "@element-plus/icons-vue";
import "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "BaseUrsaTagsView",
  __ssrInlineRender: true,
  setup(__props) {
    const titleMap = {
      "/dashboard": "首页",
      "/system/user": "用户管理"
    };
    const route = reactive({
      path: "/system/user",
      name: "system-user",
      meta: { title: titleMap["/system/user"] }
    });
    const router = {
      push(target) {
        const path = typeof target === "string" ? target : target == null ? void 0 : target.path;
        if (!path) {
          return;
        }
        route.path = path;
        route.name = path;
        route.meta = { title: titleMap[path] || path };
      },
      resolve(path) {
        return {
          path,
          name: path,
          meta: { title: titleMap[path] || path }
        };
      }
    };
    provide(routeLocationKey, route);
    provide(routerKey, router);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tags-demo-wrap" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Oe), {
        "home-path": "/dashboard",
        "home-title": "首页"
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UrsaTagsView/BaseUrsaTagsView.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"UrsaTagsView 标签组件","description":"","frontmatter":{},"headers":[],"relativePath":"components/UrsaTagsView/UrsaTagsView.md","filePath":"components/UrsaTagsView/UrsaTagsView.md"}');
const __default__ = { name: "components/UrsaTagsView/UrsaTagsView.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const loadBaseUrsaTagsViewSource = async () => (await import("./BaseUrsaTagsView.CAC9FLDh.js")).default;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="ursatagsview-标签组件" tabindex="-1">UrsaTagsView 标签组件 <a class="header-anchor" href="#ursatagsview-标签组件" aria-label="Permalink to &quot;UrsaTagsView 标签组件&quot;">​</a></h1><p>提供标签功能，基于 Element Plus 的 <code>el-tabs</code> 封装，用于展示和管理多页面访问状态，支持标签切换、关闭与路由联动。</p><h2 id="基础示例" tabindex="-1">基础示例 <a class="header-anchor" href="#基础示例" aria-label="Permalink to &quot;基础示例&quot;">​</a></h2>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(SourceCodeViewer, {
        "load-source": loadBaseUrsaTagsViewSource,
        language: "vue"
      }, null, _parent));
      _push(`<p>💡 说明：因为 UrsaTagsView 强依赖于 vue router，示例中无 router，因此需要模拟数据，真实项目中，只需要 <code>import</code> 标签组件后，只用 <code>&lt;UrsaTagsView&gt;</code></p><h2 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h2><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>homePath</code></td><td>首页标签路由</td><td><code>String</code></td><td><code>&#39;/dashboard&#39;</code></td></tr><tr><td><code>homeTitle</code></td><td>首页标签显示名</td><td><code>String</code></td><td><code>&#39;首页&#39;</code></td></tr></tbody></table></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UrsaTagsView/UrsaTagsView.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
