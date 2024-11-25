---
title: 手写代码
description: 手写代码
---

## 节流

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

## 防抖

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

## 模拟实现一个 Promise.all

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

```

## 模拟实现一个 Promise.race

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

## 模拟实现一个 Promise.finally

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

## 数组扁平化去并除其中重复部分数据

已知如下数组：
`var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];`

编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组。

```js
const flatenUniqueSortFn = (arr) => Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);
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

## 设计 LazyMan 类，实现以下功能(略过)

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
    this.taskList = [];
    console.log(`Hi I am ${this.name}`);
    setTimeout(() => {
      this.next();
    }, 0);
  }

  eat(str) {
    const that = this;
    const fn = ((str) => {
      return () => {
      console.log(`I am eating ${str}`);
      that.next();
      }
    })(str);
    this.taskList.push(fn);
    return this;
  }

  sleep(time) {
    const that = this;
    const fn = ((time) => {
      return () => {
        setTimeout(() => {
          console.log(`等待了${time}秒...`);
          that.next();
        }, time * 1000);
      };
    })(time);
    this.taskList.push(fn);
    return this;
  }

  sleepFirst(time) {
    const that = this;
    const fn = ((time) => {
      return () => {
        setTimeout(() => {
          console.log(`等待了${time}秒...`);
          that.next();
        }, time * 1000);
      };
    })(time);
    this.taskList.unshift(fn);
    return this;
  }

  next() {
    const fn = this.taskList.shift();
    fn && fn();
  }
}

function LazyMan(name) {
  return new LazyManClass(name);
}

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
```

## 数组变形(略过)

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

## 请实现一个 add 函数，满足以下功能(略过)

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
  const sum = args.reduce((acc, val) => acc + val, 0);

  const innerAdd = (...innerArgs) => add(sum + innerArgs.reduce((acc, val) => acc + val, 0));

  innerAdd.valueOf = () => sum;
  innerAdd.toString = () => sum.toString();

  return innerAdd;
};
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

## EventBus

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

## 带并发的异步调度器 Scheduler

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
