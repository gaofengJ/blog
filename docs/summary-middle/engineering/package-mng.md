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

```shell
# 让 shell 运行在 Rosetta2 下
arch -x86_64 zsh
```

执行上述命令后，就可以顺利安装低版本 Node 了。

![node低版本](/imgs/summary-middle/engineering/package_mng_node_version.png)

新建一个目录，执行 `npm init -y`，快速创建 package.json。

然后执行 `npm install express`，那么 express 包和它相关的依赖都会被下载下来：

![node_modules嵌套一](/imgs/summary-middle/engineering/package_mng_nest1.png)

展开 express，也有自己的 node_modules：

![node_modules嵌套二](/imgs/summary-middle/engineering/package_mng_nest2.png)

再往下展开，每个依赖都有自己的 node_modules：

![node_modules嵌套三](/imgs/summary-middle/engineering/package_mng_nest3.png)

也就是说 npm2 的 node_modules 是嵌套的。

但是这样的嵌套是有问题的，多个包之间难免会有公共的依赖，这样的嵌套方式，同样的依赖会被复制很多次，占据比较大的磁盘空间。

还有一个致命问题：windows 的文件路径最长是 260 个字符，这样嵌套很有可能超过 windows 路径的长度限制。

当时 npm 还没解决，社区就出了新的解决方案：yarn

## yarn
