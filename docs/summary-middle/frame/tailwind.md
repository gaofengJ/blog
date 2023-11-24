---
title: tailwind使用
description: tailwind使用
---

[tailwind官网](https://tailwind.nodejs.cn/)

## 踩坑

### 引入tailwind后，antd样式失效

原因：
tailwind默认会添加一些基础样式，会覆盖antd的基础样式

解决方法：
在tailwind中添加以下代码：

```js
module.exports = {
  corePlugins: {
    preflight: false,
  },
};
```

### tailwind默认单位为rem，改为px

```js
module.exports = {
  theme: {
    spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
      map[index] = `${index}px`;
      return map;
    }, {}),
  }
};
```

### 如何使用calc

```html
<div class="h-[calc(100%-1px)]"></div>
```

### 避免使用伪元素
