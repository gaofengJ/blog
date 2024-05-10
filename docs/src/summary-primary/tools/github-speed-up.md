---
title: 解决Github访问慢的问题
description: 研发工具
---

# 研发工具

## 背景

平常工作中我们经常需要到 Github 中寻找一些项目资源或者解决一些问题，但是由于墙的限制或者 DNS 污染导致页面打开速度很慢甚至无法打开的情况，很是让人头疼，下面记录一下解决 Github 访问慢的方法。

解决问题的关键就是**修改 hosts 映射，以此来绕过DNS解析**。主要有以下几种方法：

## 直接修改本地 hosts 文件

Windows中hosts文件地址：`c:/Windows/System32/drivers/etc`。

Mac中hosts文件地址：`/etc/hosts`。

由于权限问题我们无法直接修改该文件，把该文件拖到桌面上，修改完成之后再复制回覆盖原文件即可。

```sh
# github dns映射
199.232.69.194 github.global.ssl.Fastly.net
140.82.114.4 GitHub.com
185.199.108.153 assets-cdn.Github.com
140.82.114.9 codeload.Github.com
```

## switchhosts 修改 hosts 映射

switchhosts 是一个管理、快速切换 hosts 的小工具，开源软件，一键切换 hosts 配置，非常实用，高效。推荐使用 switchhosts 来管理 hosts 映射。

下载完成后，配置映射即可。

![switchhosts配置映射](/imgs/summary-primary/tools/github_speed_up_1.png)

## switchhosts 自动更新远程映射

手动更新本地 hosts 文件的方式比较繁琐，可以利用 switchhosts 绑定远程 hosts 文件的方式来自动更新 hosts 映射

![switchhosts配置远程映射](/imgs/summary-primary/tools/github_speed_up_2.png)

其中，远程URL地址：`https://gitlab.com/ineo6/hosts/-/raw/master/next-hosts`

完事！！！
