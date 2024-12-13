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

* **资源层面**

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

## 前端如何实现截图

* **使用 `canvas` 搭配 `html2canvas`**

```js
import html2canvas from 'html2canvas';

const captureScreenshot = () => {
  const target = document.getElementById('screenshot-area');
  html2canvas(target).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'screenshot.png';
    link.click();
  });
};
```

* **使用浏览器原生 API**

  * 某些现代浏览器提供了内置的截图功能，比如 Chrome 的 Capture Visible Tab。
  * 此方法主要用于扩展开发。

```js
chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'screenshot.png';
  link.click();
});

```

* **后端生成截图**

前端将 URL 或 HTML 发给后端，由后端使用工具（如 Puppeteer 或 Selenium）生成截图并返回给前端。

```js
const puppeteer = require('puppeteer');

async function captureScreenshot(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
}

captureScreenshot('https://example.com');
```

## 什么是 QPS？

`QPS（Queries Per Second）`是每秒查询次数的缩写，是衡量服务器处理请求能力的重要指标之一。它表示服务器在一秒钟内能够处理的请求数量，常用于评估系统的吞吐量和性能。

例如：

* 如果一个 API 的 QPS 是 100，表示这个接口每秒能处理 100 次请求。

**达到峰值时的处理策略**

当系统的 QPS 达到或超过峰值时，会出现请求延迟增加、系统性能下降，甚至服务不可用的情况。以下是常见的处理策略：

* **垂直扩展（纵向扩展）**

  增加单台服务器的性能

* **水平扩展（横向扩展）**

  增加服务器数量，将请求分发到多台服务器进行处理

* **缓存机制**

  利用缓存减少对后台服务的直接请求压力

* **限流与降级**

  **限流**：限制单位时间内允许的最大请求数量。
  
  **降级**：在系统压力过大时关闭非核心功能。

## 使用同一个链接，如何实现 PC 打开的是 web 应用，手机打开的是 H5 应用

通过 **User-Agent** 判断：

```js
// 后端
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const userAgent = req.headers['user-agent'];
  if (/mobile/i.test(userAgent)) {
      res.redirect('/mobile'); // 重定向到 H5 应用
  } else {
      res.redirect('/desktop'); // 重定向到 Web 应用
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));

// 前端
const isMobile = /mobile/i.test(navigator.userAgent);

if (isMobile) {
    window.location.href = '/mobile'; // 跳转到 H5 应用
} else {
    window.location.href = '/desktop'; // 跳转到 Web 应用
}

```

## 如何解决页面请求接口大规模并发问题

* 前端限流和节流

  * 限流策略
  * 批量请求合并

* 异步队列处理

## 静态资源加载失败如何做降级

* 兜底占位

* 合理超时与重试机制

* CDN 资源切换

## 移动端如何实现上拉加载、下拉刷新

* 下拉刷新

```js
window.addEventListener('scroll', function() {
  if (document.documentElement.scrollTop === 0) {
    // 触发下拉刷新
    refreshData();
  }
});

```

* 上拉加载更多

```js
let page = 1; // 当前加载的页码
const loadMoreThreshold = 200; // 滚动到距离底部多少像素时触发加载
const listContainer = document.querySelector('.list-container');

listContainer.addEventListener('scroll', () => {
  if (listContainer.scrollHeight - listContainer.scrollTop <= loadMoreThreshold) {
    page++;
    loadMoreData(page);
  }
});

```

## 如何判断 dom 是否在可视区域

* 使用 `getBoundingClientRect` 方法

```js
const element = document.querySelector('.my-element');
const rect = element.getBoundingClientRect();

if (
  rect.top >= 0 &&
  rect.left >= 0 &&
  rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  rect.right <= (window.innerWidth || document.documentElement.clientWidth)
) {
  // 元素在可视区域内
} else {
  // 元素不在可视区域内
}

```

* 使用 `IntersectionObserver` API

```js
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('元素在可视区域内');
    } else {
      console.log('元素不在可视区域内');
    }
  });
});

const element = document.querySelector('.my-element');
observer.observe(element);

```

## 前端水印如何实现

* `HTML + CSS` 实现水印

可以利用 `CSS` 的 `::before` 或 `::after` 伪元素为网页添加水印。

* 使用 `JavaScript` 动态添加水印

* `Canvas` 绘制水印

## 扫码登录实现方式

扫码登录是一种快捷的认证方式，通过扫描二维码，用户可以快速登录网站或应用，而不需要输入密码。

实现步骤：

* **生成二维码**：服务器生成一个二维码，包含用户登录所需的信息，比如会话标识、时间戳等。
* **扫描二维码**：用户通过手机扫描二维码，二维码通常指向一个特定的登录链接。
* **服务器验证**：扫描后，服务器验证用户的会话状态、临时凭证等。
* **返回认证结果**：如果验证通过，服务器会返回一个登录成功的响应，并设置会话或令牌。
* **用户自动登录**：根据会话或令牌，用户会自动登录成功。

原理：

* 生成二维码：服务端生成包含用户会话标识、临时凭证或登录信息的二维码，并将其展示给用户。

* 用户扫描二维码：用户通过扫描二维码获取到一个登录的临时凭证
