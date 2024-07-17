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

## 算法手写题

已知如下数组：
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```js
const fn = (arr) => {
  return Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);
}
```

## 实现 new

```js
function _new (fn, ...args) {
  // 创建一个新对象，将原型指向构造函数的原型
  const obj = Object.create(fn.prototype);
  // 调用构造函数，将this绑定到新创建的对象上
  const ret = fn.apply(obj, args);
  // 如果构造函数返回了一个对象，那么返回这个对象，否则返回新创建的对象
  return ret instanceof Objet ? ret : obj;
}
```

## 两个数组合并成一个数组

把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']

```js
const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
const arr2 = ['A', 'B', 'C', 'D'];
const result = [];
for (let i = 0; i < arr2.length; i++) {
  result.push(...arr1.slice(i * 2, i * 2 + 2), arr2[i]);
}
```

## 改造下面的代码，使之输出0 - 9，写出你能想到的所有解法

```js
// 题目
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000)
}
```

```js
// 答案
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000)
}
```

## 下面的代码打印什么内容

```js
var b = 10;
(function b(){
  b = 20;
  console.log(b); 
})();
```

打印结果内容如下：

```js
ƒ b() {
b = 20;
console.log(b)
}
```

原因：**在非匿名自执行函数中，函数变量为只读状态无法修改；**

## 简单改造下面的代码，使之分别打印 10 和 20

```js
// 题目
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```

```js
// 打印10
var b = 10;
(function (){
  console.log(b);
  b = 20;
})();
```

```js
// 打印20
var b = 10;
(function (){
  b = 20;
  console.log(b);
})();
```
