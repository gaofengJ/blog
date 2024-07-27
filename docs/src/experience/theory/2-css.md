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
