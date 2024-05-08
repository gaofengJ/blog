import { defineConfig } from 'vitepress';

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
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '前端初阶',
        link: '/summary-primary/',
      },
      {
        text: '前端中阶',
        link: '/summary-middle/',
      },
      {
        text: '前端高阶',
        link: '/summary-senior/',
      },
      {
        text: '学习笔记',
        items: [
          {
            text: 'JavaScript红宝书',
            link: '/note/red-book/index.md',
          },
          {
            text: '可视化',
            link: '/note/visualization/index.md',
          },
        ],
      },
      {
        text: '八股文',
        link: '/essay',
      }
    ],
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
