---
title: 11. 图案生成：如何生成重复图案、分形图案以及随机效果
description: 可视化
---

## 如何绘制大批量重复图案

如果我们将网格绘制在 Canvas2D 画布上，那网格的线条就会很多，这也就意味着我们要用大量的绘图指令来绘制。这个时候，一旦 Canvas2D 的画面改变了，我们就需要重绘全部的网格，这会大大消耗系统的性能。而且，如果将大量的时间都浪费在绘制这种重复图案上，那我们实现的代码性能可能就会很差。

### 一、使用 background-image 来绘制重复图案

```css
canvas {
  background-image: linear-gradient(to right, transparent 90%, #ccc 0),
    linear-gradient(to bottom, transparent 90%, #ccc 0);
  background-size: 8px 8px, 8px 8px;
}
```

使用 background-image 的弊端是，当我们用坐标变换来缩放或移动图形的时候，作为元素背景的网格是不会随着缩放或移动而改变的。但使用 Shader，我们就能够避免这个问题了。

### 二、使用 Shader 来绘制重复图案

如果是用 WebGL 来渲染的话，我们还有更简单的做法，就是利用 GPU 并行计算的特点，使用着色器来绘制背景网格这样的重复图案。

#### 1.创建 Renderer 对象

#### 2.创建并启用 WebGL 程序

#### 3.设置 uniform 变量

#### 4.将顶点数据送入缓冲区

```js
//顶点着色器:
attribute vec2 a_vertexPosition;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  gl_PointSize = 1.0;
  vUv = uv;
  gl_Position = vec4(a_vertexPosition, 1, 1);


//片元着色器:
#ifdef GL_ES
precision mediump float;
#endif
varying vec2 vUv;
uniform float rows;

void main() {
  vec2 st = fract(vUv * rows);
  float d1 = step(st.x, 0.9);
  float d2 = step(0.1, st.y);
  gl_FragColor.rgb = mix(vec3(0.8), vec3(1.0), d1 * d2);
  gl_FragColor.a = 1.0;
}
```

## 如何绘制分形图案

## 如何给图案增加随机效果

在片元着色器中使用伪随机函数，来给重复图案实现随机效果。
