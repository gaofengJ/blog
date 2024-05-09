---
title: 项目模板(vue3 + vite4)
description: 项目模板(vue3 + vite4)
---

# 项目模板(vue3 + vite4)

## 项目目录

```js
project-name // 项目名称
  - .husky // Husky相关
  - nod_modules // 项目依赖
  - scripts // 项目相关的一些脚本
  - src // 主目录
    - api // 接口相关
    - assets // 静态资源
      - imgs // 图片
      - style // 样式
      - svg // svg
    - components // 公共组件
    - config // 全局配置，包含环境变量、登录、鉴权配置等
    - hooks // 公共hooks
    - layout // 页面整体布局
    - plugins // 插件
    - router // 路由相关
    - store // 状态管理相关代码，可以使用vuex或者pinia
    - types // 公共类型文件
    - utils // 工具方法/公共枚举
    - views // 页面级别的组件
    - App.vue // 入口组件，在main.ts中引入
    - env.d.ts // 声明全局环境变量的 TypeScript 类型
    - main.ts // 入口文件
    - vite-env.d.ts // 配置环境变量类型声明
  - .cz-config.js // 用于配置 Commitizen（一个规范化提交消息的工具）
  - .env.propd // 配置生产环境下的环境变量
  - .eslintignore // 配置 ESLint 忽略某些文件或目录
  - .eslintrc.js // ESLint 的配置文件，用于定义代码规范和检查的规则
  - .gitignore // 告诉 Git 哪些文件或目录不应该被纳入版本控制
  - .prettierrc.js // prettier 工具的配置文件，用于指定 Prettier 的格式化规则和选项
  - .stylelintrc.js // stylelint 工具的配置文件，用于定义在项目中执行样式代码检查时的规则和配置选项
  - commitlint.config.js // 配置 Commitlint 工具的规则和配置选项的文件
  - env.d.ts // 声明全局环境变量的 TypeScript 类型
  - index.html // 主 HTML 文件，它是整个应用程序的入口点
  - package.json // 项目核心配置文件，提供了项目的基本信息、依赖关系、脚本命令等重要的配置
  - pnpm-lock.yaml //  pnpm 包管理工具生成的锁定文件
  - README.md // 项目的文档说明
  - tsconfig.json // TypeScript 配置文件，用于配置 TypeScript 编译器的行为
  - vite.config.js // Vite 配置文件，用于配置 Vite 项目的构建和开发设置
```

## 名词解释

### Husky

Husky 是一个 Git 钩子（Git hooks）工具，它可以帮助你在 Git 操作的不同阶段执行脚本。Git 钩子是在 Git 执行特定操作时自动运行的脚本。

Husky 的作用在于，在 Git 操作发生时触发预定义的脚本，以执行一些操作或验证。常见的 Git 钩子事件包括提交前（pre-commit）、提交后（post-commit）、推送前（pre-push）等等。

一些常见的用途包括：

* 代码规范检查： 在提交代码前运行 lint 工具，确保代码符合规范。
* 单元测试： 在提交前或推送前运行单元测试，确保代码的可靠性。
* 提交信息检查： 在提交前验证提交信息是否符合规范。

### auto-import.d.ts

在 Vue3 中，auto-import.d.ts 文件通常用于配置 TypeScript 的自动导入。

在 TypeScript 中，你可以使用 "module": "esnext" 来开启 TypeScript 的自动导入特性，它会自动导入你在模板中使用的 Vue 组件。但是，为了让 TypeScript 正确地识别 Vue 组件，你需要提供一个类型声明文件（.d.ts），而 auto-import.d.ts 就是这样的一个文件。

该文件的作用是为 TypeScript 提供有关 Vue 组件的类型信息，以便在编辑器中进行正确的自动导入和类型检查。

典型的 auto-import.d.ts 文件可能如下所示：

```ts
// auto-import.d.ts

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

这个声明告诉 TypeScript，当遇到以 .vue 结尾的文件时，它应该将其视为一个 Vue 组件，并使用 DefineComponent 类型来表示这个组件。这有助于编辑器正确地推断和显示组件的类型信息，以及在模板中进行自动导入。

### vite-env.d.ts

`vite-env.d.ts`文件是 Vite 项目中用于配置环境变量类型声明的 TypeScript 文件。这个文件主要用于声明项目中使用的环境变量，以便在代码中使用这些环境变量时，获得 TypeScript 的类型提示。

下面是一个简单的`vite-env.d.ts`文件示例：

```js
/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_BASE: string;
  VITE_APP_KEY: string;
  VITE_DEBUG: boolean;
  // 添加其他环境变量...
}
```

### `/// <reference types="vite/client" /> `

是 TypeScript 中的一个特殊注释，用于引入 Vite 的客户端类型声明文件。

## vite.config.ts

### Vue Components AutoImport

自动导入 Vue 组件和生成 TypeScript 类型声明文件。

示例：

```js
defineConfig({
  plugins: [
    Components({
      dts: 'src/components.d.ts', // 指定了生成的 TypeScript 类型声明文件的路径
      resolvers: [ // 这个数组包含了解析器（resolvers），用于处理不同种类的组件
        AntDesignVueResolver({ // 使用 Ant Design Vue 组件的解析器
          importStyle: false, // 不将样式以 CSS in JS 的方式导入
        }),
      ],
    }),
  ]
})
```

### AutoImport

AutoImport 是一个用于自动导入模块和生成 TypeScript 类型声明文件的工具。

示例：

```js
defineConfig({
  plugins: [
    AutoImport({
      imports: [ // 定义需要自动导入的模块列表
        'vue',
        {
          'lodash-es': [['*', '_']], // 表示导入所有内容，并将其命名为 _
        },
      ],
      dts: 'src/auto-import.d.ts', // 指定生成的 TypeScript 类型声明文件的路径
      vueTemplate: true, // 支持 Vue 模板的自动导入
      eslintrc: {
        enabled: true, // 启用 ESLint 相关功能
        filepath: './.eslintrc-auto-import.json', // 指定了 ESLint 配置文件的路径
        globalsPropValue: true, // 将全局属性的值纳入到自动生成的 TypeScript 类型声明中
      },
    })
  ]
})
```
