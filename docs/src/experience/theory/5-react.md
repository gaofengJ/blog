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
