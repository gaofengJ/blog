---
title: JavaScript
description: JavaScript
---

# JavaScript 面试题

## `['1', '2', '3'].map(parseInt)`的输出值是什么？

输出结果为：`[1, NaN, NaN]`。

**原因：**

回调函数 parseInt 接收两个参数：要解析的字符和基数（进制）。

map 传递给 parseInt 的参数包括当前元素的值，当前元素的索引和数组本身。

* 第一次调用：`parseInt('1', 0, arr)` 会将字符串 '1' 解析为整数 1（在 radix 为 undefined 或者 radix 为 0 且 字符串不是以 '0x' 或者 '0X' 开头的情况下，基数为 10）

* 第二次调用：`parseInt('1', 1, arr)` 中基数 1 是无效的，因为基数应该在 2~36之间，所以返回 NaN

* 第三次调用：`parseInt('1', 2, arr)` 中基数 2 也是无效的，同样返回 NaN

**扩展：**

* `['10','10','10','10','10'].map(parseInt)` 返回值为 `[10, NaN, 2, 3, 4]`

* `parseInt('10', 2)` 中的基数为 2 的解释：
在这种情况下，字符串 '10' 是一个有效的二进制数。在二进制中，10 表示十进制中的数字 2。因此，parseInt('10', 2) 会成功地将二进制字符串 '10' 解析为整数 2。

## 防抖和节流的区别？如何实现？

防抖（Debounce）和节流（Throttle）是用来控制函数调用频率的两种常见技术，特别在处理频繁触发的事件（比如滚动、resize、输入框输入等）时很有用。

* 防抖（Debounce）：

  * 当事件触发后，等待一定的时间间隔，如果在这个时间间隔内再次触发了相同事件，则重新计时。直到事件触发的间隔超过设定的时间间隔后，才真正执行该事件的处理函数。

  * **适合场景**：如搜索框输入联想，用户输入停顿后再进行搜索

* 节流（Throttle）：

  * 当事件触发后，首先执行事件处理函数，然后在指定的时间间隔内不响应新的事件触发。只有间隔超过设定的时间间隔后，才会再次触发执行事件处理函数。

  * **适合场景**：如页面滚动事件，控制一定时间内只触发一次加载数据的操作

* 区别：

  * **执行时间点不同**：防抖是在事件停止触发后等待一段时间后执行最后一次触发的事件处理函数；节流是在指定时间间隔内执行事件处理函数，并且该时间间隔内不响应新的事件触发。

  * 适用场景不同：防抖适合减少频繁事件的触发，如输入框搜索建议；节流适合控制事件的频率，如滚动事件加载数据。

## Set、Map、WeakSet 和 WeakMap 的区别

* Set

存储唯一值的集合，无重复元素。
可以包含任何类型的值，无论是原始值还是对象引用。
方法包括 `add(value)、delete(value)、has(value)、clear() 和 size`。

* WeakSet:

存储对象引用的集合，不能包含原始值（例如 `int、boolean、string`）。
对象引用是弱引用，即如果没有其他引用指向该对象，则对象可以被垃圾回收。
没有 `clear()` 方法，也没有 `size` 属性，因为对象可能随时被回收。

* Map:

存储键值对的集合，键和值可以是任何类型。
保持键的插入顺序。
方法包括 `set(key, value)、get(key)、delete(key)、has(key) 和 size`。

* WeakMap:

类似于 Map，但键必须是对象，而不是原始值。
键是弱引用，如果没有其他引用指向该对象，则键和值可以被垃圾回收。
没有 `clear()` 方法，也没有 `size` 属性，因为键值对可能随时被回收。

## ES5/ES6中继承的区别

* 语法糖

ES6中的类(class)语法主要是对ES5原型继承(prototype-based inheritance)的一种语法糖。尽管两者在底层实现上是相同的，但类语法提供了一种更简洁和直观的方式来定义继承。

* 严格模式

ES6类中的所有代码都在严格模式下运行，即使你没有显式地启用严格模式。这样可以避免一些常见的错误，如意外创建全局变量​。

* 构造函数强制使用 `new` 关键字

在ES6中，类的构造函数必须使用new关键字调用，否则会抛出错误。在ES5中，构造函数可以不使用new关键字，这可能会导致意外的结果。

* 方法的不可枚举性

ES6类中的方法是不可枚举的，这意味着它们不会出现在for...in循环中。这与ES5不同，在ES5中，必须手动设置方法的不可枚举性。

* 静态方法和实例方法的定义

在ES6中，可以很方便地在类中定义静态方法和实例方法，并且静态方法会绑定在类的构造函数上，而不是实例上。这在ES5中需要更多的代码来实现。

* `super`关键字

ES6引入了super关键字，用于调用父类的构造函数和方法，这使得继承关系中的方法调用变得更加直观和简单。在ES5中，需要通过`Function.call`或`Function.apply`来实现类似的功能。

## setTimeout、Promise、Async/Await 的区别

* setTimeout
  * 作用：用于延迟执行代码
  * 特性：
    * 创建一个任务，在执行时间后执行
    * 不会阻塞后续代码执行
    * 属于宏任务（Macrotask）

* Promise
  * 作用：用于处理异步操作
  * 特性：
    * 不依赖于具体的时间延迟
    * 用于链式调用，避免回调地狱
    * 创建微任务（Microtask），优先级高于宏任务

* async/await
  * 作用：用于简化基于Promise的代码，使其看起来像同步代码
  * 特性：
    * async函数会返回一个Promise
    * await会等待Promise resolve 或 reject，并返回其解决值
    * 使代码更加易读和调试，尤其在复杂的异步流程中

## async/await 如何通过同步的方式实现异步

async/await 使异步代码看起来像同步代码，但它实际上并不会使代码变得同步。它只是通过暂停函数的执行来等待异步操作的完成，然后继续执行。这种机制让你能够写出类似于同步代码的异步代码，而不需要回调地狱或复杂的 Promise 链。

在实际操作中，await在遇到一个Promise时会暂停函数的执行，直到该Promise解决为止。这种暂停并不会阻塞事件循环或阻止其他代码的执行。例如，当你在一个循环中使用await时，函数会一个接一个地等待每个Promise的解决，而不是同时发送多个请求。

## JavaScript的事件循环机制

首先明确几个概念：

### 任务队列

* js 分为同步任务和异步任务
* 同步任务都在主线程上执行，形成一个执行栈
* 主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果，就会在任务队列中放置一个事件
* 一旦执行栈中的所有同步任务执行完毕（此时 js 引擎空闲），系统就会读取任务队列，将可运行的异步任务添加到可执行栈中，开始执行。

根据规范，事件循环是通过任务队列的机制来进行协调的。一个 Event Loop 中，可以有一个或多个任务队列（task queue），一个任务队列便是一系列有序任务（task）的集合；每个任务都有一个任务源（task source），源自同一个任务源的task必须放在同一个任务队列，从不同源来的则被添加到不同队列。setTimeout/Promise等API便是任务源，而进入任务队列的是他们指定的具体执行任务。

### 宏任务

macrotask（又称之为宏任务），可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。

浏览器为了能够使得JS内部 macrotask 与DOM任务能够有序的执行，会在一个macrotask 执行结束后，在下一个 macrotask 执行开始前，对页面进行重新渲染。

macrotask 主要包含：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)

### 微任务

microtask（又称为微任务），可以理解是在当前 task 执行结束后立即执行的任务。也就是说，在当前task任务后，下一个task之前，在渲染之前。

所以它的响应速度相比setTimeout（ setTimeout 是 macrotask）会更快，因为无需等渲染。也就是说，在某一个 macrotask 执行完后，就会将在它执行期间产生的所有 microtask 都执行完毕（在渲染前）。

microtask主要包含：Promise.then、MutaionObserver、process.nextTick(Node.js 环境)。

### 运行机制

在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型是比较复杂的，但关键步骤如下：

* 执行一个宏任务（栈中没有就从事件队列中获取）
* 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
* 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
* 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
* 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

## 写出下面代码的运行结果

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});
console.log('script end');
```

```js
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

### 执行过程

1. 首先，事件循环从宏任务（macrotask）队列开始，这个时候，宏任务队列中只有一个 script（整体代码）任务；当遇到任务源（task source）时，则会先分发任务到对应的任务队列中去。

2. 这段代码首先定义了两个 async 函数，然后执行了一个 console，直接输出 `script start`。之后 script 任务继续往下执行，遇到 setTimeout，其作为一个宏任务源，则会将其任务分发到对应的队列中去。

3. script 任务继续往下，执行了 async1 函数，async 函数之前的代码是立即执行的，所以会立即输出 `async1 start`。

4. 遇到 await 时，会将 await 后面的表达式执行一遍，所以紧接着输出`async2`,然后将 await 后面的代码也就是 `console.log(async1 end)`加入到microtask 中的 Promise 队列中，接着跳出 async1 函数来执行后面的代码。

5. script 任务继续往下执行，遇到了 Promise实例。由于 Promise 中的函数是立即执行的，而后续的 `.then`则会被分发到 microtask 中的 Promise 队列中去。所以会先输出 promise1，然后执行 resolve，将 promise2 分配到对应队列。

6. script 任务继续往下，最后输出了 `script end`，至此全局任务就执行完毕了。

7. 执行完一个宏任务后，回去检查是否存在微任务。如果有，则执行微任务直至清空 Microtask queue。所以在 script 任务执行完毕后，开始查找清空微任务队列。此时，微任务中 Promise 队列有两个任务 async1 end 和 promise2，因此按照先后顺序输出`async1 end` 和 `promise2`。当所有 Microtasks 执行完毕后，表示第一轮的循环就结束了。

8. 第二轮循环依旧从宏任务队列开始。此时宏任务重只有一个 setTimeout，取出直接输出即可，至此整个流程结束。

## JS 异步解决方案的发展历程以及优缺点

* 回调函数（callback）
  * 优点：
    * 简单且易于理解
    * 直接且无须额外的库支持
  * 缺点：
    * 回调地狱（callback hell），复杂嵌套导致代码难以维护和阅读

* Promise
  * 优点：
    * 解决了回调地狱的问题，使得代码更具可读性
    * 支持链式调用，使得异步操作序列化
  * 缺点：
    * 仍然需要手动处理错误和边界情况

* Async/Await
  * 优点：
    * 基于 Promise，使异步代码看起来更像同步代码，从而提高可读性
    * 更容易进行调试和错误处理
  * 缺点：
    * 需要支持 ES8 环境

## Promise 构造函数是同步执行还是异步执行，那么 then 方法呢

promise构造函数是同步执行的，then方法是异步执行的。

## 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣

> Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()

### `Object.prototype.toString.call()`

用法：

```js
Object.prototype.toString.call(val) === '[object Array]';
```

* 优点
  * 可以准确判断所有数组，即使是在跨框架（cross-frame）或不同窗口环境中
  * 适用于各种 JavaScript 对象类型的检查

* 缺点
  * 语法较为冗长
  * 在一些特定场景下（低版本浏览器），可能需要手动实现

### `instanceof`

用法：

```js
val instanceof Array
```

* 优点
  * 简洁明了，代码可读性高。
  * 可以用于一般的数组判断。

* 缺点
  * 在跨框架（cross-frame）环境中失效。例如，当数组是从一个 iframe 中创建的，instanceof 检查会失败。

### `Array.isArray()`

用法：

```js
Array.isArray(val)
```

* 优点
  * ES5 引入的方法，现代浏览器（IE9 及以上）和环境均支持。
  * 专门用于判断数组，语法简洁，性能优越。
  * 对跨框架的数组判断也能正确处理。

* 缺点
  * 在 IE8 及更早的浏览器中不支持，如果需要兼容这些浏览器，则需要使用 polyfill​。

最佳选择： 对于现代浏览器和大多数应用场景，Array.isArray() 是最简洁和直接的方法。

## 介绍下观察者模式和发布-订阅模式的区别，各自适用于什么场景

### 观察者模式（Observer Pattern）

* 耦合性: 在观察者模式中，观察者和被观察者（主题）之间存在直接的依赖关系。被观察者知道有哪些观察者，并且直接通知它们变化。

* 应用范围: 通常用于同一进程内的事件处理。当一个对象状态改变时，所有依赖于它的对象都收到通知并自动更新。例如，在GUI应用程序中，一个按钮的点击事件可以通知多个处理器。

* 实现方式: 观察者模式通常由两个主要部分组成：主题（Subject）和观察者（Observer）。主题维护观察者列表，当其状态改变时通知所有观察者。

代码示例：

```js
interface Observer {
  update: (message: string) => void;
}

class Subject {
  private observers: Observer[] = [];

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(message: string): void {
    this.observers.forEach(observer => observer.update(message));
  }
}
```

### 发布-订阅模式（Publish-Subscribe Pattern）

* 解耦性: 订阅者和发布者之间没有直接的联系。消息通过中介（消息代理）传递，发布者发送消息到特定的主题，订阅者订阅这些主题以接收消息。这种模式解耦了发布者和订阅者，使得它们可以独立演化。

* 应用范围: 适用于跨进程、跨网络的消息传递。例如，微服务架构中，服务之间可以通过消息队列系统（如Kafka、RabbitMQ）进行通信。

* 实现方式: 包含发布者（Publisher）、订阅者（Subscriber）和消息代理（Broker）等组件。发布者将消息发送到代理，代理根据订阅者的订阅信息分发消息。

代码示例：

```js
class Publisher {
  private broker: Broker;

  constructor(broker: Broker) {
    this.broker = broker;
  }

  publish(topic: string, message: string): void {
    this.broker.publish(topic, message);
  }
}

class Broker {
  private topics: { [key: string]: Function[] } = {};

  subscribe(topic: string, subscriber: Function): void {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(subscriber);
  }

  publish(topic: string, message: string): void {
    if (this.topics[topic]) {
      this.topics[topic].forEach(subscriber => subscriber(message));
    }
  }
}

class Subscriber {
  constructor(broker: Broker, topic: string) {
    broker.subscribe(topic, this.receive);
  }

  receive(message: string): void {
    console.log(`Received message: ${message}`);
  }
}
```

### 使用场景

* 观察者模式: 适用于需要紧密耦合的场景，例如GUI组件之间的交互。
* 订阅-发布模式: 适用于需要解耦的场景，特别是分布式系统和跨网络通信。

## 浏览器和 Node 事件循环的区别

### 浏览器

关于微任务和宏任务在浏览器的执行顺序是这样的：

* 执行一个macro-task（宏任务）
* 执行完micro-task队列（微任务）

### Node

Node的事件循环是libuv实现的。

大体的task（宏任务）执行顺序是这样的：

* timers定时器：本阶段执行已经安排的 setTimeout() 和 setInterval() 的回调函数。

* pending callbacks待定回调：执行延迟到下一个循环迭代的 I/O 回调。

* idle, prepare：仅系统内部使用。

* poll 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 setImmediate() 排定的之外），其余情况 node 将在此处阻塞。

* check 检测：setImmediate() 回调函数在这里执行。

* close callbacks 关闭的回调函数：一些准备关闭的回调函数，如：socket.on('close', ...)。

Node 10以前：

* 执行完一个阶段的所有任务
* 执行完nextTick队列里面的内容
* 然后执行完微任务队列的内容

Node 11以后和浏览器的行为统一了，都是每执行一个宏任务就执行完微任务队列。

## 介绍模块化发展历史

JavaScript 模块化的演变经历了多个重要阶段，每个阶段都有其独特的解决方案和使用场景。以下是对主要模块化方案的概述：

### 1、IIFE（立即调用的函数表达式）

IIFE是一种早期的模块化模式，通过立即调用一个匿名函数来创建一个私有作用域，避免全局变量污染。这在模块化方案尚未成熟时非常流行。

### 2、AMD（异步模块定义）

AMD主要用于浏览器环境，强调异步加载模块。它通过define函数定义模块，并通过require函数加载模块。RequireJS是其代表性实现。

### 3、CMD（通用模块定义）

CMD和AMD类似，但更强调依赖的延迟执行。SeaJS是CMD的典型实现。CMD在定义模块时通过define函数，将依赖项放在模块体内。

### 4、CommonJS

CommonJS是Node.js采用的模块规范，通过require函数引入模块，通过module.exports导出模块。它在服务器端广泛使用，并且支持同步加载。

### 5、UMD（通用模块定义）

UMD试图兼容AMD和CommonJS，同时也支持全局变量模式。UMD模式用于创建可在多种环境下运行的模块

### 6、Webpack（require.ensure）

Webpack是一个流行的打包工具，它支持动态导入（通过require.ensure实现）和代码拆分，能够高效管理依赖关系并生成优化的包。

### 7、ESModule

ES6引入了原生的模块系统，支持import和export语法。ES模块在编译时静态解析，具有更好的优化潜力和性能。它已经成为现代前端开发的标准。

### 8、`<script type="module">`

HTML中可以通过`<script type="module">`标签直接加载ES模块。浏览器支持ES模块的原生导入和导出，使前端开发更加简洁和高效。

## 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？

在ES5中，顶层对象的属性和全局变量是等价的，var 命令和 function 命令声明的全局变量，自然也是顶层对象。

```js
var a = 12;
function f(){};

console.log(window.a); // 12
console.log(window.f); // f(){}
```

但ES6规定，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性，但 let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。

```js
let aa = 1;
const bb = 2;

console.log(window.aa); // undefined
console.log(window.bb); // undefined
```

在全局作用域中，用 let 和 const 声明的全局变量并没有在全局对象中，只是一个块级作用域（Script）中。

## 下面代码中 a 在什么情况下会打印 1

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
  console.log(1);
}
```

```js
var a = {
  i: 1,
  toString() {
    return a.i++;
  }
}

if( a == 1 && a == 2 && a == 3 ) {
  console.log(1);
}
```

## 以下代码执行结果是什么？

```js
var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

```js
{2: 1, 3: 2, length: 4, splice: ƒ, push: ƒ}
```

## call 和 apply 的区别是什么，哪个性能更好一些

call 和 apply 都是 JavaScript 中用于函数调用的两种方法，主要区别在于参数的传递方式：

* call 方法接受一个参数列表，格式为 fn.call(thisArg, arg1, arg2, ...)。

* apply 方法接受一个包含参数的数组，格式为 fn.apply(thisArg, [arg1, arg2, ...])。

在性能方面，通常 call 比 apply 更快。这主要是因为 apply 需要进行额外的参数处理，将数组转换为参数列表。apply 方法需要执行更多的步骤，包括参数类型检查和循环处理所有参数，从而导致了额外的开销​。

因此，在性能敏感的场景中，若已知参数数量且可以明确列出参数，推荐使用 call 方法。此外，如果参数已经存在于一个数组中且数组大小不确定，apply 会更方便一些。

## 箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？

箭头函数是普通函数的简写，可以更优雅的定义一个函数，和普通函数相比，有以下几点差异：

* 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

* 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

* 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

* 不可以使用 new 命令，因为：

  * 没有自己的 this，无法调用 call，apply。
  * 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 `__proto__`

## `a.b.c.d` 和 `a['b']['c']['d']`，哪个性能更高

在讨论 `a.b.c.d` 和 `a['b']['c']['d']` 两种对象属性访问方式的性能时，最高赞的回答指出，`a.b.c.d` 通常比 `a['b']['c']['d']` 更快。这主要是因为在 JavaScript 中，使用点符号 (.) 进行属性访问时，编译器能够更好地优化这类操作。点符号访问更直接，不需要进行字符串查找和转换，因而执行速度更快。

另一方面，方括号 ([]) 语法允许访问属性名为变量或表达式结果的情况，因此在某些动态属性访问场景中很有用。然而，这种灵活性带来了一定的性能开销，因为每次访问时需要解析字符串或计算表达式的结果。

尽管在大多数情况下，这种性能差异微乎其微，但在性能敏感的应用中，尤其是涉及大量属性访问操作时，选择点符号会更为高效。

因此，`a.b.c.d` 比 `a['b']['c']['d']` 性能更高，但在实际开发中应根据具体需求和代码可读性来选择适当的访问方式

## ES6 代码转成 ES5 代码的实现思路是什么

以Babel为例：

Babel的实现思路涉及将现代JavaScript代码（如ES6及更高版本）转译为向后兼容的ES5代码。以下是Babel如何实现这一过程的核心步骤：

* **解析（Parsing）：**
首先，Babel使用解析器（如Babylon）将JavaScript源代码解析成抽象语法树（AST）。AST是一种中间表示，用于描述代码结构和语法元素。

* **转换（Transforming）：**
解析后的AST会经过一系列的转换插件（Transform Plugins）。这些插件可以添加、删除或修改AST节点，从而实现语法转换。例如，箭头函数会被转换为普通的函数表达式，模板字符串会被转换为字符串连接等。

* **生成（Generating）：**
最后，经过转换的AST会被生成器（如Babel Generator）重新生成JavaScript代码。这个阶段会将修改后的AST转换回普通的JavaScript代码字符串，并输出最终的ES5代码。

具体步骤：

* **解析（Parsing）：**
  * Babel解析器会读取源代码并生成一个对应的AST。
  * 例如，`let x = () => 2;` 会被解析为一个包含变量声明和箭头函数的AST。

* **转换（Transforming）：**
  * Babel插件会遍历AST并对其进行修改。
  * 例如，一个箭头函数插件会将AST中的箭头函数节点转换为普通函数表达式节点：

```js
{
  "type": "ArrowFunctionExpression",
  "body": {
    "type": "Literal",
    "value": 2
  }
}
```

可能会被转换为：

```js
{
  "type": "FunctionExpression",
  "body": {
    "type": "BlockStatement",
    "body": [
      {
        "type": "ReturnStatement",
        "argument": {
          "type": "Literal",
          "value": 2
        }
      }
    ]
  }
}
```

* **生成（Generating）：**
  * 生成器会将修改后的AST重新转换为JavaScript代码字符串。
  * 最终的代码可能是`var x = function() { return 2; };`。

## 为什么 for 循环的性能远高于 forEach？

for 循环的性能通常高于 forEach，主要是因为两者在底层实现上的差异。for 循环的每一次迭代仅涉及简单的索引增量和条件检查，这些都是低负载操作。而 forEach 在每次迭代时需要进行函数调用，涉及到函数的创建、执行上下文的设置与销毁，这些操作比单纯的索引增量和条件检查要复杂得多。

具体来说，for 循环的步骤如下：

* 初始化索引变量。
* 检查是否满足循环条件。
* 执行循环体内容。
* 增加索引变量。
* 返回步骤2。

而 forEach 则需要：

* 实例化回调函数。
* 检查是否有下一个元素。
* 调用回调函数并创建新的执行上下文。
* 执行回调函数体内容。
* 销毁回调函数的执行上下文。
* 返回步骤2。

由于函数的创建和销毁涉及更多的 CPU 和内存操作，因此 forEach 比 for 循环慢。此外，现代浏览器虽然在不断优化 forEach 的性能，但在多数情况下，for 循环依然更快​。

## 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少

数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 O(1)

得出结论：**消耗时间几乎一致，差异可以忽略不计**
