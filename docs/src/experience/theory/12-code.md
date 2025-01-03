---
title: 手写代码
description: 手写代码
---

## 节流 <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

```js
function throttle(fn, delay) {
  let activeTime = 0;
  // 箭头函数版本：this 绑定到定义时的上下文，可能导致意外的上下文问题。
  // 普通函数版本：this 动态绑定到调用者，更通用且符合多数使用场景。
  return function (...args) {
    const curTime = Date.now();
    if (curTime - activeTime > delay) {
      fn.apply(this, args); // this 是调用时上下文
      activeTime = curTime;
    }
  };
}

const throttleFn = (msg) => {
  console.log(msg);
};

const throttledFn = throttle(throttleFn, 500);
```

## 防抖 <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

```js
function debounce(fn, delay) {
  let timer = null; // 通过闭包缓存一个定时器id
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const debounceFn = (msg) => {
  console.log(msg);
};

const debouncedFn = debounce(debounceFn, 500);
```

## 模拟实现一个 Promise.all <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

```js
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      // Promise.resolve 确保传入的 promise 是一个 Promise 对象，即使传入的是非 Promise 对象，也会被转化为 Promise。
      Promise.resolve(promise).then(value => {
        results[index] = value;
        completed += 1;
        if (completed === promises.length) {
          resolve(results);
        }
      }).catch(reject);
    });
  });
}

// 挂在到 Promise 上
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
};

// 使用示例
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 1000));
const p3 = Promise.resolve(3);

Promise.myAll([p1, p2, p3]).then(console.log).catch(console.error);
// 输出: [1, 2, 3]

```

## 模拟实现一个 Promise.allSettled <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

```js
function PromiseAllSettled(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
        }).catch((reason) => {
          results[index] = reason;
        }).finally(() => {
          completed += 1;
          if (completed === promises.length) resolve(results);
        })
    })
  })
}
```

## 模拟实现一个 Promise.any <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

```js
function PromiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return reject(new AggregateError([], 'All promises were rejected'));
    const errors = [];
    let failCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((resolve))
        .catch((reason) => {
          failCount += 1；
          errors[index] = reason;
          if (failCount === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'))
          }
        })
    })
  })
}
```

## 模拟实现一个 Promise.race <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

```js
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      // Promise.resolve 确保传入的 promise 是一个 Promise 对象，即使传入的是非 Promise 对象，也会被转化为 Promise。
      Promise.resolve(promise).then(resolve, reject);
    });
  });
}

```

## 模拟实现一个 Promise.finally <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

```js
Promise.prototype.finally = function(callback) {
  const constructor = this.constructor;
  return this.then(
    (value) => constructor.resolve(callback()).then(() => value),
    (reason) => constructor.resolve(callback()).then(() => { throw reason; })
  )
}
```

解释：

* finally 方法不论 Promise 是成功还是失败，都会执行回调 callback。

* 通过 then 方法，在 Promise 成功时返回原始值，在失败时抛出原始错误。

* 使用 constructor.resolve 确保 callback 可以返回一个 Promise 或简单值。

## 实现一个 Retry

```js
function retry(fn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = async (triesLeft) => {
      try {
        const result = await Promise.resolve(fn());
        resolve(result);
      } catch (error) {
        if (triesLeft <= 0) {
          reject(error);
        } else {
          setTimeout(() => attempt(triesLeft - 1), delay);
        }
      }
    };

    attempt(retries);
  });
}

```

## 对象深拷贝

```js
// DFS版
function deepCopyDFS(obj, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) return obj;
  // 如果已经拷贝过，直接返回
  if (map.has(obj)) return map.get(obj);

  const copy = Array.isArray(obj) ? [] : {};
  map.set(obj, copy); // 将原始对象与拷贝对象映射存储

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopyDFS(obj[key], map); // 递归复制
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

## 数组扁平化去并除其中重复部分数据

已知如下数组：
`var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];`

编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组。

```js
const flatenUniqueSortFn = (arr) => Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);
```

## call、apply、bind实现 <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

在JavaScript中，call、apply 和 bind 是用于控制函数内 this 指向的重要方法。理解它们的使用场景和区别对于掌握 JavaScript 的闭包和执行上下文至关重要。

* **call** 和 **apply**
这两个方法都用于立即调用函数，并将 this 绑定到指定的对象。它们的主要区别在于传递参数的方式：

* **call**：参数是逐个传递的，例如 `func.call(thisArg, arg1, arg2)`。
* **apply**：参数作为数组传递，例如 `func.apply(thisArg, [arg1, arg2])`。
这两个方法常用于借用其他对象的方法或者在不同的上下文中执行函数。

* **bind**：不会立即调用函数，而是返回一个新的函数，并永久性地将 this 绑定到指定的对象。这个新函数可以在稍后调用，并且还可以预先传递部分参数。

实现：

```js
// call
Function.prototype.myCall = function(context, ...args) {
  const fnSymbol = Symbol(); // 生成唯一的属性名
  context[fnSymbol] = this; // 将当前函数作为context的一个方法
  const result = context[fnSymbol](...args); // 执行函数
  delete context[fnSymbol]; // 删除临时属性
  return result;
};

// apply
Function.prototype.myApply = function(context, args) {
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

// bind
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};
```

## 实现 new

```js
function _new (fn, ...args) {
  // 创建一个新对象，将原型指向构造函数的原型
  const obj = Object.create(fn.prototype);
  // 调用构造函数，将this绑定到新创建的对象上
  const ret = fn.apply(obj, args);
  // 如果构造函数返回了一个对象，那么返回这个对象，否则返回新创建的对象
  return ret instanceof Object ? ret : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person = myNew(Person, 'Alice', 30);

console.log(person.name); // 输出: Alice
console.log(person.age);  // 输出: 30
console.log(person instanceof Person); // 输出: true

```

## 两个数组合并成一个数组

把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']

```js
function combineArray() {
  const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
  const arr2 = ['A', 'B', 'C', 'D'];
  const ret = [];
  for (let i = 0; i < arr2.length; i++) {
    ret.push(...arr1.slice(2 * i, 2 * (i + 1)));
    ret.push(arr2[i]);
  }
  return ret;
}
```

## 改造下面的代码，使之输出0 - 9，写出你能想到的所有解法

```js
// 题目
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// output: 10 10 10 10 10 10 10 10 10 10 
```

```js
// 答案
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// output: 0 1 2 3 4 5 6 7 8 9
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
var b = 10;
(function (){
  console.log(b);
  b = 20;
})();

// 打印10
```

```js
var b = 10;
(function (){
  b = 20;
  console.log(b);
})();

// 打印20
```

## 使用迭代的方式实现 flatten 函数

```js
const flatten = (arr, ret = []) => {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flatten([...arr[i]], ret);
    } else {
      ret.push(arr[i]);
    }
  }
  return ret;
}

flatten([1,[2,3], [4,5,[6,7,8]]]); // output: [1, 2, 3, 4, 5, 6, 7, 8]
```

## 以下代码输出内容？

```js
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```

```js
undefined
10
20
```

**解析：**

在立即执行函数中，var a = 20; 语句定义了一个局部变量 a，由于js的变量声明提升机制，局部变量a的声明会被提升至立即执行函数的函数体最上方，且由于这样的提升并不包括赋值，因此第一条打印语句会打印undefined，最后一条语句会打印20。

由于变量声明提升，a = 5; 这条语句执行时，局部的变量a已经声明，因此它产生的效果是对局部的变量a赋值，此时window.a 依旧是最开始赋值的10。

## 实现一个 sleep 函数

```js
const sleep = (time) => {
  return new Promise((resolve) => setTimeout(rsolve, time));
}

sleep(1000).then(() => {
  // 这里写你的骚操作
})
```

## 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

[102, 15, 22, 29, 3, 8]

**解析：**

根据MDN上对Array.sort()的解释，默认的排序方法会将数组元素转换为字符串，然后比较字符串中字符的UTF-16编码顺序来进行排序。所以'102' 会排在 '15' 前面。

## 实现 (5).add(3).minus(2) 功能

```js
Number.prototype.add = (n) => this.valueOf() + n;
Number.prototype.minus = (n) => this.valueOf() - n;
```

## 以下代码的执行结果

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x); 
console.log(b.x);
```

```js
undefined
{n: 2};
```

* 1.初始状态

```js
var a = {n: 1}; // a 指向一个对象 {n: 1}
var b = a; // b 也指向同一个对象 {n: 1}
```

* 2.操作链 `a.x = a = {n: 2}`

  * 这行代码涉及到链式赋值，从右到左执行

  * 点的优先级大于等号的优先级

  * `a = {n: 2}`:
    * 这部分操作将 a 重新赋值为一个新的对象 {n: 2}。此时，a 不再指向最初的对象 {n: 1}，而是指向新的对象 {n: 2}。
  
  * `a.x = {n: 2}`:
    * 然而，由于赋值操作是从右到左的，在 a 被重新赋值之前，左边的 a 仍然指向原来的对象 {n: 1}。
    * 所以，实际上 `a.x = a = {n: 2}` 可以拆分为两步：
      * 1、`a.x = {n: 2}`：给最初的对象 `{n: 1}` 添加一个属性 x，其值为新的对象 `{n: 2}`。
      * 2、`a = {n: 2}`：将 a 重新赋值为新的对象 `{n: 2}`

* 3.结果

经过上述操作，a 最终指向的是新的对象 {n: 2}，而 b 仍然指向最初的对象 {n: 1}，但此对象现在具有一个新属性 x，其值为 {n: 2}。

```js
console.log(a.x); // undefined，因为新的对象 `{n: 2}` 没有 `x` 属性。
console.log(b.x); // {n: 2}，因为 `b` 仍然指向最初的对象 `{n: 1}`，且该对象具有 `x` 属性，其值为 `{n: 2}`。
```

## 月度销售额对象转数组

某公司 1 到 12 月份的销售额存在一个对象里面，如下：`{1:222, 2:123, 5:888}`，请把数据处理为如下结构：`[222, 123, null, null, 888, null, null, null, null, null, null, null]`

```js
const fn = (obj) => {
  const ret = new Array(12).fill(null);
  for (let i = 0; i < Object.keys(obj).length; i++) {
    ret[Object.keys(obj)[i] - 1] = obj[Object.keys(obj)[i]];
  }
  return ret;
}
```

## 设计 LazyMan 类，实现以下功能

```js
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```

```js
class LazyManClass {
  constructor(name) {
    this.name = name;
    this.queue = [];
    console.log(`Hi I am ${this.name}`);
    setTimeout(() => {
      this.next();
    }, 0);
  }

  addTask(task) {
    this.queue.push(task);
    return this;
  }

  addFirstTask(task) {
    this.queue.unshift(task);
    return this;
  }

  next() {
    if (this.queue.length) {
      const task = this.queue.shift();
      task();
    }
  }

  eat(food) {
    return this.addTask(() => {
      console.log(`I am eating ${food}`);
      this.next();
    });
  }

  sleep(time) {
    return this.addTask(() => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time * 1000);
    });
  }

  sleepFirst(time) {
    return this.addFirstTask(() => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time * 1000);
    });
  }
}

function LazyMan(name) {
  return new LazyManClass(name);
}

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
```

## 数组变形

随机生成一个长度为 10 的整数类型的数组，例如 `[2, 10, 3, 4, 5, 11, 10, 11, 20]`，将其排列成一个新数组，要求新数组形式如下，例如 `[[2, 3, 4, 5], [10, 11], [20]]`。

```js
// 区间分类

// 得到一个两数之间的随机整数，包括两个数在内
const getRandomIntInclusive = (min, max) => {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil; // 含最大值，含最小值 
};

// 随机生成10个整数数组, 排序, 去重
let initArr = Array.from({ length: 10 }, () => getRandomIntInclusive(0, 99));
initArr = [...new Set(initArr)].sort((a, b) => a - b);

// 放入hash表
const obj = {};
initArr.forEach((i) => {
  const intNum = Math.floor(i / 10);
  if (!obj[intNum]) obj[intNum] = [];
  obj[intNum].push(i);
});

// 输出结果
const resArr = Object.values(obj);
console.log(resArr);
```

## 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 'AbC' 变成 'aBc'

```js
const invertCase = (str) => {
  let ret = '';
  for (let i = 0; i < str.length; i++) {
    if ('a' <= str[i] && 'z' >= str[i]) {
      ret += str[i].toUpperCase();
    }
    if ('A' <= str[i] && 'Z' >= str[i]) {
      ret += str[i].toLowerCase();
    }
  }
  return ret;
}

invertCase('AbC'); // 'aBc'
```

## 实现一个字符串匹配算法，从长度为 n 的字符串 s 中，查找是否存在字符串 t，t 的长度是 m，若存在返回所在位置

```js
const myIndexOf = (s, t) => {
  if (t.length > s.length) return -1;
  for (let i = 0; i <= s.length - t.length; i++) {
    if (s.slice(i, i + t.length) === t) return i;
  }
  return -1;
};
```

## 使用 JavaScript Proxy 实现简单的数据绑定

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Proxy Data Binding</title>
</head>
<body>
  <input type="text" id="input" />
  <div id="output"></div>
</body>
<script>
  const data = {
    text: '',
  };

  const handler = {
    set(target, key, value) {
      target[key] = value;
      docoment.getElementById('output').textContent = value;
      return true; // 在 Proxy 的 handler.set 方法中，返回值是一个布尔值，用于指示是否成功设置属性
    }
  };

  const proxy = new Proxy(data, handler);

  document.getElementById('input').addEventListener('input', () => {
    proxy.text = this.value;
  })
</script>
</html>
```

## 打印出 1 - 10000 之间的所有对称数

> [!TIP]
>
> 例如：121、1331 等

```js
const isPalindrome = (number) => {
  const str = `${number}`;
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
};

const printPalindromeNumbers = () => {
  for (let i = 0; i <= 10000; i++) {
    if (isPalindrome(i)) {
      console.log(i);
    }
  }
};
```

## 请实现一个 add 函数，满足以下功能

```js
add(1); // 1
add(1)(2); // 3
add(1)(2)(3); // 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6
```

```js
const add = (...args) => {
  // 累积和
  let sum = args.reduce((acc, val) => acc + val, 0);

  // 内部函数，用于处理后续调用
  const innerAdd = (...innerArgs) => {
    sum += innerArgs.reduce((acc, val) => acc + val, 0); // 累加新传入的参数
    return innerAdd; // 返回自身以支持链式调用
  };

  // 自定义返回值
  innerAdd.toString = () => sum;
  innerAdd.valueOf = () => sum; // 可选，保证兼容隐式转换

  return innerAdd;
};

// 使用示例
console.log(add(1, 2)(3)(4)); // 10
console.log(add(5)(5)(5)(5)); // 20
console.log(add(10)(20).toString()); // 30

```

## 实现 convert 方法，把原始 list 转换成树形结构

```js
// 原始 list 如下
let list = [
  {id:1,name:'部门A',parentId:0},
  {id:2,name:'部门B',parentId:0},
  {id:3,name:'部门C',parentId:1},
  {id:4,name:'部门D',parentId:1},
  {id:5,name:'部门E',parentId:2},
  {id:6,name:'部门F',parentId:3},
  {id:7,name:'部门G',parentId:2},
  {id:8,name:'部门H',parentId:4}
];
const result = convert(list);

// 转换后的结果如下
let result = [
  {
    id: 1,
    name: '部门A',
    parentId: 0,
    children: [
      {
        id: 3,
        name: '部门C',
        parentId: 1,
        children: [
          {
            id: 6,
            name: '部门F',
            parentId: 3
          }, {
            id: 16,
            name: '部门L',
            parentId: 3
          }
        ]
      },
      {
        id: 4,
        name: '部门D',
        parentId: 1,
        children: [
          {
            id: 8,
            name: '部门H',
            parentId: 4
          }
        ]
      }
    ]
  },
  ···,
];
```

```js
const convertListToTree = (list) => {
  const map = new Map();
  const ret = [];

  for (let i = 0; i < list.length; i++) {
    map.set(list[i].id, {
      ...list[i],
      children: [],
    });
  }

  for (let i = 0; i < list.length; i++) {
    const node = map.get(list[i].id);
    if (node.parentId === 0) {
      ret.push(node);
    } else if (map.has(node.parentId)) {
      map.get(list[i].parentId).children.push(node);
    }
  }

  return ret;
};
```

## 实现模糊搜索结果的关键词高亮显示

```js
const highlight = (str, keyword) => {
  const pattern = new RegExp(keyword, 'g');
  return str.replace(pattern, `<b style=color: #FF0000;>${keyword}</b>`);
};
```

## 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

```js
const tree = [
  {
    id: '1',
    name: '广东省',
    children: [
      {
        id: '11',
        name: '深圳',
        children: [
          {
            id: '111',
            name: '南山区'
          },
          {
            id: '112',
            name: '福田区'
          }
        ]
      }
    ]
  }
]

const value = '112';
const fn = (tree, value) => {
...
}
fn(tree, value) // 输出 [1， 11， 112]
```

```js
const findPathInTree = (tree, value) => {
  const path = [];

  const dfs = (nodes, target) => {
    for (let i = 0; i < nodes.length; i++) {
      path.push(nodes[i].id);
      if (nodes[i].id === target) return path;
      if (nodes[i].children) {
        const result = dfs(nodes[i].children, target);
        if (result.length > 0) return result;
      }
      path.pop();
    }
    return [];
  };

  return dfs(tree, value);
};
```

## 返回 Int 逆序后的字符串

> [!TIP]
>
> 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。输入函数必须只有一个参数传入，必须返回字符串。

```js
const reverseInt = (n) => {
  // 将整数转化为字符串
  const str = `${n}`;
  
  return str.split('').reverse().join('');
};

// 示例调用
console.log(reverseInt(1234)); // 输出 "4321"
```

## 请写出如下代码的打印结果

```js
function Foo() {
  Foo.a = function() {
      console.log(1)
  }
  this.a = function() {
      console.log(2)
  }
}
Foo.prototype.a = function() {
  console.log(3)
}
Foo.a = function() {
  console.log(4)
}
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
```

输出内容为：

```js
4
2
1
```

分析：

```js
function Foo() {
  Foo.a = function() {
    console.log(1)
  }
  this.a = function() {
    console.log(2)
  }
}
// 以上只是 Foo 的构建方法，没有产生实例，此刻也没有执行

Foo.prototype.a = function() {
  console.log(3)
}
// 现在在 Foo 上挂载了原型方法 a ，方法输出值为 3

Foo.a = function() {
  console.log(4)
}
// 现在在 Foo 上挂载了直接方法 a ，输出值为 4

Foo.a();
// 立刻执行了 Foo 上的 a 方法，也就是刚刚定义的，所以
// # 输出 4

let obj = new Foo();
/* 这里调用了 Foo 的构建方法。Foo 的构建方法主要做了两件事：
1. 将全局的 Foo 上的直接方法 a 替换为一个输出 1 的方法。
2. 在新对象上挂载直接方法 a ，输出值为 2。
*/

obj.a();
// 因为有直接方法 a ，不需要去访问原型链，所以使用的是构建方法里所定义的 this.a，
// # 输出 2

Foo.a();
// 构建方法里已经替换了全局 Foo 上的 a 方法，所以
// # 输出 1
```

## EventBus <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

```js
class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).push(listener);
    } else {
      this.events.set(event, [listener]);
    }
  }

  off(event, listener) {
    if (!this.events.has(event)) return;
    this.events.set(event, this.events.get(event).filter((l) => l !== listener));
  }
  offAll(event) {
    if (this.events.has(event)) {
      this.events.delete(event);
    }
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return;
    this.events.get(event).forEach((l) => l.apply(this, args));
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener.apply(this, args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}
```

## 实现一个 instanceOf

在 JavaScript 中，instanceof 运算符用于检测对象是否是某个构造函数的实例。要实现一个自定义版本的 instanceof，需要依赖于对象的原型链。具体实现原理是：检查构造函数的 prototype 是否在目标对象的原型链上。

### instanceof 实现原理

instanceof 会依次查找对象的原型链，直到找到 constructor 的原型为止。如果找到了，返回 true，否则返回 false。

```js
function myInstanceOf(obj, constructor) {
  // 获取obj的原型
  let prototype = Object.getPrototypeOf(obj);

  // 一直向上查找原型链，直到找到构造函数的 prototype
  while (prototype) {
    if (prototype === constructor.prototype) return true;
    prototype = Object.getPrototypeOf(prototype);
  }

  return false;
}
```

### 解释

* Object.getPrototypeOf(obj) 获取 obj 的原型。
* 循环检查 obj 的原型链，直到找到匹配的构造函数的 prototype。
* 如果没有找到，最终返回 false。

### 使用

```js
function Person(name) {
  this.name = name;
}

const john = new Person('John');

console.log(myInstanceOf(john, Person)); // true
console.log(myInstanceOf(john, Object)); // true
console.log(myInstanceOf(john, Array)); // false
```

## 实现 reduce

```js
Array.prototype.myReduce = (callback, initial) => {
  let accu = initial;

  let startIndex = 0;

  if (accu === undefined) {
    accu = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    accu = callback(accu, this[i], i, this);
  }

  return accu;
};
```

## 带并发的异步调度器 Scheduler <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

JS 实现一个带并发限制的异度调度器 Scheduler，保证同时运行的任务最多有两个。完善下面代码中的 Scheduler 类，使得以下程序能正确输出。

```js
class Scheduler {
  constructor(limit) {
    this.limit = limit;  // 并发任务的最大数量
    this.queue = [];      // 任务队列
    this.running = 0;     // 当前正在执行的任务数量
  }

  // 添加任务
  addTask(promiseCreator) {
    return new Promise((resolve, reject) => {
      const task = () => {
        promiseCreator().then(resolve).catch(reject).finally(() => {
          this.running--;  // 当前任务执行完后减少计数
          this._next();    // 执行下一个任务
        });
      };
      this.queue.push(task);
      this._next();  // 每添加一个任务，检查是否可以执行
    });
  }

  // 执行任务
  _next() {
    if (this.running < this.limit && this.queue.length) {
      const task = this.queue.shift();  // 从队列中取出一个任务
      this.running++;  // 增加正在执行的任务数量
      task();          // 执行任务
    }
  }
}
```

## 在输入框中如何判断输入的是一个正确的网址

```js
const isUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}
```

## 写出如下代码的打印结果

```js
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);

```

```js
// 这里把o改成a
// webSite引用地址的值copy给a了
function changeObjProperty(a) {
  // 改变对应地址内的对象属性值
  a.siteUrl = "http://www.baidu.com"
  // 变量a指向新的地址 以后的变动和旧地址无关
  a = new Object()
  a.siteUrl = "http://www.google.com"
  a.name = 456
} 
var webSite = new Object();
webSite.name = '123'
changeObjProperty(webSite);
console.log(webSite); // {name: 123, siteUrl: 'http://www.baidu.com'}

// http://www.baidu.com
```

## 手写倒计时 <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

```html
<template>
  <div>
    <h1>{{ time }}秒</h1>
    <button @click="togglePause">{{ isPaused ? '继续' : '暂停' }}</button>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const time = ref(60);  // 初始倒计时 60秒
    const isPaused = ref(false);  // 是否暂停
    let timer = null;

    // 启动倒计时
    const startTimer = () => {
      if (!isPaused.value && time.value > 0) {
        timer = setInterval(() => {
          time.value--;
          if (time.value <= 0) {
            clearInterval(timer);  // 倒计时结束时清除定时器
          }
        }, 1000);
      }
    };

    // 切换暂停和继续
    const togglePause = () => {
      if (isPaused.value) {
        // 恢复倒计时
        isPaused.value = false;
        startTimer();
      } else {
        // 暂停倒计时
        isPaused.value = true;
        clearInterval(timer); // 停止当前定时器
      }
    };

    onMounted(() => {
      startTimer();  // 组件加载时开始倒计时
    });

    onBeforeUnmount(() => {
      clearInterval(timer);  // 清理定时器，避免组件卸载后依然运行
    });

    return {
      time,
      isPaused,
      togglePause,
    };
  },
};
</script>

```

## 图片懒加载

```html
<template>
  <div>
    <h1>Vue 图片懒加载示例</h1>
    <div v-for="n in 10" :key="n" style="margin-bottom: 20px;">
      <img
        ref="lazyImages"
        :data-src="`https://via.placeholder.com/600x400?text=Image+${n}`"
        alt="Lazy Image"
        style="width: 100%; height: auto; background: #f0f0f0;"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      observer: null, // IntersectionObserver 实例
    };
  },
  mounted() {
    // 获取所有的图片元素
    const images = this.$refs.lazyImages;

    // 初始化 IntersectionObserver
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src; // 获取 data-src 属性中的真实图片 URL
          if (src) {
            img.src = src; // 设置图片 src
            this.observer.unobserve(img); // 加载后停止观察
          }
        }
      });
    });

    // 对每个图片元素进行观察
    images.forEach((img) => this.observer.observe(img));
  },
  beforeUnmount() {
    // 组件销毁时，清理 observer
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>

```

核心逻辑解析：

1. **ref 获取图片元素：**

* 使用 ref="lazyImages" 获取所有的图片 DOM 元素。

2. **data-src 保存真实图片 URL：**

* 避免页面初始加载时直接加载所有图片。

3. **使用 IntersectionObserver：**

IntersectionObserver 是一种浏览器 API，用于异步观察目标元素与祖先元素（或视口）交集的变化。

* 观察图片是否进入视口。
* 如果进入视口，则将 data-src 的值赋给 src。

4. **销毁组件时清理资源：**

* 在 beforeUnmount 中调用 disconnect() 方法释放 IntersectionObserver。

## 版本号排序

```js
const compareVersion = (version1, version2) => {
  const v1 = version1.split('.').map(Number);  // 将版本号分割并转换为数字
  const v2 = version2.split('.').map(Number);  // 同上

  // 逐个比较版本号的各个部分
  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    const num1 = v1[i] || 0;  // 如果没有该部分，默认值为0
    const num2 = v2[i] || 0;  // 同上

    if (num1 > num2) return 1;   // version1 更大
    if (num1 < num2) return -1;  // version2 更大
  }

  return 0; // 版本号相等
};

const sortVersions = (versions) => versions.sort(compareVersion);

// 测试用例
const versions = ['0.0.1', '0.2.2', '1.0.0', '0.1.2'];
const sortedVersions = sortVersions(versions);
console.log(sortedVersions);  // ['0.0.1', '0.1.2', '0.2.2', '1.0.0']
```

## 实现 lodash 的 get 方法

```js
function get(obj, path, defaultValue) {
  // 确保 path 是数组形式
  const keys = Array.isArray(path) ? path : path.replace(/\[(\d+)]/g, '.$1').split('.');
  let result = obj;

  for (const key of keys) {
    if (result == null || !(key in result)) {
      return defaultValue;
    }
    result = result[key];
  }

  return result === undefined ? defaultValue : result;
}

// 测试示例
const data = {
  user: {
    name: 'John',
    address: {
      city: 'New York',
      zip: {
        code: 12345,
      },
    },
    friends: ['Mike', 'Sara'],
  },
};

console.log(get(data, 'user.name', 'default'));         // 输出: 'John'
console.log(get(data, 'user.address.city', 'default')); // 输出: 'New York'
console.log(get(data, 'user.address.zip.code', 0));     // 输出: 12345
console.log(get(data, 'user.age', 30));                // 输出: 30
console.log(get(data, 'user.friends[1]', 'none'));      // 输出: 'Sara'
console.log(get(data, ['user', 'address', 'city'], 'default')); // 输出: 'New York'
console.log(get(data, 'user.friends[2]', 'none'));      // 输出: 'none'

```

## 如何判断一个对象是否为 Promise 对象

```js
function isPromise(obj) {
  return (
    obj instanceof Promise ||
    (obj !== null && typeof obj === 'object' && typeof obj.then === 'function')
  );
}
```

## 写一个模板引擎

```js
class RuleEngine {
  constructor(template) {
    this.template = template;
  }

  /**
   * 渲染模板
   * @param {Object} context - 上下文数据，用于替换模板变量和计算表达式
   * @returns {string} 渲染后的模板字符串
   */
  render(context) {
    return this.template.replace(/\{\{(.*?)\}\}/g, (_, expression) => {
      try {
        // 创建一个新的函数，将上下文传入作用域，执行表达式
        const func = new Function(...Object.keys(context), `return ${expression.trim()};`);
        return func(...Object.values(context));
      } catch (error) {
        console.error(`Error evaluating expression: "${expression}"`, error);
        return `{{${expression}}}`; // 返回原始表达式以指示失败
      }
    });
  }
}

```
