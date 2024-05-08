---
title: 06. 可视化中必须要掌握的向量乘法知识
description: 可视化
---

## 给定一个任意点，判断这个点在不在扫描器范围内

### 向量的方向定义

```javascript
const getDir = (y, x) => {
  return Math.atan2(y, x); // atan2 方法返回一个 -pi 到 pi 之间的数值。表示点 (x, y) 对应的偏移角度
}
const isInRange = (v) => {
  return v.dir > Math.PI / 3 && v.dir < 2 * Math.PI / 3;
}
```

### 向量的点乘

现在有两个 N 维向量 a 和 b，a = [a1, a2, ...an]，b = [b1, b2, ...bn]，那向量的点积代码如下：

```javascript
a•b = a1*b1 + a2*b2 + ... + an*bn
```

### 向量的叉乘

叉乘和点乘有两点不同：**首先，向量叉乘运算的结果不是标量，而是一个向量；其次，两个向量的叉积与两个向量组成的坐标平面垂直。**

二维向量叉积的几何意义就是向量 **a、b 组成的平行四边形的面积**。

### 解决方案

```javascript

const isInRange = Math.abs(new Vec2(0, 1).cross(v0.normalize())) <= 0.5; // v0.normalize()即将v0归一化
```
