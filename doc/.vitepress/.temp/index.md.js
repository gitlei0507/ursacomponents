import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Ursa Components","text":"Vue 3 通用组件库","tagline":"一套面向后台管理场景的基础组件和路由工具","actions":[{"theme":"brand","text":"快速开始","link":"/guide/getting-started"},{"theme":"alt","text":"组件总览","link":"/components/overview"}]},"features":[{"title":"开箱即用","details":"提供搜索、表格、菜单、标签页等常用组件，支持全量安装与按需引入。"},{"title":"Vue 3 生态","details":"基于 Vue 3 + Element Plus，适配现代前端工程。"},{"title":"路由工具集","details":"内置菜单映射、图标解析、路由守卫初始化等辅助能力。"}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
