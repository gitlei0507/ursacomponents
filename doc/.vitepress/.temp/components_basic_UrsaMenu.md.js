import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"UrsaMenu 菜单组件","description":"","frontmatter":{},"headers":[],"relativePath":"components/basic/UrsaMenu.md","filePath":"components/basic/UrsaMenu.md"}');
const _sfc_main = { name: "components/basic/UrsaMenu.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="ursamenu-菜单组件" tabindex="-1">UrsaMenu 菜单组件 <a class="header-anchor" href="#ursamenu-菜单组件" aria-label="Permalink to &quot;UrsaMenu 菜单组件&quot;">​</a></h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/basic/UrsaMenu.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UrsaMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  UrsaMenu as default
};
