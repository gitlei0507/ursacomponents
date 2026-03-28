<script setup>
  import { House, QuestionFilled, Setting, User } from '@element-plus/icons-vue'
  import { UrsaMenu } from 'ursacomponents'
  import { ref } from 'vue'

  const defaultActive = ref('/dashboard')

  const menus = [
    {
      path: '/dashboard',
      menu_name: '首页',
      icon: 'dashboard'
    },
    {
      path: '/system',
      menu_name: '系统管理',
      icon: 'setting',
      children: [
        {
          path: '/system/user',
          menu_name: '用户管理',
          icon: 'user'
        },
        {
          path: '/system/role',
          menu_name: '角色管理',
          icon: 'user'
        }
      ]
    },
    {
      path: '/hidden',
      menu_name: '隐藏菜单',
      icon: 'hidden',
      hidden: true
    }
  ]

  const iconMap = {
    dashboard: House,
    setting: Setting,
    user: User
  }

  const iconResolver = (iconName) => {
    return iconMap[iconName] || QuestionFilled  // QuestionFilled 兜底图标
  }
</script>

<template>
  <div class="h-screen w-full overflow-hidden">
    <el-container class="h-full w-full">
      <UrsaMenu :menus="menus" :default-active="defaultActive" title="示例菜单" aside-width="240px"
        :icon-resolver="iconResolver" />
    </el-container>
  </div>
</template>

<style scoped></style>
