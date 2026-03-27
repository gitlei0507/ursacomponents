# 快速开始

## 安装

```bash
npm i ursacomponents
```

## 全量注册

```js
import { createApp } from "vue";
import App from "./App.vue";
import UrsaComponents from "ursacomponents";
import "ursacomponents/style.css";

const app = createApp(App);
app.use(UrsaComponents);
app.mount("#app");
```

## 按需引入

```js
import { UrsaSearch, UrsaTable, useUrsaSearch } from "ursacomponents";
```

## 路由工具

```js
import {
  createUrsaMenuRouterToolkit,
  getUrsaMenuIcon,
  setupUrsaRouterGuard,
} from "ursacomponents";
```
