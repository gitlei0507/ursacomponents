import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Ursa Components',
  description: 'Ursa Vue 3 通用组件库文档',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/overview' }
    ],
    sidebar: [
      {
        text: '开始',
        items: [{ text: '快速开始', link: '/guide/getting-started' }]
      },
      {
        text: '组件',
        items: [
          { text: '组件总览', link: '/components/overview' },
          {
            text: '组件',
            collapsed: false,
            items: [
              { text: 'UrsaMenu', link: '/components/UrsaMenu/UrsaMenu' },
              { text: 'UrsaTagsView', link: '/components/UrsaTagsView/UrsaTagsView' },
            ]
          }
        ]
      }
    ],
    socialLinks: []
  }
})
