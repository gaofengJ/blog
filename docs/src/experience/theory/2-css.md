---
title: CSS
description: CSS
---

# CSS 面试题

## 介绍下 BFC 及其应用

BFC（块格式化上下文）是一种在CSS中用于处理元素布局和浮动的机制。它在页面布局中起到了“隔离”的作用，使元素内部和外部不相互影响。具体来说，BFC具有以下特点和应用：

* 包含内部浮动元素：BFC会包含其内部的浮动元素，从而防止浮动元素溢出其容器。
* 排除外部浮动元素：外部的浮动元素不会影响BFC内部的布局。
* 抑制外边距合并：BFC可以防止相邻块级元素的外边距合并，从而使布局更加稳定。

创建BFC的常用方法包括：

* 使用overflow属性（如hidden、auto或scroll）。
* 设置display属性为inline-block、flex或grid。
* 使用浮动（float）属性。
* 绝对定位（position: absolute或fixed）。

应用BFC的常见场景包括：

* 清除浮动（clearfix），避免容器高度为0。
* 防止外边距合并，确保块级元素之间有正确的间距。
* 包含浮动元素，防止布局破坏。

## div水平垂直居中

```css
<div class="parent">
  <div class="child"></div>
</div>

div.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

在CSS中，opacity: 0、visibility: hidden和display: none这三个属性都能使元素不可见，但它们在实际应用中有不同的效果和适用场景。

* opacity: 0：将元素的透明度设置为0，使其完全透明但仍然占据页面空间，依然会响应事件（如点击）。适用于需要保留元素布局且允许用户通过脚本或动画改变其可见性的场景​​。

* visibility: hidden：隐藏元素但仍然占据页面空间，且不会响应事件。适用于需要保留元素的布局但不希望用户与之交互的情况，例如暂时隐藏的弹出菜单或工具提示​​。

* display: none：完全移除元素，不占据任何页面空间，且不响应事件。适用于需要彻底从布局中移除元素的场景，例如根据条件动态展示或隐藏内容​。

* display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

## 如何设计实现无缝轮播

无缝轮播是一种能够在滚动到末尾时自动返回到开头、看起来没有明显断点的轮播效果。这种效果通常用于图片或内容的连续滚动展示。为了实现无缝轮播，通常需要将内容首尾连接起来，确保在视觉上实现无缝过渡。

**实现无缝轮播的基本思路：**

* 复制内容： 将轮播的内容进行复制，例如，将图片列表的第一个和最后一个元素分别复制到列表的末尾和开头。这样在切换到末尾或开头时，实际上是在切换到复制的元素上，从而实现无缝效果。

* 监听滚动事件： 通过监听轮播容器的滚动事件，当检测到滚动到复制的元素时，瞬间切换回实际的元素位置。这种切换应该是无动画的，用户不会察觉到位置的瞬间变化。

* CSS和JavaScript结合： 使用CSS进行基础的布局和过渡效果，通过JavaScript控制轮播的逻辑和位置切换。

**示例代码：**

**html部分：**

```html
<div class="carousel">
  <div class="carousel-inner">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">1</div> <!-- 复制的第一个元素 -->
  </div>
</div>
```

**CSS部分：**

```css
.carousel {
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 200px;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.item {
  min-width: 100%;
  height: 200px;
}
```

**JavaScript：**

```js
const carousel = document.querySelector('.carousel-inner');
let index = 0;
const items = document.querySelectorAll('.item');
const totalItems = items.length;

function moveToNext() {
  if (index >= totalItems - 1) {
    index = 0;
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(-${index * 100}%)`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        carousel.style.transition = 'transform 0.5s ease-in-out';
        index++;
        carousel.style.transform = `translateX(-${index * 100}%)`;
      });
    });
  } else {
    index++;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }
}

setInterval(moveToNext, 3000);
```

> [!TIP]
>
> * 第一帧：关闭过渡效果并瞬间切换到实际元素位置。
> * 第二帧：恢复过渡效果，并开始新的过渡。

## 什么是Retina 屏？如何解决移动端 Retina 屏 1px 像素问题

Retina屏幕是苹果公司推出的一种高分辨率屏幕技术，主要特点是其像素密度足够高，以至于人眼在正常视距下无法分辨单个像素。这种屏幕技术提高了显示效果，使文字和图像更加锐利和清晰。

在移动端的Retina屏幕上，实现1px的像素效果通常会遇到挑战，因为Retina屏幕的像素密度远高于普通屏幕，标准的1px边框在Retina屏幕上可能会显得过厚。以下是几种解决方法。

* **使用transform属性缩放**：可以通过CSS的transform属性来缩放边框，使其达到类似1px的效果。例如，使用scaleY(0.5)将1px的边框缩小为0.5px​。

```css
.transform-border-hairline {
  border-bottom: 1px solid #000;
  transform: scaleY(0.5);
}
```

* **使用0.5px边框**：在支持的浏览器中，可以直接使用0.5px的边框宽度。为确保兼容性，可以检测设备的像素比率，并在支持的设备上应用0.5px边框​。

```js
if (window.devicePixelRatio && devicePixelRatio >= 2) {
  var testElem = document.createElement('div');
  testElem.style.border = '.5px solid transparent';
  document.body.appendChild(testElem);
  if (testElem.offsetHeight == 1) {
      document.querySelector('html').classList.add('hairlines');
  }
  document.body.removeChild(testElem);
}

.element {
  border: 1px solid #bbb;
}

.hairlines .element {
  border-width: 0.5px;
}
```

* **使用box-shadow属性**：通过使用box-shadow属性和扩散半径（spread radius），可以实现类似于1px的细线效果。

```css
.element {
  box-shadow: inset 0 0 1px #000;
}
```

## 介绍下 BFC、IFC、GFC 和 FFC

**BFC（Block Formatting Context）**

块级格式化上下文（BFC）是页面上的一个独立的渲染区域，容器里的子元素不会在布局上影响外部的元素。它是决定块级盒子布局及浮动元素相互影响的一个关键机制。创建BFC的常见情况包括：

* 根元素或其它包含块元素
* 浮动元素（float属性不为none）
* 绝对定位元素（position为absolute或fixed）
* display属性为inline-block的元素
* overflow属性不为visible的元素
* 弹性容器（display属性为flex或inline-flex）

BFC在清除浮动、避免外边距重叠以及包含内部浮动元素等场景中有很大作用​。

**IFC（Inline Formatting Context）**

行内格式化上下文（IFC）用来规定行内级别盒子的布局规则。IFC通常在一个块级元素中仅包含行内级别元素时生成。布局规则包括：

* 盒子在水平方向一个接一个地放置。
* 盒子垂直方向的起点从包含块盒子的顶部开始。
* line box的宽度由包含块和存在的浮动决定。

IFC主要用于水平和垂直居中对齐内容​。

**GFC（Grid Formatting Context）**

栅格格式化上下文（GFC）是通过display:grid创建的，用于实现二维的网格布局。GFC能够简化复杂的网页布局，提供更灵活的对齐和排版功能。

**FFC（Flex Formatting Context）**

弹性格式化上下文（FFC）是通过display:flex或inline-flex创建的。FFC用于实现一维的弹性布局，支持水平和垂直方向上的灵活分配和对齐。与块级布局不同，弹性容器中的浮动、清除和列属性无效。
