---
title: 04. GPU与渲染管线：如何用 WebGL 绘制最简单的几何图形?
description: 可视化
---

# 04. GPU与渲染管线：如何用 WebGL 绘制最简单的几何图形?

## 图形系统是如何绘图的？

计算机图形系统的主要组成部分：

* 光栅（Raster）：几乎所有的现代图形系统都是基于光栅来绘制图形的，光栅就是指构成图像的像素阵列。

* 像素（Pixel）：一个像素对应图像上的一个点，它通常保存图像上的某个具体位置的颜色等信息。

* 帧缓存（Frame Buffer）：在绘图过程中，像素信息被存放于帧缓存中，帧缓存是一块内存地址。

* CPU（Central Processing Unit）：中央处理单元，负责逻辑计算。

* GPU（Graphics Processing Unit）：图形处理单元，负责图形计算。

首先，数据经过 CPU 处理，成为具有特定结构的几何信息。然后，这些信息会被送到 GPU 中进行处理。在 GPU 中要经过两个步骤生成光栅信息。这些光栅信息会输出到帧缓存中，最后渲染到屏幕上。这个过程可以称之为渲染管线。

![图形系统绘图过程](/imgs/note/visualization/chapter4_graphic_draw_process.png)

GPU 是由大量的小型处理单元构成的，它可能远远没有 CPU 那么强大，但胜在数量众多，可以保证每个单元处理一个简单的任务。

## 如何用 WebGL 绘制三角形？

1. 创建 WebGL 上下文
2. 创建 WebGL 程序（WebGL Program）
3. 将数据存入缓冲区
4. 将缓冲区数据读取到 GPU
5. GPU 执行 WebGL 程序，输出结果

### 一、创建 WebGL 上下文

```js
  const canvas = document.querySelector('canvas');
  const gl = canvas.getContext('webgl');
```

### 二、创建 WebGL 程序

这里的 WebGL 程序是一个 WebGLProgram 对象，给 GPU最终运行着色器的程序。

要创建这个 WebGL 程序，我们需要编写两个着色器（Shader）。着色器是用 GLSL 这种编程语言编写的代码片段。

在 GLSL 中，attribute 表示声明变量，vec2 是变量的类型，它表示一个二维向量，position 是变量名。

WebGL 绘制一个图形的过程，一般需要用到两段着色器。

* 一段叫**顶点着色器**（Vertex Shader）负责处理图形的顶点信息。它可以改变顶点的信息（如顶点的坐标、法线方向、材质等等），从而改变我们绘制出来的图形的形状或者大小等等。

* 另一段叫**片元着色器**（Fragment Shader）负责处理图形的像素信息。顶点处理完成之后，WebGL 就会根据顶点和绘图模式指定的图元，计算出需要着色的像素点，然后对它们执行片元着色器程序。简单来说，就是对指定图元中的像素点着色。**无论有多少个像素点，片元着色器都可以同时处理。**

```js
  const vertex = `
    attribute vec2 position;

    void main() {
      gl_PointSize = 1.0;
      gl_Position = vec4(position, 1.0, 1.0);
    }
  `; // 顶点着色器

  const fragment = `
    precision mediump float;

    void main()
    {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }    
  `; // 图元着色器
  
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertex); // Vertex Shader 对象
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragment); // Fragment Shader 对象
  gl.compileShader(fragmentShader);

  const program = gl.createProgram(); // 创建 WebGLProgram对象
  gl.attachShader(program, vertexShader); // 关联 shader 对象
  gl.attachShader(program, fragmentShader); // 关联 shader 对象
  gl.linkProgram(program); // 将 WebGLProgram 对象链接到 WebGL 上下文对象上

  gl.useProgram(program); // use 启用
```

### 三、将数据放入缓冲区

WebGL 的坐标系是一个三维空间坐标系，坐标原点是（0,0,0）。其中，x 轴朝右，y 轴朝上，z 轴朝外。

```js
  // 定义三角形顶点，使用Float32Array这种类型化数组来处理二进制缓冲区
  const points = new Float32Array([
    -1, -1,
    0, 1,
    1, -1,
  ]);
   // 将定义好的数据写入 WebGL 缓冲区
  const bufferId = gl.createBuffer(); // 创建一个缓存对象
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId); // 绑定为当前操作对象
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW); // 将数据写入缓存对象
```

### 四、将缓冲区数据读取到 GPU

```js
  const vPosition = gl.getAttribLocation(program, 'position'); // 获取顶点着色器中的position变量的地址
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0); // 给变量设置长度和类型
  gl.enableVertexAttribArray(vPosition); // 激活这个变量
```

### 五、执行着色器程序完成绘制

```js
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
```

![WebGL绘图过程](/imgs/note/visualization/chapter4_webgl_draw_process.png)

## 顶点着色器的作用

一是通过 gl_Position 设置顶点，二是通过定义 varying 变量，向片元着色器传递数据。

## Q&A

WebGL支持的图元类型：

* gl.POINTS(点)
* gl.LINES(线段)
* gl.LINE_STRIP(线条)
* gl.LINE_LOOP(回路)
* gl.TRIANGLES(三角形)
* gl.TRIANGLE_STRIP(三角带)
* gl.TRIANGLE_FAN(三角扇)
