---
title: 前端工程化规范
description: 工程化
keywords: Eslint、Prettier、Husky、Commitlint、Lint-staged
---

# 前端工程化规范

参考[https://juejin.cn/post/7038143752036155428](https://juejin.cn/post/7038143752036155428)。

## 概述

记录前端工程化规范，主要涉及的插件有：

* **Eslint**
* **Prettier**
* **husky**
* **lint-staged**
* **commitlint**
* **commitizen**

版本备注：

* **node** 版本：**16.2.0**
* **npm** 版本：**8.5.2**

## 代码规范

### Eslint

```sh
npm i -D eslint
npx eslint --init # npx：npx 是 npm v5.2.0 版本之后随 npm 一起打包安装的一个包执行器，可以直接使用 npx 命令去执行指令
```

通过执行`init`命令会自动生成`.eslintrc.js`。

如果需要自动修复还需要编辑器的配合：

1. 下载Eslint插件
2. 在 VS CODE 的 settings.json 中添加如下代码：

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
},
```

### Prettier

```sh
npm i -D prettier eslint-config-prettier
```

在 JavaScript 及其衍生语言的格式化上，ESLint 和 Prettier 是有重合的。所以，在实际运用中，我们需要保证这些文件只会采用其中一种进行格式化，避免不必要的格式化。更遭的情况是启用了两个，而且两个工具的风格配置互相冲突。

要同时使用二者，就需要关闭 ESLint 中可能和 Prettier 冲突的规则，而这就是 `eslint-config-prettier` 所做的事。

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["vue", "prettier"],
  extends: ["plugin:vue/essential", "eslint:recommended", "prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        trailingComma: "none"
      }
    ]
  }
};
```

## Git规范

Git 有很多的 hooks, 让我们在不同的阶段,对代码进行不同的操作,控制提交到仓库的代码的规范性,和准确性。

### 常用钩子

| hooks      | 作用                                       |
|------------|------------------------------------------|
| pre-commit | 通过钩子函数,判断提交的代码是否符合规范    |
| commit-msg | 通过钩子函数,判断 commit 信息是否符合规范  |
| pre-push   | 通过钩子,执行测试,避免对以前的内容造成影响 |

### git规范工具

| 工具      | 作用                                       |
|------------|------------------------------------------|
| husky | 操作 git 钩子的工具    |
| lint-staged | 本地暂存代码检查工具  |
| commitlint   | commit 信息校验工具 |
| commitizen | 通过在终端选择输入，规范提交信息 |

### 安装流程

> [!TIP]
> 整个项目共用一个 Git 仓库，所以相关依赖应安装在根目录下。

* 1、安装代码校验依赖，由于新版的 husky 与旧版的配置方式不一样，这里选择老版本的依赖：

```sh
pnpm i -D lint-staged@13 husky@8
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
  "*.{js,vue,jsx,tsx,ts}": [
    "eslint --config=.eslintrc.js"
  ],
  "*.{html,vue,css,less}": [
    "stylelint 'src/**/*.{vue,css,less}' --fix --config=.stylelintrc.js"
  ]
},
```

* 2、安装提交信息依赖

```sh
 pnpm i commitlint -D
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
pnpm i -D commitizen
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
pnpm i -D commitlint-config-cz cz-customizable
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
