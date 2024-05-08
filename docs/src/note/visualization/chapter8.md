---
title: 08. 如何利用三角剖分和向量操作描述并处理多边形
description: 可视化
---

不论是 2D 图形还是 3D 图形，经过投影变换后，在屏幕上输出的都是多边形。

## 图形学中的多边形是什么

多边形可以定义为由三条或三条以上的线段首尾连接构成的平面图形，其中，每条线段的端点就是多边形的顶点，线段就是多边形的边。

多边形又可以分为**简单多边形**和**复杂多边形**。

如果一个多边形的每条边除了相邻的边以外，不和其他边相交，那它就是简单多边形，否则就是复杂多边形。一般来说，绘图时要尽量构建简单多边形，因为简单多边形的图形性质比较简单，绘制起来比较方便。

而简单多边形又分为凸多边形和凹多边形，我们主要是看简单多边形的内角来区分的。如果一个多边形中的每个内角都不超过 180°，那它就是凸多边形，否则就是凹多边形。

## 不同的图形系统如何填充多边形

### Canvas2D 如何填充多边形

使用 fill 进行填充。fill 支持两种规则：

* nonzero

默认规则。不管有没有相交的边，只要是由边围起来的区域都一律填充。

* evenodd

根据重叠区域是奇数还是偶数来判断是否填充的。

### SVG

同 Canvas2D

### WebGL 如何填充多边形

WebGL 虽然没有提供自动填充多边形的方法，但是可以用三角形这种基本图元来快速地填充多边形。

这种将多边形分割成若干个三角形的操作，在图形学中叫做**三角剖分**（Triangulation）。

无论是绘制 2D 还是 3D 图形，WebGL 都需要先把它们进行三角剖分，然后才能绘制。因此，三角剖分是 WebGL 绘图的基础。

## 如何判断点在多边形内部

### Canvas2D

我们在 canvas 上添加 mousemove 事件，在事件中计算鼠标相对于 canvas 的位置，再将这个位置传给 isPointInPath 方法，isPointInPath 方法就会自动判断这个位置是否位于图形内部。

isPointInPath 仅能判断鼠标是否在最后一次绘制的小三角形内，所以大多边形就没有被识别出来。

```javascript

const {left, top} = canvas.getBoundingClientRect();

canvas.addEventListener('mousemove', (evt) => {
  const {x, y} = evt;
  // 坐标转换
  const offsetX = x - left;
  const offsetY = y - top;

  ctx.clearRect(-256, -256, 512, 512);

  if(ctx.isPointInPath(offsetX, offsetY)) {
    draw(ctx, poitions, 'transparent', 'green');
  } else {
    draw(ctx, poitions, 'transparent', 'red');
  }
});
```

### SVG

在 SVG 这样的图形系统里，由于多边形本身就是一个元素节点，因此我们直接通过 DOM API 就可以判定鼠标是否在该元素上。

### Canvas2D

已知一个三角形的三条边分别是向量 a、b、c，平面上一点 u 连接三角形三个顶点的向量分别为 u1、u2、u3，那么 u 点在三角形内部的充分必要条件是：u1 X a、u2 X b、u3 X c 的符号相同。

这样就判断了一个点是否在某个三角形内部。那如果要判断一个点是否在任意多边形的内部，我们只需要在判断之前将它进行三角剖分就可以了。
