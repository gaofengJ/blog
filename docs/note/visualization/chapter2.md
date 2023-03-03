---
title: 02、指令式绘图：如何用Canvas绘制层次关系图
description: 可视化
---

## 1. Canvas 元素和 2D 上下文

对于浏览器来说，Canvas 也是 HTML 元素，我们可以用 canvas 标签将它插入到 HTML 内容中。

```html
<body>
  <canvas width="512" height="512"></canvas>
</body>
```

Canvas 元素上的 width 和 height 属性不等同于 Canvas 元素的 CSS 样式的属性。这是因为，CSS 属性中的宽高影响 Canvas 在页面上呈现的大小，而 HTML 属性中的宽高则决定了 Canvas 的坐标系。为了区分它们，我们称 Canvas 的 HTML 属性宽高为**画布宽高**，CSS 样式宽高为**样式宽高**。

在实际绘制的时候，如果我们不设置 Canvas 元素的样式，那么 Canvas 元素的画布宽高就会等于它的样式宽高的像素值。

## 2. Canvas的坐标系
