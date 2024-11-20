---
title: JavaScript
description: JavaScript
---

# JavaScript 面试题

## js数据类型

在 JS 中共有 8  种基础的数据类型，分别为： `Undefined` 、 `Null` 、 `Boolean` 、 `Number` 、 `String` 、 `Object` 、 `Symbol` 、 `BigInt`。

* **Symbol**：代表独一无二的值，最大的用法是用来定义对象的唯一属性名
* **BigInt**： 可以表示任意大小的整数

## 基本类型和引用类型

* 基本类型

  基本类型是直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。除 `Object` 外都是基本类型。

* 引用类型

  引用类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能。

## 数据类型的判断

* typeof

  能判断所有**基本类型**，**函数**。不可对 **null**、**对象**、**数组**进行精确判断，因为都返回 object 。

* instanceof

  能判断对象类型，不能判断基本数据类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。

* `Object.prototype.toString.call()`

所有原始数据类型都是能判断的，还有 **Error 对象**，**Date 对象**等

## 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣

`Object.prototype.toString.call()` 、 `instanceof` 以及 `Array.isArray()`

* `Object.prototype.toString.call()`

  * 用法：

    ```js
    Object.prototype.toString.call(val) === '[object Array]';
    ```

  * 优点
    * 可以准确判断所有数组，即使是在跨框架（cross-frame）或不同窗口环境中
    * 适用于各种 JavaScript 对象类型的检查

  * 缺点
    * 语法较为冗长
    * 在一些特定场景下（低版本浏览器），可能需要手动实现

* `instanceof`

  * 用法

    ```js
    val instanceof Array
    ```

  * 优点
    * 简洁明了，代码可读性高。
    * 可以用于一般的数组判断。

  * 缺点
    * 在跨框架（cross-frame）环境中失效。例如，当数组是从一个 iframe 中创建的，instanceof 检查会失败。

* `Array.isArray()`

  * 用法

    ```js
    Array.isArray(val)
    ```

  * 优点
    * ES5 引入的方法，现代浏览器（IE9 及以上）和环境均支持。
    * 专门用于判断数组，语法简洁，性能优越。
    * 对跨框架的数组判断也能正确处理。

  * 缺点
    * 在 IE8 及更早的浏览器中不支持，如果需要兼容这些浏览器，则需要使用 polyfill​。

最佳选择：对于现代浏览器和大多数应用场景，Array.isArray() 是最简洁和直接的方法。

## 根据 0.1+0.2 ! == 0.3，讲讲 IEEE 754 ，如何让其相等

**原因总结 :**

* **进制转换**

  js 在做数字计算的时候，0.1 和 0.2 都会被转成二进制后无限循环 ，但是 js 采用的 IEEE 754 二进制浮点运算，最大可以存储 53 位有效数字，于是大于 53 位后面的会全部截掉，将导致精度丢失。

* **对阶运算**

  由于指数位数不相同，运算时需要对阶运算，阶小的尾数要根据阶差来右移（0舍1入），尾数位移时可能会发生数丢失的情况，影响精度。

**解决办法：**

使用 `Number.EPSILON` 误差范围，`Number.EPSILON` 的实质是一个可以接受的最小误差范围，一般来说为 `Math.pow(2, -52)`。

```js
function isEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}

console.log(isEqual(0.1 + 0.2, 0.3)); // true
```

## 原型和原型链

**原型（Prototype）**

每个 JavaScript 对象都有一个内部属性 `[[Prototype]]`，它指向另一个对象，这个对象被称为原型。这个原型也可以有自己的原型，这样形成一个原型链。原型链是 JavaScript 对象继承的基础。

* 构造函数的原型

  每个函数都有一个 prototype 属性，它指向一个对象，这个对象被称为构造函数的原型。这个原型对象可以被用来定义共享属性和方法。

* 实例对象的原型

  当你创建一个对象时，它的 `[[Prototype]]` 指向其构造函数的 prototype 对象。

**原型链（Prototype Chain）**

原型链是对象查找属性的机制。一个对象访问属性时，JavaScript 会沿着对象的原型链查找该属性：

* **对象自身**：首先在对象自身上查找属性。
* **原型对象**：如果在对象自身上未找到属性，则在对象的原型对象上查找。
* **原型的原型**：如果在原型对象上也未找到，则继续查找原型对象的原型，直到找到属性或达到原型链的末端。
* 原型链的末端是 null，null 的原型是 null，这是原型链的终点。

在 JavaScript 中，你可以通过 `Object.getPrototypeOf(obj)` 方法来获取对象的原型，通过 `Object.setPrototypeOf(obj, prototype)` 方法来设置对象的原型。你也可以使用 `__proto__` 属性来访问对象的原型，但这个属性已经不推荐使用。

## 作用域和作用域链

**作用域（Scope）**

作用域是程序中定义变量的上下文环境。作用域决定了代码中变量的可访问性。JavaScript 中有三种主要的作用域：

* **全局作用域**

  在代码中的任何地方都可以访问到的变量。默认情况下，最外层定义的变量属于全局作用域。

* **函数作用域**

  在函数内部定义的变量只能在该函数内部访问。这些变量在函数执行完毕后会被销毁。

* **块级作用域**

  由 let、const 等关键字定义的块级变量，只在块内部（如 if、for 块）可访问。var 定义的变量不具备块级作用域特性，只具备函数作用域。

**作用域链（Scope Chain）**

作用域链是 JavaScript 解析器查找变量时使用的机制。每个函数都有自己的作用域，但在查找变量时，会沿着作用域链向上查找，直到找到变量或到达全局作用域。

* **当前作用域**：解析器首先查找当前作用域中的变量。
* **外层作用域**：如果当前作用域中找不到变量，解析器会继续在外层作用域中查找。
* **全局作用域**：解析器最终在全局作用域中查找。

## 执行上下文

**执行上下文（Execution Context）**

执行上下文是 JavaScript 代码运行的环境，每当 JavaScript 代码执行时，都会创建一个执行上下文。执行上下文分为三种类型：

* **全局执行上下文**

  * 这是默认的、最基础的执行上下文。一个程序只能有一个全局执行上下文。
  * 在全局上下文中，this 指向全局对象（如浏览器中的 window 对象）。

* **函数执行上下文**

  * 每当一个函数被调用时，都会为该函数创建一个新的执行上下文。
  * 函数执行上下文会为函数的参数、变量和函数声明创建变量对象。

* **Eval 执行上下文**

  * 在 eval() 函数中运行的代码会有自己的执行上下文。

执行上下文在执行代码时会经历两个阶段：

1. **创建阶段**

* 变量对象（Variable Object，VO）：创建变量对象，并初始化函数参数、内部变量和函数声明。
* 作用域链（Scope Chain）：创建作用域链，并将变量对象加入链中。
* 确定 this 的值：根据调用位置设置 this 的值。

2. **执行阶段**

* 在此阶段，变量赋值、函数引用和代码执行都是在这个时候进行的。

**变量对象（Variable Object）**

变量对象是执行上下文中用于存储变量和函数声明的特殊对象。它在创建阶段完成初始化：

* 全局上下文中的变量对象是全局对象（如浏览器中的 window ）。
* 函数上下文中的变量对象称为激活对象（ Activation Object，AO ），包含函数的参数、内部变量和函数声明。

在函数执行上下文中，变量对象的初始化包括：

* **函数参数**：将参数名称和对应值作为属性添加到变量对象中。
* **函数声明**：将函数名称作为属性名，函数体作为值添加到变量对象中。
* **变量声明**：将变量名称作为属性名，值为 undefined。

```js
var x = 10;

function foo(a) {
  var b = 20;

  function bar(c) {
    var d = 30;
    return a + b + c + d;
  }

  return bar(10);
}

foo(5);
```

在这个示例中，当 foo 函数被调用时：

* 创建 foo 的执行上下文。
* 在创建阶段：
  * 变量对象初始化：a = 5，b = undefined，bar = function
* 在执行阶段：
  * 变量 b 赋值为 20。

## 闭包

**闭包（Closure）**

闭包是指在函数内部定义的函数能够访问其外部函数作用域中的变量。即使外部函数已经执行完毕，内部函数仍然能够“记住”并继续访问这些变量。

在某个内部函数的执行上下文创建时，会将父级函数的活动对象加到内部函数的 `[[scope]]` 中，形成作用域链，所以即使父级函数的执行上下文销毁（即执行上下文栈弹出父级函数的执行上下文），但是因为其活动对象还是实际存储在内存中可被内部函数访问到的，从而实现了闭包。

**闭包的特性**

* **函数嵌套**：闭包通常是在一个函数内部定义另一个函数时创建的。
* **访问外部变量**：闭包可以访问其外部函数的变量，即使外部函数已经执行完毕。
* **保持状态**：由于闭包可以访问外部函数的变量，所以它可以用来保持状态。

**闭包的作用**

* **数据隐藏**：闭包可以创建私有变量，防止外部访问。
* **模拟块级作用域**：在 ES6 之前，JavaScript 没有块级作用域，闭包可用于模拟块级作用域。
* **回调和事件处理**：闭包常用于处理异步操作，如回调函数和事件处理器。

```js
function createCounter() {
  let count = 0; // 外部变量

  return function() {
    count += 1; // 内部函数可以访问外部变量
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 输出: 1
console.log(counter()); // 输出: 2
console.log(counter()); // 输出: 3
```

在这个示例中，createCounter 函数返回一个匿名函数，该匿名函数就是一个闭包。闭包可以访问 createCounter 中的局部变量 count，并通过保持对 count 的引用来累加计数器的值。

## call、apply、bind实现

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
  return ret instanceof Objet ? ret : obj;
}
```

## `['1', '2', '3'].map(parseInt)`的输出值是什么？

输出结果为：`[1, NaN, NaN]`。

**原因：**

回调函数 parseInt 接收两个参数：要解析的字符和基数（进制）。

map 传递给 parseInt 的参数包括当前元素的值，当前元素的索引和数组本身。

* **第一次调用**：`parseInt('1', 0, arr)` 会将字符串 '1' 解析为整数 1（在 radix 为 undefined 或者 radix 为 0 且 字符串不是以 '0x' 或者 '0X' 开头的情况下，基数为 10）。

* **第二次调用**：`parseInt('1', 1, arr)` 中基数 1 是无效的，因为基数应该在 2~36之间，所以返回 NaN。

* **第三次调用**：`parseInt('1', 2, arr)` 中基数 2 也是无效的，同样返回 NaN。

**扩展：**

* `['10','10','10','10','10'].map(parseInt)` 返回值为 `[10, NaN, 2, 3, 4]`

* `parseInt('10', 2)` 中的基数为 2 的解释：

  在这种情况下，字符串 '10' 是一个有效的二进制数。在二进制中，10 表示十进制中的数字 2。因此，parseInt('10', 2) 会成功地将二进制字符串 '10' 解析为整数 2。

## 防抖和节流的区别？如何实现？

防抖（Debounce）和节流（Throttle）是用来控制函数调用频率的两种常见技术，特别在处理频繁触发的事件（比如滚动、resize、输入框输入等）时很有用。

* **防抖（Debounce）**

  * 当事件触发后，等待一定的时间间隔，如果在这个时间间隔内再次触发了相同事件，则重新计时。直到事件触发的间隔超过设定的时间间隔后，才真正执行该事件的处理函数。

  * **适合场景**：如搜索框输入联想，用户输入停顿后再进行搜索

* **节流（Throttle）**

  * 当事件触发后，首先执行事件处理函数，然后在指定的时间间隔内不响应新的事件触发。只有间隔超过设定的时间间隔后，才会再次触发执行事件处理函数。

  * **适合场景**：如页面滚动事件，控制一定时间内只触发一次加载数据的操作

* 区别：

  * **执行时间点不同**：防抖是在事件停止触发后等待一段时间后执行最后一次触发的事件处理函数；节流是在指定时间间隔内执行事件处理函数，并且该时间间隔内不响应新的事件触发。

  * **适用场景不同**：防抖适合减少频繁事件的触发，如输入框搜索建议；节流适合控制事件的频率，如滚动事件加载数据。

## Set、Map、WeakSet 和 WeakMap 的区别

* **Set**

  * 存储唯一值的集合，无重复元素。
  * 可以包含任何类型的值，无论是原始值还是对象引用。
  * 方法包括 `add(value)、delete(value)、has(value)、clear() 和 size`。

* **WeakSet**

  * 存储对象引用的集合，不能包含原始值（例如 `int、boolean、string`）。
  * 对象引用是弱引用，即如果没有其他引用指向该对象，则对象可以被垃圾回收。
  * 没有 `clear()` 方法，也没有 `size` 属性，因为对象可能随时被回收。

* **Map**

  * 存储键值对的集合，键和值可以是任何类型。
  * 保持键的插入顺序。
  * 方法包括 `set(key, value)、get(key)、delete(key)、has(key) 和 size`。

* **WeakMap**

  * 类似于 Map，但键必须是对象，而不是原始值。
  * 键是弱引用，如果没有其他引用指向该对象，则键和值可以被垃圾回收。
  * 没有 `clear()` 方法，也没有 `size` 属性，因为键值对可能随时被回收。

## ES5/ES6中继承的区别

* **语法糖**

  ES6中的类( class )语法主要是对ES5原型继承( prototype-based inheritance )的一种语法糖。尽管两者在底层实现上是相同的，但类语法提供了一种更简洁和直观的方式来定义继承。

* **严格模式**

  ES6类中的所有代码都在严格模式下运行，即使你没有显式地启用严格模式。这样可以避免一些常见的错误，如意外创建全局变量​。

* **构造函数强制使用 `new` 关键字**

  在ES6中，类的构造函数必须使用new关键字调用，否则会抛出错误。在ES5中，构造函数可以不使用 new 关键字，这可能会导致意外的结果。

* **方法的不可枚举性**

  ES6类中的方法是不可枚举的，这意味着它们不会出现在for...in循环中。这与ES5不同，在ES5中，必须手动设置方法的不可枚举性。

* **静态方法和实例方法的定义**

  在 ES6 中，可以很方便地在类中定义静态方法和实例方法，并且静态方法会绑定在类的构造函数上，而不是实例上。这在ES5中需要更多的代码来实现。

* **`super`关键字**

  ES6 引入了 super 关键字，用于调用父类的构造函数和方法，这使得继承关系中的方法调用变得更加直观和简单。在ES5中，需要通过 `Function.call` 或 `Function.apply` 来实现类似的功能。

## setTimeout、Promise、Async/Await 的区别

* **setTimeout**
  * 作用：用于延迟执行代码
  * 特性：
    * 创建一个任务，在执行时间后执行
    * 不会阻塞后续代码执行
    * 属于宏任务（Macrotask）

* **Promise**
  * 作用：用于处理异步操作
  * 特性：
    * 不依赖于具体的时间延迟
    * 用于链式调用，避免回调地狱
    * 创建微任务（Microtask），优先级高于宏任务

* **async/await**
  * 作用：用于简化基于Promise的代码，使其看起来像同步代码
  * 特性：
    * async函数会返回一个Promise
    * await会等待Promise resolve 或 reject，并返回其解决值
    * 使代码更加易读和调试，尤其在复杂的异步流程中

## async/await 如何通过同步的方式实现异步

async/await 使异步代码看起来像同步代码，但它实际上并不会使代码变得同步。它只是通过暂停函数的执行来等待异步操作的完成，然后继续执行。这种机制让你能够写出类似于同步代码的异步代码，而不需要回调地狱或复杂的 Promise 链。

在实际操作中，await 在遇到一个 Promise 时会暂停函数的执行，直到该 Promise 解决为止。这种暂停并不会阻塞事件循环或阻止其他代码的执行。例如，当你在一个循环中使用 await 时，函数会一个接一个地等待每个 Promise 的解决，而不是同时发送多个请求。

## JS 异步解决方案的发展历程以及优缺点

* **回调函数（callback）**
  * 优点：
    * 简单且易于理解
    * 直接且无须额外的库支持
  * 缺点：
    * 回调地狱（callback hell），复杂嵌套导致代码难以维护和阅读

* **Promise**
  * 优点：
    * 解决了回调地狱的问题，使得代码更具可读性
    * 支持链式调用，使得异步操作序列化
  * 缺点：
    * 仍然需要手动处理错误和边界情况

* **Async/Await**
  * 优点：
    * 基于 Promise，使异步代码看起来更像同步代码，从而提高可读性
    * 更容易进行调试和错误处理
  * 缺点：
    * 需要支持 ES8 环境

## Promise 构造函数是同步执行还是异步执行，那么 then 方法呢

promise 构造函数是同步执行的，then 方法是异步执行的。

## 介绍下观察者模式和发布-订阅模式的区别，各自适用于什么场景

* **观察者模式（Observer Pattern）**

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

* **发布-订阅模式（Publish-Subscribe Pattern）**

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

* **使用场景**

  * 观察者模式: 适用于需要紧密耦合的场景，例如GUI组件之间的交互。
  * 订阅-发布模式: 适用于需要解耦的场景，特别是分布式系统和跨网络通信。

## 介绍模块化发展历史

JavaScript 模块化的演变经历了多个重要阶段，每个阶段都有其独特的解决方案和使用场景。以下是对主要模块化方案的概述：

1. **IIFE（立即调用的函数表达式）**

  IIFE是一种早期的模块化模式，通过立即调用一个匿名函数来创建一个私有作用域，避免全局变量污染。这在模块化方案尚未成熟时非常流行。

2. **AMD（异步模块定义）**

  AMD主要用于浏览器环境，强调异步加载模块。它通过define函数定义模块，并通过require函数加载模块。RequireJS是其代表性实现。

3. **CMD（通用模块定义）**

  CMD和AMD类似，但更强调依赖的延迟执行。SeaJS是CMD的典型实现。CMD在定义模块时通过define函数，将依赖项放在模块体内。

4. **CommonJS**

  CommonJS是 Node.js 采用的模块规范，通过 require 函数引入模块，通过 module.exports 导出模块。它在服务器端广泛使用，并且支持同步加载。

5. **UMD（通用模块定义）**

  UMD试图兼容AMD和CommonJS，同时也支持全局变量模式。UMD模式用于创建可在多种环境下运行的模块

6. **Webpack（require.ensure）**

  Webpack是一个流行的打包工具，它支持动态导入（通过require.ensure实现）和代码拆分，能够高效管理依赖关系并生成优化的包。

7. **ESModule**

  ES6引入了原生的模块系统，支持import和export语法。ES模块在编译时静态解析，具有更好的优化潜力和性能。它已经成为现代前端开发的标准。

8. `<script type="module">`

  HTML中可以通过 `<script type="module">` 标签直接加载ES模块。浏览器支持ES模块的原生导入和导出，使前端开发更加简洁和高效。

## 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？

在ES5中，顶层对象的属性和全局变量是等价的，var 命令和 function 命令声明的全局变量，自然也是顶层对象。

```js
var a = 12;
function f(){};

console.log(window.a); // 12
console.log(window.f); // f(){}
```

但ES6规定，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性，但 let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性。

```js
let aa = 1;
const bb = 2;

console.log(window.aa); // undefined
console.log(window.bb); // undefined
```

在全局作用域中，用 let 和 const 声明的全局变量并没有在全局对象中，只是一个块级作用域（ Script ）中。

## 下面代码中 a 在什么情况下会打印 1

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
  console.log(1);
}
```

**Answer：**

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

**Answer：**

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

在讨论 `a.b.c.d` 和 `a['b']['c']['d']` 两种对象属性访问方式的性能时，`a.b.c.d` 通常比 `a['b']['c']['d']` 更快。这主要是因为在 JavaScript 中，使用点符号 (.) 进行属性访问时，编译器能够更好地优化这类操作。点符号访问更直接，不需要进行字符串查找和转换，因而执行速度更快。

另一方面，方括号 ([]) 语法允许访问属性名为变量或表达式结果的情况，因此在某些动态属性访问场景中很有用。然而，这种灵活性带来了一定的性能开销，因为每次访问时需要解析字符串或计算表达式的结果。

尽管在大多数情况下，这种性能差异微乎其微，但在性能敏感的应用中，尤其是涉及大量属性访问操作时，选择点符号会更为高效。

因此，`a.b.c.d` 比 `a['b']['c']['d']` 性能更高，但在实际开发中应根据具体需求和代码可读性来选择适当的访问方式

## ES6 代码转成 ES5 代码的实现思路是什么

以Babel为例：

Babel的实现思路涉及将现代JavaScript代码（如ES6及更高版本）转译为向后兼容的ES5代码。以下是Babel如何实现这一过程的核心步骤：

* **解析（Parsing）**

  首先，Babel 使用解析器（如 Babylon ）将 JavaScript 源代码解析成抽象语法树（AST）。AST是一种中间表示，用于描述代码结构和语法元素。

* **转换（Transforming）**

  解析后的AST会经过一系列的转换插件（ Transform Plugins ）。这些插件可以添加、删除或修改AST节点，从而实现语法转换。例如，箭头函数会被转换为普通的函数表达式，模板字符串会被转换为字符串连接等。

* **生成（Generating）**

  最后，经过转换的AST会被生成器（如 Babel Generator ）重新生成 JavaScript 代码。这个阶段会将修改后的AST转换回普通的 JavaScript 代码字符串，并输出最终的ES5代码。

**具体步骤：**

* **解析（Parsing）**

  * Babel解析器会读取源代码并生成一个对应的AST。
  * 例如，`let x = () => 2;` 会被解析为一个包含变量声明和箭头函数的AST。

* **转换（Transforming）**

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

* **生成（Generating）**

  * 生成器会将修改后的AST重新转换为JavaScript代码字符串。
  * 最终的代码可能是 `var x = function() { return 2; };`。

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

## 输出以下代码运行结果

```js
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]);

```

**Answer：**

```js
// example 1

// c 的键名会被转换成字符串'123'，这里会把 b 覆盖掉。
'c'

// example 2

// c 是 Symbol 类型，不需要转换。任何一个 Symbol 类型的值都是不相等的，所以不会覆盖掉 b。
'b'

// example 3

// c 不是字符串也不是 Symbol 类型，需要转换成字符串。
// 对象类型会调用 toString 方法转换成字符串 [object Object]。这里会把 b 覆盖掉。
a[c]='c'; 
'c'
```

## 介绍下 Promise.all 使用、原理实现及错误处理

`Promise.all` 是一个 JavaScript 方法，用于处理多个异步操作。它接受一个可迭代对象（如数组），其中包含多个 Promise，并返回一个新的 Promise。当所有 Promise 都成功时，这个新的 Promise 会解析为一个包含所有结果的数组；如果任何一个 Promise 被拒绝，它将立即拒绝并返回第一个被拒绝的 Promise 的原因。

**示例：**

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values); // [3, 42, 'foo']
}).catch((error) => {
  console.error(error);
});
```

**原理：**

`Promise.all` 内部会遍历传入的可迭代对象，将每个元素转为 Promise（如果它不是 Promise），然后等待所有 Promise 完成。如果所有 Promise 成功，Promise.all 返回的 Promise 会解析为包含所有结果的数组。如果有任何一个 Promise 被拒绝，Promise.all 返回的 Promise 会立即拒绝，并返回第一个被拒绝的 Promise 的原因

**错误处理：**

`Promise.all` 的一个特点是“全有或全无”。如果任何一个 Promise 被拒绝，整个 Promise.all 调用都会被拒绝。可以通过 .catch 方法处理错误

```js
Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.error('One of the promises failed:', error);
  });
```

为了更灵活的错误处理，可以使用 `Promise.allSettled`，它会等待所有 Promise 完成，不论它们是成功还是失败，并返回每个 Promise 的结果对象。

```js
const promise1 = Promise.resolve('成功');
const promise2 = Promise.reject('失败');
const promise3 = Promise.resolve('也成功');

Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      console.log('成功:', result.value);
    } else {
      console.error('失败:', result.reason);
    }
  });
});
```

## var、let 和 const 区别的实现原理是什么

在 JavaScript 中，var、let 和 const 的区别主要体现在作用域、提升（hoisting）和变量重新赋值等方面：

* **作用域（Scope）**

  * var 声明的变量是函数作用域或全局作用域。如果在函数内部声明变量，它在整个函数中都可以访问；如果在函数外部声明，则在全局范围内可用。

  * let 和 const 声明的变量是块级作用域（block scope）。这意味着它们只在声明它们的代码块内有效。

* **提升（Hoisting）**

  * var 声明的变量会被提升到其作用域的顶部，这意味着变量声明会被提升到函数或全局的顶部，但是初始化仍然留在原来的位置，因此在提升前访问会得到 `undefined`。

  * let 和 const 也会被提升，但它们会保持在“暂时性死区”（Temporal Dead Zone，TDZ）内，直到声明语句被执行。访问 TDZ 内的 let 或 const 变量会导致 `ReferenceError`。

* **变量重新赋值（Reassignment）**

  * var 变量可以重新赋值和重新声明。
  * let 变量可以重新赋值，但不能重新声明。
  * const 变量一旦声明后，不能重新赋值，且必须立即初始化。不过，如果 const 变量引用的是对象或数组，可以修改对象的属性或数组的元素。

## 实现一个动画有哪些方式

* JavaScript：setTimeout 和 setInterval
* Css3：transition 和 animation
* Html：canvas 和 SVG
* requestAnimationFrame API

## 前端常见的设计模式

* **单例模式**

  用于限制类的实例化次数，并确保全局只有一个实例。在前端应用中，如全局状态管理器、日志系统等，使用单例模式来实现全局唯一性。

* **观察者模式**

  用于处理多对多的事件通信和数据变化通知。常见的应用如 Vue、React 中的响应式数据系统，或者实现发布/订阅模式。

* **工厂模式**

  提供一个创建对象的接口，通过不同的条件返回不同的对象实例，常见于组件库、插件等模块化的系统中。

* **命令模式**

  用于将请求封装为对象，支持更复杂的请求操作，如撤销操作等。命令模式在前端框架中的 UI 操作和功能模块解耦中有广泛应用。

* **装饰模式**

  装饰器的使用

## TypeScript 相较于 JavaScript 的优势和劣势

TypeScript 相比于 JavaScript 的优势和劣势：

* 优势

  类型安全、增强的开发体验、更好的代码可维护性、支持现代 JavaScript 特性。

* 劣势

  学习曲线、编译步骤、类型系统的复杂性、与第三方库的兼容性问题、增加项目复杂度。
