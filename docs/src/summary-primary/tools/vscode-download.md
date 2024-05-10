---
title: 解决VS Code下载慢的问题
description: 研发工具
---

# 解决 VS Code 下载慢的问题

## 背景

在国内下载VS Code时，由于网络环境限制，下载速度极慢。

## 解决方法

一、打开 VS Code 官网，找到下载入口，点击下载

二、点击浏览器“下载内容”，查看下载链接地址

![vscode-download点击下载内容](/imgs/summary-primary/tools/vscode_download_1.png)

![vscode-download查看下载链接](/imgs/summary-primary/tools/vscode_download_2.png)

三、替换下载链接中的域名

将`az764295.vo.msecnd.net`替换为`vscode.cdn.azure.cn`，替换后的新地址：`https://vscode.cdn.azure.cn/stable/8490d3dde47c57ba65ec40dd192d014fd2113496/VSCode-darwin-arm64.zip`。

然后使用新地址进行下载，就可以切到国内镜像，顺利下载！
