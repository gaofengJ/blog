import { defineUserConfig, defaultTheme } from 'vuepress';
import { docsearchPlugin } from '@vuepress/plugin-docsearch';

export default defineUserConfig({
  base: '/blog/',
  lang: 'zh-CN',
  title: '木风同学',
  description: '木风同学的技术博客',
  head: [
    ['link', { rel: 'icon', href: '/icon/favicon.svg' }]
  ],
  theme: defaultTheme({
    logo: '/icon/icon_fengye.png',
    repo: 'https://github.com/gaofengJ/blog',
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '笔记',
        link: '/summary/',
      },
    ],
    sidebar: {
      '/summary/': [
        {
          text: '服务器相关',
          collapsible: true,
          children: [
            '/summary/server/aliyun-deploy.md', 
            '/summary/server/linux-basic.md',
          ],
        },
        {
          text: 'Vue',
          collapsible: true,
          children: [
            '/summary/vue/nuxt-seo.md',
          ],
        }
      ],
    },
    sidebarDepth: 1,
    contributors: true,
    editLink: false,
  }),
  plugins: [
    // docsearchPlugin({

    // })
  ],
  port: 8088,
});