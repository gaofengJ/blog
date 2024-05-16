---
title: Monorepo + Nest + React 搭建前后端一体化项目
description: 工程化
---

# Monorepo + Nest + React 搭建前后端一体化项目

## 前言

趁着最近突然泛起的技术热情，对一些之前的个人项目做了技术重构，本文描述的是对一个 **Koa + React** 分别独立的 Web 项目做重构，改用 **Monorepo + Nest + React** 的方式，并加入了工程化相关的一些工具。

## 一、搭建 Mnnorepo 结构

### 1、新建项目

创建 cli 目录, 使用 `pnpm init` 初始化项目。

### 2、在根目录下创建 pnpm-workspace.yaml 工作空间配置文件

```yml
packages:
  - 'packages/*'
  - 'apps/*'
```

> [!TIP]
>
> * **packaegs/\*** 表示 packages 所有直接子目录
> * **apps/\*** 表示 apps 所有直接子目录

配置后, 声明了 packages 和 apps 目录中子工程是同属一个工作空间的, 工作空间中的子工程编译打包的产物都可以被其它子工程引用。

## 二、创建 Nest 项目

如果没有安装 **Nestjs/cli** 需要提前安装：

```sh
pnpm i -g @nestjs/cli
```

在根目录下创建 apps 目录，进入 apps 目录。

创建 Nest 项目：

```sh
nest new back --strict --skip-git
```

> [!TIP]
>
> 创建项目时使用 `--skip-git`，否则新项目会默认初始化 git，导致和外层的冲突

安装过程完成后，可以在 /apps/back 目录下运行以下命令，以启动应用程序：

```sh
pnpm start
```

此命令启动 HTTP 服务监听定义在 src/main.ts 文件中定义的端口号。在应用程序运行后, 打开浏览器并访问 `http://localhost:3000/`。 你应该看到 Hello world! 信息。

## 三、创建 React 项目

在 apps 目录下，创建 React 项目：

```sh
npx create-next-app@latest
```

安装过程完成后，可以在 /apps/front 目录下运行以下命令，以启动应用程序：

```sh
pnpm dev
```

## 四、项目工程化规范

### 1、在根目录下新增 **.npmrc**

内容如下：

```sh
registry=http://registry.npmmirror.com
```

配置 npm 包的默认下载源。
