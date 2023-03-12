import type { DefaultTheme } from 'vitepress'

export const getSidebar = (): DefaultTheme.Sidebar => {
  return {
    'quick': [
      {
        text: '开始',
        link: '/quick/',
      }
    ]
  }
}
