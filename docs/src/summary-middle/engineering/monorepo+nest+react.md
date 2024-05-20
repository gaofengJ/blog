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

### 1、设置 npm 源

在根目录下新增 **.npmrc**，内容如下：

```sh
registry=http://registry.npmmirror.com
```

配置 npm 包的默认下载源。

### 2、Git规范

Git 有很多的 hooks, 让我们在不同的阶段,对代码进行不同的操作,控制提交到仓库的代码的规范性,和准确性。

#### 常用钩子

| hooks      | 作用                                       |
|------------|------------------------------------------|
| pre-commit | 通过钩子函数,判断提交的代码是否符合规范    |
| commit-msg | 通过钩子函数,判断 commit 信息是否符合规范  |
| pre-push   | 通过钩子,执行测试,避免对以前的内容造成影响 |

#### git规范工具

| 工具      | 作用                                       |
|------------|------------------------------------------|
| husky | 操作 git 钩子的工具    |
| lint-staged | 本地暂存代码检查工具  |
| commitlint   | commit 信息校验工具 |
| commitizen | 通过在终端选择输入，规范提交信息 |

#### 安装流程

> [!TIP]
> 整个项目共用一个 Git 仓库，所以相关依赖应安装在根目录下。

* 1、安装代码校验依赖，由于新版的 husky 与旧版的配置方式不一样，这里选择老版本的依赖：

```sh
pnpm i -D lint-staged@13 husky@8 -w
```

在 package.json 中增加 scripts：

```json
"scripts": {
  "prepare": "husky install"
},
```

然后执行 `pnpm i`，初始化 husky，将 git hooks 钩子交由 husky 处理。

> [!TIP]
> prepare 脚本是一个特殊的 npm 脚本，当运行 `npm install` 或 `yarn install` 时，prepare 脚本会在安装依赖之前执行

初始化之后，会自动在根目录创建 .husky 目录。

执行以下命令：

```sh
# 为 Husky 创建一个 Git 钩子，在每次提交代码之前运行 lint-staged
npx husky add .husky/pre-commit "npx lint-staged"
```

此命令会在 .husky 目录下生成 **pre-commit** 文件，并向其中写入以下内容：

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

package.json中添加以下代码，控制检查和操作方式。

```json
"lint-staged": {
  "apps/front/**/*.{js,jsx,ts,tsx}": [
    "cd apps/front && pnpm run lint"
  ],
  "apps/back/**/*.{js,jsx,ts,tsx}": [
    "cd apps/front && pnpm run lint"
  ]
}
```

* 2、安装提交信息依赖

```sh
 pnpm i commitlint -w -D
```

然后执行以下命令：

```sh
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

该命令的会创建或覆盖 **.husky/commit-msg** 文件，并将以下内容写入该文件：

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```

> [!TIP]
> **@commitlint/config-conventional** 是一个规范配置，标识采用什么规范来执行消息校验, 默认采用 Angular 的提交规范。**本项目中未使用**。

**Angular的提交规范**：

| 类型 | 描述 |
| -- | -- |
| build | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
| chore | 其他修改, 比如改变构建流程、或者增加依赖库、工具等 |
| ci | 持续集成修改docs文档修改 |
| feat | 新特性、新功能 |
| fix | 修改bug |
| perf | 优化相关，比如提升性能、体验 |
| refactor | 代码重构 |
| revert | 回滚到上一个版本 |
| style | 代码格式修改, 注意不是 css 修改 |
| test | 测试用例修改 |

> [!TIP]
> **commit-msg**： 每次提交消息被创建后执行特定的操作

* 3、安装辅助提交依赖

```sh
pnpm i -D commitizen -w
```

在 package.json 中添加 scripts：

```json
"scripts": {
  "commit": "git-cz"
},
```

> [!TIP]
> **cz-conventional-changelog** 遵循了 Conventional Commits 的规范，即一种约定化的提交消息格式，有助于生成更具可读性和可维护性的提交日志，可以通过 `npx commitizen init cz-conventional-changelog --save-dev --save-exact` 来规范化提交消息的格式。这里我们使用了自定义的提交规范，方便后期扩展。

自定义提交规范，安装以下依赖：

```sh
pnpm i -D commitlint-config-cz cz-customizable -w
```

在根目录下创建 **commitlint.config.js** ,采用自己定义的规范，内容如下：

```js
module.exports = {
  extends: ['cz'],
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
};
```

在根目录下创建 **.cz-config.js**，内容如下：

```js
module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复' },
    { value: 'merge', name: 'merge:     分支合并' },
    { value: 'style', name: 'style:    样式和代码格式' },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature,也不是修复bug)'
    },
    { value: 'test', name: 'test:     增加测试' },
    { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'docs', name: 'revert:  文档' }
  ],
  // 消息步骤
  messages: {
    type: '请选择提交类型:',
    // scope: '选择一个更改的范围(scope) (可选):',
    // used if allowCustomScopes is true
    // customScope: 'Denote the SCOPE of this change:',
    subject: '请输入本次commit记录说明(必填):',
    // body: '长说明，使用"|"换行(可选)：\n',
    // breaking: '非兼容性说明 (可选):\n',
    // footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  },

  skipQuestions: ['scope', 'body', 'breaking', 'footer'],

  allowBreakingChanges: [
    'fix',
    'feat',
    'test',
    'refactor',
    'revert',
    'docs',
    'style',
    'chore',
    'merge'
  ],
  subjectLimit: 100
};
```

在 package.json 中新增以下代码，指定项目中使用的 Commitizen 适配器。

```json
"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  }
}
```
