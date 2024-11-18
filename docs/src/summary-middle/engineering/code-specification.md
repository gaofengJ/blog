---
title: 编码规范
description: 工程化
---

# 编码规范

## HTML

### 使用语义化标签

* HTML结构清晰
* 代码可读性好
* 无障碍阅读
* 方便所有引擎抓取
* 移动端友好
* 便于团队开发维护

  <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">Bad</span>

  ```html
  <div class="header">
    <div class="h2">Header</div>
  </div>

  ```

  <span style="padding: 2px 8px; background: #7EC699; color: #FFF; border-radius: 4px;">Good</span>

  ```html
  <header>
    <h2>Header</h2>
  </header>
  ```

### 命名规范

* id：推荐使用小驼峰`(camelCase)`，尽量不使用id
* class：推荐使用短横线`(kebab-case)`

### 注释

在需要注释的标签上方进行注释，注释内容较多时在结尾添加结束注释

```html
<!-- note start -->
<div></div>
<!-- note end -->
```

## CSS

### 命名规范

* 使用语义化的命名
* 推荐使用短横线`(kebab-case)`
* 类名层级`不大于4层`
* 添加统一前缀，避免命名冲突

### 使用规范

* 在嵌套的css中建议使用&

```css
.header {
  &-title {
    color: red;
  }
}
```

* 选择器使用类名继承

```html
<div class="modal">
  <div class="modal-content">
    <div class="modal-content-text"></div>
  </div>
</div>
```

* 深度选择器使用

```css
:deep(.class) {

}
```

* 避免使用class外的选择器
* vue组件中必须添加scoped

```vue
<style lang="less" scoped>
</style>
```

* 避免使用行内样式
* 避免使用!important
* 对于常用的值使用变量
* 对z-index进行分层管理
* 使用两个空格作为缩进
* 数值为 0~1 之间的小数时，需保留整数部分的0

  <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">Bad</span>

  ```css
  .container {
    opacity: .8;
  }
  ```

  <span style="padding: 2px 8px; background: #7EC699; color: #FFF; border-radius: 4px;">Good</span>

  ```css
  .container {
    opacity: 0.8;
  }
  ```

* 当属性值为 0 时，必须省略可省的单位

  <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">Bad</span>

  ```css
  .container {
    opacity: .8;
  }
  ```

  <span style="padding: 2px 8px; background: #7EC699; color: #FFF; border-radius: 4px;">Good</span>

  ```css
  .container {
    margin-top: 0;
  }
  ```

* 色值16进制用小写字母; 16进制尽量用简写

  <span style="padding: 2px 8px; background: #EC5975; color: #FFF; border-radius: 4px;">Bad</span>

  ```css
  .container {
    color: #ABCDEF;
    background-color: #ffffff;
  }
  ```

  <span style="padding: 2px 8px; background: #7EC699; color: #FFF; border-radius: 4px;">Good</span>

  ```css
  .container {
    color: #abcdef;
    background-color: #fff;
  }
  ```

* 属性顺序：

  * 布局定位属性：display / position / float / clear / visibility / overflow
  * 自身属性：width / height / margin / padding / border / background
  * 文本属性：color / font / text-decoration / text-align / vertical-align / white- space / break-word
  * 其他属性（CSS3）：content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient ...
  * 另外，如果包含 content 属性，应放在最前面。

  ```css
  .container {
    display: block;
    position: relative;
    float: left;
    width: 100px;
    height: 100px;
    margin: 0 10px;
    padding: 20px 0;
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    color: #333;
    background: rgba(0,0,0,.5);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
  }
  ```

### 注释

在需要注释的标签上方进行注释，注释内容较多时在结尾添加结束注释

```css
/* style start */
.container {

}
/* style end */
```

### 规范检查

推荐使用[Stylelint](https://stylelint.io/)

### 移动端适配方案

推荐使用[postcss-pxtorem](https://www.npmjs.com/package/postcss-pxtorem)

### 样式重置

推荐使用[Normalize](https://necolas.github.io/normalize.css/)

## JavaScript

### 命名规范

* 使用语义化的命名
* 推荐使用小驼峰`(camelCase)`
* 添加统一前缀，避免命名冲突

### 使用规范

### 注释

* 对单行代码进行简短注释使用`//`
* 多行注释和文档注释使用`/** */`
* 如使用 JSDoc 生成文档注释时，或者为枚举值进行备注时，可以使用多行注释，增加代码的可读性和可维护性

### 规则检查

基于 Airbnb 做规则检查，例如 vue 项目可以使用以下规则集：

* [@vue/airbnb](https://github.com/airbnb/javascript)

* [vue/vue3-essential](https://eslint.vuejs.org/rules/)

* [@vue/typescript/recommended](https://typescript-eslint.io/rules/)

## Typescript

* 不能滥用 any、unknow

## 命名规范

* **目录**：推荐使用短横线 `(kebab-case)`

* **文件**

  * **hooks 文件**：推荐使用小驼峰 `(camelCase)`
  * **config配置文件**、**store文件**、**types文件**：推荐使用短横线 `(kebab-case)`
  * **vue文件**：推荐使用大驼峰 `(PascalCase)`

* **变量**

  * 推荐使用短横线 `(kebab-case)`
  * 名称复杂的变量需要添加注释

* **常量**

  * 常量的名称必须全大写
  * 常量注释必须写成 jsdoc 格式

* **函数**：推荐使用小驼峰 `(camelCase)`

* **枚举**：

  * 枚举变量命名推荐使用大驼峰 `(PascalCase)`
  * 枚举值的 key 必须全大写，下划线连接
  * 枚举注释必须写成 jsdoc 格式

  ```js
  /**
   * 动物枚举
   */
  export enum animals {
    /**
     * 狗
     */
    DOG = 'dog',
    /**
     * 猫
     */
    CAT = 'cat',
  }
  ```

* **TS 变量**：推荐使用大驼峰 `(PascalCase)`

## 框架规范

* Vue组件写法：建议使用 setup script
* 组件命名推荐使用大驼峰 `(PascalCase)`，不要使用 `Index.vue`
