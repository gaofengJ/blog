---
title: CSS
description: CSS
---

# CSS 面试题

## 盒模型

盒模型由四个部分组成：内容区（ content area ）、内边距区（ padding area ）、边框区（ border area ）和外边距区（ margin area ）。这些区域共同决定了元素在页面中的布局和占用的空间。

CSS 中的 box-sizing 属性控制计算盒子大小的方式。

* **box-sizing**

  content-box 仅包含内容区，不计算内边距和边框

* **box-sizing**

  border-box 则包含内容区、内边距和边框。

## CSS 优先级

CSS选择器的优先级（ specificity ）决定了哪些样式会应用于元素。优先级计算遵循以下规则：

* ID选择器：优先级最高，计为1个单位。
* 类选择器、属性选择器和伪类选择器：每个计为1个单位。
* 类型选择器和伪元素选择器：每个计为1个单位。
* 通用选择器、组合选择器不增加优先级。

## CSS选择器读取顺序

浏览器读取选择器，遵循的原则是从选择器的右边到左边读取。

**示例**

```css
#block .text p {
  color: red;
}
```

1. 查找所有 P 元素。
2. 查找结果 1 中的元素是否有类名为 text 的父元素。
3. 查找结果 2 中的元素是否有 id 为 block 的父元素。

## position 有哪些值

* **static（默认值）**

  元素按照文档流的位置进行布局，top、right、bottom 和 left 属性对其无效。

  作用：这是默认的布局方式，元素按照它们在文档中的顺序排列，不受定位影响。

* **relative**

  元素仍然保持在文档流中，但可以通过 top、right、bottom 和 left 来调整其位置，相对于其原始位置进行偏移。
  
  作用：通常用于稍微调整元素位置，仍然保留其在文档流中的位置，但可以根据需要调整其位置。

* **absolute**

  元素相对于其最近的已定位（非static）的父元素定位。如果没有已定位的父元素，则相对于文档的 `<html>` 元素进行定位。
  
  作用：将元素从文档流中移除，允许精确地将其定位到容器内的特定位置，通常用于创建浮动的元素。

* **fixed**

  元素相对于浏览器窗口进行定位，滚动页面时不会改变位置。
  
  作用：固定定位常用于创建“粘性”元素，如固定在页面顶部或底部的导航栏。

* **sticky**

  元素根据滚动位置在一段范围内表现为 relative 定位，超过该范围后则表现为 fixed 定位。
  
  作用：常用于创建在页面滚动时保持在可视区域内的元素（例如，固定在视口顶部的导航栏），但在达到某个滚动位置后才开始固定。

## 重绘和重排

**重排（Reflow）**

重排指的是当网页的布局结构发生变化时，浏览器需要重新计算元素的位置和几何属性。以下操作会触发重排：

* **DOM 的变化**

  添加、移除或移动节点。

* **CSS 属性变化**

  改变会影响元素尺寸或位置的 CSS 属性，例如 width、height、padding、margin 等。

* **读取布局属性**

  请求某些依赖于布局的属性（如 offsetHeight、offsetWidth）也会触发重排。

重排的计算量较大，因为它可能影响整个页面的布局。

**重绘（Repaint）**

重绘是指当元素的外观发生改变（但没有改变布局）时，浏览器需要重新绘制这些元素。以下操作通常会导致重绘：

* 改变元素的颜色、背景图像等不影响布局的 CSS 属性。
* 改变元素的可见性，例如通过 visibility 或 opacity。

重绘相对于重排开销较小，因为它不涉及重新计算布局。

**性能优化建议**

* **减少 DOM 操作**

  批量操作 DOM 或使用 documentFragment 可以降低重排和重绘的次数。

* **避免逐个修改样式**

  使用 CSS 类或批量设置样式。

* **使用 CSS3 动画**

  利用 transform 和 opacity 来执行动画，而不是使用 top、left 等会影响布局的属性。

## 介绍下 BFC 及其应用

BFC（块格式化上下文）是一种在CSS中用于处理元素布局和浮动的机制。它在页面布局中起到了“隔离”的作用，使元素内部和外部不相互影响。具体来说，BFC具有以下特点和应用：

* **包含内部浮动元素**

  BFC会包含其内部的浮动元素，从而防止浮动元素溢出其容器。

* **排除外部浮动元素**

  外部的浮动元素不会影响BFC内部的布局。

* **抑制外边距合并**

  BFC可以防止相邻块级元素的外边距合并，从而使布局更加稳定。

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

```html
<style>
div.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<div class="parent">
  <div class="child"></div>
</div>
```

## 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

在CSS中，opacity: 0、visibility: hidden和display: none这三个属性都能使元素不可见，但它们在实际应用中有不同的效果和适用场景。

* `opacity: 0;`

  将元素的透明度设置为0，使其完全透明但仍然占据页面空间，依然会响应事件（如点击）。适用于需要保留元素布局且允许用户通过脚本或动画改变其可见性的场景​​。

* `visibility: hidden;`

  隐藏元素但仍然占据页面空间，且不会响应事件。适用于需要保留元素的布局但不希望用户与之交互的情况，例如暂时隐藏的弹出菜单或工具提示​​。

* `display: none;`

  完全移除元素，不占据任何页面空间，且不响应事件。适用于需要彻底从布局中移除元素的场景，例如根据条件动态展示或隐藏内容​。

* `display: none` 和 `opacity: 0` 是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。`visibility: hidden` 是继承属性，子孙节点消失由于继承了 hidden ，通过设置 `visibility: visible;` 可以让子孙节点显式。

## 如何设计实现无缝轮播

无缝轮播是一种能够在滚动到末尾时自动返回到开头、看起来没有明显断点的轮播效果。这种效果通常用于图片或内容的连续滚动展示。为了实现无缝轮播，通常需要将内容首尾连接起来，确保在视觉上实现无缝过渡。

**实现无缝轮播的基本思路：**

* 复制内容：将轮播的内容进行复制，例如，将图片列表的第一个和最后一个元素分别复制到列表的末尾和开头。这样在切换到末尾或开头时，实际上是在切换到复制的元素上，从而实现无缝效果。

* 监听滚动事件：通过监听轮播容器的滚动事件，当检测到滚动到复制的元素时，瞬间切换回实际的元素位置。这种切换应该是无动画的，用户不会察觉到位置的瞬间变化。

* CSS 和 JavaScript 结合：使用 CSS 进行基础的布局和过渡效果，通过 JavaScript 控制轮播的逻辑和位置切换。

**示例代码：**

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

## 什么是 Retina 屏？如何解决移动端 Retina 屏 1px 像素问题

Retina 屏幕是苹果公司推出的一种高分辨率屏幕技术，主要特点是其像素密度足够高，以至于人眼在正常视距下无法分辨单个像素。这种屏幕技术提高了显示效果，使文字和图像更加锐利和清晰。

在移动端的 Retina 屏幕上，实现1px的像素效果通常会遇到挑战，因为 Retina 屏幕的像素密度远高于普通屏幕，标准的1px边框在 Retina 屏幕上可能会显得过厚。以下是几种解决方法。

* **使用transform属性缩放**

  可以通过CSS的transform属性来缩放边框，使其达到类似1px的效果。例如，使用scaleY(0.5)将1px的边框缩小为0.5px​。

```css
.transform-border-hairline {
  border-bottom: 1px solid #000;
  transform: scaleY(0.5);
}
```

* **使用0.5px边框**

  在支持的浏览器中，可以直接使用0.5px的边框宽度。为确保兼容性，可以检测设备的像素比率，并在支持的设备上应用0.5px边框​。

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

* **使用box-shadow属性**

  通过使用box-shadow属性和扩散半径（spread radius），可以实现类似于1px的细线效果。

```css
.element {
  box-shadow: 0 0 0 0.5px black; /*使用阴影来模拟 0.5px 边框*/
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

栅格格式化上下文（GFC）是通过 `display: grid;` 创建的，用于实现二维的网格布局。GFC能够简化复杂的网页布局，提供更灵活的对齐和排版功能。

**FFC（Flex Formatting Context）**

弹性格式化上下文（FFC）是通过 `display: flex;` 或 `display: inline-flex`创建的。FFC用于实现一维的弹性布局，支持水平和垂直方向上的灵活分配和对齐。与块级布局不同，弹性容器中的浮动、清除和列属性无效。

## flex

* `flex: 0;`

  * `flex-grow: 0;`子项不会增长，即便有多余的空间也不参与分配
  * `flex-shrink: 1;`子项可以缩小以适应容器空间
  * `flex-basis: 0%;`子项的初始大小为 0，但由于没有增长因子，所以最终大小取决于内容或其他定义的大小

* `flex: 1;`

  * `flex-grow: 1;`子项可以增长，并平等地分享多余的空间
  * `flex-shrink: 1;`子项可以缩小以适应容器空间
  * `flex-basis: 0%;`子项的初始大小为 0，但由于有增长因子，子项会尝试占据多余空间

* `flex: auto;`

  * `flex-grow: 1;`子项可以增长，并根据剩余空间分配
  * `flex-shrink: 1;`子项可以缩小以适应容器空间
  * `flex-basis: auto;`子项的初始大小基于其内容或已定义的宽度/高度

flex 默认值为 `flex: 0 1 auto`。

## line-height 如何继承

在 CSS 中，line-height 是一个重要的属性，它用于控制文本行之间的垂直间距。其继承行为可以有些复杂，主要取决于你如何定义 line-height 的值。以下是一些关键点：

* **直接数值（不带单位）**

  当使用不带单位的数值时，这个数值会被视为一个比例因子，而不是一个具体的像素值，例如 `line-height: 1.5;` 表示该元素的行高是其字体大小的 1.5 倍。因此，这种方式定义的 line-height 将在继承时表现为一个比例，适用于所有后代元素。

* **带单位的数值**

  如果使用带单位的数值（如 `line-height: 20px;` 或 `line-height: 1.5em;` ），父元素的计算后的具体数值会被继承，而不是比例。换句话说，子元素继承的是父元素计算后的像素值，而不是原始的 em 或 px 设置。

* **继承行为**

  line-height 属性通常是继承的，这意味着在没有明确定义的情况下，子元素会继承父元素的 line-height。然而，需要注意的是，如果使用 em 单位，计算出的实际值是在父元素的上下文中进行计算的，而非子元素。

## 如何画一条 0.5px 的线

在前端开发中，默认情况下 CSS 的 border 属性无法直接设置为小于 1px 的边框。然而，有一些方法可以模拟或实现类似效果。

* **使用 transform 和 scale 模拟 0.5px 边框**

  CSS 的 border 最小为 1px，但通过使用 transform: scale() 可以模拟细边框效果。

  * 示例

    ```css
    .element {
      border: 1px solid black; /*使用 1px 边框 */
      transform: scale(0.5); /* 缩放到 0.5，视觉上表现为 0.5px 边框 */
      transform-origin: top left; /* 确保缩放从左上角开始*/
    }
    ```

  * 原理

    scale(0.5) 缩小整个元素及其边框，使其看起来像是 0.5px 的边框。

    该方法的缺点是元素的内容也会被缩放。

* **使用 box-shadow 模拟 0.5px 边框**

  另一种常用的技巧是利用 box-shadow 来模拟非常细的边框。box-shadow 不受 border 限制，可以设置比 1px 更小的值。

  * 示例

    ```css
    .element {
      box-shadow: 0 0 0 0.5px black; /*使用阴影来模拟 0.5px 边框*/
    }
    ```

  * 原理

    box-shadow 的最后一个值是阴影的宽度，可以设置为 0.5px，从而模拟一个细边框。

## css 如何开启硬件加速

* **使用 translate3d(0, 0, 0)**

  通过应用 translate3d(0, 0, 0)，浏览器会将该元素提升到一个新的图层，并使用 GPU 进行渲染。这种方式不需要任何 3D 转换的视觉效果，只是简单地强制启用硬件加速。

* **使用 will-change 属性**

  will-change 属性告诉浏览器即将对某些属性进行修改，浏览器会提前优化这些属性。通常，使用 will-change: transform 来优化动画性能。
