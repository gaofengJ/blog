---
title: 集合引用类型
description: javaScript
---

# 集合引用类型

## 检测数组

只用instanceof和isArray都可以检测一个对象是不是数组。

```js
value instanceof Array

Array.isArray(value)
```

使用 instanceof 的问题是假定只有一个全局执行上下文。如果网页里有多个框架，则可能涉及两个不同的全局执行上下文，因此就会有两个不同版本的 Array 构造函数。如果要把数组从一个框架传给另一个框架，则这个数组的构造函数将有别于在第二个框架内本地创建的数组。

## 数组方法

### 迭代器方法

```js
array.keys()
array.values()
array.entries()
```

### 复制和填充方法

```js
array.fill()
array.copyWithin()

const zeroes = [0, 0, 0, 0, 0];
// 用 7 填充索引大于等于 1 且小于 3 的元素
zeroes.fill(7, 1, 3);
console.log(zeroes); // [0, 7, 7, 0, 0];
zeroes.fill(0); // 重置

const ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// 从 ints 中复制索引 5 开始的内容，插入到索引 0 开始的位置
ints.copyWithin(0, 5);
console.log(ints); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
```

### 转换方法

```js
array.toLocaleString()
array.toString()
array.valueOf()

// valueOf()返回的还是数组本身
// toString()返回由数组中每个值的等效字符串拼接而成的一个逗号分隔的字符串。对数组的每个值都会调用其 toString()方法，
```

### 栈方法

```js
array.push()
array.pop()
```

### 队列方法

```js
array.shift()
array.push()

array.unshift()
array.pop()
```

### 排序方法

```js
array.reverse()
array.sort()
```

### 操作方法

```js
array.concat()
array.slice()
array.splice()
```

### 搜索和位置方法

```js
// 严格相等
array.indexOf()
array.lastIndexOf()
array.includes()

// 断言函数
array.find()
array.findIndex()
```

### 迭代方法

```js
array.every()
array.filter()
array.forEach()
array.map()
array.some()
```

### 归并方法

```js
array.reduce()
array.reduceRight()
```

## Map和WeakMap

Map 是一种新的集合类型，为这门语言带来了真正的键/值存储机制。Map 的大多数特性都可以通过 Object 类型实现，但二者之间还是存在一些细微的差异。

WeakMap 是 Map 的“兄弟”类型，其 API 也是 Map 的子集。WeakMap 中的“weak”（弱），描述的是 JavaScript 垃圾回收程序对待“弱映射”中键的方式。WeakMap 中“weak”表示弱映射的键是“弱弱地拿着”的。意思就是，这些键不属于正式的引用，不会阻止垃圾回收。

## Set和WeakSet

Set 是一种新集合类型，为这门语言带来集合数据结构。

WeakSet 是 Set 的“兄弟”类型，其 API 也是 Set 的子集。WeakSet 中的“weak”（弱），描述的是 JavaScript 垃圾回收程序对待“弱集合”中值的方式
