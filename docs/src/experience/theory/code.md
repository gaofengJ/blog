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

## 冒泡排序如何实现，时间复杂度是多少， 还可以如何改进

冒泡排序的时间复杂度为 log(n^2)

```js
// 冒泡排序
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  console.log(arr);
}

// 改良版
function bubbleSort(arr) {
  let n = arr.length;
  let swapped = true; // 当前遍历是否发生了交换

  while (swapped) {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    n--; // 减少比较的范围
  }

  console.log(arr);
}
```

## 快速排序如何实现，时间复杂度是多少， 还可以如何改进

```js
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

快速排序的时间复杂度取决于基准选择的情况：

* 最佳情况：每次基准将数组均匀分割，递归深度为 O(log n)，每一层的比较操作是 O(n)，所以整体时间复杂度为 O(n log n)。

* 平均情况：通常假设基准每次都能将数组分为两个大致相等的部分，因此时间复杂度为 O(n log n)。

* 最坏情况：当基准选取不均衡时，可能导致递归的深度达到 O(n)，比如每次选取的基准总是最大或最小的元素。此时时间复杂度为 O(n²)。

## 手写代码

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

## 给定两个数组，写一个方法来计算它们的交集

```js
const intersect = (nums1, nums2) => {
  const obj = {};
  for (let i = 0; i < nums1.length; i++) {
    obj[nums1[i]] = (obj[nums1[i]] || 0) + 1;
  }
  const ret = [];
  for (let i = 0; i < nums2.length; i++) {
    if (obj[nums2[i]]) {
      ret.push(nums2[i]);
      obj[nums2[i]]--;
    }
  }
  return ret;
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

## 数组编程题

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
const fn = (str) => {
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
```

## 实现一个字符串匹配算法，从长度为 n 的字符串 s 中，查找是否存在字符串 t，t 的长度是 m，若存在返回所在位置

```js
const findIndex = (s, t) => {
  if (s.length < t.length) return -1;
  for (let i = 0; i < s.length - t.length; i++) {
    if (s.slice(i, i + t.length) === t) return i;
  }
  return -1;
}
```

## 使用 JavaScript Proxy 实现简单的数据绑定

```html
<!DOCTPE html>
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
      return true;
    }
  };

  const proxy = new Proxy(data, handler);

  document.getElementById('input').addEventListener('input', () => {
    proxy.text = this.value;
  })
</script>
</html>
```

## 轮转数组

给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

```js
const reverse = (nums, left, right) => {
  while (left < right) {
    const temp = nums[left];
    nums[left] = nums[right];
    nums[right] = temp;
    left++;
    right--;
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  const len = nums.length;
  k = k % len;
  reverse(nums, 0, len - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, len - 1);
  return nums;
};
```

## 打印出 1 - 10000 之间的所有对称数

> [!TIP]
>
> 例如：121、1331 等

```js
const isSymmetric = (num) => {
  const str = `${num}`;
  let reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
}

const printSymmetricNumbers = () => {
  for (let i = 1; i <= 10000; i++) {
    if (isSymmetric(i)) {
      console.log(i);
    }
  }
}
```

## 移动0

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

> [!TIP]
>
> 输入: [0,1,0,3,12]<br />
> 输出: [1,3,12,0,0]<br />
> 说明:<br />
> 必须在原数组上操作，不能拷贝额外的数组。<br />
> 尽量减少操作次数。

```js
const moveZeroes = (nums) => {
  let index = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[index] = nums[i];
      index++;
    }
  }

  for (let i = index; i < nums.length; i++) {
      nums[i] = 0;
  }

  return nums;
}
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
  const sum = args.reduce((acc, val) => acc + val, 0);

  const innerAdd = (...innerArgs) => add(sum + innerArgs.reduce((acc, val) => acc + val, 0));

  innerAdd.valueOf = () => sum;
  innerAdd.toString = () => sum.toString();

  return innerAdd;
};
```

## 两数之和

```js
var twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    } else {
      map.set(nums[i], i);
    }
  }
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
const convert = (list) => {
  const map = {};
  const result = [];

  list.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  list.forEach(item => {
    if (item.parentId === 0) {
      result.push(map[item.id]);
    } else {
      if (map[item.parentId]) {
        map[item.parentId].children.push(map[item.id]);
      }
    }
  });

  return result;
}
```

## 实现模糊搜索结果的关键词高亮显示

```js
const fn = () => {
  const keyword = '关键字';
  const panter = new RegExp(keyword, 'g')
  return str.replace(panter, '<b style="color: #2D7BFF">' + keyword + '</b>')
}
```

## 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

```js
[
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

const value = '112'
const fn = (value) => {
...
}
fn(value) // 输出 [1， 11， 112]
```

```js
const fn = (arr, value) => { 
  const findPath = (nodes, target, path = []) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const newPath = [...path, node.id];
      if (node.id === target) {
        return newPath;
      }
      if (node.children) {
        const result = findPath(node.children, target, newPath);
        if (result) return result;
      }
    }
    return [];
  }

  return findPath(arr, value);
}
```

## 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))

> [!TIP]
>
> nums1 = [1, 3]
> nums2 = [2]
> 输出 2

```js
function qSort(arr) {
  if (arr.length <= 1) return arr;
  const left = [];
  const right = [];
  const pivot = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return qSort(left).concat(pivot, qSort(right));
}

const findMedianSortedArrays = (nums1, nums2) => {
  let nums = nums1.concat(nums2);
  nums = qSort(nums);
  const len = nums.length;
  const midIndex = Math.floor(len / 2);
  if (len % 2) {
    return nums[midIndex];
  }
  return ((nums[midIndex - 1]) + nums[midIndex]) / 2;
```

## 模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  const result = Array.isArray(obj) ? [] : {};
  hash.set(obj, result);

  const symKeys = Object.getOwnPropertySymbols(obj);
  if (symKeys.length) {
    symKeys.forEach(symKey => {
      result[symKey] = typeof obj[symKey] === 'object' ? deepClone(obj[symKey], hash) : obj[symKey];
    });
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = typeof obj[key] === 'object' ? deepClone(obj[key], hash) : obj[key];
    }
  }

  return result;
}
```

## 算法题

> [!TIP]
>
> 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

```js
const reverseInt = (n) => {
  // 将整数转化为字符串
  const str = n.toString();
  
  // 基本情况：如果字符串长度为 1，则直接返回它
  if (str.length === 1) {
      return str;
  }
  
  // 递归调用：取字符串的最后一个字符，加上剩余部分递归处理的结果
  return str.slice(-1) + reverseInt(parseInt(str.slice(0, -1)));
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

## EventMitter

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (typeof event !== 'string') {
      throw new TypeError('Event name must be a string');
    }
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener.apply(this, args));
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener.apply(this, args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  getListenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
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
    if (prototype === constructor.prototype) {
      return true;
    }
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

## 实现 flat

```js
function myFlat(arr, depth = 1) {
  let result = [];

  arr.forEach(item => {
    if (Array.isArray(item) && depth > 0) {
      // 递归展开，减少深度
      result = result.concat(myFlat(item, depth - 1));
    } else {
      result.push(item);
    }
  });

  return result;
}
```

## 实现 reduce

```js
function myReduce(arr, callback, initialValue) {
  let accumulator = initialValue;

  // 如果没有提供 initialValue，则使用数组的第一个元素作为初始值
  let startIndex = 0;
  if (accumulator === undefined) {
    accumulator = arr[0];
    startIndex = 1;
  }

  // 从 startIndex 开始遍历数组，应用回调函数
  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }

  return accumulator;
}
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
