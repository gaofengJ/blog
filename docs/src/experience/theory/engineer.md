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
