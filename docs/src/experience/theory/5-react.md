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

## redux 为什么要把 reducer 设计成纯函数

在Redux中，reducer被设计成纯函数有几个重要原因：

* **可预测性**：纯函数总是对于相同的输入返回相同的输出，不会有副作用。这种特性使得应用程序的行为更加可预测，便于调试和测试。

* **时间旅行调试**：Redux提供了时间旅行调试的功能，可以回溯状态的变化。如果reducer不是纯函数，状态的变化就无法可靠地重现，因为不同时间点的输入可能会导致不同的输出​​。

* **简化测试**：纯函数没有副作用，只依赖于输入参数，这使得测试变得非常简单。你只需要提供输入，然后验证输出是否符合预期。

* **增强重用性和组合性**：纯函数可以更容易地重用和组合，因为它们不依赖于外部状态或产生副作用。这有助于构建模块化和可维护的代码​。

通过保持reducer的纯粹性，Redux能够提供一个稳定、可靠和易于维护的状态管理方案。

## react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别

> [!TIP]
>
> 如何禁掉 `<a>` 标签默认事件，禁掉之后如何实现跳转。

Link 的本质也是 a 标签。Link做了3件事情：

*有onclick那就执行onclick

*click的时候阻止a标签默认事件（这样子点击<a href="/abc">123</a>就不会跳转和刷新页面）

* 再取得跳转href（即是to），用history（前端路由两种方式之一，history & hash）跳转，此时只是链接变了，并没有刷新页面

## React 16 和 React 17 事件机制的不同

在 React 16 和 React 17 中，事件机制的主要区别在于 React 17 引入了新的事件系统，称为“委托在根节点”。在 React 16 中，事件监听器附加在文档对象上，而在 React 17 中，这些事件监听器被移到了应用的根节点。这种更改有几个重要原因：

* **改进的事件隔离**：将事件监听器从文档级别移到根节点，减少了事件冒泡的范围。这有助于防止 React 应用的事件处理与其他非 React 代码的冲突。

* **分阶段升级的便利**：由于事件现在只在根节点上捕获，React 17 可以更好地支持逐步升级。这意味着应用可以逐步迁移到新版本的 React，而不必一次性完成。

* **提升兼容性**：这种改变提高了与非 React 代码和不同版本的 React 代码之间的兼容性，尤其是在同一个页面上运行多个 React 应用的情况下。

这些更改是为了提高 React 应用的灵活性和稳定性，同时为未来的新功能打下基础。

至于为何进行批处理更新（batch update），React 17 的批处理逻辑是为了减少不必要的渲染次数，从而提升性能。在 React 16 中，批处理主要发生在合成事件和生命周期方法中，而在 React 17 中，批处理机制扩展到了浏览器的原生事件和异步代码中，例如Promise、setTimeout等。这种机制通过将多个状态更新合并到一次重渲染中，减少了不必要的 DOM 操作。

## class component的区别

在React中，类组件（Class Components）和函数组件（Function Components）之间的主要区别在于它们的使用方式和特性。

* **类组件**：传统上，类组件是React中唯一可以使用状态（state）和生命周期方法的组件类型。这些组件通过继承React.Component类来定义，并包含render()方法来返回要显示的UI。这种方式适用于需要管理复杂状态和生命周期方法的情况。

* **函数组件**：函数组件最初只是一个简单的函数，接收props并返回要渲染的React元素。它们被称为“无状态组件”，因为它们无法使用状态和生命周期方法。但是，自从React 16.8引入了Hooks，函数组件现在也可以使用状态（通过useState）和其他React特性（如useEffect）。这使得函数组件可以完全替代类组件，并且写起来更简洁、更易于理解。

* **Hooks的引入**：React团队推荐使用函数组件和Hooks，因为它们更简洁、容易复用逻辑，并且避免了一些类组件中常见的复杂性（如this绑定问题）。Hooks使得函数组件可以有与类组件相同的能力，例如状态管理和副作用处理，从而更好地组织代码。

* **Redux的兼容性**：在使用Redux时，函数组件可以通过redux hooks（如useSelector和useDispatch）轻松地访问Redux store和分发actions。这与类组件中的connect函数类似，但提供了更直观的方式来处理Redux逻辑。

总的来说，虽然类组件仍然可以使用，但React社区正逐步转向函数组件和Hooks，因为它们提供了更现代和简洁的开发方式。

## React函数组件的生命周期

对于使用函数组件的 React 项目，生命周期方法主要通过 React Hooks 来实现，如 useEffect、useState 等。

在 React 函数组件中，useEffect 是一个用于处理组件副作用的 Hook，它的工作方式类似于类组件中的生命周期方法。以下是对其生命周期的详细解释：

* 初始渲染和依赖数组为空的情况：
当 useEffect 的依赖数组（第二个参数）为空 [] 时，它的回调函数只会在组件首次渲染时执行一次，并且在组件卸载时执行清理函数（如果有返回的清理函数）。这种行为相当于类组件中的 componentDidMount 和 componentWillUnmount 方法的组合。

* 依赖数组非空的情况：
当 useEffect 的依赖数组包含特定变量时，这些变量的变化会触发 useEffect 的执行。每次组件重新渲染并且依赖项发生变化时，useEffect 会先运行清理函数（如果有），然后再执行回调函数。这类似于类组件的 componentDidUpdate 方法。

例如，如果依赖数组是 `[detailedUserInfo]`，当 `detailedUserInfo` 发生变化时，useEffect 会被触发，这种机制确保在每次副作用执行之前先进行必要的清理操作。

* 清理机制：
useEffect 中的清理函数会在组件卸载时执行，或者在依赖项发生变化时，下一次调用副作用之前执行。这有助于防止内存泄漏或不必要的订阅。例如，在进行 API 订阅时可以使用清理函数取消订阅，从而避免内存泄漏。

这些特性使得函数组件能够更灵活地处理副作用，特别是在处理异步操作或需要在依赖项变化时重新执行某些逻辑时。函数组件通过 useEffect 将副作用逻辑与渲染逻辑分离，从而更好地管理组件状态和行为。

## 对函数式编程的理解

函数式编程（FP）被描述为一套原则和工具，它们在函数式编程范式中用于获得系统性的优势。回答强调了以下几点：

* **纯函数和并行化**：纯函数是没有副作用的函数。如果你只编写纯函数，应用程序可以轻松地在多个处理器核心之间拆分，无需担心状态冲突或其他错误。

* **不可变性**：常量的广泛使用使得代码追踪更容易，因为你只需要关注那些可变的部分。

* **函数链式调用**：通过让函数具备可组合性，整个语言看起来更像是数据流的连接，而不是逐步给计算机指令，这种方法更容易让人理解且更少出错​。
