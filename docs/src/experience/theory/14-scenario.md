---
title: 场景题
description: 场景题
---

# 场景面试题

## 如何设计一个虚拟列表

虚拟列表（Virtual List）是一种通过只渲染用户可见部分的列表来优化性能的技术，适用于渲染大量数据时。其核心思想是“虚拟化”列表中的项目，仅渲染用户视野内的项目，而不渲染所有项目，从而大大减少 DOM 元素的数量，提升渲染效率。

```html
<template>
  <div class="list-container" ref="container" @scroll="onScroll">
    <div class="list" :style="{ height: totalHeight + 'px' }">
      <div
        v-for="(item, index) in visibleItems"
        :key="index"
        class="list-item"
        :style="{ top: item.top + 'px' }"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const items = ref(Array.from({ length: 1000 }, (_, i) => ({
  text: `Item ${i + 1}`,
  top: i * 30, // 每个项目的高度为 30px
})));

const visibleItems = ref([]);
const containerHeight = 400; // 容器的高度
const itemHeight = 30; // 每个项目的高度
const totalHeight = ref(0); // 列表的总高度

const updateVisibleItems = () => {
  const container = $refs.container;
  const startIndex = Math.floor(container.scrollTop / itemHeight);
  const endIndex = Math.min(
    items.value.length - 1,
    Math.floor((container.scrollTop + containerHeight) / itemHeight)
  );

  visibleItems.value = items.value.slice(startIndex, endIndex + 1);
};

const onScroll = () => {
  updateVisibleItems();
};

onMounted(() => {
  totalHeight.value = items.value.length * itemHeight;
  updateVisibleItems();
});
</script>

<style scoped>
.list-container {
  overflow-y: auto;
  height: 400px; /* 设置容器的高度 */
}
.list {
  position: relative;
}
.list-item {
  position: absolute;
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ddd;
}
</style>

```

## 埋点是如何拦截和上报的

利用 navigator.sendBeacon 发送小型异步请求，将数据发送到服务器

## 使用hash路由时，怎么能再刷新后时候自动滚动到页面上次的锚点位置

通过上述方法，你可以确保在使用 Hash 路由时，即使在页面刷新后，浏览器也能够自动滚动到上次的锚点位置，提升用户体验。方法包括使用 hashchange 事件监听，Vue Router 的 scrollBehavior，以及手动控制滚动行为

## 如何设计一个单点登录(SSO)方案

1. 认证中心（`Identity Provider, IdP`）

认证中心是整个 SSO 系统的核心，负责验证用户的身份并提供访问权限。常见的认证协议有 `OAuth 2.0`、`OpenID Connect`（基于 OAuth 2.0）、`SAML` 等。

* `OAuth 2.0` 是一种广泛使用的授权框架，允许第三方应用程序在不暴露用户凭据的情况下，获得访问资源的权限。
* `OpenID Connect` 是构建在 `OAuth 2.0` 上的身份验证协议，允许单点登录。
* SAML 是基于 XML 的身份验证协议，广泛应用于企业环境中。

2. 客户端应用

客户端应用（`Service Provider, SP`）是用户需要访问的具体应用或服务。客户端应用不直接处理身份验证，而是将用户请求重定向到认证中心，获取用户身份信息。

流程：

* 用户访问客户端应用时，应用检测到用户未登录。
* 客户端应用将用户请求重定向到认证中心（IdP）。
* 用户在认证中心登录（通常通过输入用户名和密码，或使用其他认证方式如多因素认证）。
* 认证中心验证用户身份，生成一个 Token（如 JWT 或 SAML token）并将其传回客户端应用。
* 客户端应用使用 Token 进行身份验证，并允许用户访问其资源。

3. 单点登录协议与Token

JWT（`JSON Web Token`） 是一种常见的身份验证和授权的 Token 格式。它由三个部分组成：头部、有效载荷（包含用户身份信息）、签名。JWT 是无状态的，适用于 Web 和移动应用中，特别适合与 OAuth 2.0 和 OpenID Connect 协议结合使用。

* Token 存储与传递：通常，Token 存储在浏览器的 localStorage、sessionStorage 或  cookie 中。通过请求头（如 `Authorization: Bearer <token>`）传递到服务器。

## 前端性能优化

* **网络层面**

  网络层面的性能优化，无疑是如何让资源体积更小加载更快。

  * 构建策略（基于构建工具）
  * 图像策略（base64、压缩图片、iconfont）
  * 静态资源使用 CDN
  * 缓存策略（使用 preloader 预请求资源）

* **渲染层面**

  * css 策略（降低 css 选择器的复杂度、使用 flexbox）
  * DOM 策略（避免过多dom操作、减少重绘重排、使用事件委托、骨架屏）
  * 阻塞策略

## 前端发展方向设想

* 前端技术边界的不断扩展

* 前端工程化的统一

* 性能优化和用户体验的不断提升

* AI+，开发辅助，智能交互，低代码
