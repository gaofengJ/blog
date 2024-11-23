---
title: 工程化
description: 工程化
---

# 工程化 面试题

## git

[git](../../summary-middle/engineering/git.md)

## 介绍下 npm 模块安装机制

npm（Node Package Manager）是一个用于管理 JavaScript 代码库的工具，广泛用于Node.js应用程序的开发。npm模块安装机制主要包括以下几个方面：

* **本地安装**
  * 位置：默认情况下，npm会将模块安装在当前项目的 node_modules 目录下。
  * 使用：本地安装的模块通常用于项目中的 require() 语句。
  * 命令：使用 `npm install <package-name>` 命令可以在项目目录中安装模块。

* **全局安装**
  * 位置：全局安装的模块会安装在全局路径中，该路径可以通过运行`npm config get prefix`命令查看。
  * 使用：全局安装的模块通常用于命令行工具，而不是通过require()在代码中使用。
  * 命令：使用`npm install -g <package-name>`命令可以全局安装模块。

* **安装机制**
  * 依赖解析：npm会从注册表中获取模块及其依赖，并将它们下载到合适的目录。
  * 缓存：npm会缓存下载的模块，以加快后续安装速度。缓存位置可以通过`npm config get cache`命令查看。
  * 版本管理：npm使用package.json文件来管理项目的依赖关系和模块版本信息。使用npm install命令时，npm会根据package.json文件中的内容安装所有依赖模块。

* **配置**

  * 自定义路径：可以通过.npmrc文件来配置自定义安装路径。例如，设置prefix参数可以改变全局模块的安装路径。
  * 命令配置：使用`npm config set <key> <value>`命令可以设置配置选项，使用`npm config get <key>`命令可以获取配置选项。

## pnpm

## CommonJS、AMD、CMD、ESM 区别

CommonJS、AMD、CMD 和 ESM 都是 JavaScript 的模块化规范，它们之间的主要区别在于加载方式、模块解析和依赖处理的不同。以下是它们的简要区别和使用场景：

* **CommonJS (CJS)**

  * **同步加载**
  
    CommonJS 模块是同步加载的，这意味着它们主要用于服务器端（如 Node.js），因为在服务器环境下，模块加载是可以快速完成的。

  * **模块定义**
  
    使用 module.exports 和 require 来定义和加载模块。例如：

  ```js
  // module.js
  module.exports = function() {
    return 'Hello, World!';
  };

  // app.js
  const greet = require('./module');
  console.log(greet());
  ```

  * **适用场景**

    主要用于服务器端，尤其是 Node.js。

* **AMD (Asynchronous Module Definition)**

  * **异步加载**
  
    AMD 采用异步加载模块的方式，适合浏览器环境，能有效避免阻塞页面渲染。

  * **模块定义**
  
    使用 define 函数来定义模块和依赖。例如：

  ```js
  define(['dependency'], function(dep) {
    return function() {
      console.log(dep);
    };
  });
  ```

  * **适用场景**

    主要用于浏览器环境，尤其是前端开发。

* **CMD (Common Module Definition)**

  * **类似于 AMD**
  
    CMD 是由国内团队提出的，它的加载方式与 AMD 类似，但它倾向于采用延迟加载的策略。
  
  * **模块定义**
  
    使用 define 和 require 来定义模块和加载依赖，但有一个特点是模块在定义时会延迟执行，以提高效率。

  ```js
  define(function(require, exports, module) {
    const dependency = require('dependency');
    exports.greet = function() {
      console.log(dependency);
    };
  });
  ```

  * **适用场景**
  
    主要在前端开发中使用，特别是用于支持异步加载的框架（如 SeaJS）。

* **ESM (ECMAScript Modules)**

  * **现代标准**

    ESM 是 ES6 引入的模块化标准，支持静态分析，具有更好的性能和优化空间。

  * **模块定义**

    使用 export 和 import 来定义和加载模块。例如：

  ```js
  // module.js
  export function greet() {
    return 'Hello, World!';
  }

  // app.js
  import { greet } from './module';
  console.log(greet());
  ```

  * **适用场景**
  
    现代 JavaScript 应用，尤其是 ES6 及以上的项目，适用于浏览器和 Node.js 环境。

* **总结**

  * CommonJS：同步加载，适合 Node.js。
  * AMD：异步加载，适合浏览器。
  * CMD：异步加载，适合浏览器，延迟执行。
  * ESM：现代标准，静态分析，适用于浏览器和 Node.js。

这些模块化规范解决了不同平台和使用场景下的模块化问题，各有优缺点。在实际应用中，选择合适的模块化标准可以提高性能和开发效率。

## CommonJS 和 ESM 区别

CommonJS 和 ESM（ES6 Modules）是 JavaScript 模块化的两种主要方式，它们在语法、加载方式、使用场景等方面存在一些区别。

* **语法差异**

  * CommonJS 使用 require() 来导入模块，module.exports 或 exports 来导出模块。

  ```js
  // 导出
  module.exports = function() { ... };
  // 导入
  const myModule = require('myModule');
  ```

  * ESM（ES6 Modules） 使用 import 和 export 语法。它是JavaScript 语言本身的一部分，具备静态分析的特点。

  ```js
  // 导出
  export default function() { ... };
  // 导入
  import myModule from 'myModule';
  ```

* **加载机制**

  * CommonJS 模块是同步加载的，因此通常用于服务器端（如Node.js）环境。
  * ESM 模块是异步加载的，并且可以在浏览器环境中原生支持，适合客户端的使用。

* **支持的环境**

  * CommonJS 主要用于 Node.js 环境，作为服务器端的模块化解决方案。虽然通过工具如Webpack、Babel也可以支持前端，但这不是其原生用途。
  * ESM 是现代JavaScript的标准，逐渐被浏览器和Node.js原生支持。

* **使用场景**

  * CommonJS 适用于大部分Node.js项目，因为它的同步加载机制更加符合服务器端应用的需求。
  * ESM 在前端开发中越来越重要，特别是在现代JavaScript应用中，许多浏览器已经支持直接加载ESM模块。在Node.js中，ESM也在逐步成为主流。

* **动态加载**

  * CommonJS 的 require() 是在代码运行时动态加载模块。
  * ESM 使用 import() 可以实现动态导入，但它是基于静态分析的，意味着ESM模块能在编译时就确定依赖关系。

总结来说，CommonJS 是传统的模块化方案，适合 Node.js，而 ESM 是现代JavaScript标准，适合浏览器和新的Node.js版本。两者有一些交集，但它们的使用方式和环境有所不同。

* **导出内容**

  * ESM 导入的是对导出内容的动态引用，因此导入的值会随导出模块的值变化而变化。

  ```js
  // module.js
  export let count = 1;
  export const increment = () => count++;

  // main.js
  import { count, increment } from './module.js';

  console.log(count); // 输出 1
  increment();
  console.log(count); // 输出 2（因为是引用）
  ```

  * CJS 导入的是导出内容的浅拷贝引用，但对导出的对象本身进行操作（如修改其属性）是共享的。

  ```js
  // module.js
  let count = 1;
  const increment = () => count++;
  module.exports = { count, increment };

  // main.js
  const { count, increment } = require('./module');

  console.log(count); // 输出 1
  increment();
  console.log(count); // 仍然输出 1（因为是拷贝，不会感知变化）

  // 但如果直接引用对象，则是引用：
  const module = require('./module');
  console.log(module.count); // 输出 1
  module.increment();
  console.log(module.count); // 输出 2
  ```

## 常见的 Loader

* **babel-loader**

  * 作用：将 ES6+ 的 JavaScript 代码转换为向后兼容的 JavaScript 版本，支持旧浏览器环境。通常结合 Babel 使用，以支持最新的 JavaScript 语法和特性。
  * 示例：处理 .js 或 .jsx 文件。

* **css-loader**

  * 作用：解析 CSS 文件中的 @import 和 url() 等语句，允许 JavaScript 文件中通过 import 或 require 导入 CSS 文件。
  * 示例：与 style-loader 一起使用来加载 CSS。

* **style-loader**

  * 作用：将 CSS 插入到 DOM 中的 `<style>` 标签内。通常与 css-loader 搭配使用，完成从 CSS 到页面样式的加载。
  * 示例：结合 css-loader，实现页面样式的动态注入。

* **sass-loader**

  * 作用：将 .scss 或 .sass 文件编译为 CSS。通常与 css-loader 和 style-loader 一起使用。
  * 示例：用于支持 Sass 预处理器语法，将 Sass/SCSS 转换为标准 CSS。

* **less-loader**

  * 作用：将 .less 文件编译为 CSS。通常用于加载和处理 Less 预处理器文件。
  * 示例：与 css-loader 和 style-loader 配合使用，将 Less 文件转换为 CSS。

* **file-loader**

  * 作用：处理文件导入，支持将文件（如图片、字体）复制到构建目录，并返回文件的 URL。适用于引入的图片、字体等资源。
  * 示例：在 Webpack 配置中设置来处理 .png, .jpg, .woff 等文件。

* **url-loader**

  * 作用：将小文件（如图像、字体）转换为 base64 URL，以减少请求次数。文件超过设置大小时则转交给 file-loader 处理。
  * 示例：常用来处理小图片和字体文件，避免过多 HTTP 请求。

* **ts-loader**

  * 作用：将 TypeScript 代码转换为 JavaScript。通常用于加载和编译 .ts 和 .tsx 文件。
  * 示例：与 TypeScript 一起使用，使项目支持 TypeScript 语法。

* **html-loader**

  * 作用：处理 HTML 文件中的 img 标签等资源引用，将路径转换为 Webpack 可以识别的路径。
  * 示例：用于处理 HTML 文件中的静态资源引用，实现资源自动加载。

* **vue-loader**

  * 作用：将 .vue 文件解析为 JavaScript 模块，允许 Webpack 处理 Vue 单文件组件。支持样式和模板的分离。
  * 示例：在 Vue 项目中使用，加载和解析 .vue 文件。

> [!TIP]
>
> `css-loader`主要用于解析和加载 CSS 文件内容，不会将样式插入到页面中
> `style-loader`主要用于在浏览器中动态添加 CSS 样式
> 通常情况下，css-loader 和 style-loader 是一起使用的：
>
>```js
> module.exports = {
>  module: {
>    rules: [
>      {
>        test: /\.css$/,
>        use: ['style-loader', 'css-loader']
>      }
>    ]
>  }
> };
>```

## 常见的 Plugin

* **HtmlWebpackPlugin**

  * 作用：生成 HTML 文件，并自动将打包的 JavaScript 和 CSS 资源引入到该文件中，通常用于单页应用。
  * 用途：减少手动维护 HTML 文件的工作量，同时可以设置模板、标题等 HTML 属性。

* **CleanWebpackPlugin**

  * 作用：每次打包时自动清理构建目录（例如 dist 文件夹），确保输出文件夹始终保持最新状态。
  * 用途：避免旧的、未使用的文件留在构建目录中，占用空间。

* **DefinePlugin**

  * 作用：定义全局变量，允许在代码中注入不同环境的变量（如 `process.env.NODE_ENV`）。
  * 用途：支持不同环境的配置，比如开发环境和生产环境的区别。

* **MiniCssExtractPlugin**

  * 作用：将 CSS 从 JavaScript 中分离出来，生成独立的 CSS 文件，从而支持 CSS 文件的缓存。
  * 用途：在生产环境中优化样式加载速度，避免将 CSS 直接嵌入 JavaScript 中。

* **HotModuleReplacementPlugin**

  * 作用：启用热模块替换（HMR），使页面在模块更新时无需刷新即可更新内容。
  * 用途：提升开发体验，实时更新样式或模块内容，减少手动刷新页面的频率。

* **CompressionWebpackPlugin**

  * 作用：将打包生成的文件进行压缩（如 Gzip），减少文件大小，提升加载速度。
  * 用途：优化生产环境的性能，使得资源在网络传输时更加轻量。

* **CopyWebpackPlugin**

  * 作用：将文件或文件夹从源路径复制到构建目录中，通常用于复制静态资源。
  * 用途：适用于不需要经过 Webpack 处理的文件，直接将它们复制到输出目录。

* **ProvidePlugin**

  * 作用：自动加载模块而无需手动 import 或 require，例如可以将 $ 自动定义为 jQuery。
  * 用途：减少重复引入的代码，特别适用于需要全局使用的库（如 jQuery、lodash）。

* **BannerPlugin**

  * 作用：在每个输出文件顶部添加注释信息，比如版权声明、版本号、构建日期等。
  * 用途：在打包文件中显示信息，特别是在发布公共库时有用。

* **BundleAnalyzerPlugin**

  * 作用：生成交互式的依赖关系可视化报告，帮助分析和优化打包文件的大小。
  * 用途：方便查看每个模块的大小以及模块之间的依赖关系，找出需要优化的部分。

其中，Webpack 内置的常用插件有 `DefinePlugin`、`HotModuleReplacementPlugin`、`BannerPlugin`、`ProvidePlugin`等。

## Loader和Plugin的区别

* **Loader**

  * 作用：Loader 主要用于转换文件类型，使 Webpack 能够处理各种非 JavaScript 类型的文件（如 CSS、图片、TypeScript 等），并将它们打包。
  * 使用方式：Loader 在 module.rules 下进行配置，通常以链式处理的方式使用。
  * 工作机制：Loader 逐个应用于匹配的文件，并将内容从一种格式转换为另一种格式。比如，css-loader 读取 CSS 文件内容，而 babel-loader 将 ES6+ 的代码转换为 ES5 语法。

  示例：

  ```js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/, // 匹配 .css 文件
          use: ['style-loader', 'css-loader'] // 按顺序应用 css-loader 和 style-loader
        }
      ]
    }
  };
  ```

* **Plugin**

  * 作用：Plugin 用于扩展 Webpack 的功能，它们能够在 Webpack 编译的各个生命周期中执行复杂的操作，影响整个打包流程。
  * 使用方式：Plugin 直接在 plugins 数组中进行配置，通常直接实例化使用。
  * 工作机制：Plugin 能够在打包过程中的不同钩子（hooks）上进行操作，从而可以影响输出文件、优化打包过程、添加自定义功能等。比如，HtmlWebpackPlugin 可以自动生成 HTML 文件，DefinePlugin 可以定义环境变量。

  示例：

  ```js
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' })
    ]
  };
  ```

## 是否写过Loader？简单描述一下编写loader的思路？

Webpack 最后打包出来的成果是一份 Javascript 代码，实际上在 Webpack 内部默认也只能够处理 JS 模块代码，在打包过程中，会默认把所有遇到的文件都当作 JavaScript 代码进行解析，因此当项目存在非 JS 类型文件时，我们需要先对其进行必要的转换，才能继续执行打包任务，这也是 Loader 机制存在的意义。

Loader的配置使用我们应该已经非常的熟悉：

```js
// webpack.config.js
module.exports = {
  // ...other config
  module: {
    rules: [
      {
        test: /^your-regExp$/,
        use: [
          {
             loader: 'loader-name-A',
          }, 
          {
             loader: 'loader-name-B',
          }
        ]
      },
    ]
  }
}

```

通过配置可以看出，针对每个文件类型，loader 是支持以数组的形式配置多个的，因此当 Webpack 在转换该文件类型的时候，会按顺序链式调用每一个 loader ，前一个 loader 返回的内容会作为下一个 loader 的入参。因此 loader 的开发需要遵循一些规范，比如返回值必须是标准的JS代码字符串，以保证下一个 loader 能够正常工作，同时在开发上需要严格遵循“单一职责”，只关心 loader 的输出以及对应的输出。

loader 函数中的 this 上下文由 webpack 提供，可以通过this对象提供的相关属性，获取当前loader 需要的各种信息数据，事实上，这个this指向了一个叫 loaderContext 的 loader-runner 特有对象。有兴趣的小伙伴可以自行阅读源码。

```js
module.exports = function(source) {
  const content = doSomeThing2JsString(source);
  
  // 如果 loader 配置了 options 对象，那么this.query将指向 options
  const options = this.query;
  
  // 可以用作解析其他模块路径的上下文
  console.log('this.context');
  
  /*
    * this.callback 参数：
    * error：Error | null，当 loader 出错时向外抛出一个 error
    * content：String | Buffer，经过 loader 编译后需要导出的内容
    * sourceMap：为方便调试生成的编译后内容的 source map
    * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
    */
  this.callback(null, content);
  // or return content;
}

```

## 是否写过Plugin？简单描述一下编写plugin的思路？

如果说 Loader 负责文件转换，那么 Plugin 便是负责功能扩展。Loader 和 Plugin 作为 Webpack 的两个重要组成部分，承担着两部分不同的职责。

上文已经说过，webpack 基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件，就可以在特定的阶段执行自己的插件任务，从而实现自己想要的功能。

既然基于发布订阅模式，那么知道 Webpack 到底提供了哪些事件钩子供插件开发者使用是非常重要的，上文提到过 compiler 和 compilation 是 Webpack 两个非常核心的对象，其中 compiler 暴露了和  Webpack 整个生命周期相关的钩子（compiler-hooks），而 compilation 则暴露了与模块和依赖有关的粒度更小的事件钩子（Compilation Hooks）

Webpack的事件机制基于webpack自己实现的一套Tapable事件流方案。

```js
// Tapable的简单使用
const { SyncHook } = require("tapable");

class Car {
  constructor() {
    // 在this.hooks中定义所有的钩子事件
    this.hooks = {
      accelerate: new SyncHook(["newSpeed"]),
      brake: new SyncHook(),
      calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
    };
  }

  /* ... */
}


const myCar = new Car();
// 通过调用tap方法即可增加一个消费者，订阅对应的钩子事件了
myCar.hooks.brake.tap("WarningLampPlugin", () => warningLamp.on());

```

Plugin的开发和开发Loader一样，需要遵循一些开发上的规范和原则：

* 插件必须是一个函数或者是一个包含 apply 方法的对象，这样才能访问compiler实例；
* 传给每个插件的 compiler 和 compilation 对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件;
* 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住;

了解了以上这些内容，想要开发一个 Webpack Plugin，其实也并不困难。

```js
class MyPlugin {
  apply (compiler) {
    // 找到合适的事件钩子，实现自己的插件功能
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation: 当前打包构建流程的上下文
      console.log(compilation);
      
      // do something...
    })
  }
}

```

## webpack的作用

* **模块打包**

  可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。

* **编译兼容**

  在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过webpack的Loader机制，不仅仅可以帮助我们对代码做polyfill，还可以编译转换诸如.less, .vue, .jsx这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。

* **能力扩展**

  通过webpack的Plugin机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

## Webpack构建流程

* **初始化阶段**

  * Webpack 首先通过读取配置文件（如 `webpack.config.js`）来初始化配置信息。这一阶段会解析配置文件中的 `entry、output、loaders` 等设置。
  * 通过 `createCompiler` 方法创建一个 `compiler` 实例，配置文件中所定义的选项（如插件）会被加载到 `compiler` 对象中。

* **编译阶段**

  * Webpack开始从入口文件（`entry`）出发，分析模块依赖关系。这些模块可能是 JavaScript文件、CSS文件、图片或其他资源。
  * 在这个阶段，Webpack会调用各种加载器（`loaders`）来转换模块，例如将 SCSS 转换为 CSS，或将 ES6 转换为 ES5 等​。
  * Webpack会逐步构建模块图，并通过配置的插件和加载器处理每个模块。

* **构建阶段**

  * 当依赖关系被分析完成后，Webpack会开始打包这些模块。它会通过插件如 `HtmlWebpackPlugin` 等，生成最终的输出文件。输出文件包括 JavaScript、CSS、以及其他资源文件。
  * 这一过程中的一些优化（如 `tree-shaking`、压缩代码等）会根据环境的不同（开发模式或生产模式）有所变。

* **输出阶段**

  * 最终，Webpack会根据配置的 output 属性，将所有打包好的资源文件输出到指定的文件夹中（如 dist 目录）。输出的资源会包括模块化的 JavaScript 文件以及其他依赖的资源文件（如图片、字体等）。

在开发模式下，Webpack 会启动一个 `webpack-dev-server`，实现文件变更后的热更新（HMR），让开发者能够实时查看代码修改的效果。在生产模式下，Webpack 则会进行更强的优化，如代码压缩、删除未使用的代码（ `tree-shaking` ）等​。

这些流程通过Webpack的钩子机制（如 `compiler.hooks` ）在不同阶段插入插件和操作，确保在整个构建过程中每个阶段都能按需执行特定任务。

## webpack 构建打包结果

最终 Webpack 打包出来的 bundle 文件是一个 IIFE 的立即执行函数。

```js
// webpack 5 打包的bundle文件内容

(() => { // webpackBootstrap
  var __webpack_modules__ = ({
    'file-A-path': ((modules) => { // ... })
    'index-file-path': ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => { // ... })
  })
  
  // The module cache
  var __webpack_module_cache__ = {};
  
  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = __webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {}
    };

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }
  
  // startup
  // Load entry module and return exports
  // This entry module can't be inlined because the eval devtool is used.
  var __webpack_exports__ = __webpack_require__("./src/index.js");
})

```

和webpack4相比，webpack5打包出来的bundle做了相当的精简。在上面的打包demo中，整个立即执行函数里边只有三个变量和一个函数方法，`__webpack_modules__` 存放了编译后的各个文件模块的JS内容，`__webpack_module_cache__` 用来做模块缓存，`__webpack_require__` 是Webpack内部实现的一套依赖引入函数。最后一句则是代码运行的起点，从入口文件开始，启动整个项目。

其中值得一提的是 `__webpack_require__` 模块引入函数，我们在模块化开发的时候，通常会使用ES Module或者CommonJS规范导出/引入依赖模块，webpack打包编译的时候，会统一替换成自己的`__webpack_require__` 来实现模块的引入和导出，从而实现模块缓存机制，以及抹平不同模块规范之间的一些差异性。

## 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的

webpack-dev-server 是一个提供实时重载和热模块替换（HMR）功能的开发服务器工具。它的核心目的是通过一系列机制提高开发效率和用户体验。它主要由以下三个部分组成：

* Webpack：负责编译代码。

* webpack-dev-middleware：主要负责构建内存文件系统，将 Webpack 的 OutputFileSystem 替换成 InMemoryFileSystem，同时作为 Express 的中间件拦截请求，从内存文件系统中获取结果。

* Express：负责搭建请求路由服务。

**工作流程：**

1. **启动 dev-server**

Webpack 开始构建，在编译期间会向 entry 文件注入热更新代码。

2. **建立通讯渠道**

Client 首次打开后，Server 和 Client 基于 WebSocket 建立通讯渠道。

3. **监听文件变动**

当修改文件时，Server 端监听到文件变化，Webpack 开始重新编译，直到编译完成会触发 "done" 事件。

4. **通知 Client**

Server 通过 WebSocket 发送消息通知 Client。

5. **获取 manifest 描述文件**

Client 根据 Server 的消息（包含 hash 值和 state 状态），通过 AJAX 请求获取 Server 的 manifest 描述文件。

6. **对比并请求新模块**

Client 对比当前的模块树，再次请求 Server 获取新的 JS 模块。

7. **更新模块树**

Client 获取到新的 JS 模块后，会更新模块树并替换掉现有的模块。

8. **调用 module.hot.accept()**

最后调用 `module.hot.accept()` 完成热更新。

## 如何提高 webpack 构建速度

在Webpack中优化构建速度的方法有很多种，以下是一些最有效的策略：

* **利用缓存**

  通过使用 cache 配置，可以缓存处理过的模块和资源，从而避免每次构建时都重新编译相同的内容。Webpack的内建缓存机制可以显著提高构建速度。

* **代码分割**

  使用 splitChunks 插件可以将共享的代码模块提取到单独的文件中，从而减少每次构建时需要处理的内容量。这对于大型项目尤其有效。

* **使用并行构建**

  如使用 Happypack 或 Thread-loader 插件，可以并行处理多个任务，提升构建速度。Happypack 将构建任务分配给多个线程处理，避免了单线程的瓶颈。

* **合理配置 loaders 和 plugins**

  确保只对开发环境或生产环境启用必要的加载器和插件。例如，在开发环境中禁用 UglifyJSPlugin 和 MiniCssExtractPlugin，只保留快速的 source-map。

* **使用更高效的开发服务器**

  webpack-dev-server 提供了增量构建功能，可以在开发中避免全量构建，减少重复处理文件的时间。

* **减少模块依赖**

  审查项目中的依赖库，去除不必要的或冗余的依赖，这有助于减少每次构建时的模块解析和打包时间。

* **启用 tree shaking**

  确保Webpack配置了 sideEffects 选项并使用 ES6 模块语法，这可以去除未使用的代码，减少构建产物的体积。

* **利用 DllPlugin**

  在开发环境中，可以将第三方库和模块（如React或Vue）预编译到单独的动态链接库中，避免每次开发构建时重新编译这些库。

## module、chunk 和 bundle 的区别

在 Webpack 中，module、chunk 和 bundle 是构建过程中的关键概念。它们在 Webpack 的构建和打包过程中各自扮演着不同的角色。以下是它们之间的区别：

* **Module（模块）**

  * 定义：模块是 Webpack 处理的最小单元，通常对应一个文件（例如 JavaScript、CSS、图片等）。Webpack 会将不同类型的资源通过加载器（Loader）转化成模块。
  * 特点：模块是代码的构成部分，Webpack 会通过 import 或 require 引入模块。每个模块都有它自己的依赖关系，Webpack 会根据这些依赖关系来构建最终的输出文件。

* **Chunk（代码块）**

  * 定义：Chunk 是 Webpack 在打包过程中创建的一个或多个模块的组合。它是 Webpack 中通过解析模块间的依赖关系、分析并合并生成的代码块。
  * 特点：Chunk 是打包生成的中间产物，通常对应于最终的代码块。例如，在使用代码分割（splitChunks）时，Webpack 会根据配置将代码分成多个 chunk，这些 chunk 可以按需加载。
  
  示例：当启用代码分割时，可以将 vendor 和 app 分别生成不同的 chunk，例如生成 vendor.js 和 main.js。

* **Bundle（包）**

  * 定义：Bundle 是 Webpack 打包生成的最终文件，包含了一个或多个 chunk。
  * 特点：bundle 是最终输出的文件，通常用于部署到生产环境。它是 Webpack 最终的构建产物。一个项目可能包含多个 bundle，它们分别对应不同的入口文件、chunk 或是分割出的第三方库文件。

  示例：main.js、vendor.js 都是 Webpack 打包后的 bundle。

通俗的说，module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：

我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。

## webpack 中 hash、chunkhash、contenthash 的区别

在Webpack中，hash、chunkhash 和 contenthash 都是用于文件版本控制和缓存破坏的哈希值，但它们的应用场景和生成方式有所不同。

* **hash**

  是基于整个项目构建过程的哈希值。Webpack在打包时会根据所有文件的内容和配置生成一个统一的哈希值。这个哈希值会应用到所有的输出文件（包括JS、CSS等）。如果项目中的任何一个文件发生变化，hash值就会变化，因此所有文件的名字都会改变。hash适用于开发阶段或简单项目，但在长期缓存管理中可能会存在问题，因为即使某些文件内容没有变化，其他文件的修改也会导致所有文件的hash改变​。

  ```js
  module.exports = {
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
  ```

* **chunkhash**

  是根据特定代码块（chunk）内容生成的哈希值。与hash不同，chunkhash只会根据当前代码块的内容变化生成哈希，因此如果一个代码块的内容没有变化，它的哈希值不会变化。这样可以有效地避免不必要的文件更新，尤其是在多文件、依赖较多的应用中，适用于优化缓存策略​。

  ```js
  module.exports = {
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  };

  ```

* **contenthash**

  是基于文件内容生成的哈希值。它只会在文件内容发生变化时才改变，非常适合静态资源（如图片、CSS、JS文件等）。contenthash可以用来控制缓存，即使是单独的文件（如CSS或JS）修改时，它的哈希值才会变化，不会影响其他文件。这使得它在长时间缓存和缓存失效策略上尤为有效​。

**使用场景：**

* **hash**

  适用于简单的应用或开发环境。它对于所有文件的修改都会重新生成哈希值，虽然可以确保缓存失效，但会导致文件名变化过于频繁，影响性能。
  
* **chunkhash**

  适合用于多代码块的大型项目，特别是当项目拆分成多个chunk时，能有效减少不必要的哈希值更改。推荐在生产环境中使用它来优化长时间缓存策略。
  
* **contenthash**

  最适用于静态文件（如图片、CSS、JS等），它可以确保只有文件内容变更时才更新文件名，从而最大化缓存效果，减少客户端重新加载不必要的文件。

```js
module.exports = {
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: true
  }
};

```

综上，选择哪种哈希方式要根据你的项目需求来决定。在大部分场景下，contenthash 是最优的选择，因为它提供了最细粒度的缓存控制。

## Tree shaking 原理

Tree shaking 是一种优化技术，旨在移除 JavaScript 中未使用的代码，减小打包文件的大小。它主要通过分析 ES6 的模块导入和导出，找到哪些代码没有被使用，从而在最终的打包中去除这些代码。

* **原理**

  Tree shaking 依赖于 ES6 模块的静态结构，它通过分析模块间的依赖关系，确认哪些代码在应用中没有被引用。Webpack 和其他打包工具（如 Rollup）都通过静态分析（即编译时）来实现这一功能。Webpack 在构建过程中会检查每个模块的导出内容，并比较应用程序中哪些导入了这些模块。如果某个导出的内容没有被任何其他模块引用，它就会被认为是死代码，并从最终的输出中剔除。

* **使用要求**

  * ES模块语法：Tree shaking 只能在使用 ES6 的 import 和 export 语法时有效。CommonJS 的 require 和 module.exports 无法提供静态分析所需要的信息，因此不能进行 tree shaking。

  * SideEffects：为了确保正确的 tree shaking，Webpack 需要确保只有那些没有副作用的代码会被摇掉。副作用指的是运行代码时产生的影响，比如修改全局变量或在导入时执行某些操作。为了确保 tree shaking 的准确性，Webpack 允许通过配置 sideEffects 属性来告诉它哪些模块含有副作用，哪些模块没有副作用。

* **使用场景**

  * 库和工具：当你使用某些库（例如 Lodash）时，通过按需加载特定功能而非整个库，可以显著减小打包文件的体积。例如，使用 import { debounce } from 'lodash'，Webpack 只会打包 debounce 函数，而不会打包整个 lodash 库。

  * 组件化开发：在构建大型应用时，tree shaking 可以帮助去除未使用的组件或模块，从而提升性能。

## webpack5 和 webpack4 的区别

Webpack 5 相比 Webpack 4 引入了许多重要的改进和变化，以下是一些关键区别：

* **Module Federation**

  Webpack 5 引入了模块联邦（Module Federation）功能，允许不同的 Webpack 构建之间共享代码和模块。这个功能可以让多个独立构建共享一个共享的库，而不需要重复加载相同的代码，优化了多个应用程序之间的模块共享和复用​。

* **默认启用 Terser Plugin**

  在 Webpack 4 中，压缩 JavaScript 需要手动配置 TerserPlugin，而在 Webpack 5 中，默认启用该插件进行代码压缩，简化了配置​。

* **移除 Node.js Polyfills**

  Webpack 5 移除了内置的 Node.js Polyfills（如 crypto 和 path）。这意味着你需要手动引入这些 polyfill 或者使用其他工具来提供这些功能​。

* **性能优化**

  Webpack 5 强化了性能，尤其是在构建速度和打包大小方面。它对缓存策略和并行处理的支持做了优化，使得在构建大型项目时，构建速度得到显著提升​。

* **新的 Tree Shaking 支持**

  Webpack 5 改进了 Tree Shaking，可以更好地移除未使用的代码，特别是在使用 ES Module 时，效果更加显著​。

* **Asset Modules**

  Webpack 5 引入了新的资源模块（Asset Modules），它可以替代 file-loader、url-loader、raw-loader 等模块，简化了资源管理，优化了配置​。

* **更好的缓存管理**

  Webpack 5 改进了哈希值生成和缓存策略，避免了重复打包，减少了缓存失效的情况​。

* **开发模式优化**

  Webpack 5 提供了更灵活和优化的开发模式，使得开发者可以在更高效的环境下进行调试和开发​。

这些变化使得 Webpack 5 在性能、可扩展性、灵活性和配置简化方面，相比 Webpack 4 都有显著的改进。

## sourceMap是什么

sourceMap是一项将编译、打包、压缩后的代码映射回源代码的技术，由于打包压缩后的代码并没有阅读性可言，一旦在开发中报错或者遇到问题，直接在混淆代码中debug问题会带来非常糟糕的体验，sourceMap可以帮助我们快速定位到源代码的位置，提高我们的开发效率。sourceMap其实并不是Webpack特有的功能，而是Webpack支持sourceMap，像JQuery也支持souceMap。

既然是一种源码的映射，那必然就需要有一份映射的文件，来标记混淆代码里对应的源码的位置，通常这份映射文件以.map结尾，里边的数据结构大概长这样:

```json
{
  "version" : 3,                          // Source Map版本
  "file": "out.js",                       // 输出文件（可选）
  "sourceRoot": "",                       // 源文件根目录（可选）
  "sources": ["foo.js", "bar.js"],        // 源文件列表
  "sourcesContent": [null, null],         // 源内容列表（可选，和源文件列表顺序一致）
  "names": ["src", "maps", "are", "fun"], // mappings使用的符号名称列表
  "mappings": "A,AAAB;;ABCDE;"            // 带有编码映射数据的字符串
}

```

其中mappings数据有如下规则：

* 生成文件中的一行的每个组用“;”分隔；
* 每一段用“,”分隔；
* 每个段由1、4或5个可变长度字段组成；

有了这份映射文件，我们只需要在我们的压缩代码的最末端加上这句注释，即可让sourceMap生效：

```js
//# sourceURL=/path/to/file.js.map
```

有了这段注释后，浏览器就会通过sourceURL去获取这份映射文件，通过解释器解析后，实现源码和混淆代码之间的映射。因此sourceMap其实也是一项需要浏览器支持的技术。

如果我们仔细查看webpack打包出来的bundle文件，就可以发现在默认的development开发模式下，每个`__webpack_modules__` 文件模块的代码最末端，都会加上`//# sourceURL=webpack://file-path?`，从而实现对sourceMap的支持。

## babel 原理

Babel 是一个广泛使用的 JavaScript 编译器，主要用于将现代 JavaScript 代码（例如 ES6 及更高版本）转换为兼容的 JavaScript 代码，以便在旧版浏览器和环境中运行。它的原理可以分为几个主要阶段：

1. **词法分析（Lexical Analysis）**

Babel 会首先读取源代码，将其转换成一个个标记（Token）。这意味着它会识别出代码中的关键字、标识符、数字、运算符等基本元素，并将这些元素转化为抽象语法树（`AST, Abstract Syntax Tree`）。

* AST 是代码的结构化表示，树的每个节点代表代码的一个语法成分，例如变量声明、函数调用等。

例如，const x = 2 会被解析成一个包含变量声明的 AST。

2. **转换（Transformation）**

在 AST 构建完成后，Babel 会进行代码转换。通过一系列的插件（如 `@babel/preset-env`），Babel 会将高版本的语法转换为低版本的 JavaScript 语法。

* 转换插件：Babel 提供了大量的插件来转换不同版本的 JavaScript 语法，例如把箭头函数转换成普通函数表达式，把类转换成 ES5 的构造函数和原型方法等。

例如，箭头函数 () => {} 会被转换为传统的函数表达式 function() {}。

3. **生成代码（Code Generation）**

转换后的 AST 会被传递到生成阶段，在这一阶段，Babel 会把 AST 再次转换成普通的 JavaScript 代码。这个过程是将修改后的语法树输出为一个能够被浏览器或 Node.js 执行的 JavaScript 文件。

* 在这个阶段，Babel 会将所有的转换结果重新格式化成标准的 JavaScript 代码，同时处理一些诸如变量名混淆、代码压缩等优化。

4. **插件系统**

Babel 通过插件系统实现了代码转换的高度可定制性。开发者可以通过安装不同的 Babel 插件来处理特定的语法或功能，如 JSX 转换、TypeScript 转换等。插件可以分为两类：

* 语法插件：用于转换特定的语法（如箭头函数、类等）。
* 功能插件：用于增强 JavaScript 代码的功能（如 Polyfill 插件，可以添加一些 JavaScript 特性到低版本环境中）。

5. **Polyfill**

对于新版本 JavaScript 中的一些内建 API（如 Promise 或 Map），Babel 还可以通过 @babel/polyfill 或其他 polyfill 工具库来提供对旧版浏览器的支持。它会自动检查目标环境支持的特性，并填充那些不支持的部分。

通过上述步骤，Babel 使得开发者能够编写现代 JavaScript 代码并确保它可以在各种不同的浏览器和环境中运行，特别是在那些不支持最新 JavaScript 特性的旧版本环境中。

## vite 为什么比 webpack 快

* **开发模式的差异**

  在开发环境中，Webpack 是先打包再启动开发服务器，而 Vite 则是直接启动，然后再按需编译依赖文件。（大家可以启动项目后检查源码 Sources 那里看到）。

  这意味着，当使用 Webpack 时，所有的模块都需要在开发前进行打包，这会增加启动时间和构建时间。

  而 Vite 则采用了不同的策略，它会在请求模块时再进行实时编译，这种按需动态编译的模式极大地缩短了编译时间，特别是在大型项目中，文件数量众多，Vite 的优势更为明显。

* **对ES Modules的支持**

  现代浏览器本身就支持 ES Modules，会主动发起请求去获取所需文件。Vite充分利用了这一点，将开发环境下的模块文件直接作为浏览器要执行的文件，而不是像 Webpack 那样先打包，再交给浏览器执行。这种方式减少了中间环节，提高了效率。

* **底层语言差异**

  Webpack 是基于 Node.js 构建的，而 Vite 则是基于 esbuild 进行预构建依赖。esbuild 是采用 Go 语言编写的，Go 语言是纳秒级别的，而 Node.js 是毫秒级别的。因此，Vite 在打包速度上相比Webpack 有 10-100 倍的提升。

  > [!TIP]
  >
  > 什么是预构建依赖？
  >
  > 预构建依赖通常指的是在项目启动或构建之前，对项目中所需的依赖项进行预先的处理或构建。这样做的好处在于，当项目实际运行时，可以直接使用这些已经预构建好的依赖，而无需再进行实时的编译或构建，从而提高了应用程序的运行速度和效率。

* **热更新的处理**

  在 Webpack 中，当一个模块或其依赖的模块内容改变时，需要重新编译这些模块。

  而在 Vite 中，当某个模块内容改变时，只需要让浏览器重新请求该模块即可，这大大减少了热更新的时间。

## Vite 本地开发和生产环境打包的区别

| 环境 | 打包工具 | 主要优点 | 使用场景 |
| --- | --- | --- | --- |
| 本地开发 | `esbuild` | 快速构建和模块热更新 | 开发阶段快速调试 |
| 生产环境 | `Rollup` | 深度优化和兼容性处理 | 生成最终代码 |

* 本地和生产环境代码逻辑是相同的，差异仅体现在打包策略和优化程度。
* 通过正确配置和调试工具，可以确保代码在开发和生产环境中的一致性和可维护性。
