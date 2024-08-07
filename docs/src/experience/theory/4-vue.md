---
title: Vue
description: Vue
---

# Vue 面试题

## Vue / React 项目中为什么要在列表组件中写 key，作用是什么?

在 Vue 和 React 项目中，为列表组件的每个元素编写 key 属性非常重要，起作用如下：

* **性能优化**

key 属性帮助 React 和 Vue 识别哪些元素发生了变化、被添加或删除。这使得虚拟 DOM 可以最小化真实 DOM 的变更，提高性能。

* **稳定标识**

key 属性为元素提供稳定的标识，避免在元素重新排序、插入或删除时出现问题。如果没有唯一的 key，整个列表在每次变更时都会重新渲染，导致潜在的错误和效率低下。

* **避免不一致行为**

当列表中的元素位置发生变化时，使用 key 属性可以确保 React 和 Vue 只更新必要的元素，避免因缺少唯一标识而引起的不一致行为。

## Vue的双向绑定，Model和View如何互相影响

在 Vue.js 中，双向数据绑定的实现主要依靠 Vue 的响应式系统（reactive system）和 v-model 指令。这里简单解释一下它的工作机制：

* Model 如何改变 View

当 Vue 实例的数据发生变化时，Vue 的响应式系统会捕捉到这些变化。Vue 会通过依赖追踪机制，找到所有依赖该数据的组件和 DOM 元素，并通知它们更新。这是通过使用 Object.defineProperty 或 Proxy（Vue 3）来劫持数据属性的 getter 和 setter 实现的。当数据发生变化时，setter 会触发相应的视图更新。

* View 如何改变 Model

Vue 的 v-model 指令提供了一种简单的方式来实现表单控件和应用数据之间的双向绑定。当用户在表单控件中输入数据时，v-model 会监听控件的输入事件（如 input 事件），并将控件的值更新到 Vue 实例的数据中。这样，视图的变化（用户输入）会通过事件绑定的方式反映到模型数据上。

## Virtual DOM 真的比操作原生 DOM 快吗

### 1. 原生 DOM 操作 vs. 通过框架封装操作

这是一个性能 vs. 可维护性的取舍。框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。针对任何一个 benchmark，我都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，你难道为每一个地方都去做手动优化吗？出于可维护性的考虑，这显然不可能。框架给你的保证是，你在不需要手动优化的情况下，我依然可以给你提供过得去的性能。

### 2. 对 React 的 Virtual DOM 的误解

React 从来没有说过 “React 比原生操作 DOM 快”。React 的基本思维模式是每次有变动就整个重新渲染整个应用。如果没有 Virtual DOM，简单来想就是直接重置 innerHTML。很多人都没有意识到，在一个大型列表所有数据都变了的情况下，重置 innerHTML 其实是一个还算合理的操作... 真正的问题是在 “全部重新渲染” 的思维模式下，即使只有一行数据变了，它也需要重置整个 innerHTML，这时候显然就有大量的浪费。

我们可以比较一下 innerHTML vs. Virtual DOM 的重绘性能消耗：

* innerHTML: render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)
* Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)

Virtual DOM render + diff 显然比渲染 html 字符串要慢，但是！它依然是纯 js 层面的计算，比起后面的 DOM 操作来说，依然便宜了太多。可以看到，innerHTML 的总计算量不管是 js 计算还是 DOM 操作都是和整个界面的大小相关，但 Virtual DOM 的计算量里面，只有 js 计算和界面大小相关，DOM 操作是和数据的变动量相关的。前面说了，和 DOM 操作比起来，js 计算是极其便宜的。这才是为什么要有 Virtual DOM：它保证了1、不管你的数据变化多少，每次重绘的性能都可以接受；2、你依然可以用类似 innerHTML 的思路去写你的应用。

### 3. MVVM vs. Virtual DOM

相比起 React，其他 MVVM 系框架比如 Angular, Knockout 以及 Vue、Avalon 采用的都是数据绑定：通过 Directive/Binding 对象，观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的操作。MVVM 的变化检查是数据层面的，而 React 的检查是 DOM 结构层面的。MVVM 的性能也根据变动检测的实现原理有所不同：Angular 的脏检查使得任何变动都有固定的
O(watcher count) 的代价；Knockout/Vue/Avalon 都采用了依赖收集，在 js 和 DOM 层面都是 O(change)：

* 脏检查：scope digest O(watcher count) + 必要 DOM 更新 O(DOM change)
* 依赖收集：重新收集依赖 O(data change) + 必要 DOM 更新 O(DOM change)可以看到，Angular 最不效率的地方在于任何小变动都有的和 watcher 数量相关的性能代价。但是！当所有数据都变了的时候，Angular 其实并不吃亏。依赖收集在初始化和数据变化的时候都需要重新收集依赖，这个代价在小量更新的时候几乎可以忽略，但在数据量庞大的时候也会产生一定的消耗。

MVVM 渲染列表的时候，由于每一行都有自己的数据作用域，所以通常都是每一行有一个对应的 ViewModel 实例，或者是一个稍微轻量一些的利用原型继承的 "scope" 对象，但也有一定的代价。所以，MVVM 列表渲染的初始化几乎一定比 React 慢，因为创建 ViewModel / scope 实例比起 Virtual DOM 来说要昂贵很多。这里所有 MVVM 实现的一个共同问题就是在列表渲染的数据源变动时，尤其是当数据是全新的对象时，如何有效地复用已经创建的 ViewModel 实例和 DOM 元素。假如没有任何复用方面的优化，由于数据是 “全新” 的，MVVM 实际上需要销毁之前的所有实例，重新创建所有实例，最后再进行一次渲染！这就是为什么题目里链接的 angular/knockout 实现都相对比较慢。相比之下，React 的变动检查由于是 DOM 结构层面的，即使是全新的数据，只要最后渲染结果没变，那么就不需要做无用功。

Angular 和 Vue 都提供了列表重绘的优化机制，也就是 “提示” 框架如何有效地复用实例和 DOM 元素。比如数据库里的同一个对象，在两次前端 API 调用里面会成为不同的对象，但是它们依然有一样的 uid。这时候你就可以提示 track by uid 来让 Angular 知道，这两个对象其实是同一份数据。那么原来这份数据对应的实例和 DOM 元素都可以复用，只需要更新变动了的部分。或者，你也可以直接 track by $index 来进行 “原地复用”：直接根据在数组里的位置进行复用。在题目给出的例子里，如果 angular 实现加上 track by $index 的话，后续重绘是不会比 React 慢多少的。甚至在 dbmonster 测试中，Angular 和 Vue 用了 track by $index 以后都比 React 快: dbmon（注意 Angular 默认版本无优化，优化过的在下面）

顺道说一句，React 渲染列表的时候也需要提供 key 这个特殊 prop，本质上和 track-by 是一回事。

### 4. 性能比较也要看场合

在比较性能的时候，要分清楚初始渲染、小量数据更新、大量数据更新这些不同的场合。Virtual DOM、脏检查 MVVM、数据收集 MVVM 在不同场合各有不同的表现和不同的优化需求。Virtual DOM 为了提升小量数据更新时的性能，也需要针对性的优化，比如 shouldComponentUpdate 或是 immutable data。

* 初始渲染：Virtual DOM > 脏检查 >= 依赖收集
* 小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
* 大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化

不要天真地以为 Virtual DOM 就是快，diff 不是免费的，batching 么 MVVM 也能做，而且最终 patch 的时候还不是要用原生 API。在我看来 Virtual DOM 真正的价值从来都不是性能，而是它 1、 为函数式的 UI 编程方式打开了大门；2、 可以渲染到 DOM 以外的 backend，比如 ReactNative。

### 5. 总结

以上这些比较，更多的是对于框架开发研究者提供一些参考。主流的框架 + 合理的优化，足以应对绝大部分应用的性能需求。如果是对性能有极致需求的特殊情况，其实应该牺牲一些可维护性采取手动优化：比如 Atom 编辑器在文件渲染的实现上放弃了 React 而采用了自己实现的 tile-based rendering；又比如在移动端需要 DOM-pooling 的虚拟滚动，不需要考虑顺序变化，可以绕过框架的内置实现自己搞一个。

## 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作

在 Vuex 和 Redux 中，mutations 和 reducers 都是同步的，不能执行异步操作。这是为了确保状态变更的可预测性和调试的方便性。

在 Vuex 中，mutations 是同步函数，专门用来修改 state。如果在 mutations 中引入异步操作，会使状态变得不可预测，因为你无法确定什么时候异步操作完成，何时状态会被实际更新。这会使得调试变得困难，因为你无法精确跟踪状态的变化顺序​。

在 Redux 中，reducers 也是纯函数，意味着相同的输入（当前状态和 action）必须产生相同的输出（新的状态）。引入异步操作会打破这个原则，因为异步操作的完成时间不可控，导致 reducers 的执行顺序不确定，这会使得状态变得难以管理和预测。

因此，在 Vuex 和 Redux 中，异步操作应放在 actions 中。actions 可以包含异步逻辑，并在异步操作完成后通过提交 mutations 或 dispatch actions 来更新 state，从而保持状态变更的可预测性和一致性。

## 在 Vue 中，子组件为何不可以修改父组件传递的 Prop?

如果修改了，Vue 是如何监控到属性的修改并给出警告的

在 Vue 中，子组件不能直接修改父组件传递的 Prop。这样设计的主要原因是为了确保单向数据流和组件的独立性。Prop 是从父组件传递到子组件的单向绑定，当父组件的属性更新时，新的值会传递到子组件，但反之则不然。这种机制可以防止子组件意外地修改父组件的状态，从而导致数据流难以理解和维护。

如果子组件直接修改 Prop，Vue 会在开发环境中发出警告。Vue 通过在实例初始化时对 Prop 进行 getter/setter 转换来实现这个监控。当子组件试图直接修改 Prop 时，Vue 会检测到这种操作并发出警告，提示开发者不要这样做。

一个常见的解决方案是使用本地副本。如果需要在子组件中修改传递的 Prop，可以在子组件中创建一个本地的 data 属性并将 Prop 的值复制到这个本地属性，然后对子组件中的本地属性进行修改。另外，可以通过事件来与父组件进行通信，子组件在需要修改 Prop 时，发送一个事件给父组件，父组件接收到事件后修改自己的状态，再将更新后的 Prop 传递回子组件。

这种方式可以确保数据流的清晰和可维护性。

## 双向绑定和 vuex 是否冲突

当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 `v-model` 会比较棘手：

```html
<input v-model="obj.message">
```

假设这里的 obj 是在计算属性中返回的一个属于 Vuex store 的对象，在用户输入时，`v-model` 会试图直接修改 obj.message。在严格模式中，由于这个修改不是在 mutation 函数中执行的, 这里会抛出一个错误。

用“Vuex 的思维”去解决这个问题的方法是：给 `<input>` 中绑定 value，然后侦听 input 或者 change 事件，在事件回调中调用一个方法:

```js
// 业务代码
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}


// mutations 函数
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```

## 为什么 Vue3 采用了 Proxy，抛弃了 Object.defineProperty

* 全面的拦截能力：Proxy 可以拦截包括属性读取、属性设置、属性删除等多种操作，而不仅仅是数据的变更。相比之下，Object.defineProperty 只能劫持属性的 getter 和 setter​​​。

* 性能优化：Object.defineProperty 在处理数组时存在性能瓶颈，特别是在数组的新增和删除操作上，需要手动重写数组的常用方法。而 Proxy 能更高效地处理这些操作，因为它能够直接拦截所有类型的操作，无需重新定义数组的方法​​。

* 灵活性和简洁性：Proxy 允许在一个地方定义所有的拦截逻辑，而不需要在每个属性上重复定义 getter 和 setter。这使得代码更简洁和易于维护​​。

* 支持复杂的数据结构：Proxy 对嵌套对象的处理也更加自然，可以递归地应用于所有嵌套的属性。而使用 Object.defineProperty 处理嵌套对象则需要更多的手动工作​​。

## Vue 的父组件和子组件生命周期钩子执行顺序是什么

* 加载渲染过程
  * 1.父beforeCreate
  * 2.父created
  * 3.父beforeMount
  * 4.子beforeCreate
  * 5.子created
  * 6.子beforeMount
  * 7.子mounted
  * 8.父mounted

* 子组件更新过程
  * 1.父beforeUpdate
  * 2.子beforeUpdate
  * 3.子updated
  * 4.父updated

* 父组件更新过程
  * 父beforeUpdate
  * 父updated

* 销毁过程
  * 1.父beforeDestroy
  * 2.子beforeDestroy
  * 3.子destroyed
  * 4.父destroyed

## vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么?

可以使用。

* 将事件处理程序代理到父节点，减少内存占用率

* 动态生成子节点时能自动绑定事件处理程序到父节点
