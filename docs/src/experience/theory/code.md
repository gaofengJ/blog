---
title: 手写代码
description: 手写代码
---

## 节流

```js
function throttle(fn, delay) {
  let activeTime = 0;
  return (...args) => {
    const curTime = Date.now();
    if (curTime - activeTime > delay) {
      fn.apply(this, args); // 使用箭头函数时，this 的值从它定义的位置继承，而不是调用它的位置。如果不使用 apply 或 call，this 的值可能会变得不一致，从而导致意外行为
      activeTime = curTime;
    }
  };
}
```

## 防抖

```js
function debounce(fn, delay = 100) {
  // 通过闭包缓存一个定时器id
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```
