import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"UrsaMenu 菜单组件","description":"","frontmatter":{},"headers":[],"relativePath":"components/UrsaMenu/UrsaMenu.md","filePath":"components/UrsaMenu/UrsaMenu.md"}');
const _sfc_main = { name: "components/UrsaMenu/UrsaMenu.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="ursamenu-菜单组件" tabindex="-1">UrsaMenu 菜单组件 <a class="header-anchor" href="#ursamenu-菜单组件" aria-label="Permalink to &quot;UrsaMenu 菜单组件&quot;">​</a></h1><p>提供导航功能的菜单。</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UrsaMenu/UrsaMenu.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UrsaMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  UrsaMenu as default
};
