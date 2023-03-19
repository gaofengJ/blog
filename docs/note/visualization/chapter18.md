---
title: 18. 如何生成简单动画让图形动起来
description: 可视化
---

## 动画的三种形式

动画有三种形式，分别是固定帧动画、增量动画和时序动画。

第一种形式是我们预先准备好要播放的静态图像，然后将这些图依次播放，所以它叫做固定帧动画。增量动画是在动态绘制图像的过程中，我们修改每一帧中某个或某几个属性的值，给它们一定的增量。第三种形式是在动态绘制图像的过程中，我们根据时间和动画函数计算每一帧中的关键属性值，然后更新这些属性，所以它叫做时序动画。

### 固定帧动画

```css
.bird {
  position: absolute;
  left: 100px;
  top: 100px;
  width:86px;
  height:60px;
  zoom: 0.5;
  background-repeat: no-repeat;
  background-image: url(https://p.ssl.qhimg.com/t01f265b6b6479fffc4.png);
  background-position: -178px -2px;
  animation: flappy .5s step-end infinite;
}

@keyframes flappy {
  0% {background-position: -178px -2px;}
  33% {background-position: -90px -2px;}
  66% {background-position: -2px -2px;}
}
```

### 增量动画

```html

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .block {
      width: 100px;
      height: 100px;
      top: 100px;
      left: 100px;
      transform-origin: 50% 50%;
      position: absolute;
      background: blue;
    }
  </style>
</head>
<body>
  <div class="block"></div>
  <script>
  const block = document.querySelector('.block');
  let rotation = 0;
  requestAnimationFrame(function update() {
    block.style.transform = `rotate(${rotation++}deg)`;
    requestAnimationFrame(update);
  });
  </script>
</body>
</html>
```

增量动画的优点就是实现简单。但它也有 2 个缺点。首先，因为它使用增量来控制动画，从数学角度来说，也就是我们直接使用了一阶导数来定义的动画。这样的绘图方式不太好控制动画的细节，比如动画周期、变化率、轨迹等等，所以这种方法只能用来实现简单动画。

### 时序动画

使用时间和动画函数来描述。
