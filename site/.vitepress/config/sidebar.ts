import type { DefaultTheme } from 'vitepress'

export const getSidebar = (): DefaultTheme.Sidebar => {
  return {
    '/components/': [
      {
        text: '基础组件',
        collapsed: false,
        items: [
          {
            text: 'Button 按钮',
            link: '/components/button/'
          }
        ]
      },
      {
        text: '表单',
        items: [
          {
            text: 'Input 输入框',
          }
        ]
      }
    ]
  }
}
