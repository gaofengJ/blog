---
title: HTML
description: HTML
---

# HTML 面试题

## 如何理解 HTML 语义化

HTML语义化是指在HTML中使用具有特定含义的标签，以便更好地描述内容。这不仅有助于浏览器理解页面结构，也提高了搜索引擎的索引效率和页面的可访问性。

语义化标签有助于清晰地表达网页的结构和内容。例如，<header>标签用于定义页面的头部，<nav>用于导航菜单，<article>用于独立的文章内容。使用这些标签可以使得网页更具可读性和维护性，并有助于搜索引擎优化（SEO）和辅助技术如屏幕阅读器更好地理解页面内容。

## script 标签中 defer 和 async 的区别

defer 和 async 都是用于控制 JavaScript 文件加载和执行方式的 `<script>` 标签属性，但它们的工作原理有所不同：

* defer：

defer 属性会使脚本在后台加载，并在 HTML 文档完全解析后执行。在这期间，浏览器继续解析文档，而不会因为脚本而阻塞。
使用 defer 的脚本按它们在文档中的出现顺序执行。这对于有依赖关系的脚本非常重要，确保脚本按正确顺序执行。
适合需要 DOM 完成后才能执行的脚本。

* async：

async 属性同样使脚本在后台加载，但一旦脚本加载完毕，立即执行，不会等待其他脚本或 DOM 解析完成。
使用 async 的脚本是独立的，可能会以任何顺序执行，因此不适合互相依赖的脚本。
适用于独立的第三方脚本，如分析工具、广告等，不影响页面的其他功能​。

## 从浏览器地址栏输入 url 到请求返回发生了什么

* 1.URL 解析：

浏览器首先分析你输入的 URL，识别出协议（如 HTTP 或 HTTPS）、域名（如 `www.example.com`）、端口号（默认为 80 或 443）和路径（如 /index.html）。这些信息用来决定如何访问服务器和请求哪些资源。

此过程中包含强缓存和协商缓存。

* 2.DNS 解析：

浏览器需要将域名转换为 IP 地址，以便与服务器通信。浏览器会首先在本地缓存中查找是否有对应的 IP 地址记录。如果没有，浏览器会查询操作系统缓存、路由器缓存，最后查询 DNS 服务器​ (FreeCodeCamp)。
DNS 查询包括以下几个步骤：
浏览器检查本地缓存。
查询操作系统缓存。
向路由器发送请求以检查其缓存。
如果这些缓存中都没有结果，浏览器会向 ISP（互联网服务提供商）的 DNS 服务器发送查询。
如果 ISP 的 DNS 服务器无法解析，查询会被发送到更高层级的 DNS 服务器，直到找到负责该域名的权威 DNS 服务器，返回 IP 地址。

* 3.建立 TCP 连接：

获得 IP 地址后，浏览器会与目标服务器建立 TCP 连接。这个过程称为“三次握手”：
浏览器发送一个 SYN（同步序列号）包到服务器，询问是否可以建立连接。
服务器返回一个 SYN-ACK（同步-确认）包，表示接受连接请求。
浏览器发送一个 ACK（确认）包确认，连接建立成功。

* 4.发送 HTTP 请求：

TCP 连接建立后，浏览器会发送 HTTP 请求到服务器。请求通常是 GET 请求，用来请求特定的网页或资源。请求头包含了用户代理信息、支持的语言、已存储的 cookies，以及其他 HTTP 头信息。
例如，一个典型的 HTTP GET 请求可能看起来像这样：

```sh
GET /index.html HTTP/1.1
Host: <www.example.com>
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml,application/xml;q=0.9
```

* 5.服务器处理请求：

服务器接收到请求后，会根据请求的路径查找资源，生成响应，并发送回客户端。响应包含 HTTP 状态码（如 200 表示成功），响应头（如内容类型、内容长度等）和实际的 HTML 内容。
典型的 HTTP 响应可能如下所示：

```php
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 348
Date: Mon, 12 Aug 2024 12:28:53 GMT

<html>
<head><title>Example</title></head>
<body><h1>Hello, world!</h1></body>
</html>
```

* 6.浏览器渲染页面：

浏览器接收到服务器响应后，会开始解析 HTML 文档，构建 DOM（文档对象模型）树和 CSSOM（CSS 对象模型）树，并执行 JavaScript。浏览器根据这些模型渲染页面，将内容显示给用户。
在渲染过程中，浏览器会根据 HTML 中的链接发送额外的 HTTP 请求，以获取嵌入的资源（如 CSS 文件、JavaScript 文件和图像等），并逐步构建和展示完整的网页。

* 7. 断开 TCP 连接

* 8.页面加载完成：

页面加载完成后，浏览器继续监视用户与页面的交互，如点击、滚动和输入事件，并根据需要发送新的请求以获取更多数据（如通过 AJAX 或 Fetch API）

## 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化

**重绘（Repaint）**和**回流（Reflow）**是浏览器在渲染页面时的两个重要概念：

* **重绘**：当元素的外观（例如颜色、背景、边框等）发生变化时需要进行重绘。重绘不会影响布局，所以相对回流来说开销较小。

* **回流**：当页面的布局和几何属性（例如元素的大小、位置）发生变化时，浏览器需要重新计算元素的布局。这一过程称之为回流。回流是一个耗费资源的过程，因为它要求浏览器计算页面上所有被影响的部分。

### 优化策略

* 批量修改样式：尽量避免逐条修改样式，应该一次性更改多个样式。例如，使用class切换来替代多个单独的样式设置。

* 最小化布局触发：避免频繁读取会触发回流的属性，例如offsetTop、scrollTop、getBoundingClientRect等。可以将这些操作集中在一次执行，避免重复触发回流。

* 使用文档片段（DocumentFragment）：在进行多次DOM操作时，可以使用DocumentFragment，将所有变更一次性添加到文档中，减少回流和重绘。

* CSS 动画：尽量使用transform和opacity进行动画，这些属性只会触发重绘，而不会导致回流。

* 脱离文档流操作：对于需要频繁操作的元素，可以先将其从文档流中移除（例如，使用display: none），完成所有操作后再将其放回文档中。

## 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片

使用 1x1 像素的透明 gif 图片来发送数据埋点请求有几个关键原因：

* **兼容性高**：这种方法几乎在所有浏览器和设备上都能工作，即使用户禁用了 JavaScript 或者使用了阻止跟踪脚本的插件​ (Stack Overflow)​。

* **轻量级**：1x1 像素的图片大小非常小，几乎不会占用带宽，这使得它非常高效​ (Stack Overflow)​。

* **跨域支持**：浏览器通常允许 img 标签跨域，这意味着可以从不同的域加载 JavaScript，从而实现更灵活的跟踪​ (Stack Overflow)​。

* **隐藏性强**：透明的 1x1 像素图片几乎不可见，不会影响用户的浏览体验，同时能够悄无声息地收集数据​ (Stack Overflow)​。

这种方法被广泛用于网页访问统计、广告效果监测以及电子邮件阅读率统计等场景。尽管现代浏览器和邮件客户端开始默认阻止图片加载以防止这种跟踪，但它仍然是一个常见且有效的解决方案。

## 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改

```html
<img src="1.jpg" style="width:480px!important;”>
```

```html
<style>
img {
  max-width: 300px;
}
</style>

<img src="1.jpg" style="width:480px!important;”>
```

## input 搜索如何防抖，如何处理中文输入

防抖方案：

```js
function debounce(fn, delay = 100) {
  // 通过闭包缓存一个定时器id
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

中文输入处理：

elementui是通过compositionstart & compositionend做的中文输入处理。

```html
<input
  ref="input"
  @compositionstart="handleComposition"
  @compositionupdate="handleComposition"
  @compositionend="handleComposition"
>
```

这3个方法是原生的方法，这里简单介绍下，官方定义如下compositionstart 事件触发于一段文字的输入之前（类似于 keydown 事件，但是该事件仅在若干可见字符的输入之前，而这些可见字符的输入可能需要一连串的键盘操作、语音识别或者点击输入法的备选词）

简单来说就是切换中文输入法时在打拼音时(此时input内还没有填入真正的内容)，会首先触发compositionstart，然后每打一个拼音字母，触发compositionupdate，最后将输入好的中文填入input中时触发compositionend。触发compositionstart时，文本框会填入 “虚拟文本”（待确认文本），同时触发input事件；在触发compositionend时，就是填入实际内容后（已确认文本）,所以这里如果不想触发input事件的话就得设置一个bool变量来控制。
