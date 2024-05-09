---
title: 05. 如何用向量和坐标系描述点和线段？
description: 可视化
---

## 坐标系与坐标映射

### HTML

HTML 采用的是窗口坐标系，以参考对象（参考对象通常是最接近图形元素的 position 非 static 的元素）的元素盒子左上角为坐标原点，x 轴向右，y 轴向下，坐标值对应像素值。

### SVG

SVG 采用的是视区盒子（viewBox）坐标系。这个坐标系在默认情况下，是以 svg 根元素左上角为坐标原点，x 轴向右，y 轴向下，svg 根元素右下角坐标为它的像素宽高值。如果我们设置了 viewBox 属性，那么 svg 根元素左上角为 viewBox 的前两个值，右下角为 viewBox 的后两个值。

### Canvas

Canvas 默认以画布左上角为坐标原点，右下角坐标值为 Canvas 的画布宽高值。

### WebGL

WebGL 的坐标系比较特殊，是一个三维坐标系。它默认以画布正中间为坐标原点，x 轴朝右，y 轴朝上，z 轴朝外，x 轴、y 轴在画布中范围是 -1 到 1。

## 坐标系转换

### Canvas

Canvas 的 2D 上下文设置 transform变换中，常用的两个变换：translate，scale。

在一个 512 * 512 的画布中，通过 translate 变换将 Canvas 画布的坐标原点，从左上角 (0, 0) 点移动至 (256, 256) 位置，即画布的底边上的中点位置。接着，以移动了原点后新的坐标为参照，通过 scale(1, -1) 将 y 轴向下的部分，即 y>0 的部分沿 x 轴翻转 180 度，这样坐标系就变成以画布底边中点为原点，x 轴向右，y 轴向上的坐标系了。

```js
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.translate(256, 256);
ctx.scale(1, -1);
```
