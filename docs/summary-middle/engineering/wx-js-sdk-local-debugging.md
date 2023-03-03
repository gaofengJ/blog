---
title: 企微JS-SDK本地调试
description: 工程化
---

## 背景

最近在项目中遇到一个“拉群”需求，在企微应用中创建群聊。对于这个需求，有两种解决方案：  

* **请求后端接口**

前端直接调用后端接口，后端接口直接调用[企业微信-服务端API](https://developer.work.weixin.qq.com/document/path/91201)，创建群聊。此方案无需依赖企微环境，便于调试。缺点是生成群聊后无法直接拉起。

* **调用JS-SDK**

前端直接调用[JS-SDK](https://developer.work.weixin.qq.com/document/path/90546)中的方法，创建群聊。此方案可以创建并拉起群聊，缺点是由于调用JS-SDK，依赖企微环境，所以在本地调试起来比较麻烦。

由于产品想要的效果是创建并拉起群聊，所以使用“调用JS-SDK”的方案，由此对本地调试企微JS-SDK进行了尝试。

下文中域名以service.mufeng.co做示例。

## 难点

* 由于需要拉起群聊，所以必须在企微环境中进行调试

* 由于JS-SDK对于[可信域名的限制](https://developer.work.weixin.qq.com/document/path/90514)，所有API的调用必须在可信域名下才可调用。目前生产域名（如service.mufeng.co）已经过备案，其他不清楚，所以最好在生产域名下进行调试

## 方案

* 将生产域名（service.mufeng.co）代理到本地（127.0.0.1），通过在企微中打开应用的方式来调试本地项目。

## 实践

### 一、创建一个用于调试的企微应用

生产应用神圣不可侵犯，务必新建一个企微应用用于调试！！！

#### 注意事项

请修改测试应用的可见范围，避免引发生产问题

### 二、企微应用配置

为第一步创建的企微应用配置主页及可信域名

![设置可信域名](http://mufengtongxue.com/assets/images/blog_middle_engineering_set_domain.png)

#### 注意事项

* 应用主页配置为生产域名（`http://service.mufeng.co`）

* 可信域名配置为`service.mufeng.co`

### 三、本地代理

通过修改hosts把生产域名代理到本地。这里推荐使用[SwitchHosts](https://github.com/oldj/SwitchHosts/releases)进行代理配置。

```yaml
127.0.0.1     service.mufeng.co
```

现在我们访问service.mufeng.co的时候就会代理到本地项目了。

### 四、修改devServer中代理配置

因为调试是在企微应用中进行的，正式环境和uat环境的身份认证会冲突，所以可以vue.config.ts中的proxy指向pre或prod。

```javascript
devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
    proxy: {
      '/api': { target: 'http://uat-service.mufeng.co/' },
    },
  },
```

改为:

```javascript
devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
    proxy: {
      '/api': { target: 'https://pre-service.mufeng.co/' },
    },
  },
```

#### 注意事项

将target指向pre或prod时要注意网络协议必须为https。

### 端口代理

做完上面的操作，我们发现service.mufeng.co还是无法正常访问，这是因为host只是用来进行域名解析的，不支持端口映射，所以我们还需要进行端口映射。这里采用的是通过Nginx代理的方式。

```conf
server {
  listen       80;
  server_name  service.mufeng.co;

  location / {
      
    proxy_pass http://127.0.0.1:8081;
    proxy_set_header Host $proxy_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

域名代理和端口代理也可以通过 Charles 来实现，时间原因就没有尝试了。

## Q&A

* 企微应用配置应用主页时加端口号为什么不行？（例如：`http://service.mufeng.co:8081`）

  可信域名的备案包含端口号，如果应用主页指定了端口号的话在调用 wx.config 或者 wx.agentConfig 时会报错

* 已经按上述配置进行了，为什么JS-SDK中API还是有问题？

  本文只是针对本地调试的一个解决方案，API调用有问题可能是其他原因导致的，例如：
  
  * 企业权限签名（wx.config使用）或者应用权限签名（wx.agentConfig使用）有问题

    这两个签名一般是通过后端获取的，所以需要看一下后端配置的企业信息和应用信息是否正确

  * API的调用有无前置条件，比如 openEnterpriseChat（打开会话）需要应用对全员开放；createDoc（创建文档）需要应用具有文档使用权限等
