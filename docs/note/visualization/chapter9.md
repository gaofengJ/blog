---
title: 09. 如何用仿射变换对几何图形进行坐标变换
description: 可视化
---

## 什么是仿射变换

仿射变换简单来说就是“线性变换 + 平移”。针对几何图形的仿射变换有以下两个性质：

* 仿射变换前是直线段的，仿射变换后依然是直线段

* 对两条直线段 a 和 b 应用同样的仿射变换，变换前后线段长度比例保持不变

由于仿射变换具有这两个性质，因此对线性空间中的几何图形进行仿射变换，就相当于对它的每个顶点向量进行仿射变换。

## 向量的平移、旋转与缩放

* 平移

如果想让向量 P(x0, y0) 沿着向量 Q(x1, y1) 平移，只要将 P 和 Q 相加就可以了。

![向量的平移](/images/note_visualization_chapter9_1.png)

* 旋转

```javascript
class Vector2D {
  rotate(rad) {
    const c = Math.cos(rad),
      s = Math.sin(rad);
    const [x, y] = this;

    this.x = x * c + y * -s;
    this.y = x * s + y * c;

    return this;
  }
}
```

推导过程：

![向量的旋转](/images/note_visualization_chapter9_2.png)

假设向量 P 的长度为 r，角度是⍺，现在我们要将它逆时针旋转⍬角，此时新的向量 P’的参数方程为：

![向量的旋转](/images/note_visualization_chapter9_3.png)

然后，因为 rcos⍺、rsin⍺是向量 P 原始的坐标 x0、y0，所以，我们可以把坐标代入到上面的公式中，就会得到如下的公式：

![向量的旋转](/images/note_visualization_chapter9_4.png)

* 缩放

![向量的缩放](/images/note_visualization_chapter9_5.png)

## 仿射变换的应用：实现粒子动画

### 一、创建三角形

#### 1.定义三角形的顶点并将数据送到缓冲区

```javascript

const position = new Float32Array([
  -1, -1,
  0, 1,
  1, -1,
]);
const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);

const vPosition = gl.getAttribLocation(program, 'position');
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);
```

#### 2.实现一个创建随机三角形属性的函数

具体来说就是，利用 randomTriangles 随机创建一个三角形的信息，其中的参数包括颜色 u_color、初始旋转角度 u_rotation、初始大小 u_scale、初始时间 u_time、动画持续时间 u_diration、运动方向 u_dir 和创建时间 startTime。除了 startTime 之外的数据，我们都需要传给 shader 去处理。

```javascript

function randomTriangles() {
  const u_color = [Math.random(), Math.random(), Math.random(), 1.0]; // 随机颜色
  const u_rotation = Math.random() * Math.PI; // 初始旋转角度
  const u_scale = Math.random() * 0.05 + 0.03; // 初始大小
  const u_time = 0;
  const u_duration = 3.0; // 持续3秒钟

  const rad = Math.random() * Math.PI * 2;
  const u_dir = [Math.cos(rad), Math.sin(rad)]; // 运动方向
  const startTime = performance.now();

  return {u_color, u_rotation, u_scale, u_time, u_duration, u_dir, startTime};
}
```

### 二、设置uniform变量

uniform 声明是 shader 的一种变量声明。和 attribute 声明变量的区别：

* attribute 变量是对应于顶点的。也就是说，几何图形有几个顶点就要提供几份 attribute 数据。并且，attribute 变量只能在顶点着色器中使用，如果要在片元着色器中使用，需要我们通过 varying 变量将它传给片元着色器才行。这样一来，片元着色器中获取的实际值，就是经过顶点线性插值的。

* uniform 声明的变量和其他语言中的常量一样，我们赋给 unform 变量的值在 shader 执行的过程中不可改变。而且一个变量的值是唯一的，不随顶点变化。**uniform 变量既可以在顶点着色器中使用，也可以在片元着色器中使用**。

### 三、用 requestAnimationFrame 实现动画

具体的方法就是，我们在 update 方法中每次新建数个随机三角形，然后依次修改所有三角形的 u_time 属性，通过 setUniforms 方法将修改的属性更新到 shader 变量中。

### 四、在片元着色器中着色
