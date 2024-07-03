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

## 对象深拷贝

```js
// DFS版
function deepCopyDFS(obj, map = new Map()) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (map.has(obj)) return map.get(obj);

  const copy = Array.isArray(obj) ? [] : {};
  map.set(obj, copy);

  for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
          copy[key] = deepCopyDFS(obj[key], map);
      }
  }
  return copy;
}

// BFS版
function deepCopyBFS(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  const root = Array.isArray(obj) ? [] : {};
  const queue = [{ original: obj, copy: root }];
  const map = new Map();
  map.set(obj, root);

  while (queue.length) {
    const { original, copy } = queue.shift();
    
    for (const key in original) {
      if (original.hasOwnProperty(key)) {
        const value = original[key];
        if (typeof value === 'object' && value !== null) {
          if (!map.has(value)) {
            const newCopy = Array.isArray(value) ? [] : {};
            map.set(value, newCopy);
            queue.push({ original: value, copy: newCopy });
          }
          copy[key] = map.get(value);
        } else {
          copy[key] = value;
        }
      }
    }
  }
  return root;
}
```
