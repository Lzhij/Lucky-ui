import { defineConfig } from 'vitepress'
import { getNav } from './config/nav'
import { getSidebar } from './config/sidebar'

export default defineConfig({
  title: 'home',
  themeConfig: {
    nav: getNav(),
    sidebar: getSidebar()
  }
})
