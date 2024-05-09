---
title: 包管理器对比
description: 工程化
---

参考资料：

[pnpm 是凭什么对 npm 和 yarn 降维打击的](https://juejin.cn/post/7127295203177676837?searchId=2024041511322371710C19C3A2AC7C68A4)

[字节的一个小问题 npm 和 yarn不一样吗](https://juejin.cn/post/7060844948316225572?searchId=2024041511322371710C19C3A2AC7C68A4)

## npm2（早期的npm版本）

用 node 版本管理工具把 node 降到 4，npm 版本就是 2.x了。

如果使用的是 M1/M2，安装可能出现问题：低版本的 Node 并不是基于 arm64 架构的，所以不适配 M1/M2 芯片，所以会出现报错：`curl: (22) The requested URL returned error: 404`。

解决方案：

```sh
# 让 shell 运行在 Rosetta2 下
arch -x86_64 zsh
```

执行上述命令后，就可以顺利安装低版本 Node 了。

![node低版本](/imgs/summary-middle/engineering/package_mng_node_version.png)

### npm install

`npm install`执行后：

首先会检查和获取 `npm`，优先级为：`项目级的 .npmrc 文件 > 用户级的 .npmrc 文件 > 全局的 .npmrc 文件 > npm 内置的 .npmrc 文件`。

然后检查项目中是否有 `package-lock.json` 文件

* 如果有，检查 `package-lock.json` 和 `package.json` 声明的依赖是否一致：

  * 一致，直接使用 `package-lock.json` 中的信息，从网络或缓存中加载依赖；
  * 不一致，根据不同版本进行处理

* 如果没有，根据 `package.json` 递归构建依赖树，然后根据构建好的依赖去下载完整的依赖资源，下载时会检查有没有相关的资源缓存：

  * 有，直接解压到 `node_modules` 文件中
  * 没有，从 npm 远程仓库中下载包，校验包的完整性，同时添加到缓存中，解压到 `node_modules` 中。

新建一个目录，执行 `npm init -y`，快速创建 package.json。

然后执行 `npm install express`，那么 express 包和它相关的依赖都会被下载下来：

![npm1](/imgs/summary-middle/engineering/package_mng_npm1.png)

展开 express，也有自己的 node_modules：

![npm2](/imgs/summary-middle/engineering/package_mng_npm2.png)

再往下展开，每个依赖都有自己的 node_modules：

![npm3](/imgs/summary-middle/engineering/package_mng_npm3.png)

也就是说 npm2 的 node_modules 是嵌套的。

但是这样的嵌套是有问题的，多个包之间难免会有公共的依赖，这样的嵌套方式，同样的依赖会被复制很多次，占据比较大的磁盘空间。

还有一个致命问题：windows 的文件路径最长是 260 个字符，这样嵌套很有可能超过 windows 路径的长度限制。

当时 npm 还没解决，社区就出了新的解决方案：yarn。

## cnpm

提一嘴 cnpm。

cnpm 是阿里巴巴推出的包管理工具，安装之后默认会使用 registry.npmmirror.com 这个镜像源。

它的安装命令和 npm 非常一致，通过 cnpm install 命令来安装（比如 cnpm install vue-router）。

在使用它之前，需要通过 npm 命令进行全局安装。

cnpm 不生成 版本锁定 lock 文件，也不会识别项目下的 lock 文件，所以还是推荐使用 npm 或者其他包管理工具，通过绑定镜像源的方式来管理项目的包。

```sh
npm install -g cnpm

# 或者
npm install -g cnpm --registry=https://registry.npmmirror.com
```

## yarn

yarn 将所有依赖铺平，这样就避免了依赖重复以及路径嵌套过长的问题。

![yarn1](/imgs/summary-middle/engineering/package_mng_yarn1.png)

将 node_modules 展开后，可以发现所以依赖平铺在了一层，大部分的包展开后是没有第二层 node_modules 的，少部分包还有，比如：

![yarn2](/imgs/summary-middle/engineering/package_mng_yarn2.png)

这是因为一个包可能是有多个版本的，只能提升一个，后续再遇到相同包的不同版本，依然还是用嵌套的方式。

npm 升级到 3 之后，也采取了平铺的方式。

![npm4](/imgs/summary-middle/engineering/package_mng_npm4.png)

多说一点，yarn 实现了 yarn.lock 来锁定依赖版本的功能，后续 npm 使用 package-lock.json 实现了类似功能。

但是，扁平化的方案也存在相应的问题：**幽灵依赖**。就是没有声明在 dependancies 中的依赖，因为被提升在了第一层，在代码里可以 require 进来。

由于没有了显式依赖，如果有一天别的包不依赖被提升到第一层的自身依赖，这个被提升的自身依赖就会被移除，导致业务代码 require 的地方报错。

还有一个问题就是依赖包有多个版本的时候，只会提升一个，其余版本的包还是会被复制很多次。pnpm 的出现很好的解决了这两个问题。

## pnpm

这里先介绍一下 link ，也就是软硬链接，这是操作系统提供的机制。硬链接就是同一个文件的不同引用，而软链接是新建一个文件，文件内容指向另一个路径。

pnpm 通过在 全局仓库保存一份 npm 包的内容，然后把用到的包link到项目中去。

用 pnpm 来安装一遍项目。

![pnpm1](/imgs/summary-middle/engineering/package_mng_pnpm1.png)

包是从全局 store 硬链接到虚拟 store 的，这里的全局 store 位置在 `～/Library/pnpm/store`，虚拟 store 指的就是 node_modules/.pnpm。

项目依赖了 express，那 node_modules 下就只有 express，没有幽灵依赖。

展开 .pnpm：

![pnpm2](/imgs/summary-middle/engineering/package_mng_pnpm2.png)

所有的依赖都在这里铺平了，都是从全局 store 硬链接过来的，然后包与包之间的依赖关系是通过软链接组织的。

也就是说，所有的依赖都是从全局 store 硬链接到了 node_modules/.pnpm下，然后相互之间通过软链接来相互依赖。

这也说明了 pnpm 为什么快，因为通过链接的方式而不是复制的方式。
