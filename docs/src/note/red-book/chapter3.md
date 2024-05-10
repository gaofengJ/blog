---
title: 语言基础
description: javaScript
---

# 语言基础

## 基础

任何语言的核心所描述的都是这门语言在最基本的层面上如何工作，涉及语法、操作符、数据类型以及内置功能，在此基础之上才可以构建复杂的解决方案。

ECMA-262 第5 版（ES5）定义的ECMAScript，是目前为止实现得最为广泛（即受浏览器支持最好）的一个版本。第6 版（ES6）在浏览器中的实现（即受支持）程度次之。

## 3.4 数据类型

一、即使未初始化的变量会被自动赋予undefined 值，但我们仍然建议在声明变量的同时进行初始化。这样，当typeof 返回"undefined"时，你就会知道那是因为给定的变量尚未声明，而不是声明了但未初始化。例如：

```js
let message; // 这个变量被声明了，只是值为undefined
// let age;
console.log('typeof message', typeof message);
console.log('typeof age', typeof age);

/**
 * output
 * typeof message undefined
  typeof age undefined
 */
```

二、undefined 值是由null 值派生而来的，因此ECMA-262 将它们定义为表面上相等，如下面的例
子所示：

```js
console.log(null == undefined); // true
console.log(null === undefined); // false
```

**永远不必显式地将变量值设置为undefined。但null 不是这样的。任何时候，只要变量要保存对象，而当时又没有那个对象可保存，就要用null 来填充该变量。这样就可以保持null 是空对象指针的语义，并进一步将其与undefined 区分开来。**

三、因为存储浮点值使用的内存空间是存储整数值的两倍，所以ECMAScript 总是想方设法把值转换为整数。在小数点后面没有数字的情况下，数值就会变成整数。类似地，如果数值本身就是整数，只是小数点后面跟着0（如1.0），那它也会被转换为整数，如下例所示：

```js
let floatNum1 = 1.; // 小数点后面没有数字，当成整数1 处理
let floatNum2 = 10.0; // 小数点后面是零，当成整数10 处理
```

四、为什么0.1+0.2 = 0.30000000000000004

JavaScript使用Number类型表示数字（整数和浮点数），遵循[IEEE 754标准](https://zh.wikipedia.org/wiki/IEEE_754)，通过64位来表示一个数字，其中：

* 第0位：符号位， 0代表整数，1代表负数（s）
* 第1到11位：储存指数部分（e）
* 第12到63位：储存小数部分（f）

计算过程：

1、进制转换

0.1和0.2转换成二进制后会无限循环

```md
0.1 -> 0.0001100110011001...(无限循环)
0.2 -> 0.0011001100110011...(无限循环)
```

但是由于IEEE 754尾数位数限制，需要将后面多余的位截掉。在此过程中精度损失。

2、对阶运算

由于指数位数不相同，运算时需要对阶运算 这部分也可能产生精度损失。

按照上面两步运算（包括两步的精度损失），最后的结果是：

```js
0.0100110011001100110011001100110011001100110011001100 
```

结果转换成十进制之后就是0.30000000000000004。

其中，**精度损失可能出现在进制转化和对阶运算过程中**。

五、字符串赋值的过程

```js
let lang = "Java";
lang = lang + "Script";
```

这里，变量lang 一开始包含字符串"Java"。紧接着，lang 被重新定义为包含"Java"和"Script"的组合，也就是"JavaScript"。整个过程首先会分配一个足够容纳10 个字符的空间，然后填充上"Java"和"Script"。最后销毁原始的字符串"Java"和字符串"Script"，因为这两个字符串都没有用了。所有处理都是在后台发生的。

六、ECMAScript6 新增了使用模板字面量定义字符串的能力。模板字符串所有插入的值都会使用toString()强制转型为字符串，而且任何JavaScript 表达式都可以用于插值。

七、ECMAScript 6 也引入了一批常用内置符号（well-known symbol），用于暴露语言内部行为，开发者可以直接访问、重写或模拟这些行为。这些内置符号都以 Symbol 工厂函数字符串属性的形式存在。
例如，ECMAScript 6 也引入了一批常用内置符号（well-known symbol），用于暴露语言内部行为，开发者可以直接访问、重写或模拟这些行为。这些内置符号都以 Symbol 工厂函数字符串属性的形式存在。
在提到 ECMAScript 规范时，经常会引用符号在规范中的名称，前缀为@@。比如，@@iterator 指的就是 Symbol.iterator。

八、Object本身的实例并不是很有用，但它是派生其他对象的基类。Object 类型的所有属性和方法在派生的对象上同样存在。每个Object实例都有如下属性和方法：

* constructor：用于创建当前对象的函数。
* hasOwnProperty(propertyName)：用于判断当前对象实例（不是原型）上是否存在给定的属性。要检查的属性名必须是字符串或符号。
* isPrototypeOf(object)：用于判断当前对象是否是另一个对象的原型。
* propertyIsEnumerable(propertyName)：用于判断给定的属性是否可以使用。
* toLocaleString()：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。
* toString()：返回对象的字符串表示。
* valueOf()：返回对象对应的字符串、数值或布尔值表示。通常与toString()返回值相同。

九、break和continue

break 语句用于立即退出循环，强制执行循环后的下一条语句。而 continue 语句也用于立即退出循环，但会再次从循环顶部开始执行。

```js
let num = 0;
for (let i = 1; i < 10; i++) {
  if (i % 5 === 0) {
    break;
  }
  num++;
}
console.log(num); // 4

let num = 0;
for (let i = 1; i < 10; i++) {
  if (i % 5 === 0) {
    continue;
  }
  num++;
}
console.log(num); // 8
```
