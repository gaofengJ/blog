---
title: Vue
description: Vue
---

# Vue 面试题

## vue 组件通信方式有哪些

Vue 提供了几种常见的组件通信方式：

* **父子组件通信**

  父组件通过 props 向子组件传递数据，子组件通过 $emit 向父组件发送事件。
  
* **兄弟组件通信**

  可以使用事件总线来实现兄弟组件间的通信。
  
* **Vuex**

  通过 Vuex 管理全局状态，允许多个组件访问和修改共享的状态。
  
* **Provide/Inject**

  祖先组件通过 provide 提供数据，后代组件通过 inject 获取数据，适用于跨层级组件通信。
  
* **ref**

  父组件通过 ref 获取子组件的实例，直接调用子组件的方法或访问子组件的数据。

## v-if 和 v-for 优先级

**Vue 2.x 的行为**

在 Vue 2.x 中，v-for 的优先级高于 v-if，这意味着 Vue 会先执行 v-for，生成所有的元素，然后再对生成的元素应用 v-if 条件。这种处理方式可能会导致不必要的计算和性能问题，因为即使某些元素不符合 v-if 条件，它们也会被首先渲染出来，然后再被销毁。

**Vue 3.x 的行为**

在 Vue 3.x 中，v-if 的优先级高于 v-for。这意味着 Vue 会先应用 v-if 条件，只有满足条件的元素才会进入 v-for 的迭代过程中进行渲染。这种改变能提高性能，因为它减少了需要进行 v-for 迭代的元素数量。

**建议的做法**

即使在 Vue 3 中，最好还是避免将 v-if 和 v-for 放在同一个元素上，因为这种做法可能会带来语法上的歧义和性能上的影响。为了避免这种情况，推荐通过计算属性或在数据源中进行过滤，先处理好符合条件的元素，再进行 v-for 渲染​

## slot 是什么

在 Vue 中，slot 是一个用于在组件中插入动态内容的机制。它允许父组件向子组件传递内容，并控制这些内容如何渲染。通过 slot，可以实现组件内容的插槽化，使得组件更加灵活和可复用。

**父组件：**

```html
<template>
  <div>
    <child-component>
      <p>这是父组件插入的内容</p>
    </child-component>
  </div>
</template>
```

**子组件：**

```html
<template>
  <div>
    <slot></slot>  <!-- 这里是插槽 -->
  </div>
</template>

```
  
## computed 和 watch 区别

1. **功能和使用场景**

* **computed**

  * **功能**：computed 用来声明基于响应式数据的衍生状态，它是计算属性的核心。当依赖的响应式数据变化时，computed 会自动重新计算并更新结果，且会缓存结果，直到相关依赖发生变化。
  * **使用场景**：当你需要依赖其他响应式数据计算出一个新的值，并且只在依赖发生变化时重新计算，适用于计算值或者进行数据转换的场景。
  * **特点**：它的值是基于响应式数据进行计算的，且只会在相关依赖发生变化时才会重新计算，避免了不必要的重复计算。

* **watch**

  * **功能**：watch 用于监听一个或多个数据源，当这些数据源发生变化时，执行相应的回调函数。watch 主要用于处理副作用，例如异步操作、DOM 操作或一些需要执行额外逻辑的场景。
  * **使用场景**：当你需要在数据变化时执行异步操作或者需要在数据变化时进行副作用操作时，使用 watch 是更合适的选择。
  * **特点**：watch 是观察数据变化并执行副作用，适合处理异步操作、复杂的逻辑或 API 请求等。

2. **是否缓存**

* **computed**

  缓存：computed 会根据它的依赖自动进行缓存。只有在它的依赖项发生变化时，才会重新计算。这意味着如果计算结果未发生变化，多次访问 computed 会直接返回缓存值，而不会重新计算。

* **watch**

  不缓存：watch 本身并不会缓存每次的执行结果，它的目的是监听数据的变化并执行回调。因此，每当被监听的响应式数据变化时，watch 的回调都会执行。

3. **执行时机**

* **computed**

  computed 是懒执行的，只有在访问时才会计算。它会在依赖的数据发生变化时，重新计算并缓存结果，直到数据变化时才会重新计算。

* **watch**

  watch 会在数据变化后立刻执行回调，适用于需要在数据变化时进行一些异步操作或者副作用的场景。watch 是同步的，数据变化时会立即触发回调。

4. **返回值**

* **computed**

  computed 返回一个计算后的值。它一般用于需要显示或计算并返回最终值的场景。

* **watch**

  watch 返回的是一个回调函数，回调函数在监听的属性变化时执行，适用于需要执行副作用的操作，如数据持久化、异步请求等

## data 为什么是函数而不是对象

如果 data 是一个对象，所有组件实例将共享同一个数据对象。这样会导致组件之间的状态干扰，破坏 Vue 的组件封装性。
通过将 data 定义为函数，Vue 确保每个组件实例都会有自己的独立数据对象，从而避免了多个实例之间的数据冲突和共享。
data 函数每次组件实例化时都会被调用，返回一个新的数据对象，因此每个实例都能拥有独立的响应式数据，避免了数据污染。

## Vue3 和 Vue2 相比有哪些优势

* **性能提升**

  * 更小的体积：Vue3 使用 Rollup 打包并基于 Tree-Shaking 优化，无用代码不会被引入。
  * 更快的渲染：虚拟 DOM 进行了优化，减少了渲染的性能开销。
  * 响应式系统提升：基于 `Proxy` 的响应式系统替代 Vue2 的 `Object.defineProperty`，支持深度监听和更好的性能。

* **Composition API**

  * 更好的逻辑复用：通过 setup 函数和组合式 API（如 ref, reactive, computed 等），可在不同组件中复用逻辑。
  * 代码组织更清晰：按功能模块化代码，而非按组件生命周期分散代码。
  * 类型推断友好：更好地支持 TypeScript。

* **更好的 TypeScript 支持**
  * Vue3 的代码库完全使用 TypeScript 重写，原生支持类型推断和类型检查。
  * 提供了更友好的开发体验，减少类型相关的错误。

* **新的特性和优化**

  * Fragment: 一个组件可以返回多个根节点，避免 Vue2 中必须用 `<div>` 包裹的问题。
  * Teleport: 允许将 DOM 节点渲染到组件外部的指定位置（比如模态框）。
  * Suspense: 支持异步组件的加载状态管理。

## Vue 响应式原理

Vue 的响应式系统基于 `Object.defineProperty`（Vue 2.x）和 `Proxy`（Vue 3.x）。下面是 Vue 2.x 和 Vue 3.x 实现的对比，以及它们如何工作：

1. **数据劫持（Data Hijacking）**

Vue 会通过 `Object.defineProperty` 或 `Proxy` 改变数据对象的属性定义，使得这些属性可以被监听到。当你访问或者修改一个对象的属性时，Vue 会“劫持”这些属性的 getter 和 setter，利用它们来跟踪依赖并在属性值变化时更新视图。

* getter：当你读取属性值时，会触发 getter，从而记录下哪些组件依赖了这个属性（即依赖收集）。
* setter：当你修改属性值时，会触发 setter，从而通知相关的依赖进行更新（即视图更新）。

2. **依赖收集（Dependency Collection）**

在 Vue 中，组件的渲染函数会依赖于某些数据属性。当属性值发生变化时，组件会重新渲染。Vue 会自动收集这些依赖。

当访问某个数据属性时，Vue 会通过 getter 把当前正在执行的渲染函数（即视图）注册到该属性的依赖列表中。这个过程叫做 依赖收集。

Vue 通过一个叫做 Watcher 的对象来管理这些依赖关系。每个 Watcher 对象对应一个视图，它会订阅数据的变化并重新渲染。

3. **发布-订阅模式（Pub-Sub）**

当数据变化时，Vue 会使用发布-订阅模式来通知所有依赖这个数据的视图组件（即 Watcher）。数据变化后，所有订阅该数据的视图（即 Watcher）都会被通知，进而触发视图更新。

* 发布者：数据对象，负责触发变化。
* 订阅者：组件的渲染函数（Watcher），负责更新视图。

4. **Vue 2.x 的实现方式：Object.defineProperty**

Vue 2.x 使用 Object.defineProperty 来重写数据对象的 getter 和 setter。当你访问对象的属性时，getter 会被调用，当你修改属性值时，setter 会被调用。

Vue 会通过 getter 收集依赖，在视图组件中访问这些数据时，会自动将组件的渲染函数添加到数据的依赖列表中。
当数据更新时，setter 会触发更新机制，将视图重新渲染。

这种方式的局限性是，它只能劫持对象的属性，不能劫持数组的索引，也不能动态地添加新的属性。如果需要对新属性或者数组的变化进行响应，就需要额外处理。

5. **Vue 3.x 的实现方式：Proxy**

Vue 3.x 引入了 Proxy 来实现更强大的响应式系统。Proxy 允许你定义自定义的处理器，可以对对象进行更加灵活的拦截，不仅能够劫持对象的属性，也能够劫持数组和方法等。

Proxy 通过 handler 定义了对对象进行操作的拦截方法（如 get、set 等）。

Vue 3 使用 Proxy 来实现对整个对象的代理，这样不仅能够劫持属性访问，还可以劫持对象的修改、删除等操作，提供了更广泛的响应式功能。

相比 Vue 2.x 的 Object.defineProperty，Proxy 的性能更好，支持更多的特性，避免了 Vue 2.x 的一些局限性。

6. **视图更新**

当数据变化时，Vue 会通知依赖该数据的 Watcher，并触发视图的更新。

每当数据的 setter 被调用时，它会通知 Watcher，Watcher 会重新计算视图。

这意味着，当数据发生变化时，相关的组件会自动重新渲染，确保视图与数据保持同步。

>[!TIP]
>
> Vue 2 的响应式系统基于 Object.defineProperty 实现，它能够对对象的属性进行拦截和依赖追踪。但是，数组的特殊性使得它无法像普通对象一样拦截对索引的直接操作。为了解决这个问题，Vue 针对数组的部分方法进行了 重写 和 拦截，在调用这些方法时，手动触发依赖更新。如 `push、pop、shift、unshift、splice、sort、reverse` 等

## vue2 和 vue3 生命周期的区别

Vue 2 使用选项式 API (Options API)，生命周期钩子如 beforeCreate、created、mounted、beforeDestroy 等。

Vue 3 通过组合式 API 引入了 setup 函数，setup 在组件实例创建之前执行，代替了 beforeCreate 和 created 钩子，钩子 beforeDestroy 和 destroyed 被重命名为 beforeUnmount 和 unmounted。

总的来说，Vue 3 生命周期钩子的顺序和 Vue 2 类似，主要区别在于 setup 函数的引入，使得响应式数据和逻辑定义更为灵活。

## Vue nextTick 作用及原理

`Vue.nextTick` 是 Vue.js 提供的一个异步方法，用于在 DOM 更新后执行回调函数。因为 Vue 的数据驱动视图机制是异步的，数据更新后，DOM 不会立即同步更新，而是通过异步队列来批量更新。因此，nextTick 允许我们在 DOM 更新后、执行下一轮事件循环之前获取到最新的 DOM 状态。

**作用：**

确保 DOM 已经更新：当你修改了 Vue 中的数据，Vue 会异步更新 DOM，而 nextTick 可以确保你在 DOM 更新完成后再执行一些代码。这是非常重要的，尤其是当你需要获取更新后的 DOM 状态（例如获取元素尺寸、位置，或操作 DOM）时。

避免访问未更新的 DOM：如果你在数据变更后立即访问 DOM，可能会得到未更新的旧 DOM 状态。通过 nextTick，可以确保 DOM 已经更新到最新状态再进行操作。

**使用场景：**

在 DOM 更新后执行需要依赖最新 DOM 状态的操作（例如，滚动条位置、获取渲染后元素的大小等）。

在一些异步操作完成后，确保某些代码在 DOM 更新后执行。

**实现原理：**

nextTick 方法是通过 事件循环机制 和 微任务队列 来实现的。具体的执行流程如下：

1. **数据变化**

  当你更新数据时，Vue 会把这次更新的 DOM 元素标记为“脏”，并将 DOM 更新的任务加入一个异步队列。

2. **队列的执行**

  nextTick 方法会把传入的回调函数放入微任务队列中（即使用 Promise.then 或 MutationObserver 等微任务机制）。

3. **DOM 更新**

  由于 Vue 是异步更新 DOM 的，它会将所有的 DOM 更新合并到一个批量更新操作中。这样，Vue 会尽量减少不必要的 DOM 操作，提高性能。

  在 DOM 更新完成后，微任务队列中的回调函数才会执行，这样就能确保你获取到最新的 DOM 状态。

4. **回调执行**

  当浏览器空闲时，微任务队列的任务会被执行，nextTick 中的回调函数会在 DOM 更新完成后执行。

Vue 会根据不同的环境（浏览器、Node.js）选择不同的微任务执行方式。例如，在浏览器中，Vue 会使用 Promise.then 来实现微任务，而在低版本浏览器中，则使用 MutationObserver 来模拟。

即使 Vue 更新了虚拟 DOM 并触发了 DOM 渲染，浏览器可能还没完全渲染到屏幕上。这时可以通过 `nextTick` 嵌套或者 `setTimeout` 的方式去或获取。

> [!TIP]
>
> nextTick 不是完全微任务？
>
> 如果 nextTick 只是一个普通的微任务：
>
> 它可能在 Vue 的异步更新尚未完成前触发。
>
> 它可能在浏览器的渲染周期开始前触发，从而导致误判。
>
> Vue 的 nextTick 做了更多工作，确保其语义是与渲染完成绑定的，而非简单的微任务队列执行。

## Vue diff 算法原理 <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

diff 算法是一种通过同层的树节点进行比较的高效算法。

其有两个特点：

* 比较只会在同层级进行, 不会跨层级比较
* 在diff比较的过程中，循环从两边向中间比较

Vue 的 diff 算法是用于高效更新 DOM 的核心算法，它通过对比新旧虚拟 DOM 树的差异，找出最小的修改量来更新真实 DOM，从而实现高效的视图更新。Vue 采用的是一种优化版的 “深度优先搜索” 算法，它通过以下策略来提升性能：

* **虚拟 DOM**

  Vue 会在内存中创建一个虚拟 DOM 树，代表当前的 UI 状态。每当数据发生变化时，Vue 会生成一个新的虚拟 DOM 树，然后与旧的虚拟 DOM 树进行对比。

* **最小化操作**

  Vue 的 diff 算法通过一系列的优化策略，尽量减少对真实 DOM 的修改。Vue 会先对比节点的类型，如果类型不同，则直接替换节点；如果相同，则比较节点的属性和子节点。

* **双端对比（Optimized Diffing）**

  Vue 在对比两个列表（如 v-for 渲染的列表）时，通过从前后两端同时进行对比，减少不必要的节点移动和重新渲染。它会根据节点的位置和键（key）来高效地确定哪些节点需要被更新。

* **键值（key）的使用**

  当列表中有动态元素时，使用 key 可以显著提高性能。key 用于帮助 Vue 跟踪每个节点，从而避免不必要的节点重新渲染，尤其是在列表元素位置发生变化时。

* **单向数据流**

  Vue 遵循单向数据流原则，即从父组件到子组件的数据流动，这使得 Vue 可以优化数据变化时的 DOM 更新策略，减少不必要的更新。

## vue2 和 vue3 dom diff的区别 <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

| 特性 | Vue 2 | Vue 3 |
| --- | --- | --- |
| 实现基础 | 基于 `Snabbdom` | 自定义优化的虚拟 DOM |
| 静态提升 | 无静态提升，每次更新对比所有节点 | 编译时将静态节点提升到渲染函数外，只渲染一次 |
| `Patch Flags` | 不支持 | 编译时为动态节点生成标记，运行时只更新动态部分 |
| `Fragment` | 不支持，需额外包裹节点 | 支持，减少不必要的 DOM 节点 |
| 动态列表 | 递归遍历，对大规模数据性能较差 | 优化复用策略，性能显著提升 |
| 模板编译优化 | 无全局优化，渲染函数性能较弱 | 编译时进行静态和动态分离，全局优化渲染性能 |

## v-for 中的 key 为什么不能使用索引

* **导致不正确的节点复用**

  当 key 是索引时，节点的标识与其位置绑定。如果列表顺序发生变化，框架可能会错误地复用不该复用的 DOM 节点，导致显示内容错误

* **对动态列表的支持较差**

  如果列表是动态的，比如插入或删除某些项，索引会随之改变，导致大量不必要的 DOM 更新

## Vue的双向绑定，Model和View如何互相影响

在 Vue.js 中，双向数据绑定的实现主要依靠 Vue 的响应式系统（reactive system）和 v-model 指令。这里简单解释一下它的工作机制：

* **Model 如何改变 View**

  当 Vue 实例的数据发生变化时，Vue 的响应式系统会捕捉到这些变化。Vue 会通过依赖追踪机制，找到所有依赖该数据的组件和 DOM 元素，并通知它们更新。这是通过使用 `Object.defineProperty` 或 `Proxy`（Vue 3）来劫持数据属性的 getter 和 setter 实现的。当数据发生变化时，setter 会触发相应的视图更新。

* **View 如何改变 Model**

  Vue 的 v-model 指令提供了一种简单的方式来实现表单控件和应用数据之间的双向绑定。当用户在表单控件中输入数据时，v-model 会监听控件的输入事件（如 input 事件），并将控件的值更新到 Vue 实例的数据中。这样，视图的变化（用户输入）会通过事件绑定的方式反映到模型数据上。

## 在 Vue 中，子组件为何不可以修改父组件传递的 Prop?

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

## 为什么 Vue3 采用了 Proxy，抛弃了 Object.defineProperty <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">高频</span>

* **全面的拦截能力**

  Proxy 可以拦截包括属性读取、属性设置、属性删除等多种操作，而不仅仅是数据的变更。相比之下，Object.defineProperty 只能劫持属性的 getter 和 setter​​​。

* **性能优化**

  Object.defineProperty 在处理数组时存在性能瓶颈，特别是在数组的新增和删除操作上，需要手动重写数组的常用方法。而 Proxy 能更高效地处理这些操作，因为它能够直接拦截所有类型的操作，无需重新定义数组的方法​​。

* **灵活性和简洁性**

  Proxy 允许在一个地方定义所有的拦截逻辑，而不需要在每个属性上重复定义 getter 和 setter。这使得代码更简洁和易于维护​​。

* **支持复杂的数据结构**

  Proxy 对嵌套对象的处理也更加自然，可以递归地应用于所有嵌套的属性。而使用 Object.defineProperty 处理嵌套对象则需要更多的手动工作​​。

## Vue 的父组件和子组件生命周期钩子执行顺序是什么

* **加载渲染过程**

  * 1.父beforeCreate
  * 2.父created
  * 3.父beforeMount
  * 4.子beforeCreate
  * 5.子created
  * 6.子beforeMount
  * 7.子mounted
  * 8.父mounted

* **子组件更新过程**

  * 1.父beforeUpdate
  * 2.子beforeUpdate
  * 3.子updated
  * 4.父updated

* **父组件更新过程**

  * 父beforeUpdate
  * 父updated

* **销毁过程**

  * 1.父beforeDestroy
  * 2.子beforeDestroy
  * 3.子destroyed
  * 4.父destroyed

## vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么?

可以使用。

* 将事件处理程序代理到父节点，减少内存占用率

* 动态生成子节点时能自动绑定事件处理程序到父节点

## keep-alive 的作用

keep-alive 是 Vue 提供的一个内置组件，用于 缓存组件的状态，避免组件被销毁和重新创建，从而提高性能，尤其是在频繁切换页面或组件时。keep-alive 通过缓存被包裹的组件，保持其内部状态和 DOM 元素，使得组件不会在每次切换时重新渲染。

**工作原理：**

* **缓存机制**

  当某个组件被 keep-alive 包裹时，Vue 会将该组件的实例进行缓存，并保留其状态（如数据和 DOM）直到该组件不再需要。

* **组件销毁**

  当组件不再活跃时，Vue 会将该组件从 DOM 中移除，但并不会销毁其实例。这个组件仍然保留在内存中，当重新激活时，Vue 会将其重新渲染到页面中，而不是重新创建组件。

* **activated 和 deactivated 钩子**
  
  当组件被激活或停用时，keep-alive 会触发组件的 activated 和 deactivated 钩子，开发者可以在这些钩子中执行特定的操作。

**常见问题：**

尽管 keep-alive 可以有效提高性能，但在实际使用过程中可能会遇到一些问题，以下是几个常见问题及其解决方法：

* **缓存状态和数据未清理**

  当组件缓存时，组件的状态（如表单数据、滚动位置等）会保留，这可能导致一些问题，例如用户返回到组件时，状态仍然存在。尤其在表单和列表页面中，用户返回后可能看到不期望的旧数据。

  * **解决方法：**

    可以通过 key 属性来手动控制缓存。通过为 keep-alive 提供唯一的 key 值，可以确保在需要时重新渲染组件，从而清除不必要的状态。

    ```html
    <keep-alive :key="componentKey">
      <my-component />
    </keep-alive>
    ```

    通过动态设置 componentKey，Vue 会根据 key 值的变化来判断是否重新渲染该组件。

* **缓存的组件无法获取更新数据**

  keep-alive 缓存的组件在被重新激活时，可能无法获取到最新的数据，因为缓存的组件实例不会重新创建。

  * **解决方法：**

    在组件的 activated 钩子中，可以手动触发数据的更新。例如，在 activated 中调用一个方法重新加载数据：

    ```js
    // 在 activated 钩子中重新获取数据
    activated() {
      this.fetchData();
    }
    ```

* **性能问题和内存泄漏**

  当 keep-alive 缓存了大量组件时，可能导致内存占用增加，甚至出现内存泄漏，尤其是在没有合适的清理机制时。

  * **解决方法：**

    可以通过 include 和 exclude 属性来指定哪些组件需要被缓存，避免不必要的缓存。例如，使用 exclude 来排除某些不需要缓存的组件：

    ```html
    <keep-alive :exclude="['ComponentA', 'ComponentB']">
      <router-view />
    </keep-alive>
    ```

    这样可以减少缓存的组件数量，避免不必要的内存占用。

* **组件状态不一致**

  keep-alive 缓存的组件会保留它们的状态，但如果父组件的状态或数据发生变化，可能导致子组件的状态不一致或数据不同步。

  * **解决方法：**

  可以在 activated 钩子中处理组件的数据更新，使得子组件能够响应父组件的变化。确保每次组件激活时都能根据父组件的数据重新初始化自身。

## pinia 是什么？跟 vuex 区别在哪里

`Pinia` 是 Vue.js 生态系统中的一个状态管理库，是 Vuex 的替代方案之一。它设计为 Vue 的官方状态管理库，提供了更简单、现代的 API 和更好的开发体验。

**Pinia 的特点**

* **轻量化设计**

  * Pinia 更轻量化，减少了复杂的语法。
  * 它的 API 更接近 JavaScript 的原生设计，学习成本低。

* **模块化管理**

  * Pinia 的 store 是模块化的，每个 store 独立管理自己的状态。
  * 不需要像 Vuex 那样通过命名空间来处理模块化。

* **支持 TypeScript 更友好**

  * Pinia 原生支持 TypeScript，拥有更好的类型推断能力。
  * 不需要额外的类型定义，代码更加清晰。

* **直观的 API**

  * 使用 state、getters 和 actions 直接定义 store 的状态、计算属性和方法。

* **支持组合式 API**

  * Pinia 兼容 Vue 3 的组合式 API，可以更自然地与 setup 一起使用。

`Pinia` 与 `Vuex` 的区别

| 特性 | Pinia | Vuex |
| --- | --- | --- |
| 语法设计 | 更现代化，API 简单清晰，与 Vue3 的组合式 API 无缝结合 | 语法较复杂，尤其是需要频繁使用 `mutations` 进行状态更新 |
| TS 支持 | 原生支持，类型推断优秀，不需要额外定义类型 | 手动定义类型较多，使用 TypeScript较繁琐 |
| 状态修改 | 直接通过 `this.state` 修改状态，无需 `mutations` | 必须通过 `mutations` 修改状态，间接性增加了代码复杂度 |
| 模块化 | 独立的 `store` 文件，模块直接管理自己的状态，不需要命名空间 | 使用命名空间区分模块，管理稍显繁琐 |
| API 设计 | 提供 `state`、`getters` 和 `actions`，没有 `mutations`，简化了API | 必须区分 `state`、`getters`、`mutations` 和 `action`，增加了学习曲线 |
| 性能 | 使用 `Proxy` 监听状态，性能优秀 | 使用 `Vue` 的 `reactivity` 系统坚挺状态，性能上没有明显区别 |
| 插件支持 | 插件系统比 `Vuex` 简单，例如可以直接使用 `Vue DevTools` 支持的时间旅行调试功能 | 插件支持丰富，但部分插件较重，需要额外配置 |
| 调试工具支持 | `Vue DevTools` 原生支持状态变更追踪和调试，不需要 `mutations` 辅助 | 必须通过 `mutations` 才能记录和调试状态变更历史 |
| Vue 版本兼容 | 设计为 Vue3 的官方状态管理库，但支持 Vue2 | 支持 Vue2 和 Vue3，Vuex4 是为 Vue3 设计的版本 |

**Pinia示例**

```js
// 定义 store
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

// 使用 store
import { useCounterStore } from './stores/counter';

const counterStore = useCounterStore();
counterStore.increment();
console.log(counterStore.doubleCount);
```

**Vuex示例**

```js
// 定义 store
import { createStore } from 'vuex';

export const store = createStore({
  state: {
    count: 0,
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
  },
});

// 使用 store
import { useStore } from 'vuex';

const store = useStore();
store.dispatch('increment');
console.log(store.getters.doubleCount);

```

## Pinia 为什么不需要 `mutations`

* Vue 3 的响应式系统可以直接追踪状态变化
* 通过 actions 就能同时处理同步和异步状态修改，无需额外的 mutations 层级
* 开发工具足够强大，不需要 mutations 来记录状态变化
* 简化代码结构，减少样板代码，提高了开发体验

## vue3 effect

在 Vue 3 中，effect 是 响应式系统 中的一个概念，用于处理和跟踪依赖。effect 函数的作用是当它所依赖的响应式数据发生变化时，自动重新执行，从而更新相关的视图或计算。

```js
import { reactive, effect } from 'vue';

const state = reactive({ count: 0 });

effect(() => {
  console.log(state.count);
});

state.count = 1;  // 当 count 变化时，effect 会自动执行并输出 1

```

## vue3 watch 和 watchEffect 区别

| 特性 | watch | watchEffect |
| --- | --- | --- |
| 依赖追踪 | 需要手动指定要观察的数据 | 自动追踪其作用域内使用到的所有响应式数据 |
| 使用场景 | 适合监视特定数据变化，做精确的响应处理 | 适合副作用操作，自动处理数据变化，无需指定依赖 |
| 灵活性 | 灵活，可以对多个数据项进行监听，并处理其变化 | 更简单，不需要显式声明依赖，适合简单的副作用 |
| 性能优化 | 需要明确指定依赖，可能会有多次回调 | 自动追踪依赖，但可能在某些复杂场景下导致额外的执行 |
| 参数 | 需要传递要观察的数据和变化后的回调函数 | 无需传递数据，自动追踪作用域内的响应式数据变化 |

## effect 和 watchEffect

* effect 是更底层的 API，通常用于非组件环境。
* watchEffect 是更高层次的封装，专为 Vue 组件设计，适合日常开发使用。

## vue 模板编译原理

同 [如何将 template 转化为 虚拟 dom](./5-frame.md#如何将-template-转化为-虚拟-dom-高频)

## Vue 组件渲染过程

Vue 组件的渲染过程是从组件实例创建到最终生成真实 DOM 并更新视图的完整流程，主要包括以下步骤：

1. **初始化**：实例化 Vue，初始化响应式数据。
2. **编译模板**：将模板转换为渲染函数，生成虚拟 DOM。
3. **挂载**：通过 patch 函数生成真实 DOM，并插入页面。
4. **更新**：数据变化触发重新渲染，通过 diff 更新真实 DOM。
5. **销毁**：移除组件及其相关的资源。

## vue 中 key 的作用

在 Vue 中，key 是一个特殊的属性，主要用于高效地更新虚拟 DOM，帮助 Vue 识别节点，优化 DOM 的渲染过程。

1. 为什么需要 key？

Vue 使用 虚拟 DOM 和 diff 算法 来高效更新视图。在 diff 比较过程中，Vue 默认采用一种 尽量复用节点 的策略。如果没有 key，Vue 可能无法正确区分列表中的节点，导致以下问题：

* DOM 更新异常：节点可能被错误复用，导致不必要的 DOM 操作或渲染问题。
* 性能下降：缺乏 key 的情况下，Vue 需要更复杂的逻辑去猜测节点是否可以复用。

2. key 的作用

* 唯一标识节点：通过 key 属性为每个节点指定唯一标识，帮助 Vue 快速准确地定位和复用节点。

* 优化性能：借助 key，Vue 的 diff 算法可以快速判断哪些节点需要更新、移动或删除，减少不必要的 DOM 操作。

## scoped 工作原理

在 Vue 中，scoped 是通过 CSS 属性选择器 和 动态生成的属性选择器 来实现的。这种机制确保样式只作用于特定的组件，而不会污染全局样式。

每个组件在渲染时，Vue 会为该组件的根元素动态生成一个独特的 data- 属性（例如 data-v-xxxx），其中 xxxx 是根据组件内容计算的哈希值。

举例：

```html
<div data-v-1234>
  <p>Hello World</p>
</div>

```

## vue 中闭包的使用

1. **computed**

```js
computed: {
  fullName() {
    const firstName = this.firstName; // 捕获 this.firstName
    const lastName = this.lastName;   // 捕获 this.lastName
    return `${firstName} ${lastName}`;
  }
}

```

2. 响应式系统中的闭包

**示例：`reactive` 实现中的闭包**

```js
function createReactiveObject(target, isReadonly, baseHandlers) {
  const proxy = new Proxy(target, baseHandlers);
  return proxy;
}

function reactive(target) {
  return createReactiveObject(target, false, mutableHandlers);
}
```

3. watch

```js
export default {
  data() {
    return {
      count: 0,
    };
  },
  watch: {
    count(newVal, oldVal) {
      console.log(`Count changed from ${oldVal} to ${newVal}`); // 捕获新旧值
    },
  },
};
```

4. provide 和 inject

provide 和 inject 的机制依赖闭包，捕获父组件的依赖数据

5. v-slot

v-slot 本质上依赖闭包，将父组件的数据传递给插槽内容

## createApp 做了什么事情

`createApp` 是 Vue 3 应用的入口。它负责创建一个独立的应用实例，初始化根组件，注册全局资源，提供插件机制，并通过 `mount` 方法将应用渲染到指定的 DOM 元素中。相比 Vue 2，`createApp` 实现了应用隔离，增强了扩展性，特别适合微前端架构或多实例场景

### ref 和 reactive，为什么 ref 要加 .value

ref 和 reactive 的区别：

* **ref**

  * 用于包装单一值（基础数据类型或对象）。
  * 返回一个带有 value 属性的响应式对象，value 是实际存储数据的地方。
  * 设计上，ref 是为了解决处理基础类型（如字符串、数字）时无法直接监听的限制。

* **reactive**

  * 用于包装对象或数组。
  * 直接将对象本身变成响应式对象，内部通过 Proxy 实现劫持。

为什么 ref 需要 `.value`：

* **封装基础类型的局限性**

  * 基础类型（如字符串、数字、布尔值）是不可变值，不能被 Vue 的 Proxy 直接监听。
  * 为了监听这些值的变化，Vue 需要将它们包装在一个对象中，而 .value 就是这个对象的属性，用来存储实际值。

* **统一处理逻辑**

  * 通过 .value，开发者可以显式地表明正在访问 ref 的内部值，避免混淆。
  * 当一个 ref 包装的是对象时，仍然使用 .value 访问，这种统一的接口设计增强了代码的可预测性和一致性。
