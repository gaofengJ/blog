---
title: 编码规范
description: 工程化
---

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
