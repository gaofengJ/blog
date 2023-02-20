import { defineUserConfig, defaultTheme } from 'vuepress';
import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import configSummaryPrimary from '../summary-primary/config';
import configSummaryMiddle from '../summary-middle/config';
import configSummarySenior from '../summary-senior/config';
import configNote from '../note/config';
import configQuestions from '../questions/config';

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
        link: '/note/',
      },
      {
        text: '八股文',
        link: '/questions/',
      }
    ],
    sidebar: {
      '/summary-primary/': configSummaryPrimary,
      '/summary-middle/': configSummaryMiddle,
      '/summary-senior/': configSummarySenior,
      '/note/': configNote,
      '/questions/': configQuestions,
    },
    sidebarDepth: 2,
    contributors: true,
    editLink: false,
  }),
  plugins: [
    // docsearchPlugin({

    // })
  ],
  port: 8088,
});