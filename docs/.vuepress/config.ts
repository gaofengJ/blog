import { defineUserConfig } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import configSummaryPrimary from '../summary-primary/config';
import configSummaryMiddle from '../summary-middle/config';
import configSummarySenior from '../summary-senior/config';
import configNoteRedbook from '../note/red-book/config';
import configNoteVisualization from '../note/visualization/config';
import configEssay from '../essay/config';

export default defineUserConfig({
  base: '/blog/',
  lang: 'zh-CN',
  title: '木风同学',
  description: '木风同学的技术博客',
  head: [
    ['link', { rel: 'icon', href: '/blog/icon/favicon.svg' }]
  ],
  bundler: viteBundler(),
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
        children: [
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
        link: '/essay/',
      }
    ],
    sidebar: {
      '/summary-primary/': configSummaryPrimary,
      '/summary-middle/': configSummaryMiddle,
      '/summary-senior/': configSummarySenior,
      '/note/red-book/': configNoteRedbook,
      '/note/visualization/': configNoteVisualization,
      '/essay/': configEssay,
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