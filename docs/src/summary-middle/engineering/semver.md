---
title: Semver（语义化版本号）
description: 工程化
---

# Semver（语义化版本号）

参考[Semver(语义化版本号)扫盲](https://juejin.cn/post/6844903591690534926?searchId=20240507144056C1CF30B53196AF7EDDB4)

## 前言

本篇内容讲述的是 Semver（语义化版本号）的相关知识。

下面是 npm 官网上 **Vue** 项目最近的版本发布日志：

![semver_1](/imgs/summary-middle/engineering/semver_1.png)

从图中可以得到以下几个结论：

* 软件的版本号通常由三位组成：形如 **X.Y.Z
* 版本号是严格递增的
* 在发布重要版本时，可以发布 **alpha**、**rc** 等先行版本
* **alpha** 和 **rc** 等修饰版本的关键字后面可以带上次数和 meta 信息

这就是一个标准的 **Semver** 标准的实现。

**Semver** 全称 **Semantic Versioning**， 是 Github 起草的一种版本号管理的标准化方法，用于定义软件版本号的格式和规则，以便清晰地传达版本的变更信息。

## 版本规则

版本号采用 **MAJOR.MINOR.PATCH** 的格式，其中：

* MAJOR（主版本号）：当你做了不兼容的 API 修改时递增。
* MINOR（次版本号）：当你做了向下兼容的功能性新增时递增。
* PATCH（修订号）：当你做了向下兼容的问题修正时递增。

## 先行版本

当要发布**大版本**或者**核心的Feature** 时，但是又不能保证这个版本的功能 100% 正常。这个时候就需要通过发布**先行版本**。比较常见的先行版本包括：内测版、灰度版本了和RC版本。Semver规范中使用alpha、beta、rc(以前叫做gama)来修饰即将要发布的版本。

* alpha: 内部版本
* beta: 公测版本
* rc: 即Release candiate，正式版本的候选版本
