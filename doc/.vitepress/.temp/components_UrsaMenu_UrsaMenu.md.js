import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { toRef, resolveComponent, openBlock, createBlock, withCtx, createElementVNode, toDisplayString, createVNode, createElementBlock, Fragment, renderList, unref, computed, resolveDynamicComponent, ref, mergeProps, useSSRContext } from "vue";
import * as X from "@element-plus/icons-vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const Y = (e, a = {}) => {
  const { iconMap: t = X, fallbackIcon: s = "Menu" } = a;
  return (t == null ? void 0 : t[e]) || (t == null ? void 0 : t[s]) || X.Menu;
}, xe = (e, a = {}) => {
  const { defaultTitle: t = "未命名菜单", iconResolver: s = Y } = a, l = computed(() => {
    const r = unref(e);
    return Array.isArray(r == null ? void 0 : r.children) && r.children.length > 0;
  }), u = computed(() => {
    const r = unref(e);
    return (r == null ? void 0 : r.menu_name) || (r == null ? void 0 : r.title) || t;
  }), i = computed(() => {
    var _a;
    const r = unref(e), f = ((_a = r == null ? void 0 : r.meta) == null ? void 0 : _a.icon) || (r == null ? void 0 : r.icon);
    return (typeof s == "function" ? s : Y)(f);
  });
  return {
    hasChildren: l,
    menuTitle: u,
    menuIcon: i
  };
}, te = /* @__PURE__ */ Object.assign({
  name: "UrsaMenuItem"
}, {
  __name: "UrsaMenuItem",
  props: {
    menu: {
      type: Object,
      required: true
    },
    defaultTitle: {
      type: String,
      default: "未命名菜单"
    },
    iconResolver: {
      type: Function,
      default: void 0
    }
  },
  setup(e) {
    const a = e, { hasChildren: t, menuTitle: s, menuIcon: l } = xe(toRef(a, "menu"), {
      defaultTitle: a.defaultTitle,
      iconResolver: a.iconResolver
    });
    return (u, i) => {
      const r = resolveComponent("el-icon"), f = resolveComponent("UrsaMenuItem", true), p = resolveComponent("el-sub-menu"), S = resolveComponent("el-menu-item");
      return unref(t) ? (openBlock(), createBlock(p, {
        key: 0,
        index: e.menu.path
      }, {
        title: withCtx(() => [
          createVNode(r, null, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(unref(l))))
            ]),
            _: 1
          }),
          createElementVNode("span", null, toDisplayString(unref(s)), 1)
        ]),
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.menu.children, (c) => (openBlock(), createBlock(f, {
            key: c.path,
            menu: c,
            "default-title": e.defaultTitle,
            "icon-resolver": e.iconResolver
          }, null, 8, ["menu", "default-title", "icon-resolver"]))), 128))
        ]),
        _: 1
      }, 8, ["index"])) : (openBlock(), createBlock(S, {
        key: 1,
        index: e.menu.path
      }, {
        default: withCtx(() => [
          createVNode(r, null, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(unref(l))))
            ]),
            _: 1
          }),
          createElementVNode("span", null, toDisplayString(unref(s)), 1)
        ]),
        _: 1
      }, 8, ["index"]));
    };
  }
}), Me = (e, a = true) => ({
  visibleMenus: computed(() => {
    const s = unref(e), l = unref(a);
    return Array.isArray(s) ? l ? s.filter((u) => !(u == null ? void 0 : u.hidden)) : s : [];
  })
}), H = (e, a) => {
  const t = e.__vccOpts || e;
  for (const [s, l] of a)
    t[s] = l;
  return t;
}, Se = { class: "ursa-menu-title" }, $e = {
  __name: "UrsaMenu",
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    defaultActive: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "管理系统后台"
    },
    asideWidth: {
      type: String,
      default: "200px"
    },
    router: {
      type: Boolean,
      default: true
    },
    filterHidden: {
      type: Boolean,
      default: true
    },
    defaultTitle: {
      type: String,
      default: "未命名菜单"
    },
    iconResolver: {
      type: Function,
      default: void 0
    }
  },
  setup(e) {
    const a = e, { visibleMenus: t } = Me(toRef(a, "menus"), toRef(a, "filterHidden"));
    return (s, l) => {
      const u = resolveComponent("el-menu"), i = resolveComponent("el-aside");
      return openBlock(), createBlock(i, {
        width: e.asideWidth,
        class: "ursa-menu-aside"
      }, {
        default: withCtx(() => [
          createElementVNode("div", Se, toDisplayString(e.title), 1),
          createVNode(u, {
            router: e.router,
            "default-active": e.defaultActive,
            "active-text-color": "#ffd04b",
            "background-color": "#1f2937",
            class: "el-menu-vertical-demo ursa-menu-panel",
            "text-color": "#fff"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(t), (r) => (openBlock(), createBlock(te, {
                key: r.path,
                menu: r,
                "default-title": e.defaultTitle,
                "icon-resolver": e.iconResolver
              }, null, 8, ["menu", "default-title", "icon-resolver"]))), 128))
            ]),
            _: 1
          }, 8, ["router", "default-active"])
        ]),
        _: 1
      }, 8, ["width"]);
    };
  }
}, Ae = /* @__PURE__ */ H($e, [["__scopeId", "data-v-453d2132"]]);
const _sfc_main$2 = {
  __name: "BaseUrsaMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const defaultActive = ref("/dashboard");
    const menus = [
      {
        path: "/dashboard",
        menu_name: "首页",
        icon: "DataBoard"
      },
      {
        path: "/system",
        menu_name: "系统管理",
        icon: "Setting",
        children: [
          {
            path: "/system/user",
            menu_name: "用户管理",
            icon: "User"
          },
          {
            path: "/system/role",
            menu_name: "角色管理",
            icon: "UserFilled"
          }
        ]
      },
      {
        path: "/hidden",
        menu_name: "Hidden",
        icon: "Hide",
        hidden: true
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_container = resolveComponent("el-container");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-screen w-full overflow-hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_el_container, { class: "h-full w-full" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Ae), {
              menus,
              "default-active": defaultActive.value,
              title: "示例菜单",
              "aside-width": "240px"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Ae), {
                menus,
                "default-active": defaultActive.value,
                title: "示例菜单",
                "aside-width": "240px"
              }, null, 8, ["default-active"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UrsaMenu/BaseUrsaMenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "SourceCodeViewer",
  __ssrInlineRender: true,
  props: {
    loadSource: {
      type: Function,
      required: true
    },
    language: {
      type: String,
      default: "vue"
    },
    buttonTextView: {
      type: String,
      default: "查看源代码"
    },
    buttonTextHide: {
      type: String,
      default: "隐藏源代码"
    },
    loadingText: {
      type: String,
      default: "源码加载中..."
    }
  },
  setup(__props) {
    const props = __props;
    ref("");
    const highlightedCode = ref("");
    ref(false);
    const sourceLoading = ref(false);
    const sourceOpen = ref(false);
    const buttonTextComputed = computed(() => sourceOpen.value ? props.buttonTextHide : props.buttonTextView);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<details${ssrRenderAttrs(mergeProps({ class: "source-toggle" }, _attrs))} data-v-d8a53a1c><summary data-v-d8a53a1c>${ssrInterpolate(buttonTextComputed.value)}</summary>`);
      if (sourceLoading.value) {
        _push(`<div class="source-state" data-v-d8a53a1c>${ssrInterpolate(__props.loadingText)}</div>`);
      } else {
        _push(`<pre class="source-code" data-v-d8a53a1c><code class="hljs" data-v-d8a53a1c>${highlightedCode.value ?? ""}</code></pre>`);
      }
      _push(`</details>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SourceCodeViewer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SourceCodeViewer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d8a53a1c"]]);
const __pageData = JSON.parse('{"title":"UrsaMenu 菜单组件","description":"","frontmatter":{},"headers":[],"relativePath":"components/UrsaMenu/UrsaMenu.md","filePath":"components/UrsaMenu/UrsaMenu.md"}');
const __default__ = { name: "components/UrsaMenu/UrsaMenu.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const loadBaseUrsaMenuSource = async () => (await import("./BaseUrsaMenu.CIfMc6oj.js")).default;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="ursamenu-菜单组件" tabindex="-1">UrsaMenu 菜单组件 <a class="header-anchor" href="#ursamenu-菜单组件" aria-label="Permalink to &quot;UrsaMenu 菜单组件&quot;">​</a></h1><p>提供后台导航菜单，基于 Element Plus <code>el-menu</code> 封装，支持树形菜单、图标映射和隐藏项过滤。</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(SourceCodeViewer, {
        "load-source": loadBaseUrsaMenuSource,
        language: "vue"
      }, null, _parent));
      _push(`<p>示例源码：<code>doc/components/UrsaMenu/BaseUrsaMenu.vue</code></p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>menus</code></td><td>菜单数组</td><td><code>Array</code></td><td><code>[]</code></td></tr><tr><td><code>defaultActive</code></td><td>默认激活菜单路径</td><td><code>String</code></td><td><code>&#39;&#39;</code></td></tr><tr><td><code>title</code></td><td>菜单顶部标题</td><td><code>String</code></td><td><code>管理系统后台</code></td></tr><tr><td><code>asideWidth</code></td><td>侧栏宽度</td><td><code>String</code></td><td><code>&#39;200px&#39;</code></td></tr><tr><td><code>router</code></td><td>是否启用路由模式</td><td><code>Boolean</code></td><td><code>true</code></td></tr><tr><td><code>filterHidden</code></td><td>是否过滤 <code>hidden: true</code> 的菜单</td><td><code>Boolean</code></td><td><code>true</code></td></tr><tr><td><code>defaultTitle</code></td><td>菜单名称兜底文案</td><td><code>String</code></td><td><code>未命名菜单</code></td></tr><tr><td><code>iconResolver</code></td><td>自定义图标解析函数</td><td><code>Function</code></td><td><code>undefined</code></td></tr></tbody></table><h2 id="菜单数据结构" tabindex="-1">菜单数据结构 <a class="header-anchor" href="#菜单数据结构" aria-label="Permalink to &quot;菜单数据结构&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">type</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> MenuItem</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  path</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  menu_name</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">?:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  title</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">?:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  icon</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">?:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  hidden</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">?:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> boolean</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">  children</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">?:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> MenuItem</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">[];</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">};</span></span></code></pre></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UrsaMenu/UrsaMenu.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
