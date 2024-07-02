---
title: 手写代码
description: 手写代码
---

## 节流
```js
function throttle(fn, delay) {
  let timer;
  return (...args) => {
    if (timer) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  }
}
```

## 防抖

```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  }
}
```