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

## git 规范

> Git 有很多的 hooks, 让我们在不同的阶段,对代码进行不同的操作,控制提交到仓库的代码的规范性,和准确性, 以下只是几个常用的钩子

| hooks      | 作用                                       |
|------------|------------------------------------------|
| pre-commit | 通过钩子函数,判断提交的代码是否符合规范    |
| commit-msg | 通过钩子函数,判断 commit 信息是否符合规范  |
| pre-push   | 通过钩子,执行测试,避免对以前的内容造成影响 |

### git规范工具

* **husky**  
操作 git 钩子的工具

* **lint-staged**  
本地暂存代码检查工具

* **commitlint**  
commit 信息校验工具

* **commitizen**  
辅助 commit 信息，通过在终端选择输入，规范提交信息

### 安装流程

#### 1、安装代码校验依赖

```sh
npm i -D lint-staged husky
npm set-script prepare "husky install" # 在 package.json 中添加脚本
npm run prepare # 初始化 husky，将 git hooks 钩子交由 husky 执行。初始化 husky 后, 会在根目录创建 .husky 文件夹
```

```sh
npx husky add .husky/pre-commit "npx lint-staged" # 执行 npx lint-staged 指令
```

根目录创建 .lintstagedrc.json 文件控制检查和操作方式。

```json
{
  "*.{js,vue,jsx,tsx,ts}": ["eslint"],
  "*.md": ["prettier"]
}
```

#### 2、安装提交信息依赖

```sh
npm i -D @commitlint/config-conventional
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

* `@commitlint/config-conventional` 是一个规范配置，标识采用什么规范来执行消息校验, 这个默认是Angular的提交规范。

* 也可以使用自己的方法来校验内容：

```sh
npx husky add .husky/commit-msg 'node [dir]/filename.js' # 指定目录文件
```

类型 | 描述 |
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

* `commit-msg` 钩子执行消息校验

#### 3、安装辅助提交依赖

```sh
npm i -D commitizen # 安装指令和命令行的展示信息
npm set-script commit "git-cz" # package.json 中添加 commit 指令, 执行 `git-cz` 指令
npx commitizen init 
```

**在此过程中可能需要安装 chalk，这是一个可以修改终端输出字符样式的 npm 包。chalk5 是 ESM，commonjs 中需要使用 chalk4.x**。

#### 4、自定义提交规范

```sh
npm i -D cz-customizable
```

增加 `.cz-config.js`。

package.json 中，将原来 commit 配置，变更为自定义配置：

```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  }
}
```
