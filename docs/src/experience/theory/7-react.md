---
title: React
description: React
---

# React 面试题

## React 中 setState 什么时候是同步的，什么时候是异步的

在 React 中，setState 的行为取决于其运行的上下文和 React 的内部机制。

* **异步情况**

  * 在生命周期方法（如`componentDidMout`或`compoentDidUpdate`）或事件处理函数（如`onClick`）中调用 setState时，React 可能会出于性能优化的目的，将多个 setState 调用合并为一次更新。这使得 setState 的执行变得异步。

  * 这意味着在这些方法中多次调用 setState时， React会将这些更新合并在一起，然后在一个批处理中更新状态。因此，不能依赖 `this.state`的值来计算下一个状态，因为它可能还没有更新。

* **同步情况**

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

输出值为 `0 0 2 3`。

**原因：**

在React中，setState 的同步或异步行为取决于上下文。在大多数情况下，setState 是异步的，因为它会批量更新以优化性能。具体来说：

* **生命周期方法和合成事件处理程序中**

  在这些情况下，setState 是异步的。这意味着在调用 setState 之后立即调用`console.log(this.state)`通常会显示旧的状态值。React 会在合适的时机批量处理这些状态更新，以提高效率。因此，如果你想要在状态更新之后获取新的状态值，可以使用 setState 的回调函数。

* **原生事件处理程序或 setTimeout 等异步函数中**

  在这些情况下，setState 通常是同步的，因为 React 没有控制这些外部函数的执行上下文。因此，在这些情况下，setState 之后立即调用 `console.log` 会显示更新后的状态值。

## redux 为什么要把 reducer 设计成纯函数

在Redux中，reducer被设计成纯函数有几个重要原因：

* **可预测性**

  纯函数总是对于相同的输入返回相同的输出，不会有副作用。这种特性使得应用程序的行为更加可预测，便于调试和测试。

* **时间旅行调试**

  Redux提供了时间旅行调试的功能，可以回溯状态的变化。如果reducer不是纯函数，状态的变化就无法可靠地重现，因为不同时间点的输入可能会导致不同的输出​​。

* **简化测试**

  纯函数没有副作用，只依赖于输入参数，这使得测试变得非常简单。你只需要提供输入，然后验证输出是否符合预期。

* **增强重用性和组合性**

  纯函数可以更容易地重用和组合，因为它们不依赖于外部状态或产生副作用。这有助于构建模块化和可维护的代码​。

通过保持reducer的纯粹性，Redux能够提供一个稳定、可靠和易于维护的状态管理方案。

## react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别

> [!TIP]
>
> 如何禁掉 `<a>` 标签默认事件，禁掉之后如何实现跳转。

Link 的本质也是 a 标签。Link做了3件事情：

* 有onclick那就执行onclick

* click的时候阻止a标签默认事件（这样子点击<a href="/abc">123</a>就不会跳转和刷新页面）

* 再取得跳转href（即是to），用history（前端路由两种方式之一，history & hash）跳转，此时只是链接变了，并没有刷新页面

## React 16 和 React 17 事件机制的不同

在 React 16 和 React 17 中，事件机制的主要区别在于 React 17 引入了新的事件系统，称为“委托在根节点”。在 React 16 中，事件监听器附加在文档对象上，而在 React 17 中，这些事件监听器被移到了应用的根节点。这种更改有几个重要原因：

* **改进的事件隔离**

  将事件监听器从文档级别移到根节点，减少了事件冒泡的范围。这有助于防止 React 应用的事件处理与其他非 React 代码的冲突。

* **分阶段升级的便利**

  由于事件现在只在根节点上捕获，React 17 可以更好地支持逐步升级。这意味着应用可以逐步迁移到新版本的 React，而不必一次性完成。

* **提升兼容性**

  这种改变提高了与非 React 代码和不同版本的 React 代码之间的兼容性，尤其是在同一个页面上运行多个 React 应用的情况下。

这些更改是为了提高 React 应用的灵活性和稳定性，同时为未来的新功能打下基础。

至于为何进行批处理更新（batch update），React 17 的批处理逻辑是为了减少不必要的渲染次数，从而提升性能。在 React 16 中，批处理主要发生在合成事件和生命周期方法中，而在 React 17 中，批处理机制扩展到了浏览器的原生事件和异步代码中，例如Promise、setTimeout等。这种机制通过将多个状态更新合并到一次重渲染中，减少了不必要的 DOM 操作。

## class component的区别

在React中，类组件（Class Components）和函数组件（Function Components）之间的主要区别在于它们的使用方式和特性。

* **类组件**

  传统上，类组件是React中唯一可以使用状态（state）和生命周期方法的组件类型。这些组件通过继承React.Component类来定义，并包含render()方法来返回要显示的UI。这种方式适用于需要管理复杂状态和生命周期方法的情况。

* **函数组件**

  函数组件最初只是一个简单的函数，接收props并返回要渲染的React元素。它们被称为“无状态组件”，因为它们无法使用状态和生命周期方法。但是，自从React 16.8引入了Hooks，函数组件现在也可以使用状态（通过useState）和其他React特性（如useEffect）。这使得函数组件可以完全替代类组件，并且写起来更简洁、更易于理解。

* **Hooks的引入**

  React团队推荐使用函数组件和Hooks，因为它们更简洁、容易复用逻辑，并且避免了一些类组件中常见的复杂性（如this绑定问题）。Hooks使得函数组件可以有与类组件相同的能力，例如状态管理和副作用处理，从而更好地组织代码。

* **Redux的兼容性**

  在使用Redux时，函数组件可以通过redux hooks（如useSelector和useDispatch）轻松地访问Redux store和分发actions。这与类组件中的connect函数类似，但提供了更直观的方式来处理Redux逻辑。

总的来说，虽然类组件仍然可以使用，但React社区正逐步转向函数组件和Hooks，因为它们提供了更现代和简洁的开发方式。

## React函数组件的生命周期

对于使用函数组件的 React 项目，生命周期方法主要通过 React Hooks 来实现，如 useEffect、useState 等。

在 React 函数组件中，useEffect 是一个用于处理组件副作用的 Hook，它的工作方式类似于类组件中的生命周期方法。以下是对其生命周期的详细解释：

* **初始渲染和依赖数组为空的情况**

  当 useEffect 的依赖数组（第二个参数）为空 [] 时，它的回调函数只会在组件首次渲染时执行一次，并且在组件卸载时执行清理函数（如果有返回的清理函数）。这种行为相当于类组件中的 componentDidMount 和 componentWillUnmount 方法的组合。

* **依赖数组非空的情况**

  当 useEffect 的依赖数组包含特定变量时，这些变量的变化会触发 useEffect 的执行。每次组件重新渲染并且依赖项发生变化时，useEffect 会先运行清理函数（如果有），然后再执行回调函数。这类似于类组件的 componentDidUpdate 方法。

  例如，如果依赖数组是 `[detailedUserInfo]`，当 `detailedUserInfo` 发生变化时，useEffect 会被触发，这种机制确保在每次副作用执行之前先进行必要的清理操作。

* **清理机制**

  useEffect 中的清理函数会在组件卸载时执行，或者在依赖项发生变化时，下一次调用副作用之前执行。这有助于防止内存泄漏或不必要的订阅。例如，在进行 API 订阅时可以使用清理函数取消订阅，从而避免内存泄漏。

这些特性使得函数组件能够更灵活地处理副作用，特别是在处理异步操作或需要在依赖项变化时重新执行某些逻辑时。函数组件通过 useEffect 将副作用逻辑与渲染逻辑分离，从而更好地管理组件状态和行为。

## 对函数式编程的理解

函数式编程（FP）被描述为一套原则和工具，它们在函数式编程范式中用于获得系统性的优势。回答强调了以下几点：

* **纯函数和并行化**

  纯函数是没有副作用的函数。如果你只编写纯函数，应用程序可以轻松地在多个处理器核心之间拆分，无需担心状态冲突或其他错误。

* **不可变性**

  常量的广泛使用使得代码追踪更容易，因为你只需要关注那些可变的部分。

* **函数链式调用**

  通过让函数具备可组合性，整个语言看起来更像是数据流的连接，而不是逐步给计算机指令，这种方法更容易让人理解且更少出错​。

## 为什么不能在条件语句中写 hook

在 React 中，不能在条件语句中使用 Hook 是因为 Hook 依赖于 React 的渲染顺序。如果在条件语句中使用 Hook，可能导致每次渲染时 Hook 的调用顺序发生变化，这会破坏 React 的内部机制，进而导致错误。

React 需要保证每次渲染时 Hook 的调用顺序保持一致，因为它依赖这个顺序来正确地保存和恢复每个 Hook 的状态。如果在条件语句中调用 Hook，可能会导致渲染过程中某个 Hook 被跳过或多次调用，破坏了顺序一致性，从而引发不可预测的错误。

为了解决这个问题，可以将条件判断放在 Hook 调用之外，或者使用其他方法来实现同样的逻辑，而不是直接在条件语句中使用 Hook

## HOC 和 hook 的区别

在 React 中，HOC（高阶组件）和 Hook 是两种不同的代码复用方式，它们各有特点和适用场景：

* **高阶组件 (HOC)**

  HOC 是一个函数，它接收一个组件并返回一个新的组件。HOC 通常用于逻辑的复用或跨多个组件添加相同的功能，比如权限控制、日志记录等。由于 HOC 会创建一个新的组件层级，它可能会增加应用的复杂性，并且在调试时不如 Hook 直观。

* **Hook**

  Hook 是 React 16.8 引入的一项新特性，它允许在函数组件中使用状态和其他 React 特性。Hook 比 HOC 更加轻量，能够在不改变组件结构的情况下复用逻辑。常用的 Hook 包括 useState、useEffect 和 useContext 等。Hook 更适合处理组件内部的状态和副作用管理。

总结来说，HOC 更适用于跨组件复用逻辑，而 Hook 更适合组件内部的状态管理和逻辑复用。

## useEffect 和 useLayoutEffect 区别

`useEffect` 和 `useLayoutEffect` 都是 React 中的 Hook，用于在组件渲染时执行副作用。但它们有几个关键区别：

* **执行时机**

  * useEffect 在浏览器完成布局与绘制之后执行。它不会阻塞浏览器的绘制，因此适合大多数副作用操作，如数据获取或订阅事件。
  * useLayoutEffect 则在浏览器完成布局、但还未绘制之前执行。这意味着它会在浏览器将变化绘制到屏幕前执行，通常用于需要测量 DOM 元素尺寸或位置的场景。

* **对性能的影响**

  * useLayoutEffect 可能会阻塞浏览器的绘制，尤其是在副作用执行时间较长的情况下，因此可能对性能产生负面影响。通常建议只有在确实需要同步布局测量时才使用它。

* **典型用例**

  * 如果你的副作用不依赖于 DOM 的布局或绘制，比如只需操作状态、数据或监听事件，应该使用 useEffect。
  * 如果你需要在浏览器绘制前对 DOM 进行测量或操作，比如获取元素尺寸或位置，以避免用户看到布局闪烁等现象，应该使用 useLayoutEffect。

总的来说，默认应使用 useEffect，只有在需要同步测量 DOM 时才选择 useLayoutEffect。

## useEffect 依赖为空数组与 componentDidMount 区别

useEffect 依赖为空数组和 componentDidMount 在行为上非常相似，但也有一些重要的区别。

useEffect 带空数组意味着这个 effect 只会在组件挂载时运行一次，与 componentDidMount 类似。不过，useEffect 的逻辑是在组件渲染完成后执行的，这一点与 componentDidMount 中的行为一致。

一个显著的区别是，useEffect 提供了一个清理函数，这在组件卸载时调用，帮助开发者处理副作用的清理工作。而 componentDidMount 本身并不具备这个特性。

此外，React 团队推荐将副作用逻辑放在 useEffect 中，而不是直接在函数组件的主体中执行。这样可以确保副作用在正确的时间点执行，避免在 React 的并发模式下出现问题。React 的函数组件是为返回 UI 表现而设计的，副作用应该被隔离在 useEffect 中，以保持组件的纯净性。

## React.memo() 和 React.useMemo() 的区别

在 React 中，`React.memo()` 和 `React.useMemo()` 是两个不同的工具，它们各自有特定的使用场景和目的。

* **React.memo()**

  * React.memo() 是一个高阶组件（Higher-Order Component），用于将一个函数组件包裹起来，使其在相同 props 时跳过重新渲染。它类似于类组件中的 shouldComponentUpdate，默认情况下会对 props 进行浅比较。它非常适合用于性能优化，特别是在组件渲染成本较高且 props 不频繁变化时。

* **React.useMemo()**

  * React.useMemo() 是一个 React Hook，用于在依赖项数组没有变化时，缓存计算结果，从而避免不必要的昂贵计算。它主要用于性能优化，以减少组件中的重复计算，而不是控制组件的重新渲染。

* **区别**

  * React.memo() 主要用于避免组件不必要的重新渲染，而 React.useMemo() 则用于避免在渲染过程中执行不必要的计算。

  * React.memo() 是用于组件级别的优化，而 React.useMemo() 通常用于在组件内对某些复杂计算的优化。

总结来说，React.memo() 用于组件重渲染优化，而 React.useMemo() 用于计算逻辑优化

## React.useCallback() 和 React.useMemo() 的区别

在 React 中，`useCallback()` 和 `useMemo()` 都是用来优化性能的 Hook，但它们的用途有所不同。

* **useCallback()**

  主要用于函数的记忆化。当你需要将一个函数传递给子组件时，每次父组件重新渲染时都会创建一个新的函数实例，导致子组件不必要的重新渲染。通过使用 useCallback()，你可以记忆这个函数，使其在依赖项未变化时不会重新创建，从而避免子组件的无效渲染。

* **useMemo()**

  主要用于值的记忆化。当组件中有复杂计算或者需要大量运算的情况时，你可以使用 useMemo() 来记忆计算结果。这样做可以避免在每次渲染时重复执行这些昂贵的计算，只有当依赖项发生变化时，才会重新计算并返回新的值。

简而言之：

* 使用 useCallback() 来记忆函数，从而避免函数重复创建，尤其是在函数作为 prop 传递给子组件时。

* 使用 useMemo() 来记忆计算结果，从而避免不必要的重复计算。

注意：虽然这两个 Hook 可以帮助优化性能，但滥用它们可能会增加代码的复杂性。因此，建议在性能优化确有必要时再使用

## React.forwardRef 是什么及其作用

`React.forwardRef` 是 React 中的一个高级 API，它的主要作用是让组件可以接收并转发 ref 给其子组件。通常，ref 用于直接访问 DOM 元素或类组件的实例，但在函数组件中，ref 无法直接使用。这时就可以通过 forwardRef 来解决这个问题。

使用 forwardRef 时，你可以将一个 ref 作为参数传递给组件，并将其转发给子组件的 DOM 元素，从而在父组件中通过 ref 直接操作子组件的 DOM。例如，可以通过 forwardRef 实现父组件对输入框元素的直接控制，如聚焦等操作。

## react hooks 与 class 组件对比

`React Hooks` 与 `class` 组件的对比是 React 社区中讨论的热门话题。以下是一些 Stack Overflow 和 GitHub 上获得最多赞的回答以及综合观点的总结：

* **代码简洁性**

  使用 React Hooks 可以让代码更加简洁。class 组件往往需要编写更多的代码，包括定义构造函数、绑定方法和处理 this 的上下文问题。而使用 Hooks 的函数组件则更为简洁，通常只需要几行代码就能实现同样的功能。

* **学习曲线**

  函数组件和 Hooks 相比 class 组件更容易理解。对于初学者来说，Hooks 更加直观，因为它们只是简单的函数，不需要掌握 class 组件中的复杂概念，如生命周期方法和 this 绑定。

* **性能**

  Hooks 的设计使得函数组件在某些情况下比 class 组件具有更好的性能表现，尤其是在避免不必要的重渲染方面。React 团队也推荐开发者使用 Hooks 作为未来的主流方式。

* **状态管理**

  通过 useState 和 useEffect 等 Hooks，可以在函数组件中轻松实现状态管理和副作用处理，而不需要使用 class 组件中的 setState 和生命周期方法。

这些优势使得越来越多的开发者转向使用 Hooks 而不是 class 组件。尽管 class 组件在某些复杂场景中仍有其独特的优势，但 Hooks 正在成为 React 开发的主流选择。

## 介绍 React dom diff 算法

React 的 DOM Diff 算法，也被称为“调和算法”（Reconciliation），是 React 框架高效更新用户界面的核心技术之一。该算法的主要目的是通过最小化对真实 DOM 的操作来提升性能。

**基本原理：**

React 的调和算法会将每次渲染生成的虚拟 DOM（Virtual DOM）与上一次的虚拟 DOM 进行比较，找出不同之处，并仅将这些差异反映到实际的 DOM 中。通过这种方式，React 避免了不必要的 DOM 操作，从而大大提高了页面的渲染性能。

**Diff 算法的特性：**

* **分层比较**

  React 通过分层比较节点来确保仅比较相同级别的节点。它会假设不同类型的元素会产生不同的树结构，因此当它发现节点类型不同（例如 `<div>` 变成 `<span>`），它会认为这个节点及其子节点全都需要更新。

* **按键处理**

  在处理列表结构时，React 会通过 key 属性来识别元素。key 是 React 中用于优化列表渲染的重要属性，通过 key，React 可以直接识别出被移动、添加或删除的节点，避免不必要的重新渲染。

* **最小化更新**

  算法会对新旧虚拟 DOM 进行递归对比，生成一个补丁（Patch）来描述需要进行的更新操作。然后，将这些补丁应用到真实 DOM 上，实现最小化更新。

**实际应用：**

React 的这种 DOM Diff 算法通过减少直接操作 DOM 的频率，显著提升了复杂应用的性能，特别是在频繁更新的场景下。

## 对 React Fiber 的理解

`React Fiber` 是 React 的一个重要更新，它是 React 的渲染引擎，用于优化和改进组件的渲染流程。Fiber 的主要目的是解决 React 之前版本在处理高优先级更新时遇到的问题，使得 UI 更新更加流畅和可控。

**React Fiber 的核心特点**

* **增量渲染**

  Fiber 允许 React 在渲染过程中分片工作，将工作切割成多个小任务，逐步完成。这使得高优先级的更新可以优先处理，而不需要等待低优先级的任务完成，从而提升了用户体验。

* **优先级管理**

  Fiber 引入了优先级调度机制，使得开发者可以为不同的更新设置不同的优先级。这样，重要的 UI 更新可以更快地呈现给用户，而不重要的更新可以延迟处理。

* **中断和恢复**

  在之前的版本中，React 的渲染是不可中断的，这可能导致长时间的渲染导致界面卡顿。Fiber 允许渲染过程中断和恢复，提升了应用的响应性。

* **错误边界**

  Fiber 改进了错误处理机制，使得错误更容易被捕获和处理，从而提高了应用的稳定性。

## React 性能优化手段

* **懒加载和代码分割：**

  使用 React 的懒加载（React.lazy）和代码分割（React.Suspense）功能，可以将应用程序拆分成更小的部分，按需加载，从而减少初始加载时间和提高性能。

* **优化渲染流程：**

  通过优化组件的渲染流程来提高性能，例如使用 shouldComponentUpdate、React.memo 或 PureComponent 来避免不必要的渲染。

* **减少重复渲染：**

  避免在组件中频繁创建新的对象和函数，因为这会导致组件不必要的重新渲染。使用 useCallback 和 useMemo 可以帮助减少这种情况的发生。

* **使用 React.Fragment：**

  使用 React.Fragment 可以避免不必要的 DOM 节点层级，提高渲染性能，尤其是在需要返回多个子组件时。

* **避免使用内联函数和内联样式：**

  避免在 JSX 中使用内联函数和内联样式，因为每次渲染都会创建新的函数和样式对象，导致性能下降。可以将这些函数和样式提取到组件外部。

## 介绍React Redux原理及使用

**Redux 工作原理：**

Redux 的工作原理基于三个核心概念：store、action 和 reducer。store 保存应用的全局状态；action 描述状态的变化；reducer 处理这些 action 并返回新的状态。Redux 通过这些概念实现状态的集中管理和逻辑的分离。

**Redux 使用示例：**

Redux 的使用包括以下步骤：

* 定义 actions 和 action creators，用于描述用户交互和业务逻辑。

* 创建 reducer 函数，处理 actions 并返回新的 state。

* 使用 createStore 创建 Redux store，将 reducer 传递给它。

* 使用 Provider 将 store 提供给 React 应用。

* 在组件中使用 connect 函数将 Redux store 的状态映射到组件的 props，并 dispatch actions 进行状态更新。
