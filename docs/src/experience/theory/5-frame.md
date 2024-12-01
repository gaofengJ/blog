---
title: 框架
description: 框架
---

# 框架面试题

## 单页面应用和多页面应用的区别 <span style="padding: 2px 8px; background: #7EC699; color: #FFF; border-radius: 4px;">低频</span>

| 特性 | 单页面应用（SPA） | 多页面应用（MPA） |
| --- | --- | --- |
| 页面加载 | 初次加载所有资源，之后局部更新 | 每次切换页面都会重新加载页面 |
| 路由管理 | 客户端路由（如 React Router）| 服务端路由，每个页面有独立的 URL |
| 性能 | 初次加载较慢，但页面切换快 | 每次切换页面较慢，加载速度较慢 |
| SEO | 对 SEO 有挑战，需要 SSR 或 SSG | 每个页面独立，SEO 优化较简单 |
| 开发复杂度 | 前后端分离，开发复杂 | 传统后端渲染，开发相对简单 |
| 适用场景 | 高交互、高性能应用 | 内容型、SEO 需求较高的站点 |

## Vue / React 项目中为什么要在列表组件中写 key，作用是什么? <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

在 Vue 和 React 项目中，为列表组件的每个元素编写 key 属性非常重要，起作用如下：

* **性能优化**

  key 属性帮助 React 和 Vue 识别哪些元素发生了变化、被添加或删除。这使得虚拟 DOM 可以最小化真实 DOM 的变更，提高性能。

* **稳定标识**

  key 属性为元素提供稳定的标识，避免在元素重新排序、插入或删除时出现问题。如果没有唯一的 key，整个列表在每次变更时都会重新渲染，导致潜在的错误和效率低下。

* **避免不一致行为**

  当列表中的元素位置发生变化时，使用 key 属性可以确保 React 和 Vue 只更新必要的元素，避免因缺少唯一标识而引起的不一致行为。

## Hash 和 History <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

* **History 路由**

  * 使用 HTML5 的 pushState 和 replaceState 实现，可以改变浏览器的 URL 而不重新加载页面，URL 更加清晰且符合传统页面的格式。
  * 需要服务器支持：如果刷新页面，服务器需要返回正确的页面，而不是 404 错误。
  * 兼容性：需要现代浏览器支持 HTML5 的 History API。

* **Hash 路由**

  * 利用 URL 中的 # 来表示路由状态，浏览器不会发送 hash 后的内容到服务器，因此刷新页面时不会出错。
  * URL 显得不太友好，因为包含了 # 符号。
  * 兼容性好，支持大部分浏览器，包括早期版本。

## React 和 Vue 的区别

React 和 Vue 都是流行的前端框架/库，它们的设计理念、开发方式以及使用场景都有一些不同。以下是它们的一些关键区别：

* **设计理念和核心思想**

  * React

    * React 是一个 UI 库，关注的是视图层。它的设计理念是函数式编程，使用 声明式编程 来构建 UI。
    * React 使用 虚拟 DOM 来提高性能，在每次渲染时会先在内存中进行对比计算，然后再更新实际的 DOM。
    * React 提供了 React.createElement() 和 JSX 语法，通过函数组件来定义 UI。

  * Vue

    * Vue 是一个渐进式框架，提供了更全面的功能，包含了模板、视图层、路由、状态管理等工具。
    * Vue 更注重声明式模板，你可以通过 HTML、CSS、JavaScript 进行开发。它的模板语法更接近传统的 HTML，容易上手。
    * Vue 也使用 虚拟 DOM，但 Vue 的响应式系统比 React 更为直观，通过 依赖追踪 实现高效的更新。

* **生态系统和集成**

  * React

    React 本身只关注视图层，更多的功能通过第三方库来实现。你需要使用 React Router 来处理路由，使用 Redux 或 Context API 来管理状态。
    React 的生态系统庞大，有非常多的库和工具，灵活性很高。

  * Vue

    Vue 提供了一套完整的生态系统，包括 Vue Router 和 Vuex（状态管理）。这些工具是 Vue 官方提供的，并与 Vue 紧密集成，开发体验一致。
    Vue 是一个“渐进式框架”，你可以根据需要选择使用 Vue 的不同功能，例如只使用 Vue 的视图层，或者全面使用 Vue 的状态管理、路由等。

* **学习曲线**

  * React

    * React 的学习曲线稍微陡峭，尤其是要掌握 JSX、虚拟 DOM、生命周期、Hooks、状态管理等概念。
    * 对于初学者来说，理解函数式编程的思想可能需要一些时间。

  * Vue

    * Vue 的学习曲线较为平缓，尤其是对于有 HTML 和 JavaScript 基础的人来说，Vue 的模板语法非常直观，且 Vue 提供了大量的文档和教程。
    * Vue 的设计更符合传统的前端开发习惯，因此上手速度较快。

* **性能**

  * React

    * React 的虚拟 DOM 和高效的差异化算法使其性能非常优秀，尤其是在大型应用中表现出色。
    * React 通过 React.memo、useMemo 等机制优化性能。

  * Vue

    * Vue 在响应式数据绑定方面的性能也非常优秀，特别是在更新 DOM 时，Vue 会根据依赖关系进行高效的更新，减少不必要的 DOM 操作。
    * Vue 3 引入了 Composition API，进一步提高了性能和代码的可维护性。

* **社区支持和生态**

  * React

    * React 拥有庞大的社区支持和非常丰富的资源，包括教程、插件、库等。由于其使用广泛，企业和开源项目对 React 的支持非常多。

  * Vue

    * Vue 的社区相对较小，但近年来增长迅速，特别是在中国和一些小型项目中，Vue 的使用非常广泛。Vue 提供的文档、工具和教程也非常完善。

## 什么是虚拟 DOM

虚拟 DOM（Virtual DOM）是一种编程概念，它是一种轻量级的、在内存中对真实 DOM 进行模拟的表示方式。在现代 JavaScript 前端框架（如 React 和 Vue）中，虚拟 DOM 是提高 UI 渲染性能的关键技术之一。

**虚拟 DOM 的工作原理**

1. 当我们修改组件的状态或数据时，框架会首先在虚拟 DOM 中更新这些变化，而不是直接修改真实的 DOM。
2. 然后，框架会通过比较虚拟 DOM 中前后两次的差异（称为 diff 算法），计算出哪些部分的 DOM 需要更新。
3. 最后，框架会将虚拟 DOM 中的变化最小化地应用到真实的 DOM 中，从而避免了直接操作真实 DOM 带来的性能问题。

虚拟 DOM 主要解决了直接操作 DOM 的高性能问题，尤其是在需要频繁更新 DOM 时，传统的 DOM 操作会导致性能瓶颈。通过虚拟 DOM，框架能够进行更高效的渲染，减少不必要的重新渲染操作。

**虚拟 DOM 的作用**

1. 性能优化：

* 直接操作真实 DOM 是一个高昂的操作。每次 DOM 更新时，浏览器都需要进行渲染和重排，尤其在大量数据变动时，这会极大影响性能。
* 虚拟 DOM 可以先在内存中进行 DOM 更新，然后通过 diff 算法计算前后差异，最小化更新到真实 DOM 的操作。这样可以大大减少不必要的重渲染，从而提高性能。

2. 通过 diff 算法优化渲染：

虚拟 DOM 使得渲染过程更加智能。通过比较旧的虚拟 DOM 树和新的虚拟 DOM 树，框架能精确地找到需要更新的 DOM 部分，并避免不必要的全局渲染。

3. 提升开发效率：

使用虚拟 DOM，开发者可以专注于声明式编程，而不需要手动操作 DOM。框架会处理所有细节，提高开发效率，减少了开发者在更新 UI 时的负担。

## 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作

在 Vuex 和 Redux 中，mutations 和 reducers 都是同步的，不能执行异步操作。这是为了确保状态变更的可预测性和调试的方便性。

在 Vuex 中，mutations 是同步函数，专门用来修改 state。如果在 mutations 中引入异步操作，会使状态变得不可预测，因为你无法确定什么时候异步操作完成，何时状态会被实际更新。这会使得调试变得困难，因为你无法精确跟踪状态的变化顺序​。

在 Redux 中，reducers 也是纯函数，意味着相同的输入（当前状态和 action）必须产生相同的输出（新的状态）。引入异步操作会打破这个原则，因为异步操作的完成时间不可控，导致 reducers 的执行顺序不确定，这会使得状态变得难以管理和预测。

因此，在 Vuex 和 Redux 中，异步操作应放在 actions 中。actions 可以包含异步逻辑，并在异步操作完成后通过提交 mutations 或 dispatch actions 来更新 state，从而保持状态变更的可预测性和一致性。

## Virtual DOM 真的比操作原生 DOM 快吗

* **原生 DOM 操作 vs. 通过框架封装操作**

  这是一个性能 vs 可维护性的取舍。框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。针对任何一个 benchmark，我都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，你难道为每一个地方都去做手动优化吗？出于可维护性的考虑，这显然不可能。框架给你的保证是，你在不需要手动优化的情况下，我依然可以给你提供过得去的性能。

* **对 React 的 Virtual DOM 的误解**

  React 从来没有说过 “React 比原生操作 DOM 快”。React 的基本思维模式是每次有变动就整个重新渲染整个应用。如果没有 Virtual DOM，简单来想就是直接重置 innerHTML。很多人都没有意识到，在一个大型列表所有数据都变了的情况下，重置 innerHTML 其实是一个还算合理的操作... 真正的问题是在 “全部重新渲染” 的思维模式下，即使只有一行数据变了，它也需要重置整个 innerHTML，这时候显然就有大量的浪费。

  我们可以比较一下 `innerHTML` vs `Virtual DOM` 的重绘性能消耗：

  * innerHTML: render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)
  * Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)

  Virtual DOM render + diff 显然比渲染 html 字符串要慢，但是！它依然是纯 js 层面的计算，比起后面的 DOM 操作来说，依然便宜了太多。可以看到，innerHTML 的总计算量不管是 js 计算还是 DOM 操作都是和整个界面的大小相关，但 Virtual DOM 的计算量里面，只有 js 计算和界面大小相关，DOM 操作是和数据的变动量相关的。前面说了，和 DOM 操作比起来，js 计算是极其便宜的。这才是为什么要有 Virtual DOM：它保证了1、不管你的数据变化多少，每次重绘的性能都可以接受；2、你依然可以用类似 innerHTML 的思路去写你的应用。

* **MVVM vs Virtual DOM**

  相比起 React，其他 MVVM 系框架比如 Angular, Knockout 以及 Vue、Avalon 采用的都是数据绑定：通过 Directive/Binding 对象，观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的操作。MVVM 的变化检查是数据层面的，而 React 的检查是 DOM 结构层面的。MVVM 的性能也根据变动检测的实现原理有所不同：Angular 的脏检查使得任何变动都有固定的
O(watcher count) 的代价；Knockout/Vue/Avalon 都采用了依赖收集，在 js 和 DOM 层面都是 O(change)：

  * 脏检查：scope digest O(watcher count) + 必要 DOM 更新 O(DOM change)
  * 依赖收集：重新收集依赖 O(data change) + 必要 DOM 更新 O(DOM change)可以看到，Angular 最不效率的地方在于任何小变动都有的和 watcher 数量相关的性能代价。但是！当所有数据都变了的时候，Angular 其实并不吃亏。依赖收集在初始化和数据变化的时候都需要重新收集依赖，这个代价在小量更新的时候几乎可以忽略，但在数据量庞大的时候也会产生一定的消耗。

  MVVM 渲染列表的时候，由于每一行都有自己的数据作用域，所以通常都是每一行有一个对应的 ViewModel 实例，或者是一个稍微轻量一些的利用原型继承的 "scope" 对象，但也有一定的代价。所以，MVVM 列表渲染的初始化几乎一定比 React 慢，因为创建 ViewModel / scope 实例比起 Virtual DOM 来说要昂贵很多。这里所有 MVVM 实现的一个共同问题就是在列表渲染的数据源变动时，尤其是当数据是全新的对象时，如何有效地复用已经创建的 ViewModel 实例和 DOM 元素。假如没有任何复用方面的优化，由于数据是 “全新” 的，MVVM 实际上需要销毁之前的所有实例，重新创建所有实例，最后再进行一次渲染！这就是为什么题目里链接的 angular/knockout 实现都相对比较慢。相比之下，React 的变动检查由于是 DOM 结构层面的，即使是全新的数据，只要最后渲染结果没变，那么就不需要做无用功。

  Angular 和 Vue 都提供了列表重绘的优化机制，也就是 “提示” 框架如何有效地复用实例和 DOM 元素。比如数据库里的同一个对象，在两次前端 API 调用里面会成为不同的对象，但是它们依然有一样的 uid。这时候你就可以提示 track by uid 来让 Angular 知道，这两个对象其实是同一份数据。那么原来这份数据对应的实例和 DOM 元素都可以复用，只需要更新变动了的部分。或者，你也可以直接 track by $index 来进行 “原地复用”：直接根据在数组里的位置进行复用。在题目给出的例子里，如果 angular 实现加上 track by $index 的话，后续重绘是不会比 React 慢多少的。甚至在 dbmonster 测试中，Angular 和 Vue 用了 track by $index 以后都比 React 快: dbmon（注意 Angular 默认版本无优化，优化过的在下面）

顺道说一句，React 渲染列表的时候也需要提供 key 这个特殊 prop，本质上和 track-by 是一回事。

* **性能比较也要看场合**

在比较性能的时候，要分清楚初始渲染、小量数据更新、大量数据更新这些不同的场合。Virtual DOM、脏检查 MVVM、数据收集 MVVM 在不同场合各有不同的表现和不同的优化需求。Virtual DOM 为了提升小量数据更新时的性能，也需要针对性的优化，比如 shouldComponentUpdate 或是 immutable data。

* **初始渲染**：Virtual DOM > 脏检查 >= 依赖收集
* **小量数据更新**：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
* **大量数据更新**：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化

不要天真地以为 Virtual DOM 就是快，diff 不是免费的，batching 么 MVVM 也能做，而且最终 patch 的时候还不是要用原生 API。在我看来 Virtual DOM 真正的价值从来都不是性能，而是它 1、 为函数式的 UI 编程方式打开了大门；2、 可以渲染到 DOM 以外的 backend，比如 ReactNative。

* **总结**

以上这些比较，更多的是对于框架开发研究者提供一些参考。主流的框架 + 合理的优化，足以应对绝大部分应用的性能需求。如果是对性能有极致需求的特殊情况，其实应该牺牲一些可维护性采取手动优化：比如 Atom 编辑器在文件渲染的实现上放弃了 React 而采用了自己实现的 tile-based rendering；又比如在移动端需要 DOM-pooling 的虚拟滚动，不需要考虑顺序变化，可以绕过框架的内置实现自己搞一个。

## React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的

在讨论 React 和 Vue 的 diff 算法时，提到的时间复杂度 O(n³) 和 O(n) 的计算方式源自不同算法的工作原理。

**O(n³) 复杂度的计算**

最初的 diff 算法基于树的结构进行比较，它试图找到两个树之间的最优差异，即最小化更改所需的步骤。这个问题可以看作是一个带有约束的编辑距离问题，其复杂度主要体现在以下几点：

* 树的深度：对于树的每一层，需要比较所有可能的子节点组合。
* 广度的平方：在比较时，必须考虑所有可能的匹配方式，这就意味着每一层的比较次数是当前节点数的平方。
* 递归遍历：由于每个节点的子树也需要进行类似的比较，因此整个过程会递归进行。
因此，对于一个有 n 个节点的树，这个算法需要在每一层执行大量的计算，最终导致时间复杂度达到 O(n³)​ (Computer Science Stack Exchange)。

```js
function diffTrees(nodeA, nodeB) {
  if (!nodeA && !nodeB) return 0;
  if (!nodeA || !nodeB) return 1; // One node is missing, so it's a difference

  let cost = nodeA.value === nodeB.value ? 0 : 1;

  // Recursively calculate the cost for all children
  let minCost = Infinity;
  for (let i = 0; i < nodeA.children.length; i++) {
    for (let j = 0; j < nodeB.children.length; j++) {
      minCost = Math.min(minCost, diffTrees(nodeA.children[i], nodeB.children[j]));
    }
  }

  return cost + minCost;
}

// Example usage with small trees (simplified for clarity)
let treeA = { value: 'a', children: [{ value: 'b', children: [] }, { value: 'c', children: [] }] };
let treeB = { value: 'a', children: [{ value: 'b', children: [] }, { value: 'd', children: [] }] };

console.log(diffTrees(treeA, treeB)); // Output could be very high due to O(n³) complexity
```

**O(n) 复杂度的计算**

为了提高效率，React 和 Vue 都引入了虚拟 DOM 的概念，并采用了一种基于启发式的 diff 算法。这种算法的核心思想是：

* 假设大多数节点在更新时位置不会变化：算法只在同一级别的节点之间进行比较，而不需要遍历整个树的所有可能组合。
* 线性遍历：通过对虚拟 DOM 的线性遍历，算法可以直接找到需要更新的节点，并跳过不需要比较的部分。这样，每个节点只需遍历一次，避免了深度的递归计算。
* 唯一键的使用：在 React 中，通过 key 属性，算法可以快速定位哪些节点需要更新，哪些节点可以复用，从而进一步优化计算量。

通过这些优化，diff 算法将复杂度降低到了 O(n)，即每次更新只需一次线性遍历即可完成，这使得在处理大型应用时性能显著提升

```js
function diffTreesOptimized(nodeA, nodeB) {
  if (!nodeA && !nodeB) return 0;
  if (!nodeA || !nodeB) return 1; // One node is missing, so it's a difference

  let cost = nodeA.value === nodeB.value ? 0 : 1;

  // Linear scan through children, assuming keys or order won't change drastically
  let maxLength = Math.max(nodeA.children.length, nodeB.children.length);
  for (let i = 0; i < maxLength; i++) {
    cost += diffTreesOptimized(nodeA.children[i], nodeB.children[i]);
  }

  return cost;
}

// Example usage with the same trees
console.log(diffTreesOptimized(treeA, treeB));
```

## Redux 和 Vuex 的设计思想

Redux 和 Vuex 都是用于状态管理的库，但它们有不同的设计思想和实现方式。

* **Redux**

  * 不可变性：Redux 强调状态的不可变性。当一个动作被分发时，会创建一个新的状态对象。这样，通过对比新旧状态对象的引用，可以高效地确定哪些部分发生了变化。不可变性使得 Redux 的状态管理更加可预测和容易调试​ (Stack Overflow)​​ (LogRocket Blog)​。

  * 函数式编程：Redux 倾向于使用函数式编程范式，强调纯函数（即 reducer）来处理状态变更。这种方式使得 Redux 的逻辑更加清晰，容易测试和维护​ (Stack Overflow)​。

  * 生态系统：Redux 具有庞大的生态系统，包含许多中间件和工具，如 Redux Thunk 和 Redux Saga，用于处理异步操作

* **Vuex**

  * Vuex 利用 Vue.js 的响应式系统。状态在 Vuex 中是可观察的，当状态改变时，所有依赖该状态的组件会自动更新​ (Stack Overflow)​​ (LogRocket Blog)​。

  * 面向对象：Vuex 更加面向对象，提供了类似 getter 和 mutation 的机制来获取和修改状态。这使得 Vuex 的使用更加简洁，但也增加了直接修改状态的风险​ (Stack Overflow)​。

  * 简化的状态管理：由于 Vuex 与 Vue.js 紧密集成，状态管理和组件间通信非常顺畅，无需像 Redux 那样使用中间件来处理异步操作

* **使用场景**

  * Redux 更适合大型应用和需要复杂状态管理的场景，特别是在需要严格控制状态变更和调试的情况下。Redux 的不可变性和纯函数使得状态管理更加可靠和可预测。

  * Vuex 更适合 Vue.js 应用，尤其是中小型项目。Vuex 利用 Vue 的响应式特性，使得状态管理更加自然和简便，适合快速开发和迭代。

## 如何将 template 转化为 虚拟 dom <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

将 template 转化为虚拟 DOM 是 Vue 的核心工作之一，通常发生在 Vue 的 编译阶段。以下是该过程的核心流程，以及每一步的关键点：

1. **解析模板**

**过程：将模板解析为抽象语法树（AST）**

* 解析器 会将 template 字符串解析成对应的 抽象语法树 (AST)，用于描述模板的结构和内容。

* 步骤：
  1. 词法分析： 将模板字符串分割为标签、属性、文本等语法单元（tokens）。
  2. 语法分析： 根据 tokens 构建嵌套的树状结构，生成描述模板的 AST。

示例：

```html
<template>
  <div id="app">
    <h1>Hello, {{ name }}</h1>
    <p v-if="isVisible">This is a paragraph.</p>
  </div>
</template>
```

转为 AST：

```json
{
  "type": "element",
  "tag": "div",
  "attributes": [{ "name": "id", "value": "app" }],
  "children": [
    {
      "type": "element",
      "tag": "h1",
      "children": [
        { "type": "text", "content": "Hello, " },
        { "type": "expression", "content": "name" }
      ]
    },
    {
      "type": "element",
      "tag": "p",
      "directive": { "name": "if", "value": "isVisible" },
      "children": [{ "type": "text", "content": "This is a paragraph." }]
    }
  ]
}

```

2. **优化 AST**

**过程：标记静态节点**

* 在 Vue3 中，优化器会在编译阶段对 AST 进行静态分析，将不需要更新的静态节点标记为 静态，以便跳过这些节点的更新过程。

* 步骤：
  1. 深度遍历 AST。
  2. 判断每个节点是否依赖响应式数据：
  * 静态节点：不依赖响应式数据。
  * 动态节点：依赖响应式数据（如 v-bind、v-if、插值表达式等）。

* 优化的作用：
  * 降低运行时 diff 的计算量，提升性能。

3. **生成渲染函数**

**过程：将 AST 转化为渲染函数代码**

* 编译器会将 AST 转换为 渲染函数（render function） 的 JavaScript 代码。
* 渲染函数 是一个返回虚拟 DOM 的函数。

示例：

对于上述模板，渲染函数可能生成如下代码：

```js
function render() {
  return {
    type: 'div',
    props: { id: 'app' },
    children: [
      {
        type: 'h1',
        children: [
          { type: 'text', content: 'Hello, ' },
          { type: 'expression', content: this.name }
        ]
      },
      this.isVisible
        ? {
            type: 'p',
            children: [{ type: 'text', content: 'This is a paragraph.' }]
          }
        : null
    ]
  };
}

```

4. 创建虚拟 DOM

**过程：执行渲染函数生成虚拟 DOM 树**

* 当组件挂载或更新时，Vue 调用渲染函数，返回虚拟 DOM 树。
* 虚拟 DOM 是一个轻量化的 JavaScript 对象，描述了真实 DOM 的结构。

```js
const vdom = render.call({ name: 'World', isVisible: true });
console.log(vdom);
// 输出：
{
  type: 'div',
  props: { id: 'app' },
  children: [
    {
      type: 'h1',
      children: [
        { type: 'text', content: 'Hello, ' },
        { type: 'expression', content: 'World' }
      ]
    },
    {
      type: 'p',
      children: [{ type: 'text', content: 'This is a paragraph.' }]
    }
  ]
}

```

5. 虚拟 DOM 渲染到真实 DOM

虚拟 DOM 树通过 diff 算法 和 patch 过程 被映射为真实 DOM 或更新已有 DOM。

核心流程总结

1. **解析模板**：

将模板字符串解析为抽象语法树（AST）。

2. **优化 AST**：

静态分析，标记静态节点，提升性能。

3. **生成渲染函数**：

将 AST 转化为返回虚拟 DOM 的渲染函数。

4. **生成虚拟 DOM**：

执行渲染函数，生成轻量化的虚拟 DOM 树。

5. **渲染或更新**：

根据虚拟 DOM 树生成或更新真实 DOM。
