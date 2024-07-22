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
