import type { DefaultTheme } from 'vitepress'

export const getNav = (): DefaultTheme.NavItem[] => {
  return [
    {
      text: '快速上手',
      link: '/quick/'
    },
    {
      text: '组件',
      link: '/components/'
    }
  ]
}
