---
title: React
description: React
---

# React 面试题

## React 中 setState 什么时候是同步的，什么时候是异步的

在 React 中，setState 的行为取决于其运行的上下文和 React 的内部机制。

* 异步情况
  * 在生命周期方法（如`componentDidMout`或`compoentDidUpdate`）或事件处理函数（如`onClick`）中调用 setState时，React 可能会出于性能优化的目的，将多个 setState 调用合并为一次更新。这使得 setState 的执行变得异步。
  * 这意味着在这些方法中多次调用 setState时， React会将这些更新合并在一起，然后在一个批处理中更新状态。因此，不能依赖 `this.state`的值来计算下一个状态，因为它可能还没有更新。

* 同步情况
  在某些特定情况下，React 的 setState 可能会表现出同步行为，例如在 `componentWillMount` 或 `componentWillReceiveProps` 中。这里的 setState 更新会立即生效，而不是批量处理。

为了处理异步更新带来的问题，React 提供了 setState 的第二个参数，一个回调函数，该函数将在状态更新后执行。这种方式确保了你可以在状态更新后立即获取到新的状态值。

```js
this.setState({ count: 5 }, () => {
  console.log(this.state.count); // 5
});
```

## React setState 笔试题，下面的代码输出什么？

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```

输出值为`0 0 2 3`。

原因：

在React中，setState 的同步或异步行为取决于上下文。在大多数情况下，setState 是异步的，因为它会批量更新以优化性能。具体来说：

* 生命周期方法和合成事件处理程序中

在这些情况下，setState 是异步的。这意味着在调用 setState 之后立即调用`console.log(this.state)`通常会显示旧的状态值。React 会在合适的时机批量处理这些状态更新，以提高效率。因此，如果你想要在状态更新之后获取新的状态值，可以使用 setState 的回调函数。

* 原生事件处理程序或 setTimeout 等异步函数中： 在这些情况下，setState 通常是同步的，因为 React 没有控制这些外部函数的执行上下文。因此，在这些情况下，setState 之后立即调用 `console.log` 会显示更新后的状态值。

## Redux 和 Vuex 的设计思想

Redux 和 Vuex 都是用于状态管理的库，但它们有不同的设计思想和实现方式。

### Redux

* 不可变性：Redux 强调状态的不可变性。当一个动作被分发时，会创建一个新的状态对象。这样，通过对比新旧状态对象的引用，可以高效地确定哪些部分发生了变化。不可变性使得 Redux 的状态管理更加可预测和容易调试​ (Stack Overflow)​​ (LogRocket Blog)​。

* 函数式编程：Redux 倾向于使用函数式编程范式，强调纯函数（即 reducer）来处理状态变更。这种方式使得 Redux 的逻辑更加清晰，容易测试和维护​ (Stack Overflow)​。

* 生态系统：Redux 具有庞大的生态系统，包含许多中间件和工具，如 Redux Thunk 和 Redux Saga，用于处理异步操作

### Vuex

* Vuex 利用 Vue.js 的响应式系统。状态在 Vuex 中是可观察的，当状态改变时，所有依赖该状态的组件会自动更新​ (Stack Overflow)​​ (LogRocket Blog)​。

* 面向对象：Vuex 更加面向对象，提供了类似 getter 和 mutation 的机制来获取和修改状态。这使得 Vuex 的使用更加简洁，但也增加了直接修改状态的风险​ (Stack Overflow)​。

* 简化的状态管理：由于 Vuex 与 Vue.js 紧密集成，状态管理和组件间通信非常顺畅，无需像 Redux 那样使用中间件来处理异步操作

### 使用场景

* Redux 更适合大型应用和需要复杂状态管理的场景，特别是在需要严格控制状态变更和调试的情况下。Redux 的不可变性和纯函数使得状态管理更加可靠和可预测。

* Vuex 更适合 Vue.js 应用，尤其是中小型项目。Vuex 利用 Vue 的响应式特性，使得状态管理更加自然和简便，适合快速开发和迭代。
