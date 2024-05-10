---
title: 07. 可视化中必须要掌握的向量乘法知识
description: 可视化
---

# 07. 可视化中必须要掌握的向量乘法知识

## 如何用向量描述曲线

```js
function regularShape(edges = 3, x, y, step) {
  const ret = [];
  const delta = Math.PI * (1 - (edges - 2) / edges);
  let p = new Vector2D(x, y);
  const dir = new Vector2D(step, 0);
  ret.push(p);
  for(let i = 0; i < edges; i++) {
    p = p.copy().add(dir.rotate(delta));
    ret.push(p);
  }
  return ret;
}
draw(regularShape(60, 128, -64, 6));  // 绘制六十边形
```

### 如何用参数方程描述曲线

如下所示的参数方程，定义了一个圆心在（x0,y0），半径为 r 的圆。

![圆的参数方程](/imgs/note/visualization/chapter7_circle.png)

```js

const TAU_SEGMENTS = 60;
const TAU = Math.PI * 2;
function arc(x0, y0, radius, startAng = 0, endAng = Math.PI * 2) {
  const ang = Math.min(TAU, endAng - startAng);
  const ret = ang === TAU ? [] : [[x0, y0]];
  const segments = Math.round(TAU_SEGMENTS * ang / TAU);
  for(let i = 0; i <= segments; i++) {
    const x = x0 + radius * Math.cos(startAng + ang * i / segments);
    const y = y0 + radius * Math.sin(startAng + ang * i / segments);
    ret.push([x, y]);
  }
  return ret;
}

draw(arc(0, 0, 100));
```

### 贝塞尔曲线

生活中还有很多不规则的图形，无法用上面这些规律的曲线去描述。那我们该如何去描述这些不规则图形呢？**贝塞尔曲线**（Bezier Curves）就是最常见的一种解决方式。它在可视化领域中也是一类非常常用的曲线，它通过起点、终点和少量控制点，就能定义参数方程来生成复杂的平滑曲线，所以它通常被用来构建数据信息之间连接线。

贝塞尔曲线又分为**二阶贝塞尔曲线**（Quadratic Bezier Curve）和**三阶贝塞尔曲线**（Qubic Bezier Curve）。顾名思义，二阶贝塞尔曲线的参数方程是一元二次多项式，那么三阶贝塞尔曲线的参数方程是一元三次多项式。

三阶贝塞尔曲线控制点比二阶贝塞尔曲线多，这有什么优势呢？因为控制点越多，曲线能够模拟出更多不同的形状，也能更精确地控制细节。
