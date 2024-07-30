---
title: 工程化
description: 工程化
---

# 工程化 面试题

## 介绍下 npm 模块安装机制

npm（Node Package Manager）是一个用于管理JavaScript代码库的工具，广泛用于Node.js应用程序的开发。npm模块安装机制主要包括以下几个方面：

* 本地安装：
  * 位置：默认情况下，npm会将模块安装在当前项目的 node_modules 目录下。
  * 使用：本地安装的模块通常用于项目中的 require() 语句。
  * 命令：使用 `npm install <package-name>` 命令可以在项目目录中安装模块。

* 全局安装：
  * 位置：全局安装的模块会安装在全局路径中，该路径可以通过运行`npm config get prefix`命令查看。
  * 使用：全局安装的模块通常用于命令行工具，而不是通过require()在代码中使用。
  * 命令：使用`npm install -g <package-name>`命令可以全局安装模块。

* 安装机制：
  * 依赖解析：npm会从注册表中获取模块及其依赖，并将它们下载到合适的目录。
  * 缓存：npm会缓存下载的模块，以加快后续安装速度。缓存位置可以通过`npm config get cache`命令查看。
  * 版本管理：npm使用package.json文件来管理项目的依赖关系和模块版本信息。使用npm install命令时，npm会根据package.json文件中的内容安装所有依赖模块。

* 配置：

  * 自定义路径：可以通过.npmrc文件来配置自定义安装路径。例如，设置prefix参数可以改变全局模块的安装路径。
  * 命令配置：使用`npm config set <key> <value>`命令可以设置配置选项，使用`npm config get <key>`命令可以获取配置选项。

## 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的

webpack-dev-server 是一个提供实时重载和热模块替换（HMR）功能的开发服务器工具。它的核心目的是通过一系列机制提高开发效率和用户体验。它主要由以下三个部分组成：

* Webpack：负责编译代码。
* webpack-dev-middleware：主要负责构建内存文件系统，将 Webpack 的 OutputFileSystem 替换成 InMemoryFileSystem，同时作为 Express 的中间件拦截请求，从内存文件系统中获取结果。
* Express：负责搭建请求路由服务。

工作流程

* 1.**启动 dev-server**：Webpack 开始构建，在编译期间会向 entry 文件注入热更新代码。

* 2.**建立通讯渠道**：Client 首次打开后，Server 和 Client 基于 WebSocket 建立通讯渠道。

* 3.**监听文件变动**：当修改文件时，Server 端监听到文件变化，Webpack 开始重新编译，直到编译完成会触发 "done" 事件。

* 4.**通知 Client**：Server 通过 WebSocket 发送消息通知 Client。

* 5.**获取 manifest 描述文件**：Client 根据 Server 的消息（包含 hash 值和 state 状态），通过 AJAX 请求获取 Server 的 manifest 描述文件。

* 6.**对比并请求新模块**：Client 对比当前的模块树，再次请求 Server 获取新的 JS 模块。

* 7.**更新模块树**：Client 获取到新的 JS 模块后，会更新模块树并替换掉现有的模块。

* 8.**调用 module.hot.accept()**：最后调用 `module.hot.accept()` 完成热更新。
