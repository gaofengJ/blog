---
title: docker + github-actions 多项目部署
description: 工程化
---

# docker + GitHub Actions 多项目部署

## 前言

之前的项目通过 **GitHub Actions** 直接部署到 **Ubuntu** 服务器上，然后通过 **nginx** 做映射，把多个项目部署在不同的 **base URL** 下。

最近把一些项目做了重构，顺便把之前 **CI/CD** 的模式做个更改，采用 **docker + GitHub Actions** 的方式把多个项目部署在服务器上，并用 **nginx** 映射到不同的**二级域名**上。

**GitHub Actions** 是一种持续集成和持续交付 (CI/CD) 平台，可用于自动执行生成、测试和部署管道。可以参考阮一峰老师的文章[GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

下面 CI/CD 流程说明以 blog 项目为例。

## 一、添加 CI 流程

**CI** 全称是 **Continuous Integration**，直译为可持续集成，而普遍对其的解释是频繁地（一天多次）将代码集成到主干。其中：

* **主干**：指包含多个已上线和即将上线的特性的分支
* **集成**：指把包含新特性的分支合并（`merge`）到 **主干** 上的行为

其目的是：

> **持续集成的目的，就是让产品可以快速迭代，同时还能保持高质量。它的核心措施是，代码集成到主干之前，必须通过自动化测试。只要有一个测试用例失败，就不能集成。**

**github flow** 模型中保证高质量的核心措施是：在集成前通过 `pull request`，从而触发审核（审核可以是一系列的自动化校验测试以及代码审核**Code Review**），在审核通过后再合并到主干，从而保证主干的稳定性。

由于这里是发布个人项目，基本不存在 CI 的场景，所以这一步直接略过。

## 二、添加 CD 流程

`CD` 指的是 持续交付（**Continuous delivery**）或者持续部署（**continuous deployment**）或者是两者的并集。

在项目中实现 `CD`：
