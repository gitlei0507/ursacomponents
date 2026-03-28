const BaseUrsaMenu = `\uFEFF<script setup>
  import { ref } from 'vue'
  import { UrsaMenu } from 'ursacomponents'

  const defaultActive = ref('/dashboard')

  const menus = [
    {
      path: '/dashboard',
      menu_name: '首页',
      icon: 'DataBoard'
    },
    {
      path: '/system',
      menu_name: '系统管理',
      icon: 'Setting',
      children: [
        {
          path: '/system/user',
          menu_name: '用户管理',
          icon: 'User'
        },
        {
          path: '/system/role',
          menu_name: '角色管理',
          icon: 'UserFilled'
        }
      ]
    },
    {
      path: '/hidden',
      menu_name: 'Hidden',
      icon: 'Hide',
      hidden: true
    }
  ]
<\/script>

<template>
  <div class="h-screen w-full overflow-hidden">
    <el-container class="h-full w-full">
      <UrsaMenu :menus="menus" :default-active="defaultActive" title="示例菜单" aside-width="240px" />
    </el-container>
  </div>
</template>

<style scoped></style>
`;
export {
  BaseUrsaMenu as default
};
