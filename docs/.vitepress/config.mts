import { defineConfig } from 'vitepress';
import navConfig from '../src/nav-config.mts'

export default defineConfig({
  base: '/blog/',
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
    sidebar: {
      '/summary-primary/': [
        {
          text: '前端基础',
          collapsed: true,
          items: [
            {
              text: 'Index',
              link: '/summary-primary/'
            },
            {
              text: '111',
              link: '/summary-primary/basic/aliyun-deploy.md',
            },
          ],
        },
      ],
      '/summary-middle/': [
        {
          text: '工程化',
          link: '/summary-middle/engineering/package-mng',
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/gaofengJ/blog' },
    ],
    search: {
      provider: 'local',
    },
  },
})
