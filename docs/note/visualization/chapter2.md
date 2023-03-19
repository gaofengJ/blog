---
title: 02. 指令式绘图：如何用Canvas绘制层次关系图
description: 可视化
---

## 一、 Canvas 元素和 2D 上下文

对于浏览器来说，Canvas 也是 HTML 元素，我们可以用 canvas 标签将它插入到 HTML 内容中。

```html
<body>
  <canvas width="512" height="512"></canvas>
</body>
```

Canvas 元素上的 width 和 height 属性不等同于 Canvas 元素的 CSS 样式的属性。这是因为，CSS 属性中的宽高影响 Canvas 在页面上呈现的大小，而 HTML 属性中的宽高则决定了 Canvas 的坐标系。为了区分它们，我们称 Canvas 的 HTML 属性宽高为**画布宽高**，CSS 样式宽高为**样式宽高**。

在实际绘制的时候，如果我们不设置 Canvas 元素的样式，那么 Canvas 元素的画布宽高就会等于它的样式宽高的像素值。

## 二、 Canvas的坐标系

Canvas 的坐标系和浏览器窗口的坐标系类似，它们都默认左上角为坐标原点，x 轴水平向右，y 轴垂直向下。

## 三、绘制几何图形

### 1. 获取 Canvas 上下文

```javascript
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
```

#### getContext()类型

* "2d", 建立一个 CanvasRenderingContext2D 二维渲染上下文。

* "webgl" (或"experimental-webgl") 这将创建一个 WebGLRenderingContext 三维渲染上下文对象。只在实现WebGL 版本 1(OpenGL ES 2.0) 的浏览器上可用。

* "webgl2" (或 "experimental-webgl2") 这将创建一个 WebGL2RenderingContext 三维渲染上下文对象。只在实现 WebGL 版本 2 (OpenGL ES 3.0) 的浏览器上可用。

* "bitmaprenderer" 这将创建一个只提供将 canvas 内容替换为指定ImageBitmap功能的ImageBitmapRenderingContext 。

### 2. 用 Canvas 上下文绘制图形

Canvas 的 API 大体可以分为两类：

* 设置状态的 API，可以设置或改变当前的绘图状态，比如，改变要绘制图形的颜色、线宽、坐标变换等等

* 另一类是绘制指令 API，用来绘制不同形状的几何图形

绘制过程：

1. 获取 Canvas 对象，通过 getContext(‘2d’) 得到 2D 上下文；
2. 设置绘图状态，比如填充颜色 fillStyle，平移变换 translate 等等；
  translate平移的是坐标系，可以理解为坐标原点移动了
3. 调用 beginPath 指令开始绘制图形；
4. 调用绘图指令，比如 rect，表示绘制矩形；
5. 调用 fill 指令，将绘制内容真正输出到画布上。

代码：

```javascript
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const rectSize = [100, 100];
context.fillStyle = 'red';
context.beginPath();
context.translate(-0.5 * rectSize[0], -0.5 * rectSize[1]);
context.rect(0.5 * canvas.width, 0.5 * canvas.height, ...rectSize);
context.fill();
```

## 四、如果绘制层次关系图

```javascript
const dataSource = 'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json';
(async function () {
  const data = await (await fetch(dataSource)).json();
}());
```

借助 d3.hierarchy 计算，遍历数据并且根据数据内容绘制圆弧。

## Canvas的优缺点

优点：

* Canvas 通过一组简单的绘图指令，就能够方便快捷地绘制出各种复杂的几何图形。

* Canvas 渲染起来相当高效。即使是绘制大量轮廓非常复杂的几何图形，Canvas 也只需要调用一组简单的绘图指令就能高性能地完成渲染。

缺点：

* Canvas 绘制出的图形对于浏览器来说，只是 Canvas 中的一个个像素点，我们很难直接抽取其中的图形对象进行操作。

## Canvas API

[Canvas API](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)
