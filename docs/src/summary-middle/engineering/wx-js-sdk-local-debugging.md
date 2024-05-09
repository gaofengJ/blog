---
title: 企微JS-SDK调试、验证
description: 工程化
---

## 背景

在进行企微第三方应用开发的过程中，经常会碰到一些需要与企微进行交互的功能，比如唤起聊天，分享页面等。由于企微官方的限制，这些功能在非生产环境难以调试、验证。

举个例子：

要实现一个点击头像唤起聊天窗口的功能，针对不同的宿主环境，有两种不同的方案：

### 浏览器内

企微官方提供了一种[基于Schema协议的跳转方案](https://developer.work.weixin.qq.com/document/path/94346)，在外部浏览器的Web页面中，可以通过该 Schema 协议打开个人聊天窗口。

这种方案的实现主要是后端凭借企微应用的ACCESS_TOKEN向企微后台发送请求，生成一个 launch_code，再拼接成 URL 返回给前端，前端跳转这个 URL 即可。

由于跳转链接是由后端生成的，后端可以在非生产环境直接使用生产环境的企微应用信息来获取 launch_code，所以这种方案可以直接在非生产环境进行调试。

### 企微内

在企微内唤起聊天窗口则需要调用JS-SDK中的[openEnterpriseChat](https://developer.work.weixin.qq.com/document/path/93231)方法。

调用 openEnterpriseChat 前需调用[wx.agentConfig](https://developer.work.weixin.qq.com/document/path/94313)方法注入应用权限，wx.agentConfig 中需要的 signature 依赖后端向企微后台来获取，后端仍然可以通过在非生产环境使用生产环境企微应用信息来获取。

**重点**来了，由于[JS-SDK对可信域名的限制](https://developer.work.weixin.qq.com/document/path/90514)，JS-SDK 中 API 的调用必须在可信域名下才可以调用，这对我们的非生产环境调试造成了很大不便，所以需要思考如何在非生产环境进行调试，验证。

## 目标

提供一整套调试方案，同时支持本地环境和测试环境，为企业微信sdk功能验证提供有效的前置支持，为上线保驾护航。

## 方案

将生产域名域名映射到非生产环境进行访问，在生产域名下测试非生产环境代码。

### 前置条件

后端生产代码已经包含wx.config（注入企业权限），wx.agentConfig（注入应用权限）的两个接口

<p style="font-weight: bold; color: #FF0000;">由于代理，此时还是走的线上接口，涉及数据的操作要谨慎！！！</p>

<p style="font-weight: bold; color: #FF0000;">由于代理，此时还是走的线上接口，涉及数据的操作要谨慎！！！</p>

<p style="font-weight: bold; color: #FF0000;">由于代理，此时还是走的线上接口，涉及数据的操作要谨慎！！！</p>

本文的代理操作是借助 Charles 来完成的，没有用过 Charles 的同学可以先学习一下它的简单使用。

### 本地调试

#### 一、在Charles中添加域名映射

![添加映射入口](/imgs/summary-middle/engineering/sdk_debugger_1.png)

![映射详情](/imgs/summary-middle/engineering/sdk_debugger_2.png)

#### tips

<p style="font-weight: bold; color: #FF0000;">使用Charles前必须关闭其他代理工具</p>

#### 二、修改本地api代理

```js
devServer: {
  historyApiFallback: true,
  allowedHosts: 'all',
  proxy: {
    '/api': { target: 'http://demo.mufeng.com/' },
  },
},
```

##### tips

<p style="font-weight: bold; color: #FF0000;">需要把本地api代理修改至prod或pre（如果代理到pre的话请确保后端企业微信配置pre与prod相同），因为需要访问生产域名接口，并使用后端配置的企业应用信息来获取注入权限的签名。</p>

#### 三、在企微中打开应用，并打开控制台，修改窗口地址指向，然后刷新页面

例如，在企微控制台中输入`location.href = "http://demo.mufeng.com"`。

完成上述步骤，现在就可以在生产域名下调试前端本地代码了！

### uat验证（方便测试同学介入）

#### 一、在Charles中添加域名映射

同上，将`demo.mufeng.com`映射到`uat-demo.mufeng.com`。

#### 二、在企微中打开应用，并打开控制台，修改窗口地址指向，然后刷新页面

完成上述步骤，现在就可以在生产域名下调试前端本地代码了！

## Q&A

**Q**: 为什么代理到uat代码，却访问线上接口?  
**A**: 原因有两个

* 域名cookie是线上的，uat接口无法通过鉴权
* 后端接口uat与线上配置不同，uat无法获取正确的签名

**Q**: 已经按上述配置进行了，为什么JS-SDK中API还是有问题？  
**A**: 本文只是针对本地调试的一个解决方案，API调用有问题可能是其他原因导致的，例如：

* 企业权限签名（wx.config使用）或者应用权限签名（wx.agentConfig使用）有问题。这两个签名一般是通过后端获取的，所以需要看一下后端配置的企业信息和应用信息是否正确  
* API的调用有无前置条件，比如createDoc（创建文档）需要应用具有文档使用权限等

**Q**: 为什么要手动在企业微信中更改页面路径？  
**A**: 在进行本地调试时，无法在通过https加载的页面中启动不安全的WebSocket连接，所以需要通过http协议打开

**Q**: 如果后端生产环境代码没有wx.config（注入企业权限），wx.agentConfig（注入应用权限）的接口怎么办？  
**A**: 如果由于种种原因，后端无法将上述两个接口发布生产环境，可以在uat或者pre环境中进行相关功能的调试，前提条件是后端uat环境或者pre环境的企业应用配置（agentId、secret等）与prod相同
