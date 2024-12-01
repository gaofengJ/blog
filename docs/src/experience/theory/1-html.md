---
title: HTML
description: HTML
---

# HTML 面试题

## 如何理解 HTML 语义化

HTML语义化是指在HTML中使用具有特定含义的标签，以便更好地描述内容。这不仅有助于浏览器理解页面结构，也提高了搜索引擎的索引效率和页面的可访问性。

语义化标签有助于清晰地表达网页的结构和内容。例如，`<header>`标签用于定义页面的头部，`<nav>` 用于导航菜单，`<article>` 用于独立的文章内容。使用这些标签可以使得网页更具可读性和维护性，并有助于搜索引擎优化（SEO）和辅助技术如屏幕阅读器更好地理解页面内容。

## script 标签中 defer 和 async 的区别 <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

defer 和 async 都是用于控制 JavaScript 文件加载和执行方式的 `<script>` 标签属性，但它们的工作原理有所不同：

* **defer**

  * defer 属性会使脚本在后台加载，并在 HTML 文档完全解析后执行。在这期间，浏览器继续解析文档，而不会因为脚本而阻塞。
  * 使用 defer 的脚本按它们在文档中的出现顺序执行。这对于有依赖关系的脚本非常重要，确保脚本按正确顺序执行。
  * 适合需要 DOM 完成后才能执行的脚本。

* **async**

  * async 属性同样使脚本在后台加载，但一旦脚本加载完毕，立即执行，不会等待其他脚本或 DOM 解析完成。
  * 使用 async 的脚本是独立的，可能会以任何顺序执行，因此不适合互相依赖的脚本。
  * 适用于独立的第三方脚本，如分析工具、广告等，不影响页面的其他功能​。

## 什么是事件代理（事件委托）

事件委托是指将事件处理程序添加到父元素上，而不是直接为每个子元素添加事件监听器。这样，父元素可以监听到其子元素的事件，通过事件的冒泡机制来捕获子元素的事件。它的好处包括减少内存消耗，简化代码，尤其适用于动态生成的元素。

示例：

```html
<ul id="parent">
  <li>项 1</li>
  <li>项 2</li>
  <li>项 3</li>
</ul>

<script>
  document.getElementById('parent').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      alert('点击了: ' + event.target.textContent);
    }
  });
</script>
```

## 捕获 & 冒泡

在HTML中，事件的捕获和冒泡是指事件传播的两个不同阶段。它们定义了事件在DOM树中传播的顺序，决定了事件处理程序是在哪个阶段被触发的。

**定义**

* **捕获（Capturing）**

  捕获阶段，事件从最外层的父元素开始传播，一直到目标元素。在这个阶段，父元素首先接收到事件，然后逐级向下传递到事件的目标元素。

* **冒泡（Bubbling）**

  冒泡阶段，事件从目标元素开始传播，逐级向上冒泡到父元素，直到最外层的祖先元素。通常我们处理事件时，事件会从目标元素“冒泡”到其父元素，祖父元素，依此类推。

**区别**

* 顺序

  * 捕获阶段：事件从根节点开始，一直到目标元素。
  * 冒泡阶段：事件从目标元素开始，向上传递到根节点。

* 默认行为：

  * 默认情况下，大多数事件是在冒泡阶段触发的。比如点击事件默认是冒泡的。
  * 捕获阶段通常不常用，除非明确通过addEventListener中的capture参数启用。

* 使用时机：

  * 捕获阶段适合在事件传播开始时就进行处理，通常用于需要提前拦截的场景。
  * 冒泡阶段适合在事件传播到目标元素之后进行处理，通常用于DOM事件委托。

## 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片

使用 1x1 像素的透明 gif 图片来发送数据埋点请求有几个关键原因：

* **兼容性高**

  这种方法几乎在所有浏览器和设备上都能工作，即使用户禁用了 JavaScript 或者使用了阻止跟踪脚本的插件​。

* **轻量级**

  1x1 像素的图片大小非常小，几乎不会占用带宽，这使得它非常高效​。

* **跨域支持**

  浏览器通常允许 img 标签跨域，这意味着可以从不同的域加载 JavaScript，从而实现更灵活的跟踪​。

* **隐藏性强**

  透明的 1x1 像素图片几乎不可见，不会影响用户的浏览体验，同时能够悄无声息地收集数据​。

这种方法被广泛用于网页访问统计、广告效果监测以及电子邮件阅读率统计等场景。尽管现代浏览器和邮件客户端开始默认阻止图片加载以防止这种跟踪，但它仍然是一个常见且有效的解决方案。

> [!TIP]
>
> Beacon API
> 利用 navigator.sendBeacon 发送小型异步请求，将数据发送到服务器
> 优势：
>
> * 异步且不会阻塞页面卸载。
> * 高效适合用户退出页面时的埋点。
> * 支持 POST 请求，可发送较大的数据量。
>
> ```js
> const data = { event: 'page_view', timestamp: Date.now() };
> navigator.sendBeacon('/tracking', JSON.stringify(data));
>```

## 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改

```html
<img src="1.jpg" style="width:480px!important;”>
```

**Answer**

```html
<style>
img {
  max-width: 300px;
}
</style>

<img src="1.jpg" style="width:480px!important;”>
```

## input 搜索如何防抖，如何处理中文输入

### 防抖方案

```js
function debounce(fn, delay = 100) {
  // 通过闭包缓存一个定时器id
  let timer;
  return (...args) => { // ...args 用来捕获传递给函数的所有参数，并将它们存储在一个数组中。
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

### 中文输入处理

ElementUI 是通过 `compositionstart` & `compositionend` 做的中文输入处理。

```html
<input
  ref="input"
  @compositionstart="handleComposition"
  @compositionupdate="handleComposition"
  @compositionend="handleComposition"
>
```

这3个方法是原生的方法，这里简单介绍下，官方定义如下 compositionstart 事件触发于一段文字的输入之前（类似于 keydown 事件，但是该事件仅在若干可见字符的输入之前，而这些可见字符的输入可能需要一连串的键盘操作、语音识别或者点击输入法的备选词）

简单来说就是切换中文输入法时在打拼音时(此时 input 内还没有填入真正的内容)，会首先触发 compositionstart，然后每打一个拼音字母，触发 compositionupdate，最后将输入好的中文填入input中时触发 compositionend。触发 compositionstart时，文本框会填入 “虚拟文本”（待确认文本），同时触发 input 事件；在触发 compositionend 时，就是填入实际内容后（已确认文本）,所以这里如果不想触发 input 事件的话就得设置一个 bool 变量来控制。

## P50、P90和秒开率的区别

* P90/P50 是描述延迟或响应时间的统计量，它们关注的是在不同百分比数据中的响应时间，帮助我们了解系统在不同负载下的表现。P90 和 P50 主要用于了解系统性能的分布情况。

* 秒开率 则是一个具体的性能指标，关注的是从请求到开始接收数据的时间。秒开率直接影响用户的感知体验，尤其是在加载网页、启动应用时的响应速度。
