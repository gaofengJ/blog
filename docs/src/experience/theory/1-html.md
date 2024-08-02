---
title: HTML
description: HTML
---

# HTML 面试题

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
