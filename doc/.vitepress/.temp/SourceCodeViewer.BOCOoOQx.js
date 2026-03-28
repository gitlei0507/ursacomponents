import { inject, computed, ref, watch, resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, toRef, createElementVNode, toDisplayString, unref, resolveDynamicComponent, mergeProps, useSSRContext } from "vue";
import * as Y from "@element-plus/icons-vue";
import { routeLocationKey, routerKey } from "vue-router";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const Z = (e, a = {}) => {
  const { iconMap: t = Y, fallbackIcon: r = "Menu" } = a;
  return (t == null ? void 0 : t[e]) || (t == null ? void 0 : t[r]) || Y.Menu;
}, Me = (e, a = {}) => {
  const { defaultTitle: t = "未命名菜单", iconResolver: r = Z } = a, s = computed(() => {
    const l = unref(e);
    return Array.isArray(l == null ? void 0 : l.children) && l.children.length > 0;
  }), c = computed(() => {
    const l = unref(e);
    return (l == null ? void 0 : l.menu_name) || (l == null ? void 0 : l.title) || t;
  }), i = computed(() => {
    var _a;
    const l = unref(e), f = ((_a = l == null ? void 0 : l.meta) == null ? void 0 : _a.icon) || (l == null ? void 0 : l.icon);
    return (typeof r == "function" ? r : Z)(f);
  });
  return {
    hasChildren: s,
    menuTitle: c,
    menuIcon: i
  };
}, ne = /* @__PURE__ */ Object.assign({
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
    const a = e, { hasChildren: t, menuTitle: r, menuIcon: s } = Me(toRef(a, "menu"), {
      defaultTitle: a.defaultTitle,
      iconResolver: a.iconResolver
    });
    return (c, i) => {
      const l = resolveComponent("el-icon"), f = resolveComponent("UrsaMenuItem", true), p = resolveComponent("el-sub-menu"), M = resolveComponent("el-menu-item");
      return unref(t) ? (openBlock(), createBlock(p, {
        key: 0,
        index: e.menu.path
      }, {
        title: withCtx(() => [
          createVNode(l, null, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(unref(s))))
            ]),
            _: 1
          }),
          createElementVNode("span", null, toDisplayString(unref(r)), 1)
        ]),
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.menu.children, (b) => (openBlock(), createBlock(f, {
            key: b.path,
            menu: b,
            "default-title": e.defaultTitle,
            "icon-resolver": e.iconResolver
          }, null, 8, ["menu", "default-title", "icon-resolver"]))), 128))
        ]),
        _: 1
      }, 8, ["index"])) : (openBlock(), createBlock(M, {
        key: 1,
        index: e.menu.path
      }, {
        default: withCtx(() => [
          createVNode(l, null, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(unref(s))))
            ]),
            _: 1
          }),
          createElementVNode("span", null, toDisplayString(unref(r)), 1)
        ]),
        _: 1
      }, 8, ["index"]));
    };
  }
}), Se = (e, a = true) => ({
  visibleMenus: computed(() => {
    const r = unref(e), s = unref(a);
    return Array.isArray(r) ? s ? r.filter((c) => !(c == null ? void 0 : c.hidden)) : r : [];
  })
}), H = (e, a) => {
  const t = e.__vccOpts || e;
  for (const [r, s] of a)
    t[r] = s;
  return t;
}, $e = { class: "ursa-menu-title" }, Ae = {
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
    const a = e, { visibleMenus: t } = Se(toRef(a, "menus"), toRef(a, "filterHidden"));
    return (r, s) => {
      const c = resolveComponent("el-menu"), i = resolveComponent("el-aside");
      return openBlock(), createBlock(i, {
        width: e.asideWidth,
        class: "ursa-menu-aside"
      }, {
        default: withCtx(() => [
          createElementVNode("div", $e, toDisplayString(e.title), 1),
          createVNode(c, {
            router: e.router,
            "default-active": e.defaultActive,
            "active-text-color": "#ffd04b",
            "background-color": "#1f2937",
            class: "el-menu-vertical-demo ursa-menu-panel",
            "text-color": "#fff"
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(t), (l) => (openBlock(), createBlock(ne, {
                key: l.path,
                menu: l,
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
}, Te = /* @__PURE__ */ H(Ae, [["__scopeId", "data-v-453d2132"]]), Ne = { class: "ursa-tags-view" }, Le = /* @__PURE__ */ Object.assign({
  name: "UrsaTagsView"
}, {
  __name: "UrsaTagsView",
  props: {
    homePath: {
      type: String,
      default: "/dashboard"
    },
    homeTitle: {
      type: String,
      default: "首页"
    }
  },
  setup(e) {
    const a = e, t = inject(routeLocationKey, null), r = inject(routerKey, null), s = computed(() => !!(t && r)), c = ref([]), i = computed({
      get: () => {
        var _a;
        return s.value ? t.path : ((_a = c.value[0]) == null ? void 0 : _a.path) || a.homePath;
      },
      set: (h) => h
    }), l = (h) => {
      var _a;
      return {
        path: h.path,
        title: ((_a = h.meta) == null ? void 0 : _a.title) || h.name || h.path,
        closable: h.path !== a.homePath
      };
    }, f = () => {
      var _a;
      if (c.value.some((_) => _.path === a.homePath))
        return;
      const u = s.value ? r.resolve(a.homePath) : null;
      c.value.unshift(
        l({
          path: a.homePath,
          meta: { title: ((_a = u == null ? void 0 : u.meta) == null ? void 0 : _a.title) || a.homeTitle },
          name: (u == null ? void 0 : u.name) || a.homeTitle
        })
      );
    }, p = (h) => {
      if (!(h == null ? void 0 : h.path) || h.path === "/")
        return;
      c.value.some((_) => _.path === h.path) || c.value.push(l(h));
    }, M = (h) => {
      var _a;
      if (!s.value)
        return;
      const u = (_a = h == null ? void 0 : h.props) == null ? void 0 : _a.name;
      u && u !== t.path && r.push(u);
    }, b = (h) => {
      var _a;
      const u = c.value.findIndex((T) => T.path === h);
      if (u === -1 || (c.value.splice(u, 1), !s.value || t.path !== h))
        return;
      const S = ((_a = c.value[u] || c.value[u - 1]) == null ? void 0 : _a.path) || a.homePath;
      r.push(S);
    };
    return watch(
      () => s.value ? t.path : "__no_router__",
      () => {
        f(), s.value && p(t);
      },
      { immediate: true }
    ), (h, u) => {
      const _ = resolveComponent("el-tab-pane"), S = resolveComponent("el-tabs");
      return openBlock(), createElementBlock("div", Ne, [
        createVNode(S, {
          modelValue: i.value,
          "onUpdate:modelValue": u[0] || (u[0] = (T) => i.value = T),
          type: "card",
          class: "ursa-tags-tabs",
          onTabClick: M,
          onTabRemove: b
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(c.value, (T) => (openBlock(), createBlock(_, {
              key: T.path,
              label: T.title,
              name: T.path,
              closable: T.closable
            }, null, 8, ["label", "name", "closable"]))), 128))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
}), Oe = /* @__PURE__ */ H(Le, [["__scopeId", "data-v-6a158b90"]]);
const _sfc_main = {
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
    const copied = ref(false);
    const buttonTextComputed = computed(() => sourceOpen.value ? props.buttonTextHide : props.buttonTextView);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<details${ssrRenderAttrs(mergeProps({ class: "source-toggle" }, _attrs))} data-v-b186af90><summary data-v-b186af90>${ssrInterpolate(buttonTextComputed.value)}</summary>`);
      if (sourceLoading.value) {
        _push(`<div class="source-state" data-v-b186af90>${ssrInterpolate(__props.loadingText)}</div>`);
      } else {
        _push(`<div class="source-code-wrap" data-v-b186af90><button class="copy-btn" type="button" title="复制" data-v-b186af90>${ssrInterpolate(copied.value ? "已复制" : "复制")}</button><pre class="source-code" data-v-b186af90><code class="hljs" data-v-b186af90>${highlightedCode.value ?? ""}</code></pre></div>`);
      }
      _push(`</details>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SourceCodeViewer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SourceCodeViewer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b186af90"]]);
export {
  Oe as O,
  SourceCodeViewer as S,
  Te as T
};
