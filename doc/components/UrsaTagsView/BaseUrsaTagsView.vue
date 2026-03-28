<script setup>
  import { UrsaTagsView } from 'ursacomponents'
  import { provide, reactive } from 'vue'
  import { routeLocationKey, routerKey } from 'vue-router'

  const titleMap = {
    '/dashboard': '首页',
    '/system/user': '用户管理'
  }

  const route = reactive({
    path: '/system/user',
    name: 'system-user',
    meta: { title: titleMap['/system/user'] }
  })

  const router = {
    push(target) {
      const path = typeof target === 'string' ? target : target?.path
      if (!path) {
        return
      }

      route.path = path
      route.name = path
      route.meta = { title: titleMap[path] || path }
    },
    resolve(path) {
      return {
        path,
        name: path,
        meta: { title: titleMap[path] || path }
      }
    }
  }

  provide(routeLocationKey, route)
  provide(routerKey, router)
</script>

<template>
  <div class="tags-demo-wrap">
    <UrsaTagsView home-path="/dashboard" home-title="首页" />
  </div>
</template>

<style scoped></style>
