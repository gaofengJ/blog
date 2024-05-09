import { defineConfig } from 'vitepress';
import navConfig from '../src/nav-config.mts';
import sidebarConfig from '../src/sidebar-config.mts';

export default defineConfig({
  base: '/blog/',
  cleanUrls: true,
  lang: 'zh-CN',
  title: "Mufeng's blog",
  description: "木风同学的技术博客",
  head: [
    ['link', { rel: 'icon', href: '/blog/icon/favicon.svg' }],
  ],
  srcDir: './src',
  themeConfig: {
    logo: '/imgs/fengye.png',
    nav: navConfig,
    sidebar: sidebarConfig,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/gaofengJ/blog' },
    ],
    search: {
      provider: 'local',
    },
  },
})
